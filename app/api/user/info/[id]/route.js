import { NextResponse } from "next/server"
import dbConnect from "../../../../../lib/dbConnect"
import User from "../../../../../models/user"

export const GET = async (req, { params }) => {
    try {
        // const email = params.id
        await dbConnect()
        const user = await User.findOne({
            $or: [
              { email: params.id },
              { username: params.id }
            ]
          })
        // const user = await User.findOne({ email })
        return NextResponse.json(user, { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}