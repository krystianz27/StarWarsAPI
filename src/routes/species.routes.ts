import { Router } from "express";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { setResourceType } from "../middleware/setResourceTypeMiddleware";
import {
  getAllSpeciesController,
  getSpeciesByIdController,
} from "../controllers/species.controller";

const router = Router();

router.get(
  "/",
  setResourceType("species"),
  cacheMiddleware,
  getAllSpeciesController
);

router.get(
  "/:id",
  setResourceType("species"),
  cacheMiddleware,
  getSpeciesByIdController
);

export default router;
