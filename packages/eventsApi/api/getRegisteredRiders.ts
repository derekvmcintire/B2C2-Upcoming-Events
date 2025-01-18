import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function getRegisteredRiders(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Missing eventId" });
    }

    const response = await fetch(
      `https://www.crossresults.com/api/b2c2lookup.php?eventID=${eventId}`,
    );
    const riders = await response.json();

    return res.status(200).json(riders);
  } catch (error) {
    console.error("Error fetching riders:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
