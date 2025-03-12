"use client";

import PlaylistCreation from "../../pages/PlaylistCreation";
import { useRouter } from "next/navigation";

export default function PlaylistCreationPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return <PlaylistCreation onBack={handleBack} />;
}
