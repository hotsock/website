import React from "react";
import Wrapper from "../global/Wrapper";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";
import TabsSection from "./TabsSection";

function Sections() {
  return (
    <Wrapper>
      <div className="w-full lg:grid lg:gap-3 lg:grid-cols-12 ">
        <div className="lg:col-span-4">
          <h1 className="text-3xl">1. Install</h1>
          <p className="text-base lg:text-xl">
            Install in just 2 AWS CLI commands.
          </p>
        </div>
        <div className="bg-accent/30 lg:col-span-8  pt-4 px-4 rounded-xl">
          <MDXContent>
            <CodeBlock tab={0} />
          </MDXContent>
        </div>
      </div>
      <div className="w-full mt-6 lg:mt-12 lg:grid  lg:gap-12 lg:grid-cols-12 ">
        <div className="lg:col-span-5 lg:col-start-8">
          <h1 className="text-3xl">2. Publish</h1>
          <p className="text-base lg:text-xl">
            Publish messages from your backend in any language with the AWS SDK
            you already use.
          </p>
        </div>
        <div className="w-full lg:col-start-1 lg:row-start-1 lg:col-span-7">
          <TabsSection />
        </div>
      </div>
      <div className="w-full lg:grid mt-6 lg:mt-12 lg:gap-3 lg:grid-cols-12 ">
        <div className="lg:col-span-4">
          <h1 className="text-3xl">3. Subscribe</h1>
          <p className="text-base lg:text-xl">
            Connect and subscribe to messages using the Hotsock JS library or
            using any WebSockets client.
          </p>
        </div>
        <div className="bg-accent/30 lg:col-span-8  pt-4 px-4 rounded-xl">
          <MDXContent>
            <CodeBlock tab={2} />
          </MDXContent>
        </div>
      </div>
    </Wrapper>
  );
}

export default Sections;
