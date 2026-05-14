import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const gtmContainerId = process.env.GTM_CONTAINER_ID ?? "GTM-P4FNLHQF";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID ?? "G-L8T8ZZ8RSG";

const config = {
  title: "AgentPlane",
  tagline: "Git-native infrastructure for traceable AI work.",
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
          "agent change record, ai pull request review, claude code workflow, codex workflow, cursor agent, aider, ai coding agent guardrails, git-native ai work, AGENTS.md, reviewable agent work",
      },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AgentPlane" },
      {
        property: "og:title",
        content: "AgentPlane.org - Git-native infrastructure for traceable AI work",
      },
      {
        property: "og:description",
        content:
          "AgentPlane records AI-agent work as reviewable Git evidence: task intent, approved plan, verification, Agent Change Record, and closure metadata.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "AgentPlane.org - Git-native infrastructure for traceable AI work",
      },
      {
        name: "twitter:description",
        content:
          "Local-first CLI for task, plan, verification, Agent Change Record, and closure evidence in Git.",
      },
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
          to: "/docs/user/agent-change-record",
          label: "ACR",
          position: "right",
          activeBaseRegex: "^/docs/user/agent-change-record",
        },
        {
          to: "/docs/user/local-context",
          label: "Context",
          position: "right",
          activeBaseRegex: "^/docs/user/local-context",
        },
        {
          to: "/docs/workflow-guides",
          label: "Workflows",
          position: "right",
          activeBaseRegex: "^/docs/workflow-guides",
        },
        {
          to: "/docs/user/overview",
          label: "Docs",
          position: "right",
          activeBaseRegex: "^/docs",
        },
        {
          to: "/docs/recipes",
          label: "Recipes",
          position: "right",
          activeBaseRegex: "^/docs/recipes",
        },
        {
          to: "/docs/compare",
          label: "Compare",
          position: "right",
          activeBaseRegex: "^/docs/compare",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
          activeBaseRegex: "^/blog",
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
          title: "Product",
          items: [
            {
              label: "Why",
              to: "/docs/manifesto",
            },
            {
              label: "Agent Change Record",
              to: "/docs/user/agent-change-record",
            },
            {
              label: "Workflows",
              to: "/docs/workflow-guides",
            },
            {
              label: "Compare",
              to: "/docs/compare",
            },
          ],
        },
        {
          title: "Docs",
          items: [
            {
              label: "Quickstart",
              to: "/docs/user/setup",
            },
            {
              label: "Claude Code",
              to: "/docs/workflow-guides/claude-code",
            },
            {
              label: "Codex",
              to: "/docs/workflow-guides/codex",
            },
            {
              label: "GitHub Actions",
              to: "/docs/workflow-guides/github-actions",
            },
            {
              label: "CLI Reference",
              to: "/docs/user/cli-reference.generated",
            },
          ],
        },
        {
          title: "Project",
          items: [
            {
              label: "GitHub",
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
          title: "Community",
          items: [
            {
              label: "Contributing",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md",
            },
            {
              label: "Discussions",
              href: "https://github.com/basilisk-labs/agentplane/discussions",
            },
            {
              label: "Showcase",
              to: "/docs/showcase",
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
