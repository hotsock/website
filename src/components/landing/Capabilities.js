import React from "react"
import Link from "@docusaurus/Link"
import Wrapper from "../global/Wrapper"

const CAPABILITIES = [
  {
    title: "Private & presence channels",
    description:
      "JWT-gated subscriptions with built-in presence tracking and per-member metadata.",
    href: "/docs/channels/presence/",
    icon: "◉",
  },
  {
    title: "Channel storage",
    description:
      "Persistent per-key state delivered to subscribers on join, with independent TTLs.",
    href: "/docs/channels/storage/",
    icon: "▣",
    badge: "New",
  },
  {
    title: "Live metadata updates",
    description:
      "Change a connection's user metadata on the fly. No reconnecting, no resubscribing.",
    href: "/docs/connections/claims/#umdUpdate",
    icon: "↻",
    badge: "New",
  },
  {
    title: "Auto-subscribe on connect",
    description:
      "Skip the subscribe round-trip. Clients join their channels the moment they connect.",
    href: "/docs/connections/claims/#channels.autoSubscribe",
    icon: "⚡",
  },
  {
    title: "Channel aliases",
    description:
      "Keep internal IDs off the client. Issue a friendly alias in the token and subscribe with it.",
    href: "/docs/connections/claims/#channels.alias",
    icon: "⇄",
  },
  {
    title: "Scheduled messages",
    description:
      "Publish a message now, deliver it later. Backed by EventBridge Scheduler.",
    href: "/docs/server-api/publish-messages/#message-format.scheduleExpression",
    icon: "⏱",
  },
  {
    title: "Message storage & history",
    description:
      "Retain messages per-event and query them by channel and event name, sorted by time.",
    href: "/docs/connections/client-http-api/",
    icon: "▦",
  },
  {
    title: "Broadcast to unsubscribed",
    description:
      "Publish from a client to any channel it has permission for. No subscription required.",
    href: "/docs/connections/claims/#channels.messages.broadcast",
    icon: "⇡",
  },
  {
    title: "Pub/sub to SNS & EventBridge",
    description:
      "Fan connection, message, and storage events out to the rest of your AWS workload.",
    href: "/docs/server-api/events/",
    icon: "☷",
  },
  {
    title: "Regex & wildcard claims",
    description:
      "Grant permission to dynamic channel and event names with wildcard or Go regex patterns.",
    href: "/docs/connections/claims/#channels--regex",
    icon: "⟨⟩",
  },
  {
    title: "Custom domains",
    description:
      "Keep WebSocket connections on your own domain for consistent branding and trust.",
    href: "/docs/installation/custom-domains/",
    icon: "⌂",
  },
  {
    title: "Built-in web console",
    description:
      "Debug JWTs, connections, subscriptions, storage, and publish messages from the browser.",
    href: "/docs/server-api/web-console/",
    icon: "▤",
  },
]

function Capabilities() {
  return (
    <div className="w-full py-16 lg:py-24 border-solid border-t border-b border-x-0 border-gray-100 dark:border-slate-800">
      <Wrapper>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Everything you'd build yourself, already built
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
            Your complete WebSocket platform
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Hotsock includes the primitives real-time apps need: presence,
            storage, scheduling, message history, and event fan-out. You can
            focus on your product instead of reinventing the messaging layer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap) => (
            <Link
              key={cap.title}
              to={cap.href}
              className="group relative block rounded-xl border border-solid border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-5 no-underline hover:no-underline hover:border-primary/60 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                  {cap.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-semibold m-0 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {cap.title}
                    </h3>
                    {cap.badge && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary px-2 py-0.5">
                        {cap.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default Capabilities
