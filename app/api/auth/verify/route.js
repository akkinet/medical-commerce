import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import User from '../../../../models/user'
import dbConnect from '../../../../lib/dbConnect';

export const GET = async (req, ctx) => {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get('token')
        const useCase = searchParams.get('for')
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decodedToken) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        await dbConnect()
        if (useCase == 'email') {
            const user = await User.findOne({ email: decodedToken.email })
            user.verified = true
            await user.save()
            
            return NextResponse.redirect(new URL('/verify/email', req.url));
        }

        return NextResponse.json({ error: "Insufficient query parameter" }, { status: 400 })
    } catch (err) {
        if (err.name == 'TokenExpiredError')
            return NextResponse.json({ error: "Token expired" }, { status: 400 })
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}