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
      label: "◈ Getting Started",
      items: ["user/overview", "user/prerequisites", "user/setup", "user/breaking-changes"],
    },
    {
      type: "category",
      label: "◉ Workflows",
      items: [
        "user/workflow",
        "user/task-lifecycle",
        "user/agents",
        "user/branching-and-pr-artifacts",
      ],
    },
    {
      type: "category",
      label: "◌ Backends & Config",
      items: [
        "user/tasks-and-backends",
        "user/backends",
        "user/backends/local",
        "user/backends/redmine",
        "user/redmine",
        "user/configuration",
        "user/commands",
        "user/cli-reference.generated",
      ],
    },
    {
      type: "category",
      label: "◍ Developer Guide",
      items: [
        "developer/design-principles",
        "developer/architecture",
        "developer/project-layout",
        "developer/documentation-information-architecture",
        "developer/cli-contract",
        "developer/cli-help-json",
        "developer/typescript-esm-imports",
        "developer/recipes-spec",
        "developer/recipes-how-it-works",
        "developer/recipes-development",
        "developer/recipes-safety",
        "developer/testing-and-quality",
        "developer/code-quality",
        "developer/release-and-publishing",
        "developer/contributing",
      ],
    },
    {
      type: "category",
      label: "◎ Release Notes",
      items: ["releases/index", ...releaseDocItems],
    },
    {
      type: "category",
      label: "◇ Help",
      items: ["help/troubleshooting-by-symptom", "help/troubleshooting", "help/glossary"],
    },
  ],
};

export default sidebars;
