import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";

import type { RunnerAdapter } from "../adapters/shared.js";
import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { createRunnerAdapter } from "../adapters/index.js";
import { collectRunnerBasePrompts } from "../context/base-prompts.js";
import { assembleRunnerTaskContext } from "../context/task-context.js";
import { createRunnerRunId } from "../run-id.js";
import { resolveTaskRunnerPaths } from "../task-run-paths.js";
import {
  RUNNER_API_VERSION,
  RUNNER_BUNDLE_SCHEMA_VERSION,
  type RunnerContextBundle,
  type RunnerExecutionContract,
  type RunnerInvocation,
  type RunnerRecipeContext,
  type RunnerResult,
  type RunnerRunState,
  type RunnerTarget,
} from "../types.js";

export type PreparedTaskRunnerExecution = {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state: RunnerRunState;
};

export type ExecutedTaskRunnerExecution = PreparedTaskRunnerExecution & {
  result: RunnerResult;
};

function renderTaskRunnerBootstrap(
  bundle: RunnerContextBundle,
  invocation: RunnerInvocation,
): string {
  const targetLabel =
    bundle.target.kind === "task"
      ? `task ${bundle.target.task_id}`
      : `recipe scenario ${bundle.target.recipe_id}:${bundle.target.scenario_id}`;
  return [
    "# agentplane runner bootstrap",
    "",
    `- target: ${targetLabel}`,
    `- adapter: ${bundle.execution.adapter_id}`,
    `- mode: ${bundle.execution.mode}`,
    `- run_id: ${bundle.execution.run_id}`,
    `- bundle_path: ${bundle.execution.artifact_paths.bundle_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts from CLI argv.",
    "",
    "Prepared invocation:",
    "",
    `- argv: ${invocation.argv.join(" ")}`,
  ].join("\n");
}

export async function prepareTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  mode: RunnerExecutionContract["mode"];
  run_id?: string;
  recipe?: RunnerRecipeContext;
  target?: RunnerTarget;
}): Promise<PreparedTaskRunnerExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const taskEnvelope = await assembleRunnerTaskContext({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
  });

  const base_prompts = await collectRunnerBasePrompts({
    git_root: taskEnvelope.repository.git_root,
    owner_id: taskEnvelope.task.data.owner,
    agents_dir: ctx.config.paths.agents_dir,
  });
  const adapter: RunnerAdapter = createRunnerAdapter(ctx.config);
  const configured_adapter_id: RunnerExecutionContract["adapter_id"] =
    adapter.id === "custom" ? "custom" : "codex";
  const run_id = opts.run_id ?? createRunnerRunId();
  const artifact_paths = resolveTaskRunnerPaths({
    git_root: taskEnvelope.repository.git_root,
    workflow_dir: taskEnvelope.repository.workflow_dir,
    task_id: opts.task_id,
    run_id,
  });
  const bundle: RunnerContextBundle = {
    schema_version: RUNNER_BUNDLE_SCHEMA_VERSION,
    runner_api_version: RUNNER_API_VERSION,
    target: opts.target ?? { kind: "task", task_id: opts.task_id },
    base_prompts,
    repository: taskEnvelope.repository,
    task: taskEnvelope.task,
    recipe: opts.recipe,
    execution: {
      adapter_id: configured_adapter_id,
      mode: opts.mode,
      run_id,
      artifact_paths,
      approvals: {
        require_plan: ctx.config.agents?.approvals.require_plan,
        require_verify: ctx.config.agents?.approvals.require_verify,
        require_network: ctx.config.agents?.approvals.require_network,
      },
    },
  };
  const invocation = await adapter.prepare(bundle);
  const state = await writePreparedRunnerArtifacts({
    bundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(bundle, invocation),
  });
  return { bundle, invocation, state };
}

export async function executeTaskRunnerExecution(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
  recipe?: RunnerRecipeContext;
  target?: RunnerTarget;
}): Promise<ExecutedTaskRunnerExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const prepared = await prepareTaskRunnerExecution({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
    mode: "execute",
    run_id: opts.run_id,
    recipe: opts.recipe,
    target: opts.target,
  });
  const adapter = createRunnerAdapter(ctx.config);
  const result = await adapter.execute(prepared.invocation);
  return {
    ...prepared,
    result,
  };
}
