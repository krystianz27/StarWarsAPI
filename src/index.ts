import { app } from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import { TestDataSource } from "../tests/database/data-source";
import { setupCronJobs } from "./cron/setupCronJobs";

dotenv.config();

const useTestDB = process.env.USE_TEST_DB === "true" || false;
const PORT = process.env.PORT || 3000;

const dataSource = useTestDB ? TestDataSource : AppDataSource;

dataSource
  .initialize()
  .then(() => {
    console.log("Database connected successfully.");
    setupCronJobs();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
