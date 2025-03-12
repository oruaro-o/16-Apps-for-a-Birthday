"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlaylistCreationPage() {
  const router = useRouter();
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add playlist creation logic here
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black p-8">
      <button
        onClick={handleBack}
        className="mb-8 text-white hover:text-purple-300 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-2xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create New Playlist
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="playlistName"
              className="block text-white mb-2"
            >
              Playlist Name
            </label>
            <input
              type="text"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-white mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
