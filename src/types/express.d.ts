declare namespace Express {
  export interface Request {
    params: {
      resourceType?: string;
      resourceId?: string;
      [key: string]: string | undefined;
    };
  }
}
