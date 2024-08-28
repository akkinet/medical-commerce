import { NextResponse } from 'next/server'
import Product from '../../../models/product'
import { removeStopWords } from '../../../lib/helperFunction'
import stopWords from '../../../data/stopWords.json'
import dbConnect from '../../../lib/dbConnect'

export const GET = async req => {
    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get("query")
        const filteredText = removeStopWords(query, stopWords);
        await dbConnect()
        const result = await Product.find({ $text: { $search: filteredText } });
        return NextResponse.json(result, { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}