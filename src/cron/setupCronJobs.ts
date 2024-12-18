import cron from "node-cron";
import { deleteExpiredRecords } from "./deleteExpiredRecords";

export function setupCronJobs() {
  cron.schedule("0 * * * *", () => {
    console.log("Running job to delete expired records...");
    deleteExpiredRecords();
  });

  console.log("Cron jobs are set up.");
}
