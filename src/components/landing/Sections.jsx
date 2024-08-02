import React from "react";
import Wrapper from "../global/Wrapper";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";
import TabsSection from "./TabsSection";

function Sections() {
  return (
    <Wrapper>
      <div className="w-full ">
        <h1 className="text-3xl">1. Install</h1>
        <p className="text-base lg:text-xl">
          Install in just 2 AWS CLI commands.
        </p>
        <div className="bg-accent/30  pt-4 px-4 rounded-xl">
          <MDXContent>
            <CodeBlock tab={0} />
          </MDXContent>
        </div>
      </div>
      <div className="w-full mt-6">
        <h1 className="text-3xl">2. Publish</h1>
        <p className="text-base lg:text-xl">
          Publish messages from your backend in any language with the AWS SDK
          you already use.
        </p>
        <TabsSection />
      </div>
      <div className="w-full mt-6 ">
        <h1 className="text-3xl">3. Subscribe</h1>
        <p className="text-base lg:text-xl">
          Connect and subscribe to messages using the Hotsock JS library or
          using any WebSockets client.
        </p>
        <div className="bg-accent/30  pt-4 px-4 rounded-xl">
          <MDXContent>
            <CodeBlock tab={2} />
          </MDXContent>
        </div>
      </div>
    </Wrapper>
  );
}

export default Sections;
