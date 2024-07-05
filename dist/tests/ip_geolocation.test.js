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
const ip_geolocation_1 = require("../utils/ip_geolocation");
describe("getGeolocation", () => {
    let mock;
    beforeAll(() => {
        mock = new axios_mock_adapter_1.default(axios_1.default);
    });
    afterEach(() => {
        mock.reset();
    });
    it("should return the city name when the API call is successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const clientIp = "123.123.123.123";
        const key = "test_key";
        const mockResponse = { city: "Test City" };
        mock
            .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
            .reply(200, mockResponse);
        const result = yield (0, ip_geolocation_1.getGeolocation)(clientIp, key);
        expect(result).toBe("Test City");
    }));
    it("should return undefined when the API call is successful but the city is not in the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const clientIp = "123.123.123.123";
        const key = "test_key";
        const mockResponse = {}; // No city in the response
        mock
            .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
            .reply(200, mockResponse);
        const result = yield (0, ip_geolocation_1.getGeolocation)(clientIp, key);
        expect(result).toBeUndefined();
    }));
    it("should handle errors gracefully and return undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        const clientIp = "123.123.123.123";
        const key = "test_key";
        mock
            .onGet(`http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`)
            .networkError();
        const result = yield (0, ip_geolocation_1.getGeolocation)(clientIp, key);
        expect(result).toBeUndefined();
    }));
});
