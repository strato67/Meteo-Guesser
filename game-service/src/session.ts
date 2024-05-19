import { Question } from "./question";

type WeatherData = {
  currentWeather: { temperature: number; weather: string };
  location: string;
};

export const getWeatherBatch = async () => {
  try {
    const response = await fetch("http://127.0.0.1:4200/");
    const data = await response.json();
    return data.queue;
  } catch (error) {
    return { error: "Could not get weather data" };
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
