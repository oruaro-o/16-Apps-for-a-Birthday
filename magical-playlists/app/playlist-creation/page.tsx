"use client";

import PlaylistCreation from "../../pages/PlaylistCreation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GeneratedTrack {
  name: string;
  artist: string;
  album?: string;
  confidence: number;
}

export default function PlaylistCreationPage() {
  const router = useRouter();
  const [generatedTracks, setGeneratedTracks] = useState<GeneratedTrack[]>([]);

  useEffect(() => {
    // Retrieve generated tracks from localStorage
    const storedTracks = localStorage.getItem("generated_tracks");
    if (!storedTracks) {
      router.push("/dashboard");
      return;
    }

    try {
      const tracks = JSON.parse(storedTracks);
      setGeneratedTracks(tracks);
    } catch (error) {
      console.error("Error parsing stored tracks:", error);
      router.push("/dashboard");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <PlaylistCreation
      onBack={handleBack}
      generatedTracks={generatedTracks}
    />
  );
}
