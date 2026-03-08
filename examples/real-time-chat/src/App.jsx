import { HotsockClient } from "@hotsock/hotsock-js"
import { useEffect, useRef, useState } from "react"

const wssUrl = "wss://975x5pgn0h.execute-api.us-east-1.amazonaws.com/v1"

let cachedResponse = null
let lastFetchTime = 0
let fetchPromise = null

const connectTokenFn = async () => {
  const now = Date.now()

  if (cachedResponse && now - lastFetchTime < 10000) {
    // Return the cached response if it's within 10 seconds
    return cachedResponse
  }

  if (fetchPromise) {
    // If a fetch is already in progress, wait for it to resolve
    return await fetchPromise
  }

  fetchPromise = fetch(
    "https://ehyijpehufsgcpikp3pdjiznqe0gulim.lambda-url.us-east-1.on.aws/real-time-chat",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      cachedResponse = data
      lastFetchTime = Date.now()
      fetchPromise = null // Clear the fetchPromise once it's resolved
      return data
    })
    .catch((error) => {
      fetchPromise = null // Clear the fetchPromise in case of an error
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

function App() {
  const [channelName, setChannelName] = useState(null)
  const jimClientRef = useRef(null)
  const pamClientRef = useRef(null)

  if (!jimClientRef.current) {
    jimClientRef.current = new HotsockClient(wssUrl, {
      connectTokenFn: jimConnectTokenFn,
      logLevel: "debug",
    })
  }

  if (!pamClientRef.current) {
    pamClientRef.current = new HotsockClient(wssUrl, {
      connectTokenFn: pamConnectTokenFn,
      logLevel: "debug",
    })
  }

  useEffect(() => {
    connectTokenFn().then((data) => {
      setChannelName(data.channel)
    })

    return () => {
      jimClientRef.current.terminate()
      pamClientRef.current.terminate()
    }
  }, [])

  return (
    <section className="grid grid-cols-2 gap-4 w-full h-screen p-4">
      <Box hotsockClient={jimClientRef.current} channelName={channelName} />
      <Box hotsockClient={pamClientRef.current} channelName={channelName} />
    </section>
  )
}

function Box({ hotsockClient, channelName }) {
  const [name, setName] = useState(null)
  const [isTyping, setIsTyping] = useState("")
  const [messages, setMessages] = useState([])
  const isTypingTimeout = useRef(null)
  const wasCalled = useRef(false)
  const channel = useRef({})
  const lastSentTime = useRef(0)
  const messagesBoxRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (!channelName || wasCalled.current) return
    wasCalled.current = true

    channel.current = hotsockClient.channels(channelName)
    channel.current.bind("hotsock.subscribed", () => {
      setName(channel.current.uid)
    })
    channel.current.bind("chat", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: message.meta.uid, content: message.data },
      ])
      setIsTyping("")
      scrollToBottom()
    })
    channel.current.bind("is-typing", (message) => {
      setIsTyping(`${message.meta.uid} is typing...`)
      if (isTypingTimeout.current) clearTimeout(isTypingTimeout.current)
      isTypingTimeout.current = setTimeout(() => {
        setIsTyping("")
      }, 2000)
    })
  }, [channelName])

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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const isSelf = (sender) => sender === name

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

      <main
        className="flex-1 overflow-y-auto flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-900"
        ref={messagesBoxRef}
      >
        <div className="flex-grow" />
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
            Start the conversation by typing a message below...
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${isSelf(message.sender) ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 text-sm ${
                isSelf(message.sender)
                  ? "bg-pink-500 text-white rounded-2xl rounded-br-md"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-700"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
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

export default App
