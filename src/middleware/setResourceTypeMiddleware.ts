import { Request, Response, NextFunction } from "express";

/**
 * Middleware to set resourceType in req.params
 * @param resourceType - The type of resource to set (e.g., 'films', 'species')
 */
export const setResourceType = (resourceType: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.params.resourceType = resourceType;
    next();
  };
};
