import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const protectedRoutes = ["/profile", "/dashboard"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log("Middleware checking path:", path)

  const isProtectedRoute = protectedRoutes.some(route =>
    path === route || path.startsWith(`${route}/`)
  )

  if (isProtectedRoute) {
    const token = request.cookies.get("auth_token")?.value
    console.log("Auth token present:", !!token)

    if (!token) {
      console.log("No token found, redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Convert secret key to Uint8Array
      const secret = new TextEncoder().encode(JWT_SECRET)

      // Verify token using jose
      await jwtVerify(token, secret)

      console.log("Token verified successfully")
      return NextResponse.next()
    } catch (error) {
      console.log("Token verification failed:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
