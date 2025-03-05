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
      <div className="px-8 py-10 flex flex-col flex-grow relative">
        {/* Top section with button */}
        {/* py-10 mt-16 mb-16 */}
        <div className="py-10 mt-16 mb-16 flex justify-center">
          <Button
            className="w-48 h-16 rounded-xl text-xl font-bold text-[#1DB954] bg-[#1E123A] hover:bg-[#2D1B4C] transition-all shadow-lg border-2 border-[#1DB954] animate-gentle-flash"
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

        {/* Playlists Grid */}
        <div className="overflow-x-auto -mx-4">
          <div className="px-4 flex-wrap">
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
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg aspect-square transition-all shadow-md overflow-hidden w-full">
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
