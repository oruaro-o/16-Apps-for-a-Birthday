// Constants for Spotify API
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'

// Replace with your actual client ID from Spotify Developer Dashboard
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string

if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error('Missing required environment variables')
}

// Helper function to generate random string for state
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Helper function to generate code challenge from verifier
async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// This is a placeholder for the actual Spotify-API integration
export const spotifyApi = {
  authorize: async (scope: string) => {
    // Generate and store PKCE verifier
    const verifier = generateRandomString(128)
    localStorage.setItem('code_verifier', verifier)
    
    // Generate code challenge
    const challenge = await generateCodeChallenge(verifier)
    
    // Generate state
    const state = generateRandomString(16)
    localStorage.setItem('spotify_auth_state', state)

    // Build authorization URL
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: challenge,
    })

    // Redirect to Spotify authorization page
    window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`
  },

  handleCallback: async (code: string, state: string): Promise<string> => {
    const storedState = localStorage.getItem('spotify_auth_state')
    const verifier = localStorage.getItem('code_verifier')

    if (!storedState || !verifier || state !== storedState) {
      throw new Error('State mismatch or missing verifier')
    }

    // Exchange code for access token
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    })

    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })

    if (!response.ok) {
      throw new Error('Failed to get access token')
    }

    const data = await response.json()
    return data.access_token
  },

  getUserPlaylists: async (accessToken: string) => {
    const response = await fetch(`${SPOTIFY_API_BASE}/me/playlists`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 429) {
        // Handle rate limiting
        const retryAfter = response.headers.get('Retry-After')
        throw new Error(`Rate limited. Try again in ${retryAfter} seconds`)
      }
      throw new Error('Failed to fetch playlists')
    }

    const data = await response.json()
    return data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      coverArt: playlist.images && playlist.images.length > 0 ? playlist.images[0].url : undefined
    }))
  },
}

