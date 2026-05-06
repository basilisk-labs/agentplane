import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
import { resolveRecipeBlueprintExtensions, type RecipeManifest } from "@agentplaneorg/recipes";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { blueprintResolveInputFromTask } from "../../commands/blueprint/task-input.js";
import { CliError } from "../../shared/errors.js";
import {
  buildBlueprintPlanArtifact,
  buildBlueprintExecutionPlanArtifact,
  buildBlueprintExecutionStateArtifact,
  createTrustedProjectBlueprintRegistry,
  type BlueprintContextManifestEntry,
  inferBlueprintTaskKind,
  recipeBlueprintExtensionsToHints,
  resolveBlueprint,
} from "../../blueprints/index.js";
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
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { RunnerRunRepository } from "../run-repository.js";
import { createRunnerRunId, resolveTaskRunnerPaths } from "../task-run-paths.js";
import { normalizeRecipeArtifactPrefixes } from "../result-manifest-policy.js";
import {
  RUNNER_API_VERSION,
  RUNNER_BUNDLE_SCHEMA_VERSION,
  type RunnerContextBundle,
  type RunnerExecutionContract,
  type RunnerInvocation,
  type RunnerRecipeContext,
  type RunnerPromptBlock,
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

function isEnforcedCapabilityLevel(level: string | undefined): boolean {
  return level === "native" || level === "wrapper";
}

function assertRunnerPolicyCompatibility(bundle: RunnerContextBundle): void {
  const profile = readRecipeRunProfile(bundle.recipe);
  if (!profile) return;
  const adapterId = bundle.execution.adapter_id;
  const capabilities = bundle.execution.adapter_capabilities;

  if (profile.sandbox) {
    const sandboxCapability = capabilities?.fields.sandbox;
    if (
      isEnforcedCapabilityLevel(sandboxCapability?.level) &&
      sandboxCapability?.supported_values &&
      !sandboxCapability.supported_values.includes(profile.sandbox)
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Runner adapter ${JSON.stringify(adapterId)} does not support recipe sandbox ` +
          `${JSON.stringify(profile.sandbox)}; supported values: ${sandboxCapability.supported_values.join(", ")}.`,
        context: {
          adapter_id: adapterId,
          policy_field: "sandbox",
          declared_value: profile.sandbox,
          capability: sandboxCapability,
        },
      });
    }
  }
  if (profile.writes_artifacts_to && profile.writes_artifacts_to.length > 0) {
    normalizeRecipeArtifactPrefixes(profile.writes_artifacts_to);
  }
}

function isBlueprintPolicyModuleEntry(entry: {
  kind: string;
  source?: string;
  id: string;
}): boolean {
  const source = entry.source ?? entry.id;
  return entry.kind === "policy_module" && source.startsWith(".agentplane/policy/");
}

export function assertRunnerBlueprintPolicyModuleBudget(bundle: RunnerContextBundle): void {
  const blueprint = bundle.blueprint;
  if (!blueprint) return;
  const maxPolicyModules = blueprint.contextBudget.maxPolicyModules;
  const policyModules = blueprint.policyModules.filter((item) => item.trim().length > 0);
  const policyManifestEntries = blueprint.contextManifest.filter((entry) =>
    isBlueprintPolicyModuleEntry(entry),
  );
  const actualCount = Math.max(policyModules.length, policyManifestEntries.length);
  if (actualCount <= maxPolicyModules) return;
  throw new CliError({
    exitCode: 2,
    code: "E_VALIDATION",
    message: [
      "Runner blueprint policy module budget exceeded.",
      `blueprint=${blueprint.blueprintId}`,
      `policy_modules=${policyModules.length}`,
      `context_manifest_policy_modules=${policyManifestEntries.length}`,
      `max_policy_modules=${maxPolicyModules}`,
      "Fix: remove unrelated policy modules from the runner context or select a blueprint with a larger explicit budget.",
    ].join("\n"),
    context: {
      blueprint_id: blueprint.blueprintId,
      policy_modules: policyModules.length,
      context_manifest_policy_modules: policyManifestEntries.length,
      max_policy_modules: maxPolicyModules,
    },
  });
}

function recipeManifestFromContext(recipe: RunnerRecipeContext | undefined): RecipeManifest | null {
  if (!recipe?.manifest || typeof recipe.manifest !== "object") return null;
  return recipe.manifest as RecipeManifest;
}

function resolveRunnerBlueprintPlan(opts: {
  taskEnvelope: Awaited<ReturnType<typeof assembleRunnerTaskContext>>;
  config: CommandContext["config"];
  projectRoot: string;
  recipe?: RunnerRecipeContext;
  basePrompts: readonly RunnerPromptBlock[];
}): Promise<RunnerContextBundle["blueprint"]> {
  const input = blueprintResolveInputFromTask({
    task: opts.taskEnvelope.task.data,
    config: opts.config,
  });
  const manifest = recipeManifestFromContext(opts.recipe);
  if (manifest) {
    const taskKind = inferBlueprintTaskKind(input);
    const recipeExtensions = resolveRecipeBlueprintExtensions({
      recipes: [{ manifest }],
      runtime: {
        task_kind: taskKind,
        command: "task run",
        tags: input.tags ? [...input.tags] : [],
      },
      includeIncompatible: true,
    });
    input.recipeHints = recipeBlueprintExtensionsToHints(recipeExtensions.accepted);
  }
  return createTrustedProjectBlueprintRegistry(opts.projectRoot)
    .then((projectRegistry) => {
      const resolved = resolveBlueprint({
        input,
        registry: projectRegistry.registry,
        projectBlueprintIds: projectRegistry.projectBlueprintIds,
      });
      return buildBlueprintPlanArtifact({
        resolved,
        input,
        workflowMode: input.workflowMode,
        contextManifest: buildRunnerBlueprintContextManifest({
          basePrompts: opts.basePrompts,
          recipe: opts.recipe,
          policyModules: resolved.blueprint.policyModules,
        }),
      });
    })
    .catch((err) => {
      throw new CliError({
        exitCode: 2,
        code: "E_VALIDATION",
        message:
          err instanceof Error
            ? err.message
            : `Invalid project-local blueprint trust registry: ${String(err)}`,
      });
    });
}

function buildRunnerBlueprintContextManifest(opts: {
  basePrompts: readonly RunnerPromptBlock[];
  recipe?: RunnerRecipeContext;
  policyModules: readonly string[];
}): BlueprintContextManifestEntry[] {
  const entries: BlueprintContextManifestEntry[] = opts.basePrompts.map((prompt) => ({
    id: prompt.id,
    kind: prompt.id.includes("policy") ? "policy_module" : "prompt",
    reason: prompt.resolution
      ? `Resolved from ${prompt.resolution.winner.source}.`
      : "Loaded as part of the runner base prompt bundle.",
    ...(prompt.source ? { source: prompt.source } : {}),
  }));
  for (const policyModule of opts.policyModules) {
    if (entries.some((entry) => entry.source === policyModule || entry.id === policyModule)) {
      continue;
    }
    entries.push({
      id: policyModule,
      kind: "policy_module",
      reason: "Allowed by the resolved blueprint policy module budget.",
      source: policyModule,
    });
  }
  if (opts.recipe) {
    entries.push({
      id: opts.recipe.recipe_id,
      kind: "recipe",
      reason: "Selected recipe context attached to this runner invocation.",
      ...(opts.recipe.recipe_dir ? { source: opts.recipe.recipe_dir } : {}),
    });
  }
  return entries;
}

async function writeTaskBlueprintSnapshot(bundle: RunnerContextBundle): Promise<void> {
  if (bundle.target.kind !== "task" || !bundle.blueprint) return;
  const snapshotPath = bundle.execution.artifact_paths.blueprint_plan_path;
  const executionPlanPath = bundle.execution.artifact_paths.blueprint_execution_plan_path;
  const executionStatePath = bundle.execution.artifact_paths.blueprint_execution_state_path;
  await mkdir(path.dirname(snapshotPath), { recursive: true });
  const executionPlan = buildBlueprintExecutionPlanArtifact({
    plan: bundle.blueprint,
    runId: bundle.execution.run_id,
    generatedAt: bundle.execution.run_id,
  });
  await writeFile(snapshotPath, `${JSON.stringify(bundle.blueprint, null, 2)}\n`, "utf8");
  await writeFile(executionPlanPath, `${JSON.stringify(executionPlan, null, 2)}\n`, "utf8");
  await writeFile(
    executionStatePath,
    `${JSON.stringify(
      buildBlueprintExecutionStateArtifact({
        plan: bundle.blueprint,
        executionPlan,
        runId: bundle.execution.run_id,
        at: bundle.execution.run_id,
      }),
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(
    bundle.execution.artifact_paths.context_manifest_path,
    `${JSON.stringify(bundle.blueprint.contextManifest, null, 2)}\n`,
    "utf8",
  );
}

async function writeRunnerRefusalArtifacts(opts: {
  bundle: RunnerContextBundle;
  error: CliError;
}): Promise<RunnerRunState> {
  const repository = RunnerRunRepository.fromBundle(opts.bundle);
  const prepared = await repository.writePrepared({
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
  await repository.writeState(refused);
  await repository.appendEvent({
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

export function assertRunnerTaskExecutable(bundle: RunnerContextBundle): void {
  const task = bundle.task;
  if (!task) return;
  const status = normalizeTaskStatus(task.data.status);
  if (status === "DOING") return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `${task.task_id}: runner execution requires task status DOING ` +
      `(current=${JSON.stringify(status)}; use \`agentplane task start-ready ${task.task_id} --author <ROLE> --body "Start: ..."\` first).`,
  });
}

export function renderTaskRunnerBootstrap(
  bundle: RunnerContextBundle,
  invocation?: RunnerInvocation,
): string {
  const targetLabel =
    bundle.target.kind === "task"
      ? `task ${bundle.target.task_id}`
      : `recipe scenario ${bundle.target.recipe_id}:${bundle.target.scenario_id}`;
  const stopRules = bundle.blueprint?.stopReasons ?? [];
  return [
    "# agentplane runner bootstrap",
    "",
    "This invocation is already inside an approved runner execution.",
    "- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.",
    "- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.",
    "- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.",
    "- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.",
    "",
    `- target: ${targetLabel}`,
    `- adapter: ${bundle.execution.adapter_id}`,
    `- mode: ${bundle.execution.mode}`,
    `- run_id: ${bundle.execution.run_id}`,
    `- bundle_path: ${bundle.execution.artifact_paths.bundle_path}`,
    `- result_path: ${bundle.execution.artifact_paths.result_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts from CLI argv.",
    ...(stopRules.length > 0
      ? [
          "",
          "Blueprint stop rules:",
          ...stopRules.map((rule) => `- ${rule.severity}: ${rule.reason} (${rule.id})`),
        ]
      : []),
    "Execute-mode runs must write a valid JSON result manifest to result_path before exiting.",
    "Minimal manifest example:",
    '{"schema_version":1,"status":"success","summary":"Completed.","capabilities_used":["runner.exec"]}',
    "",
    "Prepared invocation:",
    "",
    invocation
      ? `- argv: ${invocation.argv.join(" ")}`
      : "- argv: <not prepared; preflight refused>",
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
  const framework_explain = appendFrameworkExplainBehaviorInputs(
    executionContext.frameworkExplain,
    collectFrameworkExplainBehaviorInputs(base_prompts),
  );
  const framework_protocol = buildFrameworkProtocolSurface({
    explain: framework_explain,
  });
  const adapter: RunnerAdapter = createRunnerAdapter(executionContext.config);
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
    target,
    base_prompts,
    framework_explain,
    framework_protocol,
    repository: taskEnvelope.repository,
    task: taskEnvelope.task,
    recipe: opts.recipe,
    blueprint,
    execution: {
      adapter_id: configured_adapter_id,
      mode: opts.mode,
      run_id,
      artifact_paths,
      profile_runtime: executionProfile,
      trace_policy: executionProfile.runner.trace_policy,
      timeout_policy: executionProfile.runner.timeout_policy,
      approvals: {
        require_plan: executionContext.approvals.require_plan,
        require_verify: executionContext.approvals.require_verify,
        require_network: executionContext.approvals.require_network,
      },
    },
  };
  executionProfile = consumeExecutionProfileBudget({
    runtime: bundle.execution.profile_runtime ?? executionProfile,
    phase: "implementation",
  });
  bundle.execution.profile_runtime = executionProfile;
  bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
  bundle.execution.policy_decision = buildRunnerPolicyDecision({
    adapter_id: bundle.execution.adapter_id,
    capabilities: bundle.execution.adapter_capabilities,
    recipe: bundle.recipe,
  });
  bundle.execution.adapter_capability_registry = resolveRunnerAdapterCapabilityRegistry({
    adapter_id: bundle.execution.adapter_id,
    capabilities: bundle.execution.adapter_capabilities,
    requested: bundle.execution.policy_decision.requested,
  });
  assertRunnerBlueprintPolicyModuleBudget(bundle);
  assertRunnerTaskExecutable(bundle);
  await writeTaskBlueprintSnapshot(bundle);
  try {
    assertRunnerPolicyCompatibility(bundle);
  } catch (err) {
    if (err instanceof CliError) {
      bundle.execution.policy_decision = applyRunnerPolicyRefusal({
        decision:
          bundle.execution.policy_decision ??
          buildRunnerPolicyDecision({
            adapter_id: bundle.execution.adapter_id,
            capabilities: bundle.execution.adapter_capabilities,
            recipe: bundle.recipe,
          }),
        error: err,
      });
      const state = await writeRunnerRefusalArtifacts({ bundle, error: err });
      throw new RunnerPreparationCliError({ cause: err, bundle, state });
    }
    throw err;
  }
  const invocation = await adapter.prepare(bundle);
  const repository = RunnerRunRepository.fromBundle(bundle);
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
}): Promise<ExecutedTaskRunnerExecution> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  let prepared: PreparedTaskRunnerExecution;
  try {
    prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      task_id: opts.task_id,
      mode: "execute",
      run_id: opts.run_id,
      recipe: opts.recipe,
      target: opts.target,
    });
  } catch (err) {
    if (err instanceof RunnerPreparationCliError) {
      await persistRunnerOutcomeToTask({
        ctx,
        task_id: opts.task_id,
        bundle: err.bundle,
        state: err.state,
      });
    }
    throw err;
  }
  const adapter = createRunnerAdapter(ctx.config);
  const result = await adapter.execute(prepared.invocation);
  const repository = RunnerRunRepository.fromInvocation(prepared.invocation);
  const state =
    (await repository.readState()) ??
    evolveRunnerRunState({
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
  });
  return {
    ...prepared,
    result,
  };
}
