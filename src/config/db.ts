import mongoose from "mongoose";
import { config } from "./config";

const ConnectDB = async () => {
  try {
    const DB =
      config.USING_DB === "local"
        ? config.LOCAL_DB.replace("<db_name>", config.DB_NAME)
        : config.MONGODB_URI.replace("<password>", config.MONGODB_PASSWORD);

    const conn = await mongoose.connect(DB, {});
    console.log(
      `Database connected  ${conn.connection.host}:${conn.connection.port}`.red
        .inverse
    );
  } catch (err) {
    console.log(`database error `, err);
  }
};

export default ConnectDB;
