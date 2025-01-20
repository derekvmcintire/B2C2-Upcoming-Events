type CacheData<T> = {
  data: T;
  timestamp: number;
};

class Cache<T> {
  private cache = new Map<string, CacheData<T>>();
  private ttl: number;

  constructor(ttl: number) {
    this.ttl = ttl;
  }

  /**
   * Retrieves cached data for a given key if it is not expired.
   * 
   * @param {string} key - The unique key for the cache.
   * @returns {T | null} - The cached data if found and not expired, or `null` if not found or expired.
   */
  get(key: string): T | null {
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key); // Cache expired, remove it
      return null;
    }

    return cached.data;
  }

  /**
   * Saves data to the cache with a specific key.
   * 
   * @param {string} key - The unique key for the cache.
   * @param {T} data - The data to cache.
   */
  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clears the cached data for a specific key.
   * 
   * @param {string} key - The unique key for the cache.
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all data in the cache.
   */
  clearAll(): void {
    this.cache.clear();
  }
}

export default Cache;
