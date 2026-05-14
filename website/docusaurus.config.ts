import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const gtmContainerId = process.env.GTM_CONTAINER_ID ?? "GTM-P4FNLHQF";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID ?? "G-L8T8ZZ8RSG";
const githubEditBaseUrl = "https://github.com/basilisk-labs/agentplane/edit/main";

function repoEditUrl(sourcePath: string): string {
  const cleanPath = sourcePath.replace(/^(?:\.\.\/)+/, "");
  return `${githubEditBaseUrl}/${cleanPath}`;
}

function docsEditUrl(docPath: string): string {
  return repoEditUrl(`docs/${docPath}`);
}

function blogEditUrl(blogPath: string): string {
  return repoEditUrl(`website/blog/${blogPath}`);
}

const config = {
  title: "AgentPlane",
  tagline: "Make AI-authored code reviewable in Git.",
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
          editUrl: ({ docPath }: { docPath: string }) => docsEditUrl(docPath),
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
          editUrl: ({ blogPath }: { blogPath: string }) => blogEditUrl(blogPath),
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
        content: "Make AI-authored code reviewable in Git",
      },
      {
        property: "og:description",
        content:
          "Local-first evidence layer for Claude Code, Codex, Cursor, Aider, and other coding agents.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Make AI-authored code reviewable in Git",
      },
      {
        name: "twitter:description",
        content:
          "Local-first evidence layer for Claude Code, Codex, Cursor, Aider, and other coding agents.",
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
          to: "/docs/user/setup",
          label: "Quickstart",
          position: "right",
          activeBaseRegex: "^/docs/user/setup",
        },
        {
          href: "https://www.npmjs.com/package/agentplane",
          label: "npm i -g agentplane",
          position: "right",
          className: "navbar-install-command",
        },
        {
          href: "https://github.com/basilisk-labs/agentplane",
          label: "★ Star",
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
          title: "Open Source",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/basilisk-labs/agentplane",
            },
            {
              label: "Contributing",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/CONTRIBUTING.md",
            },
            {
              label: "Issues",
              href: "https://github.com/basilisk-labs/agentplane/issues",
            },
            {
              label: "Discussions",
              href: "https://github.com/basilisk-labs/agentplane/discussions",
            },
            {
              label: "Roadmap",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/ROADMAP.md",
            },
            {
              label: "Releases",
              href: "https://github.com/basilisk-labs/agentplane/releases",
            },
            {
              label: "Security",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/SECURITY.md",
            },
            {
              label: "License",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/LICENSE",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Policy",
              href: "https://github.com/basilisk-labs/agentplane/blob/main/POLICY.md",
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
