interface ClaudeResponse {
  completion: string;
  stop_reason: string;
}

export const claudeApi = {
  complete: async ({ prompt, max_tokens }: { prompt: string; max_tokens: number }): Promise<string> => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_CLAUDE_API || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
          model: 'claude-3-5-sonnet-20240620',
          max_tokens_to_sample: max_tokens,
          temperature: 0.7
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

