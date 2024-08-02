import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "@docusaurus/Link";
import { buttonVariants } from "../../lib/utils";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";

const DATA = [
  {
    title: "First Fct",
    description: "Install in just 2 AWS CLI commands.",
    tab: 0,
  },
  {
    title: "Second Fct",
    description:
      " Publish messages from your backend in any language with the AWS SDK you already use.",
    tab: 1,
  },
  {
    title: "Third Fct",
    description:
      "Connect and subscribe to messages using the Hotsock JS library or using any WebSockets client.",
    tab: 2,
  },
];

function TabsSection() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };
  return (
    <Wrapper>
      <div className="bg-accent/30 p-4 rounded-xl">
        {/* selectors */}
        <div className="w-full flex flex-row items-center">
          <span
            onClick={() => handleTabChange(0)}
            className={`flex-1 flex cursor-pointer rounded-r-none ${buttonVariants(
              {
                variant: selectedTab === 0 ? "outline" : "default",
              }
            )}`}
          >
            {DATA[0].title}
          </span>
          <span
            onClick={() => handleTabChange(1)}
            className={`flex-1 flex cursor-pointer rounded-none ${buttonVariants(
              {
                variant: selectedTab === 1 ? "outline" : "default",
              }
            )}`}
          >
            {DATA[1].title}
          </span>
          <span
            onClick={() => handleTabChange(2)}
            className={`flex-1 cursor-pointer flex rounded-l-none ${buttonVariants(
              {
                variant: selectedTab === 2 ? "outline" : "default",
              }
            )}`}
          >
            {DATA[2].title}
          </span>
        </div>
        {/* content */}
        <div className="mt-3 w-full min-w-full  items-center flex flex-col">
          <p className="text-sm lg:text-lg lg:py-3">
            {DATA[selectedTab].description}
          </p>
          <MDXContent>
            <CodeBlock tab={selectedTab} />
          </MDXContent>
        </div>
      </div>
    </Wrapper>
  );
}

export default TabsSection;
