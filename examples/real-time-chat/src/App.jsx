import { createRoot } from "react-dom/client"
// import SendIcon from "./assets/send.svg";
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
    <section className="grid grid-cols-2 lg:gap-8 md:gap-6 gap-4 w-full p-6">
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

  return (
    <div className="border-solid border-[2px] border-[#778899] w-full">
      <header className="h-12 flex flex-row items-center justify-between py-2 px-5 border-solid border-[2px] border-[#778899] border-x-0 border-t-0">
        <span className="font-semibold">{name}</span>
        <span
          className={`h-3 w-3 rounded-full  ${
            name ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </header>
      <main
        className="min-h-96 max-h-96 h-96 space-y-4 overflow-y-scroll relative flex flex-col py-4 px-5 dark:bg-slate-900 bg-[#f7f7f7]"
        ref={messagesBoxRef}
      >
        <div className="flex-grow"></div>
        {messages.length === 0 && (
          <div className="text-center text-slate-400">
            Start the conversation by typing a message below...
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`  ${
              message.sender === name ? "text-left" : "text-right"
            }`}
          >
            <span
              className={` py-2 px-3 ${
                message.sender === name
                  ? "bg-[#fbd3e3] dark:bg-[#fbd3e327]"
                  : "bg-[#f294c5] dark:bg-[#f294c527]"
              }`}
            >
              {message.sender}: {message.content}
            </span>
          </div>
        ))}
        <div className="h-6 flex flex-row sticky bottom-0 left-0 w-full items-start">
          {isTyping !== "" && (
            <span className="text-sm text-slate-400 mt-3">{isTyping}</span>
          )}
        </div>
      </main>
      <footer className="h-12 relative">
        <input
          className="w-full h-12 outline-none border border-solid border-slate-400 pr-12 px-5 bg-transparent"
          type="text"
          placeholder="Type..."
          onKeyUp={handleTyping}
          onKeyDown={handleSendMessage}
        />
      </footer>
    </div>
  )
}

export default App

export function renderToDom(container) {
  const root = createRoot(container)

  root.render(<App />)
}
