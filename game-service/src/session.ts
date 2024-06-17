import { Question } from "./question";

type WeatherData = {
  currentWeather: { temperature: number; weather: string };
  location: string;
};

type PlayerScore = { selection: string; score: number };

export type PlayerList = {
  [key: string]: PlayerScore;
};

export const getWeatherBatch = async () => {
  try {
    const response = await fetch("http://weather-retriever:4200/");
    const data = await response.json();
    return data.queue;
  } catch (error) {
    return [error];
  }
};

export const generateQuestionData = (data: Array<WeatherData>) => {
  const selectedLocation = data[Math.floor(Math.random() * data.length)];

  const question = new Question(
    selectedLocation.location,
    selectedLocation.currentWeather.weather,
    selectedLocation.currentWeather.temperature
  );
  const questionString = question.generateQuestion();

  const answerOptions = generateAnswerOptions(question, data);

  return { questionString, question, answerOptions };

};

export const generateAnswerOptions = (
  question: Question,
  data: Array<WeatherData>
) => {
  const questionType = question.getQuestionType();

  if (questionType === null) {
    return [];
  }

  const optionsMap: {
    temperature: number[];
    weather: string[];
    location: string[];
  } = {
    temperature: [],
    weather: [],
    location: [],
  };

  data.forEach((location) => {
    const locationName = location.location;
    const weather = location.currentWeather.weather;
    const temperature = location.currentWeather.temperature;

    optionsMap["temperature"].push(temperature);
    optionsMap["weather"].push(weather);
    optionsMap["location"].push(locationName);
  });

  return optionsMap[questionType as keyof typeof optionsMap];
};

export const scoreAnswers = (playerList: PlayerList, question: Question) => {
  const answer = getAnswer(question);

  for (const playerToken in playerList) {
    const player = playerList[playerToken];
    if (player.selection == answer) {
      player.score += 1000;
    }
    player.selection = "";
  }

  return playerList;
};

export const getAnswer = (question: Question) => {
  const questionType = question.getQuestionType();

  const possibleAnswers: { [key: string]: string | number } = {
    temperature: question.getTemperature(),
    weather: question.getWeather(),
    location: question.getLocation(),
  };

  if (!questionType || !possibleAnswers.hasOwnProperty(questionType)) {
    return;
  }
  return possibleAnswers[questionType];
};
