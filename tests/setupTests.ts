// // import { app } from "../src/app";
// // import { Server } from "http";
// // import request from "supertest";

// // let server: Server;

// // beforeAll((done) => {
// //   server = app.listen(4000, done);
// // });

// // afterAll((done) => {
// //   server.close(done);
// // });

// // describe("E2E Tests", () => {
// //   it("should return a list of planets", async () => {
// //     const response = await request(server).get("/planets");
// //     expect(response.status).toBe(200);
// //   });
// // });

// import { AppDataSource } from "../src/database/data-source";

// beforeAll(async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }
// });

// afterAll(async () => {
//   if (AppDataSource.isInitialized) {
//     await AppDataSource.destroy();
//   }
// });
