import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import fs from "node:fs";
import path from "node:path";

const releaseDocPattern = /^v(\d+)\.(\d+)\.(\d+)\.md$/;

function compareSemverDesc(a: number[], b: number[]): number {
  for (let index = 0; index < 3; index += 1) {
    const left = a[index] ?? 0;
    const right = b[index] ?? 0;
    if (left !== right) return right - left;
  }
  return 0;
}

function resolveReleaseDocItems(): string[] {
  const releaseDir = path.resolve(process.cwd(), "../docs/releases");
  const entries = fs.readdirSync(releaseDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .map((name) => {
      const match = releaseDocPattern.exec(name);
      if (!match) return null;
      const major = Number(match[1]);
      const minor = Number(match[2]);
      const patch = Number(match[3]);
      if ([major, minor, patch].some((value) => Number.isNaN(value))) return null;
      return {
        item: `releases/${name.replace(/\.md$/, "")}`,
        version: [major, minor, patch],
      };
    })
    .filter((entry): entry is { item: string; version: number[] } => entry !== null)
    .toSorted((left, right) => compareSemverDesc(left.version, right.version))
    .map((entry) => entry.item);
}

const releaseDocItems = resolveReleaseDocItems();

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Start",
      items: [
        "user/overview",
        "start/quickstart",
        "start/first-local-run",
        "start/what-agentplane-writes",
        "user/setup",
        "user/prerequisites",
      ],
    },
    {
      type: "category",
      label: "Core concepts",
      items: [
        "concepts/harness-engineering",
        "concepts/traces",
        "concepts/context-engineering",
        "recipes/index",
        "reference/acr",
      ],
    },
    {
      type: "category",
      label: "Workflow guides",
      items: [
        "workflow-guides/index",
        "workflow-guides/claude-code",
        "workflow-guides/codex",
        "workflow-guides/cursor",
        "workflow-guides/aider",
        "workflow-guides/github-actions",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/cli",
        "reference/workflow-file",
        "reference/trace-schema",
        "reference/acr",
        "reference/acr-schema",
      ],
    },
    {
      type: "category",
      label: "Examples and recipes",
      items: [
        "examples/debug-agent-run-with-traces",
        "examples/export-traces",
        "recipes/tdd",
        "recipes/security-review",
        "recipes/docs-update",
      ],
    },
    {
      type: "category",
      label: "Release notes",
      items: [
        "releases/index",
        {
          type: "category",
          label: "Archive",
          collapsed: true,
          items: releaseDocItems,
        },
      ],
    },
    {
      type: "category",
      label: "Help",
      items: ["help/troubleshooting", "help/broken-workflow-runbook", "help/glossary", "compare"],
    },
  ],
};

export default sidebars;
