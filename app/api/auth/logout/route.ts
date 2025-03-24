import { NextResponse } from "next/server"

export async function POST() {
  try {

    const response = NextResponse.json({ message: "Logged out successfully" })
    

    response.cookies.set({
      name: "auth_token",
      value: "",
      expires: new Date(0),
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}