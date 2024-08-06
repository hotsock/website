import React from "react";
import Wrapper from "../global/Wrapper";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";
import TabsSection from "./TabsSection";
import Install from "../../icons/install";
import Publish from "../../icons/publish";
import Subscribe from "../../icons/subscribe";
import Link from "@docusaurus/Link";

function Sections() {
  return (
    <div className="w-full py-12 bg-[#FDF6FA] dark:bg-slate-800">
      <Wrapper>
        <div className="w-full lg:grid lg:gap-3 lg:grid-cols-12 ">
          <div className="lg:col-span-4">
            <h1 className="text-3xl flex flex-row items-center">
              1. Install
              <Install className="w-10 h-10 ml-3 " />
            </h1>
            <p className="text-base lg:text-xl">
              Install in just 2 AWS CLI commands from AWS CloudShell.
            </p>
            <Link to={"/docs/installation/initial-setup/"}>
              View full installation docs
            </Link>
          </div>
          <div className="bg-[#FEE5EC] max-lg:mt-5 dark:bg-accent/30 lg:col-span-8  pt-4 px-4 rounded-xl">
            <MDXContent>
              <CodeBlock tab={0} />
            </MDXContent>
          </div>
        </div>
        <div className="w-full lg:grid mt-6 lg:mt-12 lg:gap-3 lg:grid-cols-12 ">
          <div className="lg:col-span-4">
            <h1 className="text-3xl items-center flex flex-row">
              2. Publish
              <Publish className="w-11 h-11 ml-3 " />
            </h1>
            <p className="text-base lg:text-xl">
              Publish messages from your backend in any language with the AWS
              SDK you already use.
            </p>
            <Link to={"/docs/server-api/publish-messages/"}>
              View publish docs
            </Link>
          </div>
          <div className="w-full  max-lg:mt-5  lg:col-span-8">
            <TabsSection />
          </div>
        </div>
        <div className="w-full lg:grid mt-6 lg:mt-12 lg:gap-3 lg:grid-cols-12 ">
          <div className="lg:col-span-4">
            <h1 className="text-3xl flex flex-row items-center">
              3. Subscribe
              <Subscribe className="w-9 h-9 ml-3 " />
            </h1>
            <p className="text-base lg:text-xl">
              Connect and subscribe to messages using the{" "}
              <Link to={"https://github.com/hotsock/hotsock-js"}>
                Hotsock JS
              </Link>{" "}
              library or using any WebSockets client.
            </p>
            <Link to={"/docs/connections/connect-and-subscribe/"}>
              View connect and subscribe docs
            </Link>
          </div>
          <div className="bg-[#FEE5EC]  max-lg:mt-5  dark:bg-accent/30  lg:col-span-8  pt-4 px-4 rounded-xl">
            <MDXContent>
              <CodeBlock tab={2} />
            </MDXContent>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default Sections;
