import type React from "react";
import { Button } from "../components/Button";
import { useState } from "react";
import { claudeApi } from "../api/claude";
import { spotifyApi } from "../api/spotify";
import { Modal } from "../components/Modal";

interface PlaylistType {
  id: string;
  name: string;
  coverArt?: string;
}

interface TrackType {
  name: string;
  artist: string;
  id: string;
}

interface DashboardProps {
  onCreateMagic: () => void;
  playlists: PlaylistType[];
  accessToken: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  onCreateMagic,
  playlists = [],
  accessToken,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [claudeResponse, setClaudeResponse] = useState("");

  const togglePlaylistSelection = (id: string) => {
    setSelectedPlaylists((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCreateMagic = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a prompt");
      return;
    }

    if (selectedPlaylists.length === 0) {
      alert("Please select at least one playlist");
      return;
    }

    setIsLoading(true);

    try {
      const selectedPlaylistDetails = await Promise.all(
        playlists
          .filter((playlist) => selectedPlaylists.includes(playlist.id))
          .map(async (playlist) => {
            const tracks = await spotifyApi.getPlaylistTracks(
              accessToken,
              playlist.id
            );
            return {
              id: playlist.id,
              name: playlist.name,
              tracks: tracks,
            };
          })
      );

      // Send to Claude API with tracks included
      const result = await claudeApi.complete({
        prompt: `Create a playlist based on: ${prompt}. 
Here are the playlists and their tracks I'm drawing inspiration from:

${selectedPlaylistDetails
  .map(
    (playlist) => `
Playlist: ${playlist.name}
Tracks:
${playlist.tracks
  .map((track: TrackType) => `- ${track.name} by ${track.artist}`)
  .join("\n")}
`
  )
  .join("\n")}

Please analyze these tracks and create a curated playlist that matches the prompt. Include your reasoning and suggestions.`,
        max_tokens: 1000,
      });

      setClaudeResponse(result);
      setModalOpen(true);

      // Call the original onCreateMagic to navigate or perform additional actions
      // onCreateMagic();
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] flex flex-col">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Your Magical Playlist"
        content={claudeResponse}
      />
      <div className="px-8 py-10 mt-16 flex flex-col flex-grow relative">
        {/* Prompt input */}
        <div className="mb-8">
          <textarea
            className="w-full min-h-[100px] bg-white bg-opacity-10 text-white rounded-lg p-4 resize-none border border-[#FFE1A8] focus:outline-none focus:ring-2 focus:ring-[#FFE1A8]"
            placeholder="Describe the perfect playlist..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Top section with button */}
        {/* py-10 mt-16 mb-16 */}
        <div className="py-6 mb-12 flex justify-center">
          <Button
            className={`w-48 h-16 rounded-xl text-xl font-bold text-[#1DB954] bg-[#FFE1A8] hover:bg-[#1DB954] hover:text-[#FFE1A8] transition-all shadow-lg border-2 border-[#2D1B4C] ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "animate-gentle-flash"
            }`}
            onClick={handleCreateMagic}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Magic"}
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold">Your Playlists</h1>
          <p className="text-gray-300 mt-2">
            Select playlists to create something magical
          </p>
        </div>

        {/* Playlists Grid */}
        <div className="overflow-x-auto -mx-4">
          <div className="px-4 py-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group cursor-pointer w-full"
                  onClick={() => togglePlaylistSelection(playlist.id)}
                >
                  <div className="flex flex-col items-center w-full">
                    <div
                      className={`bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg aspect-square transition-all shadow-md overflow-hidden w-full ${
                        selectedPlaylists.includes(playlist.id)
                          ? "ring-4 ring-[#1DB954]"
                          : ""
                      }`}
                    >
                      <div className="relative w-full h-full">
                        {playlist.coverArt ? (
                          <img
                            src={playlist.coverArt}
                            alt={playlist.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#1DB954]">
                            <div className="text-4xl text-white">🎵</div>
                          </div>
                        )}
                        {selectedPlaylists.includes(playlist.id) && (
                          <div className="absolute top-2 right-2 bg-[#1DB954] rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-white text-xs">✨</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-white font-bold mt-2 text-center text-wrap line-clamp-3">
                      {playlist.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto py-6">
          <p className="text-sm text-center text-white text-opacity-50">
            Powered by Oru & ☕️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
