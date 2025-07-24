// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer")
const lightTheme = themes.github
const darkTheme = themes.dracula
const { resolve } = require("path")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Hotsock",
  tagline:
    "Hotsock is a real-time WebSockets service for your web and mobile applications, fully-managed and self-hosted in your AWS account. ",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://www.hotsock.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./src/sidebar-docs.js"),
          editUrl: "https://github.com/hotsock/website/tree/main",
        },
        blog: {
          blogSidebarTitle: "All our posts",
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/og-default.png",
      metadata: [], // https://docusaurus.io/docs/api/themes/configuration#metadata
      algolia: {
        apiKey: "effce19400e6bae01c419d64f036c353",
        appId: "9I8Q94BXAI",
        indexName: "hotsock",
      },
      navbar: {
        logo: {
          alt: "Hotsock",
          src: "img/hotsock-side-by-side.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Documentation",
          },
          {
            to: "/examples/",
            position: "left",
            label: "Examples",
          },
          {
            to: "/blog/",
            label: "Blog & Updates",
            position: "left",
          },
          {
            href: "https://licensing.hotsock.io",
            label: "Licensing Login",
            position: "right",
          },
          {
            href: "https://github.com/hotsock/website",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            items: [
              {
                html: `
                  <img src="/img/hotsock-side-by-side.svg" alt="logo" width="114" height="51" />
                  <p style="font-size: smaller;">Copyright © ${new Date().getFullYear()} JK Tech, Inc.</p>
                `,
              },
            ],
          },
          {},

          {
            title: "DEVELOPERS",
            items: [
              {
                label: "Docs",
                to: "/docs/",
              },
              {
                label: "Support",
                to: "/docs/licensing/support/",
              },
            ],
          },
          {
            title: "COMPANY",
            items: [
              {
                label: "Blog",
                to: "/blog/",
              },
            ],
          },
          {
            title: "LEGAL",
            items: [
              {
                label: "Terms & Conditions",
                to: "/legal/terms/",
              },
              {
                label: "Privacy Policy",
                to: "/legal/privacy/",
              },
              {
                label: "End User License Agreement",
                to: "/legal/eula/",
              },
            ],
          },
        ],
        copyright: "h",
      },
      prism: {
        additionalLanguages: [
          "bash",
          "diff",
          "json",
          "csharp",
          "php",
          "java",
          "ruby",
        ],
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "examples",
        path: "./src/examples",
        routeBasePath: "examples",
        sidebarPath: resolve("./src/sidebar-examples.js"),
        breadcrumbs: false,
        docItemComponent: resolve("./src/components/ExamplesDocItem.js"),
      },
    ],
    async function tailwindPlugin(_context, _options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"))
          postcssOptions.plugins.push(require("autoprefixer"))
          return postcssOptions
        },
      }
    },
  ],

  scripts: [
    {
      defer: true,
      "data-site": "QJMVJIST",
      "data-spa": "auto",
      src: "https://cdn.usefathom.com/script.js",
    },
  ],
}

module.exports = config
