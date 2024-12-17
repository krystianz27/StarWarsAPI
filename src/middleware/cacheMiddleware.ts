import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { Cache } from "../entities/Cache";
import { MoreThan } from "typeorm";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { resourceType, id } = req.params;
  let { page = 1, limit = 10, ...filters } = req.query;

  if (!resourceType) {
    res.status(400).json({ message: "Missing resourceType in URL" });
    return;
  }

  console.log(`CacheMiddleware Params: ${resourceType} ${id}`);

  const cacheRepo = AppDataSource.getRepository(Cache);

  const hasFilters: boolean = Object.keys(filters).length > 0;

  let cacheKey: string = "";
  if (id && !hasFilters) {
    // Dla pojedynczego zasobu, np. /films/:id
    cacheKey = `${resourceType}/${id}`;
  } else if (!hasFilters && !id) {
    // Dla listy zasobów, np. /films (czyli wszystkie filmy)
    cacheKey = `${resourceType}/?page=${page}&limit=${limit}`;
  } else if (hasFilters && !id) {
    // Dla wyszukiwania, np. /films?title=SampleTitle
    const filterKey = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`) // Tworzymy parametry zapytania w postaci 'key=value'
      .join("&");

    cacheKey = `${resourceType}/?${filterKey}`;
  }
  console.log(`Checking cache with key: ${cacheKey}`); // Log cache key

  const cachedData = await cacheRepo.findOne({
    where: {
      resourceType,
      resourceId: cacheKey,
      expiry: MoreThan(new Date()), // Sprawdzamy aktualność cache
    },
  });

  if (cachedData) {
    console.log(`Cache found for key: ${cacheKey}`); // Cache hit
    res.json(cachedData.data); // Zwracamy dane z cache
    return;
  }

  console.log(`Cache not found for key: ${cacheKey}`); // Cache miss
  next(); // Kontynuujemy, jeśli brak cache
};
