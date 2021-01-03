import { config } from "dotenv";
config();

export const test = {
  client: "pg",
  connection: {
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    charset: "utf8",
  },
  migrations: {
    directory: __dirname + "/database/migrations",
  },
  seeds: {
    directory: __dirname + "/database/seeds/test",
  },
};
export const development = {
  client: "pg",
  connection: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    charset: "utf8",
  },
  migrations: {
    directory: __dirname + "/database/migrations",
  },
  seeds: {
    directory: __dirname + "/database/seeds", ///development
  },
};
export const production = {
  client: "pg",
  connection: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB,
    charset: "utf8",
  },
  migrations: {
    directory: __dirname + "/database/migrations",
  },
  seeds: {
    directory: __dirname + "/database/seeds/production",
  },
};
