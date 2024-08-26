/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Installation",
      items: [
        "installation/initial-setup",
        "installation/region-support",
        "installation/updates",
        "installation/custom-domains",
        "installation/security",
        "installation/versioning",
        "installation/uninstallation",
      ],
      collapsible: false,
    },
    {
      type: "category",
      label: "Connections",
      items: [
        "connections/authentication",
        "connections/claims",
        "connections/connect-and-subscribe",
        "connections/keep-alive",
      ],
      collapsible: false,
    },
    {
      type: "category",
      label: "Channels",
      items: [
        "channels/overview",
        "channels/standard",
        "channels/presence",
        "channels/client-messages",
      ],
      collapsible: false,
    },
    {
      type: "category",
      label: "Server API",
      items: [
        "server-api/logging",
        "server-api/publish-messages",
        "server-api/events",
        "server-api/web-console",
      ],
      collapsible: false,
    },
    {
      type: "category",
      label: "Licensing",
      items: [
        "licensing/paid-tier-upgrade",
        "licensing/pricing",
        "licensing/support",
      ],
      collapsible: false,
    },
    {
      type: "category",
      label: "Performance",
      items: ["performance/limits-and-scaling"],
      collapsible: false,
    },
  ],
}

module.exports = sidebars
