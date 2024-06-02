// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer")
const lightTheme = themes.github
const darkTheme = themes.dracula

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
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/hotsock/website/tree/main",
        },
        blog: {
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
      image: "img/hotshot-social-card.png",
      metadata: [], // https://docusaurus.io/docs/api/themes/configuration#metadata
      algolia: {
        apiKey: "c02dc22a808d50178b7a3031c52fcbef",
        appId: "ET5S7YPMLQ",
        indexName:
          process.env.BUILD_ENV === "production"
            ? "production_docs"
            : "staging_docs",
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
            to: "/blog/",
            label: "Blog & Updates",
            position: "left",
          },
          {
            href: "https://github.com/hotsock/website",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/docs/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "X",
                href: "https://x.com/gethotsock",
              },
              {
                label: "Mastodon",
                href: "https://mastodon.social/@hotsock",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/hotsock",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JK Tech, Inc.`,
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
      site: "QJMVJIST",
      src: "https://cdn.usefathom.com/script.js",
    },
  ],
}

module.exports = config
