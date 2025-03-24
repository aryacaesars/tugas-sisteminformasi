"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react"

export default function RoleSelectionPage() {
  const [user, setUser] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      // Redirect ke login jika belum ada user
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)

    // Jika user sudah memilih role (misalnya selain "global")
    if (parsedUser.role && parsedUser.role !== "global") {
      router.push(`/dashboard/${parsedUser.role}`)
    } else {
      // Tetap di halaman role selection jika role default (misalnya "global") atau belum di-set
      setUser(parsedUser)
    }
  }, [router])
  
  const handleRoleSelection = (role) => {
    if (!user) return
    
    // Update user data with selected role
    const updatedUser = {
      ...user,
      role: role
    }
    
    // Save updated user data individually
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update user role di daftar users (untuk persistensi saat login ulang)
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map(u => {
        if (u.email === updatedUser.email) {
            return { ...u, role: role }
        }
        return u
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Redirect ke dashboard role-spesifik
    router.push(`/dashboard/${role}`)
  }
  
  if (!user) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  }
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 9h6M9 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xl text-white font-bold">AgileBoard</span>
            </Link>
            <h2 className="text-3xl font-bold text-white">Welcome, {user.firstName}!</h2>
            <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
              Tell us a bit about yourself. Select how you primarily plan to use AgileBoard.
              You can always change this later.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className={`bg-black border ${
                hoveredCard === 'student' ? 'border-white' : 'border-gray-800'
              } rounded-xl p-8 cursor-pointer transition-all duration-300`}
              whileHover={{ y: -5 }}
              onClick={() => handleRoleSelection('student')}
              onMouseEnter={() => setHoveredCard('student')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 bg-black border border-gray-800 text-white">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">I'm a Student</h3>
                  <p className="text-gray-400 mb-6">
                    Organize assignments, track group projects, and manage academic deadlines with tools designed for students.
                  </p>
                </div>
                <div className="mt-auto">
                  <button className="group relative w-full flex justify-center py-3 px-4 border border-gray-800 text-sm font-medium rounded-md text-white hover:bg-gray-900 transition-colors">
                    Select Student
                    <span className="absolute right-3 inset-y-0 flex items-center">
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className={`bg-black border ${
                hoveredCard === 'freelancer' ? 'border-white' : 'border-gray-800'
              } rounded-xl p-8 cursor-pointer transition-all duration-300`}
              whileHover={{ y: -5 }}
              onClick={() => handleRoleSelection('freelancer')}
              onMouseEnter={() => setHoveredCard('freelancer')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 bg-black border border-gray-800 text-white">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">I'm a Freelancer</h3>
                  <p className="text-gray-400 mb-6">
                    Track client projects, manage deliverables, and streamline your freelance workflow with professional tools.
                  </p>
                </div>
                <div className="mt-auto">
                  <button className="group relative w-full flex justify-center py-3 px-4 border border-gray-800 text-sm font-medium rounded-md text-white hover:bg-gray-900 transition-colors">
                    Select Freelancer
                    <span className="absolute right-3 inset-y-0 flex items-center">
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              You can change your role or add multiple roles in the settings later.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}