"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardRedirect() {
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
    
    // Redirect based on role
    if (!parsedUser.role) {
      router.push("/role-selection")
    } else {
      router.push(`/dashboard/${parsedUser.role}`)
    }
  }, [router])
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting...</div>
    </div>
  )
}