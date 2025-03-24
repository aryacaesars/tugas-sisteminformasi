"use client"

import { motion } from "framer-motion"

export default function PageLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {title}
                </motion.h1>
              )}

              {subtitle && (
                <motion.p
                  className="text-gray-400 max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          )}

          {children}
        </motion.div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} AgileBoard. All rights reserved.</p>
      </footer>
    </div>
  )
}

