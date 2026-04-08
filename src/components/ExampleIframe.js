import React, { useEffect, useRef } from "react"
import { useColorMode } from "@docusaurus/theme-common"
import useBaseUrl from "@docusaurus/useBaseUrl"

export default function ExampleIframe({ name, height = "500px" }) {
  const iframeRef = useRef(null)
  const { colorMode } = useColorMode()
  const src = useBaseUrl(`/example-apps/${name}/index.html`)

  const sendTheme = (theme) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "theme-change", theme },
      "*",
    )
  }

  useEffect(() => {
    sendTheme(colorMode)
  }, [colorMode])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      onLoad={() => sendTheme(colorMode)}
      style={{
        width: "100%",
        height,
        border: "none",
      }}
    />
  )
}
