import jwt from 'jsonwebtoken'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const PUT = async (req) => {
    try {
        const authHeader = req.headers.get('Authorization')
        const token = authHeader.split(' ')[1]
        const { email } = await jwt.verify(token, process.env.SECRET_KEY)
        const { password } = await req.json()
        const hashPass = await bcrypt.hash(password, 10)
        await dbConnect()
        await User.updateOne({ email },
            { $set: { password: hashPass } })
        return new Response('Password updated', { status: 200 })
    } catch (err) {
        return NextResponse.json({ err: err.message }, { status: 400 })
    }
}