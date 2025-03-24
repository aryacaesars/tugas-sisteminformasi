"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
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
            <p className="text-sm text-gray-300">Project management reimagined for students & freelancers</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Manage projects{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
              without the complexity
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 mx-auto">
            Streamline your workflow with AI-powered task management designed specifically for students and freelancers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="border border-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

