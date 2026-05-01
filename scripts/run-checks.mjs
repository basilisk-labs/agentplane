import { spawnSync } from "node:child_process";
import process from "node:process";

import { listCheckNames, resolveSelectedChecks } from "./lib/check-registry.mjs";

function writeUsage(stream) {
  stream.write(`Usage: node scripts/run-checks.mjs --select <name[,name]|all> [--dry-run]
       node scripts/run-checks.mjs --list

Available checks:
${listCheckNames()
  .map((name) => `  - ${name}`)
  .join("\n")}
`);
}

function parseArgs(argv) {
  const parsed = { dryRun: false, help: false, list: false, select: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--list") {
      parsed.list = true;
      continue;
    }
    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }
    if (arg === "--select") {
      parsed.select = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg?.startsWith("--select=")) {
      parsed.select = arg.slice("--select=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function runCheck(check, opts) {
  const commandText = check.command.map((part) => JSON.stringify(part)).join(" ");
  process.stdout.write(`==> ${check.name}: ${check.description}\n`);
  process.stdout.write(`$ ${check.command.join(" ")}\n`);
  if (opts.dryRun) return;

  const result = spawnSync(check.command[0], check.command.slice(1), {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${check.name} failed with exit code ${result.status}: ${commandText}`);
  }
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    writeUsage(process.stdout);
    return 0;
  }
  if (parsed.list) {
    for (const name of listCheckNames()) process.stdout.write(`${name}\n`);
    return 0;
  }
  if (!parsed.select) {
    writeUsage(process.stderr);
    return 2;
  }
  const checks = resolveSelectedChecks(parsed.select);
  for (const check of checks) runCheck(check, parsed);
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  writeUsage(process.stderr);
  process.exitCode = 2;
}
