export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  country?: string;
  rooms?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
