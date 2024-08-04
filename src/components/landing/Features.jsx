import React from "react";
import Wrapper from "../global/Wrapper";

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
      <section className="flex mt-6 flex-col py-6 items-center">
        <h1 className="text-3xl  lg:text-4xl">Features</h1>
        <main className="grid gap-4 lg:gap-6 mt-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="w-full bg-pink-100/60 dark:bg-slate-800 rounded-xl p-4"
            >
              {/* image */}
              <div className="bg-slate-50/40 p-4 rounded-xl">
                <img
                  className="aspect-video"
                  src={feature.src}
                  alt={feature.title}
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </main>
      </section>
    </Wrapper>
  );
}

export default Features;
