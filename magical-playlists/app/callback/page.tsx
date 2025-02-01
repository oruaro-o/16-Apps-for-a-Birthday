"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { spotifyApi } from "../../api/spotify";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (!code || !state) {
          throw new Error("Missing code or state");
        }

        // Exchange code for access token
        const accessToken = await spotifyApi.handleCallback(code, state);

        // Store the access token (you might want to use a more secure storage method)
        localStorage.setItem("spotify_access_token", accessToken);

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } catch (error) {
        console.error("Callback handling failed:", error);
        router.push("/"); // Redirect back to login on error
      }
    }

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2D1B4C] to-[#1E123A]">
      <div className="text-white text-xl">Logging you in...</div>
    </div>
  );
}
