import { NextResponse } from "next/server"
import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

function getDummyWords(topic: string): string[] {
  const topics: { [key: string]: string[] } = {
    animals: ["DOG", "CAT", "ELEPHANT", "GIRAFFE", "LION", "TIGER", "ZEBRA", "MONKEY", "BEAR", "WOLF"],
    fruits: ["APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO", "PINEAPPLE", "STRAWBERRY", "KIWI", "PEACH", "PEAR"],
    countries: ["USA", "CANADA", "BRAZIL", "FRANCE", "GERMANY", "JAPAN", "AUSTRALIA", "INDIA", "EGYPT", "MEXICO"],
    default: ["PUZZLE", "GAME", "FUN", "CHALLENGE", "SEARCH", "WORDS", "HIDDEN", "FIND", "SOLVE", "PLAY"],
  }

  return topics[topic.toLowerCase()] || topics["default"]
}

export async function POST(req: Request) {
  const { topic, useAI } = await req.json()

  try {
    let words: string[]

    if (useAI) {
      const { text } = await generateText({
        model: anthropic("claude-3-5-haiku-20241022"),
        system: "You generate words related to a {{topic}}. You provide only generated words, separated by commas, without any additional text or explanation.",
        prompt: `Generate 10 words related to the topic or statement: "${topic}". Provide only the words, separated by commas, without any additional text or explanation.`,
      })
      words = text.split(",").map((word) => word.trim().toUpperCase())
    } else {
      words = getDummyWords(topic)
    }

    const puzzle = generateWordSearchPuzzle(words)

    return NextResponse.json({ puzzle, words })
  } catch (error) {
    console.error("Error generating puzzle:", error)
    return NextResponse.json({ error: "Failed to generate puzzle" }, { status: 500 })
  }
}

function generateWordSearchPuzzle(words: string[]) {
  const size = 15
  const grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""))

  // Place words in the grid
  words.forEach((word) => {
    let placed = false
    while (!placed) {
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical"
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)

      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction)
        placed = true
      }
    }
  })

  // Fill empty spaces with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      }
    }
  }

  return grid
}

function canPlaceWord(grid: string[][], word: string, row: number, col: number, direction: string) {
  if (direction === "horizontal" && col + word.length > grid[0].length) return false
  if (direction === "vertical" && row + word.length > grid.length) return false

  for (let i = 0; i < word.length; i++) {
    const currentRow = direction === "horizontal" ? row : row + i
    const currentCol = direction === "horizontal" ? col + i : col

    if (grid[currentRow][currentCol] !== "" && grid[currentRow][currentCol] !== word[i]) {
      return false
    }
  }

  return true
}

function placeWord(grid: string[][], word: string, row: number, col: number, direction: string) {
  for (let i = 0; i < word.length; i++) {
    const currentRow = direction === "horizontal" ? row : row + i
    const currentCol = direction === "horizontal" ? col + i : col
    grid[currentRow][currentCol] = word[i]
  }
}

