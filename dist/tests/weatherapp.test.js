"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ip_geolocation_1 = require("../utils/ip_geolocation");
const weather_1 = require("../utils/weather");
const index_1 = __importDefault(require("../index"));
jest.mock("../utils/ip_geolocation");
jest.mock("../utils/weather");
describe("GET /hello", () => {
    it("should return a greeting with temperature and location when visitor name is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockLocation = "Test City";
        const mockTemperature = "25";
        const mockVisitorName = "John";
        const mockIp = "::1";
        ip_geolocation_1.getGeolocation.mockResolvedValue(mockLocation);
        weather_1.currentWeather.mockResolvedValue(mockTemperature);
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hello")
            .query({ visitor_name: mockVisitorName });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            client_ip: mockIp,
            location: mockLocation,
            greeting: `Hello, ${mockVisitorName}!, the temperature is ${mockTemperature} Celsius in ${mockLocation}`,
        });
    }));
    it("should return a default greeting when visitor name is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockLocation = "Test City";
        const mockTemperature = "25";
        ip_geolocation_1.getGeolocation.mockResolvedValue(mockLocation);
        weather_1.currentWeather.mockResolvedValue(mockTemperature);
        const response = yield (0, supertest_1.default)(index_1.default).get("/hello");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            client_ip: expect.any(String),
            location: mockLocation,
            greeting: "Hello, visitor! Please provide your name.",
        });
    }));
    it("should handle errors gracefully and return default greeting", () => __awaiter(void 0, void 0, void 0, function* () {
        ip_geolocation_1.getGeolocation.mockRejectedValue(new Error("Geolocation error"));
        weather_1.currentWeather.mockResolvedValue("25");
        const response = yield (0, supertest_1.default)(index_1.default).get("/hello");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            client_ip: expect.any(String),
            location: undefined,
            greeting: "Hello, visitor! Please provide your name.",
        });
    }));
});
