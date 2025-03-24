import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#161524] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold font-['Roboto_Slab']">UI iStore</h1>
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#161524]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-[#161524] hover:bg-gray-200">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-[#161524] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Roboto_Slab']">
                  Complete Store Management Solution
                </h1>
                <p className="text-lg md:text-xl text-gray-300">
                  Manage your inventory, sales, and customers all in one place with our powerful and intuitive platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-[#161524] hover:bg-gray-200">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-[#161524]"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[#cdcaca] rounded-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-[90%] h-[90%] bg-white rounded-md shadow-md overflow-hidden">
                        <div className="h-10 w-full bg-[#cdcaca] flex items-center border-b-2 border-[#161524]">
                          <div className="text-[#161524] text-sm font-bold font-['Roboto_Slab'] ml-4 uppercase tracking-wider">
                            Dashboard Preview
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="bg-[#e0dddd] p-4 rounded-md">
                                <div className="h-4 w-24 bg-[#bbb7b7] rounded mb-2"></div>
                                <div className="h-8 w-full bg-[#bbb7b7] rounded mb-2"></div>
                                <div className="h-4 w-16 bg-[#bbb7b7] rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Roboto_Slab'] text-[#161524]">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Inventory Management"
                description="Track your products, manage stock levels, and get alerts when inventory is low."
              />
              <FeatureCard
                title="Sales & Invoicing"
                description="Create quotes, process orders, and generate professional invoices in seconds."
              />
              <FeatureCard
                title="Supplier Management"
                description="Manage your suppliers, track purchase orders, and monitor supplier performance."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#161524] text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold font-['Roboto_Slab']">UI iStore</h2>
              <p className="text-sm text-gray-400">© 2024 All rights reserved</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link href="/signup" className="text-sm hover:underline">
                Sign Up
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-3 font-['Roboto_Slab'] text-[#161524]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

