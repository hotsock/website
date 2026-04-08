import { HotsockClient } from "@hotsock/hotsock-js"
import { useEffect, useRef, useState } from "react"

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
    "https://ehyijpehufsgcpikp3pdjiznqe0gulim.lambda-url.us-east-1.on.aws/live-dashboard",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
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

const tokenFn = async () => {
  const data = await connectTokenFn()
  return data.token
}

// Icons as simple SVG components
function PersonIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}

function ActivityIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h3l3-9 4 18 3-9h5"
      />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  )
}

function LatencyIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

function TrendArrow({ current, previous }) {
  if (previous === null || previous === undefined || current === previous) {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
        &ndash;
      </span>
    )
  }
  if (current > previous) {
    return <span className="text-xs text-green-500 ml-1">&#9650;</span>
  }
  return <span className="text-xs text-red-500 ml-1">&#9660;</span>
}

function StatCard({ label, value, icon, color, previous }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      </div>
      <div className="flex items-baseline">
        <span
          className={`text-2xl font-bold transition-colors duration-300 ${color || "text-gray-900 dark:text-gray-100"}`}
          style={{ transition: "color 0.3s ease" }}
        >
          {value}
        </span>
        <TrendArrow
          current={typeof value === "string" ? parseFloat(value) : value}
          previous={previous}
        />
      </div>
    </div>
  )
}

function BarChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.requests), 1)
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        Requests (last 20)
      </div>
      <div className="flex items-end gap-[2px] h-20">
        {data.map((d, i) => {
          const pct = (d.requests / maxVal) * 100
          return (
            <div
              key={i}
              className="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t transition-all duration-300"
              style={{ height: `${pct}%`, minHeight: "2px" }}
              title={`${d.requests} req`}
            />
          )
        })}
      </div>
    </div>
  )
}

function AlertFeed({ alerts }) {
  const levelStyles = {
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    error: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        Alerts
      </div>
      <div className="space-y-1.5 max-h-32 overflow-y-auto">
        {alerts.length === 0 && (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            No alerts yet
          </div>
        )}
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span
              className={`px-1.5 py-0.5 rounded font-medium shrink-0 ${levelStyles[alert.level] || levelStyles.info}`}
            >
              {alert.level}
            </span>
            <span className="text-gray-700 dark:text-gray-300 flex-1">
              {alert.message}
            </span>
            <span className="text-gray-400 dark:text-gray-500 shrink-0">
              {alert.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [connected, setConnected] = useState(false)
  const [stats, setStats] = useState({
    activeUsers: 0,
    requestsPerSec: 0,
    errorRate: 0,
    avgLatency: 0,
  })
  const [prevStats, setPrevStats] = useState({
    activeUsers: null,
    requestsPerSec: null,
    errorRate: null,
    avgLatency: null,
  })
  const [chartData, setChartData] = useState([])
  const [alerts, setAlerts] = useState([])
  const clientRef = useRef(null)
  const wasCalled = useRef(false)

  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    clientRef.current = new HotsockClient(wssUrl, {
      connectTokenFn: tokenFn,
    })

    clientRef.current.bind("@@connect", () => setConnected(true))
    clientRef.current.bind("@@disconnect", () => setConnected(false))

    connectTokenFn().then((data) => {
      const channel = clientRef.current.channels(data.channel)

      channel.bind("stats-update", (message) => {
        setStats((prev) => {
          setPrevStats({
            activeUsers: prev.activeUsers,
            requestsPerSec: prev.requestsPerSec,
            errorRate: prev.errorRate,
            avgLatency: prev.avgLatency,
          })
          return {
            activeUsers: message.data.activeUsers,
            requestsPerSec: message.data.requestsPerSec,
            errorRate: message.data.errorRate,
            avgLatency: message.data.avgLatency,
          }
        })
      })

      channel.bind("chart-data", (message) => {
        setChartData((prev) => {
          const next = [
            ...prev,
            {
              timestamp: message.data.timestamp,
              requests: message.data.requests,
              errors: message.data.errors,
            },
          ]
          return next.slice(-20)
        })
      })

      channel.bind("alert", (message) => {
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        setAlerts((prev) => {
          const next = [
            ...prev,
            { level: message.data.level, message: message.data.message, time },
          ]
          return next.slice(-5)
        })
      })
    })

    return () => {
      if (clientRef.current) {
        clientRef.current.terminate()
      }
    }
  }, [])

  const errorRateColor =
    stats.errorRate > 0.05
      ? "text-red-500"
      : "text-green-600 dark:text-green-400"

  const latencyColor =
    stats.avgLatency > 100
      ? "text-amber-500"
      : "text-green-600 dark:text-green-400"

  return (
    <div className="max-w-lg mx-auto p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {connected && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              connected ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </span>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Live Dashboard
        </h1>
      </div>

      {/* Stat Cards 2x2 */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Active Users"
          value={stats.activeUsers.toLocaleString()}
          icon={<PersonIcon />}
          previous={prevStats.activeUsers}
        />
        <StatCard
          label="Requests/sec"
          value={stats.requestsPerSec.toLocaleString()}
          icon={<ActivityIcon />}
          previous={prevStats.requestsPerSec}
        />
        <StatCard
          label="Error Rate"
          value={`${(stats.errorRate * 100).toFixed(1)}%`}
          icon={<ErrorIcon />}
          color={errorRateColor}
          previous={
            prevStats.errorRate !== null ? prevStats.errorRate * 100 : null
          }
        />
        <StatCard
          label="Avg Latency"
          value={`${stats.avgLatency}ms`}
          icon={<LatencyIcon />}
          color={latencyColor}
          previous={prevStats.avgLatency}
        />
      </div>

      {/* Bar Chart */}
      <BarChart data={chartData} />

      {/* Alert Feed */}
      <AlertFeed alerts={alerts} />
    </div>
  )
}

export default App
