import path from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import { findDriftedRenderedArtifacts, syncRenderedArtifacts } from "../lib/sync-artifacts.mjs";
import { defineScript, parseCheckSyncMode, runScriptMain } from "../lib/script-runtime.mjs";

import {
  renderAcrSchemaJson,
  renderAgentplaneConfigSchemaJson,
  renderTaskHandoffSchemaJson,
  renderTaskObservationSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
} from "../../packages/core/src/schemas/index.ts";

const GENERATED_RUNTIME_SCHEMAS = [
  "acr-v0.1.schema.json",
  "config.schema.json",
  "task-readme-frontmatter.schema.json",
  "tasks-export.schema.json",
  "pr-meta.schema.json",
  "task-handoff.schema.json",
  "task-observation.schema.json",
];

const STATIC_CONTEXT_SCHEMAS = [
  "agentplane-context.schema.json",
  "context-capability-artifact.schema.json",
  "context-edge.schema.json",
  "context-entity.schema.json",
  "context-fact.schema.json",
  "context-provenance-edge.schema.json",
];

const ROOT_ONLY_PUBLIC_SCHEMAS = ["recipe-manifest.schema.json", "workflow.schema.json"];

const main = defineScript({
  name: "sync-schemas",
  run({ argv }) {
    const mode = parseCheckSyncMode(argv, "scripts/sync-schemas.mjs");

    const repoRoot = process.cwd();
    assertSchemaInventory(repoRoot);
    const schemaTargets = (fileName) => [
      path.join(repoRoot, "schemas", fileName),
      path.join(repoRoot, "packages", "spec", "schemas", fileName),
      path.join(repoRoot, "packages", "core", "schemas", fileName),
    ];
    const packageSchemaTargets = (fileName) => [
      path.join(repoRoot, "packages", "spec", "schemas", fileName),
      path.join(repoRoot, "packages", "core", "schemas", fileName),
    ];

    const artifacts = [
      {
        label: "ACR v0.1 schema",
        rendered: renderAcrSchemaJson(),
        targets: schemaTargets("acr-v0.1.schema.json"),
      },
      {
        label: "config schema",
        rendered: renderAgentplaneConfigSchemaJson(),
        targets: schemaTargets("config.schema.json"),
      },
      {
        label: "task README frontmatter schema",
        rendered: renderTaskReadmeFrontmatterSchemaJson(),
        targets: schemaTargets("task-readme-frontmatter.schema.json"),
      },
      {
        label: "tasks export schema",
        rendered: renderTasksExportSchemaJson(),
        targets: schemaTargets("tasks-export.schema.json"),
      },
      {
        label: "pr meta schema",
        rendered: renderTaskPrMetaSchemaJson(),
        targets: schemaTargets("pr-meta.schema.json"),
      },
      {
        label: "task handoff schema",
        rendered: renderTaskHandoffSchemaJson(),
        targets: schemaTargets("task-handoff.schema.json"),
      },
      {
        label: "task observation schema",
        rendered: renderTaskObservationSchemaJson(),
        targets: schemaTargets("task-observation.schema.json"),
      },
      ...STATIC_CONTEXT_SCHEMAS.map((fileName) => ({
        label: `context schema ${fileName}`,
        rendered: readFileSync(
          path.join(repoRoot, "packages", "spec", "schemas", fileName),
          "utf8",
        ),
        targets: packageSchemaTargets(fileName),
      })),
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

function assertSchemaInventory(repoRoot) {
  const expectedByDir = new Map([
    ["schemas", [...GENERATED_RUNTIME_SCHEMAS, ...ROOT_ONLY_PUBLIC_SCHEMAS]],
    ["packages/spec/schemas", [...GENERATED_RUNTIME_SCHEMAS, ...STATIC_CONTEXT_SCHEMAS]],
    ["packages/core/schemas", [...GENERATED_RUNTIME_SCHEMAS, ...STATIC_CONTEXT_SCHEMAS]],
  ]);
  const errors = [];
  for (const [dir, expected] of expectedByDir) {
    const expectedSet = new Set(expected);
    const actual = new Set(
      readSchemaFileNames(path.join(repoRoot, dir)).filter((fileName) =>
        fileName.endsWith(".json"),
      ),
    );
    const missing = [...expectedSet].filter((fileName) => !actual.has(fileName));
    const unexpected = [...actual].filter((fileName) => !expectedSet.has(fileName));
    if (missing.length > 0 || unexpected.length > 0) {
      errors.push(
        [
          `${dir}: schema inventory drift`,
          missing.length > 0 ? `  missing: ${missing.join(", ")}` : null,
          unexpected.length > 0 ? `  unexpected: ${unexpected.join(", ")}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  }
  if (errors.length > 0) {
    throw new Error(
      [
        "schema source-of-truth inventory is invalid.",
        "Contract: runtime schemas are generated into root/spec/core; context schemas are static spec->core; recipe/workflow schemas are root-only public schemas.",
        ...errors,
      ].join("\n"),
    );
  }
}

function readSchemaFileNames(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .toSorted((left, right) => left.localeCompare(right));
}
