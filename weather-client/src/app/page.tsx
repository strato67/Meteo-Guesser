import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-center">Weather Guesser</h1>
        <Button asChild className="w-fit self-center p-6">

          <Link href="/singleplayer">
            Single Player
          </Link>

        </Button>
      </div>
    </main>
  );
}
