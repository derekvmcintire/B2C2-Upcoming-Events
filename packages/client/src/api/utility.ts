const PROXY_BASE_URL = '/api/proxy';

/**
 * Constructs a proxy request URL for forwarding a request to a third-party API.
 * 
 * This function takes the base API URL and a set of parameters, encodes them properly, and returns a URL
 * that can be used to call the serverless proxy.
 * 
 * @param apiUrl - The target API URL to which the request will be proxied.
 * @param params - The parameters to be passed to the target API. This can be any object that conforms to the desired shape.
 * 
 * @returns A string representing the full proxy request URL, including the encoded API URL and parameters.
 * 
 * @example
 * // Example usage:
 * const url = buildProxyRequestUrl('https://example.com/api', { eventType: 'conference', after: '2025-01-01' });
 * console.log(url); // /api/proxy?apiUrl=https%3A%2F%2Fexample.com%2Fapi&params=%7B%22eventType%22%3A%22conference%22%2C%22after%22%3A%222025-01-01%22%7D
 */
export const buildProxyRequestUrl = <T>(apiUrl: string, params: T): string => {
  return `${PROXY_BASE_URL}?apiUrl=${encodeURIComponent(apiUrl)}&params=${encodeURIComponent(JSON.stringify(params))}`;
};
