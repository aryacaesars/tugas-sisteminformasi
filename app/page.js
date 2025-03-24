"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import Cta from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Hero />
        <HowItWorks />
        <Features />
        <Cta />
        <Footer />
      </div>
    </main>
  )
}

