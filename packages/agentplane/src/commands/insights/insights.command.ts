import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { execFile as execFileCb } from "node:child_process";

import { listTasks, type TaskRecord } from "@agentplaneorg/core/tasks";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { createCliEmitter, infoMessage, type CliReportEntry } from "../../cli/output.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import type { RunDeps } from "../../cli/run-cli/command-catalog/kernel.js";
import { getVersion } from "../../meta/version.js";
import { isRecord } from "../../shared/guards.js";
import { wrapCommand } from "../../cli/run-cli/commands/wrap-command.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";

import {
  insightsIssueSpec,
  insightsSpec,
  type InsightsIssueParsed,
  type InsightsReportParsed,
} from "./insights.spec.js";

export { insightsIssueSpec, insightsReportSpec, insightsSpec } from "./insights.spec.js";

const execFile = promisify(execFileCb);
const output = createCliEmitter();

type CountMap = Record<string, number>;

type InsightsReport = {
  schema: "agentplane.insights.report.v1";
  generated_at: string;
  privacy: {
    local_only: true;
    network: "not_used";
    upload: "not_supported";
    excludes: string[];
  };
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
  const branch =
    branchResult.status === "fulfilled" ? branchResult.value.stdout.trim() || null : null;
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
    listTasks({ cwd: root, rootOverride: root }),
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
      ],
    },
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
    runner: summarizeRunner(tasks),
  };
}

type GithubIssueResponse = {
  number: number;
  html_url?: string;
};

type FeedbackGithubIssuesSettings = {
  enabled: boolean;
  repository: string;
  include_insights_report: boolean;
  labels: string[];
};

function trimOptional(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

function sanitizeIssueTitle(title: string | undefined, errorCode: string | undefined): string {
  const explicit = trimOptional(title);
  if (explicit) return explicit.slice(0, 120);
  const suffix = trimOptional(errorCode) ? ` (${trimOptional(errorCode)})` : "";
  return `AgentPlane internal error report${suffix}`;
}

function renderIssueBody(opts: {
  body: string | undefined;
  errorCode: string | undefined;
  report: InsightsReport;
  includeInsightsReport: boolean;
}): string {
  const sections = [
    "## Summary",
    trimOptional(opts.body) ??
      "AgentPlane reported an internal error and prompted an opt-in report.",
    "",
    "## Error",
    `- Code: ${trimOptional(opts.errorCode) ?? "unknown"}`,
    `- AgentPlane: ${opts.report.environment.agentplane_version ?? "unknown"}`,
    `- Platform: ${opts.report.environment.platform}/${opts.report.environment.arch}`,
    "",
    "## Privacy",
    "- This issue was created only after project opt-in.",
    "- The attached diagnostic report is privacy-bounded.",
    `- Excluded content: ${opts.report.privacy.excludes.join("; ")}`,
  ];
  if (opts.includeInsightsReport) {
    sections.push("", "## Insights report", "```json", JSON.stringify(opts.report, null, 2), "```");
  }
  return `${sections.join("\n")}\n`;
}

function renderCountMap(map: CountMap, limit?: number): string {
  let entries = Object.entries(map).filter(([, value]) => value > 0);
  if (entries.length === 0) return "none";
  entries = entries.toSorted(([keyA, valueA], [keyB, valueB]) => {
    if (valueA !== valueB) return valueB - valueA;
    return keyA.localeCompare(keyB);
  });
  if (limit !== undefined && entries.length > limit) {
    const visible = entries.slice(0, limit);
    const other = entries.slice(limit).reduce((sum, [, value]) => sum + value, 0);
    entries = [...visible, ["other", other]];
  }
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
}

function renderInsightsReport(report: InsightsReport): CliReportEntry[] {
  return [
    { label: "schema", value: report.schema },
    { label: "generated_at", value: report.generated_at },
    { label: "local_only", value: report.privacy.local_only },
    { label: "network", value: report.privacy.network },
    { label: "upload", value: report.privacy.upload },
    { label: "agentplane", value: report.environment.agentplane_version ?? "unknown" },
    { label: "node_major", value: report.environment.node_major ?? "unknown" },
    { label: "platform", value: `${report.environment.platform}/${report.environment.arch}` },
    { label: "workflow_mode", value: report.project.workflow_mode },
    { label: "backend", value: report.project.backend.id },
    { label: "backend_cache_configured", value: report.project.backend.cache_configured },
    { label: "git_branch", value: report.git.branch ?? "unknown" },
    { label: "git_dirty", value: report.git.dirty },
    { label: "git_status", value: renderCountMap(report.git.status_counts) },
    { label: "tasks_total", value: report.tasks.total },
    { label: "tasks_by_status", value: renderCountMap(report.tasks.by_status) },
    { label: "tasks_by_owner", value: renderCountMap(report.tasks.by_owner) },
    { label: "tasks_by_primary_tag", value: renderCountMap(report.tasks.by_primary_tag, 20) },
    { label: "plan_approval", value: renderCountMap(report.tasks.plan_approval) },
    { label: "verification", value: renderCountMap(report.tasks.verification) },
    { label: "verify_steps", value: renderCountMap(report.tasks.verify_steps) },
    { label: "task_event_types", value: renderCountMap(report.tasks.event_types) },
    { label: "active_task_ids", value: report.tasks.active_task_ids.join(", ") || "none" },
    { label: "recent_task_ids", value: report.tasks.recent_task_ids.join(", ") || "none" },
    { label: "runner_tasks", value: report.runner.tasks_with_runner },
    { label: "runner_status", value: renderCountMap(report.runner.by_status) },
    { label: "runner_adapters", value: renderCountMap(report.runner.by_adapter) },
    { label: "runner_modes", value: renderCountMap(report.runner.mode) },
    { label: "runner_duration", value: renderCountMap(report.runner.duration_ms_buckets) },
    {
      label: "excluded_content",
      value: report.privacy.excludes.join("; "),
    },
  ];
}

export const runInsights: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: insightsSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["insights"]),
    command: "insights",
    contextCommand: "insights",
  });
};

export function makeRunInsightsReportHandler(deps: RunDeps): CommandHandler<InsightsReportParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "insights report", rootOverride: ctx.rootOverride }, async () => {
      const report = await buildInsightsReport({ deps, recentLimit: parsed.recentLimit });
      if (parsed.json) {
        output.json(report);
      } else {
        output.report(renderInsightsReport(report), {
          header: infoMessage("insights report: local diagnostic summary"),
        });
      }
      return 0;
    });
}

export function makeRunInsightsIssueHandler(deps: RunDeps): CommandHandler<InsightsIssueParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "insights issue", rootOverride: ctx.rootOverride }, async () => {
      const [resolved, loaded] = await Promise.all([
        deps.getResolvedProject("insights issue"),
        deps.getLoadedConfig("insights issue"),
      ]);
      const settings = (loaded.config.feedback as { github_issues: FeedbackGithubIssuesSettings })
        .github_issues;
      if (!settings.enabled && !parsed.dryRun) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message:
            "Feedback GitHub issues are disabled. Enable with `agentplane config set feedback.github_issues.enabled true`, then retry.",
          context: {
            command: "insights issue",
            reason_code: "feedback_github_issues_disabled",
          },
        });
      }

      const report = await buildInsightsReport({ deps, recentLimit: 8 });
      const title = sanitizeIssueTitle(parsed.title, parsed.errorCode);
      const body = renderIssueBody({
        body: parsed.body,
        errorCode: parsed.errorCode,
        report,
        includeInsightsReport: settings.include_insights_report,
      });
      const payload = {
        repository: settings.repository,
        title,
        body,
        labels: settings.labels,
      };

      if (parsed.dryRun) {
        output.json({ dry_run: true, ...payload });
        return 0;
      }

      const issue = await runGhApiJson<GithubIssueResponse>(resolved.gitRoot, [
        `repos/${settings.repository}/issues`,
        "-X",
        "POST",
        "-f",
        `title=${title}`,
        "-f",
        `body=${body}`,
        ...settings.labels.flatMap((label) => ["-f", `labels[]=${label}`]),
      ]);
      output.report(
        [
          { label: "repository", value: settings.repository },
          { label: "issue", value: `#${issue.number}` },
          { label: "url", value: issue.html_url ?? "unknown" },
        ],
        { header: infoMessage("feedback issue created") },
      );
      return 0;
    });
}
