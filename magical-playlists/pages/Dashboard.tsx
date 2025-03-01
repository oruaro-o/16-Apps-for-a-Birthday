import type React from "react";
import { Button } from "../components/Button";

interface PlaylistType {
  id: string;
  name: string;
}

interface DashboardProps {
  onCreateMagic: () => void;
  playlists: PlaylistType[];
}

const Dashboard: React.FC<DashboardProps> = ({
  onCreateMagic,
  playlists = [],
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] flex flex-col px-6 py-10 relative">
      {/* Top section with button */}
      <div className="flex justify-center mb-16">
        <Button
          className="w-44 h-44 rounded-full text-xl font-bold text-[#1DB954] bg-[#1E123A] hover:bg-[#2D1B4C] transition-all shadow-lg border-2 border-[#1DB954] animate-gentle-flash"
          onClick={onCreateMagic}
        >
          Create Magic
        </Button>
      </div>

      {/* Header Section */}
      <div className="text-white mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <p className="text-gray-300 mt-2">
          Select playlists to create something magical
        </p>
      </div>

      {/* Playlists Grid - Fixed 7 columns per row */}
      <div className="w-full overflow-x-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1rem",
            minWidth: "700px",
          }}
        >
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group cursor-pointer w-full"
            >
              <div className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg aspect-square transition-all shadow-md overflow-hidden">
                <div className="h-3/4 bg-[#1DB954] bg-opacity-20 flex items-center justify-center">
                  {/* Playlist icon/art would go here */}
                  <div className="text-2xl text-white">🎵</div>
                </div>
                <div className="h-1/4 flex items-center justify-center px-2">
                  <span className="text-xs text-white font-medium truncate w-full text-center">
                    {playlist.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Area */}
      <div className="mt-auto pt-4 border-t border-white border-opacity-10">
        <p className="text-sm text-center text-white text-opacity-50">
          Powered by Spotify
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
