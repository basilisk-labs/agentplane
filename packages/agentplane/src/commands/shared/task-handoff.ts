import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import type {
  TaskHandoff,
  TaskHandoffRoute,
  TaskHandoffRunnerNextAction,
  TaskHandoffRunnerState,
} from "@agentplaneorg/core/schemas";
import { validateTaskHandoff } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { isRecord } from "../../shared/guards.js";
import type { CommandContext } from "./task-backend.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";

export type TaskHandoffArtifact = TaskHandoff;
export type TaskHandoffRunnerHint = TaskHandoffRunnerState;

export type TaskHandoffPaths = {
  handoff_dir: string;
  latest_path: string;
  history_path: string;
};

function trimOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function readBranchPrBatchExtension(task: {
  extensions?: Record<string, unknown>;
}): { primaryTaskId: string | null; branch: string | null; base: string | null } | null {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "included") return null;
  return {
    primaryTaskId: trimOrNull(
      typeof batch.primary_task_id === "string" ? batch.primary_task_id : null,
    ),
    branch: trimOrNull(typeof batch.branch === "string" ? batch.branch : null),
    base: trimOrNull(typeof batch.base === "string" ? batch.base : null),
  };
}

function normalizeStringList(values: string[] | undefined): string[] | undefined {
  if (!values?.length) return undefined;
  const normalized = values.map((value) => value.trim()).filter((value) => value.length > 0);
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeRoute(route: TaskHandoffRoute | undefined): TaskHandoffRoute | undefined {
  if (!route) return undefined;
  return {
    kind: route.kind,
    status: route.status ?? undefined,
    local_mutation: route.local_mutation ?? undefined,
    finalize_via: route.finalize_via ?? undefined,
    pr_number: typeof route.pr_number === "number" && route.pr_number > 0 ? route.pr_number : null,
    pr_url: trimOrNull(route.pr_url) ?? undefined,
    handoff_show_command: trimOrNull(route.handoff_show_command) ?? undefined,
    base_pull_command: trimOrNull(route.base_pull_command) ?? undefined,
  };
}

export function resolveTaskHandoffPaths(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
}): TaskHandoffPaths {
  const handoff_dir = path.join(opts.git_root, opts.workflow_dir, opts.task_id, "handoff");
  return {
    handoff_dir,
    latest_path: path.join(handoff_dir, "latest.json"),
    history_path: path.join(handoff_dir, "history.jsonl"),
  };
}

export async function readTaskHandoffLatest(
  paths: TaskHandoffPaths,
): Promise<TaskHandoffArtifact | null> {
  try {
    const raw = await readFile(paths.latest_path, "utf8");
    return validateTaskHandoff(JSON.parse(raw) as unknown);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function readTaskHandoffLatestRequired(opts: {
  task_id: string;
  paths: TaskHandoffPaths;
}): Promise<TaskHandoffArtifact> {
  const handoff = await readTaskHandoffLatest(opts.paths);
  if (handoff) return handoff;
  throw new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `Task handoff artifact not found for ${opts.task_id} (${opts.paths.latest_path})`,
  });
}

export async function writeTaskHandoff(opts: {
  paths: TaskHandoffPaths;
  handoff: TaskHandoffArtifact;
}): Promise<void> {
  await mkdir(opts.paths.handoff_dir, { recursive: true });
  await writeJsonStableIfChanged(opts.paths.latest_path, opts.handoff);
  await appendFile(opts.paths.history_path, `${JSON.stringify(opts.handoff)}\n`, "utf8");
}

export async function currentGitBranch(gitRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return trimOrNull(stdout);
  } catch {
    return null;
  }
}

export async function readTaskPrBranch(opts: {
  ctx: CommandContext;
  task_id: string;
}): Promise<string | null> {
  const summary = await readTaskPrMetaSummary(opts);
  return summary.branch;
}

export async function readTaskPrMetaSummary(opts: {
  ctx: CommandContext;
  task_id: string;
}): Promise<{ branch: string | null; base: string | null }> {
  const prMetaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task_id,
    "pr",
    "meta.json",
  );
  try {
    const raw = JSON.parse(await readFile(prMetaPath, "utf8")) as {
      branch?: string;
      base?: string;
    };
    return {
      branch: trimOrNull(raw.branch),
      base: trimOrNull(raw.base),
    };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      const task = await opts.ctx.taskBackend.getTask(opts.task_id);
      const batch = task ? readBranchPrBatchExtension(task) : null;
      if (!batch?.branch || !batch.primaryTaskId) return { branch: null, base: null };
      const primaryTask = await opts.ctx.taskBackend.getTask(batch.primaryTaskId);
      if (!primaryTask) return { branch: null, base: null };
      return { branch: batch.branch, base: batch.base };
    }
    throw err;
  }
}

export function buildTaskHandoffArtifact(opts: {
  task_id: string;
  created_at: string;
  from_role: string;
  to_role?: string | null;
  reason: string;
  note?: string;
  branch?: string | null;
  base_branch?: string | null;
  head_sha?: string | null;
  workspace_root?: string | null;
  pr_branch?: string | null;
  runner?: TaskHandoffRunnerHint | undefined;
  route?: TaskHandoffRoute | undefined;
  next_actions?: string[] | undefined;
  risks?: string[] | undefined;
  open_questions?: string[] | undefined;
  evidence_paths?: string[] | undefined;
}): TaskHandoffArtifact {
  return validateTaskHandoff({
    schema_version: 1,
    task_id: opts.task_id,
    created_at: opts.created_at,
    from_role: opts.from_role.trim(),
    to_role: trimOrNull(opts.to_role),
    reason: opts.reason.trim(),
    note: trimOrNull(opts.note) ?? undefined,
    branch: trimOrNull(opts.branch),
    base_branch: trimOrNull(opts.base_branch),
    head_sha: trimOrNull(opts.head_sha),
    workspace_root: trimOrNull(opts.workspace_root),
    pr_branch: trimOrNull(opts.pr_branch),
    runner: opts.runner,
    route: normalizeRoute(opts.route),
    next_actions: normalizeStringList(opts.next_actions),
    risks: normalizeStringList(opts.risks),
    open_questions: normalizeStringList(opts.open_questions),
    evidence_paths: normalizeStringList(opts.evidence_paths),
  } satisfies TaskHandoffArtifact);
}

export function buildRunnerHintCommands(opts: {
  task_id: string;
  run_id: string | null;
  status: string | null;
}): {
  next_action: TaskHandoffRunnerNextAction;
  next_command: string | null;
  resume_command: string | null;
  retry_command: string | null;
} {
  const runCommand = `agentplane task run ${opts.task_id}`;
  const statusCommand = opts.run_id
    ? `agentplane task run status ${opts.task_id} --run-id ${opts.run_id}`
    : `agentplane task run status ${opts.task_id}`;
  const logsCommand = opts.run_id
    ? `agentplane task run logs ${opts.task_id} --run-id ${opts.run_id} --stream events --follow`
    : `agentplane task run logs ${opts.task_id} --stream events --follow`;
  if (!opts.run_id || !opts.status) {
    return {
      next_action: "run",
      next_command: runCommand,
      resume_command: runCommand,
      retry_command: null,
    };
  }
  if (opts.status === "running") {
    return {
      next_action: "wait",
      next_command: statusCommand,
      resume_command: logsCommand,
      retry_command: null,
    };
  }
  if (opts.status === "failed" || opts.status === "cancelled") {
    return {
      next_action: "retry",
      next_command: runCommand,
      resume_command: statusCommand,
      retry_command: runCommand,
    };
  }
  if (opts.status === "prepared") {
    return {
      next_action: "resume",
      next_command: runCommand,
      resume_command: runCommand,
      retry_command: runCommand,
    };
  }
  return {
    next_action: "none",
    next_command: `agentplane task verify-show ${opts.task_id}`,
    resume_command: statusCommand,
    retry_command: runCommand,
  };
}
