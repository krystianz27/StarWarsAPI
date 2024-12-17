import express from "express";
import morgan from "morgan";
import cors from "cors";
import { setupSwagger } from "./swagger";
import filmRoutes from "./routes/film.routes";
import speciesRoutes from "./routes/species.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import starshipRoutes from "./routes/starship.routes";
import planetRoutes from "./routes/planet.routes";

export const app = express();

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/films", filmRoutes);
app.use("/species", speciesRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/starships", starshipRoutes);
app.use("/planets", planetRoutes);
