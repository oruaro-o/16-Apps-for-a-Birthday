import type React from "react";
import { Button } from "../components/Button";
import { FaSpotify } from "react-icons/fa";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // TODO: Implement actual Spotify authentication
    console.log("Logging in with Spotify");
    onLogin(); // Navigate to Dashboard after successful login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2D1B4C] to-[#1E123A]">
      <h1 className="text-5xl font-bold text-white mb-8">Magical Playlists</h1>
      <Button
        variant="spotify"
        onClick={handleLogin}
        className="w-64 h-12 justify-center text-base font-bold"
      >
        <FaSpotify className="mr-2 text-xl" />
        Login with Spotify
      </Button>
    </div>
  );
};

export default Login;
