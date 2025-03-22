interface ClaudeResponse {
  completion: string;
}

export const claudeApi = {
  complete: async ({ prompt, max_tokens }: { prompt: string; max_tokens: number }): Promise<string> => {
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          max_tokens
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ClaudeResponse = await response.json();
      return data.completion;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw error;
    }
  },
};

