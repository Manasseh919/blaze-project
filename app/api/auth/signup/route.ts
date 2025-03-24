import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/lib/models"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

   
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    
    await connectToDatabase()

    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

