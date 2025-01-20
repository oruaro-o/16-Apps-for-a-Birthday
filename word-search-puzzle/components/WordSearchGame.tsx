"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import WordSearchGrid from "./WordSearchGrid"
import { Timer } from "./Timer"

export default function WordSearchGame() {
  const [topic, setTopic] = useState("")
  const [puzzle, setPuzzle] = useState<string[][]>([])
  const [words, setWords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [allWordsFound, setAllWordsFound] = useState(false)
  const [useAI, setUseAI] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAllWordsFound(false)

    try {
      const response = await fetch("/api/generate-puzzle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, useAI }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate puzzle")
      }

      const data = await response.json()
      setPuzzle(data.puzzle)
      setWords(data.words)
      setIsTimerRunning(true)
    } catch (error) {
      console.error("Error generating puzzle:", error)
      alert("Failed to generate puzzle. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAllWordsFound = () => {
    setAllWordsFound(true)
    setIsTimerRunning(false)
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <div className="w-full max-w-md mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or statement"
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
            <Label htmlFor="use-ai">Use AI to generate words</Label>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Generating..." : "Generate Puzzle"}
          </Button>
        </form>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 items-start w-full">
        <div className="w-full md:w-3/4 flex justify-center">
          {puzzle.length > 0 && <WordSearchGrid puzzle={puzzle} words={words} onAllWordsFound={handleAllWordsFound} />}
        </div>
        <div className="w-full md:w-1/4 mt-4 md:mt-0 flex flex-col items-center">
          <Timer isRunning={isTimerRunning} />
          {allWordsFound && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center w-full">
              Congratulations! You found all the words!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

