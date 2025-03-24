"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { KanbanIcon as LayoutKanban, Brain, FileText, MessageSquare } from "lucide-react"

const features = [
  {
    title: "Kanban Board",
    description: "Visualize your workflow with customizable boards that adapt to your project needs.",
    icon: LayoutKanban,
  },
  {
    title: "AI Prioritization",
    description: "Let our AI analyze your tasks and suggest the optimal order based on deadlines and importance.",
    icon: Brain,
  },
  {
    title: "PDF Reports",
    description: "Generate professional reports to share with clients or professors with a single click.",
    icon: FileText,
  },
  {
    title: "WhatsApp Notifications",
    description: "Stay on top of deadlines with customizable notifications sent directly to your WhatsApp.",
    icon: MessageSquare,
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="features" className="py-20" ref={ref}>
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to manage your projects efficiently
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-5 bg-gray-800 text-white">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 bg-gradient-to-b from-gray-900 to-black p-8 rounded-xl border border-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">AI-Powered Workflow</h3>
            <p className="text-gray-400 mb-6">
              Our intelligent system learns from your work patterns to suggest improvements and automate repetitive
              tasks, saving you valuable time.
            </p>
            <ul className="space-y-3">
              {[
                "Smart task suggestions",
                "Automated priority sorting",
                "Deadline predictions",
                "Resource allocation",
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-white text-black flex items-center justify-center mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black p-2 rounded-xl border border-gray-800 shadow-xl">
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="AI Workflow Visualization"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

