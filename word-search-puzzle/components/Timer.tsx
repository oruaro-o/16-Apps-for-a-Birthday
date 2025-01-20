"use client"

import { useState, useEffect } from "react"

interface TimerProps {
  isRunning: boolean
}

export function Timer({ isRunning }: TimerProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-purple-800">Time</h2>
      <div className="text-3xl font-bold text-purple-600">{formatTime(time)}</div>
    </div>
  )
}

