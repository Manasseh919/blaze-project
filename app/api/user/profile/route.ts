import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/lib/models"


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET() {
  try {
    
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Connect to the database
    await connectToDatabase()

    // Find user by ID
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return user data
    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    console.error("Profile error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


