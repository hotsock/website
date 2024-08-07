import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import Wrapper from "../global/Wrapper";
// import { useInView } from "react-intersection-observer";

const FEATURES = [
  {
    title: "Security on your terms",
    imageUrl: "/img/private.png",
    description: (
      <>
        No one wants to learn their data was used for AI training or part of a
        multi-tenant breach. All services are run privately in <em>your</em> AWS
        account. Your data{" "}
        <strong className="text-primary">always remains yours</strong>,{" "}
        <strong className="text-primary">only accessible by you</strong>.
      </>
    ),
    target: "",
  },
  // {
  //   title: "Unlimited Everything",
  //   imageUrl: "/img/unlimited.png",
  //   description: (
  //     <>
  //       Design and incorporate{" "}
  //       <strong className="text-primary">real-time messaging</strong> the way
  //       that makes the most sense for your applications with{" "}
  //       <strong className="text-primary">unlimited</strong> connections,
  //       channels, and messages.
  //     </>
  //   ),
  //   target: "",
  // },
  {
    title: "Presence Channels",
    imageUrl: "/img/chat.png",
    description: (
      <>
        Track who's online or what devices are currently subscribed to the same
        channel. Great for chat rooms and document collaboration where you need
        awareness of other active participants.
      </>
    ),
    target: "/docs/channels/presence/",
  },
  {
    title: "Custom Domains",
    imageUrl: "/img/domains.png",
    description: (
      <>
        Maintain consistent branding and customer trust by keeping WebSocket
        connections on your own domain name.
      </>
    ),
    target: "/docs/installation/custom-domains/",
  },
  {
    title: "Web Console",
    imageUrl: "/img/console.png",
    description: (
      <>
        Easily debug and test JWT validation, token claims, connections, channel
        subscriptions, and messages.
      </>
    ),
    target: "/docs/server-api/web-console",
  },
  {
    title: "Serverless",
    imageUrl: "/img/serverless.png",
    description: (
      <>
        Powered by on-demand services such as{" "}
        <strong className="text-primary">API Gateway</strong>,{" "}
        <strong className="text-primary">DynamoDB</strong>,{" "}
        <strong className="text-primary">Lambda</strong>,{" "}
        <strong className="text-primary">EventBridge</strong>, and{" "}
        <strong className="text-primary">SQS</strong>. It scales to zero when
        you're not using it or can handle millions of connections and billions
        of messages for high-volume production workloads.
      </>
    ),
    target: "",
  },
];

function NewFeatures() {
  return (
    <Wrapper>
      <div className="space-y-8 my-12">
        <div className="text-center">
          <h1 className="text-3xl m-0 text-center lg:text-4xl">
            Just some of the features...
          </h1>
        </div>
        {FEATURES.map((feature, idx) => (
          <FeatureAnimation key={idx} idx={idx} feature={feature} />
        ))}
      </div>
    </Wrapper>
  );
}

function FeatureAnimation({ idx, feature }) {
  return (
    <motion.div
      className={clsx(
        "flex  items-center space-x-0 md:space-x-8",
        idx % 2 !== 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
      )}
      key={idx}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      <DescriptionSection
        title={feature.title}
        description={feature.description}
        target={feature.target}
        idx={idx}
      />
      <ImageSection src={feature.imageUrl} idx={idx} />
    </motion.div>
  );
}

function DescriptionSection({ title, description, target, idx }) {
  //   const { ref, = useInView();

  return (
    <motion.div
      className="flex py-12 min-h-[400px] flex-1 flex-col items-start justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
    >
      <h1 className="text-3xl">{title}</h1>
      <motion.p
        className="text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
      >
        {description}
      </motion.p>
      <motion.a
        href={target}
        className="text-cusprimary underline underline-offset-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.1 + 0.7 }}
      >
        Learn More
      </motion.a>
    </motion.div>
  );
}

function ImageSection({ src, idx }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <motion.img
        className="w-3/4 object-contain"
        src={src}
        alt={src}
        initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

export default NewFeatures;
