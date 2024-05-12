"use client";

import GameBoard from "@/components/game-board"
import Image from "next/image"
import useWebSocket, { ReadyState } from "react-use-websocket";
import LoadingGame from "@/components/loading-game";
import ConnectionFailed from "@/components/connection-failed";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Page() {

    const socketUrl = 'ws://localhost:8080';

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const [selection, setSelection] = useState<number | null>(null);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    if (connectionStatus === "Connecting") {
        return <LoadingGame />
    }

    if (connectionStatus === "Closed") {
        return <ConnectionFailed />
    }

    return (<>

        <div className="relative w-full items-center h-screen z-0">

            <div className="flex flex-col w-full items-center mt-16 gap-4 absolute inset-x-0 top-0 h-2/3">
            <div className="text-xl font-semibold">1/10</div>
                <h1 className="text-3xl text-center font-bold">The temperature is __ degrees Celsius in Whitby, ON...</h1>
                <div className="border-t border-stone w-full"></div>
                <div className="grid grid-cols-3 justify-items-center w-full place-items-center h-1/2">
                   
                    <div className="justify-self-center pt-8 bg-indigo-700 rounded-full h-24 text-center w-24 font-semibold text-2xl text-white">1:00</div>
                    <Image src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg" width={256} height={256} alt="" />
                    <Button onClick={() => sendMessage("answer")} className="w-24 py-6  text-xl">Skip</Button>
                </div>

                
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/3">
                <GameBoard selection={selection} setSelection={setSelection}/>

            </div>

        </div>
    </>)
}