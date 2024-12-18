// tests/database/data-source.ts

import { DataSource } from "typeorm";

import { Cache } from "../../src/entities/Cache";

// Testowa baza danych (SQLite w pamięci)
export const TestDataSource = new DataSource({
  type: "postgres",
  database: ":memory:", // SQLite w pamięci
  synchronize: true,
  logging: false,
  entities: [Cache],
  migrations: [],
  subscribers: [],
});
