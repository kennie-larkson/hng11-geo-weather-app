import express from "express";
import { weatherRouter } from "./routes";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

app.set("trust proxy", true);

app.use("/api", weatherRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app };
