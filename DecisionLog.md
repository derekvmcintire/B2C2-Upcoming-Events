# Decision Log

This document tracks key architectural and technical decisions made for the B2C2 Event Calendar project.

## Implemented Decisions

### Data Storage (2024-01)
**Context:** Need a database solution that balances simplicity, cost, and scalability.

**Options Considered:**
- JSON File: Simple but limited scalability
- Firebase Firestore: Managed NoSQL with free tier
- SQLite: Lightweight relational file-based
- Supabase: PostgreSQL-based with free tier

**Decision:** Firebase Firestore

**Rationale:**
- Managed service reduces operational overhead
- Free tier sufficient for current needs
- Collection/document model fits event data structure
- Efficient querying by type and date
- Real-time data syncing capabilities

### Data Reading/Writing (2024-01)
**Context:** Need a solution for handling data operations and external API interactions.

**Options Considered:**
- Serverless Functions (Vercel, Netlify)
- Dedicated Backend API

**Decision:** Serverless Functions

**Rationale:**
- Cost-effective for current scale
- Simpler implementation
- Handles core needs:
  - URL validation
  - GraphQL endpoint interaction
  - Database operations

### Client Framework (2024-01)
**Context:** Need a frontend framework for building the user interface.

**Options Considered:**
- React with Vite
- SvelteKit
- Vue 3

**Decision:** React with Vite + Mantine UI

**Rationale:**
- Modern build tooling with Vite
- Familiar React ecosystem
- Mantine UI provides comprehensive component library

### Form Submission (2024-01)
**Context:** Need a solution for handling the event submission form.

**Options Considered:**
- React Hook Form
- Plain HTML + Fetch API

**Decision:** Mantine UI forms

**Rationale:**
- Simple two-field form doesn't require complex form library
- Already using Mantine UI for other components
- Built-in validation capabilities

## Pending Decisions

### Caching Strategy
**Context:** Need to optimize performance and reduce redundant API calls.

**Options Under Consideration:**
1. Event Data (GraphQL):
   - No additional caching needed (Firestore serves as persistence layer)
   
2. Registered Riders Data:
   - Proposed: 5-minute TTL cache
   - Storage options:
     - Redis
     - In-memory caching in serverless functions
   
**Status:** Under review

### Throttling and Lazy Loading
**Context:** Need to optimize data fetching and improve performance.

**Proposed Approach:**
1. Throttling:
   - Use IntersectionObserver for visible events
   - Implement rate limiting on backend
   
2. Lazy Loading:
   - Dynamic loading of registered riders
   - Batch fetching in small chunks
   - Loading states for better UX

**Status:** Planning phase

## Decision Template
For future decisions, use this template:

```markdown
### [Decision Title] (YYYY-MM)
**Context:** [What is the issue we're deciding on?]

**Options Considered:**
- Option 1
- Option 2
- Option 3

**Decision:** [What was chosen]

**Rationale:**
- [Key reasons for the choice]
- [Impact and benefits]

**Status:** [Implemented/In Progress/Under Review]
```
