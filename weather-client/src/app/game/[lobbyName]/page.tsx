"use client";

import GameBoard from "@/components/game-board";
import Image from "next/image";
import useWebSocket, { ReadyState } from "react-use-websocket";
import LoadingGame from "@/components/loading-game";
import ConnectionFailed from "@/components/connection-failed";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useTempConversion from "@/hooks/useTempConversion";
import Scorecard from "@/components/scorecard";


export default function Page() {
    const { lobbyName } = useParams();
    const { convertTemp } = useTempConversion();
    const [id, setId] = useState(Math.random());
    const socketUrl = `ws://localhost:8080/${lobbyName}/?token=${id}`;

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const [selection, setSelection] = useState<number | null>(null);
    const [answer, setAnswer] = useState<string>("");
    const [timer, setTimer] = useState<number>(60);
    const [intermission, setIntermission] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<string[]>(["", "", "", ""]);
    const [round, setRound] = useState<number>(1);

    useEffect(() => {
        if (answer !== "") {
            sendMessage(answer!.toString());
        }
    }, [answer, sendMessage]);

    useEffect(() => {
        const parseMessage = (message: string) => {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.countdown !== undefined) {
                setTimer(parsedMessage.countdown);

                if (parsedMessage.countdown === 0) {
                    setIntermission(true)
                }

            }

            if (parsedMessage.round !== undefined) {
                setRound(parsedMessage.round);
                setIntermission(false)
            }

            if (parsedMessage.questionString !== undefined) {

                const temp = convertTemp(parsedMessage.questionString);
                setQuestion(temp);

            }

            if (parsedMessage.answerOptions !== undefined) {

                setOptions((prevOptions) => {
                    if (JSON.stringify(prevOptions) !== JSON.stringify(parsedMessage.answerOptions)) {
                        return parsedMessage.answerOptions;
                    }
                    return prevOptions;
                });
            }

        };

        const message = lastMessage?.data;

        if (message) {
            console.log(message);
            parseMessage(message);
        }
    }, [convertTemp, lastMessage?.data, options]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    if (connectionStatus === "Connecting") {
        return <LoadingGame />;
    }

    if (connectionStatus === "Closed") {
        return <ConnectionFailed />;
    }

    return (
        <>

            <div className="relative w-full items-center h-screen z-0">
                <div className="w-full h-screen flex items-center justify-center  backdrop-blur-xl bg-secondary/70 opacity-100">
                    <Scorecard />
                </div>

                <div className="flex flex-col w-full items-center mt-16 gap-4 absolute inset-x-0 top-0 h-2/3 opacity-0">
                    <div className="text-xl font-semibold">{round}/10</div>
                    <h1 className="text-3xl text-center font-bold">{question}</h1>
                    <div className="border-t border-stone w-full"></div>
                    <div className="grid grid-cols-3 justify-items-center w-full place-items-center h-1/2">
                        <div className="justify-self-center pt-8 bg-indigo-700 rounded-full h-24 text-center w-24 font-semibold text-2xl text-white">
                            {timer}
                        </div>
                        <Image
                            src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                            width={256}
                            height={256}
                            alt=""
                        />
                        <Button
                            onClick={() => sendMessage("answer")}
                            className="w-24 py-6  text-xl"
                        >
                            Skip
                        </Button>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1/3">
                    {!intermission && options && <GameBoard
                        selection={selection}
                        setSelection={setSelection}
                        options={options}
                        setAnswer={setAnswer}
                    />}
                </div>
            </div>
        </>
    );
}
