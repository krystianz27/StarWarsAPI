import request from "supertest";
import { app } from "../../src/app"; // Ścieżka do aplikacji Express
import { getFilmById, getFilms } from "../../src/services/film.service";

// Mockowanie serwisu, który pobiera filmy
jest.mock("../../src/services/film.service");

// Przykładowe dane do testu
const mockFilms = [
  { title: "Star Wars: A New Hope", director: "George Lucas" },
  { title: "Star Wars: The Empire Strikes Back", director: "Irvin Kershner" },
];

describe("Film Controller Tests", () => {
  describe("GET /films", () => {
    it("should return a list of films", async () => {
      // Mockowanie odpowiedzi serwisu
      (getFilms as jest.Mock).mockResolvedValue(mockFilms);

      // Wywołanie requestu
      const response = await request(app).get("/films");

      // Sprawdzanie statusu i treści odpowiedzi
      expect(response.status).toBe(200);
      expect(response.body.results).toEqual(mockFilms);
    });

    it("should return 500 if films cannot be fetched", async () => {
      // Mockowanie błędu serwisu
      (getFilms as jest.Mock).mockRejectedValue(
        new Error("Failed to fetch films")
      );

      // Wywołanie requestu
      const response = await request(app).get("/films");

      // Sprawdzanie statusu błędu
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to fetch films");
    });
  });

  // describe("GET /films/:id", () => {
  //   it("should return a film by ID", async () => {
  //     const mockFilm = {
  //       title: "Star Wars: A New Hope",
  //       director: "George Lucas",
  //     };

  //     // Mockowanie odpowiedzi serwisu
  //     (getFilmById as jest.Mock).mockResolvedValue(mockFilm);

  //     const response = await request(app).get("/films/1");

  //     // Sprawdzanie statusu i treści odpowiedzi
  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockFilm);
  //   });

  //   it("should return 404 if film not found", async () => {
  //     (getFilmById as jest.Mock).mockResolvedValue(null);

  //     const response = await request(app).get("/films/999");

  //     // Sprawdzanie odpowiedzi 404
  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toBe("Film not found");
  //   });

  //   it("should return 500 if an error occurs while fetching the film", async () => {
  //     (getFilmById as jest.Mock).mockRejectedValue(
  //       new Error("Failed to fetch film")
  //     );

  //     const response = await request(app).get("/films/1");

  //     // Sprawdzanie statusu błędu
  //     expect(response.status).toBe(500);
  //     expect(response.body.message).toBe("Failed to fetch film");
  //   });
  // });
});
