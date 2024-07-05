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
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const weather_1 = require("../utils/weather"); // Update with the correct path to your module
describe("currentWeather", () => {
    let mock;
    beforeAll(() => {
        mock = new axios_mock_adapter_1.default(axios_1.default);
    });
    afterEach(() => {
        mock.reset();
    });
    it("should return the temperature when the API call is successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = "London";
        const key = "test_key";
        const mockResponse = { current: { temp_c: "20" } };
        mock
            .onGet(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
            .reply(200, mockResponse);
        const result = yield (0, weather_1.currentWeather)(location, key);
        expect(result).toBe("20");
    }));
    it("should return undefined when the API call is successful but the temperature is not in the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = "London";
        const key = "test_key";
        const mockResponse = { current: {} }; // No temp_c in the response
        mock
            .onGet(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
            .reply(200, mockResponse);
        const result = yield (0, weather_1.currentWeather)(location, key);
        expect(result).toBeUndefined();
    }));
    it("should handle errors gracefully and return undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = "London";
        const key = "test_key";
        mock
            .onGet(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`)
            .networkError();
        const result = yield (0, weather_1.currentWeather)(location, key);
        expect(result).toBeUndefined();
    }));
});
