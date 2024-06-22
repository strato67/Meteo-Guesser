import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { resetGlobalState } from "react-use-websocket";
import { convertTemp } from "../app/game/[lobbyName]/unitConvert";

type PlayerScore = { selection: string; score: number };

export type PlayerList = {
    [key: string]: PlayerScore;
};

export default function ScoreCard({
    serverResult,
    playerList,
    id,
    fahrenheit
}: {
    serverResult: string;
    playerList: PlayerList;
    id: string;
    fahrenheit:boolean;
}) {
    const sortedPlayers = Object.entries(playerList).sort(
        ([, a], [, b]) => b.score - a.score
    );

    return (
        <Card className="w-96 bg-secondary">
            <CardHeader>
                <CardTitle className="text-xl">Answer: {convertTemp(String(serverResult), fahrenheit)}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-max-96">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">
                            Scoreboard
                        </h4>
                        {sortedPlayers.map(([key, player], index) => (
                            <React.Fragment key={index}>
                                <div
                                    className={`text-sm ${key === id ? "text-green-500 font-semibold" : ""
                                        }`}
                                >
                                    <div className="grid grid-cols-2">
                                        <div>{key}</div>
                                        <div className="justify-self-end">{player.score}</div>
                                    </div>
                                </div>
                                <Separator className="my-3" />
                            </React.Fragment>
                        ))}

                        <Button
                            asChild
                            className="self-center p-6 mt-6 w-full"
                            variant={"destructive"}
                            onClick={() => resetGlobalState("ws://localhost:8080/")}
                        >
                            <Link href="/">Leave Game</Link>
                        </Button>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
