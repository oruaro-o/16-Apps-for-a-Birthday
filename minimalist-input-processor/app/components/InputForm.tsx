'use client'

import { useState } from 'react'
import { processInput } from '../actions'
import { motion } from 'framer-motion';

export default function InputForm() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append('text', text)
    if (file) {
      formData.append('image', file)
    }

    try {
      const response = await processInput(formData)
      setResult(response.message)
    } catch (error) {
      setResult('An error occurred while processing your input.')
    }

    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-lg font-medium text-gray-700 mb-2">
            Roast your ideas or upload a photo below and get cooked
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ease-in-out"
            rows={4}
            placeholder="Type your half-baked idea here..."
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
            Or drop a spicy pic 🌶️
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-all duration-300 ease-in-out"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? 'Cooking up a response...' : 'Roast Me! 🔥'}
        </button>
        {result && (
          <div className="mt-6 p-6 bg-orange-50 rounded-lg border-2 border-orange-200 shadow-md">
            <h2 className="text-xl font-bold mb-3 text-orange-800">Here's your roast:</h2>
            <p className="text-gray-700 italic">{result}</p>
          </div>
        )}
      </form>
    </motion.div>
  )
}

