import axios from "axios";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export const getPlanets = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/planets/?page=${page}&limit=${limit}`
    );

    const cacheKey = `planets/?page=${page}&limit=${limit}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "planets",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Cache miss: Saved new cache for planets");

    // return {
    //   total: data.length,
    //   page,
    //   limit,
    //   results: data,
    // };
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching planet from API:", error.message); // Zaloguj szczegóły błędu
      throw new Error("Failed to fetch planet from API: " + error.message); // Przekazanie komunikatu o błędzie
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch planet from API: Unknown error");
    }
  }
};

export const getPlanetById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://swapi.tech/api/planets/${id}/`);

    const cacheKey = `planets/${id}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "planets",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(`Cache miss: Saved new cache for planet with ID: ${id}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching planet from API:", error.message); // Zaloguj szczegóły błędu
      throw new Error("Failed to fetch planet from API: " + error.message); // Przekazanie komunikatu o błędzie
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch planet from API: Unknown error");
    }
  }
};

export const getPlanetByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/planets/?name=${name}`
    );

    if (data.result.length === 0) {
      console.log(`No planet found with the name: ${name}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `planets/?name=${name}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "planets",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for planet search with name: ${name}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching planet from API:", error.message);
      throw new Error("Failed to fetch planet from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch planet from API: Unknown error");
    }
  }
};
