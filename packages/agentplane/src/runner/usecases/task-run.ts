import {
  type StateFingerprint,
  type StateFingerprintPolicy,
  type StateFingerprintPreconditionDiagnostic,
} from "@agentplaneorg/core/schemas";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
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
import { createRunnerAdapter } from "../adapters/index.js";
import { readRecipeRunProfile } from "../adapters/recipe-run-profile.js";
import { applyRunnerPolicyRefusal, buildRunnerPolicyDecision } from "../policy-decision.js";
import { buildRunnerExecutionPlaybookContract } from "../playbooks.js";
import { RunnerRunRepository } from "../run-repository.js";
import { createRunnerRunId, resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import { resolveRunnerSandboxPolicy, resolveRunnerWriteScopePolicy } from "../sandbox-policy.js";
import {
  capturePreparedRunnerStateFingerprint,
  captureRunnerPreparationGitSnapshot,
  resolveRunnerStateFingerprintPolicy,
} from "../state-fingerprint.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
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
  assertTaskRunnerActiveClaimHistorySafe,
  assertTaskRunnerActiveClaimCurrent,
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
  writeTaskBlueprintSnapshot,
} from "./task-run-blueprint-plan.js";
import {
  evaluatePreparedAgentWorkOrderReadiness,
  prepareAgentWorkOrder,
  requireAgentWorkOrderInvocationReadiness,
  requirePreparedAgentWorkOrder,
} from "./agent-work-order.js";
import { RunnerPreparationCliError, writeRunnerRefusalArtifacts } from "./task-run-refusal.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerStateFingerprintCliError,
} from "./task-run-state-fingerprint.js";
import {
  persistReplayAnchorBeforeExecution,
  type TaskRunnerReplayProvenance,
} from "./task-run-replay-anchor.js";
import {
  persistRunnerStateFingerprintEffectStarted,
  persistRunnerStateFingerprintEffectUnknown,
  persistRunnerStateFingerprintPostStateUnknown,
  persistRunnerStateFingerprintRefusal,
  persistRunnerStateFingerprintSuccess,
} from "./task-run-state-fingerprint-persistence.js";
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
  precondition_fingerprint?: StateFingerprint;
  precondition_policy?: StateFingerprintPolicy;
};
export type ExecutedTaskRunnerExecution = Omit<
  PreparedTaskRunnerExecution,
  "precondition_fingerprint" | "precondition_policy"
> & {
  precondition_fingerprint: StateFingerprint;
  precondition_policy: StateFingerprintPolicy;
  result: RunnerResult;
  state_before: StateFingerprint;
  state_after: StateFingerprint;
  precondition: StateFingerprintPreconditionDiagnostic;
  active_claim_cleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
};
export type { TaskRunnerReplayProvenance } from "./task-run-replay-anchor.js";
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
  const preparationGitSnapshot = await captureRunnerPreparationGitSnapshot({
    ctx: command,
  });
  const executionContext = await makeReadOnlyExecutionContext(command);
  const target = opts.target ?? { kind: "task", task_id: opts.task_id };
  void executionContext.policy.evaluate({
    action: target.kind === "recipe_scenario" ? "scenario_execute" : "task_run",
    config: executionContext.config,
    taskId: opts.task_id,
    git: { stagedPaths: [] },
  });
  let executionProfile = executionContext.executionProfile;
  const runnerCommand = target.kind === "recipe_scenario" ? "recipes scenario execute" : "task run";
  const preparedWorkOrder = requirePreparedAgentWorkOrder(
    await prepareAgentWorkOrder({
      command_ctx: command,
      cwd: opts.cwd,
      root_override: opts.rootOverride ?? null,
      task_id: opts.task_id,
      include_runner_state: opts.include_route_runner_state ?? false,
      recipe: opts.recipe,
      runner_command: runnerCommand,
      execution_context: executionContext,
      execution_profile: executionProfile,
    }),
  );
  executionProfile = preparedWorkOrder.execution_profile;
  const taskEnvelope = preparedWorkOrder.task_envelope;
  const base_prompts = preparedWorkOrder.base_prompts;
  const blueprint = preparedWorkOrder.blueprint;
  const route_decision = preparedWorkOrder.route_decision;
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
    work_order: preparedWorkOrder.work_order,
    work_order_preparation: preparedWorkOrder.preparation,
    route_decision,
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
      approvals: structuredClone(executionContext.approvals),
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
  const precondition_fingerprint = await capturePreparedRunnerStateFingerprint({
    ctx: command,
    bundle,
    git: preparationGitSnapshot,
  });
  const precondition_policy = resolveRunnerStateFingerprintPolicy(command);
  bundle.state_fingerprint = precondition_fingerprint;
  bundle.state_fingerprint_policy = precondition_policy;
  requireAgentWorkOrderInvocationReadiness(
    await evaluatePreparedAgentWorkOrderReadiness({
      command_ctx: command,
      cwd: opts.cwd,
      root_override: opts.rootOverride ?? null,
      prepared: preparedWorkOrder,
    }),
  );
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
  return {
    bundle,
    invocation,
    state,
    precondition_fingerprint,
    precondition_policy,
  };
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
  const runId = opts.run_id ?? createRunnerRunId();
  await reconcileStaleTerminalTaskRunnerActiveClaim({
    ctx,
    task_id: opts.task_id,
    prospective_run_id: runId,
  });
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
    await assertTaskRunnerActiveClaimHistorySafe({ ctx, lease: activeClaim });
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
            expected_backend_projection:
              err.bundle.state_fingerprint?.components.backend_projection,
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
    const adapter = createRunnerAdapter(ctx.config);
    const replayProvenance = opts.replay_provenance;
    let guardedExecution;
    try {
      guardedExecution = await executeStateBoundRunnerInvocation({
        ctx,
        task_id: opts.task_id,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        ...(replayProvenance
          ? {
              advance_precondition: async ({ expected_backend_projection }) => {
                return await persistReplayAnchorBeforeExecution({
                  ctx,
                  task_id: opts.task_id,
                  bundle: prepared.bundle,
                  state: prepared.state,
                  provenance: replayProvenance,
                  expected_backend_projection,
                });
              },
            }
          : {}),
        before_apply: async (stateFingerprint) => {
          await assertTaskRunnerActiveClaimHistorySafe({
            ctx,
            lease: activeClaim,
            allow_claimed_run: true,
          });
          await persistRunnerStateFingerprintEffectStarted({
            ctx,
            task_id: opts.task_id,
            invocation: prepared.invocation,
            state_fingerprint: stateFingerprint,
          });
        },
        on_apply_error: async ({ error, state_fingerprint: stateFingerprint }) => {
          await persistRunnerStateFingerprintEffectUnknown({
            ctx,
            task_id: opts.task_id,
            invocation: prepared.invocation,
            prepared_state: prepared.state,
            error,
            state_fingerprint: stateFingerprint,
          });
        },
        on_post_state_error: async ({ result, state_fingerprint: stateFingerprint }) => {
          await persistRunnerStateFingerprintPostStateUnknown({
            ctx,
            task_id: opts.task_id,
            invocation: prepared.invocation,
            result,
            state_fingerprint: stateFingerprint,
          });
        },
        apply: async (invocation) => await adapter.execute(invocation),
      });
    } catch (error) {
      if (!(error instanceof RunnerStateFingerprintCliError)) throw error;
      await persistRunnerStateFingerprintRefusal({
        ctx,
        task_id: opts.task_id,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        prepared_state: prepared.state,
        error,
      });
      releaseActiveClaim = true;
      throw error;
    }
    const preconditionFingerprint = guardedExecution.precondition_fingerprint;
    const preconditionPolicy = guardedExecution.precondition_policy;
    const result = guardedExecution.result;
    const state = await persistRunnerStateFingerprintSuccess({
      ctx,
      task_id: opts.task_id,
      bundle: prepared.bundle,
      invocation: prepared.invocation,
      prepared_state: prepared.state,
      result,
      state_fingerprint: guardedExecution.state_fingerprint,
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
      precondition_fingerprint: preconditionFingerprint,
      precondition_policy: preconditionPolicy,
      state,
      result,
      state_before: guardedExecution.state_before,
      state_after: guardedExecution.state_after,
      precondition: guardedExecution.precondition,
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
        if (authority === "effect_in_doubt") {
          await assertTaskRunnerActiveClaimCurrent({
            git_root: ctx.resolvedProject.gitRoot,
            workflow_dir: ctx.config.paths.workflow_dir,
            expected: activeClaim.claim,
          });
        } else {
          releaseActiveClaim = authority === "absent" || authority === "incomplete_pre_provider";
        }
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
