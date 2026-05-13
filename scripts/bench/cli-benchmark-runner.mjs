import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  cliRepoRootFromPath,
  formatSuiteCommands,
  interpolateArgs,
  parseSuiteArgs as parseSharedSuiteArgs,
  readSuiteConfigMap,
  roundMs,
  summarizeDurations,
} from "../lib/cli-benchmark-shared.mjs";

const execFileAsync = promisify(execFile);
const MAX_BUFFER_BYTES = 10 * 1024 * 1024;

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEFAULT_SUITE_CONFIG_PATH = path.join(REPO_ROOT, "scripts", "cli-benchmark-suites.json");
const DEFAULT_CLI_PATH = path.join(REPO_ROOT, "packages", "agentplane", "bin", "agentplane.js");

export function parseSuiteArgs(argv) {
  return parseSharedSuiteArgs(argv, {
    suite: "cli-cold-path",
    suiteConfig: DEFAULT_SUITE_CONFIG_PATH,
    root: REPO_ROOT,
    cliPath: DEFAULT_CLI_PATH,
    timeoutEnvVar: "AGENTPLANE_CLI_BENCH_TIMEOUT_MS",
  });
}

async function runCommandWithOptions(cliPath, argv, options) {
  const startedAt = performance.now();
  const timeoutMs = Math.max(0, Math.floor(Number(options.timeoutMs ?? 0)));
  try {
    const result = await execFileAsync(process.execPath, [cliPath, ...argv], {
      cwd: cliRepoRootFromPath(cliPath),
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: "1",
      },
      maxBuffer: MAX_BUFFER_BYTES,
      ...(timeoutMs > 0 ? { timeout: timeoutMs } : {}),
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
      durationMs: roundMs(performance.now() - startedAt),
      timedOut: false,
    };
  } catch (error) {
    const execError = error;
    const timedOut = timeoutMs > 0 && execError?.killed === true;
    return {
      exitCode: timedOut ? 124 : Number.isInteger(execError?.code) ? execError.code : 1,
      stdout: typeof execError?.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError?.stderr === "string" ? execError.stderr : String(error),
      durationMs: roundMs(performance.now() - startedAt),
      timedOut,
    };
  }
}

async function runCommandGroup(cliPath, argv, parallel, options = {}) {
  const count = Math.max(1, Math.floor(Number(parallel ?? 1)));
  if (count === 1) {
    const result = await runCommandWithOptions(cliPath, argv, options);
    return {
      ...result,
      parallel: 1,
    };
  }

  const startedAt = performance.now();
  const results = await Promise.all(
    Array.from({ length: count }, async () => await runCommandWithOptions(cliPath, argv, options)),
  );
  let stdout = "";
  let stderr = "";
  let exitCode = 0;
  let timedOut = false;
  for (const result of results) {
    stdout += result.stdout;
    stderr += result.stderr;
    timedOut = timedOut || result.timedOut === true;
    if (result.exitCode !== 0 && exitCode === 0) {
      exitCode = result.exitCode;
    }
  }
  return {
    exitCode,
    stdout,
    stderr,
    durationMs: roundMs(performance.now() - startedAt),
    parallel: count,
    timedOut,
  };
}

export async function measureSuite(options) {
  const raw = readSuiteConfigMap(options.suiteConfig);
  const selected = raw.suites.get(options.suite) ?? raw.suites.get(raw.defaultSuite);
  if (!selected) {
    throw new Error(`Suite not found: ${options.suite}`);
  }

  const vars = {
    root: options.root,
    repoRoot: cliRepoRootFromPath(options.cliPath),
  };

  const commandSpecs = options.commandId
    ? selected.commands.filter((command) => command.id === options.commandId)
    : selected.commands;

  if (options.commandId && commandSpecs.length === 0) {
    throw new Error(`Command not found in suite ${options.suite}: ${options.commandId}`);
  }

  const commands = [];
  for (const spec of commandSpecs) {
    const argv = interpolateArgs(spec.argv, vars);
    const parallel = Math.max(1, Math.floor(Number(spec.parallel ?? 1)));
    for (let i = 0; i < options.warmups; i += 1) {
      await runCommandGroup(options.cliPath, argv, parallel, { timeoutMs: options.timeoutMs });
    }

    const durations = [];
    let lastResult = null;
    for (let i = 0; i < options.runs; i += 1) {
      lastResult = await runCommandGroup(options.cliPath, argv, parallel, {
        timeoutMs: options.timeoutMs,
      });
      durations.push(lastResult.durationMs);
    }

    commands.push({
      id: spec.id,
      description: spec.description ?? null,
      argv,
      parallel,
      runs: options.runs,
      warmups: options.warmups,
      timeout_ms: Math.max(0, Math.floor(Number(options.timeoutMs ?? 0))),
      durations_ms: durations,
      ...summarizeDurations(durations),
      exit_code: Number.isInteger(lastResult?.exitCode) ? lastResult.exitCode : 1,
      timed_out: lastResult?.timedOut === true,
      stdout_bytes: Buffer.byteLength(lastResult?.stdout ?? "", "utf8"),
      stderr_bytes: Buffer.byteLength(lastResult?.stderr ?? "", "utf8"),
      stdout_preview: String(lastResult?.stdout ?? "")
        .trim()
        .slice(0, 240),
      stderr_preview: String(lastResult?.stderr ?? "")
        .trim()
        .slice(0, 240),
      command_line: `${path.basename(options.cliPath)} ${argv.map((value) => JSON.stringify(value)).join(" ")}`,
      failed: lastResult?.timedOut === true || (lastResult?.exitCode ?? 1) !== 0,
    });
  }

  return {
    schema_version: 1,
    mode: selected.mode,
    suite: selected.id,
    root: options.root,
    cli_path: options.cliPath,
    cli_repo_root: cliRepoRootFromPath(options.cliPath),
    measured_at: new Date().toISOString(),
    runs: options.runs,
    warmups: options.warmups,
    timeout_ms: Math.max(0, Math.floor(Number(options.timeoutMs ?? 0))),
    commands,
    failed_count: commands.filter((command) => command.failed).length,
  };
}

export function printCliPerfHelpText(options = {}) {
  const {
    scriptName = "scripts/measure-cli-perf.mjs",
    suite = "cli-cold-path",
    suiteMode = "cli_perf_v1",
    commandPreview = [],
  } = options;
  const commandLines = commandPreview.map((command) => `  ${command.id}: ${command.commandLine}`);
  return [
    `Usage: node ${scriptName} [options]`,
    "",
    "Collect repeatable CLI benchmark payloads for configured suites.",
    "",
    `Default suite: ${suite} (${suiteMode}).`,
    "",
    "Default suite commands:",
    ...commandLines,
    "",
    "Options:",
    "  --suite <id>       Suite id from scripts/cli-benchmark-suites.json. Default: cli-cold-path",
    "  --suite-config <p> Path to suite config JSON. Default: scripts/cli-benchmark-suites.json",
    "  --command-id <id>  Run only one command from the suite.",
    "  --root <path>      Repository root to benchmark. Defaults to this checkout root.",
    "  --cli <path>       CLI entrypoint to execute. Defaults to this checkout's agentplane bin.",
    "  --runs <n>         Timed runs per command. Default: 3.",
    "  --warmups <n>      Untimed warmup runs per command. Default: 0.",
    "  --timeout-ms <n>   Kill an individual command run after n ms. Default: disabled.",
    "  --help             Show this help text.",
    "",
    "Output:",
    "  JSON payload with per-command durations and summary fields (min/avg/median/p95/p99/stddev).",
  ].join("\n");
}

export async function runSuiteRunner(
  argv,
  outputStream = process.stdout,
  scriptName = "scripts/measure-cli-perf.mjs",
) {
  const options = parseSuiteArgs(argv);
  if (options.help) {
    const suiteConfig = readSuiteConfigMap(options.suiteConfig);
    const previewSuite =
      suiteConfig.suites.get(options.suite) ??
      suiteConfig.suites.get(suiteConfig.defaultSuite ?? options.suite);
    const commandPreview = formatSuiteCommands(previewSuite, { commandPrefix: "agentplane" });
    outputStream.write(
      `${printCliPerfHelpText({
        scriptName,
        suite: options.suite,
        suiteMode: previewSuite?.mode ?? "cli_perf_v1",
        commandPreview,
      })}\n`,
    );
    return { exitCode: 0 };
  }

  if (!existsSync(options.cliPath)) {
    throw new Error(`CLI entrypoint is missing: ${options.cliPath}`);
  }

  const payload = await measureSuite(options);
  outputStream.write(`${JSON.stringify(payload, null, 2)}\n`);
  return { exitCode: payload.failed_count > 0 ? 1 : 0 };
}

export const DEFAULT_BENCHMARK_CLI_PATH = DEFAULT_CLI_PATH;
export const DEFAULT_BENCHMARK_CONFIG_PATH = DEFAULT_SUITE_CONFIG_PATH;
