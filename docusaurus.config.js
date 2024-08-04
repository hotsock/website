// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

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
                to: "/",
              },
              {
                label: "Tutorials",
                to: "/",
              },
              {
                label: "Status",
                to: "/",
              },
              {
                label: "Support",
                to: "/",
              },
              {
                label: "Sessions",
                to: "/",
              },
            ],
          },
          {
            title: "COMPANY",
            items: [
              {
                label: "Contact Sales",
                to: "/",
              },
              {
                label: "User Stories",
                to: "/",
              },
              {
                label: "Support",
                to: "/",
              },
              {
                label: "Blog",
                to: "/",
              },
              {
                label: "Careers",
                to: "/",
              },
            ],
          },
          {
            title: "LEGAL",
            items: [
              {
                label: "Terms & Conditions",
                to: "/",
              },
              {
                label: "Cookie Policy",
                to: "/",
              },
              {
                label: "Privacy Policy",
                to: "/",
              },
              {
                label: "Quotas",
                to: "/",
              },
              {
                label: "Security",
                to: "/",
              },
            ],
          },
        ],
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
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  scripts: [
    {
      defer: true,
      site: "QJMVJIST",
      src: "https://cdn.usefathom.com/script.js",
    },
  ],
};

module.exports = config;
