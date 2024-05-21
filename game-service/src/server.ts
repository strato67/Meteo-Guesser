import WebSocket from "ws";
import { getWeatherBatch, generateQuestionData } from "./session";
import { Question } from "./question";

const playerList: { [key: string]: string } = {};

export const webSocketServer = () => {
  const wss = new WebSocket.Server({ noServer: true, clientTracking: true });
  let countdownInterval: NodeJS.Timeout | undefined;
  let countdownValue = 60;
  let round = 1;
  const MAX_ROUNDS = 10;
  let question: null | Question = null;
  let answerOptions: string[] | number[] = [];
  let questionString: string = "";
  function startRound() {
    if (round > MAX_ROUNDS) {
      return;
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
      return;
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ round }));
    });
  };

  wss.on("connection", (ws: WebSocket, req) => {
    console.log(playerList);
    console.log(req.url);
    //req.url

    if (question !== null) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ round, questionString, answerOptions }));
      });
    }

    if (!countdownInterval && round <= MAX_ROUNDS) {
      startRound();
    }

    ws.on("message", (message: string) => {
      console.log(`Received message: ${message} from ${req.url}`);
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message.toString()));
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};
