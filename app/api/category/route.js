import Category from "../../../models/category";
import dbConnect from '../../../lib/dbConnect'
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const data = await req.json();
        await dbConnect()

        const cat = new Category(data)
        await cat.save()

        return NextResponse.json({ "message": "category created" }, { status: 201 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const num = searchParams.get("num")
        await dbConnect()
        const count = await Category.countDocuments()
        const category = await Category.find().limit(num || count)
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}