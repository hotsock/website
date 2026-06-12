# Real-Time Chat Example

Run this example in development.

```
npm install
npm run dev
```

## Backend Requirements

The token endpoint at `/real-time-chat` (POST, JSON body) must return:

The request body may include `{ "sessionId": "abc123" }` to rejoin an existing session. If omitted or empty, the server generates a new session ID.

```json
{
  "jim": { "token": "eyJ..." },
  "pam": { "token": "eyJ..." },
  "channel": "chat-{sessionId}",
  "sessionId": "{sessionId}"
}
```

**Token claims (identical for both users, different `uid`):**

```json
{
  "exp": "...",
  "scope": "connect",
  "uid": "jim",
  "channels": {
    "chat-{sessionId}": {
      "subscribe": true,
      "historyStart": 0,
      "messages": {
        "chat": {
          "publish": true,
          "echo": true,
          "store": 86400,
          "react": ["❤️", "👍", "👎", "😂"]
        },
        "hotsock.messageReaction": { "echo": true },
        "is-typing": { "publish": true }
      }
    }
  }
}
```

- `historyStart: 0` grants access to the full channel message history.
- `store: 86400` retains chat messages for 24 hours.
- `echo: true` on `chat` so the sender sees their own messages.
- `react: ["❤️", "👍", "👎", "😂"]` allows the four reactions shown in the UI on stored `chat` messages.
- `echo: true` on `hotsock.messageReaction` allows the client to receive its own reaction add/remove events. Reaction authorization comes from the `react` directive on `chat`.
- `is-typing` is ephemeral (no store) — only delivered to live subscribers.
- The Hotsock `HttpApiUrl` is hardcoded in the client for `connection/listMessages` calls to load stored message history and expanded reaction data on connect.
