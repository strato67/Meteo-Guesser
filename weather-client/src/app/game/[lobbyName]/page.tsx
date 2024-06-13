"use client";

import GameBoard from "@/components/game-board";
import Image from "next/image";
import useWebSocket, { ReadyState } from "react-use-websocket";
import LoadingGame from "@/components/loading-game";
import ConnectionFailed from "@/components/connection-failed";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Scorecard from "@/components/scorecard";
import GameCodeButton from "@/components/game-code-button";
import SettingsDropdown from "@/components/settings-dropdown";
import { convertTemp } from "./unitConvert";

export default function Page() {
  const { lobbyName } = useParams();
  const [id, setId] = useState(String(Math.random()));
  const socketUrl = `ws://localhost:8080/${lobbyName}/?token=${id}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [selection, setSelection] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [serverResult, setServerResult] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [intermission, setIntermission] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [round, setRound] = useState<number>(1);
  const [playerList, setPlayerList] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [fahrenheit, setFahrenheit] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("tempUnit") == "true" || false
      : false
  );

  useEffect(() => {
    if (userAnswer !== "") {
      sendMessage(userAnswer!.toString());
    }
  }, [userAnswer, sendMessage]);

  useEffect(() => {
    const parseMessage = (message: string) => {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.countdown !== undefined) {
        setTimer(parsedMessage.countdown);

        if (parsedMessage.countdown === 0) {
          setTimeout(() => {
            setIntermission(true);
          }, 1000);
        }
      }

      if (parsedMessage.round !== undefined) {
        setRound(parsedMessage.round);
        setIntermission(false);
        setSelection(null);
      }

      if (parsedMessage.questionString !== undefined) {
        setQuestion(parsedMessage.questionString);
      }

      if (parsedMessage.answer !== undefined) {
        setServerResult(parsedMessage.answer);
      }

      if (parsedMessage.answerOptions !== undefined) {
        setOptions((prevOptions) => {
          if (
            JSON.stringify(prevOptions) !==
            JSON.stringify(parsedMessage.answerOptions)
          ) {
            return parsedMessage.answerOptions;
          }
          return prevOptions;
        });
      }

      if (parsedMessage.playerList !== undefined) {
        setPlayerList((prevList) => {
          if (
            JSON.stringify(prevList) !==
            JSON.stringify(parsedMessage.playerList)
          ) {
            return parsedMessage.playerList;
          }
          return prevList;
        });
      }

      if (parsedMessage.gameOver) {
        setGameOver(true);
      }
    };

    const message = lastMessage?.data;

    if (message) {
      console.log(message);
      parseMessage(message);
    }
  }, [lastMessage?.data, options]);

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

  if (connectionStatus === "Closed" && !gameOver) {
    return <ConnectionFailed />;
  }

  return (
    <>
      <div className="relative w-full items-center h-screen ">
        <div
          className={`w-full h-screen flex items-center justify-center opacity-100 z-20 ${
            intermission ? "absolute" : "hidden"
          }`}
        >
          <Scorecard
            serverResult={serverResult}
            playerList={playerList}
            id={id}
            fahrenheit={fahrenheit}
          />
        </div>

        <div
          className={`flex flex-col w-full items-center mt-16 gap-4 absolute inset-x-0 top-0 h-2/3 z-10 ${
            intermission ? "blur-sm" : ""
          }`}
        >
          <div className="text-xl font-semibold">{round}/10</div>
          <h1 className="text-3xl text-center font-bold">
            {convertTemp(question, fahrenheit)}
          </h1>
          <div className="border-t border-stone w-full"></div>
          <div className="mr-4 self-end">
            <SettingsDropdown
              fahrenheit={fahrenheit}
              setFahrenheit={setFahrenheit}
            />
          </div>

          <div className="grid grid-cols-3 justify-items-center w-full place-items-center h-1/2">
            <div className="justify-self-center pt-8 bg-indigo-700 rounded-full h-24 text-center w-24 font-semibold text-2xl text-white select-none">
              {timer}
            </div>
            <Image
              src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
              width={256}
              height={256}
              alt=""
            />
            <GameCodeButton lobbyName={lobbyName} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/3">
          {!intermission && options && (
            <GameBoard
              selection={selection}
              options={options}
              fahrenheit={fahrenheit}
              setSelection={setSelection}
              setUserAnswer={setUserAnswer}
            />
          )}
        </div>
      </div>
    </>
  );
}
