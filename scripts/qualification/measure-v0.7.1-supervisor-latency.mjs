import { spawnSync } from "node:child_process";
import {
  chmodSync,
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import { roundMs, summarizeDurations } from "../lib/cli-benchmark-shared.mjs";
import {
  createQualificationCommandRunner,
  installPackedWorkspace,
  installPublishedAgentplane,
} from "../lib/qualification-packed-runtime.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { readQualificationSubjectIdentity } from "./release-qualification.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const BASELINE_VERSION = "0.6.26";
const PACKAGES = ["core", "recipes", "agentplane"];
const DEFAULT_COLD_RUNS = 20;
const DEFAULT_WARM_RUNS = 30;
const DEFAULT_WARMUPS = 2;
const REPOSITORY_SCAN_PATTERN =
  /^(?:branch|diff|for-each-ref|ls-files|merge-base|rev-list|rev-parse|show|status|symbolic-ref|worktree)\b/u;

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["subject", "out", "cold-runs", "warm-runs", "warmups"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (!flags.subject || !flags.out) throw new Error("--subject and --out are required");
  if (!/^[a-f0-9]{40}$/u.test(flags.subject)) {
    throw new Error("--subject must be a full 40-character Git commit SHA");
  }
  const coldRuns = Number.parseInt(flags["cold-runs"] ?? String(DEFAULT_COLD_RUNS), 10);
  const warmRuns = Number.parseInt(flags["warm-runs"] ?? String(DEFAULT_WARM_RUNS), 10);
  const warmups = Number.parseInt(flags.warmups ?? String(DEFAULT_WARMUPS), 10);
  if (!Number.isInteger(coldRuns) || coldRuns < DEFAULT_COLD_RUNS) {
    throw new Error(`--cold-runs must be an integer >= ${DEFAULT_COLD_RUNS}`);
  }
  if (!Number.isInteger(warmRuns) || warmRuns < DEFAULT_WARM_RUNS) {
    throw new Error(`--warm-runs must be an integer >= ${DEFAULT_WARM_RUNS}`);
  }
  if (!Number.isInteger(warmups) || warmups < 1) {
    throw new Error("--warmups must be an integer >= 1");
  }
  return {
    coldRuns,
    outputPath: path.resolve(flags.out),
    subject: flags.subject,
    warmRuns,
    warmups,
  };
}

const run = createQualificationCommandRunner(repoRoot);

function invoke(cliPath, argv, cwd, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...argv], {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      ...(options.env ?? {}),
    },
    maxBuffer: 32 * 1024 * 1024,
  });
}

function initializeFixture(root, cliPath, kind) {
  mkdirSync(root, { recursive: true });
  run("git", ["init", "-q", "-b", "main"], { cwd: root });
  run("git", ["config", "user.name", "AgentPlane Supervisor Latency"], { cwd: root });
  run("git", ["config", "user.email", "supervisor-latency@invalid.local"], { cwd: root });
  writeFileSync(path.join(root, "README.md"), "# Supervisor latency fixture\n", "utf8");
  run("git", ["add", "README.md"], { cwd: root });
  run("git", ["commit", "-qm", "seed supervisor latency fixture"], { cwd: root });
  const initialized = invoke(
    cliPath,
    [
      "init",
      "--setup-profile",
      "light",
      "--tool",
      "codex",
      "--workflow",
      "direct",
      "--hooks",
      "false",
      "--require-plan-approval",
      "false",
      "--require-network-approval",
      "true",
      "--recipes",
      "none",
      "--blueprints",
      "none",
      "--yes",
    ],
    root,
  );
  if (initialized.status !== 0) {
    throw new Error(`${kind} fixture initialization failed: ${initialized.stderr.trim()}`);
  }
}

function createTask(cliPath, root, state) {
  const created = invoke(
    cliPath,
    [
      "task",
      "new",
      "--title",
      `Supervisor latency ${state}`,
      "--description",
      "Prepare one bounded semantic task from deterministic context.",
      "--owner",
      "CODER",
      "--priority",
      "med",
      "--tag",
      "latency",
      "--verify",
      "Supervisor checks the exact deterministic receipt.",
    ],
    root,
  );
  if (created.status !== 0) throw new Error(`task creation failed: ${created.stderr.trim()}`);
  const taskId = created.stdout.trim();
  if (!/^\d{12}-[A-Z0-9]{6}$/u.test(taskId)) {
    throw new Error(`task creation returned an invalid id: ${taskId}`);
  }
  if (state === "ready") {
    const commands = [
      [
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1. Perform the bounded semantic change.\n2. Report the exact result.",
        "--updated-by",
        "CODER",
      ],
      ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR"],
      [
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: prepare the bounded semantic task.",
      ],
    ];
    for (const argv of commands) {
      const result = invoke(cliPath, argv, root);
      if (result.status !== 0) {
        throw new Error(`task ${state} setup failed: ${result.stderr.trim()}`);
      }
    }
  }
  run("git", ["add", "-A"], { cwd: root });
  run("git", ["commit", "-qm", `prepare ${state} task`], { cwd: root });
  return taskId;
}

function createGitProbe(root) {
  const bin = path.join(root, "probe-bin");
  mkdirSync(bin, { recursive: true });
  const probe = path.join(bin, "git");
  writeFileSync(
    probe,
    '#!/bin/sh\nprintf \'%s\\n\' "$*" >> "$AGENTPLANE_BENCH_PROCESS_LOG"\nexec /usr/bin/git "$@"\n',
    "utf8",
  );
  chmodSync(probe, 0o755);
  return bin;
}

function traceNodes(stderr) {
  const result = [];
  for (const line of stderr.split("\n")) {
    try {
      const event = JSON.parse(line);
      if (event.component === "preparation-graph" && event.event === "node") {
        result.push(event.details);
      }
    } catch {
      // Non-trace diagnostics remain available in the bounded stderr field.
    }
  }
  return result;
}

function preparedContextBytes(surfaceId, outputs) {
  if (surfaceId === "external_advance") {
    const packet = JSON.parse(outputs.at(-1));
    const exchangeDirectory = packet.exchange?.directory;
    const workOrderRef = packet.exchange?.work_order_ref;
    const workOrderPath =
      typeof exchangeDirectory === "string" && typeof workOrderRef === "string"
        ? path.resolve(exchangeDirectory, workOrderRef)
        : null;
    return {
      packet_bytes: Buffer.byteLength(outputs.at(-1), "utf8"),
      prepared_context_bytes:
        workOrderPath === null ? 0 : Buffer.byteLength(readFileSync(workOrderPath, "utf8"), "utf8"),
    };
  }
  if (surfaceId === "managed_run_preparation") {
    const prepared = JSON.parse(outputs.at(-1));
    return {
      packet_bytes: Buffer.byteLength(outputs.at(-1), "utf8"),
      prepared_context_bytes:
        Buffer.byteLength(readFileSync(prepared.bundle_path, "utf8"), "utf8") +
        Buffer.byteLength(readFileSync(prepared.bootstrap_path, "utf8"), "utf8"),
    };
  }
  return {
    packet_bytes: outputs.reduce((total, output) => total + Buffer.byteLength(output, "utf8"), 0),
    prepared_context_bytes: outputs.reduce(
      (total, output) => total + Buffer.byteLength(output, "utf8"),
      0,
    ),
  };
}

function measureSequence({ cliPath, commands, cwd, probeBin, logPath, surfaceId }) {
  writeFileSync(logPath, "", "utf8");
  const outputs = [];
  const stderr = [];
  const startedAt = performance.now();
  let exitCode = 0;
  let signal = null;
  for (const argv of commands) {
    const result = invoke(cliPath, argv, cwd, {
      env: {
        AGENTPLANE_BENCH_PROCESS_LOG: logPath,
        AGENTPLANE_TRACE: "1",
        PATH: `${probeBin}:/usr/bin:/bin`,
      },
    });
    outputs.push(result.stdout ?? "");
    stderr.push(result.stderr ?? "");
    if (result.status !== 0) {
      exitCode = result.status ?? 1;
      signal = result.signal;
      break;
    }
  }
  const durationMs = roundMs(performance.now() - startedAt);
  const gitCommands = readFileSync(logPath, "utf8").split("\n").filter(Boolean);
  const nodes = traceNodes(stderr.join("\n"));
  let context = { packet_bytes: 0, prepared_context_bytes: 0 };
  if (exitCode === 0) context = preparedContextBytes(surfaceId, outputs);
  return {
    duration_ms: durationMs,
    exit_code: exitCode,
    signal,
    logical_subprocess_count: commands.length + gitCommands.length,
    git_subprocess_count: gitCommands.length,
    repository_scan_count: gitCommands.filter((command) => REPOSITORY_SCAN_PATTERN.test(command))
      .length,
    git_snapshot_count: nodes.filter((node) => node.node === "git_snapshot").length,
    preparation_cache: Object.fromEntries(
      ["resolved", "reuse_candidate", "invalidated", "reused"].map((status) => [
        status,
        nodes.filter((node) => node.status === status).length,
      ]),
    ),
    ...context,
    stderr: stderr.join("\n").slice(-1000),
  };
}

function mean(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function summarizeNumbers(values) {
  return { ...summarizeDurations(values), sample_count: values.length, samples: values };
}

function confidenceInterval95(values) {
  const average = mean(values);
  const variance =
    values.length < 2
      ? 0
      : values.reduce((total, value) => total + (value - average) ** 2, 0) / (values.length - 1);
  const margin = 1.96 * Math.sqrt(variance / values.length);
  return { low_ms: roundMs(average - margin), high_ms: roundMs(average + margin) };
}

function summarizeSamples(samples) {
  const durations = samples.map((sample) => sample.duration_ms);
  const preparationCacheTotals = {};
  for (const sample of samples) {
    for (const [status, count] of Object.entries(sample.preparation_cache)) {
      preparationCacheTotals[status] = (preparationCacheTotals[status] ?? 0) + count;
    }
  }
  return {
    ...summarizeNumbers(durations),
    confidence_interval_95: confidenceInterval95(durations),
    logical_subprocess_count: summarizeNumbers(
      samples.map((sample) => sample.logical_subprocess_count),
    ),
    git_subprocess_count: summarizeNumbers(samples.map((sample) => sample.git_subprocess_count)),
    repository_scan_count: summarizeNumbers(samples.map((sample) => sample.repository_scan_count)),
    git_snapshot_count: summarizeNumbers(samples.map((sample) => sample.git_snapshot_count)),
    packet_bytes: summarizeNumbers(samples.map((sample) => sample.packet_bytes)),
    prepared_context_bytes: summarizeNumbers(
      samples.map((sample) => sample.prepared_context_bytes),
    ),
    preparation_cache_totals: preparationCacheTotals,
    exit_codes: [...new Set(samples.map((sample) => sample.exit_code))].toSorted(),
    stderr_tail: samples.findLast((sample) => sample.stderr)?.stderr ?? "",
  };
}

function compareSurface(id, baselineSamples, candidateSamples) {
  const baseline = summarizeSamples(baselineSamples);
  const candidate = summarizeSamples(candidateSamples);
  const ceiling = baseline.median_ms * 1.1;
  const p95Ceiling = baseline.p95_ms * 1.1;
  const passed =
    baseline.exit_codes.length === 1 &&
    baseline.exit_codes[0] === 0 &&
    candidate.exit_codes.length === 1 &&
    candidate.exit_codes[0] === 0 &&
    candidate.median_ms <= ceiling &&
    candidate.p95_ms <= p95Ceiling;
  return {
    id,
    baseline,
    candidate,
    delta_ms: roundMs(candidate.median_ms - baseline.median_ms),
    delta_ratio:
      baseline.median_ms === 0
        ? null
        : (candidate.median_ms - baseline.median_ms) / baseline.median_ms,
    threshold: {
      median_ms_maximum: roundMs(ceiling),
      p95_ms_maximum: roundMs(p95Ceiling),
      maximum_increase_ratio: 0.1,
    },
    verdict: passed ? "pass" : "fail",
  };
}

function invocationOrder(index) {
  return index % 2 === 0 ? ["baseline", "candidate"] : ["candidate", "baseline"];
}

function commandsFor(kind, surfaceId, taskId) {
  if (kind === "candidate") {
    return surfaceId === "external_advance"
      ? [["task", "advance", taskId, "--agent-json"]]
      : [["task", "run", taskId, "--dry-run", "--json"]];
  }
  return [
    ["task", "brief", taskId, "--json"],
    ["task", "next-action", taskId, "--explain", "--json"],
  ];
}

function measurePhase({
  phase,
  runs,
  warmups,
  tempRoot,
  probeBin,
  baselineCli,
  candidateCli,
  seeds,
}) {
  const result = [];
  for (const surface of ["external_advance", "managed_run_preparation"]) {
    const samples = { baseline: [], candidate: [] };
    const roots = {};
    if (phase === "warm") {
      for (const kind of ["baseline", "candidate"]) {
        roots[kind] = path.join(tempRoot, `${phase}-${surface}-${kind}`);
        cpSync(seeds[kind][surface].root, roots[kind], { recursive: true });
        for (let index = 0; index < warmups; index += 1) {
          measureSequence({
            cliPath: kind === "baseline" ? baselineCli : candidateCli,
            commands: commandsFor(kind, surface, seeds[kind][surface].taskId),
            cwd: roots[kind],
            probeBin,
            logPath: path.join(tempRoot, `probe-warmup-${surface}-${kind}-${index}.log`),
            surfaceId: kind === "baseline" ? "baseline_manual_preparation" : surface,
          });
        }
      }
    }
    for (let index = 0; index < runs; index += 1) {
      for (const kind of invocationOrder(index)) {
        const cliPath = kind === "baseline" ? baselineCli : candidateCli;
        let cwd = roots[kind];
        if (phase === "cold") {
          cwd = path.join(tempRoot, `${phase}-${surface}-${index}-${kind}`);
          cpSync(seeds[kind][surface].root, cwd, { recursive: true });
        }
        samples[kind].push(
          measureSequence({
            cliPath,
            commands: commandsFor(kind, surface, seeds[kind][surface].taskId),
            cwd,
            probeBin,
            logPath: path.join(tempRoot, `probe-${phase}-${surface}-${index}-${kind}.log`),
            surfaceId: kind === "baseline" ? "baseline_manual_preparation" : surface,
          }),
        );
        if (phase === "cold") rmSync(cwd, { recursive: true, force: true });
      }
    }
    result.push(compareSurface(surface, samples.baseline, samples.candidate));
  }
  return result;
}

export function validateSupervisorLatencyReport(report) {
  if (report?.schema_version !== 1 || report.kind !== "agentplane.v0.7.1_supervisor_latency") {
    throw new Error("supervisor latency report must use the v1 contract");
  }
  for (const phaseName of ["cold", "warm"]) {
    const expected = phaseName === "cold" ? DEFAULT_COLD_RUNS : DEFAULT_WARM_RUNS;
    const surfaces = report.phases?.[phaseName];
    if (!Array.isArray(surfaces) || surfaces.length !== 2) {
      throw new Error(`supervisor latency report omits ${phaseName} surfaces`);
    }
    for (const surface of surfaces) {
      for (const side of ["baseline", "candidate"]) {
        if (surface[side]?.sample_count < expected || surface[side].samples.length < expected) {
          throw new Error(`${phaseName}.${surface.id}.${side} requires ${expected} samples`);
        }
      }
    }
  }
  return report;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const sourceIdentity = readQualificationSubjectIdentity(repoRoot, options.subject);
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-supervisor-latency-"));
  const baselinePrefix = path.join(tempRoot, "baseline");
  const candidatePrefix = path.join(tempRoot, "candidate");
  const packDirectory = path.join(tempRoot, "packs");
  const cacheDirectory = path.join(repoRoot, ".agentplane", ".npm-cache");
  try {
    for (const directory of [baselinePrefix, candidatePrefix, packDirectory]) {
      mkdirSync(directory, { recursive: true });
    }
    const baselineCli = installPublishedAgentplane({
      run,
      prefix: baselinePrefix,
      cacheDirectory,
      version: BASELINE_VERSION,
    });
    const candidate = installPackedWorkspace({
      run,
      prefix: candidatePrefix,
      packDirectory,
      cacheDirectory,
      repoRoot,
      packageNames: PACKAGES,
    });
    const candidateCli = candidate.cli;
    const seeds = { baseline: {}, candidate: {} };
    for (const kind of ["baseline", "candidate"]) {
      const cliPath = kind === "baseline" ? baselineCli : candidateCli;
      for (const [surface, state] of [
        ["external_advance", "planned"],
        ["managed_run_preparation", "ready"],
      ]) {
        const root = path.join(tempRoot, `seed-${kind}-${surface}`);
        initializeFixture(root, cliPath, kind);
        seeds[kind][surface] = { root, taskId: createTask(cliPath, root, state) };
      }
    }
    const probeBin = createGitProbe(tempRoot);
    const phases = {
      cold: measurePhase({
        phase: "cold",
        runs: options.coldRuns,
        warmups: options.warmups,
        tempRoot,
        probeBin,
        baselineCli,
        candidateCli,
        seeds,
      }),
      warm: measurePhase({
        phase: "warm",
        runs: options.warmRuns,
        warmups: options.warmups,
        tempRoot,
        probeBin,
        baselineCli,
        candidateCli,
        seeds,
      }),
    };
    const failures = Object.entries(phases).flatMap(([phase, surfaces]) =>
      surfaces
        .filter((surface) => surface.verdict !== "pass")
        .map((surface) => `${phase}.${surface.id}`),
    );
    const report = validateSupervisorLatencyReport({
      schema_version: 1,
      kind: "agentplane.v0.7.1_supervisor_latency",
      subject: options.subject,
      source_identity: sourceIdentity,
      baseline_version: run(process.execPath, [baselineCli, "--version"], {
        cwd: seeds.baseline.external_advance.root,
      }).trim(),
      candidate_version: run(process.execPath, [candidateCli, "--version"], {
        cwd: seeds.candidate.external_advance.root,
      }).trim(),
      candidate_packages: candidate.packages.map(({ name, sha256, version }) => ({
        name,
        sha256,
        version,
      })),
      environment: {
        node: process.version,
        platform: process.platform,
        release: os.release(),
        arch: process.arch,
        cpu_count: os.cpus().length,
      },
      comparison_contract: {
        baseline:
          "v0.6.26 manual agent preparation: task brief --json plus task next-action --explain --json",
        candidate: {
          external_advance: "task advance --agent-json",
          managed_run_preparation: "task run --dry-run --json",
        },
        provider: "not invoked",
        threshold:
          "candidate median and p95 must each be no more than 10% above the semantic-equivalent v0.6.26 preparation path",
      },
      sample_contract: {
        cold_runs: options.coldRuns,
        warm_runs: options.warmRuns,
        warmups: options.warmups,
        order: "baseline/candidate order alternates by sample index",
        cold: "fresh recursive fixture copy per invocation; copy time excluded",
        warm: "persistent fixture per side after explicit unmeasured warmups",
        subprocesses:
          "logical count equals CLI launches plus Git commands observed through the isolated PATH probe",
        cache:
          "preparation graph statuses are observed from AGENTPLANE_TRACE; no cross-process result cache is inferred",
      },
      phases,
      failure_ids: failures,
      verdict: failures.length === 0 ? "pass" : "fail",
    });
    mkdirSync(path.dirname(options.outputPath), { recursive: true });
    writeFileSync(options.outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    process.stdout.write(
      `supervisor latency: ${report.verdict}; baseline=${report.baseline_version}; ` +
        `candidate=${report.candidate_version}; failures=${failures.join(",") || "none"}; ` +
        `out=${options.outputPath}\n`,
    );
    if (failures.length > 0) process.exitCode = 1;
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

if (isDirectRun(import.meta.url)) runScriptMain(main);
