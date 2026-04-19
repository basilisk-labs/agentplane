import { readFile } from "node:fs/promises";
import path from "node:path";

import { validateConfig } from "../packages/core/src/config/config.ts";
import {
  AgentplaneConfigSchema,
  formatAgentplaneConfigIssues,
} from "../packages/core/src/config/config-zod.ts";

const repoRoot = process.cwd();
const deprecatedConfigKeys = ["base_branch"];

function clone(value) {
  return structuredClone(value);
}

function sanitizeDeprecatedKeys(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return raw;
  }
  const sanitized = clone(raw);
  for (const key of deprecatedConfigKeys) {
    delete sanitized[key];
  }
  return sanitized;
}

function captureRuntimeValidation(raw) {
  try {
    const value = validateConfig(clone(raw));
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function captureSchemaValidation(raw) {
  const parsed = AgentplaneConfigSchema.safeParse(sanitizeDeprecatedKeys(raw));
  if (parsed.success) {
    return { ok: true, value: parsed.data };
  }
  return {
    ok: false,
    error: formatAgentplaneConfigIssues(parsed.error.issues),
  };
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}

async function loadExampleConfig() {
  const filePath = path.join(repoRoot, "packages", "spec", "examples", "config.json");
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text);
}

async function loadCorePackageJson() {
  const filePath = path.join(repoRoot, "packages", "core", "package.json");
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text);
}

function buildScenarios(exampleConfig) {
  return [
    {
      name: "empty config defaults",
      input: {},
    },
    {
      name: "spec example config",
      input: exampleConfig,
    },
    {
      name: "custom runner enforcement",
      input: {
        runner: {
          default_adapter: "custom",
          custom: {
            command: ["custom-runner", "--bundle-from-env"],
            enforcement: {
              mode: "codex_sandbox_full_auto",
              platform: "macos",
            },
          },
        },
      },
    },
    {
      name: "deprecated base_branch is ignored by runtime wrapper",
      input: {
        base_branch: "main",
        workflow_mode: "branch_pr",
      },
    },
    {
      name: "invalid workflow mode",
      input: {
        workflow_mode: "nope",
      },
    },
    {
      name: "invalid integer field",
      input: {
        tasks: {
          id_suffix_length_default: 1.25,
        },
      },
    },
    {
      name: "invalid approvals boolean",
      input: {
        agents: {
          approvals: {
            require_network: "nope",
          },
        },
      },
    },
  ];
}

async function main() {
  const [exampleConfig, corePackage] = await Promise.all([
    loadExampleConfig(),
    loadCorePackageJson(),
  ]);
  const scenarios = buildScenarios(exampleConfig);
  const mismatches = [];

  for (const scenario of scenarios) {
    const runtime = captureRuntimeValidation(scenario.input);
    const schema = captureSchemaValidation(scenario.input);

    if (runtime.ok !== schema.ok) {
      mismatches.push({
        name: scenario.name,
        reason: `result mismatch: runtime=${runtime.ok ? "ok" : "error"} schema=${schema.ok ? "ok" : "error"}`,
        runtime,
        schema,
      });
      continue;
    }

    if (runtime.ok && schema.ok && serialize(runtime.value) !== serialize(schema.value)) {
      mismatches.push({
        name: scenario.name,
        reason: "normalized output mismatch",
        runtime,
        schema,
      });
      continue;
    }

    if (!runtime.ok && !schema.ok && runtime.error !== schema.error) {
      mismatches.push({
        name: scenario.name,
        reason: "error message mismatch",
        runtime,
        schema,
      });
    }
  }

  const dependencies = corePackage.dependencies ?? {};
  const residualAjvDependencies = ["ajv", "ajv-formats"].filter((name) => name in dependencies);

  process.stdout.write(`Compared ${scenarios.length} config parity scenarios.\n`);
  process.stdout.write(
    "Config runtime source: packages/core/src/config/config.ts -> AgentplaneConfigSchema\n",
  );
  process.stdout.write(
    `Residual AJV package deps: ${residualAjvDependencies.join(", ") || "none"}\n`,
  );

  if (mismatches.length === 0) {
    process.stdout.write(
      "Parity OK: runtime wrapper and Zod schema produce identical sanitized outcomes.\n",
    );
    return;
  }

  process.stdout.write("\nDetected mismatches:\n");
  for (const mismatch of mismatches) {
    process.stdout.write(`- ${mismatch.name}: ${mismatch.reason}\n`);
    process.stdout.write(
      `  runtime: ${mismatch.runtime.ok ? serialize(mismatch.runtime.value) : mismatch.runtime.error}\n`,
    );
    process.stdout.write(
      `  schema: ${mismatch.schema.ok ? serialize(mismatch.schema.value) : mismatch.schema.error}\n`,
    );
  }
  process.exitCode = 1;
}

await main();
