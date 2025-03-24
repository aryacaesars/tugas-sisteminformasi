"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import HowItWorks from "@/components/sections/how-it-works"
import Features from "@/components/sections/features"
import Cta from "@/components/sections/cta"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroLogin from "@/components/sections/hero-login"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    const userData = localStorage.getItem("user")
    if (userData) {
      setLoggedInUser(JSON.parse(userData))
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        {loggedInUser ? (
          <HeroLogin />
        ) : (
          <>
            <Hero />
            <HowItWorks />
            <Features />
            <Cta />
          </>
        )}
        <Footer />
      </div>
    </main>
  )
}