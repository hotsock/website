import React from "react"
import Link from "@docusaurus/Link"
import Wrapper from "../global/Wrapper"
import Arrow from "../../icons/arrow"

const RELEASES = [
  {
    version: "v1.12",
    date: "April 2026",
    title: "Channel storage & live user metadata",
    summary:
      "Persistent per-key state on channels, and live umd updates without reconnecting.",
    href: "/blog/channel-storage-and-umd-updates",
  },
  {
    version: "v1.11",
    date: "March 2026",
    title: "Regex patterns in claims",
    summary:
      "Go regex support for channel and event name claims, with friendlier errors.",
    href: "/docs/installation/changelog/#v1.11.0",
  },
  {
    version: "v1.10",
    date: "March 2026",
    title: "Channel aliases & large-channel fan-out",
    summary:
      "Friendly client-side channel names and automatic fan-out past 250 subscribers.",
    href: "/blog/channel-aliases-and-large-channel-fan-out",
  },
  {
    version: "v1.9",
    date: "February 2026",
    title: "Fresh web console",
    summary:
      "JSON syntax highlighting, mobile-friendly layout, message filtering, 1MB pub/sub.",
    href: "/docs/installation/changelog/#v1.9.0",
  },
  {
    version: "v1.8",
    date: "October 2025",
    title: "Message history & tracing",
    summary:
      "Query stored messages by channel and event, with connection/source metadata attached.",
    href: "/docs/installation/changelog/#v1.8.0",
  },
  {
    version: "v1.7",
    date: "September 2025",
    title: "Auto-subscribe & broadcast",
    summary:
      "Channels subscribed the moment you connect, and publishing to channels you're not on.",
    href: "/blog/auto-subscribe-and-broadcast-messaging",
  },
]

function ReleaseCadence() {
  return (
    <div className="w-full py-16 lg:py-24 bg-[#FDF6FA] dark:bg-slate-800/40">
      <Wrapper>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Shipping every month
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              Active, steady, backwards-compatible
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed m-0">
              Every release is a single CloudFormation update away.
              Installations with auto-update turned on get them for free.
            </p>
          </div>
          <Link
            to="/docs/installation/changelog/"
            className="inline-flex items-center gap-2 text-primary font-medium no-underline hover:no-underline hover:gap-3 transition-all"
          >
            View full changelog
            <Arrow className="fill-current w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELEASES.map((r, idx) => (
            <Link
              key={r.version}
              to={r.href}
              className="group relative flex flex-col rounded-xl bg-white dark:bg-slate-900/60 border border-solid border-gray-200 dark:border-slate-700 p-5 no-underline hover:no-underline hover:border-primary/60 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-primary">
                    {r.version}
                  </span>
                  {idx === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-primary rounded-full px-2 py-0.5">
                      Latest
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {r.date}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white m-0 mb-2 group-hover:text-primary transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed m-0">
                {r.summary}
              </p>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default ReleaseCadence
