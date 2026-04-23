import React from "react"
import Link from "@docusaurus/Link"
import Wrapper from "../global/Wrapper"
import Arrow from "../../icons/arrow"

const USE_CASES = [
  {
    label: "Chat",
    title: "Real-time chat & messaging",
    description:
      "Threaded conversations, typing indicators, read receipts, and online status. Presence channels do the heavy lifting.",
    href: "/examples/real-time-chat/",
    features: ["Presence channels", "Typing indicators", "Per-user metadata"],
  },
  {
    label: "Dashboards",
    title: "Live dashboards & telemetry",
    description:
      "Push metrics, logs, and KPIs from your backend to every connected browser with a single publish call.",
    href: "/examples/live-dashboard/",
    features: [
      "Server-published updates",
      "Billions of messages",
      "Auto fan-out",
    ],
  },
  {
    label: "Collaboration",
    title: "Collaborative editing",
    description:
      "Shared to-do lists, documents, boards, and cursors. Message history and channel storage keep every client in sync.",
    href: "/examples/collaborative-todo/",
    features: ["Message storage", "Channel storage", "History on reconnect"],
  },
  {
    label: "Notifications",
    title: "Notification feeds",
    description:
      "Deliver notifications to a user the instant they land. Users receive them even on pages they haven't explicitly subscribed to.",
    href: "/examples/notification-feed/",
    features: ["Auto-subscribe", "Channel aliases", "Broadcast messaging"],
  },
]

function UseCases() {
  return (
    <div className="w-full py-16 lg:py-24">
      <Wrapper>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Built for the apps you actually build
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
            From first message to production scale
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Each of the patterns below ships as a live, interactive demo. Open
            the source, copy the JWT claim, and drop it into your app.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map((uc) => (
            <Link
              key={uc.title}
              to={uc.href}
              className="group flex flex-col rounded-2xl border border-solid border-gray-200 dark:border-slate-700 bg-gradient-to-br from-white to-pink-50/30 dark:from-slate-900/60 dark:to-slate-900/20 p-7 no-underline hover:no-underline hover:border-primary/60 hover:shadow-lg transition-all"
            >
              <span className="self-start text-[11px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
                {uc.label}
              </span>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {uc.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-grow">
                {uc.description}
              </p>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 m-0 mb-2">
                  Features used
                </p>
                <div className="flex flex-wrap gap-2">
                  {uc.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-md px-2 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <span>Try the live demo</span>
                <Arrow className="fill-current w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default UseCases
