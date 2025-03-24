"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
}

interface DashboardLayoutProps {
  user: User
  children: React.ReactNode
  activeView: string
  onMenuClick: (view: string) => void
}

export default function DashboardLayout({ user, children, activeView, onMenuClick }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#161524] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold font-['Roboto_Slab']">UI iStore</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block">Welcome, {user.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-white border-white hover:bg-white hover:text-[#161524]"
          >
            Logout
          </Button>
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div className="w-64 h-full bg-[#cdcaca] p-4" onClick={(e) => e.stopPropagation()}>
              <SidebarContent
                activeView={activeView}
                onMenuClick={(view) => {
                  onMenuClick(view)
                  setIsMobileMenuOpen(false)
                }}
              />
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-48 lg:w-64 bg-[#cdcaca] min-h-[calc(100vh-64px)]">
          <SidebarContent activeView={activeView} onMenuClick={onMenuClick} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}

interface SidebarContentProps {
  activeView: string
  onMenuClick: (view: string) => void
}

function SidebarContent({ activeView, onMenuClick }: SidebarContentProps) {
  return (
    <div className="mt-8">
      <MenuGroup
        title="Store"
        items={[
          { id: "customers", label: "Customers" },
          { id: "products", label: "Products" },
          { id: "suppliers", label: "Suppliers" },
        ]}
        activeItem={activeView}
        onItemClick={onMenuClick}
      />

      <MenuGroup
        title="Sales"
        items={[
          { id: "quotations", label: "Quotes" },
          { id: "sros", label: "SROs" },
          { id: "orders", label: "Orders" },
          { id: "invoices", label: "Invoices" },
        ]}
        activeItem={activeView}
        onItemClick={onMenuClick}
      />

      <MenuGroup
        title="Purchasing"
        items={[
          { id: "actions", label: "Actions" },
          { id: "orderrequests", label: "Order Requests" },
          { id: "purchasingorders", label: "Purchasing Orders" },
          { id: "supplierinvoices", label: "Supplier Invoices" },
        ]}
        activeItem={activeView}
        onItemClick={onMenuClick}
      />
    </div>
  )
}

interface MenuGroupProps {
  title: string
  items: { id: string; label: string }[]
  activeItem: string
  onItemClick: (id: string) => void
}

function MenuGroup({ title, items, activeItem, onItemClick }: MenuGroupProps) {
  return (
    <div className="py-4">
      <div className="px-4 mb-2 text-xs font-bold font-['Roboto_Slab'] text-left text-gray-600 uppercase tracking-wider">
        {title}
      </div>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={`text-left text-sm py-2 px-5 cursor-pointer transition-all duration-200 border-l-[3px] ${
              activeItem === item.id
                ? "font-bold bg-[#161524] text-[#cdcaca] border-l-[#cdcaca]"
                : "border-l-transparent hover:bg-[#161524] hover:text-[#cdcaca] hover:border-l-[#cdcaca] hover:font-bold"
            }`}
            onClick={() => onItemClick(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

