"use client"

import { motion } from "framer-motion"

export default function RoleCard({ role, isSelected, onSelect }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300
        ${isSelected ? "border-white bg-gray-800" : "border-gray-800 bg-gray-900 hover:border-gray-700"}
      `}
    >
      {isSelected && (
        <motion.div
          className="absolute top-3 right-3 h-3 w-3 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      <div className="p-6">
        <div
          className={`
          inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6
          ${isSelected ? "bg-white text-black" : "bg-gray-800 text-white"}
          transition-colors duration-300
        `}
        >
          <role.icon size={28} />
        </div>

        <h3 className="text-xl font-bold mb-3">{role.title}</h3>
        <p className="text-gray-400 mb-6">{role.description}</p>

        <div
          className={`
          h-1.5 w-full rounded-full overflow-hidden bg-gray-800
          ${isSelected ? "opacity-100" : "opacity-40"}
        `}
        >
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: isSelected ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

