import { useState } from "react";
import { queryClient } from "../api/queryClient";

type MutationOptions = {
  onSuccess?: (data?: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data?: any, error?: any) => void;
  invalidateKeys?: string[];
};

export function useMutation<TData, TVariables>(
  fn: (vars: TVariables) => Promise<TData>,
  options?: MutationOptions,
) {
  const [loading, setLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(true);

      const data = await fn(variables);

      options?.invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries(key);
      });

      options?.onSuccess?.(data);
      options?.onSettled?.(data, null);

      return data;
    } catch (err: any) {
      const normalizedError = err?.response?.data || err;

      options?.onError?.(normalizedError);
      options?.onSettled?.(undefined, normalizedError);

      throw normalizedError; // ✅ propagate
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
}
