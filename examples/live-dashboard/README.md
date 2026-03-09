# Live Dashboard Example

Run this example in development.

```
npm install
npm run dev
```

## Backend Requirements

The token endpoint at `/live-dashboard` (POST, JSON body `{}`) must return:

```json
{
  "token": "eyJ...",
  "channel": "dashboard-{sessionId}"
}
```

**Token claims (subscribe-only, no `messages`):**

```json
{
  "exp": "...",
  "scope": "connect",
  "uid": "viewer",
  "channels": {
    "dashboard-{sessionId}": {
      "subscribe": true
    }
  }
}
```

**Server-published events:** The Lambda must also trigger periodic server-published messages to the channel (every 2-3 seconds for ~3 minutes) with three event types:

- `stats-update`: `{ "activeUsers": 1284, "requestsPerSec": 4521, "errorRate": 0.02, "avgLatency": 45 }` — randomized around realistic baselines
- `chart-data`: `{ "timestamp": 1709901234, "requests": 4521, "errors": 12 }`
- `alert`: `{ "level": "warning"|"info"|"error", "message": "Latency spike detected" }` — occasional, not every tick
