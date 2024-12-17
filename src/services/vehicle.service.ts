import axios from "axios";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";

export const getVehicles = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/vehicles/?page=${page}&limit=${limit}`
    );

    const cacheKey = `vehicles/?page=${page}&limit=${limit}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "vehicles",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log("Cache miss: Saved new cache for vehicles");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vehicles from API:", error.message);
      throw new Error("Failed to fetch vehicles from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch vehicles from API: Unknown error");
    }
  }
};

export const getVehicleById = async (id: string) => {
  try {
    console.log("getVehicleById");
    const { data } = await axios.get(`https://swapi.tech/api/vehicles/${id}/`);

    const cacheKey = `vehicles/${id}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "vehicles",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(`Cache miss: Saved new cache for vehicle with ID: ${id}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vehicle from API:", error.message);
      throw new Error("Failed to fetch vehicle from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch vehicle from API: Unknown error");
    }
  }
};

export const getVehiclesByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/vehicles/?name=${name}`
    );

    if (data.result.length === 0) {
      console.log(`No vehicles found with the name: ${name}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `vehicles/?name=${name}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "vehicles",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for vehicle search with name: ${name}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vehicles from API:", error.message);
      throw new Error("Failed to fetch vehicles from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch vehicles from API: Unknown error");
    }
  }
};

export const getVehiclesByModel = async (model: string) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/vehicles/?model=${model}`
    );

    if (data.result.length === 0) {
      console.log(`No vehicles found with the model: ${model}`);
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `vehicles/?model=${model}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "vehicles",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for vehicle search with model: ${model}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vehicles from API:", error.message);
      throw new Error("Failed to fetch vehicles from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch vehicles from API: Unknown error");
    }
  }
};

export const getVehiclesByNameAndModel = async (
  name: string,
  model: string
) => {
  try {
    const { data } = await axios.get(
      `https://swapi.tech/api/vehicles/?name=${name}&model=${model}`
    );

    if (data.result.length === 0) {
      console.log(
        `No vehicles found with the name: ${name} and model: ${model}`
      );
      return { total: 0, page: 1, limit: 10, results: [] };
    }

    const cacheKey = `vehicles/?name=${name}&model=${model}`;
    const cacheRepo = AppDataSource.getRepository(Cache);

    await cacheRepo.save({
      resourceType: "vehicles",
      resourceId: cacheKey,
      data: data,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(
      `Cache miss: Saved new cache for vehicle search with name: ${name} and model: ${model}`
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching vehicles from API:", error.message);
      throw new Error("Failed to fetch vehicles from API: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to fetch vehicles from API: Unknown error");
    }
  }
};
