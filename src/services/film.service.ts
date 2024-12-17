import axios from "axios";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export const getFilms = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/films/?page=${page}&limit=${limit}`
    );

    const cacheKey = `films/?page=${page}&limit=${limit}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "films",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Cache miss: Saved new cache for films");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching films from API:", error.message);
      throw new Error("Failed to fetch films from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch films from API: Unknown error");
    }
  }
};

export const getFilmById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://swapi.tech/api/films/${id}/`);

    const cacheKey = `films/${id}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "films",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(`Cache miss: Saved new cache for film with ID: ${id}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching film from API:", error.message);
      throw new Error("Failed to fetch film from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch film from API: Unknown error");
    }
  }
};

export const getFilmsByTitle = async (title: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/films/?title=${title}`
    );

    if (data.result.length === 0) {
      console.log(`No films found with the title: ${title}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `films/?title=${title}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "films",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for film search with title: ${title}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching films from API:", error.message);
      throw new Error("Failed to fetch films from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch films from API: Unknown error");
    }
  }
};
