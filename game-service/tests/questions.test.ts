import { Question } from "../src/question";

const question = new Question("New York", "sunny", 75 * 273);

describe("Getting Location, Weather and Temperature", () => {
  test("Get location", () => {
    expect(question.getLocation()).toBe("New York");
  });

  test("Get weather", () => {
    expect(question.getWeather()).toBe("sunny");
  });

  test("Get temperature", () => {
    expect(question.getTemperature()).toBe(75 * 273);
  });
});

describe("Generating Question", () => {
  test("Generate question", () => {
    const regex = /^The weather in .+ is .+ and .+$/;
    expect(question.generateQuestion()).toMatch(regex);

    // console.log(question.generateQuestion());
  });

  test("Get question type", () => {
    expect(["location", "weather", "temperature"]).toContain(question.getQuestionType());
    // console.log(question.getQuestionType());
  });
});
