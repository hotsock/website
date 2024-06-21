import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageBanner from "@site/src/components/HomepageBanner"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import HomepageInstall from "@site/src/components/HomepageInstall"
import HomepagePublish from "@site/src/components/HomepagePublish"
import HomepageSubscribe from "@site/src/components/HomepageSubscribe"

import styles from "./index.module.css"

function HomepageHeroImage({ name }) {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--image", styles[name])}>
      <div className="container"></div>
    </header>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          Fully-private, full-featured WebSockets messaging service in your AWS
          account.
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
          Power your real-time web and mobile application experiences{" "}
          <strong>from your own AWS account</strong>. There are no servers to
          manage, no scaling knobs to turn, and it installs in minutes with
          CloudFormation.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/installation/initial-setup"
          >
            Install yourself in less than 20 mins ⏱️
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <Layout>
      <main>
        <div className="container mt-8">
          <h1>Hotsock launches July 8, 2024, check back then! 🚀</h1>
        </div>
      </main>
    </Layout>
  )
}

// export default function Home() {
//   const { siteConfig } = useDocusaurusContext()
//   return (
//     <>
//       <HomepageBanner />
//       <Layout
//         title={siteConfig.title}
//         description="Hotsock is a real-time WebSockets service for your web and mobile applications, fully-managed and self-hosted in your AWS account."
//       >
//         <HomepageHeader />
//         <main>
//           <HomepageInstall />
//           <HomepagePublish />
//           <HomepageSubscribe />
//           <HomepageFeatures />
//         </main>
//       </Layout>
//     </>
//   )
// }
