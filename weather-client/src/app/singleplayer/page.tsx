"use client";

import GameBoard from "@/components/game-board"
import Image from "next/image"
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function Page() {

    const socketUrl = 'ws://localhost:8080';

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

      useEffect(() => {
        console.log(connectionStatus);
      }, [connectionStatus]);

    if (connectionStatus === "Closed") {
        return <div>Could not connect to the server.</div>
    }

    if (connectionStatus === "Connecting") {
        return <div>Connecting...</div>
    }


    return (<>

        <div className="flex flex-col w-full items-center min-h-screen mt-16 ">
            <h1 className="text-2xl">Question</h1>


            <div className="flex flex-row w-full justify-center">
                <h2>1:00</h2>
                <Image src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg" width={100} height={100} alt="" />
            </div>

            <GameBoard />
        </div>
    </>)
}