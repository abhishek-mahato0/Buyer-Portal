import { api } from "../../../api/axios";
import type { TProperty } from "../types";

type Props = {
  minPrice?: number;
  maxPrice?: number;
  rooms?: number | null;
  city?: string | null;
  country?: string | null;
  page?: number;
  limit?: number;
};

type ReturnType = {
  meta:
    | {
        limit: number;
        offset: number;
        total: number;
        pages: number;
      }
    | {};
  properties: TProperty[] | [];
};

export const getAllProperties = async ({
  minPrice,
  maxPrice,
  rooms,
  city,
  country,
  page = 1,
  limit = 10,
}: Props): Promise<ReturnType> => {
  const res = await api.get("/property", {
    params: {
      minPrice,
      maxPrice,
      rooms,
      city,
      country,
      page,
      limit,
    },
  });
  if (res.data.success) {
    return res.data.data;
  }
  return {
    meta: {},
    properties: [],
  };
};

export const getPropertyById = async (id: string) => {
  const res = await api.get(`/property/${id}`);
  return res.data;
};

export const getMetadata = async () => {
  const res = await api.get("/property/metadata");
  return res.data.data;
};

export const getFavourites = async () => {
  const res = await api.get("/favourite");
  return res.data.data;
};

export const getFavouriteIds = async () => {
  const res = await api.get("/favourite/ids");
  return res.data.data;
};

export const toggleFavourite = async (propertyId: string) => {
  const res = await api.post("/favourite/toggle", { propertyId });
  return res.data;
};
