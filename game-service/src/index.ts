import WebSocket from "ws";
import { getWeatherBatch, generateQuestionData } from "./session";

const wss = new WebSocket.Server({ port: 8080 });
console.log("Server started on port 8080");

let countdownInterval: string | number | NodeJS.Timeout | undefined;
let countdownValue = 60;
let round = 1;
const MAX_ROUNDS = 10;

function startRound() {
  if(round > MAX_ROUNDS){
    return;
  }

  let question = null;
  //const weatherData = await getWeatherBatch();
  //const questionData = await generateQuestionData(weatherData);

  getWeatherBatch().then((data) => {
    const questionData = generateQuestionData(data);
    question = questionData.question;
    const answerOptions = questionData.answerOptions;
    const questionString = questionData.questionString;
    
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({answerOptions, questionString}));
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

wss.on("connection", (ws: WebSocket) => {
  if (!countdownInterval && round <= MAX_ROUNDS) {
    startRound();
  }

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach((client) => {
      client.send(`Server received your message: ${message}`);
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
