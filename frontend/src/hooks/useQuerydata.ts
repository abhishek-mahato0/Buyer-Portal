import { useEffect, useState } from "react";
import { queryClient } from "../api/queryClient";

export function useQueryData<T>(key: any[]) {
  const [, forceRender] = useState(0);
  const stringKey = JSON.stringify(key);

  const state = queryClient.getQuery<T>(stringKey);

  useEffect(() => {
    const unsubscribe = queryClient.subscribe(stringKey, () => {
      forceRender((x) => x + 1);
    });
    return unsubscribe;
  }, [stringKey]);

  return state?.data;
}
