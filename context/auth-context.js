"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken")

        if (token) {
          // In a real app, you would validate the token with your backend
          const email = localStorage.getItem("userEmail")
          const name = localStorage.getItem("userName")

          setUser({
            email,
            name,
            token,
          })
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (userData, token) => {
    // Save user data and token
    localStorage.setItem("authToken", token)
    localStorage.setItem("userEmail", userData.email)
    if (userData.name) {
      localStorage.setItem("userName", userData.name)
    }

    setUser({
      ...userData,
      token,
    })

    // Redirect to role selection
    router.push("/role-selection")
  }

  const logout = () => {
    // Clear user data and token
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")

    setUser(null)

    // Redirect to login
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

