import { getWeatherBatch } from "../src/session";

describe("getWeatherBatch", () => {
  it("should return data from weather-retriever", async () => {
    const data = await getWeatherBatch();
    expect(data).toBeDefined();
    console.log(data);
  });
});