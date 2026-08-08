import { execFile, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildQualificationReport,
  qualificationExitCode,
  readProviderEvidenceEquivalence,
  readQualificationSubjectIdentity,
  readQualificationManifest,
  renderDefectLedger,
  selectQualificationScenarios,
  substituteQualificationCommand,
} from "./release-qualification.mjs";
import {
  assertCodexBinary,
  CODEX_REPLAY_BINARY_ENV,
  CODEX_REPLAY_CLI_VERSION_ENV,
} from "../bench/internal/agent-efficiency-codex-runtime.mjs";
import { readPinnedQualificationBaseline } from "../bench/capture-agent-efficiency-candidate.mjs";
import { isDirectRun, parseScriptArgs } from "../lib/script-runtime.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const defaultManifestPath = path.join(
  repoRoot,
  "scripts",
  "qualification",
  "v0.7.1-release-qualification.json",
);
const defaultProviderBaselineEvidencePath = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "agent-efficiency-v0.7-beta1-candidate.json",
);
const DEFAULT_QUALIFICATION_CONCURRENCY = 4;
const DEFAULT_PROVIDER_CONCURRENCY = 3;
const MAX_CHILD_OUTPUT_BYTES = 128 * 1024 * 1024;
const EXCLUSIVE_QUALIFICATION_SCENARIO_IDS = new Set([
  "cli-latency",
  "matched-cli-latency",
  "supervisor-latency",
]);

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
    `  --concurrency <count>     Independent qualification jobs. Default: ${DEFAULT_QUALIFICATION_CONCURRENCY}.`,
    `  --provider-concurrency <count>  Isolated provider replay jobs. Default: ${DEFAULT_PROVIDER_CONCURRENCY}.`,
    "  --provider-evidence-subject <sha>  Reuse immutable provider evidence only when every",
    "                              intervening change is explicitly provider-runtime-equivalent.",
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
    valueFlags: [
      "mode",
      "profile",
      "subject",
      "provider-evidence-subject",
      "codex-version",
      "manifest",
      "out-dir",
      "concurrency",
      "provider-concurrency",
    ],
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
  if (flags["provider-evidence-subject"] && flags.provider !== true) {
    throw new Error("--provider-evidence-subject requires --provider");
  }
  const subject = flags.subject ?? gitHead();
  const providerEvidenceSubject = flags["provider-evidence-subject"] ?? subject;
  if (!/^[a-f0-9]{40}$/u.test(providerEvidenceSubject)) {
    throw new Error("--provider-evidence-subject must be a full 40-character Git commit SHA");
  }
  const concurrency = parseConcurrency(
    flags.concurrency ?? String(DEFAULT_QUALIFICATION_CONCURRENCY),
    "--concurrency",
  );
  const providerConcurrency = parseConcurrency(
    flags["provider-concurrency"] ?? String(DEFAULT_PROVIDER_CONCURRENCY),
    "--provider-concurrency",
  );
  return {
    codexVersion: flags["codex-version"] ?? "",
    concurrency,
    dryRun: flags["dry-run"] === true,
    help: flags.help === true,
    manifestPath: path.resolve(flags.manifest ?? defaultManifestPath),
    mode,
    outputDirectory: flags["out-dir"] ? path.resolve(flags["out-dir"]) : null,
    providerBaselineEvidencePath: defaultProviderBaselineEvidencePath,
    providerEvidenceSubject,
    profile,
    provider: flags.provider === true,
    providerConcurrency,
    scenarioIds,
    subject,
  };
}

function parseConcurrency(value, flag) {
  const concurrency = Number.parseInt(value, 10);
  if (!/^\d+$/u.test(value) || !Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error(`${flag} must be an integer >= 1`);
  }
  return concurrency;
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

function executeFile(command, args, options) {
  return new Promise((resolve) => {
    execFile(
      command,
      args,
      {
        ...options,
        encoding: "utf8",
        killSignal: "SIGKILL",
        maxBuffer: MAX_CHILD_OUTPUT_BYTES,
      },
      (error, stdout, stderr) => {
        resolve({
          error,
          signal: error?.signal ?? null,
          status: error == null ? 0 : Number.isInteger(error.code) ? error.code : null,
          stderr: stderr ?? "",
          stdout: stdout ?? "",
          timedOut: error?.killed === true && error.signal === "SIGKILL",
        });
      },
    );
  });
}

async function runScenario(scenario, variables, outputDirectory) {
  const command = substituteQualificationCommand(scenario.command, variables);
  const logPath = path.join(outputDirectory, "logs", `${scenario.id}.log`);
  mkdirSync(path.dirname(logPath), { recursive: true });
  const started = performance.now();
  process.stdout.write(`qualification: ${scenario.id} (${scenario.tier})\n`);
  const result = await executeFile(command[0], command.slice(1), {
    cwd: repoRoot,
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      AGENTPLANE_QUALIFICATION_EVIDENCE_DIR: outputDirectory,
    },
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
  const timedOut = result.timedOut;
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

function createBoundedExecutor(concurrency) {
  const pending = [];
  let active = 0;

  function drain() {
    while (active < concurrency && pending.length > 0) {
      const entry = pending.shift();
      active += 1;
      Promise.resolve()
        .then(entry.work)
        .then(entry.resolve, entry.reject)
        .finally(() => {
          active -= 1;
          drain();
        })
        .catch(entry.reject);
    }
  }

  return (work) =>
    new Promise((resolve, reject) => {
      pending.push({ reject, resolve, work });
      drain();
    });
}

export async function runQualificationScenarios(
  scenarios,
  variables,
  outputDirectory,
  options = {},
) {
  const concurrency = options.concurrency ?? DEFAULT_QUALIFICATION_CONCURRENCY;
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error("qualification concurrency must be an integer >= 1");
  }
  const execute = createBoundedExecutor(concurrency);
  const scenarioRunner = options.scenarioRunner ?? runScenario;
  const promisesById = new Map();
  let previousExclusivePromise = null;
  for (const scenario of scenarios) {
    const dependencyIds = new Set(scenario.depends_on);
    if (scenario.tier === "provider") {
      for (const priorScenarioId of promisesById.keys()) dependencyIds.add(priorScenarioId);
    }
    const dependencies = new Set(
      [...dependencyIds].map((dependency) => {
        const promise = promisesById.get(dependency);
        if (!promise) {
          throw new Error(`qualification scenario ${scenario.id} has an unordered dependency`);
        }
        return promise;
      }),
    );
    if (previousExclusivePromise) dependencies.add(previousExclusivePromise);
    const exclusive = EXCLUSIVE_QUALIFICATION_SCENARIO_IDS.has(scenario.id);
    if (exclusive) {
      for (const priorPromise of promisesById.values()) dependencies.add(priorPromise);
    }
    const promise = Promise.all(dependencies).then(() =>
      execute(() => scenarioRunner(scenario, variables, outputDirectory)),
    );
    promisesById.set(scenario.id, promise);
    if (exclusive) previousExclusivePromise = promise;
  }
  return Promise.all(scenarios.map((scenario) => promisesById.get(scenario.id)));
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
  verifyBaseline = readPinnedQualificationBaseline,
  verifyEquivalence = readProviderEvidenceEquivalence,
) {
  if (options.dryRun || !scenarios.some((scenario) => scenario.tier === "provider")) return null;
  const runtime = verify({
    [CODEX_REPLAY_CLI_VERSION_ENV]: options.codexVersion,
    ...(process.env[CODEX_REPLAY_BINARY_ENV]
      ? { [CODEX_REPLAY_BINARY_ENV]: process.env[CODEX_REPLAY_BINARY_ENV] }
      : {}),
  });
  verifyBaseline({
    codexCliVersion: options.codexVersion,
    evidencePath: options.providerBaselineEvidencePath ?? defaultProviderBaselineEvidencePath,
  });
  verifyEquivalence(repoRoot, options.providerEvidenceSubject ?? options.subject, options.subject);
  return runtime;
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
      ? path.join(
          ".agentplane",
          "cache",
          "rf04-candidate",
          options.providerEvidenceSubject,
          `measurement.pinned-baseline-codex-${options.codexVersion}.json`,
        )
      : path.join("scripts", "baselines", "agent-efficiency-v0.7-beta1-candidate.json"),
    codexVersion: options.codexVersion,
    evidenceDir: relativeOutputDirectory,
    providerBaselineEvidence: path.relative(repoRoot, options.providerBaselineEvidencePath),
    providerAction: options.providerEvidenceSubject === options.subject ? "--capture" : "--check",
    providerConcurrency: String(options.providerConcurrency),
    providerSubject: options.providerEvidenceSubject,
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
  const results = await runQualificationScenarios(scenarios, variables, outputDirectory, {
    concurrency: options.concurrency,
  });
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
