import { Request, Response } from "express";
import {
  getSpeciesByName,
  getSpecies,
  getSpeciesById,
} from "../services/species.service";

export const getAllSpeciesController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const name = (req.query.name as string) || "";

    if (name) {
      const species = await getSpeciesByName(name);
      res.json(species);
      return;
    }

    const species = await getSpecies({ page, limit });
    res.json(species);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch species", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch species", error: "Unknown error" });
    }
  }
};

export const getSpeciesByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const species = await getSpeciesById(id);
    res.json(species);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch species", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch species", error: "Unknown error" });
    }
  }
};

export const getSpeciesByNameController = async (
  req: Request,
  res: Response
) => {
  try {
    const name = req.query.name as string;

    if (!name) {
      res.status(400).json({ message: "Name query parameter is required" });
      return;
    }

    const species = await getSpeciesByName(name);

    if (species.total === 0) {
      res.status(404).json({ message: `No species found with name: ${name}` });
      return;
    }

    res.json(species);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to fetch species by name",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Failed to fetch species by name",
        error: "Unknown error",
      });
    }
  }
};
