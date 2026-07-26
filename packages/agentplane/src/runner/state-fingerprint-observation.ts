import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../backends/task-backend.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import type { TaskRouteDecision } from "../commands/shared/route-decision-types.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { makeReadOnlyExecutionContext } from "../runtime/execution-context.js";
import { consumeExecutionProfileBudget } from "../runtime/execution-profile/index.js";
import { collectRunnerBasePrompts } from "./context/base-prompts.js";
import { assembleRunnerTaskContext } from "./context/task-context.js";
import { resolveRunnerSandboxPolicy, resolveRunnerWriteScopePolicy } from "./sandbox-policy.js";
import {
  authorityComponent,
  dangerAuthorityFromBundle,
  liveRunnerExecutionConfigProjection,
  preparedRunnerExecutionConfigProjection,
} from "./state-fingerprint-authority.js";
import { observeBackendProjection } from "./state-fingerprint-backend-projection.js";
import { observeKnowledgeProjection } from "./state-fingerprint-knowledge.js";
import { observeRunnerPolicyComponent } from "./state-fingerprint-policy.js";
import { observeRunnerTaskProjection, runnerTaskProjectionReader } from "./task-observation.js";
import type { RunnerContextBundle, RunnerPromptBlock, RunnerRecipeContext } from "./types.js";
import { assembleRunnerRecipeContext } from "./context/recipe-context.js";
import { resolveRunnerBlueprintPlan } from "./usecases/task-run-blueprint-plan.js";

export type RunnerStateFingerprintComponentProbes = {
  load_context?: () => Promise<CommandContext>;
  load_task?: () => Promise<TaskData | null>;
  observe_backend_projection?: () => Promise<StateFingerprintComponentInput>;
  observe_policy?: () => Promise<StateFingerprintComponentInput>;
  observe_blueprint?: () => Promise<StateFingerprintComponentInput>;
  observe_knowledge?: () => Promise<StateFingerprintComponentInput>;
  observe_authority?: () => Promise<StateFingerprintComponentInput>;
  resolve_route_decision?: () => Promise<TaskRouteDecision>;
  resolve_recipe_context?: () => Promise<RunnerRecipeContext | null>;
};

export type RunnerStateFingerprintObservedComponents = {
  task_revision: number | null;
  task: StateFingerprintComponentInput;
  backend_projection: StateFingerprintComponentInput;
  policy: StateFingerprintComponentInput;
  blueprint: StateFingerprintComponentInput;
  knowledge: StateFingerprintComponentInput;
  provider: StateFingerprintComponentInput;
  authority: StateFingerprintComponentInput;
};

type LiveResolution = {
  ctx: CommandContext | null;
  task: TaskData | null;
  base_prompts: RunnerPromptBlock[] | null;
  blueprint: RunnerContextBundle["blueprint"] | null;
  route_decision: RunnerContextBundle["route_decision"] | null;
  recipe: RunnerRecipeContext | null;
  harness_task: NonNullable<RunnerContextBundle["framework_explain"]>["harness"]["task"] | null;
  protected_path_groups: Record<string, readonly string[]> | null;
  approvals: RunnerContextBundle["execution"]["approvals"] | null;
};

function authoritativePreparedRepositoryRoot(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
}): string {
  const contextRoot = path.resolve(opts.ctx.resolvedProject.gitRoot);
  const bundleRoot = path.resolve(opts.bundle.repository.git_root);
  if (contextRoot !== bundleRoot) {
    throw new Error(
      `Runner bundle repository root does not match the live command context: ${bundleRoot}`,
    );
  }
  return contextRoot;
}

function unavailableComponent(
  source: string,
  reason_code: string,
  evidence?: unknown,
): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
    ...(evidence === undefined ? {} : { evidence }),
  };
}

function missingComponent(source: string, reason_code: string): StateFingerprintComponentInput {
  return {
    state: "missing",
    source,
    reason_code,
  };
}

function serializeTaskRouteDecision(routeDecision: TaskRouteDecision): TaskRouteDecision {
  return structuredClone(routeDecision);
}

function taskComponent(task: TaskData | null): StateFingerprintComponentInput {
  if (!task) {
    return unavailableComponent("task_backend", "task_state_unavailable");
  }
  const semanticTask = structuredClone(task);
  Reflect.deleteProperty(semanticTask, "revision");
  if (semanticTask.sync) {
    Reflect.deleteProperty(semanticTask.sync, "freshness");
    semanticTask.sync.external_refs = semanticTask.sync.external_refs.map((externalRef) => {
      const semanticRef = { ...externalRef };
      Reflect.deleteProperty(semanticRef, "remote_revision");
      return semanticRef;
    });
  }
  return {
    state: "present",
    source: "task_backend",
    value: semanticTask,
  };
}

function taskRevision(task: TaskData | null): number | null {
  const revision = task?.revision;
  return typeof revision === "number" && Number.isInteger(revision) && revision > 0
    ? revision
    : null;
}

function providerComponent(task: TaskData | null): StateFingerprintComponentInput {
  if (!task) {
    return unavailableComponent("task_sync_projection", "provider_task_projection_unavailable");
  }
  const sync = task.sync;
  if (!sync || sync.external_refs.length === 0) {
    return missingComponent("task_sync_projection", "provider_not_applicable");
  }
  const freshness = sync.freshness;
  const freshnessEvidence = {
    provider_revision: freshness?.provider_revision ?? null,
    projection_sha256: freshness?.projection_sha256 ?? null,
    source_revision: freshness?.source_revision ?? null,
    projected_at: freshness?.projected_at ?? null,
    stale: freshness?.stale ?? false,
    reason: freshness?.reason ?? null,
    external_revisions: sync.external_refs
      .flatMap((externalRef) =>
        externalRef.remote_revision
          ? [
              {
                connector_kind: externalRef.connector_kind ?? null,
                provider: externalRef.provider,
                remote_id: externalRef.remote_id,
                remote_revision: externalRef.remote_revision,
              },
            ]
          : [],
      )
      .toSorted((left, right) => {
        const leftJson = JSON.stringify(left);
        const rightJson = JSON.stringify(right);
        return leftJson < rightJson ? -1 : leftJson > rightJson ? 1 : 0;
      }),
  };
  if (freshness?.stale === true) {
    return unavailableComponent(
      "task_sync_projection",
      "provider_projection_stale",
      freshnessEvidence,
    );
  }
  // A local projection digest or source revision cannot establish current
  // remote truth. Only the provider-issued revision makes this component present.
  if (freshness?.provider_revision) {
    return {
      state: "present",
      source: "task_sync_projection",
      value: {
        provider_revision: freshness.provider_revision ?? null,
        projection_sha256: freshness.projection_sha256 ?? null,
        source_revision: freshness.source_revision ?? null,
        projected_at: freshness.projected_at ?? null,
        stale: freshness.stale ?? false,
        reason: freshness.reason ?? null,
        external_revisions: freshnessEvidence.external_revisions,
      },
    };
  }
  return unavailableComponent(
    "task_sync_projection",
    "provider_freshness_unavailable",
    freshnessEvidence,
  );
}

function blueprintComponent(
  blueprint: RunnerContextBundle["blueprint"] | null | undefined,
): StateFingerprintComponentInput {
  if (!blueprint) {
    return missingComponent("blueprint_resolver", "blueprint_not_resolved");
  }
  const projection = structuredClone(blueprint);
  Reflect.deleteProperty(projection, "taskId");
  Reflect.deleteProperty(projection, "taskIntent");
  Reflect.deleteProperty(projection, "policyModules");
  Reflect.deleteProperty(projection, "contextManifest");
  projection.states = projection.states.map((state) => {
    const projectedState = structuredClone(state);
    Reflect.deleteProperty(projectedState, "policyModules");
    return projectedState;
  });
  return {
    state: "present",
    source: "blueprint_resolver",
    value: projection,
  };
}

async function resolveLiveState(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintComponentProbes;
}): Promise<LiveResolution> {
  let liveContext: CommandContext | null = null;
  try {
    liveContext = opts.probes?.load_context
      ? await opts.probes.load_context()
      : await loadCommandContext({
          cwd: opts.ctx.resolvedProject.gitRoot,
          rootOverride: opts.ctx.resolvedProject.gitRoot,
        });
  } catch {
    liveContext = null;
  }

  let task: TaskData | null = null;
  try {
    task = opts.probes?.load_task
      ? await opts.probes.load_task()
      : liveContext
        ? await observeRunnerTaskProjection(
            liveContext,
            opts.bundle.task?.task_id ?? opts.bundle.target.task_id ?? "",
          )
        : null;
  } catch {
    task = null;
  }

  if (!liveContext || !task) {
    return {
      ctx: liveContext,
      task,
      base_prompts: null,
      blueprint: null,
      route_decision: null,
      recipe: null,
      harness_task: null,
      protected_path_groups: null,
      approvals: null,
    };
  }

  try {
    const executionContext = await makeReadOnlyExecutionContext(liveContext);
    const recipeEnvelope = opts.bundle.recipe
      ? opts.probes?.resolve_recipe_context
        ? { recipe: await opts.probes.resolve_recipe_context() }
        : await assembleRunnerRecipeContext({
            project: liveContext.resolvedProject,
            recipe_id: opts.bundle.recipe.recipe_id,
            scenario_id: opts.bundle.recipe.scenario_id,
          })
      : null;
    const recipe = recipeEnvelope?.recipe ?? undefined;
    const taskEnvelope = await assembleRunnerTaskContext({
      ctx: liveContext,
      cwd: liveContext.resolvedProject.gitRoot,
      rootOverride: liveContext.resolvedProject.gitRoot,
      task_id: task.id,
      task,
      dependency_backend: runnerTaskProjectionReader(liveContext),
    });
    const command =
      opts.bundle.target.kind === "recipe_scenario" ? "recipes scenario execute" : "task run";
    const executionProfile = consumeExecutionProfileBudget({
      runtime: executionContext.executionProfile,
      phase: "discovery",
    });
    const basePrompts = await collectRunnerBasePrompts({
      git_root: executionContext.repo.git_root,
      owner_id: task.owner,
      agents_dir: executionContext.harness.workflow.paths.agents_dir,
      task: taskEnvelope.task,
      command,
      recipe,
      harness: executionContext.harness,
      execution_profile: executionProfile,
    });
    const blueprint = await resolveRunnerBlueprintPlan({
      taskEnvelope,
      config: executionContext.config,
      projectRoot: executionContext.repo.git_root,
      recipe,
      basePrompts,
    });
    const routeDecision =
      (await opts.probes?.resolve_route_decision?.()) ??
      (await buildTaskRouteDecision({
        ctx: liveContext,
        cwd: liveContext.resolvedProject.gitRoot,
        rootOverride: liveContext.resolvedProject.gitRoot,
        includeRunnerState: false,
        taskId: task.id,
      }));
    return {
      ctx: liveContext,
      task,
      base_prompts: basePrompts,
      blueprint,
      route_decision: serializeTaskRouteDecision(routeDecision),
      recipe: recipe ?? null,
      harness_task: executionContext.frameworkExplain.harness.task,
      protected_path_groups: executionContext.harness.policy.protected_paths,
      approvals: {
        require_plan: executionContext.approvals.require_plan,
        require_verify: executionContext.approvals.require_verify,
        require_network: executionContext.approvals.require_network,
        require_force: executionContext.approvals.require_force,
      },
    };
  } catch {
    return {
      ctx: liveContext,
      task,
      base_prompts: null,
      blueprint: null,
      route_decision: null,
      recipe: null,
      harness_task: null,
      protected_path_groups: null,
      approvals: null,
    };
  }
}

export async function observePreparedRunnerStateComponents(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintComponentProbes;
}): Promise<RunnerStateFingerprintObservedComponents> {
  const task = opts.bundle.task?.data ?? null;
  const repositoryRoot = authoritativePreparedRepositoryRoot(opts);
  const [backend, policy, knowledge, blueprint, authority] = await Promise.all([
    opts.probes?.observe_backend_projection?.() ?? observeBackendProjection(opts.ctx),
    opts.probes?.observe_policy?.() ??
      observeRunnerPolicyComponent({
        repository_root: repositoryRoot,
        prompts: opts.bundle.base_prompts,
        policy_modules: opts.bundle.blueprint?.policyModules ?? [],
        evaluator_skepticism_level: opts.ctx.config.evaluator.skepticism_level,
        harness_task: opts.bundle.framework_explain?.harness.task,
        recipe: opts.bundle.recipe,
      }),
    opts.probes?.observe_knowledge?.() ?? observeKnowledgeProjection(repositoryRoot),
    opts.probes?.observe_blueprint?.() ??
      Promise.resolve(blueprintComponent(opts.bundle.blueprint)),
    opts.probes?.observe_authority?.() ??
      Promise.resolve(
        authorityComponent({
          sandbox_policy: opts.bundle.execution.sandbox_policy,
          write_scope: opts.bundle.execution.write_scope,
          approvals: opts.bundle.execution.approvals,
          runner_execution_config: preparedRunnerExecutionConfigProjection(
            opts.bundle,
            opts.ctx.config,
          ),
        }),
      ),
  ]);
  return {
    task_revision: taskRevision(task),
    task: taskComponent(task),
    backend_projection: backend,
    policy,
    blueprint,
    knowledge,
    provider: providerComponent(task),
    authority,
  };
}

export async function observeLiveRunnerStateComponents(opts: {
  ctx: CommandContext;
  bundle: RunnerContextBundle;
  probes?: RunnerStateFingerprintComponentProbes;
}): Promise<RunnerStateFingerprintObservedComponents> {
  const live = await resolveLiveState(opts);
  const repositoryRoot = live.ctx?.resolvedProject.gitRoot ?? opts.ctx.resolvedProject.gitRoot;
  const policyModules = live.blueprint?.policyModules ?? [];
  const sandboxSource = opts.bundle.execution.sandbox_policy?.source;
  const requestedSandbox =
    sandboxSource === "cli_override" ? opts.bundle.execution.sandbox_policy?.requested : undefined;
  const sandbox =
    live.task && live.protected_path_groups
      ? resolveRunnerSandboxPolicy({
          task: live.task,
          recipe: opts.bundle.recipe,
          danger_authority: dangerAuthorityFromBundle(opts.bundle),
          execution_role: opts.bundle.execution.sandbox_policy?.role,
          requested_sandbox: requestedSandbox,
        })
      : null;
  const writeScope =
    sandbox && live.task && live.protected_path_groups
      ? resolveRunnerWriteScopePolicy({
          sandbox,
          protected_path_groups: live.protected_path_groups,
          task: live.task,
          recipe: opts.bundle.recipe,
        })
      : null;

  const [backend, policy, blueprint, knowledge, authority] = await Promise.all([
    opts.probes?.observe_backend_projection?.() ??
      (live.ctx
        ? observeBackendProjection(live.ctx)
        : Promise.resolve(
            unavailableComponent("task_backend_runtime", "backend_projection_unavailable"),
          )),
    opts.probes?.observe_policy?.() ??
      (live.ctx && live.base_prompts && live.blueprint
        ? observeRunnerPolicyComponent({
            repository_root: repositoryRoot,
            prompts: live.base_prompts,
            policy_modules: policyModules,
            evaluator_skepticism_level: live.ctx.config.evaluator.skepticism_level,
            harness_task: live.harness_task,
            recipe: live.recipe,
          })
        : Promise.resolve(
            unavailableComponent("runner_policy_resolution", "policy_resolution_unavailable"),
          )),
    opts.probes?.observe_blueprint?.() ??
      Promise.resolve(
        live.blueprint
          ? blueprintComponent(live.blueprint)
          : unavailableComponent("blueprint_resolver", "blueprint_resolution_unavailable"),
      ),
    opts.probes?.observe_knowledge?.() ?? observeKnowledgeProjection(repositoryRoot),
    opts.probes?.observe_authority?.() ??
      Promise.resolve(
        authorityComponent({
          sandbox_policy: sandbox,
          write_scope: writeScope,
          approvals: live.approvals,
          runner_execution_config: live.ctx
            ? liveRunnerExecutionConfigProjection(
                opts.bundle,
                live.ctx.config,
                live.route_decision ?? undefined,
              )
            : null,
        }),
      ),
  ]);

  return {
    task_revision: taskRevision(live.task),
    task: taskComponent(live.task),
    backend_projection: backend,
    policy,
    blueprint,
    knowledge,
    provider: providerComponent(live.task),
    authority,
  };
}
