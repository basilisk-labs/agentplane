import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const samplesIndex = args.indexOf("--samples");
const samples = Math.max(1, Number.parseInt(args[samplesIndex + 1] ?? "5", 10));
const execute = args.includes("--execute");
const baseline = JSON.parse(
  readFileSync("scripts/baselines/verification-contract-small.json", "utf8"),
);
const changedFiles = [
  "packages/agentplane/src/shared/write-if-changed.ts",
  "packages/agentplane/src/shared/write-if-changed.test.ts",
];

function percentile(values, fraction) {
  const ordered = [...values].toSorted((left, right) => left - right);
  return ordered[Math.min(ordered.length - 1, Math.ceil(ordered.length * fraction) - 1)] ?? 0;
}

const durations = [];
let latestPlan = null;
const planOutput = execFileSync(
  process.execPath,
  [
    "scripts/checks/run-local-ci.mjs",
    "--mode",
    "fast",
    "--changed-files",
    changedFiles.join(","),
    "--json",
  ],
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
);
latestPlan = JSON.parse(planOutput);
for (let index = 0; index < samples; index += 1) {
  const started = performance.now();
  const output = execFileSync(
    process.execPath,
    [
      "scripts/checks/run-local-ci.mjs",
      "--mode",
      "fast",
      "--changed-files",
      changedFiles.join(","),
      ...(execute ? [] : ["--json"]),
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  durations.push(Math.round(performance.now() - started));
  if (!execute) latestPlan = JSON.parse(output);
}

const p50 = percentile(durations, 0.5);
const p95 = percentile(durations, 0.95);
const report = {
  schema_version: 1,
  kind: "verification_contract_benchmark",
  fixture: "small-localized-reversible-no-external-effects",
  execution_mode: execute ? "execute" : "plan",
  samples,
  durations_ms: durations,
  p50_ms: p50,
  p95_ms: p95,
  lifecycle_control_commands: 1,
  selected_groups: latestPlan?.steps?.filter((step) => !step.skipped).length ?? 5,
  duplicate_build_invocations:
    latestPlan?.steps?.filter((step) => step.label === "Build").length ?? 1,
  full_cli_regression_selected:
    latestPlan?.verification_contract?.requires_full_regression ?? false,
  thresholds: {
    p50_ms: 60_000,
    p95_ms: 120_000,
    lifecycle_control_commands: 3,
  },
  comparison: {
    baseline_anchor_commit: baseline.anchor_commit,
    baseline_route: baseline.route,
    baseline_full_cli_regression_selected: baseline.full_cli_regression_selected,
    baseline_selected_groups: baseline.selected_groups,
    baseline_duplicate_build_invocations: baseline.duplicate_build_invocations,
    baseline_samples: baseline.measurement.samples,
    baseline_p50_ms: baseline.measurement.p50_ms,
    baseline_p95_ms: baseline.measurement.p95_ms,
    p50_speedup: Number((baseline.measurement.p50_ms / Math.max(1, p50)).toFixed(2)),
    p95_speedup: Number((baseline.measurement.p95_ms / Math.max(1, p95)).toFixed(2)),
    selected_group_reduction:
      baseline.selected_groups - (latestPlan?.steps?.filter((step) => !step.skipped).length ?? 5),
    duplicate_build_reduction:
      baseline.duplicate_build_invocations -
      (latestPlan?.steps?.filter((step) => step.label === "Build").length ?? 1),
  },
};
report.ok =
  p50 <= report.thresholds.p50_ms &&
  p95 <= report.thresholds.p95_ms &&
  report.lifecycle_control_commands <= report.thresholds.lifecycle_control_commands &&
  report.selected_groups <= 5 &&
  report.duplicate_build_invocations === 1 &&
  report.comparison.selected_group_reduction > 0 &&
  report.comparison.duplicate_build_reduction > 0 &&
  report.full_cli_regression_selected === false;
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!report.ok) process.exitCode = 1;
