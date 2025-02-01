"use client";

import { Button } from "../components/Button";
import { FaSpotify } from "react-icons/fa";
import { spotifyApi } from "../api/spotify";
import { useRouter } from "next/navigation";

export default function SyntheticV0PageForDeployment() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // This will redirect to Spotify's auth page
      await spotifyApi.authorize(
        "playlist-read-private playlist-modify-private"
      );
      // We don't need router.push here because spotifyApi.authorize
      // will redirect to Spotify's auth page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2D1B4C] to-[#1E123A]">
      <h1 className="text-5xl font-bold text-white mb-8">Magical Playlists</h1>
      <Button
        variant="spotify"
        onClick={handleLogin}
        className="w-64 h-12 justify-center text-base font-bold"
      >
        <FaSpotify className="mr-2 text-xl" />
        Login with Spotify
      </Button>
    </div>
  );
}
