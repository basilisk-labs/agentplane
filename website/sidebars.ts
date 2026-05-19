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
        "user/workflow",
        "concepts/traces",
        "user/local-context",
        "recipes/index",
        "reference/acr",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "examples/debug-agent-run-with-traces",
        "examples/export-traces",
        "recipes/tdd",
        "recipes/security-review",
        "recipes/docs-update",
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
        "user/cli-reference.generated",
        "user/configuration",
        "reference/trace-schema",
        "reference/acr-schema",
        "reference/generated-reference",
      ],
    },
    {
      type: "category",
      label: "Concepts",
      items: [
        "concepts/harness-engineering",
        "concepts/context-engineering",
        "concepts/agent-workflows",
        "concepts/traces",
      ],
    },
    {
      type: "category",
      label: "Agent workflow model",
      items: [
        "user/task-lifecycle",
        "user/branching-and-pr-artifacts",
        "workflow-guides/branch-pr",
        "user/tasks-and-backends",
        "user/commands",
        "user/agents",
      ],
    },
    {
      type: "category",
      label: "Local context",
      items: [
        "user/local-context",
        "user/agent-discovery",
        "user/indexing-and-webmaster-operations",
      ],
    },
    {
      type: "category",
      label: "Upgrade & recover",
      items: [
        "user/breaking-changes",
        "user/workflow-migration",
        "help/troubleshooting-by-symptom",
        "help/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Project",
      items: [
        "compare",
        "manifesto",
        "listing",
        "showcase",
        "user/website-ia",
        "developer/website-success-metrics",
        "contributing/citation-guidelines",
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
      items: ["help/broken-workflow-runbook", "help/glossary"],
    },
  ],
};

export default sidebars;
