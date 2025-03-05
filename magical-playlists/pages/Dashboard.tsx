import type React from "react";
import { Button } from "../components/Button";

interface PlaylistType {
  id: string;
  name: string;
  coverArt?: string;
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
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] flex flex-col">
      <div className="px-8 flex flex-col flex-grow relative">
        {/* Top section with button */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2">
          <Button
            className="w-44 h-44 rounded-full text-xl font-bold text-[#1DB954] bg-[#1E123A] hover:bg-[#2D1B4C] transition-all shadow-lg border-2 border-[#1DB954] animate-gentle-flash"
            onClick={onCreateMagic}
          >
            Create Magic
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-white mb-8 mt-[calc(5rem+176px)]">
          <h1 className="text-3xl font-bold">Your Playlists</h1>
          <p className="text-gray-300 mt-2">
            Select playlists to create something magical
          </p>
        </div>

        {/* Playlists Grid */}
        <div className="overflow-x-auto -mx-4">
          <div className="px-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gridAutoRows: "1fr",
                gap: "2rem",
                minWidth: "700px",
              }}
            >
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group cursor-pointer w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg aspect-square transition-all shadow-md overflow-hidden relative w-full">
                      <div className="h-full w-full">
                        {playlist.coverArt ? (
                          <img
                            src={playlist.coverArt}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#1DB954] bg-opacity-20">
                            <div className="text-4xl text-white">🎵</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-white font-bold mt-2 truncate w-full text-center">
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
