import { VercelRequest, VercelResponse } from '@vercel/node';
import { B2C2_API_BASE_URL } from './constants.js';

const allowedOrigins = ['https://b2-c2-upcoming-events.vercel.app', 'http://localhost:5173'];

/**
 * Handles CORS setup based on allowed origins.
 * Adds necessary CORS headers and handles preflight (OPTIONS) requests.
 *
 * @param req - The request object containing the incoming request headers.
 * @param res - The response object for sending back the result or error.
 */
function handleCORS(req: VercelRequest, res: VercelResponse) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string) || !origin) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
        if (req.method === 'OPTIONS') {
            return res.status(200).end(); // Handle preflight requests
        }
    } else {
        return res.status(403).json({ error: 'CORS not allowed from this origin' });
    }
}

/**
 * Prepares the request options for making the API request.
 * Adds headers and request body, including the API key if required.
 *
 * @param req - The request object containing incoming request details.
 * @param _res - The response object (not used in this function).
 * @param apiUrl - The target API URL.
 * @param headers - Additional headers to include in the request.
 * @returns The prepared request options for the fetch request.
 */
function prepareRequest(req: VercelRequest, _res: VercelResponse, apiUrl: string, headers: string | undefined) {
    const requestOptions: RequestInit = {
        method: req.method, // Use the HTTP method from the request
        headers: {
            'Content-Type': 'application/json', // Default header for JSON content
            ...((headers && JSON.parse(headers as string)) || {}),
        } as Record<string, string>,
        body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined, // Include body if not a GET request
    };

    // Add the x-api-key header only if it's necessary (for example, when the API URL is your own backend or a secured API)
    if (requestOptions && isSecuredApi(apiUrl)) {
        (requestOptions.headers as Record<string, string>)['x-api-key'] = process.env.API_SECRET_KEY!; // Securely add your API key
    }

    return requestOptions;
}

/**
 * Checks if the target API URL requires an API key.
 * This check is customizable depending on your needs.
 *
 * @param apiUrl - The API URL to check.
 * @returns A boolean indicating whether the API URL requires an API key.
 */
function isSecuredApi(apiUrl: string) {
    const securedApis = [B2C2_API_BASE_URL, 'http://localhost:5173/'];
    return securedApis.some((url) => apiUrl.startsWith(url));
}

/**
 * Makes the request to the target API with the prepared request options.
 * 
 * @param apiUrl - The target API URL.
 * @param requestOptions - The request options including headers and body.
 * @returns The data returned from the third-party API.
 * @throws An error if the request fails or the response is not ok.
 */
async function makeRequest(apiUrl: string, requestOptions: RequestInit) {
    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Request failed: ${(error as Error).message}`);
    }
}

/**
 * Main handler function for the proxy.
 * Handles the request, CORS, query parameters, and forwards the request to the third-party API.
 *
 * @param req - The request object containing incoming request details.
 * @param res - The response object for sending back the result or error.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    handleCORS(req, res);

    const allowedMethods = ['GET', 'POST'];
    if (!allowedMethods.includes(req.method as string)) {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { apiUrl, params, headers } = req.query;
    if (typeof apiUrl !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "apiUrl" query parameter' });
    }

    let queryParams = '';
    if (params) {
        try {
            const paramsObj = JSON.parse(params as string);
            queryParams = '?' + new URLSearchParams(paramsObj).toString();
        } catch (error) {
            return res.status(400).json({ error: 'Invalid JSON in "params" query parameter' });
        }
    }

    const requestOptions = prepareRequest(req, res, `${apiUrl}${queryParams}`, headers as string);

    try {
        const data = await makeRequest(`${apiUrl}${queryParams}`, requestOptions);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: `Request failed: ${(error as Error).message}` });
    }
}
