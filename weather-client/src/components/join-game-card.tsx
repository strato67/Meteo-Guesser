import { Label } from "@radix-ui/react-dropdown-menu";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function JoinGameCard() {
    return (
        <>
            <Card className="w-96 bg-secondary ">
                <CardHeader>
                    <div className="flex items-baseline gap-2">
                        <Button variant="link" size="icon" asChild className=" bg-secondary rounded-lg hover:bg-background">
                            <Link href={"/"}>
                                <ArrowLeftIcon />
                            </Link>
                        </Button>

                        <CardTitle className="text-xl">Join a Game</CardTitle>
                    </div>

                    <CardDescription>
                        Enter a game code and play with your friends!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label>Game Code</Label>
                                <Input
                                    id="gamecode"
                                    placeholder="Enter a game code"
                                    className=" border-primary"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button variant={"destructive"} className="w-full py-5 " asChild>
                        <Link href={"/"}>Cancel</Link>
                        
                    </Button>
                    <Button className="w-full py-5" onClick={() => console.log()}>
                        Join Game
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
