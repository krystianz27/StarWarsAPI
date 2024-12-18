import request from "supertest";
import { app } from "../../src/app";
import {
  getPlanets,
  getPlanetById,
  getPlanetByName,
} from "../../src/services/planet.service";

jest.mock("../../src/services/planet.service", () => ({
  getPlanets: jest.fn(),
  getPlanetById: jest.fn(),
  getPlanetByName: jest.fn(),
}));

jest.mock("../../src/middleware/cacheMiddleware", () => ({
  cacheMiddleware: jest.fn((req, res, next) => next()),
}));

describe("Planet Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPlanetsController", () => {
    it("should return a list of planets", async () => {
      (getPlanets as jest.Mock).mockResolvedValue({
        total: 2,
        page: 1,
        limit: 10,
        results: [{ name: "Earth" }, { name: "Mars" }],
      });

      const response = await request(app).get("/planets?page=1&limit=10");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        results: [{ name: "Earth" }, { name: "Mars" }],
      });
      expect(getPlanets).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it("should return planets filtered by name", async () => {
      (getPlanetByName as jest.Mock).mockResolvedValue({
        total: 1,
        page: 1,
        limit: 10,
        results: [{ name: "Earth" }],
      });

      const response = await request(app).get("/planets?name=Earth");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 1,
        page: 1,
        limit: 10,
        results: [{ name: "Earth" }],
      });
      expect(getPlanetByName).toHaveBeenCalledWith("Earth");
    });

    it("should handle service error for getPlanets", async () => {
      (getPlanets as jest.Mock).mockRejectedValue(new Error("Service error"));

      const response = await request(app).get("/planets?page=1&limit=10");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to fetch planets",
        error: "Service error",
      });
    });
  });

  describe("getPlanetByIdController", () => {
    it("should return a planet by ID", async () => {
      (getPlanetById as jest.Mock).mockResolvedValue({ name: "Earth" });

      const response = await request(app).get("/planets/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ name: "Earth" });
      expect(getPlanetById).toHaveBeenCalledWith("1");
    });

    it("should handle service error for getPlanetById", async () => {
      (getPlanetById as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/planets/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to fetch planets",
        error: "Service error",
      });
    });
  });

  describe("getPlanetByNameController", () => {
    it("should handle missing name query parameter with 500", async () => {
      const response = await request(app).get("/planets?name=");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to fetch planets",
        error: expect.any(String), // Obsługujemy dynamiczne wiadomości błędu
      });
    });

    it("should return 200 if no planet is found", async () => {
      (getPlanetByName as jest.Mock).mockResolvedValue({
        total: 0,
        page: 1,
        limit: 10,
        results: [],
      });

      const response = await request(app).get("/planets?name=Unknown");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 0,
        page: 1,
        limit: 10,
        results: [],
      });
    });

    it("should handle service error for getPlanetByName", async () => {
      (getPlanetByName as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/planets?name=Earth");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to fetch planets",
        error: "Service error",
      });
    });
  });
});
