import WebSocket from "ws";
import {
  getWeatherBatch,
  generateQuestionData,
  PlayerList,
  scoreAnswers,
  getAnswer,
} from "./session";
import { Question } from "./question";

export const webSocketServer = () => {
  const wss = new WebSocket.Server({ noServer: true });
  const MAX_ROUNDS = 10;
  const LOBBY_SIZE = 8;
  let playerList: PlayerList = {};

  let countdownInterval: NodeJS.Timeout | undefined;
  let countdownValue = 60;
  let round = 1;

  let question: null | Question = null;
  let answerOptions: string[] | number[] = [];
  let questionString: string = "";

  const terminateServer = () => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ gameOver: true }));
      client.close();

      process.nextTick(() => {
        if (client.OPEN || client.CLOSING) {
          client.terminate();
        }
      });
    });
  };

  function startRound() {
    if (round > MAX_ROUNDS) {
      terminateServer();
    }

    getWeatherBatch().then((data) => {
      const questionData = generateQuestionData(data);

      question = questionData.question;
      answerOptions = questionData.answerOptions;
      questionString = questionData.questionString;

      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ answerOptions, questionString }));
      });
    });

    countdownInterval = setInterval(() => {
      if (countdownValue >= 0) {
        decrementCountdown();
      } else {
        clearInterval(countdownInterval);
        if(Object.keys(playerList).length === 0){
          terminateServer()
        }
        
        if (question !== null) {
          playerList = scoreAnswers(playerList, question);
          const answer = getAnswer(question);
          wss.clients.forEach((client) => {
            client.send(JSON.stringify({ answer, playerList }));
          });
          console.log(playerList);
        }
        setTimeout(() => {
          incrementRound(); // Increment round
          countdownValue = 60; // Reset countdown value
          startRound(); // Restart countdown
        }, 15000); // Pause for 15 seconds
      }
    }, 1000); // Countdown interval: 1 second
  }

  function decrementCountdown() {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ countdown: countdownValue }));
    });
    countdownValue--;
  }

  const incrementRound = () => {
    round++;
    if (round > MAX_ROUNDS) {
      terminateServer();
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ round }));
    });
  };

  wss.on("connection", (ws: WebSocket, req) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const tokenID = url.search.replace("?token=", "");
    if (Object.keys(playerList).length <= LOBBY_SIZE) {
      playerList[tokenID] = { selection: "", score: 0 };
      console.log(`User ${tokenID} joined.`);
      console.log(playerList);
    } else {
      ws.close(1000, "Server full.");
    }

    if (question !== null) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ round, questionString, answerOptions }));
      });
    }

    if (!countdownInterval && round <= MAX_ROUNDS) {
      startRound();
    }

    ws.on("message", (message: string) => {
      console.log(`Received message: ${message} from ${tokenID}`);

      playerList[tokenID].selection = message.toString();
      console.log(playerList);

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message.toString()));
      });
    });

    ws.on("close", () => {
      delete playerList[tokenID];
      console.log(`User ${tokenID} disconnected`);
    });
  });

  return wss;
};
