import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/lib/models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

   
    await connectToDatabase()

    
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

 
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }


    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    )


    const response = NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      redirectUrl: "/dashboard" 
    })

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict"
    })

    console.log("Cookie set successfully")
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}