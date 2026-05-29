import { resolveBaseBranch } from "@agentplaneorg/core/git";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  buildRunnerHintCommands,
  buildTaskHandoffArtifact,
  currentGitBranch,
  readTaskHandoffLatest,
  readTaskPrMetaSummary,
  resolveTaskHandoffPaths,
  type TaskHandoffArtifact,
  type TaskHandoffRunnerHint,
} from "../shared/task-handoff.js";
import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import { isProcessAlive } from "../../runner/process-supervision/signals.js";
import { CliError } from "../../shared/errors.js";

export type TaskResumeContext = {
  task_id: string;
  task_status: string;
  branch: string | null;
  base_branch: string | null;
  head_sha: string | null;
  workspace_root: string;
  pr_branch: string | null;
  latest_handoff: TaskHandoffArtifact | null;
  runner: TaskHandoffRunnerHint;
};

function taskStatus(task: TaskData): string {
  return normalizeTaskStatus(task.status);
}

function nullIfCliIo(err: unknown): null {
  if (err instanceof CliError && err.code === "E_IO") return null;
  throw err;
}

export async function buildTaskResumeContext(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
}): Promise<TaskResumeContext> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.task_id });
  const handoffPaths = resolveTaskHandoffPaths({
    git_root: ctx.resolvedProject.gitRoot,
    workflow_dir: ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
  });
  const [branch, latest_handoff, prMeta] = await Promise.all([
    currentGitBranch(ctx.resolvedProject.gitRoot),
    readTaskHandoffLatest(handoffPaths),
    readTaskPrMetaSummary({ ctx, task_id: opts.task_id }),
  ]);
  const head_sha = await ctx.git.headCommit().catch(() => null);
  const base_branch =
    prMeta.base ??
    (await resolveBaseBranch({
      cwd: ctx.resolvedProject.gitRoot,
      rootOverride: ctx.resolvedProject.gitRoot,
      mode: ctx.config.workflow_mode,
    }).catch(() => null));

  let runner: TaskHandoffRunnerHint;
  try {
    const inspection = await loadTaskRunnerInspection({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      task_id: opts.task_id,
      run_id: opts.run_id,
    });
    const pid = inspection.state.supervision?.pid;
    const pidAlive = typeof pid === "number" ? isProcessAlive(pid) : null;
    const commands = buildRunnerHintCommands({
      task_id: opts.task_id,
      run_id: inspection.run_id,
      status: inspection.state.status,
      pid_alive: pidAlive,
      author: task.owner,
    });
    runner = {
      run_id: inspection.run_id,
      status: inspection.state.status,
      heartbeat_at: inspection.state.supervision?.heartbeat_at ?? null,
      state_path: inspection.paths.state_path,
      trace_path: inspection.paths.trace_path,
      ...commands,
    };
  } catch (err) {
    const noRun = nullIfCliIo(err);
    runner = {
      run_id: null,
      status: null,
      heartbeat_at: null,
      state_path: null,
      trace_path: null,
      ...buildRunnerHintCommands({
        task_id: opts.task_id,
        run_id: noRun,
        status: null,
      }),
    };
  }

  return {
    task_id: opts.task_id,
    task_status: taskStatus(task),
    branch,
    base_branch,
    head_sha,
    workspace_root: ctx.resolvedProject.gitRoot,
    pr_branch: prMeta.branch,
    latest_handoff,
    runner,
  };
}

export async function buildRecordedTaskHandoff(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  from_role: string;
  to_role?: string | null;
  reason: string;
  note?: string;
  next_actions?: string[];
  risks?: string[];
  open_questions?: string[];
  evidence_paths?: string[];
  run_id?: string;
}): Promise<{ ctx: CommandContext; handoff: TaskHandoffArtifact }> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  await loadTaskFromContext({ ctx, taskId: opts.task_id });
  const resume = await buildTaskResumeContext({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  return {
    ctx,
    handoff: buildTaskHandoffArtifact({
      task_id: opts.task_id,
      created_at: new Date().toISOString(),
      from_role: opts.from_role,
      to_role: opts.to_role,
      reason: opts.reason,
      note: opts.note,
      branch: resume.branch,
      base_branch: resume.base_branch,
      head_sha: resume.head_sha,
      workspace_root: resume.workspace_root,
      pr_branch: resume.pr_branch,
      runner: resume.runner,
      next_actions: opts.next_actions,
      risks: opts.risks,
      open_questions: opts.open_questions,
      evidence_paths: opts.evidence_paths,
    }),
  };
}
