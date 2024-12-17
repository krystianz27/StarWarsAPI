import { Request, Response } from "express";
import {
  getFilmsByTitle,
  getFilms,
  getFilmById,
} from "../services/film.service";

export const getAllFilmsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const title = (req.query.title as string) || "";

    if (title) {
      const films = await getFilmsByTitle(title);
      res.json(films);
    } else {
      console.log("getFilms");
      const films = await getFilms({ page, limit });
      res.json(films);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch films", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch films", error: "Unknown error" });
    }
  }
};

export const getFilmByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const film = await getFilmById(id);
    res.json(film);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch film", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch film", error: "Unknown error" });
    }
  }
};
