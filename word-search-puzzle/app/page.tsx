import WordSearchGame from "../components/WordSearchGame"

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-purple-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Word Search Puzzle Generator</h1>
      <WordSearchGame />
    </main>
  )
}

