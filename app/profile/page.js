"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setProfileImage(parsedUser.avatar || "/default-avatar.png")
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result) // Preview sebelum menyimpan
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfileImage = () => {
    if (previewImage) {
      const updatedUser = { ...user, avatar: previewImage }
      setUser(updatedUser)
      setProfileImage(previewImage)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setPreviewImage(null)
      alert("Profile picture updated successfully!")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-lg w-full relative">
            {/* Icon Settings di pojok kiri atas */}
            <Link href="/profile/settings">
                <button className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition">
                    <Settings className="h-5 w-5" />
                </button>
            </Link>

            <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto">
                    <img
                        src={previewImage || profileImage}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700 object-cover"
                    />
                    <label
                        htmlFor="upload-avatar"
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </label>
                    <input
                        type="file"
                        id="upload-avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>
                {previewImage && (
                    <button
                        onClick={saveProfileImage}
                        className="mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                        Save Profile Picture
                    </button>
                )}
                <h1 className="text-2xl font-bold text-white mt-4">
                    {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-200 mb-4">
                    <span className="font-semibold text-gray-400">Role:</span> {user.role}
                </p>
                <p className="text-lg text-gray-200 mb-4">
                    <span className="font-semibold text-gray-400">Location:</span> {user.location || "Not set"}
                </p>
                <p className="text-lg text-gray-200">
                    <span className="font-semibold text-gray-400">Joined:</span> {user.joinedDate || "Unknown"}
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
                >
                    Back to home
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
)
}