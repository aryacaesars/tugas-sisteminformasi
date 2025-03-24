"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroLogin() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setLoggedInUser(JSON.parse(userData))
    }
  }, [])

  // Tampilkan loading state jika user belum terdeteksi
  if (!loggedInUser) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-300">Loading...</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1 mb-4 border border-gray-700 rounded-full">
            <p className="text-sm text-gray-300">
              Welcome back, {loggedInUser.firstName}!
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ready to dive back in?
          </h1>
          <p className="text-xl text-gray-300 mb-8 mx-auto">
            Continue managing your projects with AgileBoard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/dashboard/${loggedInUser.role}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-500 transition-colors inline-flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}