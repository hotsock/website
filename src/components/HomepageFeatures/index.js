import styles from "./styles.module.css"

const features = [
  {
    title: "Serverless",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Powered by on-demand services such as API Gateway, DynamoDB, Lambda,
        EventBridge, and SQS. It scales to zero when you're not using it or can
        handle millions of connections and billions of messages for high-volume
        production workloads.
      </>
    ),
  },
  {
    title: "Unlimited Everything",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Design and incorporate real-time messaging the way that makes the most
        sense for your applications with unlimited connections, channels, and
        messages.
      </>
    ),
  },
  {
    title: "Fully private",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        No one wants to learn their data was used for AI training or part of a
        multi-tenant breach. All services are run privately in <em>your</em> AWS
        account. Your data always remains yours, only accessible by you.
      </>
    ),
  },
]

export default function HomepageFeatures() {
  return (
    <section className="py-12 mt-16 bg-zinc-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-fuchsia-700">Features</h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-16">
          {features.map(({ title, description, img, Svg }) => (
            <div key={title}>
              <dt>
                <div className="">
                  <Svg className={styles.featureSvg} role="img" />
                  <img src={img} alt="" />
                </div>
                <p className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-600">
                  {title}
                </p>
              </dt>
              <dd className="mt-4 ml-0 text-base text-gray-500">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
