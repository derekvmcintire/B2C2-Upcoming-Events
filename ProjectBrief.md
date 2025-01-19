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

## **Caching and Throttling**

### **Caching**

**Goal:** Improve performance by reducing redundant external API calls, particularly for dynamically fetched data (e.g., registered riders) that can change frequently.

1. **Event Data (GraphQL Request)**

   - **Caching Strategy:** Event data fetched from the external GraphQL API will be stored in Firestore (as described in the data storage section). Therefore, there is no need to cache the event data at the API level, as Firestore will handle persistence and retrieval of this data.
   - **Action:** No caching is required for the GraphQL event data.

2. **Registered Riders Data (GET Request)**

   - **Caching Strategy:** Since the list of registered riders can change frequently but may still be used for a few minutes after being fetched, we will implement short-lived caching for the registered riders' data. This will allow quick retrieval if a user refreshes the page or navigates away and then back quickly.
   - **TTL (Time to Live):** Cache registered riders data for **5 minutes**. This duration strikes a balance between freshness and performance, reducing the need to re-fetch data while still ensuring relatively up-to-date information.
   - **Cache Storage:** The cache will be stored in a fast-access storage mechanism, such as Redis or in-memory caching within the serverless functions.
   - **Cache Invalidation:** Each time a request for registered riders is made, the cache will be checked:
     - If the data is present and still within the TTL, it will be returned from the cache.
     - If the data is absent or expired, a new request will be made to the external API, and the cache will be updated.

3. **Fallback Behavior:**
   - If the external API is unreachable, the system will fallback to showing cached data (if available) and notify the user of potential outdated information.

---

### **Throttling and Lazy Loading**

**Goal:** Reduce unnecessary API requests and improve user experience by fetching only the necessary data based on user interactions (e.g., what events are visible on the screen).

1. **Throttling Requests**

   - **Throttling for Visible Events:**
     - Requests for registered riders will only be made for events currently visible on the user's screen (above the fold). This ensures we’re not fetching data for events that the user won’t immediately interact with.
     - **IntersectionObserver API** will be used to detect which events are currently visible and trigger the corresponding API requests.
     - Requests for events outside of the visible viewport will be throttled and not made until the user scrolls and those events come into view.
     - **Rate Limiting:** The backend (serverless function) will implement a rate-limiting mechanism to avoid overwhelming the external API, even with multiple requests for visible events.

2. **Lazy Loading of Registered Riders**

   - **Lazy Loading Behavior:**
     - Registered riders will be loaded dynamically as the user scrolls down the page (i.e., lazy-loaded). Only a small subset of registered riders will be fetched initially, and as the user scrolls, additional riders will be fetched in batches.
     - For better user experience, a “Loading…” state will be shown when new data is being fetched.
     - The system will continue to fetch and cache registered riders data in small chunks, using the throttling strategy mentioned above to manage request frequency.

3. **Scroll Detection and Data Fetching**
   - **Using IntersectionObserver:**
     - The IntersectionObserver API will be employed to track which events have scrolled into view.
     - When an event becomes visible, the system will trigger an API call to fetch its registered riders.
   - **Pagination and Batch Requests:**
     - To further optimize performance, registered riders will be fetched in batches or pages. This will ensure that we are not fetching large amounts of data at once, which could impact performance or trigger rate limits on the external API.

---

### **Summary of Caching and Throttling Strategy**

1. **Caching:**
   - No caching for GraphQL event data (stored in Firestore).
   - Short-lived (5-minute TTL) cache for registered riders' data to handle quick page refreshes and navigations.
2. **Throttling & Lazy Loading:**
   - Throttling of registered riders' requests based on visible events using IntersectionObserver to detect events in view.
   - Dynamic lazy loading of registered riders as the user scrolls, minimizing unnecessary API calls.

This approach will ensure a balance between performance, user experience, and minimizing external API load.

---

Feel free to adjust the TTL or throttling parameters as needed based on the specific requirements of your app. This plan should integrate well with your existing system architecture while ensuring optimal performance.

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

---

Suggested Repository Structure:

```
b2c2-events/
├── apps/
│   ├── client/          # React frontend
│   └── functions/       # Serverless functions
├── packages/
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Shared utilities
├── .github/            # GitHub Actions workflows
└── package.json        # Root package.json
```
