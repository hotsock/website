import React from "react";
import Wrapper from "../global/Wrapper";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";
import TabsSection from "./TabsSection";
import Install from "../../icons/install";
import Publish from "../../icons/publish";
import Subscribe from "../../icons/subscribe";

function Sections() {
  return (
    <div className="w-full py-12 bg-pink-50/70 dark:bg-slate-800">
      <Wrapper>
        <div className="w-full lg:grid lg:gap-3 lg:grid-cols-12 ">
          <div className="lg:col-span-4">
            <h1 className="text-3xl flex flex-row items-center">
              1. Install
              <Install className="w-10 h-10 ml-3 " />
            </h1>
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
          </div>
          <div className="w-full lg:col-span-8">
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
    </div>
  );
}

export default Sections;
