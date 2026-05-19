import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const gtmContainerId = process.env.GTM_CONTAINER_ID ?? "GTM-P4FNLHQF";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID ?? "G-L8T8ZZ8RSG";
const githubEditBaseUrl = "https://github.com/basilisk-labs/agentplane/edit/main";
const githubRepoUrl = "https://github.com/basilisk-labs/agentplane";

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
  title: "Agentplane",
  tagline: "Build, run, trace, and operationalize AI agents with reproducible local workflows.",
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
          exclude: [
            "**/README.md",
            "user/website-ia.mdx",
            "developer/website-success-metrics.mdx",
            "contributing/citation-guidelines.mdx",
            "listing.md",
            "showcase.mdx",
            "launch/**",
          ],
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/docs",
          editUrl: ({ docPath }: { docPath: string }) => docsEditUrl(docPath),
        },
        blog: {
          showReadingTime: true,
          postsPerPage: "ALL",
          routeBasePath: "/blog",
          blogListComponent: "@site/src/pages/blog/index.tsx",
          blogTitle: "Agentplane Blog",
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
          "agent workflow, ai agent traces, harness engineering, context engineering, local ai agents, OpenTelemetry agent traces, agent change record, agentplane, ai coding agent guardrails",
      },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Agentplane" },
      {
        property: "og:title",
        content: "Make AI-authored code reviewable in Git",
      },
      {
        property: "og:description",
        content:
          "Local-first CLI evidence for coding-agent intent, plans, verification, traces, commits, and Agent Change Records.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Make AI-authored code reviewable in Git",
      },
      {
        name: "twitter:description",
        content:
          "Local-first CLI evidence for coding-agent intent, plans, verification, traces, commits, and Agent Change Records.",
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
        alt: "Agentplane Logo",
        src: "img/agentplane.svg",
        width: 160,
        height: 32,
      },
      items: [
        {
          to: "/docs",
          label: "Docs",
          position: "right",
          activeBaseRegex: "^/docs",
        },
        {
          to: "/examples",
          label: "Examples",
          position: "right",
          activeBaseRegex: "^/examples",
        },
        {
          to: "/docs/compare",
          label: "Compare",
          position: "right",
        },
        {
          to: "/docs/start/quickstart",
          label: "Quickstart",
          position: "right",
          className: "navbar-quickstart-cta",
        },
        {
          href: "https://www.npmjs.com/package/agentplane",
          label: "npm i -g agentplane",
          position: "right",
          className: "navbar-install-command",
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
              label: "What is Agentplane",
              to: "/docs/user/overview",
            },
            {
              label: "Quickstart",
              to: "/docs/start/quickstart",
            },
            {
              label: "Examples",
              to: "/examples",
            },
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "Agent Change Records",
              to: "/docs/reference/acr",
            },
          ],
        },
        {
          title: "Docs",
          items: [
            {
              label: "Harness engineering",
              to: "/docs/concepts/harness-engineering",
            },
            {
              label: "Context engineering",
              to: "/docs/concepts/context-engineering",
            },
            {
              label: "Traces",
              to: "/docs/concepts/traces",
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
              href: githubRepoUrl,
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
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Agentplane.`,
    },
  } satisfies Preset.ThemeConfig,
  customFields: {
    gtmContainerId,
    gaMeasurementId,
    githubRepoUrl,
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
