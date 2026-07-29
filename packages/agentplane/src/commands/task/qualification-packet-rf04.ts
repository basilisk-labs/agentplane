import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import type { VerificationCheckDetail } from "../shared/verification-details.js";
import {
  asNumber,
  asString,
  readJson,
  recordValue,
  type JsonRecord,
} from "./qualification-packet-json.js";

export type QualificationRf04Comparison = {
  main_baseline: {
    path: string;
    sha256: `sha256:${string}`;
    scenario_count: number;
    observed_scalar_cells: number;
    structural_projection_sha256: string | null;
    comparison_policy: JsonRecord;
  };
  replay_comparison: {
    baseline: ReplayMetricSnapshot;
    current_rebuild: ReplayMetricSnapshot;
    status: "exact_frozen_rebuild";
    verified_by_checks: string[];
    live_provider_measurement: "not_run_by_packet_builder";
  };
};

type ReplayMetricSnapshot = {
  path: string;
  sha256: `sha256:${string}`;
  structural_projection_sha256: string | null;
  diagnostics_sha256: string | null;
  coverage: JsonRecord;
  golden_outcomes: {
    verdict: string | null;
    match_count: number | null;
    mismatch_count: number | null;
    resolved_cells: number | null;
    values: {
      scenario_id: string;
      outcome: string;
      golden_expected: boolean | null;
      true_count: number | null;
      false_count: number | null;
      golden_match_count: number | null;
      golden_mismatch_count: number | null;
    }[];
  };
  provider_tokens: {
    scenario_id: string;
    role: string;
    input_tokens: JsonRecord | null;
    output_tokens: JsonRecord | null;
    reasoning_tokens: JsonRecord | null;
  }[];
  latency: { scenario_id: string; values: JsonRecord }[];
};

const RF04_CURRENT_REBUILD_FILE = "rf04-current-rebuild.v1.json";
const RF04_CAPTURE_SCRIPT = "scripts/bench/capture-agent-efficiency-replay.mjs";

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function relative(gitRoot: string, filePath: string): string {
  return path.relative(gitRoot, filePath).replaceAll("\\\\", "/");
}

function countObservedScalarCells(value: JsonRecord): number {
  const projection = recordValue(value.structural_projection);
  const scenarios = Array.isArray(projection.scenarios) ? projection.scenarios : [];
  let count = 0;
  for (const scenario of scenarios) {
    const metrics = recordValue(recordValue(scenario).metrics);
    for (const metric of Object.values(metrics)) {
      const cell = recordValue(metric);
      if (cell.value !== null && cell.value !== undefined) count += 1;
    }
  }
  return count;
}

function buildReplayMetricSnapshot(opts: {
  path: string;
  raw: string;
  replay: JsonRecord;
}): ReplayMetricSnapshot {
  const projection = recordValue(opts.replay.structural_projection);
  const scenarios = Array.isArray(projection.scenarios) ? projection.scenarios : [];
  const outcomes: ReplayMetricSnapshot["golden_outcomes"]["values"] = [];
  const providerTokens: ReplayMetricSnapshot["provider_tokens"] = [];
  for (const scenarioValue of scenarios) {
    const scenario = recordValue(scenarioValue);
    const scenarioId = asString(scenario.id) ?? "unknown";
    const resolvedOutcomes = recordValue(scenario.resolved_outcomes);
    for (const outcome of Object.keys(resolvedOutcomes).toSorted()) {
      const values = recordValue(resolvedOutcomes[outcome]);
      outcomes.push({
        scenario_id: scenarioId,
        outcome,
        golden_expected:
          typeof values.golden_expected === "boolean" ? values.golden_expected : null,
        true_count: asNumber(values.true_count),
        false_count: asNumber(values.false_count),
        golden_match_count: asNumber(values.golden_match_count),
        golden_mismatch_count: asNumber(values.golden_mismatch_count),
      });
    }
    const roles = recordValue(scenario.token_usage_by_role);
    for (const role of Object.keys(roles).toSorted()) {
      const metrics = recordValue(roles[role]);
      providerTokens.push({
        scenario_id: scenarioId,
        role,
        input_tokens: isRecord(metrics.input_tokens) ? metrics.input_tokens : null,
        output_tokens: isRecord(metrics.output_tokens) ? metrics.output_tokens : null,
        reasoning_tokens: isRecord(metrics.reasoning_tokens) ? metrics.reasoning_tokens : null,
      });
    }
  }
  const diagnostics = recordValue(opts.replay.diagnostics);
  const latency = (Array.isArray(diagnostics.scenarios) ? diagnostics.scenarios : []).map(
    (scenarioValue) => {
      const scenario = recordValue(scenarioValue);
      return {
        scenario_id: asString(scenario.id) ?? "unknown",
        values: recordValue(scenario.latency_ms),
      };
    },
  );
  const comparison = recordValue(opts.replay.golden_outcome_comparison);
  return {
    path: opts.path,
    sha256: sha256(opts.raw),
    structural_projection_sha256: asString(opts.replay.structural_projection_sha256),
    diagnostics_sha256: asString(opts.replay.diagnostics_sha256),
    coverage: recordValue(opts.replay.coverage),
    golden_outcomes: {
      verdict: asString(comparison.verdict),
      match_count: asNumber(comparison.golden_match_count),
      mismatch_count: asNumber(comparison.golden_mismatch_count),
      resolved_cells: asNumber(comparison.resolved_run_outcome_cells),
      values: outcomes,
    },
    provider_tokens: providerTokens,
    latency,
  };
}

function replayMeasurements(
  snapshot: ReplayMetricSnapshot,
): Omit<ReplayMetricSnapshot, "path" | "sha256"> {
  const { path: _path, sha256: _sha256, ...measurements } = snapshot;
  return measurements;
}

async function captureCurrentReplaySnapshot(opts: {
  gitRoot: string;
  taskId: string;
  workflowDir: string;
}): Promise<ReplayMetricSnapshot> {
  const outputPath = path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "evidence",
    RF04_CURRENT_REBUILD_FILE,
  );
  await mkdir(path.dirname(outputPath), { recursive: true });
  await execFileAsync(
    process.execPath,
    [path.join(opts.gitRoot, RF04_CAPTURE_SCRIPT), "--output", outputPath],
    {
      cwd: opts.gitRoot,
    },
  );
  const current = await readJson(outputPath, "RF-04 current replay rebuild");
  return buildReplayMetricSnapshot({
    path: relative(opts.gitRoot, outputPath),
    raw: current.raw,
    replay: current.value,
  });
}

export async function buildQualificationRf04Comparison(opts: {
  gitRoot: string;
  checks: readonly VerificationCheckDetail[];
  taskId: string;
  workflowDir: string;
}): Promise<QualificationRf04Comparison> {
  const mainPath = path.join(opts.gitRoot, "scripts/baselines/agent-efficiency-pre-v0.7-main.json");
  const replayPath = path.join(
    opts.gitRoot,
    "scripts/baselines/agent-efficiency-pre-v0.7-replay.json",
  );
  const [main, replay] = await Promise.all([
    readJson(mainPath, "RF-04 main baseline"),
    readJson(replayPath, "RF-04 replay baseline"),
  ]);
  const replaySnapshot = buildReplayMetricSnapshot({
    path: relative(opts.gitRoot, replayPath),
    raw: replay.raw,
    replay: replay.value,
  });
  const currentRebuild = await captureCurrentReplaySnapshot(opts);
  if (
    JSON.stringify(replayMeasurements(currentRebuild)) !==
    JSON.stringify(replayMeasurements(replaySnapshot))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification packet requires the current RF-04 replay rebuild to match every frozen replay measurement.",
    });
  }
  const verifiedByChecks = opts.checks
    .filter(
      (check) =>
        check.result === "pass" &&
        (check.command.includes("ci:contract") || check.command.includes("agent-efficiency")),
    )
    .map((check) => check.command);
  if (verifiedByChecks.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification packet requires a passing ci:contract or agent-efficiency verification check before it can claim an exact RF-04 rebuild.",
    });
  }
  return {
    main_baseline: {
      path: relative(opts.gitRoot, mainPath),
      sha256: sha256(main.raw),
      scenario_count: asNumber(main.value.scenario_count) ?? 0,
      observed_scalar_cells: countObservedScalarCells(main.value),
      structural_projection_sha256: asString(main.value.structural_projection_sha256),
      comparison_policy: recordValue(main.value.comparison_policy),
    },
    replay_comparison: {
      baseline: replaySnapshot,
      current_rebuild: currentRebuild,
      status: "exact_frozen_rebuild",
      verified_by_checks: verifiedByChecks,
      live_provider_measurement: "not_run_by_packet_builder",
    },
  };
}
