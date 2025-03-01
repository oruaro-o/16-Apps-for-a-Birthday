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
      <div className="flex-grow mb-16 w-full">
        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="h-16 w-16 min-w-0 bg-white bg-opacity-10 rounded-lg items-center justify-center p-4 text-white hover:bg-opacity-20 transition-all cursor-pointer shadow-md"
              >
                <div className="h-12 w-12 overflow-hidden bg-[#1DB954] bg-opacity-20 rounded-lg items-center justify-center p-2">
                  <span className="text-sm font-bold text-center truncate w-full">
                    {playlist.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex items-center justify-center text-white opacity-50">
            Loading playlists...
          </div>
        )}
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
