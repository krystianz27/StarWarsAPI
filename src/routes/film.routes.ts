import { Router } from "express";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { setResourceType } from "../middleware/setResourceTypeMiddleware";

import {
  getAllFilmsController,
  getFilmByIdController,
} from "../controllers/film.controller";

const router = Router();

router.get(
  "/",
  setResourceType("films"),
  cacheMiddleware,
  getAllFilmsController
);

router.get(
  "/:id",
  setResourceType("films"),
  cacheMiddleware,
  getFilmByIdController
);
export default router;
