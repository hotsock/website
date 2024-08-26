import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"

/** Passed to @docusaurus/plugin-content-docs to render the mdx content */
export default function DocItem({ content, route }) {
  const MDXComponent = content
  const indexPath = useBaseUrl("/examples/")

  if (route.path === indexPath) {
    return (
      <div key="index">
        <div className="theme-doc-markdown markdown">
          <MDXComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="demo__container-custom" key="demo">
      <div className="theme-doc-markdown markdown">
        <MDXComponent />
      </div>
    </div>
  )
}
