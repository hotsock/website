import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageBanner from "@site/src/components/HomepageBanner";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageInstall from "@site/src/components/HomepageInstall";
import HomepagePublish from "@site/src/components/HomepagePublish";
import HomepageSubscribe from "@site/src/components/HomepageSubscribe";

import styles from "./index.module.css";
import Hero from "../components/landing/Hero";
import TabsSection from "../components/landing/TabsSection";
import Sections from "../components/landing/Sections";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";

function HomepageHeroImage({ name }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--image", styles[name])}>
      <div className="container"></div>
    </header>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}></h1>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}></p>
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
  );
}

// export default function Home() {
//   return (
//     <Layout>
//       <main>
//         <div className="container mt-8">
//           <h1>Hotsock launches August 12, 2024, check back then! 🚀</h1>
//         </div>
//       </main>
//     </Layout>
//   )
// }

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <HomepageBanner />
      <Layout
        title={siteConfig.title}
        description="Hotsock is a real-time WebSockets service for your web and mobile applications, fully-managed and self-hosted in your AWS account."
      >
        <Hero />
        <Sections />
        {/* features */}
        <Features />
        {/* testimonials */}
        <Testimonials />
        {/* footer */}
      </Layout>
    </>
  );
}
