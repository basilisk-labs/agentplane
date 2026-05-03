import path from "node:path";
import { findDriftedRenderedArtifacts, syncRenderedArtifacts } from "./lib/sync-artifacts.mjs";
import { defineScript, parseCheckSyncMode, runScriptMain } from "./lib/script-runtime.mjs";

import {
  renderAcrSchemaJson,
  renderAgentplaneConfigSchemaJson,
  renderTaskHandoffSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
} from "../packages/core/src/schemas/index.ts";

const main = defineScript({
  name: "sync-schemas",
  run({ argv }) {
    const mode = parseCheckSyncMode(argv, "scripts/sync-schemas.mjs");

    const repoRoot = process.cwd();
    const artifacts = [
      {
        label: "ACR v0.1 schema",
        rendered: renderAcrSchemaJson(),
        targets: [
          path.join(repoRoot, "packages", "spec", "schemas", "acr-v0.1.schema.json"),
          path.join(repoRoot, "packages", "core", "schemas", "acr-v0.1.schema.json"),
        ],
      },
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
      {
        label: "task handoff schema",
        rendered: renderTaskHandoffSchemaJson(),
        targets: [
          path.join(repoRoot, "packages", "spec", "schemas", "task-handoff.schema.json"),
          path.join(repoRoot, "packages", "core", "schemas", "task-handoff.schema.json"),
        ],
      },
    ];

    const driftedArtifacts = findDriftedRenderedArtifacts(artifacts);

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

    syncRenderedArtifacts(driftedArtifacts);
    process.stdout.write(
      `synced runtime schemas -> ${driftedArtifacts
        .flatMap((artifact) =>
          artifact.driftedTargets.map((target) => path.relative(repoRoot, target)),
        )
        .join(", ")}\n`,
    );
  },
});

runScriptMain(main);
