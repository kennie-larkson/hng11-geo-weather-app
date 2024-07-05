import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { currentWeather } from "../utils/weather"; // Update with the correct path to your module

describe("currentWeather", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should return the temperature when the API call is successful", async () => {
    const location = "London";
    const key = "test_key";
    const mockResponse = { current: { temp_c: "20" } };

    mock
      .onGet(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
      )
      .reply(200, mockResponse);

    const result = await currentWeather(location, key);

    expect(result).toBe("20");
  });

  it("should return undefined when the API call is successful but the temperature is not in the response", async () => {
    const location = "London";
    const key = "test_key";
    const mockResponse = { current: {} }; // No temp_c in the response

    mock
      .onGet(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
      )
      .reply(200, mockResponse);

    const result = await currentWeather(location, key);

    expect(result).toBeUndefined();
  });

  it("should handle errors gracefully and return undefined", async () => {
    const location = "London";
    const key = "test_key";

    mock
      .onGet(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
      )
      .networkError();

    const result = await currentWeather(location, key);

    expect(result).toBeUndefined();
  });
});
