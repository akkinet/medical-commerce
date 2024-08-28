import Product from "../../../../models/product";
import Category from "../../../../models/category";
import dbConnect from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const num = searchParams.get("num");
    const forPage = searchParams.get("for");

    let totalDocs;
    if (num) totalDocs = await Product.countDocuments();

    if (forPage == "home") {
      const products = await Product.find({
        category: new mongoose.Types.ObjectId(params.group),
        isFeatured: true,
      }).limit(parseInt(num) || totalDocs);
      return NextResponse.json(products, { status: 200 });
    }

    const match = {
      $match: {
        category: new mongoose.Types.ObjectId(params.group),
        isFeatured: true,
      },
    };

    for (const [name, value] of searchParams.entries()) {
      if (value != "null" && value != "") {
        if (name == "brand") {
          match.$match[name] = { $in: value.split(",") };
          continue;
        }
        match.$match[name] = JSON.parse(value);
      }
    }

    const lookup = {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "list",
      },
    };

    const set = {
      $set: {
        catName: {
          $first: "$list.name",
        },
      },
    };

    const unset = {
      $unset: ["list"],
    };

    const group = {
      $group: {
        _id: null, // Group all documents into one
        productList: {
          $addToSet: {
            id: "$_id",
            title: "$title",
            desc: "$desc",
            descTitle: "$descTitle",
            images: "$images",
            price: "$price",
            prescription: "$prescription",
            stockQuantity: "$stockQuantity",
            catName: "$catName",
          },
        }, // Collect unique product names
        brandList: { $addToSet: "$brand" }, // Collect unique brand names
      },
    };

    const projection = {
      $project: {
        productList: {
          $cond: [
            { $gt: [{ $size: "$matchedDocs" }, 0] }, // Check if matchedDocs is empty
            { $first: "$matchedDocs.productList" },
            "$emptyArray",
          ],
        },
        brandList: {
          $cond: [
            { $gt: [{ $size: "$matchedDocs" }, 0] }, // Check if matchedDocs is empty
            { $first: "$matchedDocs.brandList" },
            "$emptyArray",
          ],
        },
      },
    };

    const data = await Product.aggregate([
      {
        $facet: {
          matchedDocs: [match, lookup, set, unset, group],
          emptyArray: [
            { $match: { _id: null } }, // Guaranteed to produce an empty array
          ],
        },
      },
      projection,
    ]);

    const category = await Category.findById(params.group);

    return NextResponse.json({ ...data[0], category }, { status: 200 });
  } catch (err) {
    console.log("err", err);
    return new Response(err.message, { status: 500 });
  }
};
