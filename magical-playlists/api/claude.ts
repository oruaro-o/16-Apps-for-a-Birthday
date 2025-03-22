interface ClaudeResponse {
  completion: string;
  stop_reason: string;
}

export const claudeApi = {
  complete: async ({ prompt, max_tokens }: { prompt: string; max_tokens: number }): Promise<string> => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_CLAUDE_API || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: max_tokens,
          temperature: 0.7,
          messages: [
            {
              role: 'user', 
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw error;
    }
  },
};

