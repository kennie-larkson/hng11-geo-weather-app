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
const express_1 = __importDefault(require("express"));
const ip_geolocation_1 = require("./utils/ip_geolocation");
const weather_1 = require("./utils/weather");
const app = (0, express_1.default)();
const port = 3000;
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.WEATHER_API;
app.set("trust proxy", true);
router.get("/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const visitor = req.query.visitor || undefined;
    const clientIp = req.ip;
    //const location = await getGeolocation("102.89.23.63", key);
    const location = yield (0, ip_geolocation_1.getGeolocation)(clientIp, key);
    const temperature = yield (0, weather_1.currentWeather)(location, key);
    const response = {
        //client_ip: "102.89.23.63",
        client_ip: clientIp,
        location,
        greeting: visitor
            ? `Hello, ${visitor}!, the temperature is ${temperature} Celcius in ${location}`
            : "Hello, visitor! Please provide your name.",
    };
    res.json(response);
}));
app.use("/api", router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
