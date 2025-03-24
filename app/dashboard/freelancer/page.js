"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link" // Add this import
import { Briefcase, FileText, DollarSign, Clock, LogOut } from "lucide-react"
export default function FreelancerDashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      // Redirect to login if not logged in
      router.push("/login")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    
    // Check if user has the freelancer role
    if (!parsedUser.role || parsedUser.role !== 'freelancer') {
      // Redirect to role selection if no role or wrong role
      if (!parsedUser.role) {
        router.push("/role-selection")
      } else {
        // Redirect to their assigned role dashboard
        router.push(`/dashboard/${parsedUser.role}`)
      }
    }
  }, [router])
  
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black flex">

      
      {/* Main content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Freelancer Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user.firstName}!</p>
            </div>
            
            <button 
              className="md:hidden flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-1">Active Projects</h3>
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-gray-400 text-sm">Current client projects</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-1">This Month</h3>
              <p className="text-3xl font-bold text-white">$2,840</p>
              <p className="text-gray-400 text-sm">Revenue earned</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-1">Pending</h3>
              <p className="text-3xl font-bold text-white">2</p>
              <p className="text-gray-400 text-sm">Invoices awaiting payment</p>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Active Projects</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">E-commerce Website Redesign</h3>
                      <p className="text-gray-400 text-sm">Client: Acme Corporation</p>
                    </div>
                    <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full">In Progress</span>
                  </div>
                  <div className="mt-2 bg-gray-800 h-2 rounded-full">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${60}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-white hover:underline">View all projects</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}