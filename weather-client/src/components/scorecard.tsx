import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

export default function ScoreCard() {

    const tags = ["d","d","d","d"]

    return (

        <Card className="w-96 bg-secondary">
            <CardHeader>
                <CardTitle className="text-xl">Answer:</CardTitle>
            </CardHeader>
            <CardContent>

                <ScrollArea >
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Scoreboard</h4>
                        {tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <div key={index} className="text-lg">
                                    {tag}
                                </div>
                                <Separator className="my-2" />
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>


            </CardContent>
        </Card>

    );
}
