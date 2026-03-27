type QueryKey = string;

interface QueryState<T> {
  data?: T;
  error?: any;
  isLoading: boolean;
  subscribers: Set<() => void>;
}

class QueryClient {
  private cache = new Map<QueryKey, QueryState<any>>();

  getQuery<T>(key: QueryKey): QueryState<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, {
        data: undefined,
        error: null,
        isLoading: false,
        subscribers: new Set(),
      });
    }

    return this.cache.get(key)!;
  }

  setQueryData(key: QueryKey, data: any) {
    const state = this.getQuery(key);
    state.data = data;
    state.isLoading = false;
    this.notify(key);
  }

  invalidateQueries(key: QueryKey) {
    this.cache.delete(key);
  }
  subscribe(key: QueryKey, cb: () => void) {
    const state = this.getQuery(key);
    state.subscribers.add(cb);
    return () => state.subscribers.delete(cb);
  }

  setError(key: QueryKey, error: any) {
    const state = this.getQuery(key);
    state.error = error;
    state.isLoading = false;
    this.notify(key);
  }

  setLoading(key: QueryKey) {
    const state = this.getQuery(key);
    state.isLoading = true;
    this.notify(key);
  }

  private notify(key: QueryKey) {
    const state = this.getQuery(key);
    state.subscribers.forEach((cb) => cb());
  }
}

export const queryClient = new QueryClient();
