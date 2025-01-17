# Project Brief: B2C2 Event Calendar

## Overview
The B2C2 Event Calendar is a simple application designed to allow users to submit cycling event URLs, retrieve event details from an external GraphQL API, and display events organized by type (Road, CX, XC). The system prioritizes simplicity, maintainability, and a lightweight architecture.

---

## Key Features
### Client Side
- **React Application** with:
  - A **form submission page** (`/submit`) to:
    - Accept an event URL.
    - Validate the URL.
    - Fetch event data from an external GraphQL API (`https://outsideapi.com/fed-gw/graphql`).
    - Persist the event data.
  - A **listing page for each event type** (`/type/[eventType]`) that:
    - Displays a sorted list of future events (by date, ascending).
    - Includes event details:
      - Date
      - Event Name
      - Location (City, State)
      - Description
      - Registration Link
      - List of teammates registered for the event (fetched dynamically using event ID).

### Data Storage
- **NoSQL Data Storage** with the following schema:
  ```json
  {
    "eventType": "Road",
    "eventId": "123",
    "name": "Event Name",
    "date": "2025-01-01",
    "city": "Boston",
    "state": "MA",
    "eventUrl": "https://registration.example.com"
  }
  ```
- Events are grouped by type (Road, CX, XC) for simpler querying.
- **Key:** Use `eventId` as the unique identifier.

---

## Recommendations

### 1. **Data Storage**
#### Options:
- **JSON File:**
  - Simple and free.
  - Best for low traffic and small datasets.
  - Challenges: Limited scalability and performance issues with concurrent writes.
- **Firebase Firestore (Free Tier):**
  - Managed NoSQL database.
  - Easy setup, real-time data syncing.
  - Free tier sufficient for light usage.
- **SQLite:**
  - Lightweight relational database stored as a file.
  - Suitable for small-scale projects.
- **Supabase (PostgreSQL backend):**
  - Offers simplicity with structured querying.
  - Free tier includes generous limits.

**Recommendation:** Start with Firebase Firestore for its simplicity, maintainability, and free tier offering.

**Recommended Firestore Data Structure**

Use a collection/document model, which organizes your data by event type and stores individual events as documents within subcollections. This allows efficient querying by both type and date.

Structure Example:
```
/events
  /road
    {eventId1}: {eventData}
    {eventId2}: {eventData}
  /cx
    {eventId3}: {eventData}
    {eventId4}: {eventData}
  /xc
    {eventId5}: {eventData}
    {eventId6}: {eventData}
```

### 2. **Data Reading/Writing**
#### Options:
- **Serverless Functions (e.g., Vercel, Netlify):**
  - Simple to implement and cost-effective.
  - Handles on-demand compute for both reading and writing.
  - Works well with Firestore or similar databases.
- **Dedicated Backend API:**
  - Adds complexity but provides more control and flexibility.
  - Useful for complex business logic or multi-step transactions.

**Recommendation:** Use serverless functions to handle:
- URL validation.
- Fetching data from the GraphQL endpoint.
- Reading/writing to the database.

### 3. **Client Framework**
#### Options:
- **React with Vite:**
  - Modern, fast build tool.
  - Familiar ecosystem for React developers.
- **SvelteKit:**
  - Lightweight and simpler to set up than React.
  - Built-in support for serverless functions and database integrations.
- **Vue 3:**
  - Simpler learning curve than React.

**Recommendation:** Stick with React and Vite, or consider SvelteKit if you want a simpler, modern framework with built-in features.

### 4. **Form Submission**
#### Options:
- **React Hook Form:**
  - Lightweight, performant library for form management.
  - Great validation support.
- **Plain HTML + Fetch API:**
  - Minimal dependencies.
  - Simpler to implement for a single form.

**Recommendation:** Use React Hook Form for its flexibility and built-in validation capabilities.

---

## User Flow
1. User navigates to `/submit`.
2. User enters an event URL and clicks submit.
3. URL is validated, and a request is sent to the GraphQL API.
4. Data from the GraphQL API is persisted to the database.
5. User navigates to `/type/[eventType]` (e.g., `/type/road`).
6. A sorted list of future events is displayed.
7. User clicks a registration link to visit the external registration page.
8. Registered teammates are dynamically fetched and displayed for each event.

---

## Next Steps
1. Finalize the data storage solution (e.g., Firebase Firestore).
2. Set up serverless functions for data processing.
3. Build the React application using Vite and React Hook Form.
4. Test the user flow and deploy the application (e.g., on Vercel or Netlify).

---

## GraphQL Endpoint

**URL:** `POST https://outsideapi.com/fed-gw/graphql`
**Request Body:**
```json
{
  "query": "query GetAthleticEventByUrl($url: String!) { athleticEventByURL(url: $url) { eventId name date city state latitude longitude eventUrl } }",
  "variables": {
    "url": "https://www.bikereg.com/the-frozen-four-1-2025"
  }
}
```
**Expected Response:**
```json
{
    "data": {
        "athleticEventByURL": {
            "eventId": "69168",
            "name": "The Frozen Four 2025: Matt Catania Memorial",
            "date": "2025-03-02T00:00:00.000-05:00",
            "city": "Farmington",
            "state": "CT",
            "latitude": 41.699024,
            "longitude": -72.8646034,
            "eventUrl": "https://www.bikereg.com/the-frozen-four-1-2025"
        }
    }
}
```

---

## Get Registered Riders Endpoint

**URL:** `GET https://www.crossresults.com/api/b2c2lookup.php?eventID=68315`
**Expected Response:**
```json
{
    "0": {
        "0": 68315,
        "1": "Buzz the Tower",
        "2": "Colin",
        "3": "Reuter",
        "4": "Cat 3/4 Men ",
        "5": {
            "date": "2025-03-29 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "America/New_York"
        },
        "6": {
            "date": "2025-03-29 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "America/New_York"
        },
        "EventID": 68315,
        "EventName": "Buzz the Tower",
        "FirstName": "Colin",
        "LastName": "Reuter",
        "Category": "Cat 3/4 Men ",
        "EventDate": {
            "date": "2025-03-29 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "America/New_York"
        },
        "EventEndDate": {
            "date": "2025-03-29 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "America/New_York"
        }
    }
}
```
