"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ username: "", email: "" })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Asumsikan username terdiri dari firstName dan lastName
      setFormData({
        username: `${parsedUser.firstName} ${parsedUser.lastName}`,
        email: parsedUser.email,
      })
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) return

    // Pisahkan firstName dan lastName berdasarkan spasi (jika ada)
    const nameParts = formData.username.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: formData.email,
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))
    alert("Settings updated successfully!")
  }

  if (!user) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
