import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function ScoreCard() {

    const tags = ["d","d","d","d"]

    return (

        <Card className="w-96">
            <CardHeader>
                <CardTitle className="text-xl">Answer:</CardTitle>
            </CardHeader>
            <CardContent>

                <ScrollArea >
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Scoreboard</h4>
                        {tags.map((tag) => (
                            <>
                                <div key={tag} className="text-lg">
                                    {tag}
                                </div>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>


            </CardContent>
        </Card>

    );
}
