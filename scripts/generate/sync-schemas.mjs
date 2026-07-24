import path from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import { format } from "prettier";
import { findDriftedRenderedArtifacts, syncRenderedArtifacts } from "../lib/sync-artifacts.mjs";
import { defineScript, parseCheckSyncMode, runScriptMain } from "../lib/script-runtime.mjs";

import {
  renderAgentSemanticResultSchemaJson,
  renderAgentSemanticResultV2ValidFixtureJson,
  renderAcrSchemaJson,
  renderAgentPlaneRunnerHandoffSchemaJson,
  renderAgentplaneConfigSchemaJson,
  renderWorkflowFrontMatterSchemaJson,
  renderWorkflowV1FrontMatterFixtureJson,
  renderWorkflowV2FrontMatterFixtureJson,
  renderTaskHandoffSchemaJson,
  renderTaskObservationSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  renderRunnerResultManifestV1LegacyFixtureJson,
  renderExecutionReceiptSchemaJson,
  renderExecutionReceiptV1ValidFixtureJson,
  renderExecutionReceiptV2ValidFixtureJson,
} from "../../packages/core/src/schemas/index.ts";

const GENERATED_RUNTIME_SCHEMAS = [
  "acr-v0.1.schema.json",
  "config.schema.json",
  "workflow.schema.json",
  "task-readme-frontmatter.schema.json",
  "tasks-export.schema.json",
  "pr-meta.schema.json",
  "task-handoff.schema.json",
  "runner-handoff.schema.json",
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

const ROOT_ONLY_PUBLIC_SCHEMAS = [
  "agent-semantic-result.schema.json",
  "execution-receipt.schema.json",
  "recipe-manifest.schema.json",
];

const ROOT_ONLY_PUBLIC_EXAMPLES = [
  "agent-semantic-result-v2.blocked.valid.json",
  "agent-semantic-result-v2.failed.valid.json",
  "agent-semantic-result-v2.needs-context.valid.json",
  "agent-semantic-result-v2.valid.json",
  "execution-receipt-v1.valid.json",
  "execution-receipt-v2.valid.json",
  "runner-result-manifest-v1.legacy.json",
];

const main = defineScript({
  name: "sync-schemas",
  async run({ argv }) {
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
        label: "workflow schema",
        rendered: await format(renderWorkflowFrontMatterSchemaJson(), { parser: "json" }),
        targets: schemaTargets("workflow.schema.json"),
      },
      {
        label: "workflow v1 fixture",
        rendered: renderWorkflowV1FrontMatterFixtureJson(),
        targets: [path.join(repoRoot, "packages", "spec", "examples", "workflow-v1.json")],
      },
      {
        label: "workflow v2 fixture",
        rendered: renderWorkflowV2FrontMatterFixtureJson(),
        targets: [path.join(repoRoot, "packages", "spec", "examples", "workflow-v2.json")],
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
        label: "runner handoff schema",
        rendered: renderAgentPlaneRunnerHandoffSchemaJson(),
        targets: schemaTargets("runner-handoff.schema.json"),
      },
      {
        label: "task observation schema",
        rendered: renderTaskObservationSchemaJson(),
        targets: schemaTargets("task-observation.schema.json"),
      },
      {
        label: "agent semantic result schema",
        rendered: renderAgentSemanticResultSchemaJson(),
        targets: [path.join(repoRoot, "schemas", "agent-semantic-result.schema.json")],
      },
      {
        label: "agent semantic result v2 valid example",
        rendered: await format(renderAgentSemanticResultV2ValidFixtureJson(), {
          parser: "json",
          printWidth: 100,
        }),
        targets: [
          path.join(repoRoot, "schemas", "examples", "agent-semantic-result-v2.valid.json"),
        ],
      },
      {
        label: "agent semantic result v2 blocked example",
        rendered: await format(renderAgentSemanticResultV2ValidFixtureJson("blocked"), {
          parser: "json",
          printWidth: 100,
        }),
        targets: [
          path.join(repoRoot, "schemas", "examples", "agent-semantic-result-v2.blocked.valid.json"),
        ],
      },
      {
        label: "agent semantic result v2 needs-context example",
        rendered: await format(renderAgentSemanticResultV2ValidFixtureJson("needs_context"), {
          parser: "json",
          printWidth: 100,
        }),
        targets: [
          path.join(
            repoRoot,
            "schemas",
            "examples",
            "agent-semantic-result-v2.needs-context.valid.json",
          ),
        ],
      },
      {
        label: "agent semantic result v2 failed example",
        rendered: await format(renderAgentSemanticResultV2ValidFixtureJson("failed"), {
          parser: "json",
          printWidth: 100,
        }),
        targets: [
          path.join(repoRoot, "schemas", "examples", "agent-semantic-result-v2.failed.valid.json"),
        ],
      },
      {
        label: "execution receipt schema",
        rendered: renderExecutionReceiptSchemaJson(),
        targets: [path.join(repoRoot, "schemas", "execution-receipt.schema.json")],
      },
      {
        label: "execution receipt v1 valid example",
        rendered: renderExecutionReceiptV1ValidFixtureJson(),
        targets: [path.join(repoRoot, "schemas", "examples", "execution-receipt-v1.valid.json")],
      },
      {
        label: "execution receipt v2 valid example",
        rendered: renderExecutionReceiptV2ValidFixtureJson(),
        targets: [path.join(repoRoot, "schemas", "examples", "execution-receipt-v2.valid.json")],
      },
      {
        label: "runner result manifest v1 legacy example",
        rendered: renderRunnerResultManifestV1LegacyFixtureJson(),
        targets: [
          path.join(repoRoot, "schemas", "examples", "runner-result-manifest-v1.legacy.json"),
        ],
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
    ["schemas/examples", ROOT_ONLY_PUBLIC_EXAMPLES],
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
        "Contract: runtime schemas are generated into root/spec/core; context schemas are static spec->core; the recipe schema is root-only.",
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
