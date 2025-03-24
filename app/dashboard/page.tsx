/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import DashboardLayout from "@/components/dashboard-layout"
import InvoicesTable from "@/components/invoices-table"

interface User {
  _id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState("invoices")
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mb-4">Please login to view your dashboard</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleMenuClick = (view: string) => {
    setActiveView(view)
  }

 
    return (
      <DashboardLayout user={user} activeView={activeView} onMenuClick={handleMenuClick}>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/profile")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Profile
          </button>
        </div>
    
        {activeView === "invoices" && <InvoicesTable />}
        {activeView !== "invoices" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-md shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)} View
              </h2>
              <p className="text-gray-600">This view is under construction. Please check back later.</p>
            </div>
          </div>
        )}
      </DashboardLayout>
    )
    
  
}

