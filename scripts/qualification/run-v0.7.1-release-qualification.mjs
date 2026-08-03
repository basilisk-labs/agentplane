import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildQualificationReport,
  qualificationExitCode,
  readQualificationSubjectIdentity,
  readQualificationManifest,
  renderDefectLedger,
  selectQualificationScenarios,
  substituteQualificationCommand,
} from "./release-qualification.mjs";
import {
  assertCodexBinary,
  CODEX_REPLAY_CLI_VERSION_ENV,
} from "../bench/internal/agent-efficiency-codex-runtime.mjs";
import { isDirectRun, parseScriptArgs } from "../lib/script-runtime.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const defaultManifestPath = path.join(
  repoRoot,
  "scripts",
  "qualification",
  "v0.7.1-release-qualification.json",
);

function helpText() {
  return [
    "Usage: node scripts/qualification/run-v0.7.1-release-qualification.mjs [options]",
    "",
    "Run the versioned AgentPlane 0.7.1 release qualification matrix.",
    "Audit mode executes every selected scenario and exits successfully after writing a complete",
    "classified defect ledger. Gate mode exits successfully only for a provider-qualified release.",
    "",
    "Options:",
    "  --mode <audit|gate>       Default: audit.",
    "  --profile <core|full>     Default: full. Gate requires full.",
    "  --provider                Run the bounded 50-run/55-episode provider scenario.",
    "  --subject <sha>           Exact candidate commit. Defaults to current HEAD in audit mode.",
    "  --codex-version <version> Exact Codex CLI version; required with --provider.",
    "  --scenario <id>           Select one scenario; repeatable through comma-separated ids.",
    "  --manifest <path>         Override the versioned manifest.",
    "  --out-dir <path>          Evidence directory under the repository.",
    "  --dry-run                 Validate and print the selected commands without executing them.",
    "  --help                    Show this help text.",
  ].join("\n");
}

function gitHead() {
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error("could not resolve the qualification subject from Git");
  return result.stdout.trim();
}

function parseArgs(argv) {
  const scenarioIds = [];
  const normalized = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--scenario") {
      const value = argv[index + 1];
      if (!value) throw new Error("--scenario requires a value");
      scenarioIds.push(...value.split(",").filter(Boolean));
      index += 1;
      continue;
    }
    if (arg.startsWith("--scenario=")) {
      scenarioIds.push(...arg.slice("--scenario=".length).split(",").filter(Boolean));
      continue;
    }
    normalized.push(arg);
  }
  const { flags, positionals } = parseScriptArgs(normalized, {
    valueFlags: ["mode", "profile", "subject", "codex-version", "manifest", "out-dir"],
    booleanFlags: ["provider", "dry-run", "help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const mode = flags.mode ?? "audit";
  const profile = flags.profile ?? "full";
  if (!new Set(["audit", "gate"]).has(mode)) throw new Error("--mode must be audit or gate");
  if (!new Set(["core", "full"]).has(profile)) throw new Error("--profile must be core or full");
  if (mode === "gate" && profile !== "full") throw new Error("gate mode requires --profile full");
  if (mode === "gate" && flags.provider !== true) {
    throw new Error(
      "gate mode requires --provider so release readiness cannot omit semantic evidence",
    );
  }
  if (mode === "gate" && scenarioIds.length > 0) {
    throw new Error("gate mode does not allow partial --scenario selection");
  }
  if (flags.provider === true && !flags["codex-version"]) {
    throw new Error("--provider requires --codex-version");
  }
  return {
    codexVersion: flags["codex-version"] ?? "",
    dryRun: flags["dry-run"] === true,
    help: flags.help === true,
    manifestPath: path.resolve(flags.manifest ?? defaultManifestPath),
    mode,
    outputDirectory: flags["out-dir"] ? path.resolve(flags["out-dir"]) : null,
    profile,
    provider: flags.provider === true,
    scenarioIds,
    subject: flags.subject ?? gitHead(),
  };
}

function assertOutputInsideRepository(runRepoRoot, outputDirectory) {
  const relative = path.relative(runRepoRoot, outputDirectory);
  if (relative === "" || relative === ".." || relative.startsWith(`..${path.sep}`)) {
    throw new Error("qualification --out-dir must be nested inside the repository");
  }
  const segments = relative.split(path.sep);
  const isReportsEvidence =
    segments[0] === ".agentplane" && segments[1] === "reports" && segments.length >= 3;
  const isTaskEvidence =
    segments[0] === ".agentplane" &&
    segments[1] === "tasks" &&
    segments.length >= 4 &&
    segments[3] === "evidence";
  if (!isReportsEvidence && !isTaskEvidence) {
    throw new Error(
      "qualification --out-dir must use .agentplane/reports/<run> or .agentplane/tasks/<task-id>/evidence",
    );
  }
}

export function readQualificationRunSubjectIdentity(runRepoRoot, subject, outputDirectory) {
  assertOutputInsideRepository(runRepoRoot, outputDirectory);
  return readQualificationSubjectIdentity(runRepoRoot, subject, {
    evidenceDirectory: outputDirectory,
  });
}

function defaultOutputDirectory() {
  const stamp = new Date().toISOString().replaceAll(":", "-").replace(".", "-");
  return path.join(repoRoot, ".agentplane", "reports", "v0.7.1-qualification", stamp);
}

function outputTail(value, maximum = 4000) {
  return value.length <= maximum ? value : value.slice(-maximum);
}

function runScenario(scenario, variables, outputDirectory) {
  const command = substituteQualificationCommand(scenario.command, variables);
  const logPath = path.join(outputDirectory, "logs", `${scenario.id}.log`);
  mkdirSync(path.dirname(logPath), { recursive: true });
  const started = performance.now();
  process.stdout.write(`qualification: ${scenario.id} (${scenario.tier})\n`);
  const result = spawnSync(command[0], command.slice(1), {
    cwd: repoRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      AGENTPLANE_QUALIFICATION_EVIDENCE_DIR: outputDirectory,
    },
    maxBuffer: 128 * 1024 * 1024,
    timeout: scenario.timeout_ms,
  });
  const durationMs = Math.round(performance.now() - started);
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  const combined = [stdout, stderr].filter(Boolean).join(stdout && stderr ? "\n" : "");
  writeFileSync(
    logPath,
    [
      `$ ${command.map((token) => JSON.stringify(token)).join(" ")}`,
      `exit_code=${result.status ?? "null"} signal=${result.signal ?? "none"} duration_ms=${durationMs}`,
      "",
      combined,
    ].join("\n"),
    "utf8",
  );
  const timedOut = result.error?.code === "ETIMEDOUT";
  const passed = !result.error && result.status === 0 && !result.signal;
  process.stdout.write(
    `qualification: ${scenario.id} ${passed ? "passed" : "failed"} in ${durationMs}ms\n`,
  );
  return {
    scenario,
    command,
    duration_ms: durationMs,
    exit_code: result.status,
    signal: result.signal,
    timed_out: timedOut,
    status: passed ? "passed" : "failed",
    log_path: logPath,
    output_tail: outputTail(combined),
  };
}

function printDryRun(scenarios, variables) {
  for (const scenario of scenarios) {
    const command = substituteQualificationCommand(scenario.command, variables);
    process.stdout.write(`${scenario.id} [${scenario.tier}]: ${command.join(" ")}\n`);
  }
}

export function preflightQualificationProviderRuntime(
  options,
  scenarios,
  verify = assertCodexBinary,
) {
  if (options.dryRun || !scenarios.some((scenario) => scenario.tier === "provider")) return null;
  return verify({ [CODEX_REPLAY_CLI_VERSION_ENV]: options.codexVersion });
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    process.stdout.write(`${helpText()}\n`);
    return;
  }
  const manifest = readQualificationManifest(options.manifestPath);
  const outputDirectory = options.outputDirectory ?? defaultOutputDirectory();
  const sourceIdentity = readQualificationRunSubjectIdentity(
    repoRoot,
    options.subject,
    outputDirectory,
  );
  const scenarios = selectQualificationScenarios(manifest, {
    profile: options.profile,
    provider: options.provider,
    scenarioIds: options.scenarioIds,
  });
  const relativeOutputDirectory = path.relative(repoRoot, outputDirectory);
  const variables = {
    candidateEvidence: options.provider
      ? path.join(".agentplane", "cache", "rf04-candidate", options.subject, "measurement.json")
      : path.join("scripts", "baselines", "agent-efficiency-v0.7-beta1-candidate.json"),
    codexVersion: options.codexVersion,
    evidenceDir: relativeOutputDirectory,
    repoRoot: ".",
    subject: options.subject,
  };
  if (options.dryRun) {
    printDryRun(scenarios, variables);
    return;
  }

  preflightQualificationProviderRuntime(options, scenarios);

  mkdirSync(outputDirectory, { recursive: true });
  const startedAt = new Date().toISOString();
  const results = scenarios.map((scenario) => runScenario(scenario, variables, outputDirectory));
  const finishedAt = new Date().toISOString();
  const report = buildQualificationReport({
    manifest,
    manifestPath: options.manifestPath,
    repoRoot,
    mode: options.mode,
    profile: options.profile,
    provider: options.provider,
    subject: options.subject,
    startedAt,
    finishedAt,
    results,
    sourceIdentity,
  });
  const reportPath = path.join(outputDirectory, "report.json");
  const ledgerPath = path.join(outputDirectory, "defects.md");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  writeFileSync(ledgerPath, renderDefectLedger(report), "utf8");
  process.stdout.write(
    `qualification report: ${path.relative(repoRoot, reportPath)}\n` +
      `qualification defects: ${path.relative(repoRoot, ledgerPath)}\n` +
      `qualification verdict: ${report.verdict} (${report.summary.passed}/${report.summary.selected} passed; ${report.summary.blocking} blocking)\n`,
  );
  process.exitCode = qualificationExitCode(report);
}

if (isDirectRun(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
