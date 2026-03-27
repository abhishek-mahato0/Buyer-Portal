import { api } from "../api/axios";
import { useQuery } from "../hooks/useQuery";

export function useFavourites() {
  return useQuery("favourites", async () => {
    const res = await api.get("/todos");
    return res.data;
  });
}
