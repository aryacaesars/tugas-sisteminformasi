"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Support", href: "/support" },
        { name: "API", href: "/api" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Github, href: "https://github.com" },
  ]

  return (
    <motion.footer
      className="py-12 border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M9 9h6M9 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold">AgileBoard</span>
          </Link>
          <p className="text-gray-400 mb-6 max-w-xs">
            Streamline your projects with AI-powered task management designed for students and freelancers.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((group, i) => (
          <div key={i}>
            <h3 className="font-semibold mb-4">{group.title}</h3>
            <ul className="space-y-3">
              {group.links.map((link, j) => (
                <li key={j}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} AgileBoard. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}

