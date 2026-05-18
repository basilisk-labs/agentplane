import { execFileSync, spawnSync } from "node:child_process";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

function run(cmd, args, dryRun) {
  const text = `${cmd} ${args.join(" ")}`;
  if (dryRun) return { command: text, skipped: true, status: null };
  const result = spawnSync(cmd, args, { stdio: "inherit", env: process.env });
  return { command: text, skipped: false, status: result.status ?? 1 };
}

function changedFiles(base) {
  return execFileSync("git", ["diff", "--name-only", "--diff-filter=ACMR", base], {
    encoding: "utf8",
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const { flags } = parseScriptArgs(process.argv.slice(2), {
  valueFlags: ["base"],
  booleanFlags: ["write", "json"],
});
const dryRun = flags.write !== true;
const base = String(flags.base ?? "HEAD");
const files = changedFiles(base);
const commands = [
  ["bun", ["install", "--ignore-scripts"]],
  ["bun", ["run", "release:parity"]],
  ["bun", ["run", "schemas:check"]],
  ["bun", ["run", "knip:check"]],
  ["bun", ["run", "ci:local:fast"]],
];
const results = commands.map(([cmd, args]) => run(cmd, args, dryRun));
const report = { schema_version: 1, dry_run: dryRun, changed_files: files, results };
const failed = results.filter((result) => result.status !== null && result.status !== 0);

if (flags.json === true) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  process.stdout.write(`${dryRun ? "dry-run" : "ran"} dependency triage commands\n`);
  for (const result of results) {
    process.stdout.write(
      `- ${result.command}${result.skipped ? " (skipped)" : ` -> ${result.status}`}\n`,
    );
  }
}

if (failed.length > 0) {
  process.exitCode = 1;
}
