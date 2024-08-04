import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "@docusaurus/Link";
import Arrow from "../../icons/arrow";
import { buttonVariants } from "../../lib/utils";

const FEATURES = [
  {
    title: "Fully private",
    src: "/img/undraw_docusaurus_react.svg",
    description: (
      <>
        No one wants to learn their data was used for AI training or part of a
        multi-tenant breach. All services are run privately in <em>your</em> AWS
        account. Your data always remains yours, only accessible by you.
      </>
    ),
  },
  {
    title: "Unlimited Everything",
    src: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Design and incorporate real-time messaging the way that makes the most
        sense for your applications with unlimited connections, channels, and
        messages.
      </>
    ),
  },
  {
    title: "Serverless",
    src: "/img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Powered by on-demand services such as API Gateway, DynamoDB, Lambda,
        EventBridge, and SQS. It scales to zero when you're not using it or can
        handle millions of connections and billions of messages for high-volume
        production workloads.
      </>
    ),
  },
];

function Features() {
  return (
    <Wrapper>
      <section className="flex mt-12 flex-col py-6 items-center">
        <div className="text-center">
          <h1 className="text-3xl m-0  text-center lg:text-4xl">Features</h1>
          <p className="mt-4 text-xl mb-8 ">What makes us different</p>
        </div>
        <main className="grid gap-4 lg:gap-6  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="w-full justify-between flex flex-col bg-pink-100/60 dark:bg-slate-800 rounded-xl p-4"
            >
              <div>
                {/* image */}
                <div className="bg-slate-50/40 p-4 rounded-xl">
                  <img
                    className="aspect-video"
                    src={feature.src}
                    alt={feature.title}
                  />
                </div>
                <div className="mt-4 flex flex-col ">
                  <h2 className="text-xl">{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-end   ">
                <Link
                  className={` max-lg:w-full flex flex-row items-center group ${buttonVariants(
                    {
                      size: "sm",
                      variant: "link",
                    }
                  )}`}
                  href="/"
                >
                  <span
                    className="mr-3  group-hover:mr-5
              ease-in-out transition-all duration-200
              "
                  >
                    Learn more
                  </span>{" "}
                  <Arrow className="fill-current mt-1 " />
                </Link>
              </div>
            </div>
          ))}
        </main>
      </section>
    </Wrapper>
  );
}

export default Features;
