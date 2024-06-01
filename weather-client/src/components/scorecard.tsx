import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import useTempConversion from "@/hooks/useTempConversion";

type PlayerScore = { selection: string; score: number };

export type PlayerList = {
    [key: string]: PlayerScore;
};

export default function ScoreCard({
    serverResult,
    playerList,
    id,
}: {
    serverResult: string;
    playerList: PlayerList;
    id: string;
}) {
    const sortedPlayers = Object.entries(playerList).sort(
        ([, a], [, b]) => b.score - a.score
    );

    const { convertTemp } = useTempConversion();
    let convertedTemp;

    try {
        convertedTemp = convertTemp(String(serverResult));
    } catch (error) {
        console.error("Conversion error:", error);
        convertedTemp = serverResult ?? "";
    }

    return (
        <Card className="w-96 bg-secondary">
            <CardHeader>
                <CardTitle className="text-xl">Answer: {convertedTemp}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">
                            Scoreboard
                        </h4>
                        {sortedPlayers.map(([key, player], index) => (
                            <React.Fragment key={index}>
                                <div className={`text-sm ${key === id ? 'text-green-500 font-semibold' : ''}`}>
                                    <div className="grid grid-cols-2">
                                        <div>{key}</div>
                                        <div className="justify-self-end">{player.score}</div>
                                    </div>

                                </div>
                                <Separator className="my-3" />

                                
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
