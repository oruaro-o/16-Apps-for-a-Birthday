"use client";

import Dashboard from "../../pages/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { spotifyApi } from "../../api/spotify";

interface PlaylistType {
  id: string;
  name: string;
  coverArt?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const validateAndLoadData = async () => {
      // Check if user is authenticated
      const token = localStorage.getItem("spotify_access_token");
      if (!token) {
        router.push("/");
        return;
      }

      setAccessToken(token);

      try {
        setLoading(true);
        const userPlaylists = await spotifyApi.getUserPlaylists(token);
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Failed to load playlists:", error);
        // If we get an unauthorized error or any other error, redirect to login
        localStorage.removeItem("spotify_access_token"); // Clear invalid token
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    validateAndLoadData();
  }, [router]);

  const handleCreateMagic = () => {
    console.log("Magic playlist created!");
  };

  // Don't render anything if we don't have a token
  if (!accessToken) {
    return null;
  }

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
      accessToken={accessToken}
    />
  );
}
