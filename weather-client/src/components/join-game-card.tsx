import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  gamecode: z.string().regex(/^[A-Z][a-z][0-9]{2}[a-z]$/, {
    message: "Invalid game code.",
  }),
});

export default function JoinGameCard() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gamecode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/game/${values.gamecode}`)
  };

  return (
    <>
      <Form {...form}>
        <Card className="w-96 bg-secondary ">
          <CardHeader>
            <div className="flex items-baseline gap-2">
              <Button
                variant="link"
                size="icon"
                asChild
                className=" bg-secondary rounded-lg hover:bg-background"
              >
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="gamecode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter a game code"
                            {...field}
                            className="border-primary"
                            required
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant={"destructive"} className="w-full py-5 " asChild>
                <Link href={"/"}>Cancel</Link>
              </Button>
              <Button className="w-full py-5" type="submit">
                Join Game
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </>
  );
}
