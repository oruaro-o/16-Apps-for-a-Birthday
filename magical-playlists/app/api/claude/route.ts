import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

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

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY || '',
    });

    // Create message using the SDK
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Access the content safely
    const content = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    return NextResponse.json({ completion: content });
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