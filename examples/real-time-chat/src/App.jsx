import styles from "./app.module.css"
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

  useEffect(() => {
    connectTokenFn().then((data) => {
      setChannelName(data.channel)
    })
  }, [])

  const jimClient = new HotsockClient(wssUrl, {
    connectTokenFn: jimConnectTokenFn,
    logLevel: "debug",
  })
  const pamClient = new HotsockClient(wssUrl, {
    connectTokenFn: pamConnectTokenFn,
    logLevel: "debug",
  })
  return (
    <section className={styles.container}>
      <Box hotsockClient={jimClient} channelName={channelName} />
      <Box hotsockClient={pamClient} channelName={channelName} />
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
    })
    channel.current.bind("is-typing", (message) => {
      setIsTyping(`${message.meta.uid} is typing...`)
      if (isTypingTimeout.current) clearTimeout(isTypingTimeout.current)
      isTypingTimeout.current = setTimeout(() => {
        setIsTyping("")
      }, 2000)
    })
  }, [channelName])

  const handleTyping = () => {
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

  return (
    <div className={styles.box}>
      <header className={styles["box-header"]}>
        <span className={styles["box-header-title"]}>{name}</span>
        <span
          className={`${styles["box-header-status"]} ${name && styles.online}`}
        />
      </header>
      <main className={styles["box-main"]}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={` ${styles["box-message-container"]} ${
              message.sender === name && styles.left
            }`}
          >
            <span
              className={`${styles["box-message-content"]} ${
                message.sender === name ? styles.right : styles.left
              }`}
            >
              {message.sender}: {message.content}
            </span>
          </div>
        ))}
        {isTyping !== "" && (
          <span className={styles["box-typing"]}>{isTyping}</span>
        )}
      </main>
      <footer className={styles["box-footer"]}>
        <input
          type="text"
          placeholder="Type..."
          onKeyUp={handleTyping}
          onKeyDown={handleSendMessage}
        />
      </footer>
      {/* <img src={SendIcon} alt="" className="bg-red-400 " /> */}
    </div>
  )
}

export default App

export function renderToDom(container) {
  const root = createRoot(container)

  root.render(<App />)
}
