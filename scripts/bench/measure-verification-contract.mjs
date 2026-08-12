import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  evaluateLifecycleControlBudget,
  readLifecycleControlEvents,
} from "../lib/lifecycle-control-metrics.mjs";
import {
  evaluateVerificationBenchmarkQualification,
  percentile,
} from "../lib/verification-benchmark.mjs";

const args = process.argv.slice(2);

function readValue(flag) {
  const index = args.indexOf(flag);
  if (index !== -1) return args[index + 1] ?? "";
  const assignment = args.find((arg) => arg.startsWith(`${flag}=`));
  return assignment ? assignment.slice(`${flag}=`.length) : null;
}

const samples = Math.max(1, Number.parseInt(readValue("--samples") ?? "5", 10));
const execute = args.includes("--execute");
const outputPath = readValue("--output");
const evidenceDirectory = readValue("--evidence-dir");
for (const [flag, value] of [
  ["--output", outputPath],
  ["--evidence-dir", evidenceDirectory],
]) {
  if (value === "") throw new Error(`${flag} requires a path`);
}

const baseline = JSON.parse(
  readFileSync("scripts/baselines/verification-contract-small.json", "utf8"),
);
const changedFiles = [
  "packages/agentplane/src/shared/write-if-changed.ts",
  "packages/agentplane/src/shared/write-if-changed.test.ts",
];
const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "agentplane-verification-bench-"));
if (evidenceDirectory) mkdirSync(evidenceDirectory, { recursive: true });

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function commandOutput(command, commandArgs) {
  try {
    return execFileSync(command, commandArgs, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unavailable";
  }
}

function readMetrics(output) {
  for (const line of output.split("\n").toReversed()) {
    if (!line.trim().startsWith("{")) continue;
    try {
      const value = JSON.parse(line);
      if (value?.kind === "verification_metrics") return value;
    } catch {
      // Non-JSON check output is preserved in raw evidence and ignored by this parser.
    }
  }
  return null;
}

function writeEvidence(name, value) {
  if (!evidenceDirectory) return null;
  const target = path.join(evidenceDirectory, name);
  writeFileSync(target, value, "utf8");
  return path.relative(process.cwd(), target).split(path.sep).join("/");
}

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
const plan = JSON.parse(planOutput);
const sampleResults = [];

try {
  for (let index = 0; index < samples; index += 1) {
    const eventLogPath = path.join(temporaryDirectory, `sample-${index + 1}.events.jsonl`);
    const commandArgs = [
      "scripts/checks/run-local-ci.mjs",
      "--mode",
      "fast",
      "--changed-files",
      changedFiles.join(","),
      "--lifecycle-event-log",
      eventLogPath,
      ...(execute ? [] : ["--json"]),
    ];
    const started = performance.now();
    const result = spawnSync(process.execPath, commandArgs, {
      encoding: "utf8",
      maxBuffer: 128 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 20 * 60 * 1000,
    });
    const wallClockMs = Math.round(performance.now() - started);
    const stdout = String(result.stdout ?? "");
    const stderr = String(result.stderr ?? "");
    const metrics = execute ? readMetrics(stdout) : null;
    const events = readLifecycleControlEvents(eventLogPath);
    const lifecycleControl = evaluateLifecycleControlBudget(events, 3);
    const sampleName = `sample-${String(index + 1).padStart(2, "0")}`;
    const stdoutPath = writeEvidence(`${sampleName}.stdout.log`, stdout);
    const stderrPath = writeEvidence(`${sampleName}.stderr.log`, stderr);
    const eventsSource = readFileSync(eventLogPath, "utf8");
    const eventsPath = writeEvidence(`${sampleName}.events.jsonl`, eventsSource);
    const processOk = result.status === 0 && !result.signal && !result.error;
    sampleResults.push({
      index: index + 1,
      execution_mode: execute ? "execute" : "plan",
      wall_clock_ms: wallClockMs,
      process: {
        exit_code: result.status,
        signal: result.signal ?? null,
        error: result.error?.message ?? null,
        ok: processOk,
      },
      selected_groups:
        metrics?.selected_groups ?? plan.steps.filter((step) => !step.skipped).length,
      executed_groups: metrics?.executed_groups ?? 0,
      build_invocations:
        metrics?.build_invocations ?? plan.steps.filter((step) => step.label === "Build").length,
      verification_amplification: metrics?.verification_amplification ?? null,
      lifecycle_control: lifecycleControl,
      raw_evidence: {
        stdout_path: stdoutPath,
        stdout_sha256: sha256(stdout),
        stderr_path: stderrPath,
        stderr_sha256: sha256(stderr),
        command_events_path: eventsPath,
        command_events_sha256: sha256(eventsSource),
      },
      ok: processOk && lifecycleControl.ok && (!execute || metrics?.ok === true),
    });
  }
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });
}

const durations = sampleResults.map((sample) => sample.wall_clock_ms);
const p50 = percentile(durations, 0.5);
const p95 = percentile(durations, 0.95);
const selectedGroups = Math.max(...sampleResults.map((sample) => sample.selected_groups));
const buildInvocations = Math.max(...sampleResults.map((sample) => sample.build_invocations));
const lifecycleControlCommands = Math.max(
  ...sampleResults.map((sample) => sample.lifecycle_control.call_count),
);
const report = {
  schema_version: 2,
  kind: "verification_contract_benchmark",
  fixture: "small-localized-reversible-no-external-effects",
  execution_mode: execute ? "execute" : "plan",
  samples,
  collection: {
    subject_sha: commandOutput("git", ["rev-parse", "HEAD"]),
    collected_at: new Date().toISOString(),
    command: [process.execPath, "scripts/bench/measure-verification-contract.mjs", ...args],
    changed_files: changedFiles,
    hardware: {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      cpu_model: os.cpus()[0]?.model ?? "unknown",
      logical_cpu_count: os.cpus().length,
      total_memory_bytes: os.totalmem(),
      host_model: commandOutput("sysctl", ["-n", "hw.model"]),
    },
    runtime: {
      node: process.version,
      bun: commandOutput("bun", ["--version"]),
    },
  },
  sample_results: sampleResults,
  durations_ms: durations,
  p50_ms: p50,
  p95_ms: p95,
  lifecycle_control_commands: lifecycleControlCommands,
  lifecycle_control_collection: {
    definition: "maximum observed top-level AgentPlane verification control commands per sample",
    provenance: "observed_command_events",
  },
  selected_groups: selectedGroups,
  duplicate_build_invocations: buildInvocations,
  full_cli_regression_selected: plan.verification_contract?.requires_full_regression ?? false,
  verification_contract_digest: plan.verification_contract?.digest ?? null,
  thresholds: {
    p50_ms: 60_000,
    p95_ms: 120_000,
    lifecycle_control_commands: 3,
  },
  comparison: {
    baseline_anchor_commit: baseline.anchor_commit,
    baseline_collection: baseline.collection ?? null,
    baseline_route: baseline.route,
    baseline_full_cli_regression_selected: baseline.full_cli_regression_selected,
    baseline_selected_groups: baseline.selected_groups,
    baseline_duplicate_build_invocations: baseline.duplicate_build_invocations,
    baseline_samples: baseline.measurement.samples,
    baseline_p50_ms: baseline.measurement.p50_ms,
    baseline_p95_ms: baseline.measurement.p95_ms,
    p50_speedup: Number((baseline.measurement.p50_ms / Math.max(1, p50)).toFixed(2)),
    p95_speedup: Number((baseline.measurement.p95_ms / Math.max(1, p95)).toFixed(2)),
    selected_group_reduction: baseline.selected_groups - selectedGroups,
    duplicate_build_reduction: baseline.duplicate_build_invocations - buildInvocations,
  },
};
report.qualification = evaluateVerificationBenchmarkQualification(report);
report.ok = report.qualification.ok;
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (outputPath) {
  mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
  writeFileSync(outputPath, serialized, "utf8");
}
process.stdout.write(serialized);
if (execute && !report.ok) process.exitCode = 1;
