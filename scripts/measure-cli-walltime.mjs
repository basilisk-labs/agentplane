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
  "cli-walltime-suites.json",
);
const DEFAULT_CLI_PATH = path.join(REPO_ROOT, "packages", "agentplane", "bin", "agentplane.js");

function roundMs(value) {
  return Number(value.toFixed(3));
}

function sortNumeric(values) {
  return values.toSorted((left, right) => left - right);
}

function percentile(values, percentileValue) {
  const sorted = sortNumeric(values);
  if (sorted.length === 0) {
    return 0;
  }
  const index = Math.ceil((percentileValue / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(index, 0), sorted.length - 1)];
}

function median(values) {
  const sorted = sortNumeric(values);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  if (sorted.length === 0) {
    return 0;
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function summarizeDurations(durations) {
  if (durations.length === 0) {
    return {
      min_ms: 0,
      median_ms: 0,
      max_ms: 0,
      avg_ms: 0,
      p95_ms: 0,
      p99_ms: 0,
      stddev_ms: 0,
    };
  }

  const average = durations.reduce((sum, value) => sum + value, 0) / durations.length;
  const variance =
    durations.reduce((sum, value) => {
      const diff = value - average;
      return sum + diff * diff;
    }, 0) / durations.length;

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

function parseSuiteArgs(argv) {
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
      case "-h":
        return { help: true };
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
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return {
    suite: suite ?? "cli_walltime_baseline",
    suiteConfig,
    root,
    cliPath,
    runs,
    warmups,
    commandId,
    help,
  };
}

function parseSuiteConfig(raw) {
  if (!raw || raw.schema_version !== 1 || !Array.isArray(raw.suites)) {
    throw new Error("Invalid suite config payload: expected schema_version=1 and suites");
  }
  return raw;
}

function readSuiteConfig(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Suite config is missing: ${filePath}`);
  }
  return parseSuiteConfig(JSON.parse(readFileSync(filePath, "utf8")));
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
    commandLine: command.argv
      .map((arg) =>
        typeof arg === "string" && arg.includes(" ") && !arg.startsWith('"') && !arg.endsWith('"')
          ? `"${arg}"`
          : String(arg),
      )
      .join(" "),
  }));
}

function cliRepoRootFromPath(cliPath) {
  return path.resolve(path.dirname(cliPath), "..", "..", "..");
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
  const raw = readSuiteConfig(options.suiteConfig);
  const suites = new Map((raw.suites ?? []).map((suite) => [suite.id, suite]));
  const selected = suites.get(options.suite) ?? suites.get(raw.default_suite);
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
      stdout_preview: String(lastResult?.stdout ?? "").trim().slice(0, 240),
      stderr_preview: String(lastResult?.stderr ?? "").trim().slice(0, 240),
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
    const suiteConfig = readSuiteConfig(options.suiteConfig);
    const suites = new Map((suiteConfig.suites ?? []).map((suite) => [suite.id, suite]));
    const previewSuite = suites.get(options.suite) ?? suites.get(suiteConfig.default_suite ?? options.suite);
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
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(`${printWalltimeHelpText()}\n`);
    process.exitCode = 1;
  });
