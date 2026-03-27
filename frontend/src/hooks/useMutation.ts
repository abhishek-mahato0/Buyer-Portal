type MutationOptions = {
  onSuccess?: (data?: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data?: any, error?: any) => void;
  invalidateKeys?: string[];
};

import { queryClient } from "../api/queryClient";

export function useMutation<TData, TVariables>(
  fn: (vars: TVariables) => Promise<TData>,
  options?: MutationOptions,
) {
  const mutate = async (variables: TVariables) => {
    try {
      const data = await fn(variables);
      options?.invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
      options?.onSuccess?.(data);
      options?.onSettled?.(data, null);
      return data;
    } catch (err) {
      options?.onError?.(err);
      options?.onSettled?.(undefined, err);
    }
  };

  return { mutate };
}
