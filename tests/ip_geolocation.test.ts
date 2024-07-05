import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getGeolocation } from "../utils/ip_geolocation";

describe("getGeolocation", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should return the city name when the API call is successful", async () => {
    const clientIp = "123.123.123.123";
    const key = "test_key";
    const mockResponse = { city: "Test City" };

    mock
      .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
      .reply(200, mockResponse);

    const result = await getGeolocation(clientIp, key);

    expect(result).toBe("Test City");
  });

  it("should return undefined when the API call is successful but the city is not in the response", async () => {
    const clientIp = "123.123.123.123";
    const key = "test_key";
    const mockResponse = {}; // No city in the response

    mock
      .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
      .reply(200, mockResponse);

    const result = await getGeolocation(clientIp, key);

    expect(result).toBeUndefined();
  });

  it("should handle errors gracefully and return undefined", async () => {
    const clientIp = "123.123.123.123";
    const key = "test_key";

    mock
      .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
      .networkError();

    const result = await getGeolocation(clientIp, key);

    expect(result).toBeUndefined();
  });
});
