import { useState, useEffect } from "react";

/**
 * A custom React hook to debounce a value. It delays updating the value until after the specified delay.
 * This is useful for optimizing performance when dealing with frequently changing values, such as in search inputs.
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The input value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced value, updated only after the specified delay.
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform API call or expensive computation here
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on component unmount or when value/delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
