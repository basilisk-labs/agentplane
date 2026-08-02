import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
import { isDirectRun, parseScriptArgs } from "../lib/script-runtime.mjs";
import { readQualificationSubjectIdentity } from "./release-qualification.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const suiteConfigPath = path.join(repoRoot, "scripts", "cli-walltime-suites.json");
const BASELINE_VERSION = "0.6.26";
const PACKAGES = ["core", "recipes", "agentplane"];
const RUNS = 7;
const WARMUPS = 1;

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["subject", "out"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (!flags.subject || !flags.out) throw new Error("--subject and --out are required");
  if (!/^[a-f0-9]{40}$/u.test(flags.subject)) {
    throw new Error("--subject must be a full 40-character Git commit SHA");
  }
  return { outputPath: path.resolve(flags.out), subject: flags.subject };
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      ...(options.env ?? {}),
    },
    maxBuffer: 128 * 1024 * 1024,
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function npmPack(packageDirectory, packDirectory, cacheDirectory) {
  const output = run("npm", ["pack", "--json", "--pack-destination", packDirectory], {
    cwd: packageDirectory,
    env: { NPM_CONFIG_CACHE: cacheDirectory },
  });
  const match = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(output);
  if (!match) throw new Error(`npm pack did not return JSON for ${packageDirectory}`);
  const entry = JSON.parse(match[2])[0];
  const tarballPath = path.join(packDirectory, entry.filename);
  return {
    name: entry.name,
    path: tarballPath,
    sha256: `sha256:${createHash("sha256").update(readFileSync(tarballPath)).digest("hex")}`,
    version: entry.version,
  };
}

function installedCli(prefix) {
  return path.join(prefix, "node_modules", "agentplane", "bin", "agentplane.js");
}

function installBaseline(prefix, cacheDirectory) {
  run(
    "npm",
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", `agentplane@${BASELINE_VERSION}`],
    { cwd: prefix, env: { NPM_CONFIG_CACHE: cacheDirectory } },
  );
  return installedCli(prefix);
}

function installCandidate(prefix, packDirectory, cacheDirectory) {
  const packages = PACKAGES.map((name) =>
    npmPack(path.join(repoRoot, "packages", name), packDirectory, cacheDirectory),
  );
  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      ...packages.map((item) => item.path),
    ],
    {
      cwd: prefix,
      env: { NPM_CONFIG_CACHE: cacheDirectory },
    },
  );
  return { cli: installedCli(prefix), packages };
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

function measuredInvocation(cliPath, argv) {
  const startedAt = performance.now();
  const result = spawnSync(process.execPath, [cliPath, ...argv], {
    cwd: cliRepoRootFromPath(cliPath),
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
    baselineExitCode === 0 && candidateExitCode === 0 && candidate.median_ms <= baseline.median_ms;
  return {
    id,
    baseline: { ...baseline, exit_code: baselineExitCode, stderr: baselineStderr.slice(-500) },
    candidate: {
      ...candidate,
      exit_code: candidateExitCode,
      stderr: candidateStderr.slice(-500),
    },
    delta_ms: deltaMs,
    delta_ratio: deltaRatio,
    verdict: passed ? "pass" : "fail",
  };
}

function measureMatched({ baselineCli, candidateCli, fixtureRoot }) {
  const config = readSuiteConfigMap(suiteConfigPath);
  const suite = config.suites.get("cli_walltime_baseline");
  if (!suite) throw new Error("cli_walltime_baseline suite is missing");
  const commands = [];

  for (const spec of suite.commands) {
    const baselineArgv = interpolateArgs(spec.argv, {
      root: fixtureRoot,
      repoRoot: cliRepoRootFromPath(baselineCli),
    });
    const candidateArgv = interpolateArgs(spec.argv, {
      root: fixtureRoot,
      repoRoot: cliRepoRootFromPath(candidateCli),
    });
    for (let index = 0; index < WARMUPS; index += 1) {
      measuredInvocation(baselineCli, baselineArgv);
      measuredInvocation(candidateCli, candidateArgv);
    }
    const baselineDurations = [];
    const candidateDurations = [];
    let baselineExitCode = null;
    let candidateExitCode = null;
    let baselineStderr = "";
    let candidateStderr = "";
    for (let index = 0; index < RUNS; index += 1) {
      const order =
        index % 2 === 0
          ? [
              ["baseline", baselineCli, baselineArgv],
              ["candidate", candidateCli, candidateArgv],
            ]
          : [
              ["candidate", candidateCli, candidateArgv],
              ["baseline", baselineCli, baselineArgv],
            ];
      for (const [kind, cliPath, argv] of order) {
        const result = measuredInvocation(cliPath, argv);
        if (kind === "baseline") {
          baselineDurations.push(result.duration_ms);
          baselineExitCode = result.exit_code;
          baselineStderr = result.stderr;
        } else {
          candidateDurations.push(result.duration_ms);
          candidateExitCode = result.exit_code;
          candidateStderr = result.stderr;
        }
      }
    }
    commands.push(
      compareMatchedLatencySamples({
        id: spec.id,
        baselineDurations,
        candidateDurations,
        baselineExitCode,
        candidateExitCode,
        baselineStderr,
        candidateStderr,
      }),
    );
  }
  return commands;
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const sourceIdentity = readQualificationSubjectIdentity(repoRoot, options.subject);
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-matched-cli-latency-"));
  const baselinePrefix = path.join(tempRoot, "baseline");
  const candidatePrefix = path.join(tempRoot, "candidate");
  const packDirectory = path.join(tempRoot, "packs");
  const fixtureRoot = path.join(tempRoot, "fixture");
  const cacheDirectory = path.join(repoRoot, ".agentplane", ".npm-cache");
  try {
    for (const directory of [baselinePrefix, candidatePrefix, packDirectory, fixtureRoot]) {
      mkdirSync(directory, { recursive: true });
    }
    const baselineCli = installBaseline(baselinePrefix, cacheDirectory);
    const candidate = installCandidate(candidatePrefix, packDirectory, cacheDirectory);
    const candidateCli = candidate.cli;
    initializeFixture(fixtureRoot, baselineCli);
    const baselineVersion = run(process.execPath, [baselineCli, "--version"], {
      cwd: fixtureRoot,
    }).trim();
    const candidateVersion = run(process.execPath, [candidateCli, "--version"], {
      cwd: fixtureRoot,
    }).trim();
    if (baselineVersion !== BASELINE_VERSION) {
      throw new Error(`expected baseline ${BASELINE_VERSION}, got ${baselineVersion}`);
    }
    const commands = measureMatched({ baselineCli, candidateCli, fixtureRoot });
    const failures = commands.filter((command) => command.verdict !== "pass");
    const result = {
      schema_version: 1,
      kind: "agentplane.v0.7.1_matched_cli_latency",
      subject: options.subject,
      source_identity: sourceIdentity,
      candidate_packages: candidate.packages.map(({ name, sha256, version }) => ({
        name,
        sha256,
        version,
      })),
      environment: { node: process.version, platform: process.platform, arch: process.arch },
      baseline_version: baselineVersion,
      candidate_version: candidateVersion,
      runs: RUNS,
      warmups: WARMUPS,
      comparison: "candidate_median_ms <= baseline_median_ms",
      commands,
      failure_ids: failures.map((command) => command.id),
      verdict: failures.length === 0 ? "pass" : "fail",
    };
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

if (isDirectRun(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
