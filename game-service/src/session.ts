// TODO

// Create a new session

// Buffer for 15 seconds

// Get batched data from weather-retreiver

// Generate 4 types of questions/answers

// Send random question to client

// Wait 60 seconds for client response

// Compare answer to correct answer

// Send result to client

type WeatherData = {
  currentWeather: { temperature: number; weather: string };
  location: string;
};

import { Question } from "./question";

export const getWeatherBatch = async () => {
  try {
    const response = await fetch("http://127.0.0.1:4200/");
    const data = await response.json();
    return data.queue;
  } catch (error) {
    return { error: "Could not get weather data" };
  }
};

export const generateRoundData = (data: Array<WeatherData>) => {
  const selectedLocation = data[Math.floor(Math.random() * data.length)];

  const question = new Question(
    selectedLocation.location,
    selectedLocation.currentWeather.weather,
    selectedLocation.currentWeather.temperature
  );

  const questionType = question.getQuestionType();
};
