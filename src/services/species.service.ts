import axios from "axios";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export const getSpecies = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/species/?page=${page}&limit=${limit}`
    );

    const cacheKey = `species/?page=${page}&limit=${limit}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "species",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Cache miss: Saved new cache for species");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching species from API:", error.message);
      throw new Error("Failed to fetch species from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch species from API: Unknown error");
    }
  }
};

export const getSpeciesById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://swapi.tech/api/species/${id}/`);

    const cacheKey = `species/${id}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "species",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(`Cache miss: Saved new cache for species with ID: ${id}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching species from API:", error.message);
      throw new Error("Failed to fetch species from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch species from API: Unknown error");
    }
  }
};

export const getSpeciesByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/species/?name=${name}`
    );

    if (data.result.length === 0) {
      console.log(`No species found with the name: ${name}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `species/?name=${name}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "species",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for species search with name: ${name}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching species from API:", error.message);
      throw new Error("Failed to fetch species from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch species from API: Unknown error");
    }
  }
};
