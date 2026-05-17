import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const argv = process.argv.slice(2);
const affected = argv.includes("--affected");
const summaryDir = path.join(repoRoot, ".turbo", "runs");
const reportPath = path.join(repoRoot, ".agentplane", "cache", "turbo-local-ci-report.json");
const startedAtMs = Date.now();

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function relativePath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function listSummaryFiles() {
  try {
    return readdirSync(summaryDir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => path.join(summaryDir, name))
      .map((filePath) => ({ filePath, mtimeMs: statSync(filePath).mtimeMs }))
      .sort((left, right) => right.mtimeMs - left.mtimeMs);
  } catch {
    return [];
  }
}

function findLatestSummary() {
  const summaries = listSummaryFiles();
  const parsed = [];
  for (const entry of summaries) {
    try {
      const data = readJson(entry.filePath);
      const startTime = Number(data?.execution?.startTime ?? 0);
      parsed.push({ ...entry, data, startTime });
    } catch {
      // Ignore partial or incompatible summary files.
    }
  }
  return (
    parsed.find((entry) => entry.startTime >= startedAtMs - 5000) ??
    parsed.find((entry) => entry.mtimeMs >= startedAtMs - 5000) ??
    parsed[0] ??
    null
  );
}

function buildReport(summaryEntry, exitCode) {
  const summary = summaryEntry?.data;
  const execution = summary?.execution ?? {};
  const tasks = Array.isArray(summary?.tasks) ? summary.tasks : [];
  const attempted = Number(execution.attempted ?? tasks.length);
  const failed = Number(execution.failed ?? 0);
  const rawSuccess = Number(execution.success ?? 0);
  const successful = rawSuccess > 0 ? rawSuccess : Math.max(0, attempted - failed);
  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    local_only: true,
    affected,
    exit_code: exitCode,
    status: exitCode === 0 ? "ok" : "failed",
    command: turboCommand.join(" "),
    report_path: relativePath(reportPath),
    turbo_summary_path: summaryEntry ? relativePath(summaryEntry.filePath) : null,
    turbo_version: summary?.turboVersion ?? null,
    packages: Array.isArray(summary?.packages) ? summary.packages : [],
    execution: {
      attempted,
      successful,
      failed,
      cached: Number(execution.cached ?? 0),
      exit_code: Number(execution.exitCode ?? exitCode),
      start_time: execution.startTime ?? null,
      end_time: execution.endTime ?? null,
    },
    tasks: tasks.map((task) => ({
      task_id: String(task.taskId ?? ""),
      package: String(task.package ?? ""),
      task: String(task.task ?? ""),
      cache_status: String(task.cache?.status ?? "UNKNOWN"),
      cache_source: task.cache?.source ? String(task.cache.source) : null,
      log_file: task.logFile ? String(task.logFile) : null,
      dependencies: Array.isArray(task.dependencies) ? task.dependencies.map(String) : [],
      dependents: Array.isArray(task.dependents) ? task.dependents.map(String) : [],
    })),
    notes: [
      "This report is local developer evidence for AgentPlane framework worktrees.",
      "It records Turborepo execution scope, cache status, and task graph edges; it is not a semantic code map.",
    ],
  };
}

const turboCommand = [
  "turbo",
  "run",
  "build",
  "typecheck",
  "test",
  "--filter=./packages/*",
  "--summarize",
];
if (affected) turboCommand.push("--affected");

const result = spawnSync("bunx", turboCommand, {
  stdio: "inherit",
  env: {
    ...process.env,
    TURBO_TELEMETRY_DISABLED: "1",
  },
});

const exitCode = typeof result.status === "number" ? result.status : 1;
mkdirSync(path.dirname(reportPath), { recursive: true });
const summaryEntry = findLatestSummary();
writeFileSync(reportPath, `${JSON.stringify(buildReport(summaryEntry, exitCode), null, 2)}\n`);
process.stdout.write(`Turbo local CI report: ${relativePath(reportPath)}\n`);
if (summaryEntry) {
  process.stdout.write(`Turbo summary: ${relativePath(summaryEntry.filePath)}\n`);
}

process.exit(exitCode);
