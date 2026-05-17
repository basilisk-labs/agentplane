import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_BASE = "HEAD";

function writeUsage(stream) {
  stream.write(`Usage: node scripts/checks/check-changed-format.mjs [--base <git-ref>] [--staged]

Checks Prettier only on changed, existing files. Defaults to unstaged/staged
tracked changes against HEAD.
`);
}

function parseArgs(argv) {
  const parsed = { base: DEFAULT_BASE, help: false, staged: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--staged") {
      parsed.staged = true;
      continue;
    }
    if (arg === "--base") {
      parsed.base = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg.startsWith("--base=")) {
      parsed.base = arg.slice("--base=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  if (!parsed.base) throw new Error("--base requires a git ref");
  return parsed;
}

function git(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`git ${args.join(" ")} failed: ${result.stderr.trim()}`);
  }
  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function changedFiles({ base, staged }) {
  const files = new Set();
  const diffArgs = staged
    ? ["diff", "--cached", "--name-only", "--diff-filter=ACMR"]
    : ["diff", "--name-only", "--diff-filter=ACMR", base];

  for (const file of git(diffArgs)) files.add(file);

  if (!staged) {
    for (const file of git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"])) {
      files.add(file);
    }
    for (const file of git(["ls-files", "--others", "--exclude-standard"])) {
      files.add(file);
    }
  }

  return [...files]
    .filter((file) => existsSync(file))
    .filter((file) => !file.startsWith(".agentplane/"))
    .map((file) => path.normalize(file))
    .toSorted();
}

function runPrettier(files) {
  if (files.length === 0) {
    process.stdout.write("ok: no changed files to format-check\n");
    return 0;
  }

  process.stdout.write(`Checking ${files.length} changed file(s) with Prettier\n`);
  const result = spawnSync("bunx", ["prettier", "--check", "--ignore-unknown", ...files], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  return result.status ?? 1;
}

try {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    writeUsage(process.stdout);
    process.exitCode = 0;
  } else {
    process.exitCode = runPrettier(changedFiles(parsed));
  }
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  writeUsage(process.stderr);
  process.exitCode = 2;
}
