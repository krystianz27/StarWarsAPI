import { Request, Response } from "express";
import { getPlanetByName, getPlanets } from "../services/planet.service";
import { getPlanetById } from "../services/planet.service";

export const getAllPlanetsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const name = (req.query.name as string) || "";

    if (name) {
      const planet = await getPlanetByName(name);
      res.json(planet);
      return;
    }

    const planets = await getPlanets({ page, limit });
    res.json(planets);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch planets", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch planets", error: "Unknown error" });
    }
  }
};

export const getPlanetByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planet = await getPlanetById(id);
    res.json(planet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch planets", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch planets", error: "Unknown error" });
    }
  }
};

export const getPlanetByNameController = async (
  req: Request,
  res: Response
) => {
  try {
    const name = req.query.name as string;

    if (!name) {
      res.status(400).json({ message: "Name query parameter is required" });
      return;
    }

    const planet = await getPlanetByName(name);

    if (planet.total === 0) {
      res.status(404).json({ message: `No planet found with name: ${name}` });
      return;
    }

    res.json(planet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to fetch planet by name",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Failed to fetch planet by name",
        error: "Unknown error",
      });
    }
  }
};
