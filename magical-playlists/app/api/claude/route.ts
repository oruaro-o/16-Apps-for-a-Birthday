import { NextResponse } from 'next/server';

interface PlaylistDetail {
  id: string;
  name: string;
  tracks: Array<{
    name: string;
    artist: string;
    id: string;
  }>;
}

interface RequestBody {
  userPrompt: string;
  selectedPlaylists: PlaylistDetail[];
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { userPrompt, selectedPlaylists } = body;

    // Construct the prompt for Claude
    const prompt = `Create a playlist based on: ${userPrompt}. 
Here are the playlists and their tracks I'm drawing inspiration from:

${selectedPlaylists
  .map(
    (playlist) => `
Playlist: ${playlist.name}
Tracks:
${playlist.tracks
  .map((track) => `- ${track.name} by ${track.artist}`)
  .join("\n")}
`
  )
  .join("\n")}

Please analyze these tracks and create a curated playlist that matches the prompt. Include your reasoning and suggestions.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
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
    return NextResponse.json({ completion: data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 