import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"

/** Passed to @docusaurus/plugin-content-docs to render the mdx content */
export default function DocItem({ content, route }) {
  const MDXComponent = content
  const indexPath = useBaseUrl("/examples")

  if (route.path === indexPath) {
    return (
      <div key="index">
        <MDXComponent />
      </div>
    )
  }

  return (
    <div className="demo__container-custom" key="demo">
      <MDXComponent />
    </div>
  )
}
