import type { Metadata } from "next"
import { Inter, Roboto_Slab } from 'next/font/google'
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: '--font-roboto-slab' })

export const metadata: Metadata = {
  title: "UI iStore - Store Management System",
  description: "A complete store management solution with user authentication and dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}