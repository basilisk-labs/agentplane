import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const SCRIPT_NAME = "measure-cli-cold-path.mjs";
const DEFAULT_RUNS = 3;
const DEFAULT_WARMUPS = 0;
const MAX_BUFFER_BYTES = 10 * 1024 * 1024;

const scriptPath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptsDir, "..");
const defaultCliPath = path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");

const COMMANDS = [
  {
    id: "quickstart",
    argv: (root) => ["quickstart", "--root", root],
  },
  {
    id: "task_list",
    argv: (root) => ["task", "list", "--root", root],
  },
  {
    id: "task_search",
    argv: (root) => ["task", "search", "task", "--root", root],
  },
  {
    id: "task_next",
    argv: (root) => ["task", "next", "--root", root],
  },
  {
    id: "preflight_quick",
    argv: (root) => ["preflight", "--mode", "quick", "--root", root],
  },
];

function printHelp() {
  process.stdout.write(
    [
      `Usage: node scripts/${SCRIPT_NAME} [options]`,
      "",
      "Measure repeatable CLI cold-path timings for:",
      "  - agentplane quickstart",
      "  - agentplane task list",
      "  - agentplane task search task",
      "  - agentplane task next",
      "  - agentplane preflight --mode quick",
      "",
      "Options:",
      "  --root <path>     Repository root to benchmark. Defaults to the current repo root.",
      "  --cli <path>      CLI entrypoint to execute. Defaults to this checkout's agentplane bin.",
      `  --runs <n>        Timed runs per command. Default: ${DEFAULT_RUNS}.`,
      `  --warmups <n>     Untimed warmup runs per command. Default: ${DEFAULT_WARMUPS}.`,
      "  --help            Show this help text.",
      "",
      "Output:",
      "  JSON payload with per-command durations_ms plus min/median/avg/p95/max summary fields.",
      "",
    ].join("\n"),
  );
}

function parsePositiveInt(flag, raw) {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid value for ${flag}: ${raw} (expected integer >= 0)`);
  }
  return parsed;
}

function parseArgs(argv) {
  let root = repoRoot;
  let cliPath = defaultCliPath;
  let runs = DEFAULT_RUNS;
  let warmups = DEFAULT_WARMUPS;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--help":
      case "-h": {
        return { help: true };
      }
      case "--root": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --root");
        root = path.resolve(next);
        i++;
        break;
      }
      case "--cli": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --cli");
        cliPath = path.resolve(next);
        i++;
        break;
      }
      case "--runs": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --runs");
        runs = parsePositiveInt("--runs", next);
        i++;
        break;
      }
      case "--warmups": {
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --warmups");
        warmups = parsePositiveInt("--warmups", next);
        i++;
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }

  if (runs === 0) {
    throw new Error("Invalid value for --runs: 0 (expected integer >= 1)");
  }

  return {
    help: false,
    root,
    cliPath,
    runs,
    warmups,
  };
}

function roundMs(value) {
  return Number(value.toFixed(3));
}

function median(values) {
  const sorted = values.toSorted((left, right) => left - right);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(values, percentileValue) {
  const sorted = values.toSorted((left, right) => left - right);
  const index = Math.ceil((percentileValue / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(index, 0), sorted.length - 1)];
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
      exitCode: Number.isInteger(execError?.code) ? Number(execError.code) : 1,
      stdout: typeof execError?.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError?.stderr === "string" ? execError.stderr : String(error),
      durationMs: roundMs(performance.now() - startedAt),
    };
  }
}

function summarizeDurations(durations) {
  return {
    min_ms: roundMs(Math.min(...durations)),
    median_ms: roundMs(median(durations)),
    max_ms: roundMs(Math.max(...durations)),
    avg_ms: roundMs(durations.reduce((sum, value) => sum + value, 0) / durations.length),
    p95_ms: roundMs(percentile(durations, 95)),
  };
}

async function measureOne(spec, opts) {
  const argv = spec.argv(opts.root);
  for (let i = 0; i < opts.warmups; i++) {
    await runCommand(opts.cliPath, argv);
  }

  const durations = [];
  let lastResult = null;
  for (let i = 0; i < opts.runs; i++) {
    lastResult = await runCommand(opts.cliPath, argv);
    durations.push(lastResult.durationMs);
  }

  const summary = summarizeDurations(durations);
  return {
    id: spec.id,
    argv,
    runs: opts.runs,
    warmups: opts.warmups,
    durations_ms: durations,
    ...summary,
    exit_code: lastResult?.exitCode ?? 1,
    stdout_bytes: Buffer.byteLength(lastResult?.stdout ?? "", "utf8"),
    stderr_bytes: Buffer.byteLength(lastResult?.stderr ?? "", "utf8"),
    stdout_preview: (lastResult?.stdout ?? "").trim().slice(0, 200),
    stderr_preview: (lastResult?.stderr ?? "").trim().slice(0, 200),
  };
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    printHelp();
    return 0;
  }

  if (!existsSync(parsed.cliPath)) {
    throw new Error(`CLI entrypoint is missing: ${parsed.cliPath}`);
  }

  const commands = [];
  for (const spec of COMMANDS) {
    commands.push(await measureOne(spec, parsed));
  }

  const payload = {
    schema_version: 1,
    mode: "cli_cold_path_v1",
    root: parsed.root,
    cli_path: parsed.cliPath,
    cli_repo_root: cliRepoRootFromPath(parsed.cliPath),
    runs: parsed.runs,
    warmups: parsed.warmups,
    measured_at: new Date().toISOString(),
    commands,
  };

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return commands.every((command) => command.exit_code === 0) ? 0 : 1;
}

try {
  const exitCode = await main();
  process.exitCode = exitCode;
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}
