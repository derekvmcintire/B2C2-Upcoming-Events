# B2C2 Event Calendar - Client Application

## Overview

The B2C2 Event Calendar client application is a React-based web application that allows users to submit cycling event URLs, fetch event details from an external GraphQL API, and display events organized by type (Road, CX, XC).

---

## Features

### 1. **Submit Event Page (`/submit`):**

- **Functionality:**

  - Accepts a cycling event URL submitted by the user.
  - Validates the URL for correctness.
  - Sends a request to the external GraphQL API to fetch event details.
  - Saves the retrieved event data to the database.

- **External API:**
  - **Endpoint:** `POST https://outsideapi.com/fed-gw/graphql`
  - **Request:**
    ```json
    {
      "query": "query GetAthleticEventByUrl($url: String!) { athleticEventByURL(url: $url) { eventId name date city state latitude longitude eventUrl } }",
      "variables": {
        "url": "<submitted-event-url>"
      }
    }
    ```
  - **Response Example:**
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

### 2. **Event Type Listing Pages (`/type/[eventType]`):**

- **Functionality:**

  - Displays a sorted list of future events for the specified event type (Road, CX, XC).
  - Sorts events by date (ascending).
  - Displays event details, including:
    - Event Name
    - Date
    - City, State
    - Description
    - Registration Link
    - Registered teammates (dynamically fetched using the event ID).

- **Lazy Loading:**
  - Registered teammates are dynamically fetched as the user scrolls down the list of events.

### 3. **Validation and Caching:**

- **URL Validation:** Ensures only valid event URLs are accepted.
- **Caching:**
  - Short-lived (5-minute TTL) cache for registered teammates data.
  - Cached data is invalidated and re-fetched as needed.

---

## Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd b2c2-event-calendar-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root and configure the required environment variables:

   ```env
   REACT_APP_GRAPHQL_API_URL=https://outsideapi.com/fed-gw/graphql
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Project Structure

```
/src
  /components
    EventForm.jsx         # Form for submitting event URLs
    EventList.jsx         # Component for displaying a list of events
  /pages
    /submit
      index.jsx          # Submit Event page
    /type
      [eventType].jsx    # Event type listing page
  /services
    graphql.js           # GraphQL API interactions
    caching.js           # Caching logic for registered teammates data
  App.jsx                # Main application component
```

---

## Deployment

The client application can be deployed to any static hosting provider. The following steps describe deployment to **Vercel**:

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

3. Deploy the application:

   ```bash
   vercel
   ```

4. Follow the CLI prompts to complete the deployment process.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- External GraphQL API provided by [outsideapi.com](https://outsideapi.com).
- React and Vite for powering the front end.

---
