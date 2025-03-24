"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
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
    
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return
    }
    
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    
    // Check if email already exists
    if (existingUsers.some(user => user.email === email)) {
      setError("An account with this email already exists")
      return
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date().toISOString()
    }
    
    // Add to users array
    existingUsers.push(newUser)
    localStorage.setItem("users", JSON.stringify(existingUsers))
    
    // Auto login
    const userData = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    }
    
    // Save session to localStorage
    localStorage.setItem("user", JSON.stringify(userData))
    
    // Redirect to role-selection
    router.push("/role-selection")
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
            <h2 className="mt-6 text-center text-gray-400 text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign in
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-900 border border-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-900 border border-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                    placeholder="Last name"
                  />
                </div>
              </div>
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
                  autoComplete="new-password"
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
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 bg-gray-900 border border-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 bg-gray-900 border-gray-800 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{" "}
                <Link href="#" className="text-white hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-white hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none transition-colors"
              >
                Create account
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