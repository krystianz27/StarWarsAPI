import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export async function deleteExpiredRecords() {
  const cacheRepo = AppDataSource.getRepository(Cache);
  try {
    const result = await cacheRepo
      .createQueryBuilder()
      .delete()
      .where("expiry < :now", { now: new Date() })
      .execute();
    console.log(`Deleted ${result.affected} expired records.`);
  } catch (error) {
    console.error("Error deleting expired records:", error);
  }
}
