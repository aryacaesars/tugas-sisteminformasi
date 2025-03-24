"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/role-selection") // Redirect to role-selection if already logged in
    }
  }, [router])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    
    // Find user with matching email
    const user = users.find(u => u.email === email)
    
    if (!user) {
      setError("No account found with this email")
      return
    }
    
    if (user.password !== password) {
      setError("Invalid password")
      return
    }
    
    // Login successful, sertakan role jika ada
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role || null,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    }
    
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData))
    
    // Redirect ke dashboard jika role sudah ada, jika tidak ke role-selection
    if (userData.role) {
      router.push(`/dashboard/${userData.role}`)
    } else {
      router.push("/role-selection")
    }
  }
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-md w-full space-y-8 bg-black p-10 border border-gray-800 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
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
            <h2 className="mt-6 text-center text-gray-400 text-3xl font-bold">Sign in to your account</h2>
            <p className="mt-2 text-center text-gray-400">
              Or{" "}
              <Link href="/auth/register" className="text-white hover:underline">
                create a new account
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-900 border border-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-900 border border-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 bg-gray-900 border-gray-800 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="text-gray-400 hover:text-white">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none transition-colors"
              >
                Sign in
                <span className="absolute right-3 inset-y-0 flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </button>
            </div>
          </form>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm">
              <Link href="/" className="text-gray-400 hover:text-white flex items-center">
                <span>Back to home</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}