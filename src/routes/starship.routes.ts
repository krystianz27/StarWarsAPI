import { Router } from "express";
import {
  getAllStarshipsController,
  getStarshipByIdController,
} from "../controllers/starship.controller";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { setResourceType } from "../middleware/setResourceTypeMiddleware";

const router = Router();

router.get(
  "/",
  setResourceType("starships"),
  cacheMiddleware,
  getAllStarshipsController
);

router.get(
  "/:id",
  setResourceType("starships"),
  cacheMiddleware,
  getStarshipByIdController
);

export default router;
