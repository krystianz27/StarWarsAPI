// import axios from "axios";
// import {
//   getPlanets,
//   getPlanetById,
//   getPlanetByName,
// } from "../../src/services/planet.service";
// import { AppDataSource } from "../../src/database/data-source";
// import { Cache } from "../../src/entities/Cache";

// jest.mock("axios");
// jest.mock("../../src/database/data-source");

// describe("Planet Service", () => {
//   const mockSave = jest.fn();
//   (AppDataSource.getRepository as jest.Mock).mockReturnValue({
//     save: mockSave,
//   });

//   it("should fetch and cache planets", async () => {
//     const mockResponse = { data: { results: [{ name: "Earth" }] } };
//     (axios.get as jest.Mock).mockResolvedValue(mockResponse);

//     const result = await getPlanets({ page: 1, limit: 10 });

//     expect(axios.get).toHaveBeenCalledWith(
//       "https://swapi.tech/api/planets/?page=1&limit=10"
//     );
//     expect(mockSave).toHaveBeenCalledWith(
//       expect.objectContaining({ resourceId: "planets/?page=1&limit=10" })
//     );
//     expect(result).toEqual(mockResponse.data);
//   });

//   it("should fetch and cache a planet by ID", async () => {
//     const mockResponse = { data: { name: "Earth" } };
//     (axios.get as jest.Mock).mockResolvedValue(mockResponse);

//     const result = await getPlanetById("1");

//     expect(axios.get).toHaveBeenCalledWith("https://swapi.tech/api/planets/1/");
//     expect(mockSave).toHaveBeenCalledWith(
//       expect.objectContaining({ resourceId: "planets/1" })
//     );
//     expect(result).toEqual(mockResponse.data);
//   });
// });

import axios from "axios";
import { AppDataSource } from "../../src/database/data-source";
import {
  getPlanets,
  getPlanetById,
  getPlanetByName,
} from "../../src/services/planet.service";
import { Cache } from "../../src/entities/Cache";

jest.mock("axios");
jest.mock("../../src/database/data-source");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

describe("Planet Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPlanets", () => {
    it("should fetch planets and save to cache", async () => {
      const mockData = { results: [{ name: "Earth" }, { name: "Mars" }] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getPlanets({ page: 1, limit: 10 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/?page=1&limit=10"
      );
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: "planets",
          resourceId: "planets/?page=1&limit=10",
          data: mockData,
          expiry: expect.any(Date),
        })
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors from API", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

      await expect(getPlanets({ page: 1, limit: 10 })).rejects.toThrow(
        "Failed to fetch planet from API: API error"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/?page=1&limit=10"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("getPlanetById", () => {
    it("should fetch a planet by ID and save to cache", async () => {
      const mockData = { name: "Earth" };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getPlanetById("1");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/1/"
      );
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: "planets",
          resourceId: "planets/1",
          data: mockData,
          expiry: expect.any(Date),
        })
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors from API", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

      await expect(getPlanetById("1")).rejects.toThrow(
        "Failed to fetch planet from API: API error"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/1/"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("getPlanetByName", () => {
    it("should fetch a planet by name and save to cache", async () => {
      const mockData = { result: [{ name: "Earth" }] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getPlanetByName("Earth");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/?name=Earth"
      );
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: "planets",
          resourceId: "planets/?name=Earth",
          data: mockData,
          expiry: expect.any(Date),
        })
      );
      expect(result).toEqual(mockData);
    });

    it("should return empty result if no planet is found", async () => {
      const mockData = { result: [] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getPlanetByName("Unknown");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/?name=Unknown"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(result).toEqual({ total: 0, page: 1, limit: 10, results: [] });
    });

    it("should handle errors from API", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

      await expect(getPlanetByName("Earth")).rejects.toThrow(
        "Failed to fetch planet from API: API error"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.tech/api/planets/?name=Earth"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});
