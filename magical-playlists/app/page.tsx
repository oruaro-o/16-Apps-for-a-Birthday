"use client";

import Login from "../pages/Login";
import { spotifyApi } from "../api/spotify";
import { useRouter } from "next/navigation";

export default function SyntheticV0PageForDeployment() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Request necessary Spotify permissions
      await spotifyApi.authorize(
        "playlist-read-private playlist-modify-private"
      );
      // After successful authorization, Spotify will redirect to our callback URL
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <Login onLogin={handleLogin} />;
}
