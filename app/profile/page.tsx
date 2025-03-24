/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface User {
  _id: string
  name: string
  email: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile")

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [router, toast])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      router.push("/login")
    } catch (error) {
     toast.error(error instanceof Error ? error.message : "Failed to logout")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mb-4">Please login to view your profile</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Account Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">User ID:</div>
              <div>{user._id}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

