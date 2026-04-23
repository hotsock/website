import React from "react"
import Wrapper from "../global/Wrapper"
import Link from "@docusaurus/Link"
import { buttonVariants } from "../../lib/utils"
import Arrow from "../../icons/arrow"
import Chart from "../../icons/chart"
import Certificate from "../../icons/certificate"

function Hero() {
  return (
    <div className="hero-bg relative w-full py-12 lg:py-20 flex text-center flex-col items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="w-[60rem] h-[60rem] -translate-y-1/3 rounded-full bg-primary/10 dark:bg-primary/10 blur-3xl" />
      </div>
      <Wrapper>
        <div className="relative lg:w-10/12 mx-auto">
          <Link
            to="/blog/channel-storage-and-umd-updates"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary no-underline hover:bg-primary/10 hover:no-underline mb-6"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now available · v1.12 channel storage &amp; live user metadata
            <Arrow className="fill-current w-3 h-3" />
          </Link>
          <h1 className="lg:text-6xl text-4xl font-bold !leading-[1.1] lg:!leading-[1.1] tracking-tight mb-6">
            Real-time WebSockets,{" "}
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              fully private
            </span>
            , infinitely scalable, installed in minutes.
          </h1>
          <p className="text-lg lg:text-xl !leading-[1.7] lg:!leading-[1.7] max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Hotsock is a production-ready WebSocket messaging service that runs
            entirely <strong>in your AWS account</strong>. Ship chat, presence,
            live dashboards, notifications, and collaboration without managing
            servers, paying per-connection, or handing your data to a third
            party.
          </p>
          <div className="flex flex-col lg:flex-row mt-8 max-lg:space-y-4 lg:space-x-4 w-full items-center justify-center">
            <Link
              className={`flex max-lg:w-full flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                },
              )}`}
              href="/docs/installation/initial-setup/"
            >
              <span className="mr-3 group-hover:mr-5 ease-in-out transition-all duration-200">
                Launch your free installation
              </span>
              <Arrow className="fill-current " />
            </Link>
            <Link
              className={` max-lg:w-full flex flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                  variant: "link",
                },
              )}`}
              href="/examples/real-time-chat/"
            >
              <span className="mr-3">See a live demo</span>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center max-lg:space-y-2 lg:gap-x-6 mt-8 text-gray-600 dark:text-gray-400 text-sm">
            <p className="max-lg:m-0 flex flex-row items-center space-x-2">
              <Chart />
              <span>Scales to millions of connections</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <Certificate />
              <span>Available in 22 AWS regions</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <span className="text-primary">✓</span>
              <span>1M messages/month, free forever</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <span className="text-primary">✓</span>
              <span>No per-connection fees</span>
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Hero
