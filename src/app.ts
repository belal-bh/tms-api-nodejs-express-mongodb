import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";
import { config } from "./config/config";

import authRoute from "./routes/authRoute";

// 1) MIDDLEWARES
app.use(cors());
// morgan for log when development
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// express json parse
app.use(express.json());

// 2) ROUTE
// public auth route
app.use("/public", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
