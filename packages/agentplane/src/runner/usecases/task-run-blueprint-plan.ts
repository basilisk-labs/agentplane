import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveRecipeBlueprintExtensions, type RecipeManifest } from "@agentplaneorg/recipes";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { blueprintResolveInputFromTask } from "../../commands/blueprint/task-input.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import {
  buildBlueprintExecutionPlanArtifact,
  buildBlueprintExecutionStateArtifact,
  buildBlueprintPlanArtifact,
  createTrustedProjectBlueprintRegistry,
  inferBlueprintTaskKind,
  recipeBlueprintExtensionsToHints,
  resolveBlueprint,
  type BlueprintContextManifestEntry,
} from "../../blueprints/index.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerContextBundle, RunnerPromptBlock, RunnerRecipeContext } from "../types.js";
import type { assembleRunnerTaskContext } from "../context/task-context.js";

function recipeManifestFromContext(recipe: RunnerRecipeContext | undefined): RecipeManifest | null {
  if (!recipe?.manifest || typeof recipe.manifest !== "object") return null;
  return recipe.manifest as RecipeManifest;
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
    exitCode: exitCodeForError("E_VALIDATION"),
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

export function resolveRunnerBlueprintPlan(opts: {
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
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          err instanceof Error
            ? err.message
            : `Invalid project-local blueprint trust registry: ${String(err)}`,
      });
    });
}

export async function writeTaskBlueprintSnapshot(bundle: RunnerContextBundle): Promise<void> {
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
