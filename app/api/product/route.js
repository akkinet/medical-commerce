import { NextResponse } from "next/server";
import Product from "../../../models/product";
import dbConnect from "../../../lib/dbConnect";
import { removeStopWords } from "../../../lib/helperFunction";
import stopWords from "../../../data/stopWords.json";

export const POST = async (req) => {
  try {
    const data = await req.json();
    await dbConnect();
    const product = new Product(data);
    await product.save();
    return new Response("product saved", { status: 201 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const forPage = searchParams.get("for");
    await dbConnect();
    let product,
      relatedProducts = [];

    const group = {
      $group: {
        _id: null, // Group all documents into one
        productList: {
          $addToSet: {
            id: "$_id",
            title: "$title",
            images: "$images",
            price: "$price",
            prescription: "$prescription",
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

    if (id) {
      product = await Product.findById(id);
      const filteredText = removeStopWords(product.title, stopWords);
      relatedProducts = await Product.find({
        $text: { $search: filteredText },
        _id: { $ne: id },
      }).limit(4);
    } else if (searchParams.size == 3) {
      delete projection.$project["brandList"]

      const match = {
        $match: {
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

      const data = await Product.aggregate([
        {
          $facet: {
            matchedDocs: [match, group],
            emptyArray: [
              { $match: { _id: null } }, // Guaranteed to produce an empty array
            ],
          },
        },
        projection,
      ]);

      return NextResponse.json(data[0], { status: 200 });
    } else if (forPage == "all") {
      const data = await Product.aggregate([
        {
          $facet: {
            matchedDocs: [group],
            emptyArray: [
              { $match: { _id: null } }, // Guaranteed to produce an empty array
            ],
          },
        },
        projection,
      ]);

      return NextResponse.json(data[0], { status: 200 });
    } else product = await Product.find({});

    return NextResponse.json({ product, relatedProducts }, { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};
