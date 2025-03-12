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

export default function DashboardPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleCreateMagic = () => {
    console.log("Magic playlist created!");
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
