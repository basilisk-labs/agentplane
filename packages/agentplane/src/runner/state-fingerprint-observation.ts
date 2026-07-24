import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../backends/task-backend.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import { makeReadOnlyExecutionContext } from "../runtime/execution-context.js";
import { consumeExecutionProfileBudget } from "../runtime/execution-profile/index.js";
import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";
import { collectRunnerBasePrompts } from "./context/base-prompts.js";
import { assembleRunnerTaskContext } from "./context/task-context.js";
import { resolveRunnerSandboxPolicy, resolveRunnerWriteScopePolicy } from "./sandbox-policy.js";
import { authorityComponent, dangerAuthorityFromBundle } from "./state-fingerprint-authority.js";
import { observeBackendProjection } from "./state-fingerprint-backend-projection.js";
import type { RunnerContextBundle, RunnerPromptBlock } from "./types.js";
import { resolveRunnerBlueprintPlan } from "./usecases/task-run-blueprint-plan.js";

const POLICY_MODULE_MAX_BYTES = 1024 * 1024;
const KNOWLEDGE_MANIFEST_MAX_BYTES = 16 * 1024 * 1024;

export type RunnerStateFingerprintComponentProbes = {
  load_context?: () => Promise<CommandContext>;
  load_task?: () => Promise<TaskData | null>;
  observe_backend_projection?: () => Promise<StateFingerprintComponentInput>;
  observe_policy?: () => Promise<StateFingerprintComponentInput>;
  observe_blueprint?: () => Promise<StateFingerprintComponentInput>;
  observe_knowledge?: () => Promise<StateFingerprintComponentInput>;
  observe_authority?: () => Promise<StateFingerprintComponentInput>;
};

export type RunnerStateFingerprintObservedComponents = {
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

function digestText(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
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

function taskComponent(task: TaskData | null): StateFingerprintComponentInput {
  if (!task) {
    return unavailableComponent("task_backend", "task_state_unavailable");
  }
  const semanticTask = structuredClone(task);
  if (semanticTask.sync) {
    Reflect.deleteProperty(semanticTask.sync, "freshness");
  }
  return {
    state: "present",
    source: "task_backend",
    value: semanticTask,
  };
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

type PolicyModuleObservation =
  | { path: string; state: "present"; resolution: "repository"; sha256: string }
  | { path: string; state: "missing"; reason_code: "policy_module_missing" }
  | { path: string; state: "unavailable"; reason_code: "policy_module_unreadable" };

async function observePolicyModules(
  repositoryRoot: string,
  modulePaths: readonly string[],
): Promise<PolicyModuleObservation[]> {
  return await Promise.all(
    [...new Set(modulePaths)].toSorted().map(async (modulePath) => {
      const absolutePath = path.resolve(repositoryRoot, modulePath);
      const relativePath = path.relative(repositoryRoot, absolutePath);
      if (
        relativePath === "" ||
        relativePath === ".." ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
      ) {
        return {
          path: modulePath,
          state: "unavailable" as const,
          reason_code: "policy_module_unreadable" as const,
        };
      }
      try {
        return {
          path: modulePath,
          state: "present" as const,
          resolution: "repository" as const,
          sha256: digestText(
            await readContainedStableTextNoFollow({
              repository_root: repositoryRoot,
              file_path: absolutePath,
              label: "runner policy module",
              max_bytes: POLICY_MODULE_MAX_BYTES,
            }),
          ),
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
          return {
            path: modulePath,
            state: "missing" as const,
            reason_code: "policy_module_missing" as const,
          };
        }
        return {
          path: modulePath,
          state: "unavailable" as const,
          reason_code: "policy_module_unreadable" as const,
        };
      }
    }),
  );
}

function policyPrompts(prompts: readonly RunnerPromptBlock[]): RunnerPromptBlock[] {
  return prompts
    .filter((prompt) => ["system", "policy"].includes(prompt.role))
    .map((prompt) => {
      const projection = structuredClone(prompt);
      if (projection.id !== "base.execution_profile") return projection;
      try {
        const runtime: unknown = JSON.parse(projection.content);
        if (typeof runtime === "object" && runtime !== null && !Array.isArray(runtime)) {
          Reflect.deleteProperty(runtime, "approvals");
          projection.content = `${JSON.stringify(runtime, null, 2)}\n`;
        }
      } catch {
        // The internally generated prompt is validated upstream; retain raw bytes if it is not JSON.
      }
      return projection;
    });
}

async function policyComponent(opts: {
  repository_root: string;
  prompts: readonly RunnerPromptBlock[];
  policy_modules: readonly string[];
}): Promise<StateFingerprintComponentInput> {
  const modules = await observePolicyModules(opts.repository_root, opts.policy_modules);
  if (modules.some((entry) => entry.state === "missing")) {
    return unavailableComponent("runner_policy_resolution", "policy_module_missing");
  }
  if (modules.some((entry) => entry.state === "unavailable")) {
    return unavailableComponent(
      "runner_policy_resolution",
      "policy_module_observation_unavailable",
    );
  }
  return {
    state: "present",
    source: "runner_policy_resolution",
    value: {
      prompts: policyPrompts(opts.prompts),
      policy_modules: modules,
    },
  };
}

async function observeKnowledgeProjection(
  repositoryRoot: string,
): Promise<StateFingerprintComponentInput> {
  const manifestPath = path.join(repositoryRoot, ".agentplane", "context", "manifest.lock.json");
  try {
    const text = await readContainedStableTextNoFollow({
      repository_root: repositoryRoot,
      file_path: manifestPath,
      label: "knowledge manifest lock",
      max_bytes: KNOWLEDGE_MANIFEST_MAX_BYTES,
    });
    JSON.parse(text);
    return {
      state: "present",
      source: "context_manifest_lock",
      value: {
        path: ".agentplane/context/manifest.lock.json",
        sha256: digestText(text),
      },
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return unavailableComponent("context_manifest_lock", "knowledge_manifest_invalid");
    }
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") {
      return unavailableComponent("context_manifest_lock", "knowledge_manifest_unreadable");
    }
    try {
      await readContainedStableTextNoFollow({
        repository_root: repositoryRoot,
        file_path: path.join(repositoryRoot, ".agentplane", "context", "agentplane.context.yaml"),
        label: "knowledge manifest",
        max_bytes: KNOWLEDGE_MANIFEST_MAX_BYTES,
      });
      return unavailableComponent("context_manifest_lock", "knowledge_manifest_lock_missing");
    } catch (manifestError) {
      if ((manifestError as NodeJS.ErrnoException | null)?.code === "ENOENT") {
        return missingComponent("context_manifest_lock", "knowledge_workspace_not_initialized");
      }
      return unavailableComponent("context_manifest_lock", "knowledge_manifest_unreadable");
    }
  }
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
        ? await loadTaskFromContext({
            ctx: liveContext,
            taskId: opts.bundle.task?.task_id ?? opts.bundle.target.task_id ?? "",
          })
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
      protected_path_groups: null,
      approvals: null,
    };
  }

  try {
    const executionContext = await makeReadOnlyExecutionContext(liveContext);
    const taskEnvelope = await assembleRunnerTaskContext({
      ctx: liveContext,
      cwd: liveContext.resolvedProject.gitRoot,
      rootOverride: liveContext.resolvedProject.gitRoot,
      task_id: task.id,
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
      recipe: opts.bundle.recipe,
      harness: executionContext.harness,
      execution_profile: executionProfile,
    });
    const blueprint = await resolveRunnerBlueprintPlan({
      taskEnvelope,
      config: executionContext.config,
      projectRoot: executionContext.repo.git_root,
      recipe: opts.bundle.recipe,
      basePrompts,
    });
    return {
      ctx: liveContext,
      task,
      base_prompts: basePrompts,
      blueprint,
      protected_path_groups: executionContext.harness.policy.protected_paths,
      approvals: {
        require_plan: executionContext.approvals.require_plan,
        require_verify: executionContext.approvals.require_verify,
        require_network: executionContext.approvals.require_network,
      },
    };
  } catch {
    return {
      ctx: liveContext,
      task,
      base_prompts: null,
      blueprint: null,
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
      policyComponent({
        repository_root: repositoryRoot,
        prompts: opts.bundle.base_prompts,
        policy_modules: opts.bundle.blueprint?.policyModules ?? [],
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
        }),
      ),
  ]);
  return {
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
      (live.base_prompts && live.blueprint
        ? policyComponent({
            repository_root: repositoryRoot,
            prompts: live.base_prompts,
            policy_modules: policyModules,
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
        }),
      ),
  ]);

  return {
    task: taskComponent(live.task),
    backend_projection: backend,
    policy,
    blueprint,
    knowledge,
    provider: providerComponent(live.task),
    authority,
  };
}
