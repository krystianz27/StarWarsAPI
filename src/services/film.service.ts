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

export const analyzeFilmOpenings = async () => {
  try {
    const wordCounts: Record<string, number> = {};
    const charactersCount: Record<string, number> = {};
    const characterNames = new Set<string>();

    // Fetch all people (with paginated requests)
    let nextUrl = "https://swapi.tech/api/people";
    while (nextUrl) {
      const { data } = await axios.get(nextUrl);
      for (const character of data.results) {
        characterNames.add(character.name);
      }
      nextUrl = data.next;
    }

    console.log(`Fetched ${characterNames.size} character names.`);

    // Fetch all films
    const { data: filmsData } = await axios.get("https://swapi.tech/api/films");
    const films = filmsData.result;

    for (const film of films) {
      const openingCrawl = film.properties.opening_crawl;

      // Split opening_crawl into words
      const words: string[] = openingCrawl
        .split(/\s+/)
        .map((word: string) => word.toLowerCase().replace(/[^\w]/g, ""));

      // Count each word
      for (const word of words) {
        if (!word) continue;
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }

      // Check for character names in opening_crawl
      for (const name of characterNames) {
        const regex = new RegExp(`\\b${name}\\b`, "gi");
        const matchCount = (openingCrawl.match(regex) || []).length;
        if (matchCount > 0) {
          charactersCount[name] = (charactersCount[name] || 0) + matchCount;
        }
      }
    }

    // Find the most frequent characters
    const maxCount = Math.max(...Object.values(charactersCount), 0);
    const mostFrequentCharacters = Object.entries(charactersCount)
      .filter(([_, count]) => count === maxCount)
      .map(([name]) => name);

    return {
      wordCounts,
      mostFrequentCharacters,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error analyzing film openings:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to analyze film openings.");
  }
};
