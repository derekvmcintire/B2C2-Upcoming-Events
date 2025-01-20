// @vercel/node
import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless function to proxy requests to third-party APIs.
 * Supports multiple HTTP methods and dynamic query parameters.
 * 
 * @param req - The request object containing query parameters, request body, and headers.
 * @param res - The response object for sending back the result or error.
 * 
 * Query Parameters:
 * - `apiUrl` (string): The target API URL for the third-party service.
 * - `params` (string, optional): The query parameters to include in the API request (JSON string).
 * - `headers` (string, optional): Additional headers to include in the request (JSON string).
 * 
 * Supported Methods:
 * - GET, POST, PUT, DELETE
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Ensure only allowed methods are accepted
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method as string)) {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Extract and validate query parameters
    const { apiUrl, params, headers } = req.query;
    if (typeof apiUrl !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "apiUrl" query parameter' });
    }

    // Default request options for fetch
    const requestOptions: RequestInit = {
        method: req.method, // Use the HTTP method from the request
        headers: {
            'Content-Type': 'application/json', // Default header for JSON content
            ...((headers && JSON.parse(headers as string)) || {}),
        },
        body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined, // Include body if not a GET request
    };

    // Build query string for GET requests
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';

    try {
        // Construct the third-party API URL
        const targetUrl = `${apiUrl}${queryParams}`;

        // Make the request to the third-party API
        const response = await fetch(targetUrl, requestOptions);

        // If the response was not successful, throw an error
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        // Parse and send the response JSON
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Handle errors and send a meaningful message
        return res.status(500).json({ error: `Request failed: ${(error as Error).message}` });
    }
}
