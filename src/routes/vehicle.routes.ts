import { Router } from "express";
import {
  getAllVehiclesController,
  getVehicleByIdController,
} from "../controllers/vehicle.controller";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { setResourceType } from "../middleware/setResourceTypeMiddleware";

const router = Router();

router.get(
  "/",
  setResourceType("vehicles"),
  cacheMiddleware,
  getAllVehiclesController
);

router.get(
  "/:id",
  setResourceType("vehicles"),
  cacheMiddleware,
  getVehicleByIdController
);

export default router;
