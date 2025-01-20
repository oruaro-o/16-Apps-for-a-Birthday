"use client"

import { useState, useRef, useEffect } from "react"

interface WordSearchGridProps {
  puzzle: string[][]
  words: string[]
  onAllWordsFound: () => void
}

interface FoundWord {
  word: string
  coordinates: number[][]
}

export default function WordSearchGrid({ puzzle, words, onAllWordsFound }: WordSearchGridProps) {
  const [selection, setSelection] = useState<number[][]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [foundWords, setFoundWords] = useState<FoundWord[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (foundWords.length === words.length) {
      onAllWordsFound()
    }
  }, [foundWords, words, onAllWordsFound])

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true)
    setSelection([[row, col]])
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (isSelecting) {
      setSelection((prev) => {
        const newSelection = [...prev, [row, col]]
        const selectedWord = getSelectedWord(newSelection)
        if (words.includes(selectedWord) && !foundWords.some((fw) => fw.word === selectedWord)) {
          setFoundWords((prevFoundWords) => [...prevFoundWords, { word: selectedWord, coordinates: newSelection }])
        }
        return newSelection
      })
    }
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
    setSelection([])
  }

  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isSelecting) {
        setIsSelecting(false)
        setSelection([])
      }
    }

    document.addEventListener("mouseup", handleMouseUpOutside)
    return () => {
      document.removeEventListener("mouseup", handleMouseUpOutside)
    }
  }, [isSelecting])

  const getSelectedWord = (currentSelection: number[][]) => {
    return currentSelection.map(([row, col]) => puzzle[row][col]).join("")
  }

  const isLetterSelected = (row: number, col: number) => {
    return selection.some(([r, c]) => r === row && c === col)
  }

  const isLetterInFoundWord = (row: number, col: number) => {
    return foundWords.some((fw) => fw.coordinates.some(([r, c]) => r === row && c === col))
  }

  const isWordFound = (word: string) => {
    return foundWords.some((fw) => fw.word === word)
  }

  return (
    <div className="space-y-4 select-none flex flex-col items-center">
      <div
        ref={gridRef}
        className="inline-grid gap-0 bg-purple-100 p-2 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${puzzle[0].length}, 1fr)`,
        }}
      >
        {puzzle.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors duration-200
                ${
                  isLetterInFoundWord(rowIndex, colIndex)
                    ? "bg-green-300 text-purple-800"
                    : isLetterSelected(rowIndex, colIndex)
                      ? "bg-yellow-300 text-purple-800"
                      : "bg-purple-200 text-purple-600 hover:bg-purple-300"
                }`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {letter}
            </div>
          )),
        )}
      </div>
      <div className="mt-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2 text-purple-800 text-center">Words to find:</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 justify-center">
          {words.map((word, index) => (
            <li
              key={index}
              className={`${isWordFound(word) ? "line-through text-green-600" : "text-purple-600"} font-semibold`}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

