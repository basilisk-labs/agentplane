import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = {
    before: null,
    after: null,
    metric: "median_ms",
    tolerance: 0.05,
    id: null,
    format: "text",
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const next = argv[index + 1];
    switch (flag) {
      case "--help":
      case "-h": {
        args.help = true;
        break;
      }
      case "--before": {
        if (!next) throw new Error("Missing value after --before");
        args.before = path.resolve(next);
        index += 1;
        break;
      }
      case "--after": {
        if (!next) throw new Error("Missing value after --after");
        args.after = path.resolve(next);
        index += 1;
        break;
      }
      case "--metric": {
        if (!next) throw new Error("Missing value after --metric");
        args.metric = next;
        index += 1;
        break;
      }
      case "--tolerance": {
        if (!next) throw new Error("Missing value after --tolerance");
        args.tolerance = Number.parseFloat(next);
        if (!Number.isFinite(args.tolerance) || args.tolerance < 0) {
          throw new Error(`Invalid --tolerance: ${next}`);
        }
        index += 1;
        break;
      }
      case "--id": {
        if (!next) throw new Error("Missing value after --id");
        args.id = next;
        index += 1;
        break;
      }
      case "--json": {
        args.format = "json";
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${flag}`);
      }
    }
  }

  if (args.help) {
    return args;
  }
  if (!args.before || !args.after) {
    throw new Error("--before and --after are required");
  }
  return args;
}

function loadPayload(filePath, label) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file does not exist: ${filePath}`);
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read ${label} JSON from ${filePath}: ${String(error)}`);
  }
}

function toMetric(command, metric) {
  const value = Number(command?.[metric]);
  if (!Number.isFinite(value)) {
    throw new TypeError(`Command ${command?.id ?? "unknown"} has no numeric ${metric}`);
  }
  return value;
}

function comparePayloads(before, after, options) {
  const beforeCommands = new Map((before.commands ?? []).map((entry) => [String(entry.id), entry]));
  const afterCommands = new Map((after.commands ?? []).map((entry) => [String(entry.id), entry]));
  const selectedIds = options.id
    ? [options.id]
    : [...new Set([...beforeCommands.keys(), ...afterCommands.keys()])];
  const rows = [];
  let failures = 0;

  for (const id of selectedIds) {
    const beforeCommand = beforeCommands.get(id);
    const afterCommand = afterCommands.get(id);
    if (!beforeCommand || !afterCommand) {
      rows.push({
        id,
        status: "missing",
        before_ms: null,
        after_ms: null,
        delta_ms: null,
        delta_pct: null,
        message: beforeCommand ? "missing in after" : "missing in before",
      });
      failures += 1;
      continue;
    }

    const beforeValue = toMetric(beforeCommand, options.metric);
    const afterValue = toMetric(afterCommand, options.metric);
    const delta = afterValue - beforeValue;
    const deltaPct = (delta / beforeValue) * 100;
    const fails = deltaPct > options.tolerance * 100;
    if (fails) failures += 1;

    rows.push({
      id,
      status: fails ? "regression" : "ok",
      before_ms: beforeValue,
      after_ms: afterValue,
      delta_ms: delta,
      delta_pct: deltaPct,
      message: fails
        ? `+${delta.toFixed(3)}ms / +${deltaPct.toFixed(2)}%`
        : `${delta.toFixed(3)}ms / ${deltaPct.toFixed(2)}%`,
    });
  }

  return { rows, failures };
}

function printText(rows, options) {
  const lines = [
    `Comparison (${options.metric}), tolerance=${(options.tolerance * 100).toFixed(1)}%`,
    `before: ${options.before}`,
    `after: ${options.after}`,
    "",
    "id | before_ms | after_ms | delta_ms | delta_pct | status | details",
  ];
  for (const row of rows) {
    lines.push(
      [
        row.id,
        row.before_ms === null ? "n/a" : row.before_ms.toFixed(3),
        row.after_ms === null ? "n/a" : row.after_ms.toFixed(3),
        row.delta_ms === null ? "n/a" : row.delta_ms.toFixed(3),
        row.delta_pct === null ? "n/a" : `${row.delta_pct.toFixed(2)}%`,
        row.status,
        row.message,
      ].join(" | "),
    );
  }
  return `${lines.join("\n")}\n`;
}

function printHelp() {
  return [
    "Usage: node scripts/compare-cli-perf.mjs --before <path> --after <path> [options]",
    "",
    "Compare two CLI benchmark payload files and detect regressions.",
    "",
    "Options:",
    "  --before <path>      Path to baseline measurement JSON.",
    "  --after <path>       Path to candidate measurement JSON.",
    "  --metric <key>       Metric key to compare. Default: median_ms.",
    "  --tolerance <ratio>  Allowed fractional regression. Default: 0.05.",
    "  --id <command>       Compare only one command id.",
    "  --json               Output JSON comparison payload.",
    "  --help               Show this help text.",
    "",
    "Examples:",
    "  node scripts/measure-cli-cold-path.mjs --root /path/to/repo > before.json",
    "  node scripts/measure-cli-cold-path.mjs --root /path/to/repo > after.json",
    "  node scripts/compare-cli-perf.mjs --before before.json --after after.json --tolerance 0.08",
  ].join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${printHelp()}\n`);
    return 0;
  }

  const before = loadPayload(args.before, "before");
  const after = loadPayload(args.after, "after");

  const { rows, failures } = comparePayloads(before, after, args);
  const output =
    args.format === "json"
      ? JSON.stringify({ metric: args.metric, tolerance: args.tolerance, rows, failures }, null, 2)
      : printText(rows, args);

  process.stdout.write(`${output}\n`);
  return failures;
}

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
    return exitCode;
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(`${printHelp()}\n`);
    process.exitCode = 1;
    return 1;
  });
