"use client";

import { Login } from "../pages/Login";
import { spotifyApi } from "../api/spotify";

export default function SyntheticV0PageForDeployment() {
  const handleLogin = async () => {
    // Request necessary Spotify permissions
    await spotifyApi.authorize("playlist-read-private playlist-modify-private");
  };

  return <Login onLogin={handleLogin} />;
}
