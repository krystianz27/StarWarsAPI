import { cacheMiddleware } from "../../src/middleware/cacheMiddleware";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../src/database/data-source";
import { Cache } from "../../src/entities/Cache";

jest.mock("../../src/database/data-source");

describe("Cache Middleware", () => {
  it("should return cached data if available", async () => {
    const mockCacheData = {
      data: { name: "Earth" },
      expiry: new Date(Date.now() + 10000),
    };
    const mockFindOne = jest.fn().mockResolvedValue(mockCacheData);
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
    });

    const req = {
      params: { resourceType: "planets", id: "1" },
      query: {},
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await cacheMiddleware(req, res, next);

    expect(mockFindOne).toHaveBeenCalledWith({
      where: {
        resourceType: "planets",
        resourceId: "planets/1",
        expiry: expect.any(Date),
      },
    });
    expect(res.json).toHaveBeenCalledWith(mockCacheData.data);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if no cache is found", async () => {
    const mockFindOne = jest.fn().mockResolvedValue(null);
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
    });

    const req = {
      params: { resourceType: "planets", id: "1" },
      query: {},
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await cacheMiddleware(req, res, next);

    expect(mockFindOne).toHaveBeenCalledWith({
      where: {
        resourceType: "planets",
        resourceId: "planets/1",
        expiry: expect.any(Date),
      },
    });
    expect(next).toHaveBeenCalled();
  });
});
