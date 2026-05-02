import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = {
    before: null,
    after: null,
    metric: "median_ms",
    tolerance: 0.05,
    commandId: null,
    format: "text",
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const next = argv[i + 1];

    switch (flag) {
      case "--help":
      case "-h":
        args.help = true;
        break;
      case "--before":
        if (!next) throw new Error("Missing value after --before");
        args.before = path.resolve(next);
        i += 1;
        break;
      case "--after":
        if (!next) throw new Error("Missing value after --after");
        args.after = path.resolve(next);
        i += 1;
        break;
      case "--metric":
        if (!next) throw new Error("Missing value after --metric");
        args.metric = next;
        i += 1;
        break;
      case "--tolerance":
        if (!next) throw new Error("Missing value after --tolerance");
        args.tolerance = Number.parseFloat(next);
        if (!Number.isFinite(args.tolerance) || args.tolerance < 0) {
          throw new Error(`Invalid --tolerance: ${next}`);
        }
        i += 1;
        break;
      case "--command-id":
        if (!next) throw new Error("Missing value after --command-id");
        args.commandId = next;
        i += 1;
        break;
      case "--json":
        args.format = "json";
        break;
      default:
        throw new Error(`Unknown argument: ${flag}`);
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

function readPayload(filePath, label) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file does not exist: ${filePath}`);
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`failed to read ${label} JSON at ${filePath}: ${message}`);
  }
}

function metric(command, metricName) {
  const value = Number(command?.[metricName]);
  if (!Number.isFinite(value)) {
    throw new Error(`command ${command?.id ?? "unknown"} has no numeric ${metricName}`);
  }
  return value;
}

function compareWalltimePayloads(before, after, args) {
  const beforeCommands = new Map(
    (before.commands ?? []).map((command) => [String(command.id), command]),
  );
  const afterCommands = new Map(
    (after.commands ?? []).map((command) => [String(command.id), command]),
  );
  const ids = args.commandId
    ? [args.commandId]
    : [...new Set([...beforeCommands.keys(), ...afterCommands.keys()])];
  const rows = [];
  let failures = 0;

  for (const id of ids) {
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

    const beforeMs = metric(beforeCommand, args.metric);
    const afterMs = metric(afterCommand, args.metric);
    const delta = afterMs - beforeMs;
    const deltaPct = (delta / beforeMs) * 100;
    const failed = deltaPct > args.tolerance * 100;
    if (failed) {
      failures += 1;
    }

    rows.push({
      id,
      status: failed ? "regression" : "ok",
      before_ms: beforeMs,
      after_ms: afterMs,
      delta_ms: delta,
      delta_pct: deltaPct,
      message: failed
        ? `+${delta.toFixed(3)}ms / +${deltaPct.toFixed(2)}%`
        : `${delta.toFixed(3)}ms / ${deltaPct.toFixed(2)}%`,
    });
  }

  return { failures, rows };
}

function assertSchema(payload, label) {
  if (!payload || payload.schema_version !== 1 || payload.mode !== "cli_walltime_v1") {
    throw new Error(`${label} must be schema_version=1 mode=cli_walltime_v1`);
  }
  if (!Array.isArray(payload.commands)) {
    throw new Error(`${label} must include commands`);
  }
}

function printText(rows, args) {
  const lines = [
    `Comparison (${args.metric}), tolerance=${(args.tolerance * 100).toFixed(1)}%`,
    `before: ${args.before}`,
    `after: ${args.after}`,
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
    "Usage: node scripts/compare-cli-walltime.mjs --before <path> --after <path> [options]",
    "",
    "Compare two cli wall-time measurement JSON files and detect regressions.",
    "",
    "Options:",
    "  --before <path>       Baseline measurement JSON path.",
    "  --after <path>        Candidate measurement JSON path.",
    "  --metric <key>        Metric key to compare. Default: median_ms.",
    "  --tolerance <ratio>   Allowed fractional regression. Default: 0.05.",
    "  --command-id <id>     Compare only one command id.",
    "  --json                Output JSON comparison payload.",
    "  --help                Show this help text.",
    "",
    "Examples:",
    "  node scripts/measure-cli-walltime.mjs > before.json",
    "  node scripts/measure-cli-walltime.mjs > after.json",
    "  node scripts/compare-cli-walltime.mjs --before before.json --after after.json --tolerance 0.08",
  ].join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${printHelp()}\n`);
    return 0;
  }

  const before = readPayload(args.before, "before");
  const after = readPayload(args.after, "after");
  assertSchema(before, "before payload");
  assertSchema(after, "after payload");
  const { failures, rows } = compareWalltimePayloads(before, after, args);
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
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(`${printHelp()}\n`);
    process.exitCode = 1;
  });
