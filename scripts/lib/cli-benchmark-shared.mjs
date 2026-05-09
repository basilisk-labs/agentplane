import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export function cliRepoRootFromPath(cliPath) {
  return path.resolve(path.dirname(cliPath), "..", "..", "..");
}

export function roundMs(value) {
  return Number(value.toFixed(3));
}

function sortNumeric(values) {
  return values.toSorted((left, right) => left - right);
}

function median(values) {
  const sorted = sortNumeric(values);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(values, percentileValue) {
  const sorted = sortNumeric(values);
  if (sorted.length === 0) return 0;
  const index = Math.ceil((percentileValue / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(index, 0), sorted.length - 1)];
}

export function summarizeDurations(durations) {
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

  let sum = 0;
  for (const value of durations) {
    sum += value;
  }
  const average = sum / durations.length;

  let totalDiff = 0;
  for (const value of durations) {
    const diff = value - average;
    totalDiff += diff * diff;
  }
  const variance = totalDiff / durations.length;

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

export function parseSuiteArgs(argv, defaults) {
  let suite = null;
  let suiteConfig = defaults.suiteConfig;
  let root = defaults.root;
  let cliPath = defaults.cliPath;
  let runs = 3;
  let warmups = 0;
  let timeoutMs =
    defaults.timeoutEnvVar === undefined
      ? undefined
      : Number.parseInt(process.env[defaults.timeoutEnvVar] ?? "0", 10) || 0;
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
      case "--timeout-ms": {
        if (timeoutMs === undefined) {
          throw new Error(`Unknown argument: ${arg}`);
        }
        const next = argv[i + 1];
        if (!next) throw new Error("Missing value after --timeout-ms");
        timeoutMs = parsePositiveInt(next, "--timeout-ms");
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
    suite: suite ?? defaults.suite,
    suiteConfig,
    root,
    cliPath,
    runs,
    warmups,
    ...(timeoutMs === undefined ? {} : { timeoutMs }),
    commandId,
    help,
  };
}

export function parseSuiteConfig(raw) {
  if (!raw || raw.schema_version !== 1 || !Array.isArray(raw.suites)) {
    throw new Error("Invalid suite config payload: expected schema_version=1 and suites");
  }
  return raw;
}

export function readSuiteConfig(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Suite config is missing: ${filePath}`);
  }
  return parseSuiteConfig(JSON.parse(readFileSync(filePath, "utf8")));
}

export function readSuiteConfigMap(filePath) {
  const payload = readSuiteConfig(filePath);
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

export function interpolateArgs(args, vars) {
  return args.map((value) => interpolateArg(value, vars));
}

export function formatSuiteCommands(suite, options = {}) {
  if (!suite || !Array.isArray(suite.commands)) {
    return [];
  }
  const prefix = options.commandPrefix ? `${options.commandPrefix} ` : "";
  return suite.commands.map((command) => ({
    id: String(command.id ?? ""),
    commandLine: `${prefix}${
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
