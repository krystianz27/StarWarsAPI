// // tests/middleware/cache.middleware.test.ts
// import { cacheMiddleware } from "../../src/middleware/cacheMiddleware";
// import { Request, Response, NextFunction } from "express";
// import { getRepository } from "typeorm";

// jest.mock("typeorm", () => ({
//   ...jest.requireActual("typeorm"),
//   getRepository: jest.fn(),
// }));

// describe("Cache Middleware Tests", () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: NextFunction;

//   beforeEach(() => {
//     req = { params: { resourceType: "films", id: "1" } }; // Ustawiamy params z resourceType i id
//     res = { json: jest.fn() }; // Zamockowana metoda json
//     next = jest.fn(); // Zamockowana funkcja next
//   });

//   it("should return data from cache if available", async () => {
//     const cacheData = {
//       data: { title: "Star Wars", director: "George Lucas" },
//     };
//     const cacheRepo = { findOne: jest.fn().mockResolvedValue(cacheData) }; // Mockowanie repozytorium, które zwraca dane

//     // Mockowanie getRepository, żeby zwróciło nasze repozytorium
//     (getRepository as jest.Mock).mockReturnValue(cacheRepo);

//     // Uruchomienie middleware
//     await cacheMiddleware(req as Request, res as Response, next);

//     // Sprawdzenie, czy findOne zostało wywołane z odpowiednimi argumentami
//     expect(cacheRepo.findOne).toHaveBeenCalledWith({
//       where: {
//         resourceType: "films",
//         resourceId: "films:1", // Twój klucz cache
//         expiry: expect.any(Date), // Oczekiwanie na Date (wymaga odpowiedniego mockowania daty, jeśli chcesz precyzyjnie sprawdzić)
//       },
//     });

//     // Sprawdzenie, czy odpowiedź JSON jest zwrócona z danych cache
//     expect(res.json).toHaveBeenCalledWith(cacheData.data);

//     // Upewnienie się, że next nie zostało wywołane, ponieważ dane z cache zostały zwrócone
//     expect(next).not.toHaveBeenCalled();
//   });

//   it("should call next if cache not found", async () => {
//     const cacheRepo = { findOne: jest.fn().mockResolvedValue(null) }; // Brak danych w cache, zwracamy null

//     // Mockowanie getRepository, żeby zwróciło nasze repozytorium
//     (getRepository as jest.Mock).mockReturnValue(cacheRepo);

//     // Uruchomienie middleware
//     await cacheMiddleware(req as Request, res as Response, next);

//     // Sprawdzamy, czy findOne zostało wywołane z odpowiednimi argumentami
//     expect(cacheRepo.findOne).toHaveBeenCalledWith({
//       where: {
//         resourceType: "films",
//         resourceId: "films:1", // Twój klucz cache
//         expiry: expect.any(Date), // Oczekiwanie na Date
//       },
//     });

//     // Sprawdzamy, czy next() zostało wywołane, ponieważ cache nie zawierało danych
//     expect(next).toHaveBeenCalled();
//   });
// });
