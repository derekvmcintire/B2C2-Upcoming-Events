import { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import fetch from "node-fetch";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY!)), // Replace with your service account JSON key
  });
}

interface EventData {
  eventId: string;
  name: string;
  date: string;
  city: string;
  state: string;
  eventUrl: string;
  eventType: "road" | "cx" | "xc";
}

interface SubmitEventRequest {
  url: string;
  eventType: "road" | "cx" | "xc";
}

export default async function submitEvent(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, eventType }: SubmitEventRequest = req.body;

    if (!url || !eventType || !["road", "cx", "xc"].includes(eventType)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Fetch event data from the GraphQL API
    const response = await fetch("https://outsideapi.com/fed-gw/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetAthleticEventByUrl($url: String!) {
            athleticEventByURL(url: $url) {
              eventId
              name
              date
              city
              state
              eventUrl
            }
          }
        `,
        variables: { url },
      }),
    });

    const result = await response.json();
    if (!result.data?.athleticEventByURL) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventData: EventData = {
      ...result.data.athleticEventByURL,
      eventType,
    };

    // Store in Firestore
    const db = admin.firestore();
    await db
      .collection("events")
      .doc(eventType)
      .collection("events")
      .doc(eventData.eventId)
      .set(eventData);

    return res.status(200).json({ success: true, eventId: eventData.eventId });
  } catch (error) {
    console.error("Error submitting event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
