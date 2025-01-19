// @vercel/node
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Ensure only GET requests are allowed
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Extract query parameters
    const { eventType, after } = req.query;

    // Validate query parameters
    if (typeof eventType !== 'string' || typeof after !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }

    // Construct the third-party API URL
    const targetUrl = `https://www.crossresults.com/api/b2c2lookup.php?eventType=${encodeURIComponent(
        eventType
    )}&after=${encodeURIComponent(after)}`;

    try {
        // Fetch data from the third-party API
        const response = await fetch(targetUrl);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(
                `Third-party API request failed with status ${response.status}: ${response.statusText}`
            );
        }

        // Parse and send the response JSON
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: (error as Error).message });
    }
}
