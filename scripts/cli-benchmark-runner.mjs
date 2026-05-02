import { execFile } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const MAX_BUFFER_BYTES = 10 * 1024 * 1024;

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SUITE_CONFIG_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "cli-benchmark-suites.json",
);
const DEFAULT_CLI_PATH = path.join(REPO_ROOT, "packages", "agentplane", "bin", "agentplane.js");

export function cliRepoRootFromPath(cliPath) {
  return path.resolve(path.dirname(cliPath), "..", "..", "..");
}

function roundMs(value) {
  return Number(value.toFixed(3));
}

function sortNumeric(values) {
  return values.toSorted((left, right) => left - right);
}

function median(values) {
  const sorted = sortNumeric(values);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(values, percentileValue) {
  const sorted = sortNumeric(values);
  const index = Math.ceil((percentileValue / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(index, 0), sorted.length - 1)];
}

function summarizeDurations(durations) {
  let sum = 0;
  for (const value of durations) {
    sum += value;
  }
  const average = durations.length === 0 ? 0 : sum / durations.length;

  let totalDiff = 0;
  for (const value of durations) {
    const diff = value - average;
    totalDiff += diff * diff;
  }
  const variance = durations.length === 0 ? 0 : totalDiff / durations.length;

  return {
    min_ms: roundMs(Math.min(...durations)),
    median_ms: roundMs(median(durations)),
    max_ms: roundMs(Math.max(...durations)),
    avg_ms: roundMs(average),
    p95_ms: roundMs(percentile(durations, 95)),
    p99_ms: roundMs(percentile(durations, 99)),
    stddev_ms: roundMs(Math.sqrt(variance)),
  };
}

function parsePositiveInt(value, flag) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid value for ${flag}: ${value} (expected integer >= 0)`);
  }
  return parsed;
}

export function parseSuiteArgs(argv) {
  let suite = null;
  let suiteConfig = DEFAULT_SUITE_CONFIG_PATH;
  let root = REPO_ROOT;
  let cliPath = DEFAULT_CLI_PATH;
  let runs = 3;
  let warmups = 0;
  let commandId = null;
  let help = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--help":
      case "-h": {
        help = true;
        break;
      }
      case "--suite": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --suite");
        suite = next;
        i += 1;
        break;
      }
      case "--suite-config": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --suite-config");
        suiteConfig = path.resolve(next);
        i += 1;
        break;
      }
      case "--root": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --root");
        root = path.resolve(next);
        i += 1;
        break;
      }
      case "--cli": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --cli");
        cliPath = path.resolve(next);
        i += 1;
        break;
      }
      case "--runs": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --runs");
        runs = parsePositiveInt(next, "--runs");
        if (runs === 0) {
          throw new Error("Invalid value for --runs: 0 (expected integer >= 1)");
        }
        i += 1;
        break;
      }
      case "--warmups": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --warmups");
        warmups = parsePositiveInt(next, "--warmups");
        i += 1;
        break;
      }
      case "--command-id": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --command-id");
        commandId = next;
        i += 1;
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }

  return {
    suite: suite ?? "cli-cold-path",
    suiteConfig,
    root,
    cliPath,
    runs,
    warmups,
    commandId,
    help,
  };
}

function parseBenchmarkConfig(raw) {
  if (!raw || raw.schema_version !== 1 || !Array.isArray(raw.suites)) {
    throw new Error("Invalid suite config payload: expected schema_version=1 and suites");
  }
  return raw;
}

function readSuiteConfig(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Suite config is missing: ${filePath}`);
  }
  const payload = parseBenchmarkConfig(JSON.parse(readFileSync(filePath, "utf8")));
  const suites = new Map();

  for (const suite of payload.suites ?? []) {
    if (!suite || typeof suite.id !== "string" || typeof suite.mode !== "string") {
      throw new Error(`Invalid suite entry in ${filePath}`);
    }
    if (!Array.isArray(suite.commands) || suite.commands.length === 0) {
      throw new Error(`Suite ${suite.id} must contain at least one command`);
    }
    suites.set(suite.id, suite);
  }

  return {
    suites,
    defaultSuite: payload.default_suite,
  };
}

function interpolateArg(value, vars) {
  return String(value).replaceAll("{root}", vars.root).replaceAll("{repo_root}", vars.repoRoot);
}

function interpolateArgs(args, vars) {
  return args.map((value) => interpolateArg(value, vars));
}

function formatSuiteCommands(suite) {
  if (!suite || !Array.isArray(suite.commands)) {
    return [];
  }
  return suite.commands.map((command) => ({
    id: String(command.id ?? ""),
    commandLine: `agentplane ${
      Array.isArray(command.argv)
        ? command.argv
            .map((argument) =>
              typeof argument === "string" &&
              argument.includes(" ") &&
              !argument.startsWith('"') &&
              !argument.endsWith('"')
                ? `"${argument}"`
                : String(argument),
            )
            .join(" ")
        : ""
    }`,
  }));
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

export async function measureSuite(options) {
  const raw = readSuiteConfig(options.suiteConfig);
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

    const durations = [];
    let lastResult = null;
    for (let i = 0; i < options.runs; i += 1) {
      lastResult = await runCommand(options.cliPath, argv);
      durations.push(lastResult.durationMs);
    }

    commands.push({
      id: spec.id,
      description: spec.description ?? null,
      argv,
      runs: options.runs,
      warmups: options.warmups,
      durations_ms: durations,
      ...summarizeDurations(durations),
      exit_code: Number.isInteger(lastResult?.exitCode) ? lastResult.exitCode : 1,
      stdout_bytes: Buffer.byteLength(lastResult?.stdout ?? "", "utf8"),
      stderr_bytes: Buffer.byteLength(lastResult?.stderr ?? "", "utf8"),
      stdout_preview: String(lastResult?.stdout ?? "")
        .trim()
        .slice(0, 240),
      stderr_preview: String(lastResult?.stderr ?? "")
        .trim()
        .slice(0, 240),
      command_line: `${path.basename(options.cliPath)} ${argv.map((value) => JSON.stringify(value)).join(" ")}`,
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
    const suiteConfig = readSuiteConfig(options.suiteConfig);
    const previewSuite =
      suiteConfig.suites.get(options.suite) ??
      suiteConfig.suites.get(suiteConfig.defaultSuite ?? options.suite);
    const commandPreview = formatSuiteCommands(previewSuite);
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
