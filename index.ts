import express, { Request, Response } from "express";
import { getGeolocation } from "./utils/ip_geolocation";
import { currentWeather } from "./utils/weather";
const app = express();
const port = 3000;
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
const key = process.env.WEATHER_API;

app.set("trust proxy", true);

router.get("/hello", async (req: Request, res: Response) => {
  const visitor = (req.query.visitor_name as string) || undefined;
  const clientIp = req.ip;
  //const location = await getGeolocation("102.89.23.63", key);
  const location = await getGeolocation(clientIp, key);
  const temperature = await currentWeather(location, key);

  const response = {
    //client_ip: "102.89.23.63",
    client_ip: clientIp,
    location,
    greeting: visitor
      ? `Hello, ${visitor}!, the temperature is ${temperature} Celcius in ${location}`
      : "Hello, visitor! Please provide your name.",
  };

  res.json(response);
});

app.use("/api", router);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
