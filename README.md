# B2C2 Event Calendar  

A React-based web application for managing and displaying cycling events. Users can submit event URLs, fetch event details through a GraphQL API, and view events organized by discipline (Road, CX, XC, and Team Events).  

## System Architecture  

![B2C2CalendarSystemDesign drawio (2)](https://github.com/user-attachments/assets/58b23045-9024-422f-b10d-3114a8c1b883)  

### Frontend  
- Built with Vite, React, and TypeScript  
- Uses Mantine UI library for components  
- Network requests handled by simple-fetch-ts  

### Backend  
- **Proxy**: A serverless function facilitating UI-to-third-party API communication  
- **API**: Serverless functions managing database operations and third-party API interactions  
- **Database**: Firebase Firestore for event storage  

### Deployment  
- UI and proxy are deployed together on Vercel  
- API is deployed separately on another Vercel project  

## Features  

### Current Features  
- **Event Listing**  
  - Events are listed by discipline: Road, Cyclocross, Cross Country, and Team Events.  
  - Displays event details including:  
    - Date  
    - Location  
    - Event name  
    - Registration link (if available)  
    - Registered B2C2 riders for the event (data fetched via a secret endpoint in the BikeReg API).  
  - Events are sorted in ascending order from the current date.  

- **Event Submission**  
  - Submit events by pasting a valid BikeReg URL, selecting a discipline, and submitting the form.  
  - Team events (non-BikeReg) can be manually added with details like:  
    - Event name  
    - Location  
    - Optional external event URL  
    - Optional housing URL  
  - Team events support rider interest submissions, though registered riders are not displayed.  

- **Interactive Features**  
  - Add yourself to the "Interested Riders" list by clicking the **+ I’m Interested** button.  
  - Add a housing link (e.g., spreadsheet, Vrbo, Airbnb) by clicking the **+ Housing** button.  

- **Caching**  
  - Event data is cached to improve performance and reduce redundant API requests.  
  - Cache keys are derived from the event type and normalized dates (day-level precision).  
  - Cached data is reused when subsequent requests match the same criteria.  

### Planned Features  
- Fix the **Remove Housing** feature (currently buggy).  
- Add the ability to edit team events.  
- Add the ability to delete team events.  
- Implement lazy loading or pagination for improved performance on larger datasets.  

## Installation  

1. Clone the repository:  
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
- Automatic builds and deployments trigger on pull request creation.  
- Separate deployments for UI/proxy and API components.  

---  
