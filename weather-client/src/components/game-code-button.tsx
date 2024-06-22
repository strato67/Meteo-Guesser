import { Button } from "./ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function GameCodeButton({
    lobbyName,
}: {
    lobbyName: string | string[];
}) {
    const [copied, setCopied] = useState(false);

    const handleChange = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(lobbyName.toString()).then(()=>
                        handleChange()
                    );

                }}
                className="py-6 text-xl"
            >
                {!copied ? (
                    <>
                        <span className="mr-2">
                            <ClipboardCopyIcon />
                        </span>
                        Game Code
                    </>
                ) : (
                    <>
                        <span className="mr-2">
                            <ClipboardCopyIcon />
                        </span>
                        Copied!
                    </>
                )}
            </Button>
        </>
    );
}
