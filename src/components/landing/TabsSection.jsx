import React from "react";
import Wrapper from "../global/Wrapper";
import Link from "@docusaurus/Link";
import { buttonVariants } from "../../lib/utils";
import MDXContent from "@theme/MDXContent";
import CodeBlock from "./CodeBlock.mdx";

const GROUPS = [
  {
    title: "Python",
    id: "py",
  },
  {
    title: "JS",
    id: "js",
  },
  {
    title: "Go",
    id: "go",
  },
  {
    title: "Java",
    id: "java",
  },
  {
    title: "Ruby",
    id: "ruby",
  },
  {
    title: "PHP",
    id: "php",
  },
  {
    title: "C#",
    id: "csharp",
  },
];

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
  const [selectedGroup, setSelectedGroup] = React.useState("py");
  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };
  return (
    <div className="bg-accent/30 p-4 rounded-xl">
      {/* selectors */}
      <div className="grid grid-cols-7 gap-0 w-full">
        {GROUPS.map((grp, index) => (
          <span
            onClick={() => handleGroupChange(grp.id)}
            className={`w-full flex cursor-pointer rounded-none ${buttonVariants(
              {
                variant: selectedGroup === grp.id ? "default" : "outline",
              }
            )} ${
              index === 0
                ? "lg:rounded-l-xl rounded-l-md"
                : // : index === 3
                // ? "rounded-tr-xl"
                // : index === 4
                // ? "rounded-bl-xl"
                index === 6
                ? "lg:rounded-r-xl rounded-r-md"
                : ""
            }`}
          >
            {grp.title}
          </span>
        ))}
      </div>
      {/* content */}
      <div className="mt-3 w-full min-w-full  items-center flex flex-col">
        <MDXContent>
          <CodeBlock tab={selectedGroup} />
        </MDXContent>
      </div>
    </div>
  );
}

export default TabsSection;
