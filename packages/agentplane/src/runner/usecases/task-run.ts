import { exitCodeForError } from "../../cli/exit-codes.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { buildTaskRouteDecision } from "../../commands/shared/route-decision.js";
import { CliError } from "../../shared/errors.js";
import { resolveRunnerAdapterCapabilityRegistry } from "../../runtime/capabilities/index.js";
import { consumeExecutionProfileBudget } from "../../runtime/execution-profile/index.js";
import {
  appendFrameworkExplainBehaviorInputs,
  type ExplainBehaviorInput,
} from "../../runtime/explain/index.js";
import { buildFrameworkProtocolSurface } from "../../runtime/protocol/index.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";

import type { RunnerAdapter } from "../adapters/shared.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { createRunnerAdapter } from "../adapters/index.js";
import { readRecipeRunProfile } from "../adapters/recipe-run-profile.js";
import { collectRunnerBasePrompts } from "../context/base-prompts.js";
import { assembleRunnerTaskContext } from "../context/task-context.js";
import { applyRunnerPolicyRefusal, buildRunnerPolicyDecision } from "../policy-decision.js";
import { buildRunnerExecutionPlaybookContract } from "../playbooks.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { RunnerRunRepository } from "../run-repository.js";
import { createRunnerRunId, resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import { resolveRunnerSandboxPolicy, resolveRunnerWriteScopePolicy } from "../sandbox-policy.js";
import {
  assertRunnerCheckoutAuthority,
  assertRunnerPolicyCompatibility,
  assertRunnerTaskExecutable,
} from "./task-run-authority.js";
import {
  acquireTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import { inspectTaskRunnerClaimedRunAuthority } from "./task-run-active-claim-authority.js";
import {
  attachSuppressedActiveClaimCleanup,
  reconcileStaleTerminalTaskRunnerActiveClaim,
  reconcileTerminalTaskRunnerActiveClaim,
  recordActiveClaimCleanupFailure,
  type TaskRunnerActiveClaimCleanupDiagnostic,
} from "./task-run-active-claim-runtime.js";
import { renderTaskRunnerBootstrap } from "./task-run-bootstrap.js";
export { renderTaskRunnerBootstrap } from "./task-run-bootstrap.js";
export { assertRunnerBlueprintPolicyModuleBudget } from "./task-run-blueprint-plan.js";
import {
  assertRunnerBlueprintPolicyModuleBudget,
  resolveRunnerBlueprintPlan,
  writeTaskBlueprintSnapshot,
} from "./task-run-blueprint-plan.js";
import {
  RUNNER_API_VERSION,
  RUNNER_BUNDLE_SCHEMA_VERSION,
  type RunnerContextBundle,
  type RunnerDangerFullAccessAuthority,
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
  active_claim_cleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
};

export type TaskRunnerReplayProvenance = {
  action: "resume" | "retry";
  source_run_id: string;
  source_status: RunnerRunState["status"];
};

class RunnerPreparationCliError extends CliError {
  readonly bundle: RunnerContextBundle;
  readonly state: RunnerRunState;

  constructor(opts: { cause: CliError; bundle: RunnerContextBundle; state: RunnerRunState }) {
    super({
      exitCode: opts.cause.exitCode,
      code: opts.cause.code,
      message: opts.cause.message,
      context: opts.cause.context,
    });
    this.bundle = opts.bundle;
    this.state = opts.state;
  }
}

function collectFrameworkExplainBehaviorInputs(
  prompts: RunnerContextBundle["base_prompts"],
): ExplainBehaviorInput[] {
  return prompts.flatMap((prompt) =>
    prompt.resolution
      ? [
          {
            id: prompt.id,
            category: "prompt" as const,
            ...(prompt.source ? { source: prompt.source } : {}),
            resolution: prompt.resolution,
          },
        ]
      : [],
  );
}

async function writeRunnerRefusalArtifacts(opts: {
  bundle: RunnerContextBundle;
  error: CliError;
  repository: RunnerRunRepository;
}): Promise<RunnerRunState> {
  const prepared = await opts.repository.writePrepared({
    bundle: opts.bundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(opts.bundle),
  });
  const result: RunnerResult = {
    status: "failed",
    exit_code: opts.error.exitCode ?? exitCodeForError("E_RUNTIME"),
    started_at: prepared.created_at,
    ended_at: prepared.created_at,
    summary: opts.error.message,
    stderr_summary: opts.error.message,
  };
  const refused = evolveRunnerRunState({
    state: prepared,
    status: "failed",
    result,
    updated_at: prepared.created_at,
  });
  await opts.repository.writeState(refused);
  await opts.repository.appendEvent({
    at: prepared.created_at,
    type: "runner_refused",
    message: `runner refused before adapter prepare: ${opts.error.message}`,
    data: opts.error.context
      ? {
          code: opts.error.code,
          exit_code: opts.error.exitCode,
          ...opts.error.context,
        }
      : {
          code: opts.error.code,
          exit_code: opts.error.exitCode,
        },
  });
  return refused;
}

async function persistReplayAnchorBeforeExecution(opts: {
  ctx: CommandContext;
  task_id: string;
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  provenance: TaskRunnerReplayProvenance;
}): Promise<void> {
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.bundle.repository.git_root,
    workflow_dir: opts.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.bundle.execution.run_id,
    storage: "supervisor",
  });
  const recordedAt = new Date().toISOString();
  const eventType =
    opts.provenance.action === "resume" ? "runner_resume_created" : "runner_retry_created";
  await repository.appendEvent({
    at: recordedAt,
    type: eventType,
    message:
      `runner ${opts.provenance.action} created fresh from current task/config; ` +
      `source_run_id=${opts.provenance.source_run_id}`,
    data: {
      source_run_id: opts.provenance.source_run_id,
      source_status: opts.provenance.source_status,
      source_trust: "external_task_anchor_only",
      source_artifacts_reused: false,
    },
  });
  await persistRunnerOutcomeToTask({
    ctx: opts.ctx,
    task_id: opts.task_id,
    bundle: opts.bundle,
    state: opts.state,
    ordering_authority: "current_active_claim",
  });
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
  danger_authority?: RunnerDangerFullAccessAuthority | null;
  execution_role?: string;
  include_route_runner_state?: boolean;
  sandbox_override?: string;
}): Promise<PreparedTaskRunnerExecution> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  const target = opts.target ?? { kind: "task", task_id: opts.task_id };
  void executionContext.policy.evaluate({
    action: target.kind === "recipe_scenario" ? "scenario_execute" : "task_run",
    config: executionContext.config,
    taskId: opts.task_id,
    git: { stagedPaths: [] },
  });
  let executionProfile = consumeExecutionProfileBudget({
    runtime: executionContext.executionProfile,
    phase: "discovery",
  });
  const taskEnvelope = await assembleRunnerTaskContext({
    ctx: executionContext.command,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.task_id,
  });
  const runnerCommand = target.kind === "recipe_scenario" ? "recipes scenario execute" : "task run";
  const base_prompts = await collectRunnerBasePrompts({
    git_root: executionContext.repo.git_root,
    owner_id: taskEnvelope.task.data.owner,
    agents_dir: executionContext.harness.workflow.paths.agents_dir,
    task: taskEnvelope.task,
    command: runnerCommand,
    recipe: opts.recipe,
    harness: executionContext.harness,
    execution_profile: executionProfile,
  });
  const blueprint = await resolveRunnerBlueprintPlan({
    taskEnvelope,
    config: executionContext.config,
    projectRoot: executionContext.repo.git_root,
    recipe: opts.recipe,
    basePrompts: base_prompts,
  });
  const route_decision = await buildTaskRouteDecision({
    ctx: executionContext.command,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    includeRunnerState: opts.include_route_runner_state,
    taskId: opts.task_id,
  });
  const framework_explain = appendFrameworkExplainBehaviorInputs(
    executionContext.frameworkExplain,
    collectFrameworkExplainBehaviorInputs(base_prompts),
  );
  const framework_protocol = buildFrameworkProtocolSurface({
    explain: framework_explain,
  });
  const adapter: RunnerAdapter = createRunnerAdapter(executionContext.config);
  const configured_adapter_id: RunnerExecutionContract["adapter_id"] = adapter.id;
  const run_id = opts.run_id ?? createRunnerRunId();
  const artifact_paths = await resolveSupervisorTaskRunnerPaths({
    git_root: taskEnvelope.repository.git_root,
    workflow_dir: taskEnvelope.repository.workflow_dir,
    task_id: opts.task_id,
    run_id,
  });
  const sandbox_policy = resolveRunnerSandboxPolicy({
    task: taskEnvelope.task.data,
    recipe: opts.recipe,
    danger_authority: opts.danger_authority,
    execution_role:
      opts.execution_role ??
      taskEnvelope.task.data.owner ??
      route_decision.executionPacket.recommendedRole ??
      undefined,
    requested_sandbox: opts.sandbox_override,
  });
  const write_scope = resolveRunnerWriteScopePolicy({
    sandbox: sandbox_policy,
    protected_path_groups: executionContext.harness.policy.protected_paths,
    task: taskEnvelope.task.data,
    recipe: opts.recipe,
  });
  const bundle: RunnerContextBundle = {
    schema_version: RUNNER_BUNDLE_SCHEMA_VERSION,
    runner_api_version: RUNNER_API_VERSION,
    target,
    base_prompts,
    framework_explain,
    framework_protocol,
    repository: taskEnvelope.repository,
    task: taskEnvelope.task,
    recipe: opts.recipe,
    blueprint,
    route_decision: route_decision as unknown as Record<string, unknown>,
    execution: {
      adapter_id: configured_adapter_id,
      mode: opts.mode,
      run_id,
      artifact_paths,
      profile_runtime: executionProfile,
      trace_policy: executionProfile.runner.trace_policy,
      timeout_policy: executionProfile.runner.timeout_policy,
      evaluator_skepticism_level: executionContext.config.evaluator.skepticism_level,
      sandbox_policy,
      write_scope,
      approvals: {
        require_plan: executionContext.approvals.require_plan,
        require_verify: executionContext.approvals.require_verify,
        require_network: executionContext.approvals.require_network,
      },
    },
  };
  bundle.playbook = buildRunnerExecutionPlaybookContract(bundle);
  executionProfile = consumeExecutionProfileBudget({
    runtime: bundle.execution.profile_runtime ?? executionProfile,
    phase: "implementation",
  });
  bundle.execution.profile_runtime = executionProfile;
  bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
  const requestedPolicy = {
    ...(readRecipeRunProfile(bundle.recipe) ?? {}),
    sandbox: sandbox_policy.requested,
  };
  bundle.execution.policy_decision = buildRunnerPolicyDecision({
    adapter_id: bundle.execution.adapter_id,
    capabilities: bundle.execution.adapter_capabilities,
    recipe: bundle.recipe,
    requested: requestedPolicy,
  });
  bundle.execution.adapter_capability_registry = resolveRunnerAdapterCapabilityRegistry({
    adapter_id: bundle.execution.adapter_id,
    capabilities: bundle.execution.adapter_capabilities,
    requested: bundle.execution.policy_decision.requested,
  });
  assertRunnerBlueprintPolicyModuleBudget(bundle);
  assertRunnerTaskExecutable(bundle);
  await assertRunnerCheckoutAuthority({
    bundle,
    authoritative_checkout_path: route_decision.executionPacket.authoritativeCheckoutPath,
    mutation_path_hint: route_decision.executionPacket.mutationPathHint,
  });
  const repository = RunnerRunRepository.fromBundle(bundle);
  await repository.createFreshDirectory({
    run_id: bundle.execution.run_id,
  });
  let invocation: RunnerInvocation;
  try {
    assertRunnerPolicyCompatibility(bundle);
    await repository.assertBoundary("before writing the blueprint snapshot");
    await writeTaskBlueprintSnapshot(bundle, {
      assert_artifact_boundary: async (phase) => await repository.assertBoundary(phase),
    });
    await repository.assertBoundary("after writing the blueprint snapshot");
    invocation = await adapter.prepare(bundle);
  } catch (err) {
    if (err instanceof CliError) {
      bundle.execution.policy_decision = applyRunnerPolicyRefusal({
        decision:
          bundle.execution.policy_decision ??
          buildRunnerPolicyDecision({
            adapter_id: bundle.execution.adapter_id,
            capabilities: bundle.execution.adapter_capabilities,
            recipe: bundle.recipe,
            requested: requestedPolicy,
          }),
        error: err,
      });
      const state = await writeRunnerRefusalArtifacts({ bundle, error: err, repository });
      throw new RunnerPreparationCliError({ cause: err, bundle, state });
    }
    throw err;
  }
  const state = await repository.writePrepared({
    bundle,
    bootstrap_markdown: renderTaskRunnerBootstrap(bundle, invocation),
    invocation,
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
  danger_authority?: RunnerDangerFullAccessAuthority | null;
  execution_role?: string;
  include_route_runner_state?: boolean;
  sandbox_override?: string;
  replay_provenance?: TaskRunnerReplayProvenance;
}): Promise<ExecutedTaskRunnerExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  await reconcileStaleTerminalTaskRunnerActiveClaim({
    ctx,
    task_id: opts.task_id,
  });
  const runId = opts.run_id ?? createRunnerRunId();
  const activeClaim = await acquireTaskRunnerActiveClaim({
    git_root: ctx.resolvedProject.gitRoot,
    workflow_dir: ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: runId,
    operation: opts.replay_provenance?.action ?? "execute",
    ...(opts.replay_provenance
      ? {
          source_run_id: opts.replay_provenance.source_run_id,
          source_status: opts.replay_provenance.source_status,
        }
      : {}),
    reconcile_terminal_claim: async (claim) => {
      await reconcileTerminalTaskRunnerActiveClaim({
        ctx,
        task_id: opts.task_id,
        claim,
      });
    },
  });
  let cleanupBundle: RunnerContextBundle | null = null;
  let completed: ExecutedTaskRunnerExecution | undefined;
  let primaryError: unknown;
  let hasPrimaryError = false;
  let releaseActiveClaim = true;
  try {
    let prepared: PreparedTaskRunnerExecution;
    try {
      prepared = await prepareTaskRunnerExecution({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        task_id: opts.task_id,
        mode: "execute",
        run_id: runId,
        recipe: opts.recipe,
        target: opts.target,
        danger_authority: opts.danger_authority,
        execution_role: opts.execution_role,
        include_route_runner_state: opts.include_route_runner_state,
        sandbox_override: opts.sandbox_override,
      });
    } catch (err) {
      if (err instanceof RunnerPreparationCliError) {
        cleanupBundle = err.bundle;
        releaseActiveClaim = false;
        if (opts.replay_provenance) {
          await persistReplayAnchorBeforeExecution({
            ctx,
            task_id: opts.task_id,
            bundle: err.bundle,
            state: err.state,
            provenance: opts.replay_provenance,
          });
        } else {
          await persistRunnerOutcomeToTask({
            ctx,
            task_id: opts.task_id,
            bundle: err.bundle,
            state: err.state,
            ordering_authority: "current_active_claim",
          });
        }
        releaseActiveClaim = true;
      }
      throw err;
    }
    cleanupBundle = prepared.bundle;
    releaseActiveClaim = false;
    if (opts.replay_provenance) {
      await persistReplayAnchorBeforeExecution({
        ctx,
        task_id: opts.task_id,
        bundle: prepared.bundle,
        state: prepared.state,
        provenance: opts.replay_provenance,
      });
    }
    const adapter = createRunnerAdapter(ctx.config);
    const result = await adapter.execute(prepared.invocation);
    const runRepository = await RunnerRunRepository.openExistingTaskRun({
      git_root: ctx.resolvedProject.gitRoot,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: opts.task_id,
      run_id: prepared.invocation.run_id,
      storage: "supervisor",
    });
    const observedTerminal = await runRepository.readState();
    const state =
      observedTerminal &&
      observedTerminal.status !== "prepared" &&
      observedTerminal.status !== "running"
        ? observedTerminal
        : evolveRunnerRunState({
            state: prepared.state,
            status: result.status,
            result,
            updated_at: result.ended_at,
          });
    await persistRunnerOutcomeToTask({
      ctx,
      task_id: opts.task_id,
      bundle: prepared.bundle,
      state,
      ordering_authority: "current_active_claim",
    });
    const claimedRunAuthority = await inspectTaskRunnerClaimedRunAuthority(
      {
        git_root: ctx.resolvedProject.gitRoot,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: opts.task_id,
      },
      activeClaim.claim,
    );
    const cleanupConfirmed = claimedRunAuthority === "terminal";
    releaseActiveClaim = cleanupConfirmed;
    completed = {
      ...prepared,
      state,
      result,
    };
    if (!cleanupConfirmed) {
      completed.active_claim_cleanup = await recordActiveClaimCleanupFailure({
        bundle: prepared.bundle,
        error: new CliError({
          exitCode: 8,
          code: "E_RUNTIME",
          message:
            `Runner retained the task active claim because supervised process cleanup ` +
            `was not confirmed for ${opts.task_id}:${prepared.invocation.run_id}.`,
          context: {
            reason:
              state.supervision?.process_tree?.residual_alive === true
                ? "runner_residual_process_alive"
                : "runner_process_cleanup_unverified",
            task_id: opts.task_id,
            run_id: prepared.invocation.run_id,
            claimed_run_authority: claimedRunAuthority,
            process_tree: state.supervision?.process_tree ?? null,
          },
        }),
      });
    }
    return completed;
  } catch (error) {
    primaryError = error;
    hasPrimaryError = true;
    throw error;
  } finally {
    if (!releaseActiveClaim && hasPrimaryError) {
      try {
        const authority = await inspectTaskRunnerClaimedRunAuthority(
          {
            git_root: ctx.resolvedProject.gitRoot,
            workflow_dir: ctx.config.paths.workflow_dir,
            task_id: opts.task_id,
          },
          activeClaim.claim,
        );
        releaseActiveClaim = authority === "absent" || authority === "incomplete_pre_provider";
      } catch (inspectionError) {
        const diagnostic = await recordActiveClaimCleanupFailure({
          bundle: cleanupBundle,
          error: inspectionError,
        });
        attachSuppressedActiveClaimCleanup(primaryError, diagnostic);
      }
    }
    if (releaseActiveClaim) {
      try {
        await releaseTaskRunnerActiveClaim(activeClaim);
      } catch (cleanupError) {
        const diagnostic = await recordActiveClaimCleanupFailure({
          bundle: cleanupBundle,
          error: cleanupError,
        });
        if (hasPrimaryError) {
          attachSuppressedActiveClaimCleanup(primaryError, diagnostic);
        } else if (completed) {
          completed.active_claim_cleanup = diagnostic;
        }
      }
    }
  }
}
