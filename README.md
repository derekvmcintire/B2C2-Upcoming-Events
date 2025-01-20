# B2C2 Event Calendar

A React-based web application for managing and displaying cycling events. Users can submit event URLs, fetch event details through a GraphQL API, and view events organized by discipline (Road, CX, XC).

## System Architecture

![B2C2CalendarSystemDesign drawio (2)](https://github.com/user-attachments/assets/58b23045-9024-422f-b10d-3114a8c1b883)

### Frontend
- Built with Vite, React, and TypeScript
- Uses Mantine UI library for components
- Network requests handled by simple-fetch-ts

### Backend
- Proxy: Serverless function facilitating UI-to-third-party API communication
- API: Serverless functions managing database operations and third-party API interactions
- Database: Firebase Firestore for event storage

### Deployment
- UI and proxy are deployed together on Vercel
- API is deployed separately on another Vercel project

## Features

### Current Implementation
- **Event Submission**
  - Users can submit events via URL
  - Validates URLs from www.bikereg.com
  - Requires discipline selection (road, cyclocross, cross country)

- **Event Display**
  - Organized lists by discipline
  - Sorted in ascending order from the current date
  - Displays comprehensive event details:
    - Date
    - Location
    - Event name
    - Registration link
    - Dynamic teammate registration status

- **Caching**
  - Caches event data to improve performance and reduce redundant API requests.
  - Caching is key-based, with cache keys derived from event type and normalized dates (day-level precision).
  - Cached data is reused when subsequent requests match the same event type and date.

### Planned Features
- Lazy loading for events

## Installation

1. Clone the repository
```bash
git clone git@github.com:derekvmcintire/B2C2-Upcoming-Events.git
```

2. Install client dependencies:
   ```bash
   cd packages/client
   npm install
   ```

3. Install proxy dependencies:
   ```bash
   cd packages/client/api
   npm install
   ```

4. Start the proxy:
   ```bash
   make run-api  # Runs on localhost:3000
   ```

5. Start the client:
   ```bash
   make run  # Runs on localhost:5173
   ```

## Project Configuration

### Client Dependencies
```json
{
  "dependencies": {
    "@mantine/core": "^7.16.0",
    "@mantine/hooks": "^7.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.3",
    "simple-fetch-ts": "^1.0.8"
  }
}
```

### Proxy Dependencies
```json
{
  "type": "module",
  "dependencies": {
    "@vercel/node": "^5.0.2"
  }
}
```

### Development Commands
Available Make commands:
- `make run` - Start the development server
- `make run-api` - Start the API proxy
- `make build` - Build the project
- `make lint` - Run linting
- `make preview` - Preview the build
- `make typecheck` - Run TypeScript checks

### Vite Configuration
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

### Vercel Configuration
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/" },
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

## Deployment

Deployments are automated through Vercel for GitHub:
- Automatic builds and deployments trigger on pull request creation
- Separate deployments for UI/proxy and API components

---
