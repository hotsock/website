import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageBanner from "@site/src/components/HomepageBanner";
import Hero from "../components/landing/Hero";
import Sections from "../components/landing/Sections";
import Testimonials from "../components/landing/Testimonials";
import FeaturesNew from "../components/landing/FeaturesNew";
import PricingTable from "../components/landing/Pricing";

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
        <FeaturesNew />
        {/* testimonials */}
        <Testimonials />
        <PricingTable />
      </Layout>
    </>
  );
}
