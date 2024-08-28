import mongoose from 'mongoose'
import Cart from '../../../models/cart'
import dbConnect from '../../../lib/dbConnect'

export const POST = async (req) => {
    try {
        const { quantity, email, product_id } = await req.json()
        await dbConnect()

        await Cart.create({
            product: new mongoose.Types.ObjectId(product_id),
            user: email,
            quantity
        })

        return new Response('cart added', { status: 201 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}