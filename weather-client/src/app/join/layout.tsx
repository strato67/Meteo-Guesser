import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join a Game - Meteo Guesser",
    description: "Enter a game code and play with your friends!",
  };

export default function JoinLayout({children}:{children: React.ReactNode}){
    return(<>{children}</>)
}