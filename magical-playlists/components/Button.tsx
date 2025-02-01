import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "spotify"
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-full font-bold text-white transition-all"
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#3D2B5C] to-[#2D1B4C] hover:shadow-md",
    spotify: "bg-[#1DB954] hover:bg-[#1ED760] flex items-center justify-center shadow-md",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

