import type React from "react";
import { useState } from "react";
import { Button } from "../components/Button";
import { DUMMY_DATA } from "../data/dummyData";

interface PlaylistCreationProps {
  onBack: () => void;
}

const PlaylistCreation: React.FC<PlaylistCreationProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const handleCreatePlaylist = () => {
    // TODO: Implement playlist creation logic
    console.log("Creating playlist with prompt:", prompt);
    console.log("Selected playlists:", selectedPlaylists);
  };

  const togglePlaylistSelection = (id: string) => {
    setSelectedPlaylists((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] p-8">
      <div className="flex justify-between mb-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleCreatePlaylist}>Create</Button>
      </div>
      <textarea
        className="w-full min-h-[100px] bg-white bg-opacity-10 text-white rounded-lg p-4 resize-none"
        placeholder="Describe the perfect playlist..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {DUMMY_DATA.playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`w-full h-32 bg-white bg-opacity-10 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all ${
              selectedPlaylists.includes(playlist.id)
                ? "ring-2 ring-white ring-opacity-50"
                : ""
            }`}
            onClick={() => togglePlaylistSelection(playlist.id)}
          >
            <div className="text-center">
              <div>{playlist.name}</div>
              <div className="text-sm opacity-70">
                {DUMMY_DATA.songs[playlist.id]?.length || 0} songs
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistCreation;
