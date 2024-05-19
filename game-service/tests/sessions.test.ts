import { getWeatherBatch, generateAnswerOptions, generateQuestionData } from "../src/session";
import { Question } from "../src/question";

describe("getWeatherBatch", () => {
  it("should return data from weather-retriever", async () => {
    const data = await getWeatherBatch();
    expect(data).toBeDefined();
    console.log(data);
  });
});

describe('Generate question options', () => { 
  it("should return the options for a question", () => {

    const question = new Question("New York", "Sunny", 75);
    question.generateQuestion();
    const data = [
      {"currentWeather": {"temperature": 75, "weather": "Sunny"}, "location": "New York"},
      {"currentWeather": {"temperature": 68, "weather": "Clouds"}, "location": "New Jersey"},
      {"currentWeather": {"temperature": 105, "weather": "Clear"}, "location": "North York"},
      {"currentWeather": {"temperature": 85, "weather": "Clouds"}, "location": "Old York"}
    ];

    const answerOptions = generateAnswerOptions(question, data);
    expect(answerOptions).toBeDefined();
    expect(answerOptions.length).toBe(4);
    console.log(answerOptions);

  });
 })

describe('Generate question data', () => {
  it("should return the question and answer options", async () => {
    const data = await getWeatherBatch();
    const questionData = await generateQuestionData(data);
    console.log(questionData);
    expect(questionData).toBeDefined();


  });  
} );