import { NextResponse } from "next/server"
import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../models/user"
import jwt from 'jsonwebtoken'
import sendMail from '../../../../lib/sendMail'
import { getBaseURL } from '../../utils'

export const POST = async (req, cnx) => {
  try {
    await dbConnect()
    const data = await req.json()
    const { username, email } = data
    const user = new User(data)
    await user.save()
    const token = jwt.sign({ username, email }, process.env.SECRET_KEY, { expiresIn: '1h' })
    const baseURL = getBaseURL(req)
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Email Verification</title>
</head>
<body>
  <div style="text-align: center; padding: 20px;">
    <h1>Verify Your Email Address</h1>

    <p>Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>

    <button style="background-color: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer;">
      <a href="${baseURL}/api/auth/verify?for=email&token=${token}" style="color: white; text-decoration: none;">Verify Now</a>
    </button>

    <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>

    <p>This link will expire in 24 hours.</p>

    <p>If you did not sign up for an account, you can ignore this email.</p>
  </div>
</body>
</html>
`
    await sendMail(email, 'Email verification', html)
    return NextResponse.json({ message: "Success", email, username }, { status: 201 })
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    } else if (err.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation failed', message: err.message }, { status: 400 });
    }
    // return NextResponse.json({ error: err.message }, { status: 500 });
    return new Response(err.message, { status: 500 })
  }
}