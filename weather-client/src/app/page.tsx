import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full gap-6 min-h-screen">
      
      <h1 className="text-5xl font-bold text-center">Meteo Guesser</h1>
      <div className="flex flex-col md:flex-row gap-4">

        <Button asChild className="w-fit self-center p-6">

          <Link href="/game/test">
            Create Game
          </Link>

        </Button>
        <Button asChild className="w-fit self-center p-6">

          <Link href="/join">
            Join Game
          </Link>

        </Button>
      </div>
    </main>
  );
}
