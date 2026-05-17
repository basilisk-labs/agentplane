import { spawnSync } from "node:child_process";
import process from "node:process";

const CHECKS = [
  ["lint:core", ["bun", "run", "lint:core"]],
  ["format:check", ["bun", "run", "format:check"]],
  ["typecheck", ["bun", "run", "typecheck"]],
  ["test", ["bun", "run", "test"]],
  ["build", ["bun", "run", "build"]],
  ["docs:bootstrap:check", ["bun", "run", "docs:bootstrap:check"]],
  ["docs:onboarding:check", ["bun", "run", "docs:onboarding:check"]],
  ["docs:ia:check", ["bun", "run", "docs:ia:check"]],
  ["docs:scripts:check", ["bun", "run", "docs:scripts:check"]],
  ["docs:cli:check", ["bun", "run", "docs:cli:check"]],
  ["docs:recipes:check", ["bun", "run", "docs:recipes:check"]],
  ["docs:site:check", ["bun", "run", "docs:site:check"]],
];

function writeUsage(stream) {
  stream.write(`Usage: node scripts/checks/profile-local-quality.mjs [--select <name[,name]|all>] [--dry-run] [--json]

Profiles local quality checks sequentially and reports wall-clock seconds,
exit code, short failure context, and tracked-file changes after each check.
`);
}

function parseArgs(argv) {
  const parsed = { dryRun: false, help: false, json: false, select: "all" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }
    if (arg === "--json") {
      parsed.json = true;
      continue;
    }
    if (arg === "--select") {
      parsed.select = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg.startsWith("--select=")) {
      parsed.select = arg.slice("--select=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function listChecks() {
  return CHECKS.map(([name]) => name);
}

function selectedChecks(select) {
  if (!select || select === "all") return CHECKS;
  const requested = new Set(
    select
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
  );
  const unknown = [...requested].filter((name) => !listChecks().includes(name));
  if (unknown.length > 0) throw new Error(`Unknown check(s): ${unknown.join(", ")}`);
  return CHECKS.filter(([name]) => requested.has(name));
}

function gitStatus() {
  const result = spawnSync("git", ["status", "--short", "--untracked-files=no"], {
    encoding: "utf8",
  });
  if (result.error || result.status !== 0) return [];
  return result.stdout.split("\n").filter(Boolean);
}

function tail(text, maxLines = 12) {
  return text.split("\n").filter(Boolean).slice(-maxLines);
}

function runOne(name, command, dryRun) {
  const startedAt = process.hrtime.bigint();
  const before = gitStatus();

  if (dryRun) {
    return {
      name,
      command: command.join(" "),
      seconds: 0,
      exitCode: 0,
      changedTrackedFiles: [],
      tail: [],
      dryRun: true,
    };
  }

  const result = spawnSync(command[0], command.slice(1), {
    encoding: "utf8",
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
  const endedAt = process.hrtime.bigint();
  const after = gitStatus();
  const beforeSet = new Set(before);
  const changedTrackedFiles = after.filter((line) => !beforeSet.has(line));
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;

  return {
    name,
    command: command.join(" "),
    seconds: Number(endedAt - startedAt) / 1_000_000_000,
    exitCode: result.status ?? 1,
    changedTrackedFiles,
    tail: tail(output),
    dryRun: false,
  };
}

function renderTable(results) {
  const rows = [
    ["check", "seconds", "exit", "tracked changes"],
    ...results.map((result) => [
      result.name,
      result.seconds.toFixed(1),
      String(result.exitCode),
      String(result.changedTrackedFiles.length),
    ]),
  ];
  const widths = rows[0].map((_, index) =>
    Math.max(...rows.map((row) => String(row[index]).length)),
  );
  for (const row of rows) {
    process.stdout.write(
      `${row.map((cell, index) => String(cell).padEnd(widths[index])).join("  ")}\n`,
    );
  }
}

try {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    writeUsage(process.stdout);
    process.exitCode = 0;
  } else {
    const checks = selectedChecks(parsed.select);
    const results = checks.map(([name, command]) => runOne(name, command, parsed.dryRun));
    if (parsed.json) {
      process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
    } else {
      renderTable(results);
      for (const result of results.filter((item) => item.exitCode !== 0)) {
        process.stdout.write(`\n== ${result.name} tail ==\n${result.tail.join("\n")}\n`);
      }
    }
    process.exitCode = results.some((result) => result.exitCode !== 0) ? 1 : 0;
  }
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  writeUsage(process.stderr);
  process.exitCode = 2;
}
