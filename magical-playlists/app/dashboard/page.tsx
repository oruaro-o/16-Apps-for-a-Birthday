"use client";

import Dashboard from "../../pages/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { spotifyApi } from "../../api/spotify";

export default function DashboardPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState([]);

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
        const userPlaylists = await spotifyApi.getUserPlaylists(token);
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Failed to load playlists:", error);
      }
    };
    loadPlaylists();
  }, [router]);

  const handleCreateMagic = () => {
    router.push("/playlist-creation");
  };

  return <Dashboard onCreateMagic={handleCreateMagic} />;
}
