export const handleApiError = (error: Error, retryFunction: () => void) => {
  console.error("API Error:", error)
  // Implement retry logic here
  if (confirm("An error occurred. Would you like to try again?")) {
    retryFunction()
  }
}

export const validatePrompt = (prompt: string): boolean => {
  const maxLength = 500
  if (prompt.length > maxLength) {
    alert(`Prompt is too long. Maximum length is ${maxLength} characters.`)
    return false
  }
  return true
}

