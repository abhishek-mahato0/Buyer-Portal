import { useEffect, useState, useRef } from "react";
import { queryClient } from "../api/queryClient";

type QueryOptions = {
  enabled?: boolean;
  staleTime?: number; // ms
  cacheTime?: number; // ms
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
};

export function useQuery<T>(
  key: any[],
  fn: () => Promise<T>,
  options?: QueryOptions,
) {
  const [, forceRender] = useState(0);

  const stringKey = JSON.stringify(key);

  const staleTime = options?.staleTime ?? 0;
  const cacheTime = options?.cacheTime ?? 5 * 60 * 1000;

  const state = queryClient.getQuery<any>(stringKey);

  const fetchedRef = useRef(false);

  useEffect(() => {
    fetchedRef.current = false;
  }, [stringKey]);

  useEffect(() => {
    if (options?.enabled === false) return;

    const unsubscribe = queryClient.subscribe(stringKey, () => {
      forceRender((x) => x + 1);
    });

    const now = Date.now();
    const isStale = !state?.updatedAt || now - state.updatedAt > staleTime;

    if ((!state?.data || isStale) && !fetchedRef.current) {
      fetchedRef.current = true;

      queryClient.setLoading(stringKey);

      fn()
        .then((data) => {
          queryClient.setQueryData(stringKey, data);

          options?.onSuccess?.(data);
          options?.onSettled?.(data, null);
        })
        .catch((err) => {
          queryClient.setError(stringKey, err);

          options?.onError?.(err);
          options?.onSettled?.(undefined, err);
        });
    }

    const timer = setTimeout(() => {
      queryClient.removeQuery(stringKey);
    }, cacheTime);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [stringKey, staleTime, options?.enabled, options?.cacheTime, fn]);

  return {
    data: state?.data,
    error: state?.error,
    isLoading: state?.isLoading,
  };
}
