/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

interface EventData {
  eventId: string;
  name: string;
  date: string;
  city: string;
  state: string;
  eventUrl: string;
  eventType: 'road' | 'cx' | 'xc';
}

interface SubmitEventRequest {
  url: string;
  eventType: 'road' | 'cx' | 'xc';
}

interface GetRidersRequest {
  eventId: string;
}

export const submitEvent = functions.https.onCall(
  async (data: unknown, _context) => {
    try {
      // Type check and validate the input
      if (!data || typeof data !== 'object') {
        throw new functions.https.HttpsError('invalid-argument', 'Data must be an object');
      }

      const request = data as SubmitEventRequest;
      
      if (!request.url || !request.eventType) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
      }

      if (!['road', 'cx', 'xc'].includes(request.eventType)) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid event type');
      }

      try {
        new URL(request.url);
      } catch {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid URL format');
      }
    
      // Fetch event data from GraphQL API
      const response = await fetch('https://outsideapi.com/fed-gw/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          variables: {
            url: request.url
          }
        })
      });

      const result = await response.json();
    
      if (!result.data?.athleticEventByURL) {
        throw new functions.https.HttpsError('not-found', 'Event not found');
      }

      const eventData: EventData = {
        ...result.data.athleticEventByURL,
        eventType: request.eventType
      };

      // Store in Firestore
      await admin.firestore()
        .collection('events')
        .doc(request.eventType)
        .collection('events')
        .doc(eventData.eventId)
        .set(eventData);

      return { success: true, eventId: eventData.eventId };
    } catch (error) {
      console.error('Error submitting event:', error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError('internal', 'Error submitting event');
    }
  }
);

export const getRegisteredRiders = functions.https.onCall(
  async (data: unknown, _context) => {
    try {
      // Type check and validate the input
      if (!data || typeof data !== 'object') {
        throw new functions.https.HttpsError('invalid-argument', 'Data must be an object');
      }

      const request = data as GetRidersRequest;

      if (!request.eventId) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing eventId');
      }

      const response = await fetch(`https://www.crossresults.com/api/b2c2lookup.php?eventID=${request.eventId}`);
      const riders = await response.json();
      return riders;
    } catch (error) {
      console.error('Error fetching riders:', error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError('internal', 'Error fetching registered riders');
    }
  }
);