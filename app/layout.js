import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AgileBoard - Project Management for Students & Freelancers",
  description: "Streamline your projects with AI-powered task management designed for students and freelancers",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'