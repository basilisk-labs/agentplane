import type { TaskData, TaskRunnerHistoryEntry } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { RunnerRunRepository } from "../run-repository.js";
import { hasExplicitRunnerDangerFullAccessAuthority } from "../sandbox-policy.js";
import { assertSafeRunnerRunId, createRunnerRunId } from "../task-run-paths.js";
import type { RunnerDangerFullAccessAuthority, RunnerLifecycleStatus } from "../types.js";
import { RUNNER_DANGER_FULL_ACCESS_SANDBOX } from "../types.js";

import { executeTaskRunnerExecution, type ExecutedTaskRunnerExecution } from "./task-run.js";
import {
  assertCurrentTaskDoing,
  runnerReplayDangerAuthoritySource,
  type ResumedTaskRunnerExecution,
  type RetriedTaskRunnerExecution,
  type RunnerReplayAction,
} from "./task-run-lifecycle-shared.js";
import { matchingTaskRunnerAnchors } from "./task-run-replay-anchor.js";

type FreshReplayExecution = ExecutedTaskRunnerExecution & {
  ctx: CommandContext;
  source_run_id: string;
  source_status: RunnerLifecycleStatus;
};

function replaySourceGuidance(source: TaskRunnerHistoryEntry, taskId: string): string {
  if (
    source.target.kind === "recipe_scenario" &&
    typeof source.target.recipe_id === "string" &&
    source.target.recipe_id.length > 0 &&
    typeof source.target.scenario_id === "string" &&
    source.target.scenario_id.length > 0
  ) {
    return (
      `agentplane recipes scenario execute ` +
      `${source.target.recipe_id}:${source.target.scenario_id}`
    );
  }
  return `agentplane task run ${taskId}`;
}

function selectFreshReplaySource(opts: {
  action: RunnerReplayAction;
  task_id: string;
  run_id: string;
  task: TaskData;
}): TaskRunnerHistoryEntry {
  const anchors = matchingTaskRunnerAnchors(opts.task, opts.run_id);
  if (anchors.length !== 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `runner ${opts.action} requires one unambiguous external ` +
        `TaskData.runner/history anchor for ${opts.task_id}:${opts.run_id}; ` +
        `run \`agentplane task run ${opts.task_id}\` to start fresh.`,
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        replay_action: opts.action,
        external_anchor_count: anchors.length,
      },
    });
  }

  const source = anchors[0]!;
  if (
    source.mode !== "execute" ||
    source.target.kind !== "task" ||
    source.target.task_id !== opts.task_id
  ) {
    const guidance = replaySourceGuidance(source, opts.task_id);
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `runner ${opts.action} cannot safely reconstruct ${source.target.kind} source ` +
        `${opts.task_id}:${opts.run_id}; execute current inputs with \`${guidance}\`.`,
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        replay_action: opts.action,
        source_mode: source.mode,
        source_target: source.target,
        fresh_execution_command: guidance,
      },
    });
  }
  if (source.status === "prepared" || source.status === "running" || source.status === "success") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `runner ${opts.action} requires a failed, blocked, or cancelled external run ` +
        `(current=${JSON.stringify(source.status)}; ` +
        `use \`agentplane task run ${opts.task_id}\` to start fresh).`,
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        replay_action: opts.action,
        source_status: source.status,
      },
    });
  }
  return source;
}

function assertNoCompetingActiveReplayRun(opts: {
  action: RunnerReplayAction;
  task_id: string;
  source_run_id: string;
  task: TaskData;
}): void {
  const current = opts.task.runner;
  if (
    !current ||
    current.run_id === opts.source_run_id ||
    (current.status !== "prepared" && current.status !== "running")
  ) {
    return;
  }
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `runner ${opts.action} refuses to start while current external run ` +
      `${opts.task_id}:${current.run_id} is ${current.status}.`,
    context: {
      task_id: opts.task_id,
      run_id: opts.source_run_id,
      replay_action: opts.action,
      competing_run_id: current.run_id,
      competing_run_status: current.status,
    },
  });
}

function assertFreshReplayDangerAuthority(opts: {
  action: RunnerReplayAction;
  task_id: string;
  run_id: string;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
}): void {
  const authority = opts.danger_authority;
  if (!authority) return;

  const expectedSource = runnerReplayDangerAuthoritySource(opts.action);
  const exactKeys =
    Object.keys(authority).toSorted().join("\n") ===
    ["danger_full_access_authorized", "provenance", "source"].join("\n");
  if (
    exactKeys &&
    hasExplicitRunnerDangerFullAccessAuthority(authority) &&
    authority.source === expectedSource
  ) {
    return;
  }
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `runner ${opts.action} danger-full-access requires a fresh exact explicit-operator ` +
      `authority tuple with source ${JSON.stringify(expectedSource)}.`,
    context: {
      task_id: opts.task_id,
      run_id: opts.run_id,
      replay_action: opts.action,
      declared_value: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      required_authority: "fresh_explicit_operator_danger_full_access_authority",
      expected_source: expectedSource,
    },
  });
}

function resolveFreshReplayRunId(opts: {
  action: RunnerReplayAction;
  task_id: string;
  source_run_id: string;
  new_run_id?: string;
}): string {
  const sourceRunId = assertSafeRunnerRunId(opts.source_run_id);
  const destinationRunId = assertSafeRunnerRunId(opts.new_run_id ?? createRunnerRunId());
  if (destinationRunId !== sourceRunId) return destinationRunId;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `runner ${opts.action} requires a fresh destination run_id distinct from source ` +
      `${opts.task_id}:${sourceRunId}.`,
    context: {
      task_id: opts.task_id,
      run_id: sourceRunId,
      replay_action: opts.action,
      source_run_id: sourceRunId,
      destination_run_id: destinationRunId,
    },
  });
}

async function executeFreshReplay(opts: {
  action: RunnerReplayAction;
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  new_run_id?: string;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
}): Promise<FreshReplayExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  const task = await ctx.taskBackend.getTask(opts.task_id);
  assertCurrentTaskDoing(opts.task_id, task);
  const source = selectFreshReplaySource({
    action: opts.action,
    task_id: opts.task_id,
    run_id: opts.run_id,
    task,
  });
  assertNoCompetingActiveReplayRun({
    action: opts.action,
    task_id: opts.task_id,
    source_run_id: source.run_id,
    task,
  });
  assertFreshReplayDangerAuthority(opts);
  const destinationRunId = resolveFreshReplayRunId({
    action: opts.action,
    task_id: opts.task_id,
    source_run_id: source.run_id,
    new_run_id: opts.new_run_id,
  });

  const executed = await executeTaskRunnerExecution({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: destinationRunId,
    danger_authority: opts.danger_authority,
    include_route_runner_state: false,
    sandbox_override: opts.danger_authority ? RUNNER_DANGER_FULL_ACCESS_SANDBOX : undefined,
  });
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: executed.bundle.repository.git_root,
    workflow_dir: executed.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: destinationRunId,
    storage: "supervisor",
  });
  const requestedAt = new Date().toISOString();
  const eventType = opts.action === "resume" ? "runner_resume_created" : "runner_retry_created";
  await repository.appendEvent({
    at: requestedAt,
    type: eventType,
    message:
      `runner ${opts.action} created fresh from current task/config; ` +
      `source_run_id=${source.run_id}`,
    data: {
      source_run_id: source.run_id,
      source_status: source.status,
      source_trust: "external_task_anchor_only",
      source_artifacts_reused: false,
    },
  });
  return {
    ...executed,
    ctx,
    source_run_id: source.run_id,
    source_status: source.status,
  };
}

export async function resumeTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  new_run_id?: string;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
}): Promise<ResumedTaskRunnerExecution> {
  const resumed = await executeFreshReplay({
    ...opts,
    action: "resume",
  });
  return {
    ...resumed,
    previous_status: resumed.source_status,
  };
}

export async function retryTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  new_run_id?: string;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
}): Promise<RetriedTaskRunnerExecution> {
  return await executeFreshReplay({
    ...opts,
    action: "retry",
  });
}
