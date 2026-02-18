import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const gtmContainerId = process.env.GTM_CONTAINER_ID ?? "GTM-P4FNLHQF";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID ?? "G-L8T8ZZ8RSG";

const config: Config = {
  title: "AgentPlane",
  tagline: "Deterministic agent workflows with auditable guardrails.",
  titleDelimiter: "·",
  favicon: "img/agentplane-favicon.svg",
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
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
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
          routeBasePath: "/blog",
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
    image: "img/header.png",
    metadata: [
      {
        name: "keywords",
        content: "agent workflows, cli automation, policy gates, codex workflow, ai agents",
      },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AgentPlane" },
      { property: "og:title", content: "AgentPlane" },
      {
        property: "og:description",
        content:
          "Deterministic agent workflows with auditable policy gates and repository-native task execution.",
      },
      { property: "og:image", content: "https://agentplane.org/img/header.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AgentPlane" },
      {
        name: "twitter:description",
        content:
          "Deterministic workflow framework for policy-driven agent execution in repositories.",
      },
      { name: "twitter:image", content: "https://agentplane.org/img/header.png" },
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
        { to: "/docs/user/overview", label: "Getting Started", position: "left" },
        { to: "/docs/user/workflow", label: "Workflows", position: "left" },
        { to: "/docs/user/commands", label: "Reference", position: "left" },
        { to: "/docs/developer/architecture", label: "Developer", position: "left" },
        { to: "/docs/releases", label: "Release Notes", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/basilisk-labs/agentplane",
          label: "GitHub",
          position: "right",
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
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
  customFields: {
    gtmContainerId,
    gaMeasurementId,
  },
};

export default config;
