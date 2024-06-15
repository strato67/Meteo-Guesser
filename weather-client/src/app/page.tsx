"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RandExp from "randexp";

export default function Home() {
  const router = useRouter();

  const generateLobbyName = () => {
    return new RandExp(/^[A-Z][a-z][0-9]{2}[a-z]$/).gen();
  };

  const handleClick = () => {
    router.push(`/game/${generateLobbyName()}`);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full gap-6 min-h-screen">
      <h1 className="text-5xl font-bold text-center">Meteo Guesser</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="w-fit self-center p-6" onClick={() => handleClick()}>
          Create Game
        </Button>
        <Button asChild className="w-fit self-center p-6">
          <Link href="/join">Join Game</Link>
        </Button>
      </div>
    </main>
  );
}
