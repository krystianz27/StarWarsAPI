declare namespace Express {
  export interface Request {
    params: {
      resourceType?: string; // Dodanie resourceType jako opcjonalnego pola
      resourceId?: string; // Opcjonalne pole resourceId (np. z tras takich jak /films/:id)
      [key: string]: string | undefined; // Pozostałe pola
    };
  }
}
