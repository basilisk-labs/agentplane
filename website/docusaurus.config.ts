import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const gtmContainerId = process.env.GTM_CONTAINER_ID ?? "GTM-P4FNLHQF";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID ?? "G-L8T8ZZ8RSG";

const config = {
  title: "AgentPlane",
  tagline: "The audit layer for coding agents.",
  titleDelimiter: "·",
  favicon: "img/favicon.ico",
  future: {
    v4: true,
  },
  url: "https://agentplane.org",
  baseUrl: "/",
  organizationName: "basilisk-labs",
  projectName: "agentplane",
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "../docs",
          exclude: ["**/README.md"],
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/docs",
          editUrl: "https://github.com/basilisk-labs/agentplane/tree/main/",
        },
        blog: {
          showReadingTime: true,
          postsPerPage: "ALL",
          routeBasePath: "/blog",
          blogListComponent: "@site/src/pages/blog/index.tsx",
          blogTitle: "AgentPlane Blog",
          blogDescription: "Release notes, workflow deep dives, and implementation guidance.",
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/basilisk-labs/agentplane/tree/main/website/",
        },
        gtag: {
          trackingID: gaMeasurementId,
          anonymizeIP: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/og-image.png",
    metadata: [
      {
        name: "keywords",
        content:
          "claude code workflow, codex workflow, cursor agent, aider, ai coding agent guardrails, agent audit log, AGENTS.md, reviewable agent work",
      },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AgentPlane" },
      { property: "og:title", content: "AgentPlane: the audit layer for coding agents" },
      {
        property: "og:description",
        content:
          "Open-source CLI that turns Claude Code, Codex, Cursor, and Aider into reviewable, reversible work inside Git repositories.",
      },
      { property: "og:image", content: "https://agentplane.org/img/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AgentPlane: the audit layer for coding agents" },
      {
        name: "twitter:description",
        content:
          "Open-source CLI that records task, plan, verification, and closure evidence for coding-agent work.",
      },
      { name: "twitter:image", content: "https://agentplane.org/img/twitter-card.png" },
      { name: "twitter:site", content: "@agentplaneorg" },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "",
      logo: {
        alt: "AgentPlane Logo",
        src: "img/agentplane.svg",
        width: 160,
        height: 32,
      },
      items: [
        {
          to: "/docs/manifesto",
          label: "Why",
          position: "right",
          activeBaseRegex: "^/docs/manifesto",
        },
        {
          to: "/docs/user/overview",
          label: "Docs",
          position: "right",
          activeBaseRegex: "^/docs",
        },
        {
          to: "/docs/compare",
          label: "Compare",
          position: "right",
          activeBaseRegex: "^/docs/compare",
        },
        {
          to: "/docs/recipes",
          label: "Recipes",
          position: "right",
          activeBaseRegex: "^/docs/recipes",
        },
        {
          href: "https://github.com/basilisk-labs/agentplane",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/agentplane",
          label: "npm i -g agentplane",
          position: "right",
          className: "navbar-install-command",
        },
        {
          href: "https://github.com/basilisk-labs/agentplane",
          label: "View on GitHub",
          position: "right",
          className: "navbar-github-cta",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs",
            },
          ],
        },
        {
          title: "Project",
          items: [
            {
              label: "Repository",
              href: "https://github.com/basilisk-labs/agentplane",
            },
            {
              label: "Policy",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/POLICY.md",
            },
            {
              label: "Security",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/SECURITY.md",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Contributing",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AgentPlane.`,
    },
  } satisfies Preset.ThemeConfig,
  customFields: {
    gtmContainerId,
    gaMeasurementId,
  },
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/favicon-32x32.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/img/favicon-16x16.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    },
  ],
} satisfies Config;

export default config;
