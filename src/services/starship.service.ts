import axios from "axios";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export const getStarships = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/starships/?page=${page}&limit=${limit}`
    );

    const cacheKey = `starships/?page=${page}&limit=${limit}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "starships",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Cache miss: Saved new cache for starships");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching starships from API:", error.message);
      throw new Error("Failed to fetch starships from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch starships from API: Unknown error");
    }
  }
};

export const getStarshipById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://swapi.tech/api/starships/${id}/`);

    const cacheKey = `starships/${id}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "starships",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(`Cache miss: Saved new cache for starship with ID: ${id}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching starship from API:", error.message);
      throw new Error("Failed to fetch starship from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch starship from API: Unknown error");
    }
  }
};

export const getStarshipsByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/starships/?name=${name}`
    );

    if (data.result.length === 0) {
      console.log(`No starships found with the name: ${name}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `starships/?name=${name}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "starships",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for starship search with name: ${name}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching starships from API:", error.message);
      throw new Error("Failed to fetch starships from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch starships from API: Unknown error");
    }
  }
};

export const getStarshipsByModel = async (model: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/starships/?model=${model}`
    );

    if (data.result.length === 0) {
      console.log(`No starships found with the model: ${model}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `starships/?model=${model}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "starships",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for starship search with model: ${model}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching starships from API:", error.message);
      throw new Error("Failed to fetch starships from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch starships from API: Unknown error");
    }
  }
};

export const getStarshipsByNameAndModel = async (
  name: string,
  model: string
) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/starships/?name=${name}&model=${model}`
    );

    if (data.result.length === 0) {
      console.log(
        `No starships found with the name: ${name} and model: ${model}`
      );
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `starships/?name=${name}&model=${model}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "starships",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for starship search with name: ${name} and model: ${model}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching starships from API:", error.message);
      throw new Error("Failed to fetch starships from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch starships from API: Unknown error");
    }
  }
};
