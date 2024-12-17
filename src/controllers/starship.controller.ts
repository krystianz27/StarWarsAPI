import { Request, Response } from "express";
import {
  getStarshipsByName,
  getStarshipsByModel,
  getStarshipsByNameAndModel,
  getStarships,
  getStarshipById,
} from "../services/starship.service";

export const getAllStarshipsController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const name = (req.query.name as string) || "";
    const model = (req.query.model as string) || "";

    if (name && model) {
      const starships = await getStarshipsByNameAndModel(name, model);
      res.json(starships);
    } else if (name) {
      const starships = await getStarshipsByName(name);
      res.json(starships);
    } else if (model) {
      const starships = await getStarshipsByModel(model);
      res.json(starships);
    } else {
      console.log("getStarships");
      const starships = await getStarships({ page, limit });
      res.json(starships);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch starships", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch starships", error: "Unknown error" });
    }
  }
};

export const getStarshipByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const starship = await getStarshipById(id);
    res.json(starship);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch starship", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch starship", error: "Unknown error" });
    }
  }
};
