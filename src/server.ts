import colors from "colors";
import * as dotenv from "dotenv";
dotenv.config({
  path: "src/config/config.env",
  debug: true,
});
colors.enable();
import { config } from "./config/config";
import app from "./app";
import ConnectDB from "./config/db";

ConnectDB();

app.listen(config.PORT, () => {
  console.log(
    `Server is running on port ${config.PORT} on ${config.NODE_ENV} mode`.green
      .inverse
  );
});
