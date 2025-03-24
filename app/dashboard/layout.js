"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { 
  BookOpen, Calendar, Users, 
  Briefcase, FileText, DollarSign, Clock, 
  LogOut, Settings, User 
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  
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
    
    // Check if user has a role
    if (!parsedUser.role) {
      router.push("/role-selection")
      return
    }
    
    setLoading(false)
  }, [router])
  
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }
  
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  // Sidebar links for student
  const studentSidebar = [
    { href: "/dashboard/student", label: "Assignments", icon: BookOpen },
    { href: "/dashboard/student/form", label: "Form", icon: FileText },
    { href: "/dashboard/student/kanban", label: "Kanban", icon: Calendar },
    { href: "/dashboard/student/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/student/schedule", label: "Schedule", icon: Calendar },
  ]

  // Sidebar links for freelancer
  const freelancerSidebar = [
    { href: "/dashboard/freelancer/clients", label: "Clients", icon: Users },
    { href: "/dashboard/freelancer/invoices", label: "Invoices", icon: DollarSign },
    { href: "/dashboard/freelancer/kanban", label: "Kanban", icon: Calendar },
    { href: "/dashboard/freelancer/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/freelancer/reports", label: "Reports", icon: FileText },
  ]

  const sidebarLinks = user.role === "student" ? studentSidebar : freelancerSidebar
  
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 hidden md:block">
        <div className="flex items-center space-x-3 mb-6">
          <User size={24} className="text-white" />
          <span className="text-white font-bold">{user.firstName}</span>
        </div>
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors ${
                pathname === link.href ? "bg-gray-800 text-white" : ""
              }`}
            >
              <link.icon size={18} className="mr-2" />
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>
      
      {/* Mobile header - visible on small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 p-4 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 9h6M9 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-xl text-white font-bold">AgileBoard</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-1 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Mobile navigation - bottom navigation for small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 z-10">
        <div className="flex justify-around">
          {sidebarLinks.slice(0, 4).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex flex-col items-center px-2 py-1 rounded-md ${
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 md:p-8 mt-16 md:mt-0 pb-20 md:pb-8">
        {children}
      </div>
    </div>
  )
}