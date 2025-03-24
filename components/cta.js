"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20" ref={ref}>
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3">
              <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="200" r="50" stroke="white" strokeWidth="2" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your projects?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students and freelancers who are managing their projects more efficiently with AgileBoard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="border border-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors inline-flex items-center justify-center"
            >
              Login
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required. Free plan available.</p>
        </div>
      </motion.div>
    </section>
  )
}

