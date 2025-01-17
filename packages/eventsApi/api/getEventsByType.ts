import { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIRESTORE_KEY || '')),
  });
}

interface Event {
  eventId: string;
  eventType: "road" | "cx" | "xc";
  name: string;
  date: string;
  city: string;
  state: string;
  eventUrl: string;
}

export default async function getEventsByType(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, startDate = new Date().toISOString().split('T')[0] } = req.query;

    // Validate type parameter
    if (!type || typeof type !== 'string' || !["road", "cx", "xc"].includes(type.toLowerCase())) {
      return res.status(400).json({ error: "Invalid event type. Must be one of: road, cx, xc" });
    }

    // Validate startDate format if provided
    if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate.toString())) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const db = admin.firestore();
    
    // Query events collection
    const eventsRef = db
      .collection("events")
      .doc(type.toLowerCase())
      .collection("events")
      .where("date", ">=", startDate)
      .orderBy("date", "asc");

    const snapshot = await eventsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ events: [] });
    }

    // Convert snapshot to array of events
    const events: Event[] = snapshot.docs.map(doc => ({
      ...(doc.data() as Event),
      eventId: doc.id
    }));

    return res.status(200).json({ events });

  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}