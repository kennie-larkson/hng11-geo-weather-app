import express, { Request, Response } from "express";
import { getGeolocation } from "../utils/ip_geolocation";
import { currentWeather } from "../utils/weather";

const weatherRouter = express.Router();

weatherRouter.get("/hello", async (req: Request, res: Response) => {
  const key = process.env.WEATHER_API;
  try {
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
  } catch (error) {
    console.log(error);
    res.send("Sorry, we are unable to complete this request");
  }
});

export { weatherRouter };
