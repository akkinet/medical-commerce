import Cart from '../../../../models/cart'
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../../../../lib/dbConnect';

export const GET = async (req, { params }) => {
    try {
        const user = params.user;
        await dbConnect()
        const cart = await Cart.aggregate(
            [
                {
                    "$match": {
                        user
                    }
                },
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "product",
                        "foreignField": "_id",
                        "as": "product"
                    }
                },
                {
                    "$set": {
                        "_id": {
                            "$first": "$product._id"
                        },
                        "title": {
                            "$first": "$product.title"
                        },
                        "price": {
                            "$first": "$product.price"
                        },
                        "stockQuantity": {
                            "$first": "$product.stockQuantity"
                        },
                        "images": {
                            "$first": "$product.images"
                        }
                    }
                },
                {
                    "$unset": [
                        "product",
                        "createdAt",
                        "updatedAt",
                        "__v"
                    ]
                }
            ]
        );
        return NextResponse.json(cart, { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}

export const PUT = async (req, { params }) => {
    try {
        const { quantity, product_id } = await req.json()
        await dbConnect()

        await Cart.updateOne({ user: params.user, product: new mongoose.Types.ObjectId(product_id) }, {
            $set: {
                quantity
            }
        })

        return new Response('cart updated', { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        const { product_id } = await req.json()
        await dbConnect()

        await Cart.deleteOne({ user: params.user, product: new mongoose.Types.ObjectId(product_id) })

        return new Response('cart item deleted', { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}