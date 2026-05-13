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
        "user/setup",
        "user/local-context",
        "user/agent-change-record",
        "help/glossary",
        "manifesto",
        "compare",
        "user/prerequisites",
        "user/agent-bootstrap.generated",
      ],
    },
    {
      type: "category",
      label: "Work on a task",
      items: [
        "user/workflow",
        "user/task-lifecycle",
        "user/commands",
        "user/branching-and-pr-artifacts",
        "user/tasks-and-backends",
        "user/configuration",
      ],
    },
    {
      type: "category",
      label: "Workflows",
      items: [
        "workflow-guides/index",
        "workflow-guides/claude-code",
        "workflow-guides/codex",
        "workflow-guides/cursor",
        "workflow-guides/aider",
        "workflow-guides/github-actions",
        "workflow-guides/branch-pr",
      ],
    },
    {
      type: "category",
      label: "Use with agents",
      items: [
        "user/agents",
        "workflow-guides/claude-code",
        "workflow-guides/codex",
        "workflow-guides/cursor",
        "workflow-guides/aider",
      ],
    },
    {
      type: "category",
      label: "Context and evidence",
      items: [
        "user/local-context",
        "user/agent-change-record",
        "developer/agent-change-record-implementation",
        "user/agent-discovery",
        "user/indexing-and-webmaster-operations",
      ],
    },
    {
      type: "category",
      label: "Recipes",
      items: ["recipes/index", "recipes/code-map"],
    },
    {
      type: "category",
      label: "Upgrade & recover",
      items: [
        "user/breaking-changes",
        "user/workflow-migration",
        "help/legacy-upgrade-recovery",
        "help/troubleshooting-by-symptom",
        "help/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "user/backends",
        "user/backends/local",
        "user/backends/cloud",
        "user/backends/redmine",
        "user/redmine",
        "user/agent-discovery",
        "user/indexing-and-webmaster-operations",
        "user/website-ia",
        "listing",
        "user/cli-reference.generated",
        "reference/generated-reference",
      ],
    },
    {
      type: "category",
      label: "Community",
      items: ["showcase"],
    },
    {
      type: "category",
      label: "Developer guide",
      items: [
        "developer/design-principles",
        "developer/architecture",
        "developer/project-layout",
        "developer/module-topology",
        "developer/local-context",
        "developer/documentation-information-architecture",
        "developer/cli-contract",
        "developer/cli-help-json",
        "developer/workflow-contract",
        "developer/workflow-harness-test-matrix",
        "developer/harness-engineering",
        "developer/blueprints",
        "developer/cloud-backend-integration-plan",
        "developer/evaluation-and-recursive-improvement",
        "developer/close-taxonomy",
        "developer/incident-archive",
        "developer/modular-prompt-assembly",
        "developer/schema-validation-strategy",
        "developer/typescript-esm-imports",
        "developer/recipes-spec",
        "developer/recipes-how-it-works",
        "developer/recipes-development",
        "developer/recipes-safety",
        "developer/testing-and-quality",
        "developer/code-quality",
        "developer/performance-baselines",
        "developer/release-and-publishing",
        "developer/contributing",
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
