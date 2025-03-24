"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      className="py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 9h6M9 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold">AgileBoard</span>
          </Link>
        </div>

        {/* Navigation links in the center */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* Login/Register on the right */}
        <div className="hidden md:flex items-center space-x-4">

          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Get started!
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden mt-4 py-4 bg-gray-900 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 px-4">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
           
            <Link
              href="/"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-center"
            >
              Get started!
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

