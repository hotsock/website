import { HotsockClient } from "@hotsock/hotsock-js"
import { useCallback, useEffect, useRef, useState } from "react"

const wssUrl = "wss://975x5pgn0h.execute-api.us-east-1.amazonaws.com/v1"
const httpApiUrl =
  "https://f3hl5m33mxzpbu3ybcwcmcznu40njuio.lambda-url.us-east-1.on.aws"
const STORAGE_KEY = "hotsock-todo-session"

function getSessionId() {
  const hash = window.location.hash.slice(1)
  if (hash) return hash
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored
  return null
}

function saveSessionId(id) {
  localStorage.setItem(STORAGE_KEY, id)
  window.location.hash = id
}

const initialSessionId = getSessionId()

let cachedResponse = null
let lastFetchTime = 0
let fetchPromise = null

const connectTokenFn = async () => {
  const now = Date.now()

  if (cachedResponse && now - lastFetchTime < 10000) {
    return cachedResponse
  }

  if (fetchPromise) {
    return await fetchPromise
  }

  fetchPromise = fetch(
    "https://ehyijpehufsgcpikp3pdjiznqe0gulim.lambda-url.us-east-1.on.aws/collaborative-todo",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(
        initialSessionId ? { sessionId: initialSessionId } : {},
      ),
    },
  )
    .then((resp) => resp.json())
    .then((data) => {
      cachedResponse = data
      lastFetchTime = Date.now()
      fetchPromise = null
      return data
    })
    .catch((error) => {
      fetchPromise = null
      throw error
    })

  return await fetchPromise
}

const aliceConnectTokenFn = async () => {
  const data = await connectTokenFn()
  return data.alice.token
}

const bobConnectTokenFn = async () => {
  const data = await connectTokenFn()
  return data.bob.token
}

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

function App() {
  const [channelName, setChannelName] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [copied, setCopied] = useState(false)
  const [aliceClient] = useState(
    () =>
      new HotsockClient(wssUrl, {
        connectTokenFn: aliceConnectTokenFn,
        logLevel: "debug",
      }),
  )
  const [bobClient] = useState(
    () =>
      new HotsockClient(wssUrl, {
        connectTokenFn: bobConnectTokenFn,
        logLevel: "debug",
      }),
  )

  useEffect(() => {
    connectTokenFn().then((data) => {
      setChannelName(data.channel)
      const sid = data.sessionId || data.channel
      setSessionId(sid)
      saveSessionId(sid)
    })

    return () => {
      aliceClient.terminate()
      bobClient.terminate()
    }
  }, [])

  const handleNewList = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.hash = ""
    window.location.reload()
  }

  const handleCopyLink = () => {
    const url = window.location.href.split("#")[0] + "#" + sessionId
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
          {sessionId ? `Session: ${sessionId}` : "Connecting..."}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopyLink}
            className="text-xs text-[#FE337E] hover:text-[#FE0B64] font-medium"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <button
            onClick={handleNewList}
            className="text-xs text-[#FE337E] hover:text-[#FE0B64] font-medium"
          >
            New list
          </button>
        </div>
      </div>
      <section className="grid grid-cols-2 gap-4 w-full flex-1 min-h-0 p-4">
        <TodoPanel hotsockClient={aliceClient} channelName={channelName} />
        <TodoPanel hotsockClient={bobClient} channelName={channelName} />
      </section>
    </div>
  )
}

function TodoPanel({ hotsockClient, channelName }) {
  const [name, setName] = useState(null)
  const [items, setItems] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const wasCalled = useRef(false)
  const channel = useRef({})
  const connectionInfo = useRef(null)
  const listRef = useRef(null)

  const processEvent = useCallback((event, message) => {
    setItems((prev) => {
      const next = new Map(prev)
      if (event === "add-item") {
        next.set(message.data.id, {
          id: message.data.id,
          text: message.data.text,
          completed: message.data.completed,
          addedBy: message.meta.uid,
        })
      } else if (event === "toggle-item") {
        const existing = next.get(message.data.id)
        if (existing) {
          next.set(message.data.id, {
            ...existing,
            completed: !existing.completed,
          })
        }
      } else if (event === "delete-item") {
        next.delete(message.data.id)
      }
      return next
    })
  }, [])

  const loadHistory = useCallback(
    async (connId, connSecret) => {
      const params = new URLSearchParams({
        connectionId: connId,
        connectionSecret: connSecret,
      })
      const allMessages = []
      let after = undefined
      while (true) {
        const body = { channel: channelName }
        if (after) body.after = after
        const resp = await fetch(
          `${httpApiUrl}/connection/listMessages?${params}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          },
        )
        const { messages } = await resp.json()
        if (messages && messages.length > 0) {
          allMessages.push(...messages)
          if (messages.length >= 100) {
            after = messages[messages.length - 1].id
            continue
          }
        }
        break
      }
      if (allMessages.length > 0) {
        setItems(() => {
          const result = new Map()
          allMessages.forEach((msg) => {
            if (msg.event === "add-item") {
              result.set(msg.data.id, {
                id: msg.data.id,
                text: msg.data.text,
                completed: msg.data.completed,
                addedBy: msg.meta.uid,
              })
            } else if (msg.event === "toggle-item") {
              const existing = result.get(msg.data.id)
              if (existing) {
                result.set(msg.data.id, {
                  ...existing,
                  completed: !existing.completed,
                })
              }
            } else if (msg.event === "delete-item") {
              result.delete(msg.data.id)
            }
          })
          return result
        })
      }
      setLoading(false)
    },
    [channelName],
  )

  useEffect(() => {
    if (!channelName || wasCalled.current) return
    wasCalled.current = true

    hotsockClient.bind("hotsock.connected", (message) => {
      connectionInfo.current = {
        connectionId: message.data.connectionId,
        connectionSecret: message.data.connectionSecret,
      }
    })

    channel.current = hotsockClient.channels(channelName)
    channel.current.bind("hotsock.subscribed", () => {
      setName(channel.current.uid)
      if (connectionInfo.current) {
        loadHistory(
          connectionInfo.current.connectionId,
          connectionInfo.current.connectionSecret,
        )
      } else {
        setLoading(false)
      }
    })
    channel.current.bind("add-item", (message) => {
      processEvent("add-item", message)
    })
    channel.current.bind("toggle-item", (message) => {
      processEvent("toggle-item", message)
    })
    channel.current.bind("delete-item", (message) => {
      processEvent("delete-item", message)
    })
  }, [channelName, hotsockClient, processEvent, loadHistory])

  const handleAddItem = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const text = e.target.value.trim()
      const id = generateId()
      channel.current.sendMessage("add-item", {
        data: { id, text, completed: false },
      })
      e.target.value = ""
    }
  }

  const handleToggle = (id) => {
    channel.current.sendMessage("toggle-item", { data: { id } })
  }

  const handleDelete = (id) => {
    channel.current.sendMessage("delete-item", { data: { id } })
  }

  const itemList = Array.from(items.values())

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
            {name || "Connecting..."}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {name ? "Online" : "Waiting"}
          </span>
        </div>
        <span
          className={`ml-auto h-2.5 w-2.5 rounded-full shrink-0 ${
            name ? "bg-green-500" : "bg-amber-400"
          }`}
        />
      </header>

      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <input
          className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors"
          type="text"
          placeholder="Add a new item and press Enter..."
          onKeyDown={handleAddItem}
        />
      </div>

      <main
        className="flex-1 overflow-y-auto flex flex-col bg-gray-50 dark:bg-gray-900"
        ref={listRef}
      >
        {loading && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
            Loading items...
          </div>
        )}
        {!loading && itemList.length === 0 && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
            No items yet. Add one above to get started!
          </div>
        )}
        {itemList.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                item.completed
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "border-gray-300 dark:border-gray-600 hover:border-pink-400"
              }`}
            >
              {item.completed && (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <span
              className={`flex-1 text-sm min-w-0 truncate ${
                item.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {item.text}
            </span>

            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                item.addedBy === name
                  ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              by {item.addedBy}
            </span>

            <button
              onClick={() => handleDelete(item.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-opacity shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
