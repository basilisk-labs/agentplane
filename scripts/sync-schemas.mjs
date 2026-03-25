import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { renderAgentplaneConfigSchemaJson } from "../packages/core/src/config/config-schema.ts";
import {
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
} from "../packages/core/src/tasks/task-artifact-schema.ts";

function normalizeJsonText(text) {
  return JSON.stringify(JSON.parse(text));
}

function readNormalizedJsonIfExists(target) {
  try {
    return normalizeJsonText(readFileSync(target, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function usage() {
  console.log("Usage: bun scripts/sync-schemas.mjs <check|sync>");
  throw new Error("Invalid usage");
}

function main() {
  const mode = process.argv[2];
  if (mode !== "check" && mode !== "sync") usage();

  const repoRoot = process.cwd();
  const artifacts = [
    {
      label: "config schema",
      rendered: renderAgentplaneConfigSchemaJson(),
      targets: [
        path.join(repoRoot, "packages", "spec", "schemas", "config.schema.json"),
        path.join(repoRoot, "packages", "core", "schemas", "config.schema.json"),
      ],
    },
    {
      label: "task README frontmatter schema",
      rendered: renderTaskReadmeFrontmatterSchemaJson(),
      targets: [
        path.join(repoRoot, "packages", "spec", "schemas", "task-readme-frontmatter.schema.json"),
        path.join(repoRoot, "packages", "core", "schemas", "task-readme-frontmatter.schema.json"),
      ],
    },
    {
      label: "tasks export schema",
      rendered: renderTasksExportSchemaJson(),
      targets: [
        path.join(repoRoot, "packages", "spec", "schemas", "tasks-export.schema.json"),
        path.join(repoRoot, "packages", "core", "schemas", "tasks-export.schema.json"),
      ],
    },
    {
      label: "pr meta schema",
      rendered: renderTaskPrMetaSchemaJson(),
      targets: [
        path.join(repoRoot, "packages", "spec", "schemas", "pr-meta.schema.json"),
        path.join(repoRoot, "packages", "core", "schemas", "pr-meta.schema.json"),
      ],
    },
  ];

  const driftedArtifacts = artifacts
    .map((artifact) => {
      const normalizedRendered = normalizeJsonText(artifact.rendered);
      const driftedTargets = artifact.targets.filter(
        (target) => readNormalizedJsonIfExists(target) !== normalizedRendered,
      );
      return { ...artifact, driftedTargets };
    })
    .filter((artifact) => artifact.driftedTargets.length > 0);

  if (mode === "check") {
    if (driftedArtifacts.length > 0) {
      const lines = driftedArtifacts
        .flatMap((artifact) => [
          `${artifact.label}:`,
          ...artifact.driftedTargets.map((target) => `  - ${path.relative(repoRoot, target)}`),
        ])
        .join("\n");
      throw new Error(`schema artifacts are out of sync.\n${lines}\nRun: bun run schemas:sync`);
    }
    process.stdout.write("schemas OK\n");
    return;
  }

  if (driftedArtifacts.length === 0) {
    process.stdout.write("schemas already in sync\n");
    return;
  }

  for (const artifact of driftedArtifacts) {
    for (const target of artifact.driftedTargets) writeFileSync(target, artifact.rendered, "utf8");
  }
  process.stdout.write(
    `synced runtime schemas -> ${driftedArtifacts
      .flatMap((artifact) =>
        artifact.driftedTargets.map((target) => path.relative(repoRoot, target)),
      )
      .join(", ")}\n`,
  );
}

main();
