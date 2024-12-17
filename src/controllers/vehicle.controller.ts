import { Request, Response } from "express";
import {
  getVehiclesByName,
  getVehiclesByModel,
  getVehiclesByNameAndModel,
  getVehicles,
  getVehicleById,
} from "../services/vehicle.service";

export const getAllVehiclesController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const name = (req.query.name as string) || "";
    const model = (req.query.model as string) || "";

    if (name && model) {
      const vehicles = await getVehiclesByNameAndModel(name, model);
      res.json(vehicles);
    } else if (name) {
      const vehicles = await getVehiclesByName(name);
      res.json(vehicles);
    } else if (model) {
      const vehicles = await getVehiclesByModel(model);
      res.json(vehicles);
    } else {
      console.log("getVehicles");
      const vehicles = await getVehicles({ page, limit });
      res.json(vehicles);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch vehicles", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch vehicles", error: "Unknown error" });
    }
  }
};

export const getVehicleByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await getVehicleById(id);
    res.json(vehicle);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch vehicle", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to fetch vehicle", error: "Unknown error" });
    }
  }
};
