import { Router } from "express";
import {
  getAllPlanetsController,
  getPlanetByIdController,
} from "../controllers/planet.controller";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { setResourceType } from "../middleware/setResourceTypeMiddleware";

const router = Router();

router.get(
  "/",
  setResourceType("planets"),
  cacheMiddleware,
  getAllPlanetsController
);
router.get(
  "/:id",
  setResourceType("planets"),
  cacheMiddleware,
  getPlanetByIdController
);

export default router;
