import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageBanner from "@site/src/components/HomepageBanner"
import Hero from "../components/landing/Hero"
import Sections from "../components/landing/Sections"
import Capabilities from "../components/landing/Capabilities"
import FeaturesNew from "../components/landing/FeaturesNew"
import UseCases from "../components/landing/UseCases"
import ReleaseCadence from "../components/landing/ReleaseCadence"
import PricingTable from "../components/landing/Pricing"

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <HomepageBanner />
      <Layout
        title="Private, self-hosted, and fully managed real-time messaging service"
        description="Hotsock is a real-time WebSockets service for your web and mobile applications, fully-managed and self-hosted in your AWS account."
      >
        <Hero />
        <Sections />
        <Capabilities />
        <FeaturesNew />
        <UseCases />
        <ReleaseCadence />
        <PricingTable />
      </Layout>
    </>
  )
}
