import React from "react"
import Wrapper from "../global/Wrapper"
import Link from "@docusaurus/Link"
import { buttonVariants } from "../../lib/utils"
import Arrow from "../../icons/arrow"
import Chart from "../../icons/chart"
import Certificate from "../../icons/certificate"

function Hero() {
  return (
    <div className="hero-bg w-full py-10  lg:py-16 flex text-center flex-col items-center justify-center">
      <Wrapper>
        <div className="lg:w-9/12  mx-auto">
          <h1 className="lg:text-5xl text-3xl !leading-[44px] lg:!leading-[65px] ">
            Add stunning real-time features to your applications without limits
            or privacy trade-offs.
          </h1>
          <p className="text-lg lg:text-xl !leading-[36px] lg:!leading-[40px]">
            Hotsock is a fully-private WebSocket messaging service that runs{" "}
            <strong>in your AWS account</strong>. Add chat, notifications, live
            updates, and presence to your applications with simple APIs—no
            servers to manage, no scaling complexity, and your data stays yours.
            Installs in minutes.
          </p>
          <div className="flex flex-col lg:flex-row  max-lg:space-y-4 lg:space-x-4 w-full items-center justify-center">
            <Link
              className={`flex max-lg:w-full flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                }
              )}`}
              href="/docs/installation/initial-setup/"
            >
              <span
                className="mr-3 group-hover:mr-5
              ease-in-out transition-all duration-200
              "
              >
                Launch your installation
              </span>{" "}
              <Arrow className="fill-current " />
            </Link>
            <Link
              className={` max-lg:w-full flex flex-row items-center group ${buttonVariants(
                {
                  size: "lg",
                  variant: "link",
                }
              )}`}
              href="/examples/real-time-chat/"
            >
              <span
                className="mr-3
              "
              >
                See a demo
              </span>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center max-lg:space-y-2 lg:space-x-6 mt-6 text-gray-600 dark:text-gray-400 text-sm">
            <p className="max-lg:m-0 flex flex-row items-center space-x-2">
              <Chart />
              <span>Automatically scales to your workload</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <Certificate />
              <span>Supported in 22 AWS regions</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <span>✓</span>
              <span>Free forever tier</span>
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Hero
