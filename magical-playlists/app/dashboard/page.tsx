"use client";

import Dashboard from "../../pages/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { spotifyApi } from "../../api/spotify";

interface PlaylistType {
  id: string;
  name: string;
  coverArt?: string;
  tracks: {
    id: string;
    name: string;
    artist: string;
    album: string;
    duration_ms: number;
    uri: string;
  }[];
}

interface GeneratedTrack {
  name: string;
  artist: string;
  album?: string;
  confidence: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedTracks, setGeneratedTracks] = useState<GeneratedTrack[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      router.push("/");
      return;
    }

    // Load user's playlists
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const userPlaylists = await spotifyApi.getUserPlaylists(token);
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Failed to load playlists:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlaylists();
  }, [router]);

  const handleCreateMagic = (tracks: GeneratedTrack[]) => {
    setGeneratedTracks(tracks);
    // Store the tracks in localStorage for persistence across page navigation
    localStorage.setItem("generated_tracks", JSON.stringify(tracks));
    router.push("/playlist-creation");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] flex items-center justify-center">
        <div className="text-white text-xl">Loading your playlists...</div>
      </div>
    );
  }

  return (
    <Dashboard
      onCreateMagic={handleCreateMagic}
      playlists={playlists}
    />
  );
}
