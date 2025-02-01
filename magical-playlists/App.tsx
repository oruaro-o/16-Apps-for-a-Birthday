import type React from "react"
import { useState } from "react"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { PlaylistCreation } from "./pages/PlaylistCreation"
import "./styles/globals.css"

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"login" | "dashboard" | "creation">("login")

  const navigate = (page: "login" | "dashboard" | "creation") => {
    setCurrentPage(page)
  }

  return (
    <div>
      {currentPage === "login" && <Login onLogin={() => navigate("dashboard")} />}
      {currentPage === "dashboard" && <Dashboard onCreateMagic={() => navigate("creation")} />}
      {currentPage === "creation" && <PlaylistCreation onBack={() => navigate("dashboard")} />}
    </div>
  )
}

