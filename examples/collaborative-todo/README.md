# Collaborative To-Do List Example

Run this example in development.

```
npm install
npm run dev
```

## Backend Requirements

The token endpoint at `/collaborative-todo` (POST, JSON body) must return:

The request body may include `{ "sessionId": "abc123" }` to rejoin an existing session. If omitted or empty, the server generates a new session ID.

```json
{
  "alice": { "token": "eyJ..." },
  "bob": { "token": "eyJ..." },
  "channel": "todo-{sessionId}",
  "sessionId": "{sessionId}"
}
```

**Token claims (identical for both users, different `uid`):**

```json
{
  "exp": "...",
  "scope": "connect",
  "uid": "alice",
  "channels": {
    "todo-{sessionId}": {
      "subscribe": true,
      "historyStart": 0,
      "messages": {
        "add-item": { "publish": true, "echo": true, "store": 86400 },
        "toggle-item": { "publish": true, "echo": true, "store": 86400 },
        "delete-item": { "publish": true, "echo": true, "store": 86400 }
      }
    }
  }
}
```

- `historyStart: 0` grants access to the full channel message history.
- `store: 86400` retains each event for 24 hours.
- `echo: true` on all events so the sender sees confirmation of their own actions.
- The Hotsock `HttpApiUrl` is hardcoded in the client for `connection/listMessages` calls to load stored message history on connect.
