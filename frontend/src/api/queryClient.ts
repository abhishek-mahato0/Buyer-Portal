type QueryKey = string;

interface QueryState<T> {
  data?: T;
  error?: any;
  isLoading: boolean;
  subscribers: Set<() => void>;
  updatedAt: number;
}

class QueryClient {
  private cache = new Map<QueryKey, QueryState<any>>();

  getQuery<T>(key: QueryKey): QueryState<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, {
        data: undefined,
        error: null,
        isLoading: false,
        updatedAt: 0,
        subscribers: new Set(),
      });
    }

    return this.cache.get(key)!;
  }

  setQueryData(key: QueryKey, data: any) {
    const state = this.getQuery(key);
    state.data = data;
    state.error = null;
    state.isLoading = false;
    state.updatedAt = Date.now();
    this.notify(key);
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

  subscribe(key: QueryKey, cb: () => void) {
    const state = this.getQuery(key);
    state.subscribers.add(cb);
    return () => state.subscribers.delete(cb);
  }

  invalidateQueries(key: QueryKey) {
    const state = this.cache.get(key);
    if (state) {
      state.updatedAt = 0;
      this.notify(key);
    }
  }

  removeQuery(key: QueryKey) {
    this.cache.delete(key);
  }

  getCache() {
    return this.cache;
  }

  private notify(key: QueryKey) {
    const state = this.getQuery(key);
    state.subscribers.forEach((cb) => cb());
  }
}

export const queryClient = new QueryClient();
