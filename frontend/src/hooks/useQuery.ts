import { useEffect, useState } from "react";
import { queryClient } from "../api/queryClient";

type QueryOptions = {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
};

export function useQuery<T>(
  key: string,
  fn: () => Promise<T>,
  options?: QueryOptions,
) {
  const [, renderState] = useState(0);

  const state = queryClient.getQuery<T>(key);

  useEffect(() => {
    if (options?.enabled === false) return;

    const unsubscribe = queryClient.subscribe(key, () =>
      renderState((x) => x + 1),
    );

    if (!state.data && !state.isLoading) {
      queryClient.setLoading(key);

      fn()
        .then((data) => {
          queryClient.setQueryData(key, data);
          options?.onSuccess?.(data);
          options?.onSettled?.(data, null);
        })
        .catch((err) => {
          queryClient.setError(key, err);
          options?.onError?.(err);
          options?.onSettled?.(undefined, err);
        });
    }

    return () => {
      unsubscribe();
    };
  }, [key, options?.enabled]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
  };
}
