import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/user'

export const POST = async (req) => {
    try {
        const body = await req.json()
        await dbConnect()
        const user = await User.findOne({ email: body.email })
        if (!user)
            return new Response("User not found", { status: 400 })

        user.firstName = body.firstName
        user.lastName = body.lastName
        user.phone = body.phone
        user.address = body.address
        user.state = body.state
        user.country = body.country
        user.city = body.city
        user.zipCode = body.zipCode
        if (body.image)
            user.image = body.image

        await user.save()

        return NextResponse.json({ message: "User updated Successfully", user }, { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}