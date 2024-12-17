import { DataSource } from "typeorm";

import { Cache } from "../entities/Cache";

const useTestDB = process.env.USE_TEST_DB === "true" || false;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: useTestDB
    ? process.env.DB_DATABASE + "_test"
    : process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Cache],
  migrations: [],
  subscribers: [],
});
