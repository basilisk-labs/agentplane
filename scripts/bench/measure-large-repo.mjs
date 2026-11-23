// Large-repository CLI timing (LW-06).
//
// The walltime suites run on a small fixture, so regressions that scale with the number of Tasks
// (README parsing, per-Task Git calls, doctor scans) are invisible there. This benchmark uses the
// framework repository itself as the fixture: thousands of real Task records with Task Kernel
// frontmatter and full history. It runs the CLI in a detached temporary worktree of HEAD, so local
// caches start empty (cold run) and then warm, and the main checkout is not touched.
//
// Usage:
//   node scripts/bench/measure-large-repo.mjs [--runs <n>] [--max-ms <command>=<ms> ...] [--json]
//
// A `--max-ms` ceiling applies to the median warm run. The process exits 1 when a ceiling is
// exceeded or a command fails.
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cli = path.join(repoRoot, "packages/agentplane/bin/agentplane.js");

const COMMANDS = [
  { id: "task_active", argv: ["task", "active"] },
  { id: "task_list", argv: ["task", "list"] },
  { id: "doctor", argv: ["doctor"] },
  { id: "quickstart", argv: ["quickstart"] },
];

function parseArgs(argv) {
  const opts = { runs: 3, ceilings: new Map(), json: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--json": {
        opts.json = true;
        break;
      }
      case "--runs": {
        opts.runs = Math.max(1, Number.parseInt(argv[++i] ?? "", 10) || 1);
        break;
      }
      case "--max-ms": {
        const [id, ms] = String(argv[++i] ?? "").split("=");
        if (!id || !Number.isFinite(Number(ms)))
          throw new Error(`Invalid --max-ms value: ${argv[i]}`);
        opts.ceilings.set(id, Number(ms));

        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }
  return opts;
}

function git(args, cwd = repoRoot) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function timeCommand(cwd, argv) {
  const started = process.hrtime.bigint();
  const result = spawnSync(process.execPath, [cli, ...argv], {
    cwd,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  return { ms: Math.round(ms), status: result.status ?? 1, stderr: result.stderr.slice(-2000) };
}

function median(values) {
  const sorted = values.toSorted((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

const opts = parseArgs(process.argv.slice(2));
if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
  throw new Error(
    "The large-repository benchmark needs full history; run `git fetch --unshallow`.",
  );
}
const parent = mkdtempSync(path.join(os.tmpdir(), "agentplane-large-repo-"));
const worktree = path.join(parent, "checkout");
git(["worktree", "add", "--detach", "--quiet", worktree, "HEAD"]);
const report = {
  schema_version: 1,
  kind: "agentplane_large_repo_timing",
  head: git(["rev-parse", "HEAD"]),
  task_count: readdirSync(path.join(worktree, ".agentplane", "tasks")).length,
  node: process.version,
  runs: opts.runs,
  commands: [],
};
let failed = false;
try {
  for (const command of COMMANDS) {
    const cold = timeCommand(worktree, command.argv);
    const warm = Array.from({ length: opts.runs }, () => timeCommand(worktree, command.argv));
    const statuses = [cold, ...warm].map((run) => run.status);
    const entry = {
      id: command.id,
      argv: command.argv,
      cold_ms: cold.ms,
      warm_ms: warm.map((run) => run.ms),
      warm_median_ms: median(warm.map((run) => run.ms)),
      exit_codes: [...new Set(statuses)],
    };
    const ceiling = opts.ceilings.get(command.id);
    if (ceiling !== undefined) {
      entry.max_ms = ceiling;
      entry.within_ceiling = entry.warm_median_ms <= ceiling;
      if (!entry.within_ceiling) failed = true;
    }
    if (statuses.some((status) => status !== 0)) {
      entry.last_stderr = (warm.at(-1) ?? cold).stderr;
      failed = true;
    }
    report.commands.push(entry);
  }
} finally {
  git(["worktree", "remove", "--force", worktree]);
  rmSync(parent, { recursive: true, force: true });
}

if (opts.json) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else {
  process.stdout.write(
    `large-repo timing: ${report.task_count} task dirs @ ${report.head.slice(0, 12)}\n`,
  );
  for (const entry of report.commands) {
    const ceiling = entry.max_ms === undefined ? "" : ` (max ${entry.max_ms} ms)`;
    process.stdout.write(
      `- ${entry.id}: cold ${entry.cold_ms} ms, warm median ${entry.warm_median_ms} ms${ceiling}, exit ${entry.exit_codes.join("/")}\n`,
    );
  }
}
if (failed) process.exitCode = 1;
