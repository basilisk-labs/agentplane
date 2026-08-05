import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import {
  cliRepoRootFromPath,
  interpolateArgs,
  readSuiteConfigMap,
  roundMs,
  summarizeDurations,
} from "../lib/cli-benchmark-shared.mjs";
import {
  createQualificationCommandRunner,
  installPackedWorkspace,
  installPublishedAgentplane,
} from "../lib/qualification-packed-runtime.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { readQualificationSubjectIdentity } from "./release-qualification.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const suiteConfigPath = path.join(repoRoot, "scripts", "cli-walltime-suites.json");
const BASELINE_VERSION = "0.6.26";
const PACKAGES = ["core", "recipes", "agentplane"];
const DEFAULT_RUNS = 20;
const DEFAULT_WARMUPS = 2;
const SPOTLIGHT_EXCLUSION_MARKER = ".metadata_never_index";

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["subject", "out", "runs", "warmups"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (!flags.subject || !flags.out) throw new Error("--subject and --out are required");
  if (!/^[a-f0-9]{40}$/u.test(flags.subject)) {
    throw new Error("--subject must be a full 40-character Git commit SHA");
  }
  const runs = Number.parseInt(flags.runs ?? String(DEFAULT_RUNS), 10);
  const warmups = Number.parseInt(flags.warmups ?? String(DEFAULT_WARMUPS), 10);
  if (!Number.isInteger(runs) || runs < 20) {
    throw new Error("--runs must be an integer >= 20");
  }
  if (!Number.isInteger(warmups) || warmups < 1) {
    throw new Error("--warmups must be an integer >= 1");
  }
  return { outputPath: path.resolve(flags.out), runs, subject: flags.subject, warmups };
}

const run = createQualificationCommandRunner(repoRoot);

export function createMatchedLatencyTempRoot(systemTempRoot = os.tmpdir()) {
  const tempRoot = mkdtempSync(path.join(systemTempRoot, "agentplane-matched-cli-latency-"));
  writeFileSync(path.join(tempRoot, SPOTLIGHT_EXCLUSION_MARKER), "", "utf8");
  return tempRoot;
}

function initializeFixture(root, baselineCli) {
  run("git", ["init", "-q", "-b", "main"], { cwd: root });
  run("git", ["config", "user.name", "AgentPlane Latency Qualification"], { cwd: root });
  run("git", ["config", "user.email", "latency@example.com"], { cwd: root });
  writeFileSync(path.join(root, "README.md"), "# Matched latency fixture\n", "utf8");
  run("git", ["add", "README.md"], { cwd: root });
  run("git", ["commit", "-m", "seed"], { cwd: root });
  run(
    process.execPath,
    [
      baselineCli,
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ],
    { cwd: root },
  );
  run(
    process.execPath,
    [
      baselineCli,
      "task",
      "new",
      "--title",
      "Matched latency fixture",
      "--description",
      "Provide stable task list and search data",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "benchmark",
    ],
    { cwd: root },
  );
}

function measuredInvocation(cliPath, argv, cwd) {
  const startedAt = performance.now();
  const result = spawnSync(process.execPath, [cliPath, ...argv], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
    maxBuffer: 10 * 1024 * 1024,
  });
  return {
    duration_ms: roundMs(performance.now() - startedAt),
    exit_code: result.status,
    signal: result.signal,
    stderr: result.stderr ?? "",
  };
}

function fixtureCopy(source, destination) {
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
}

export function compareMatchedLatencySamples({
  id,
  baselineDurations,
  candidateDurations,
  baselineExitCode,
  candidateExitCode,
  baselineStderr = "",
  candidateStderr = "",
}) {
  const baseline = summarizeDurations(baselineDurations);
  const candidate = summarizeDurations(candidateDurations);
  const deltaMs = roundMs(candidate.median_ms - baseline.median_ms);
  const deltaRatio = baseline.median_ms === 0 ? null : deltaMs / baseline.median_ms;
  const passed =
    baselineExitCode === 0 &&
    candidateExitCode === 0 &&
    candidate.median_ms <= baseline.median_ms &&
    candidate.p95_ms <= baseline.p95_ms * 1.1;
  return {
    id,
    baseline: {
      ...baseline,
      sample_count: baselineDurations.length,
      samples_ms: baselineDurations,
      exit_code: baselineExitCode,
      stderr: baselineStderr.slice(-500),
    },
    candidate: {
      ...candidate,
      sample_count: candidateDurations.length,
      samples_ms: candidateDurations,
      exit_code: candidateExitCode,
      stderr: candidateStderr.slice(-500),
    },
    delta_ms: deltaMs,
    delta_ratio: deltaRatio,
    verdict: passed ? "pass" : "fail",
  };
}

function invocationOrder(index, baseline, candidate) {
  return index % 2 === 0 ? [baseline, candidate] : [candidate, baseline];
}

function aggregateSamples(commands, side) {
  const sampleCount = commands[0]?.[side]?.samples_ms.length ?? 0;
  return Array.from({ length: sampleCount }, (_unused, sampleIndex) =>
    roundMs(
      commands.reduce((total, command) => total + (command[side].samples_ms[sampleIndex] ?? 0), 0),
    ),
  );
}

function providerExcludedTimeToVerified(commands) {
  return {
    definition:
      "sum of the matched deterministic CLI command wall times at each sample index; fixture cloning, package installation, harness setup, and provider execution are excluded",
    ...compareMatchedLatencySamples({
      id: "provider_excluded_time_to_verified",
      baselineDurations: aggregateSamples(commands, "baseline"),
      candidateDurations: aggregateSamples(commands, "candidate"),
      baselineExitCode: commands.every((command) => command.baseline.exit_code === 0) ? 0 : 1,
      candidateExitCode: commands.every((command) => command.candidate.exit_code === 0) ? 0 : 1,
    }),
  };
}

function measurementCapture(id) {
  const state = {
    baseline: { durations: [], exitCode: null, stderr: "" },
    candidate: { durations: [], exitCode: null, stderr: "" },
  };
  return {
    record(kind, result) {
      state[kind].durations.push(result.duration_ms);
      state[kind].exitCode = result.exit_code;
      state[kind].stderr = result.stderr;
    },
    comparison() {
      return compareMatchedLatencySamples({
        id,
        baselineDurations: state.baseline.durations,
        candidateDurations: state.candidate.durations,
        baselineExitCode: state.baseline.exitCode,
        candidateExitCode: state.candidate.exitCode,
        baselineStderr: state.baseline.stderr,
        candidateStderr: state.candidate.stderr,
      });
    },
  };
}

function measureWarmPhase({
  baselineCli,
  candidateCli,
  baselineFixtureRoot,
  candidateFixtureRoot,
  runs,
  warmups,
  suite,
}) {
  const commands = [];

  for (const spec of suite.commands) {
    const baselineArgv = interpolateArgs(spec.argv, {
      root: baselineFixtureRoot,
      repoRoot: cliRepoRootFromPath(baselineCli),
    });
    const candidateArgv = interpolateArgs(spec.argv, {
      root: candidateFixtureRoot,
      repoRoot: cliRepoRootFromPath(candidateCli),
    });
    for (let index = 0; index < warmups; index += 1) {
      measuredInvocation(baselineCli, baselineArgv, baselineFixtureRoot);
      measuredInvocation(candidateCli, candidateArgv, candidateFixtureRoot);
    }
    const capture = measurementCapture(spec.id);
    for (let index = 0; index < runs; index += 1) {
      const order = invocationOrder(
        index,
        ["baseline", baselineCli, baselineArgv, baselineFixtureRoot],
        ["candidate", candidateCli, candidateArgv, candidateFixtureRoot],
      );
      for (const [kind, cliPath, argv, cwd] of order) {
        const result = measuredInvocation(cliPath, argv, cwd);
        capture.record(kind, result);
      }
    }
    commands.push(capture.comparison());
  }
  return { commands, provider_excluded_time_to_verified: providerExcludedTimeToVerified(commands) };
}

function measureColdPhase({ baselineCli, candidateCli, fixtureSeed, coldRoot, runs, suite }) {
  const commands = [];
  for (const spec of suite.commands) {
    const capture = measurementCapture(spec.id);
    for (let index = 0; index < runs; index += 1) {
      const order = invocationOrder(index, ["baseline", baselineCli], ["candidate", candidateCli]);
      for (const [kind, cliPath] of order) {
        const fixtureRoot = path.join(coldRoot, `${spec.id}-${String(index)}-${kind}`);
        fixtureCopy(fixtureSeed, fixtureRoot);
        const argv = interpolateArgs(spec.argv, {
          root: fixtureRoot,
          repoRoot: cliRepoRootFromPath(cliPath),
        });
        const result = measuredInvocation(cliPath, argv, fixtureRoot);
        rmSync(fixtureRoot, { recursive: true, force: true });
        capture.record(kind, result);
      }
    }
    commands.push(capture.comparison());
  }
  return { commands, provider_excluded_time_to_verified: providerExcludedTimeToVerified(commands) };
}

export function validateMatchedLatencyReport(report) {
  if (report.schema_version !== 2 || report.kind !== "agentplane.v0.7.1_matched_cli_latency") {
    throw new Error("matched CLI latency report must use schema_version=2");
  }
  for (const phaseName of ["cold", "warm"]) {
    const phase = report.phases?.[phaseName];
    if (!phase || !Array.isArray(phase.commands) || phase.commands.length === 0) {
      throw new Error(`matched CLI latency report omits ${phaseName} commands`);
    }
    for (const command of [phase.provider_excluded_time_to_verified, ...phase.commands]) {
      for (const side of ["baseline", "candidate"]) {
        if (command?.[side]?.sample_count < 20 || command[side].samples_ms.length < 20) {
          throw new Error(`${phaseName}.${command?.id ?? "unknown"}.${side} requires 20 samples`);
        }
      }
    }
  }
  return report;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const sourceIdentity = readQualificationSubjectIdentity(repoRoot, options.subject);
  const tempRoot = createMatchedLatencyTempRoot();
  const baselinePrefix = path.join(tempRoot, "baseline");
  const candidatePrefix = path.join(tempRoot, "candidate");
  const packDirectory = path.join(tempRoot, "packs");
  const fixtureSeed = path.join(tempRoot, "fixture-seed");
  const baselineWarmFixture = path.join(tempRoot, "fixture-warm-baseline");
  const candidateWarmFixture = path.join(tempRoot, "fixture-warm-candidate");
  const coldRoot = path.join(tempRoot, "fixture-cold");
  const cacheDirectory = path.join(repoRoot, ".agentplane", ".npm-cache");
  try {
    for (const directory of [
      baselinePrefix,
      candidatePrefix,
      packDirectory,
      fixtureSeed,
      coldRoot,
    ]) {
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
    initializeFixture(fixtureSeed, baselineCli);
    fixtureCopy(fixtureSeed, baselineWarmFixture);
    fixtureCopy(fixtureSeed, candidateWarmFixture);
    const baselineVersion = run(process.execPath, [baselineCli, "--version"], {
      cwd: fixtureSeed,
    }).trim();
    const candidateVersion = run(process.execPath, [candidateCli, "--version"], {
      cwd: fixtureSeed,
    }).trim();
    if (baselineVersion !== BASELINE_VERSION) {
      throw new Error(`expected baseline ${BASELINE_VERSION}, got ${baselineVersion}`);
    }
    const config = readSuiteConfigMap(suiteConfigPath);
    const suite = config.suites.get("cli_walltime_baseline");
    if (!suite) throw new Error("cli_walltime_baseline suite is missing");
    const phases = {
      cold: measureColdPhase({
        baselineCli,
        candidateCli,
        fixtureSeed,
        coldRoot,
        runs: options.runs,
        suite,
      }),
      warm: measureWarmPhase({
        baselineCli,
        candidateCli,
        baselineFixtureRoot: baselineWarmFixture,
        candidateFixtureRoot: candidateWarmFixture,
        runs: options.runs,
        warmups: options.warmups,
        suite,
      }),
    };
    const failures = Object.entries(phases).flatMap(([phase, result]) =>
      [result.provider_excluded_time_to_verified, ...result.commands]
        .filter((command) => command.verdict !== "pass")
        .map((command) => `${phase}.${command.id}`),
    );
    const result = validateMatchedLatencyReport({
      schema_version: 2,
      kind: "agentplane.v0.7.1_matched_cli_latency",
      subject: options.subject,
      source_identity: sourceIdentity,
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
      baseline_version: baselineVersion,
      candidate_version: candidateVersion,
      sample_contract: {
        runs_per_phase: options.runs,
        warmups_before_warm_phase_per_command: options.warmups,
        cold: "one invocation in a fresh copy of the identical initialized fixture; fixture-copy time is excluded",
        warm: "one invocation in a persistent per-subject fixture after explicit unmeasured warmups",
        process:
          "every sample launches a new Node.js process; baseline/candidate order alternates by sample index",
        os_cache: "not reset; alternating order controls shared host-cache drift",
        host_indexing:
          "the disposable benchmark root contains .metadata_never_index before package installation and fixture copies",
        provider: "not invoked",
      },
      comparison:
        "for every command and provider-excluded aggregate in both phases: candidate_median_ms <= baseline_median_ms and candidate_p95_ms <= baseline_p95_ms * 1.10",
      phases,
      failure_ids: failures,
      verdict: failures.length === 0 ? "pass" : "fail",
    });
    mkdirSync(path.dirname(options.outputPath), { recursive: true });
    writeFileSync(options.outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
    process.stdout.write(
      `matched CLI latency: ${result.verdict}; baseline=${baselineVersion}; candidate=${candidateVersion}; failures=${result.failure_ids.join(",") || "none"}; out=${options.outputPath}\n`,
    );
    if (failures.length > 0) process.exitCode = 1;
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

if (isDirectRun(import.meta.url)) runScriptMain(main);
