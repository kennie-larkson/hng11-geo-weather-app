import request from "supertest";
import { getGeolocation } from "../utils/ip_geolocation";
import { currentWeather } from "../utils/weather";
import app from "../index";

jest.mock("../utils/ip_geolocation");
jest.mock("../utils/weather");

describe("GET /hello", () => {
  it("should return a greeting with temperature and location when visitor name is provided", async () => {
    const mockLocation = "Test City";
    const mockTemperature = "25";
    const mockVisitorName = "John";
    const mockIp = "::1";

    (getGeolocation as jest.Mock).mockResolvedValue(mockLocation);
    (currentWeather as jest.Mock).mockResolvedValue(mockTemperature);

    const response = await request(app)
      .get("/api/hello")
      .query({ visitor_name: mockVisitorName });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      client_ip: mockIp,
      location: mockLocation,
      greeting: `Hello, ${mockVisitorName}!, the temperature is ${mockTemperature} Celsius in ${mockLocation}`,
    });
  });

  it("should return a default greeting when visitor name is not provided", async () => {
    const mockLocation = "Test City";
    const mockTemperature = "25";

    (getGeolocation as jest.Mock).mockResolvedValue(mockLocation);
    (currentWeather as jest.Mock).mockResolvedValue(mockTemperature);

    const response = await request(app).get("/hello");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      client_ip: expect.any(String),
      location: mockLocation,
      greeting: "Hello, visitor! Please provide your name.",
    });
  });

  it("should handle errors gracefully and return default greeting", async () => {
    (getGeolocation as jest.Mock).mockRejectedValue(
      new Error("Geolocation error")
    );
    (currentWeather as jest.Mock).mockResolvedValue("25");

    const response = await request(app).get("/hello");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      client_ip: expect.any(String),
      location: undefined,
      greeting: "Hello, visitor! Please provide your name.",
    });
  });
});
