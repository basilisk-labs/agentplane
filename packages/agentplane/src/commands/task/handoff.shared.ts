import { gitRevParse, resolveBaseBranch } from "@agentplaneorg/core/git";
import { normalizeTaskStatus, taskExecutionBaseFromExtensions } from "@agentplaneorg/core/tasks";

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
  readTaskPrMetaSummary,
  projectDurableTaskHandoffRunnerHint,
  type TaskHandoffArtifact,
  type TaskHandoffRunnerHint,
} from "../shared/task-handoff.js";
import { readTaskHandoffForTask } from "../shared/task-handoff-reader.js";
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
  include_runner_state?: boolean;
  preobserved_branch?: string | null;
  fresh_head?: boolean;
  workflow_mode?: "direct" | "branch_pr";
  task?: TaskData;
}): Promise<TaskResumeContext> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const requestedMode = opts.workflow_mode ?? ctx.config.workflow_mode;
  const task =
    opts.task ??
    (await loadTaskFromContext({
      ctx,
      taskId: opts.task_id,
      preferBranchSnapshot: requestedMode === "branch_pr",
    }));
  const workflowMode =
    opts.workflow_mode ??
    task.execution_contract?.selected_mode ??
    task.execution_route?.selected_mode ??
    ctx.config.workflow_mode;
  const [branch, prMeta] = await Promise.all([
    Object.hasOwn(opts, "preobserved_branch")
      ? Promise.resolve(opts.preobserved_branch ?? null)
      : currentGitBranch(ctx.resolvedProject.gitRoot),
    readTaskPrMetaSummary({ ctx, task_id: opts.task_id }),
  ]);
  // A route refresh can follow a mutation performed through a separate command
  // context. Those callers require a direct observation; read-only preparation
  // may reuse the command-scoped HEAD promise.
  const head_sha = await (
    opts.fresh_head ? gitRevParse(ctx.resolvedProject.gitRoot, ["HEAD"]) : ctx.git.headCommit()
  ).catch(() => null);
  const frozenBase = taskExecutionBaseFromExtensions(task.extensions);
  const base_branch =
    frozenBase?.base_ref ??
    prMeta.base ??
    (await resolveBaseBranch({
      cwd: ctx.resolvedProject.gitRoot,
      rootOverride: ctx.resolvedProject.gitRoot,
      mode: workflowMode,
    }).catch(() => null));
  const latest_handoff = await readTaskHandoffForTask({
    gitRoot: ctx.resolvedProject.gitRoot,
    workflowDir: ctx.config.paths.workflow_dir,
    taskId: opts.task_id,
    workflowMode,
    baseBranch: base_branch,
  });

  let runner: TaskHandoffRunnerHint;
  if (opts.include_runner_state === false) {
    runner = {
      run_id: null,
      status: null,
      heartbeat_at: null,
      state_path: null,
      trace_path: null,
      ...buildRunnerHintCommands({
        task_id: opts.task_id,
        run_id: null,
        status: null,
      }),
    };
  } else {
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
      runner: projectDurableTaskHandoffRunnerHint(resume.runner),
      next_actions: opts.next_actions,
      risks: opts.risks,
      open_questions: opts.open_questions,
      evidence_paths: opts.evidence_paths,
    }),
  };
}
