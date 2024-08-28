import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export const POST = async (req, cnx) => {
    try {
        const { username, password } = await req.json()
        await dbConnect()
        const user = await User.findOne({ username })
        if (!user)
            return NextResponse.json({ error: "no such user exists" }, { status: 400 })

        const correctPass = await bcrypt.compare(password, user.password)
        if (!correctPass)
            return NextResponse.json({ error: "invalid credentials" }, { status: 400 })

        return NextResponse.json(user, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}