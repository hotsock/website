import { HotsockClient } from "@hotsock/hotsock-js"
import { useEffect, useRef, useState, useCallback } from "react"

const wssUrl = "wss://975x5pgn0h.execute-api.us-east-1.amazonaws.com/v1"

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
    "https://ehyijpehufsgcpikp3pdjiznqe0gulim.lambda-url.us-east-1.on.aws/notification-feed",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }
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

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date) / 1000)
  if (seconds < 10) return "just now"
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

function UserPlusIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  )
}

function CheckCircleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function AlertTriangleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function BellIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

const iconMap = {
  "user-plus": UserPlusIcon,
  "check-circle": CheckCircleIcon,
  "alert-triangle": AlertTriangleIcon,
}

const iconColorMap = {
  info: "text-blue-500 bg-blue-100 dark:bg-blue-900/40",
  success: "text-green-500 bg-green-100 dark:bg-green-900/40",
  warning: "text-amber-500 bg-amber-100 dark:bg-amber-900/40",
}

function NotificationIcon({ event, icon }) {
  const IconComponent = iconMap[icon] || CheckCircleIcon
  const colorClass = iconColorMap[event] || iconColorMap.info
  return (
    <div
      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${colorClass}`}
    >
      <IconComponent className="w-4.5 h-4.5" />
    </div>
  )
}

function App() {
  const [notifications, setNotifications] = useState([])
  const [deploys, setDeploys] = useState(["v2.4.1", "v2.4.0", "v2.3.9"])
  const [panelOpen, setPanelOpen] = useState(false)
  const [bounce, setBounce] = useState(false)
  const clientRef = useRef(null)
  const channelRef = useRef(null)
  const setupDone = useRef(false)
  const [, setTick] = useState(0)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Update relative timestamps every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (setupDone.current) return
    setupDone.current = true

    const tokenFn = async () => {
      const data = await connectTokenFn()
      return data.token
    }

    clientRef.current = new HotsockClient(wssUrl, {
      connectTokenFn: tokenFn,
      logLevel: "debug",
    })

    const channel = clientRef.current.channels("notifications")
    channelRef.current = channel

    channel.bind("hotsock.subscribed", () => {
      // autoSubscribe fires this automatically
    })

    channel.bind("notification", (message) => {
      const { type, title, body, icon } = message.data
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          event: type || "info",
          title,
          body,
          icon,
          timestamp: new Date(),
          read: false,
        },
        ...prev,
      ])
      setBounce(true)
      setTimeout(() => setBounce(false), 600)

      // Extract version from deploy notifications and add to the deploys list
      if (title === "Deploy complete") {
        const match = body.match(/v[\d.]+/)
        if (match) {
          setDeploys((prev) => [match[0], ...prev])
        }
      }
    })

    return () => {
      clientRef.current?.terminate()
    }
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const markOneRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  return (
    <div className="relative h-screen flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-4 h-12 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shrink-0">
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          My App
        </span>
        <button
          onClick={() => setPanelOpen((o) => !o)}
          className="relative p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle notifications"
        >
          <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span
              className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1 ${bounce ? "animate-bounce" : ""}`}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </header>

      {/* Overlay when panel is open */}
      {panelOpen && (
        <div
          className="absolute inset-0 z-10 bg-black/20 dark:bg-black/40 transition-opacity"
          style={{ top: 48 }}
          onClick={() => setPanelOpen(false)}
        />
      )}

      {/* Notification Panel */}
      <div
        className={`absolute z-20 top-12 right-2 w-80 max-h-[calc(100vh-60px)] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-200 origin-top-right ${
          panelOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Notifications
          </span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markOneRead(n.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border-b border-gray-50 dark:border-slate-700/50 ${
                  !n.read
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
              >
                <NotificationIcon event={n.event} icon={n.icon} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                      {n.title}
                    </span>
                    {!n.read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                    {n.body}
                  </p>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 block">
                    {timeAgo(n.timestamp)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto p-4 transition-opacity ${panelOpen ? "opacity-50" : "opacity-100"}`}
      >
        <div className="max-w-md mx-auto space-y-4">
          {/* Welcome Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Welcome back, Sarah
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Here&apos;s what&apos;s happening with your projects today.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                Followers
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                2,847
              </p>
              <p className="text-xs text-green-500 mt-1">+12% this week</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                API Calls
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                18.2k
              </p>
              <p className="text-xs text-amber-500 mt-1">90% of quota</p>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Recent Deploys
            </h3>
            <div className="space-y-2">
              {deploys.map((v) => (
                <div
                  key={v}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {v}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    production
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
