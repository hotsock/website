# Notification Feed Example

Run this example in development.

```
npm install
npm run dev
```

## Backend Requirements

The token endpoint at `/notification-feed` (POST, JSON body `{}`) must return:

```json
{
  "token": "eyJ..."
}
```

**Token claims:**

```json
{
  "exp": "...",
  "scope": "connect",
  "uid": "user-1",
  "umd": { "name": "Sarah" },
  "channels": {
    "notifications-user-1": {
      "subscribe": true,
      "alias": "notifications",
      "autoSubscribe": true,
      "historyStart": 0
    }
  }
}
```

- `autoSubscribe: true` — the channel subscribes automatically on connect, no explicit subscribe call needed.
- `alias: "notifications"` — the client references the channel as `"notifications"` instead of the real name.
- `historyStart: 0` — grants access to the full stored message history.
- No `messages` claim — notifications are server-published only.

**Server-published notifications:** All notifications use a single `notification` event name with `type` inside the data payload. The client reads `data.type` to determine styling (info/success/warning).

**Pre-seeded stored notifications:** Before returning the token, the Lambda should publish 3-5 stored notifications to the channel so history loads immediately:

- `notification`: `{ "type": "info", "title": "New follower", "body": "Alex started following you", "icon": "user-plus" }`
- `notification`: `{ "type": "success", "title": "Deploy complete", "body": "v2.4.1 deployed to production", "icon": "check-circle" }`
- `notification`: `{ "type": "warning", "title": "Usage limit", "body": "You've used 90% of your API quota", "icon": "alert-triangle" }`

**Scheduled future notifications:** The Lambda should also schedule 2-3 notifications to arrive after the page loads:

- At ~10s: `notification` — `{ "type": "info", "title": "New comment", "body": "Jordan commented on your pull request", "icon": "user-plus" }`
- At ~25s: `notification` — `{ "type": "success", "title": "Build passed", "body": "CI pipeline completed successfully", "icon": "check-circle" }`
- At ~45s: `notification` — `{ "type": "warning", "title": "Certificate expiring", "body": "Your TLS certificate expires in 7 days", "icon": "alert-triangle" }`
