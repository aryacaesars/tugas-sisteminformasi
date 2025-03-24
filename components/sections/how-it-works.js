"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Briefcase, Users } from "lucide-react"

const cards = [
  {
    title: "For Students",
    description:
      "Organize assignments, group projects, and deadlines with AI-powered prioritization to balance your academic workload.",
    icon: GraduationCap,
  },
  {
    title: "For Freelancers",
    description:
      "Track client projects, manage deliverables, and automate invoicing to focus on what you do best - creating great work.",
    icon: Briefcase,
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="how-it-works" className="py-20" ref={ref}>
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          AgileBoard adapts to your workflow, whether you're a student, freelancer, or both
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all duration-300 group"
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 bg-black border border-gray-800 text-white"
            >
              <card.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
            <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between items-center">
              <span className="text-sm text-gray-500">Learn more</span>
              <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ArrowRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  )
}

