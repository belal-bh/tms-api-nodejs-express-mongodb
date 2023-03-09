type NODE_ENV_TYPE = "development" | "production";
type USING_DB = "local" | "remote";

interface Config {
  NODE_ENV: NODE_ENV_TYPE;
  USING_DB: USING_DB;
  LOCAL_DB: string;
  MONGODB_URI: string;
  DB_NAME: string;
  PORT: number;
  MONGODB_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const defaultPort = 3000;

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV
    ? (process.env.NODE_ENV as NODE_ENV_TYPE)
    : "development",
  USING_DB: process.env.USING_DB ? (process.env.USING_DB as USING_DB) : "local",
  LOCAL_DB: process.env.LOCAL_DB ? (process.env.LOCAL_DB as string) : "",
  MONGODB_URI: process.env.MONGODB_URI
    ? (process.env.MONGODB_URI as string)
    : "",
  DB_NAME: process.env.DB_NAME ? (process.env.DB_NAME as string) : "",
  PORT: process.env.PORT
    ? parseInt(process.env.PORT as string, 10)
    : defaultPort,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD
    ? (process.env.MONGODB_PASSWORD as string)
    : "",
  JWT_SECRET: process.env.JWT_SECRET ? (process.env.JWT_SECRET as string) : "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
    ? (process.env.JWT_EXPIRES_IN as string)
    : "1d",
};
