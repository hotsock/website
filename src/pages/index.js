import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageBanner from "@site/src/components/HomepageBanner"
import Hero from "../components/landing/Hero"
import Sections from "../components/landing/Sections"
// import Testimonials from "../components/landing/Testimonials"
import FeaturesNew from "../components/landing/FeaturesNew"
// import TrustStats from "../components/landing/TrustStats"
import PricingTable from "../components/landing/Pricing"
// import { OrganizationSchema, ProductSchema } from "../components/StructuredData"

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      {/* <OrganizationSchema /> */}
      {/* <ProductSchema /> */}
      <HomepageBanner />
      <Layout
        title="Private, self-hosted, and fully managed real-time messaging service"
        description="Hotsock is a real-time WebSockets service for your web and mobile applications, fully-managed and self-hosted in your AWS account."
      >
        <Hero />
        <Sections />
        <FeaturesNew />
        {/* <TrustStats /> */}
        {/* <Testimonials /> */}
        <PricingTable />
      </Layout>
    </>
  )
}
