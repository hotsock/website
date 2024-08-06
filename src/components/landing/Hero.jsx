import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "@docusaurus/Link";
import { buttonVariants } from "../../lib/utils";
import Arrow from "../../icons/arrow";
import Chart from "../../icons/chart";
import Certificate from "../../icons/certificate";

function Hero() {
  return (
    <div className="hero-bg w-full py-10  lg:py-16 flex text-center flex-col items-center justify-center">
      <Wrapper>
        <div className="lg:w-9/12  mx-auto">
          <h1 className="lg:text-5xl text-3xl !leading-[44px] lg:!leading-[65px] ">
            Fully-private, full-featured WebSockets messaging service in your
            AWS account.
          </h1>
          <p className="text-lg lg:text-xl !leading-[36px] lg:!leading-[40px]">
            Power your real-time web and mobile application experiences{" "}
            <strong>from your own AWS account</strong>. There are no servers to
            manage, no scaling knobs to turn, and it installs in minutes with
            CloudFormation.
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
                className="mr-3  group-hover:mr-5
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
              href="/"
            >
              <span
                className="mr-3
              "
              >
                See a demo
              </span>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center max-lg:space-y-2 lg:space-x-6 mt-6">
            <p className="max-lg:m-0 flex flex-row items-center space-x-2">
              <Chart />
              <span>Automatically scales to your workload</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <Certificate />
              <span>Supported in 22 regions around the world</span>
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default Hero;
