import path from "node:path";
import {
  compileScenarioInstantiation,
  type ExplicitRecipeScenarioSelection,
  type ScenarioParameterBinding,
} from "@agentplaneorg/recipes";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { resolveExplicitRecipeScenarioSelection } from "../../commands/recipes/impl/explicit-selection.js";
import { observeSuppliedPlanBaseline } from "../../commands/task/create-plan-input.js";
import { observeRecipeApplicability } from "../context/recipe-applicability.js";
import { createNativeRecipeApplicabilityObservers } from "../context/recipe-native-observers.js";
import { computeRecipeDependencyClosure } from "../context/recipe-closure.js";
import { prepareRecipeClosureRetention } from "../context/recipe-retention.js";
import {
  validateRecipeScenarioPlan,
  MissingRecipeContextSourceError,
} from "../context/recipe-plan-validation.js";
import type { RecipeInstantiationOutcome } from "./scenario-instantiate.js";

/** The native retention owner commits the returned artifact; the existing instantiate mode then
 * reads its pin. Installing/selecting a package never grants authority to execute its effects.
 */
export async function prepareExplicitRecipeInstantiation(opts: {
  command: CommandContext;
  task: TaskData;
  selection: ExplicitRecipeScenarioSelection;
  bindings: readonly ScenarioParameterBinding[];
}) {
  const selected = await resolveExplicitRecipeScenarioSelection({
    project: opts.command.resolvedProject,
    selection: opts.selection,
  });
  const bindings = structuredClone(opts.bindings);
  const root = opts.command.resolvedProject.gitRoot;
  const baseline = await observeSuppliedPlanBaseline(opts.command);
  const compilation = compileScenarioInstantiation({
    mode: "instantiate",
    scenario: selected.scenario,
    bindings: [...bindings],
    task_id: opts.task.id,
    planning_baseline: baseline,
  });
  if (compilation.kind === "needs_evidence") return compilation;
  const applicability = await observeRecipeApplicability({
    scenario: selected.scenario,
    bindings,
    repository_root: root,
    observers: createNativeRecipeApplicabilityObservers(opts.command),
  });
  if (applicability.disposition === "needs_evidence")
    return {
      kind: "needs_evidence",
      evidence_needs: applicability.evidence_needs,
    } satisfies RecipeInstantiationOutcome;
  if (applicability.disposition === "mismatch")
    return {
      kind: "mismatch",
      mismatches: applicability.mismatches,
    } satisfies RecipeInstantiationOutcome;
  let validated: Awaited<ReturnType<typeof validateRecipeScenarioPlan>>;
  try {
    validated = await validateRecipeScenarioPlan({
      scenario: selected.scenario,
      bindings,
      repository_root: root,
      task_id: opts.task.id,
      planning_baseline: baseline,
    });
  } catch (error) {
    if (!(error instanceof MissingRecipeContextSourceError)) throw error;
    return {
      kind: "needs_evidence",
      evidence_needs: [
        {
          kind: "context_source",
          source_ref: error.source,
          reason: "declared_context_source_missing",
        },
      ],
    } satisfies RecipeInstantiationOutcome;
  }
  const computed = await computeRecipeDependencyClosure({
    recipe_root: selected.recipe_root,
    repository_root: root,
    scenario_id: selected.selection.scenario_id,
    bindings,
    proposed_plan: compilation.proposal,
  });
  if (
    computed.closure.recipe.id !== selected.selection.recipe_id ||
    computed.closure.recipe.version !== selected.selection.recipe_version ||
    computed.closure.scenario_digest !== taskCentricDigest(compilation.scenario)
  )
    throw new Error("Explicit Recipe selection changed during preparation.");
  const currentSelection = await resolveExplicitRecipeScenarioSelection({
    project: opts.command.resolvedProject,
    selection: selected.selection,
  });
  if (
    taskCentricDigest(currentSelection.manifest) !== taskCentricDigest(selected.manifest) ||
    currentSelection.scenario_digest !== selected.scenario_digest
  )
    throw new Error("Explicit Recipe selection changed during preparation.");
  await validated.assertPathsUnchanged();
  const reference = await prepareRecipeClosureRetention({
    gitRoot: root,
    taskQualityRoot: path.join(
      root,
      opts.command.config.paths.workflow_dir,
      opts.task.id,
      "quality",
    ),
    computed,
  });
  return {
    kind: "retention_required" as const,
    selection: selected.selection,
    reference,
    bindings,
    next: "instantiate_retained_closure" as const,
  };
}
export type ExplicitRecipeInstantiationOutcome = Awaited<
  ReturnType<typeof prepareExplicitRecipeInstantiation>
>;
