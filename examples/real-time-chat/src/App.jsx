import { HotsockClient } from "@hotsock/hotsock-js"
import { useCallback, useEffect, useRef, useState } from "react"

const wssUrl = "wss://975x5pgn0h.execute-api.us-east-1.amazonaws.com/v1"
const httpApiUrl =
  "https://f3hl5m33mxzpbu3ybcwcmcznu40njuio.lambda-url.us-east-1.on.aws"
const STORAGE_KEY = "hotsock-chat-session"
const REACTIONS = [
  { value: "❤️", label: "Love" },
  { value: "👍", label: "Like" },
  { value: "👎", label: "Dislike" },
  { value: "😂", label: "Laugh" },
]

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
    "https://ehyijpehufsgcpikp3pdjiznqe0gulim.lambda-url.us-east-1.on.aws/real-time-chat",
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

const jimConnectTokenFn = async () => {
  const data = await connectTokenFn()
  return data.jim.token
}

const pamConnectTokenFn = async () => {
  const data = await connectTokenFn()
  return data.pam.token
}

const AVATAR_COLORS = {
  jim: "bg-blue-500",
  pam: "bg-pink-500",
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

function normalizeReactions(reactions = {}) {
  return REACTIONS.reduce((normalized, { value }) => {
    const reaction = reactions[value]
    if (!reaction) return normalized

    normalized[value] = {
      count: reaction.count || reaction.items?.length || 0,
      items: reaction.items || [],
    }

    return normalized
  }, {})
}

function userReaction(message, uid) {
  return REACTIONS.find(({ value }) =>
    message.reactions?.[value]?.items?.some((item) => item.uid === uid),
  )?.value
}

function updateMessageReaction(messages, reactionMessage, action) {
  const { messageId, reaction } = reactionMessage.data
  const uid = reactionMessage.meta.uid

  return messages.map((message) => {
    if (message.id !== messageId) return message

    const reactions = { ...message.reactions }
    const existing = reactions[reaction] || { count: 0, items: [] }
    const items = existing.items || []
    const alreadyReacted = items.some((item) => item.uid === uid)

    if (action === "add") {
      if (alreadyReacted) return message

      const nextItems = [...items, { uid, umd: reactionMessage.meta.umd }]
      reactions[reaction] = {
        count: Math.max(existing.count + 1, nextItems.length),
        items: nextItems,
      }
    } else {
      const nextItems = items.filter((item) => item.uid !== uid)
      const nextCount = Math.max(0, existing.count - (alreadyReacted ? 1 : 0))

      if (nextCount === 0) {
        delete reactions[reaction]
      } else {
        reactions[reaction] = {
          count: nextItems.length || nextCount,
          items: nextItems,
        }
      }
    }

    return { ...message, reactions }
  })
}

function App() {
  const [channelName, setChannelName] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [copied, setCopied] = useState(false)
  const [jimClient] = useState(
    () =>
      new HotsockClient(wssUrl, {
        connectTokenFn: jimConnectTokenFn,
        logLevel: "debug",
      }),
  )
  const [pamClient] = useState(
    () =>
      new HotsockClient(wssUrl, {
        connectTokenFn: pamConnectTokenFn,
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
      jimClient.terminate()
      pamClient.terminate()
    }
  }, [jimClient, pamClient])

  const handleNewChat = () => {
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
            onClick={handleNewChat}
            className="text-xs text-[#FE337E] hover:text-[#FE0B64] font-medium"
          >
            New chat
          </button>
        </div>
      </div>
      <section className="grid grid-cols-2 gap-4 w-full flex-1 min-h-0 p-4">
        <ChatPanel hotsockClient={jimClient} channelName={channelName} />
        <ChatPanel hotsockClient={pamClient} channelName={channelName} />
      </section>
    </div>
  )
}

function ChatPanel({ hotsockClient, channelName }) {
  const [name, setName] = useState(null)
  const [isTyping, setIsTyping] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeReactionMessageId, setActiveReactionMessageId] = useState(null)
  const isTypingTimeout = useRef(null)
  const wasCalled = useRef(false)
  const channel = useRef({})
  const connectionInfo = useRef(null)
  const lastSentTime = useRef(0)
  const messagesBoxRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
    }
  }

  const loadHistory = useCallback(
    async (connId, connSecret) => {
      const params = new URLSearchParams({
        connectionId: connId,
        connectionSecret: connSecret,
      })
      const allMessages = []
      let after = undefined
      while (true) {
        const body = { channel: channelName, expandReactions: true }
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
        setMessages(
          allMessages
            .filter((msg) => msg.event === "chat")
            .map((msg) => ({
              id: msg.id,
              sender: msg.meta.uid,
              content: msg.data,
              reactions: normalizeReactions(msg.reactions),
              time: formatTime(
                new Date(msg.id ? decodUlidTime(msg.id) : Date.now()),
              ),
            })),
        )
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
    channel.current.bind("chat", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: message.id,
          sender: message.meta.uid,
          content: message.data,
          reactions: {},
          time: formatTime(new Date()),
        },
      ])
      setIsTyping("")
    })
    channel.current.bind("hotsock.messageReactionAdded", (message) => {
      setMessages((prev) => updateMessageReaction(prev, message, "add"))
    })
    channel.current.bind("hotsock.messageReactionRemoved", (message) => {
      setMessages((prev) => updateMessageReaction(prev, message, "remove"))
    })
    channel.current.bind("is-typing", (message) => {
      setIsTyping(`${message.meta.uid} is typing...`)
      if (isTypingTimeout.current) clearTimeout(isTypingTimeout.current)
      isTypingTimeout.current = setTimeout(() => {
        setIsTyping("")
      }, 2000)
    })
  }, [channelName, hotsockClient, loadHistory])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleTyping = (e) => {
    if (e.key === "Enter") return

    const now = Date.now()
    if (now - lastSentTime.current >= 1500) {
      channel.current.sendMessage("is-typing")
      lastSentTime.current = now
    }
  }

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const message = e.target.value.trim()
      channel.current.sendMessage("chat", { data: message })
      e.target.value = ""
    }
  }

  const handleReaction = (message, reaction) => {
    if (!message.id) return

    const currentReaction = userReaction(message, name)
    if (currentReaction) {
      channel.current.sendMessage("hotsock.messageReaction", {
        data: {
          messageId: message.id,
          reaction: currentReaction,
          action: "remove",
        },
      })
    }

    if (currentReaction !== reaction) {
      channel.current.sendMessage("hotsock.messageReaction", {
        data: {
          messageId: message.id,
          reaction,
          action: "add",
        },
      })
    }
  }

  const handleMessageTap = (message) => {
    if (!message.id) return

    setActiveReactionMessageId((currentId) =>
      currentId === message.id ? null : message.id,
    )
  }

  const isSelf = (sender) => sender === name
  const avatarColor = AVATAR_COLORS[name] || "bg-gray-500"

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div
          className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
        >
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

      <main
        className="flex-1 overflow-y-auto flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-900"
        ref={messagesBoxRef}
      >
        <div className="flex-grow" />
        {loading && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
            Loading messages...
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
            Start the conversation by typing a message below...
          </div>
        )}
        {messages.map((message, index) => {
          const isPickerOpen = activeReactionMessageId === message.id
          const visibleReactions = REACTIONS.map(({ value, label }) => ({
            value,
            label,
            count: message.reactions?.[value]?.count || 0,
            active: userReaction(message, name) === value,
          })).filter(({ count }) => count > 0)

          return (
            <div
              key={message.id || index}
              className={`group flex ${isSelf(message.sender) ? "justify-end" : "justify-start"}`}
              onClick={() => handleMessageTap(message)}
            >
              <div
                className={`flex flex-col max-w-[85%] ${
                  isSelf(message.sender) ? "items-end" : "items-start"
                }`}
              >
                <div className="relative">
                  <div
                    className={`px-3 py-2 text-sm ${
                      isSelf(message.sender)
                        ? "bg-pink-500 text-white rounded-2xl rounded-br-md"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.id && (
                    <div
                      className={`absolute bottom-full z-30 flex-col ${
                        isSelf(message.sender)
                          ? "right-0 items-end"
                          : "left-0 items-start"
                      } ${isPickerOpen ? "flex" : "hidden group-hover:flex"}`}
                    >
                      <div className="flex rounded-full border border-gray-200 bg-white/95 p-1 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-800/95">
                        {REACTIONS.map(({ value, label }) => {
                          const active = userReaction(message, name) === value
                          return (
                            <button
                              key={value}
                              type="button"
                              title={`${active ? "Remove" : "Add"} ${label}`}
                              aria-label={`${active ? "Remove" : "Add"} ${label}`}
                              aria-pressed={active}
                              onClick={(event) => {
                                event.stopPropagation()
                                handleReaction(message, value)
                              }}
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-sm leading-none transition-colors ${
                                active
                                  ? "bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-200"
                                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-700 dark:text-gray-300 dark:hover:bg-pink-500/10 dark:hover:text-pink-200"
                              }`}
                            >
                              <span aria-hidden="true">{value}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="h-1 w-full" />
                    </div>
                  )}
                  {visibleReactions.length > 0 && (
                    <div
                      className={`absolute -top-2 z-20 flex w-max max-w-none items-center gap-1 whitespace-nowrap rounded-full border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] leading-none text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ${
                        isSelf(message.sender)
                          ? "right-[calc(100%-0.75rem)] flex-row-reverse"
                          : "left-[calc(100%-0.75rem)]"
                      }`}
                    >
                      {visibleReactions.map(
                        ({ value, label, count, active }) => (
                          <button
                            key={value}
                            type="button"
                            title={`${active ? "Remove" : "Add"} ${label}`}
                            aria-label={`${active ? "Remove" : "Add"} ${label}`}
                            aria-pressed={active}
                            onClick={(event) => {
                              event.stopPropagation()
                              handleReaction(message, value)
                            }}
                            className={`flex h-4 min-w-6 items-center justify-center gap-0.5 rounded-full px-1 transition-colors ${
                              active
                                ? "text-pink-700 dark:text-pink-200"
                                : "hover:bg-pink-50 hover:text-pink-700 dark:hover:bg-pink-500/10 dark:hover:text-pink-200"
                            }`}
                          >
                            <span aria-hidden="true">{value}</span>
                            <span className="font-medium tabular-nums">
                              {count}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <span
                  className={`text-[10px] text-gray-400 dark:text-gray-500 mt-2 ${
                    isSelf(message.sender) ? "text-right" : "text-left"
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          )
        })}
        {isTyping !== "" && (
          <div className="flex justify-start">
            <span className="text-xs text-gray-400 dark:text-gray-500 px-1 py-1">
              {isTyping}
            </span>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2">
        <input
          className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors"
          type="text"
          placeholder="Type a message..."
          onKeyUp={handleTyping}
          onKeyDown={handleSendMessage}
        />
      </footer>
    </div>
  )
}

// Decode timestamp from a ULID (first 10 characters encode ms since epoch)
function decodUlidTime(ulid) {
  const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
  let time = 0
  for (let i = 0; i < 10; i++) {
    time = time * 32 + chars.indexOf(ulid.charAt(i).toUpperCase())
  }
  return time
}

export default App
