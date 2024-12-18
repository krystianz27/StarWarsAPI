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
