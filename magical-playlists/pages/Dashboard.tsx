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
  // Double the playlists to ensure we have enough for two identical rows
  // If no playlists are available, use an empty array
  const extendedPlaylists =
    [...playlists, ...playlists].length > 0 ? [...playlists, ...playlists] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4C] to-[#1E123A] flex flex-col items-center justify-between py-10 relative overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center">
        <Button
          className="w-44 h-44 rounded-full text-xl font-bold text-[#1DB954] bg-[#1E123A] hover:bg-[#2D1B4C] transition-all shadow-lg border-2 border-[#1DB954] animate-gentle-flash mb-32"
          onClick={onCreateMagic}
        >
          Create Magic
        </Button>
      </div>
      <div className="w-full mb-[10vh]">
        <div className="w-full h-px bg-white opacity-20 mb-8"></div>
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "328px" }}
        >
          {extendedPlaylists.length > 0 ? (
            <div
              className="absolute flex flex-col gap-7 animate-scroll-2rows"
              style={{ width: "400%" }}
            >
              {[0, 1].map((rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex gap-5"
                >
                  {[...extendedPlaylists, ...extendedPlaylists].map(
                    (playlist, index) => (
                      <div
                        key={`${playlist.id}-${rowIndex}-${index}`}
                        className="w-48 h-36 flex-shrink-0 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center text-white hover:bg-opacity-20 transition-all cursor-pointer"
                      >
                        {playlist.name}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white opacity-50">
              Loading playlists...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
