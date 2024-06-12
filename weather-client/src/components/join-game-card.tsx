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

export default function JoinGameCard() {
    return (
        <>
            <Card className="w-96 bg-secondary">
                <CardHeader>
                    <CardTitle className="text-xl">Join a Game</CardTitle>
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
                <CardFooter>
                    <Button className="w-full" onClick={()=>console.log()} >Join Game</Button>
                </CardFooter>
            </Card>
        </>
    );
}
