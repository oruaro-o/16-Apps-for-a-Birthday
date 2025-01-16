'use server'

import { processInputAPI } from './api/processInput'

export async function processInput(formData: FormData) {
  const text = formData.get('text') as string
  const image = formData.get('image') as File | null

  // Here you would typically send the data to your backend API
  // For this example, we'll use a simulated API call
  const result = await processInputAPI(text, image)

  return result
}

