import styles from "./app.module.css"
import { createRoot } from "react-dom/client"
// import SendIcon from "./assets/send.svg";
import { HotsockClient } from "@hotsock/hotsock-js"
import { useEffect, useRef, useState } from "react"

const wssUrl = "wss://975x5pgn0h.execute-api.us-east-1.amazonaws.com/v1"
const channelName = window.crypto.randomUUID()

const createConnectTokenFn = (uid) => {
  return async () => {
    const body = {
      ttl: 10,
      claims: {
        scope: "connect",
        keepAlive: true,
        uid,
        channels: {
          ["presence." + channelName]: {
            subscribe: true,
            messages: {
              chat: {
                publish: true,
                echo: true,
              },
              "is-typing": {
                publish: true,
              },
            },
          },
        },
      },
    }
    const resp = await fetch(
      "https://b3wey6obkxzce42z6vmpzhsyqa0iajpg.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    const data = await resp.json()
    return data.token
  }
}

function App() {
  const jimClient = new HotsockClient(wssUrl, {
    connectTokenFn: createConnectTokenFn("Jim"),
    logLevel: "debug",
  })
  const pamClient = new HotsockClient(wssUrl, {
    connectTokenFn: createConnectTokenFn("Pam"),
    logLevel: "debug",
  })
  return (
    <section className={styles.container}>
      <Box
        hotsockClient={jimClient}
        isRecieving={true}
        isOnline={false}
      />
      <Box
        hotsockClient={pamClient}
        isOnline={true}
        isRecieving={false}
      />
    </section>
  )
}

function Box({ hotsockClient, isOnline }) {
  const [name, setName] = useState(null)
  const [isTyping, setIsTyping] = useState("")
  const [messages, setMessages] = useState([])
  const isTypingTimeout = useRef(null)
  const wasCalled = useRef(false)
  const channel = useRef({})
  const lastSentTime = useRef(0)

  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    channel.current = hotsockClient.channels("presence." + channelName)
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
  }, [])

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
          className={`${styles["box-header-status"]} ${
            name && styles.online
          }`}
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
