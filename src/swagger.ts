import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Application } from "express";

// Read the configuration from the configuration file openapi.yaml
const swaggerDocument = YAML.load("./docs/openapi.yaml");

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
