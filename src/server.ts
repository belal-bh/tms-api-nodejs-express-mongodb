import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/tms", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
