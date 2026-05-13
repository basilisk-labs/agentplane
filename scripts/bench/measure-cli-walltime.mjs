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
const DEFAULT_SUITE_CONFIG_PATH = path.join(REPO_ROOT, "scripts", "cli-walltime-suites.json");
const DEFAULT_CLI_PATH = path.join(REPO_ROOT, "packages", "agentplane", "bin", "agentplane.js");

function parseSuiteArgs(argv) {
  return parseSharedSuiteArgs(argv, {
    suite: "cli_walltime_baseline",
    suiteConfig: DEFAULT_SUITE_CONFIG_PATH,
    root: REPO_ROOT,
    cliPath: DEFAULT_CLI_PATH,
  });
}

async function runCommand(cliPath, argv) {
  const startedAt = performance.now();
  try {
    const result = await execFileAsync(process.execPath, [cliPath, ...argv], {
      cwd: cliRepoRootFromPath(cliPath),
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: "1",
      },
      maxBuffer: MAX_BUFFER_BYTES,
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
      durationMs: roundMs(performance.now() - startedAt),
    };
  } catch (error) {
    const execError = error;
    return {
      exitCode: Number.isInteger(execError?.code) ? execError.code : 1,
      stdout: typeof execError?.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError?.stderr === "string" ? execError.stderr : String(error),
      durationMs: roundMs(performance.now() - startedAt),
    };
  }
}

async function measureSuite(options) {
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
    for (let i = 0; i < options.warmups; i += 1) {
      await runCommand(options.cliPath, argv);
    }

    const durationsMs = [];
    let lastResult = null;
    for (let i = 0; i < options.runs; i += 1) {
      lastResult = await runCommand(options.cliPath, argv);
      durationsMs.push(lastResult.durationMs);
    }

    commands.push({
      id: spec.id,
      description: spec.description ?? null,
      argv,
      runs: options.runs,
      warmups: options.warmups,
      durations_ms: durationsMs,
      ...summarizeDurations(durationsMs),
      exit_code: Number.isInteger(lastResult?.exitCode) ? lastResult.exitCode : 1,
      stdout_bytes: Buffer.byteLength(lastResult?.stdout ?? "", "utf8"),
      stderr_bytes: Buffer.byteLength(lastResult?.stderr ?? "", "utf8"),
      stdout_preview: String(lastResult?.stdout ?? "")
        .trim()
        .slice(0, 240),
      stderr_preview: String(lastResult?.stderr ?? "")
        .trim()
        .slice(0, 240),
      command_line: `${path.basename(options.cliPath)} ${argv
        .map((value) => JSON.stringify(value))
        .join(" ")}`,
      failed: (lastResult?.exitCode ?? 1) !== 0,
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
    commands,
    failed_count: commands.filter((command) => command.failed).length,
  };
}

export function printWalltimeHelpText(options = {}) {
  const {
    scriptName = "scripts/measure-cli-walltime.mjs",
    suite = "cli_walltime_baseline",
    suiteMode = "cli_walltime_v1",
    commandPreview = [],
  } = options;
  const commandLines = commandPreview.map((command) => `  ${command.id}: ${command.commandLine}`);
  return [
    `Usage: node ${scriptName} [options]`,
    "",
    "Collect wall-time measurements for CLI process invocations.",
    "",
    `Default suite: ${suite} (${suiteMode}).`,
    "",
    "Default suite commands:",
    ...commandLines,
    "",
    "Options:",
    "  --suite <id>         Suite id from cli-walltime-suites.json. Default: cli_walltime_baseline",
    "  --suite-config <p>   Path to suite config JSON. Default: scripts/cli-walltime-suites.json",
    "  --command-id <id>    Run only one command from the suite.",
    "  --root <path>        Repository root to benchmark. Defaults to this checkout root.",
    "  --cli <path>         CLI entrypoint to execute. Defaults to this checkout's agentplane bin.",
    "  --runs <n>           Timed runs per command. Default: 3.",
    "  --warmups <n>        Untimed warmup runs per command. Default: 0.",
    "  --help               Show this help text.",
    "",
    "Output:",
    "  JSON payload with per-command durations and summary fields (min/avg/median/p95/p99/stddev).",
  ].join("\n");
}

export async function runWalltimeRunner(
  argv,
  outputStream = process.stdout,
  scriptName = "scripts/measure-cli-walltime.mjs",
) {
  const options = parseSuiteArgs(argv);
  if (options.help) {
    const suiteConfig = readSuiteConfigMap(options.suiteConfig);
    const previewSuite =
      suiteConfig.suites.get(options.suite) ??
      suiteConfig.suites.get(suiteConfig.defaultSuite ?? options.suite);
    const commandPreview = formatSuiteCommands(previewSuite);
    outputStream.write(
      `${printWalltimeHelpText({
        scriptName,
        suite: options.suite,
        suiteMode: previewSuite?.mode ?? "cli_walltime_v1",
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

runWalltimeRunner(process.argv.slice(2))
  .then((result) => {
    process.exitCode = result.exitCode;
    return result.exitCode;
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(`${printWalltimeHelpText()}\n`);
    process.exitCode = 1;
    return 1;
  });
