import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Menu, Flag } from 'lucide-react'
import { useTheme } from "next-themes"

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme() // Ensure theme is correctly set
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100) // Reduced to 100ms delay before closing
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      className="relative" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-700 dark:text-white" // Ensure visibility in both modes
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#1C2237] ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Sign Up</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Log In</Button>
            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">
              <Flag className="mr-2 h-4 w-4" /> Elections
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Rewards</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Learn</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Documentation</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#2C3444] px-4 py-2 text-sm">Terms of Use</Button>
            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-gray-700 dark:text-white">Dark mode</span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle between light and dark
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
