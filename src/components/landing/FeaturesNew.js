import * as React from "react"
import { motion, useAnimation } from "framer-motion"
import clsx from "clsx"
import Wrapper from "../global/Wrapper"
import Link from "@docusaurus/Link"
// import { useInView } from "react-intersection-observer";

const FEATURES = [
  {
    title: "Privacy is the default",
    imageUrl: "/img/private.png",
    description: (
      <>
        No one wants to learn their data was used for AI training or caught in a
        multi-tenant breach. Every byte flows through services that run
        privately in <em>your</em> AWS account. Your data{" "}
        <strong className="text-primary">always remains yours</strong>, and is{" "}
        <strong className="text-primary">only accessible by you</strong>.
      </>
    ),
    target: "/docs/installation/security/",
  },
  {
    title: "Presence, out of the box",
    imageUrl: "/img/chat.png",
    description: (
      <>
        Know <strong className="text-primary">who</strong> is online,{" "}
        <strong className="text-primary">where</strong>, and on{" "}
        <strong className="text-primary">what device</strong>. You never have to
        build a presence service yourself. Per-member metadata can be updated
        live, and every member gets an event when someone joins, leaves, or
        changes state.
      </>
    ),
    target: "/docs/channels/presence/",
  },
  {
    title: "Persistent channel storage",
    imageUrl: "/img/unlimited.png",
    description: (
      <>
        Channels can now carry{" "}
        <strong className="text-primary">persistent key-value state</strong>{" "}
        that every subscriber reads on join. Keep configuration, room settings,
        feature flags, shared cursors, or game state on the channel and stop
        round-tripping to your backend. Each key has its own TTL and permission
        scope.
      </>
    ),
    target: "/docs/channels/storage/",
  },
  {
    title: "Your domain, your branding",
    imageUrl: "/img/domains.png",
    description: (
      <>
        Host WebSocket connections on your own domain. Your customers never see
        a third-party host, your TLS certificate is managed by ACM, and
        switching providers later is a DNS change away.
      </>
    ),
    target: "/docs/installation/custom-domains/",
  },
  {
    title: "Web console for everything",
    imageUrl: "/img/console.png",
    description: (
      <>
        A built-in console for JWTs, connections, subscriptions, channel
        storage, and publishing. It ships with JSON syntax highlighting, mobile
        support, and message filtering. Debugging a real-time bug should not
        require building your own test harness.
      </>
    ),
    target: "/docs/server-api/web-console",
  },
  {
    title: "Serverless to the core",
    imageUrl: "/img/serverless.png",
    description: (
      <>
        Built on <strong className="text-primary">API Gateway</strong>,{" "}
        <strong className="text-primary">DynamoDB</strong>,{" "}
        <strong className="text-primary">Lambda</strong>,{" "}
        <strong className="text-primary">EventBridge</strong>,{" "}
        <strong className="text-primary">SNS</strong>, and{" "}
        <strong className="text-primary">SQS</strong>. Scales to zero while
        idle, fans out to millions of connections and billions of messages under
        production load, and costs only what AWS charges you.
      </>
    ),
    target: "/docs/installation/initial-setup/#aws-services",
  },
]

function NewFeatures() {
  return (
    <Wrapper>
      <div className="space-y-8 my-12">
        <div className="text-center max-w-3xl mx-auto py-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            A closer look
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight m-0">
            The details that matter in production
          </h2>
        </div>
        {FEATURES.map((feature, idx) => (
          <FeatureAnimation key={idx} idx={idx} feature={feature} />
        ))}
      </div>
    </Wrapper>
  )
}

function FeatureAnimation({ idx, feature }) {
  return (
    <motion.div
      className={clsx(
        "flex  items-center space-x-0 md:space-x-8",
        idx % 2 !== 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse",
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
  )
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
      <motion.div
        className="text-primary underline underline-offset-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.1 + 0.7 }}
      >
        <Link to={target}>Learn More</Link>
      </motion.div>
    </motion.div>
  )
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
  )
}

export default NewFeatures
