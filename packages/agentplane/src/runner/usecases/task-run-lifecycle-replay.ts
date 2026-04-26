import { createRunnerAdapter } from "../adapters/index.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { RunnerRunRepository } from "../run-repository.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { createRunnerRunId, resolveTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerContextBundle } from "../types.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

import { renderTaskRunnerBootstrap } from "./task-run.js";
import {
  assertExecuteMode,
  loadExistingRunnerExecution,
  type ResumedTaskRunnerExecution,
  type RetriedTaskRunnerExecution,
} from "./task-run-lifecycle-shared.js";
import { CliError } from "../../shared/errors.js";

export async function resumeTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
}): Promise<ResumedTaskRunnerExecution> {
  const loaded = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  assertExecuteMode(loaded.bundle, "resume");
  if (loaded.state.status === "running" || loaded.state.status === "success") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `runner resume requires a prepared, failed, or cancelled run ` +
        `(current=${JSON.stringify(loaded.state.status)})`,
    });
  }

  const requested_at = new Date().toISOString();
  const resetState = evolveRunnerRunState({
    state: loaded.state,
    status: "prepared",
    updated_at: requested_at,
  });
  await loaded.repository.writeState(resetState);
  await loaded.repository.appendEvent({
    at: requested_at,
    type: "runner_resume_requested",
    message: `runner resume requested from status=${loaded.state.status}`,
    data: {
      previous_status: loaded.state.status,
    },
  });

  const result = await createRunnerAdapter(loaded.ctx.config).execute(loaded.invocation);
  const nextState = (await loaded.repository.readState()) ?? resetState;
  await persistRunnerOutcomeToTask({
    ctx: loaded.ctx,
    task_id: opts.task_id,
    bundle: loaded.bundle,
    state: nextState,
  });
  return { ...loaded, state: nextState, previous_status: loaded.state.status, result };
}

export async function retryTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id: string;
  new_run_id?: string;
}): Promise<RetriedTaskRunnerExecution> {
  const source = await loadExistingRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    run_id: opts.run_id,
  });
  assertExecuteMode(source.bundle, "retry");
  if (source.state.status === "prepared" || source.state.status === "running") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `runner retry requires a failed or cancelled run ` +
        `(current=${JSON.stringify(source.state.status)}; use \`agentplane task run resume ${opts.task_id} ${opts.run_id}\` instead).`,
    });
  }

  const nextRunId = opts.new_run_id ?? createRunnerRunId();
  const paths = resolveTaskRunnerPaths({
    git_root: source.ctx.resolvedProject.gitRoot,
    workflow_dir: source.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: nextRunId,
  });
  const retriedBundle: RunnerContextBundle = {
    ...source.bundle,
    execution: {
      ...source.bundle.execution,
      mode: "execute",
      run_id: nextRunId,
      artifact_paths: paths,
    },
  };
  const adapter = createRunnerAdapter(source.ctx.config);
  const invocation = await adapter.prepare(retriedBundle);
  const retryRepository = RunnerRunRepository.fromBundle(retriedBundle);
  const state = await retryRepository.writePrepared({
    bundle: retriedBundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(retriedBundle, invocation),
    invocation,
  });
  const requested_at = new Date().toISOString();
  await source.repository.appendEvent({
    at: requested_at,
    type: "runner_retry_requested",
    message: `runner retry requested into run_id=${nextRunId}`,
    data: {
      next_run_id: nextRunId,
    },
  });
  await retryRepository.appendEvent({
    at: requested_at,
    type: "runner_retry_created",
    message: `runner retry created from run_id=${source.state.run_id}`,
    data: {
      source_run_id: source.state.run_id,
      source_status: source.state.status,
    },
  });
  const result = await adapter.execute(invocation);
  const nextState = (await retryRepository.readState()) ?? state;
  await persistRunnerOutcomeToTask({
    ctx: source.ctx,
    task_id: opts.task_id,
    bundle: retriedBundle,
    state: nextState,
  });
  return {
    ctx: source.ctx,
    bundle: retriedBundle,
    invocation,
    state: nextState,
    result,
    source_run_id: source.state.run_id,
    source_status: source.state.status,
  };
}
