import { execFile as execFileCb } from "node:child_process";
import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import type { TaskRecord } from "@agentplaneorg/core/tasks";

import type { RunDeps } from "../../cli/run-cli/command-catalog/kernel.js";
import { listTasksForInsights, pathExists } from "./insights-task-loader.js";
export { renderInsightsReport } from "./insights-report-render.js";
import { getVersion } from "../../meta/version.js";
import { isRecord } from "../../shared/guards.js";
import {
  buildFailureContext,
  type FailureContextInput,
  type InsightsFailure,
} from "./insights-issue-context.js";

const execFile = promisify(execFileCb);

type CountMap = Record<string, number>;

export type InsightsReport = {
  schema: "agentplane.insights.report.v1";
  generated_at: string;
  privacy: {
    local_only: true;
    network: "not_used";
    upload: "not_supported";
    excludes: string[];
  };
  failure: InsightsFailure;
  environment: {
    agentplane_version: string | null;
    node_major: number | null;
    platform: NodeJS.Platform;
    arch: string;
  };
  project: {
    workflow_mode: string;
    backend: {
      id: string;
      config_path: string;
      cache_configured: boolean;
    };
    paths: {
      workflow_dir: string;
      worktrees_dir: string;
    };
  };
  git: {
    branch: string | null;
    status_counts: CountMap;
    dirty: boolean;
  };
  tasks: {
    total: number;
    by_status: CountMap;
    by_owner: CountMap;
    by_primary_tag: CountMap;
    plan_approval: CountMap;
    verification: CountMap;
    doc_version: CountMap;
    verify_steps: CountMap;
    event_types: CountMap;
    active_task_ids: string[];
    recent_task_ids: string[];
  };
  quality: {
    verify_steps: CountMap;
    intake_manifest: CountMap;
    runner_repeat: CountMap;
    runner_failure_fingerprints: CountMap;
  };
  runner: {
    tasks_with_runner: number;
    by_status: CountMap;
    by_adapter: CountMap;
    mode: CountMap;
    duration_ms_buckets: CountMap;
    stdout_bytes_buckets: CountMap;
    stderr_bytes_buckets: CountMap;
  };
};

function bump(counts: CountMap, raw: unknown, fallback = "unknown"): void {
  const value = typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;
  counts[value] = (counts[value] ?? 0) + 1;
}

function bucketBytes(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "unknown";
  if (value === 0) return "0";
  if (value < 1024) return "<1kb";
  if (value < 10 * 1024) return "1kb-10kb";
  if (value < 100 * 1024) return "10kb-100kb";
  return ">=100kb";
}

function bucketDurationMs(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "unknown";
  if (value < 100) return "<100ms";
  if (value < 500) return "100ms-500ms";
  if (value < 2000) return "500ms-2s";
  if (value < 10_000) return "2s-10s";
  return ">=10s";
}

async function readBackendSummary(
  root: string,
  configPath: string,
): Promise<{
  id: string;
  config_path: string;
  cache_configured: boolean;
}> {
  try {
    const raw = JSON.parse(await readFile(path.join(root, configPath), "utf8")) as unknown;
    const settings = isRecord(raw) && isRecord(raw.settings) ? raw.settings : {};
    return {
      id: isRecord(raw) && typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : "local",
      config_path: configPath,
      cache_configured: typeof settings.cache_dir === "string" && settings.cache_dir.trim() !== "",
    };
  } catch {
    return { id: "local", config_path: configPath, cache_configured: false };
  }
}

async function readGitStatus(root: string): Promise<InsightsReport["git"]> {
  const [branchResult, statusResult] = await Promise.allSettled([
    execFile("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: root }),
    execFile("git", ["status", "--short", "--untracked-files=all"], { cwd: root }),
  ]);
  const rawBranch =
    branchResult.status === "fulfilled" ? branchResult.value.stdout.trim() || null : null;
  const branch = rawBranch === null ? null : rawBranch === "HEAD" ? "detached" : "attached";
  const statusText = statusResult.status === "fulfilled" ? statusResult.value.stdout : "";
  const statusCounts: CountMap = {
    modified: 0,
    added: 0,
    deleted: 0,
    renamed: 0,
    copied: 0,
    untracked: 0,
    conflicted: 0,
    other: 0,
  };
  for (const line of statusText.split("\n")) {
    if (!line) continue;
    const code = line.slice(0, 2);
    if (code === "??") {
      statusCounts.untracked += 1;
    } else if (code.includes("U") || code === "AA" || code === "DD") {
      statusCounts.conflicted += 1;
    } else if (code.includes("R")) {
      statusCounts.renamed += 1;
    } else if (code.includes("C")) {
      statusCounts.copied += 1;
    } else if (code.includes("A")) {
      statusCounts.added += 1;
    } else if (code.includes("D")) {
      statusCounts.deleted += 1;
    } else if (code.includes("M")) {
      statusCounts.modified += 1;
    } else {
      statusCounts.other += 1;
    }
  }
  return {
    branch,
    status_counts: statusCounts,
    dirty: Object.values(statusCounts).some((count) => count > 0),
  };
}

function taskUpdatedAt(task: TaskRecord): string {
  const value = task.frontmatter.doc_updated_at;
  return typeof value === "string" ? value : "";
}

function summarizeTasks(tasks: TaskRecord[], recentLimit: number): InsightsReport["tasks"] {
  const byStatus: CountMap = {};
  const byOwner: CountMap = {};
  const byPrimaryTag: CountMap = {};
  const planApproval: CountMap = {};
  const verification: CountMap = {};
  const docVersion: CountMap = {};
  const verifySteps: CountMap = {};
  const eventTypes: CountMap = {};
  const activeTaskIds: string[] = [];

  for (const task of tasks) {
    const fm = task.frontmatter;
    bump(byStatus, fm.status);
    bump(byOwner, fm.owner);
    bump(byPrimaryTag, fm.tags[0] ?? "none");
    bump(planApproval, fm.plan_approval?.state);
    bump(verification, fm.verification?.state);
    bump(docVersion, String(fm.doc_version ?? "unknown"));
    bump(verifySteps, fm.verify.length > 0 ? "present" : "missing");
    if (fm.status !== "DONE") activeTaskIds.push(task.id);
    for (const event of fm.events ?? []) {
      bump(eventTypes, event.type);
    }
  }

  const recentTaskIds = [...tasks]
    .toSorted((a, b) => taskUpdatedAt(b).localeCompare(taskUpdatedAt(a)))
    .slice(0, recentLimit)
    .map((task) => task.id);

  return {
    total: tasks.length,
    by_status: byStatus,
    by_owner: byOwner,
    by_primary_tag: byPrimaryTag,
    plan_approval: planApproval,
    verification,
    doc_version: docVersion,
    verify_steps: verifySteps,
    event_types: eventTypes,
    active_task_ids: activeTaskIds.toSorted(),
    recent_task_ids: recentTaskIds,
  };
}

function runnerFailureFingerprint(entry: NonNullable<TaskRecord["frontmatter"]["runner"]>): string {
  const duration =
    typeof entry.metrics?.duration_ms === "number"
      ? bucketDurationMs(entry.metrics.duration_ms)
      : "duration_unknown";
  const stdout =
    typeof entry.metrics?.stdout_bytes === "number"
      ? bucketBytes(entry.metrics.stdout_bytes)
      : "stdout_unknown";
  const stderr =
    typeof entry.metrics?.stderr_bytes === "number"
      ? bucketBytes(entry.metrics.stderr_bytes)
      : "stderr_unknown";
  return [
    `status=${entry.status}`,
    `adapter=${entry.adapter_id}`,
    `mode=${entry.mode}`,
    `exit=${entry.exit_code ?? "null"}`,
    duration,
    stdout,
    stderr,
  ].join("|");
}

async function summarizeQuality(tasks: TaskRecord[]): Promise<InsightsReport["quality"]> {
  const verifySteps: CountMap = {};
  const intakeManifest: CountMap = {};
  const runnerRepeat: CountMap = {};
  const runnerFailureFingerprints: CountMap = {};

  await Promise.all(
    tasks.map(async (task) => {
      bump(verifySteps, task.frontmatter.verify.length > 0 ? "present" : "missing");
      const manifestPath = path.join(
        path.dirname(task.readmePath),
        "context",
        "file-manifest.json",
      );
      const manifestExists = await pathExists(manifestPath);
      if (manifestExists) {
        bump(intakeManifest, "present");
      } else if (task.frontmatter.status === "DONE") {
        bump(intakeManifest, "legacy_done_missing");
      } else {
        bump(intakeManifest, "missing");
      }

      const runner = task.frontmatter.runner;
      if (!runner) return;
      const entries = [runner, ...(runner.history ?? [])];
      bump(runnerRepeat, entries.length > 1 ? "repeat" : "single");
      for (const entry of entries) {
        if (
          entry.status === "failed" ||
          entry.status === "blocked" ||
          entry.status === "cancelled"
        ) {
          bump(runnerFailureFingerprints, runnerFailureFingerprint(entry));
        }
      }
    }),
  );

  return {
    verify_steps: verifySteps,
    intake_manifest: intakeManifest,
    runner_repeat: runnerRepeat,
    runner_failure_fingerprints: runnerFailureFingerprints,
  };
}

function summarizeRunner(tasks: TaskRecord[]): InsightsReport["runner"] {
  const byStatus: CountMap = {};
  const byAdapter: CountMap = {};
  const mode: CountMap = {};
  const durationBuckets: CountMap = {};
  const stdoutBuckets: CountMap = {};
  const stderrBuckets: CountMap = {};
  let tasksWithRunner = 0;

  for (const task of tasks) {
    const runner = task.frontmatter.runner;
    if (!runner) continue;
    tasksWithRunner += 1;
    const entries = [runner, ...(runner.history ?? [])];
    for (const entry of entries) {
      bump(byStatus, entry.status);
      bump(byAdapter, entry.adapter_id);
      bump(mode, entry.mode);
      bump(durationBuckets, bucketDurationMs(entry.metrics?.duration_ms));
      bump(stdoutBuckets, bucketBytes(entry.metrics?.stdout_bytes));
      bump(stderrBuckets, bucketBytes(entry.metrics?.stderr_bytes));
    }
  }

  return {
    tasks_with_runner: tasksWithRunner,
    by_status: byStatus,
    by_adapter: byAdapter,
    mode,
    duration_ms_buckets: durationBuckets,
    stdout_bytes_buckets: stdoutBuckets,
    stderr_bytes_buckets: stderrBuckets,
  };
}

export async function buildInsightsReport(opts: {
  deps: RunDeps;
  recentLimit: number;
  failure?: FailureContextInput;
}): Promise<InsightsReport> {
  const [resolved, loaded] = await Promise.all([
    opts.deps.getResolvedProject("insights report"),
    opts.deps.getLoadedConfig("insights report"),
  ]);
  const root = resolved.gitRoot;
  const [agentplaneVersion, backend, git, tasks] = await Promise.all([
    Promise.resolve(getVersion()),
    readBackendSummary(root, loaded.config.tasks_backend.config_path),
    readGitStatus(root),
    listTasksForInsights(root),
  ]);
  const nodeMajor = Number.parseInt(process.versions.node.split(".")[0] ?? "", 10);

  return {
    schema: "agentplane.insights.report.v1",
    generated_at: new Date().toISOString(),
    privacy: {
      local_only: true,
      network: "not_used",
      upload: "not_supported",
      excludes: [
        "task titles",
        "task descriptions",
        "task document bodies",
        "comments and event bodies",
        "raw runner traces",
        "stdout/stderr content",
        "commit messages",
        "git remotes",
        "file paths outside AgentPlane-managed relative config paths",
        "environment variables",
        "raw branch names",
        "raw command arguments",
        "raw error messages",
        "raw stack traces",
      ],
    },
    failure: buildFailureContext(opts.failure),
    environment: {
      agentplane_version: agentplaneVersion,
      node_major: Number.isFinite(nodeMajor) ? nodeMajor : null,
      platform: os.platform(),
      arch: os.arch(),
    },
    project: {
      workflow_mode: loaded.config.workflow_mode,
      backend,
      paths: {
        workflow_dir: loaded.config.paths.workflow_dir,
        worktrees_dir: loaded.config.paths.worktrees_dir,
      },
    },
    git,
    tasks: summarizeTasks(tasks, opts.recentLimit),
    quality: await summarizeQuality(tasks),
    runner: summarizeRunner(tasks),
  };
}
