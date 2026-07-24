import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

import { afterEach, expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const REPO_ROOT = process.cwd();
const COMPATIBILITY_CHECK = path.join(
  REPO_ROOT,
  "scripts/checks/check-compatibility-contract-baseline.mjs",
);
const EFFICIENCY_CHECK = path.join(REPO_ROOT, "scripts/checks/check-agent-efficiency-baseline.mjs");
const EFFICIENCY_MEASURE = path.join(REPO_ROOT, "scripts/bench/measure-agent-efficiency.mjs");
const COMPATIBILITY_BASELINE = path.join(
  REPO_ROOT,
  "scripts/baselines/v0.6.24-compatibility-contract.json",
);
const COMPATIBILITY_CANDIDATE = path.join(
  REPO_ROOT,
  "scripts/baselines/v0.7-compatibility-candidate.json",
);
const EFFICIENCY_BASELINE = path.join(
  REPO_ROOT,
  "scripts/baselines/agent-efficiency-pre-v0.7-main.json",
);
const EFFICIENCY_FIXTURES = path.join(REPO_ROOT, "scripts/bench/agent-efficiency-fixtures.json");
const EFFICIENCY_LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/agent-efficiency-baseline.mjs"),
).href;
const COMPATIBILITY_LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/compatibility-contract.mjs"),
).href;
const TARBALL_POLICY_LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/package-tarball-policy.mjs"),
).href;
const TEST_TIMEOUT_MS = 60_000;

const tempRoots: string[] = [];

type ScriptResult = { exitCode: number; stdout: string; stderr: string };

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((entry) => stableValue(entry));
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, stableValue(entry)]),
  );
}

function structuralHash(projection: unknown): string {
  const stable = `${JSON.stringify(stableValue(projection), null, 2)}\n`;
  return `sha256:${createHash("sha256").update(stable).digest("hex")}`;
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function runNode(args: string[]): Promise<ScriptResult> {
  try {
    const result = await execFileAsync(process.execPath, args, {
      cwd: REPO_ROOT,
      env: process.env,
      maxBuffer: 32 * 1024 * 1024,
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
    };
  } catch (error: unknown) {
    const execError = error as { code?: number; stdout?: string; stderr?: string };
    return {
      exitCode: Number.isInteger(execError.code) ? Number(execError.code) : 1,
      stdout: typeof execError.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError.stderr === "string" ? execError.stderr : String(error),
    };
  }
}

async function makeRepoTempRoot(): Promise<string> {
  const cacheRoot = path.join(REPO_ROOT, ".agentplane", "cache");
  await mkdir(cacheRoot, { recursive: true });
  const root = await mkdtemp(path.join(cacheRoot, "baseline-critical-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describeCritical("critical: v0.7 compatibility and agent-efficiency baselines", () => {
  it(
    "keeps the full compatibility surface and ten RF-04 scenarios reproducible",
    async () => {
      const compatibility = await runNode([COMPATIBILITY_CHECK]);
      const efficiency = await runNode([EFFICIENCY_CHECK]);

      expect(compatibility).toMatchObject({ exitCode: 0, stderr: "" });
      expect(compatibility.stdout).toContain("245commands/166args/774options");
      expect(compatibility.stdout).toContain(
        "candidate=approved:agentplane.compatibility.v0.7.cumulative",
      );
      expect(compatibility.stdout).toContain("surface:agent_facing_context_contracts");
      expect(efficiency).toMatchObject({ exitCode: 0, stderr: "" });
      expect(efficiency.stdout).toContain("10 RF-04 scenarios");
      expect(efficiency.stdout).toContain("timing_compared=false");

      const compatibilityBaseline = await readJson<{
        references: { exact_main: { section_digests: Record<string, string> } };
        sections: Record<string, unknown>;
        preexisting_drift: { changed_sections: string[] };
        published_registry: { packages: { files: unknown[] }[] };
      }>(COMPATIBILITY_BASELINE);
      const cliDigest = compatibilityBaseline.references.exact_main.section_digests.cli_topology;
      const cli = compatibilityBaseline.sections[cliDigest] as {
        command_count: number;
        positional_count: number;
        option_count: number;
        commands: unknown[];
      };
      expect(cli).toMatchObject({ command_count: 243, positional_count: 165, option_count: 767 });
      expect(cli.commands).toHaveLength(243);
      expect(compatibilityBaseline.preexisting_drift.changed_sections).toEqual([
        "agent_facing_context_contracts",
      ]);
      expect(
        compatibilityBaseline.published_registry.packages.reduce(
          (total, entry) => total + entry.files.length,
          0,
        ),
      ).toBe(162);
      expect(
        createHash("sha256")
          .update(await readFile(COMPATIBILITY_BASELINE))
          .digest("hex"),
      ).toBe("29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b");

      const compatibilityCandidate = await readJson<{
        schema_version: number;
        candidate_id: string;
        source_tasks: string[];
        candidate: { surface_sha256: string; section_digests: Record<string, string> };
      }>(COMPATIBILITY_CANDIDATE);
      expect(compatibilityCandidate).toMatchObject({
        schema_version: 2,
        candidate_id: "agentplane.compatibility.v0.7.cumulative",
        source_tasks: [
          "202607221846-4VB97J",
          "202607221846-YGWMA2",
          "202607230554-YFYT83",
          "202607221846-9XC1H0",
        ],
        candidate: {
          surface_sha256: "174782f185b73b4356df5e8e33ce722af7fb33b3e023d6460e1d498db3751dbd",
          section_digests: {
            cli_topology: "ba9b2aa5ec996c1cab5ccc64ecc0796a2381157442d44f73b6472a5406c75cda",
          },
        },
        contract_artifacts: {
          execution_receipt_schema: {
            path: "schemas/execution-receipt.schema.json",
            sha256: "2182ce7788ff3cffea246a15864c27350b6787555588ba1444fbc3fc5b0f3db9",
            comparison: "canonical_json_exact",
            source_task: "202607221846-9XC1H0",
          },
          core_execution_receipt_exports: {
            comparison: "required_named_reexports",
            source_task: "202607221846-9XC1H0",
            entrypoints: [
              {
                path: "packages/core/src/index.ts",
                module: "./schemas/index.js",
                required_symbols: expect.arrayContaining([
                  "EXECUTION_RECEIPT_V1_ZOD_SCHEMA",
                  "EXECUTION_RECEIPT_V2_ZOD_SCHEMA",
                  "ExecutionReceiptV1",
                  "ExecutionReceiptV2",
                  "renderExecutionReceiptV1ValidFixtureJson",
                  "renderExecutionReceiptV2ValidFixtureJson",
                ]) as unknown,
              },
              {
                path: "packages/core/src/schemas/index.ts",
                module: "../runner/execution-receipt.js",
                required_symbols: expect.arrayContaining([
                  "EXECUTION_RECEIPT_V1_ZOD_SCHEMA",
                  "EXECUTION_RECEIPT_V2_ZOD_SCHEMA",
                  "ExecutionReceiptV1",
                  "ExecutionReceiptV2",
                  "renderExecutionReceiptV1ValidFixtureJson",
                  "renderExecutionReceiptV2ValidFixtureJson",
                ]) as unknown,
              },
            ],
          },
        },
      });

      const efficiencyBaseline = await readJson<{
        scenario_count: number;
        structural_projection: {
          scenarios: {
            id: string;
            metrics: Record<string, { value: number | null; observability_gap: string | null }>;
            token_usage_by_role: Record<
              string,
              Record<string, { value: number | null; observability_gap: string | null }>
            >;
          }[];
        };
      }>(EFFICIENCY_BASELINE);
      expect(efficiencyBaseline.scenario_count).toBe(10);
      expect(efficiencyBaseline.structural_projection.scenarios.map((entry) => entry.id)).toEqual([
        "direct",
        "branch_pr",
        "context_assimilation",
        "stale_state",
        "approval_required",
        "missing_knowledge",
        "evaluator_rework",
        "scope_violation",
        "adapter_failure",
        "hermes_one_step",
      ]);
      for (const scenario of efficiencyBaseline.structural_projection.scenarios) {
        expect(scenario.metrics.llm_episodes).toMatchObject({
          value: null,
          observability_gap: "not_observed_at_pre_v0.7_main_anchor",
        });
        expect(scenario.metrics.lifecycle_calls).toMatchObject({
          value: null,
          observability_gap: "not_observed_at_pre_v0.7_main_anchor",
        });
        expect(scenario.metrics.preparation_latency_ms).toBeDefined();
        expect(scenario.metrics.context_search_latency_ms).toBeDefined();
        expect(scenario.metrics.retrieval_recall_proxy).toBeDefined();
        for (const usage of Object.values(scenario.token_usage_by_role)) {
          expect(Object.keys(usage).toSorted()).toEqual([
            "input_tokens",
            "output_tokens",
            "reasoning_tokens",
          ]);
        }
      }
    },
    TEST_TIMEOUT_MS,
  );

  it("detects extra CLI options and command-shell mutations before candidate review", async () => {
    const source = `
      import { diffCliTopology } from ${JSON.stringify(COMPATIBILITY_LIBRARY_URL)};
      const before = {
        cli_topology: {
          commands: [{
            id: ["example"],
            visibility: "user",
            group: "Example",
            args: [{ name: "id", required: true, variadic: false, valueHint: "<id>" }],
            options: [],
          }],
        },
      };
      const withExtraOption = structuredClone(before);
      withExtraOption.cli_topology.commands[0].options.push({
        name: "unsafe-extra",
        kind: "boolean",
        valueHint: null,
        default: false,
      });
      const withMutatedArg = structuredClone(before);
      withMutatedArg.cli_topology.commands[0].args[0].required = false;
      process.stdout.write(JSON.stringify({
        extra: diffCliTopology(before, withExtraOption),
        mutated: diffCliTopology(before, withMutatedArg),
      }));
    `;
    const result = await runNode(["--input-type=module", "--eval", source]);
    expect(result).toMatchObject({ exitCode: 0, stderr: "" });
    const payload = JSON.parse(result.stdout) as {
      extra: { added_options: { command: string; name: string }[] };
      mutated: { mutated_command_shells: { identity: string }[] };
    };
    expect(payload.extra.added_options).toEqual([
      expect.objectContaining({ command: "example", name: "unsafe-extra" }),
    ]);
    expect(payload.mutated.mutated_command_shells).toEqual([
      expect.objectContaining({ identity: "example" }),
    ]);
  });

  it(
    "rejects a self-rehashed baseline that relaxes a measured ceiling",
    async () => {
      const root = await makeRepoTempRoot();
      const baseline = await readJson<{
        structural_projection: {
          scenarios: { id: string; metrics: Record<string, { value: number | null }> }[];
        };
        structural_projection_sha256: string;
      }>(EFFICIENCY_BASELINE);
      const direct = baseline.structural_projection.scenarios.find(
        (entry) => entry.id === "direct",
      );
      expect(direct?.metrics.bundle_bytes.value).toBeTypeOf("number");
      direct!.metrics.bundle_bytes.value = Number(direct!.metrics.bundle_bytes.value) * 10;
      baseline.structural_projection_sha256 = structuralHash(baseline.structural_projection);
      const tamperedPath = path.join(root, "tampered-baseline.json");
      await writeJson(tamperedPath, baseline);

      const result = await runNode([EFFICIENCY_CHECK, "--baseline", tamperedPath]);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("not the deterministic output of its fixture registry");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "keeps the historical efficiency anchor immutable",
    async () => {
      const root = await makeRepoTempRoot();
      const fixturePath = path.join(root, "rewritten-historical-fixtures.json");
      const baselinePath = path.join(root, "rewritten-historical-baseline.json");
      const fixtures = await readJson<{
        provenance: { efficiency_anchor_commit: string };
      }>(EFFICIENCY_FIXTURES);
      fixtures.provenance.efficiency_anchor_commit = "a".repeat(40);
      await writeJson(fixturePath, fixtures);

      const measured = await runNode([
        EFFICIENCY_MEASURE,
        "--fixtures",
        fixturePath,
        "--out",
        baselinePath,
      ]);
      expect(measured.exitCode).toBe(0);

      const result = await runNode([
        EFFICIENCY_CHECK,
        "--fixtures",
        fixturePath,
        "--baseline",
        baselinePath,
      ]);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("historical efficiency anchor must remain");
    },
    TEST_TIMEOUT_MS,
  );

  it("preserves conditional-export order and shares the release tarball policy", async () => {
    const source = `
      import { packageSurface } from ${JSON.stringify(COMPATIBILITY_LIBRARY_URL)};
      import { isAllowedTarballPath, packageTarballPolicyContract } from ${JSON.stringify(
        TARBALL_POLICY_LIBRARY_URL,
      )};
      const importFirst = packageSurface("package.json", {
        exports: { ".": { import: "./dist/index.js", default: "./dist/fallback.js" } },
      });
      const defaultFirst = packageSurface("package.json", {
        exports: { ".": { default: "./dist/fallback.js", import: "./dist/index.js" } },
      });
      process.stdout.write(JSON.stringify({
        exportOrderChangesDigest: importFirst.normalized_sha256 !== defaultFirst.normalized_sha256,
        allowsJs: isAllowedTarballPath("dist/index.js", "@agentplaneorg/core"),
        allowsMap: isAllowedTarballPath("dist/index.js.map", "@agentplaneorg/core"),
        policySchemaVersion: packageTarballPolicyContract().schema_version,
        policyRegexFlags: packageTarballPolicyContract().allowed.library_dist_pattern.flags,
      }));
    `;
    const result = await runNode(["--input-type=module", "--eval", source]);
    expect(result).toMatchObject({ exitCode: 0, stderr: "" });
    expect(JSON.parse(result.stdout) as Record<string, unknown>).toEqual({
      exportOrderChangesDigest: true,
      allowsJs: true,
      allowsMap: false,
      policySchemaVersion: 1,
      policyRegexFlags: "u",
    });
  });

  it(
    "treats safety regressions as failures and quality improvements as non-comparable",
    async () => {
      const source = `
        import { readFileSync } from "node:fs";
        import { createHash } from "node:crypto";
        import { compareAgentEfficiencyMeasurements, stableJson, STRUCTURAL_COST_FIELDS } from ${JSON.stringify(
          EFFICIENCY_LIBRARY_URL,
        )};
        const baseline = JSON.parse(readFileSync(${JSON.stringify(EFFICIENCY_BASELINE)}, "utf8"));
        const rehash = (value) => "sha256:" + createHash("sha256").update(stableJson(value, 2) + "\\n").digest("hex");
        const regression = structuredClone(baseline);
        const regressionDirect = regression.structural_projection.scenarios.find((entry) => entry.id === "direct");
        regressionDirect.observed_outcomes.scope_violation = { value: true, provenance: "test", observability_gap: null };
        regressionDirect.observed_outcomes.verified_success = { value: false, provenance: "test", observability_gap: null };
        regressionDirect.metrics.bundle_bytes.value = 1;
        regression.structural_projection_sha256 = rehash(regression.structural_projection);
        const evidenceRegression = structuredClone(baseline);
        const evidenceRegressionDirect = evidenceRegression.structural_projection.scenarios.find((entry) => entry.id === "direct");
        evidenceRegressionDirect.metrics.evidence_observed_count = { value: 0, provenance: "test", observability_gap: null };
        evidenceRegressionDirect.metrics.evidence_claimed_count = { value: 10, provenance: "test", observability_gap: null };
        evidenceRegressionDirect.metrics.evidence_observed_to_claimed_ratio = { value: 0, provenance: "test", observability_gap: null };
        evidenceRegression.structural_projection_sha256 = rehash(evidenceRegression.structural_projection);
        const improvement = structuredClone(baseline);
        const improvementDirect = improvement.structural_projection.scenarios.find((entry) => entry.id === "direct");
        improvementDirect.expected_outcomes.rework_required = false;
        improvementDirect.metrics.bundle_bytes.value *= 10;
        improvement.structural_projection_sha256 = rehash(improvement.structural_projection);
        const latencyBaseline = structuredClone(baseline);
        const latencyCandidate = structuredClone(baseline);
        for (const payload of [latencyBaseline, latencyCandidate]) {
          const direct = payload.structural_projection.scenarios.find((entry) => entry.id === "direct");
          direct.metrics.preparation_latency_ms = { value: payload === latencyBaseline ? 100 : 1000, provenance: "test", observability_gap: null };
          payload.structural_projection_sha256 = rehash(payload.structural_projection);
        }
        process.stdout.write(JSON.stringify({
          regression: compareAgentEfficiencyMeasurements(regression, baseline),
          evidenceRegression: compareAgentEfficiencyMeasurements(evidenceRegression, baseline),
          improvement: compareAgentEfficiencyMeasurements(improvement, baseline),
          latency: compareAgentEfficiencyMeasurements(latencyCandidate, latencyBaseline),
          structuralCostFields: STRUCTURAL_COST_FIELDS,
        }));
      `;
      const result = await runNode(["--input-type=module", "--eval", source]);
      expect(result).toMatchObject({ exitCode: 0, stderr: "" });
      const payload = JSON.parse(result.stdout) as {
        regression: { failures: string[] };
        evidenceRegression: { failures: string[] };
        improvement: { failures: string[]; summaries: string[] };
        latency: { failures: string[] };
        structuralCostFields: string[];
      };
      expect(payload.regression.failures.join("\n")).toContain("quality regressions");
      expect(payload.evidenceRegression.failures.join("\n")).toContain(
        "observed evidence regressions",
      );
      expect(payload.improvement.failures).toEqual([]);
      expect(payload.improvement.summaries.join("\n")).toContain("non-comparable");
      expect(payload.latency.failures).toEqual([]);
      expect(payload.structuralCostFields).not.toContain("preparation_latency_ms");
      expect(payload.structuralCostFields).not.toContain("context_search_latency_ms");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "rejects an external candidate whose fixture registry is not committed at its anchor",
    async () => {
      const root = await makeRepoTempRoot();
      const fixturePath = path.join(root, "candidate-fixtures.json");
      const measurementPath = path.join(root, "candidate.json");
      await writeFile(fixturePath, await readFile(EFFICIENCY_FIXTURES, "utf8"), "utf8");

      const measured = await runNode([
        EFFICIENCY_MEASURE,
        "--fixtures",
        fixturePath,
        "--out",
        measurementPath,
      ]);
      expect(measured.exitCode).toBe(0);
      const result = await runNode([EFFICIENCY_CHECK, "--measurement", measurementPath]);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("fixture registry is not valid JSON at candidate anchor");
    },
    TEST_TIMEOUT_MS,
  );
});
