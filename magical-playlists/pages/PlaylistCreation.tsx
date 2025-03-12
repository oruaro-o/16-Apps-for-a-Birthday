import type React from "react";
import { useState } from "react";
import { Button } from "../components/Button";

interface GeneratedTrack {
  name: string;
  artist: string;
  album?: string;
  confidence: number;
}

interface PlaylistCreationProps {
  onBack: () => void;
  generatedTracks: GeneratedTrack[];
}

const PlaylistCreation: React.FC<PlaylistCreationProps> = ({
  onBack,
  generatedTracks = [],
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedTracks, setSelectedTracks] =
    useState<GeneratedTrack[]>(generatedTracks);

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    if (selectedTracks.length === 0) {
      alert("Please select at least one track");
      return;
    }

    // TODO: Implement Spotify playlist creation
    console.log("Creating playlist:", {
      name: playlistName,
      tracks: selectedTracks,
    });
  };

  const toggleTrackSelection = (track: GeneratedTrack) => {
    setSelectedTracks((prev) =>
      prev.some((t) => t.name === track.name && t.artist === track.artist)
        ? prev.filter((t) => t.name !== track.name || t.artist !== track.artist)
        : [...prev, track]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] p-8">
      <div className="flex justify-between mb-8">
        <Button onClick={onBack}>Back</Button>
        <Button
          onClick={handleCreatePlaylist}
          className="bg-[#1DB954] hover:bg-[#1ED760]"
        >
          Create Playlist
        </Button>
      </div>

      {/* Playlist Name Input */}
      <div className="mb-8">
        <input
          type="text"
          className="w-full bg-white bg-opacity-10 text-white rounded-lg p-4 border border-[#FFE1A8] focus:outline-none focus:ring-2 focus:ring-[#FFE1A8]"
          placeholder="Enter playlist name..."
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>

      {/* Generated Tracks List */}
      <div className="bg-white bg-opacity-5 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Generated Tracks</h2>
        <div className="space-y-4">
          {generatedTracks.map((track, index) => (
            <div
              key={`${track.name}-${track.artist}-${index}`}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedTracks.some(
                  (t) => t.name === track.name && t.artist === track.artist
                )
                  ? "bg-[#1DB954] bg-opacity-20 border border-[#1DB954]"
                  : "bg-white bg-opacity-10 hover:bg-opacity-15"
              }`}
              onClick={() => toggleTrackSelection(track)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{track.name}</h3>
                  <p className="text-gray-400">{track.artist}</p>
                  {track.album && (
                    <p className="text-gray-500 text-sm">{track.album}</p>
                  )}
                </div>
                <div className="text-gray-400 text-sm">
                  {Math.round(track.confidence * 100)}% match
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCreation;
