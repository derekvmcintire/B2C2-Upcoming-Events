# JSON mocks

## Endpoints

### Registrations

**Proxy Request URL:** `http://localhost:5173/api/proxy?apiUrl=https%3A%2F%2Fwww.crossresults.com%2Fapi%2Fb2c2lookup.php&params=%7B%22discipline%22%3A%22road%2520race%22%2C%22after%22%3A%222025-02-05%22%7D`

**Endpoint URL:** `https://www.crossresults.com/api/b2c2lookup.php`
**Params:**

```json
{ "discipline": "road%20race", "after": "2025-02-05" }
```

**Mock Data:** `json-mocks/registrations.json`

### Events

**Proxy Request URL:** `http://localhost:5173/api/proxy?apiUrl=https%3A%2F%2Fb2c2-events-api.vercel.app%2Fapi%2FgetEventsByType&params=%7B%22type%22%3A%22road%22%7D`

**Endpoint URL:** `https://b2c2-events-api.vercel.app/api/getEventsByType`
**Params:**

```json
{ "type": "road" }
```

**Mock Data:** `json-mocks/registrations.json`
