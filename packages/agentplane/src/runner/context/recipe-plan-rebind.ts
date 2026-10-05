import path from "node:path";
import {
  parseTaskPlanProposal,
  taskKernel as k,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { computeRecipeDependencyClosure } from "./recipe-closure.js";
import { prepareRecipeClosureRetention } from "./recipe-retention.js";
import { readBoundRecipePlanClosure } from "./recipe-plan-binding.js";

/** Explicit preparation only. The native retention owner must commit the returned artifact before
 * bindRecipePlanProvenance can bind it and common Plan intake can seek a fresh approval.
 */
export async function prepareRecipePlanRebind(opts: {
  command: CommandContext;
  recipe_root: string;
  previous: ParsedTaskPlanProposal;
  proposal: unknown;
}) {
  const previous = parseTaskPlanProposal(opts.previous);
  const proposal = parseTaskPlanProposal(opts.proposal);
  const provenance = previous.recipe_provenance;
  if (!provenance || proposal.recipe_provenance || proposal.task_id !== previous.task_id)
    throw new Error("Recipe rebind requires an unbound same-task proposal and prior provenance.");
  const retained = await readBoundRecipePlanClosure({
    gitRoot: opts.command.resolvedProject.gitRoot,
    proposal: previous,
  });
  const computed = await computeRecipeDependencyClosure({
    recipe_root: opts.recipe_root,
    repository_root: opts.command.resolvedProject.gitRoot,
    scenario_id: provenance.scenario.id,
    bindings: provenance.parameters,
    proposed_plan: proposal,
  });
  // A dependency addition is not permission to silently update any previously selected byte.
  if (
    k.kernelDigest(computed.closure.recipe) !== k.kernelDigest(retained.closure.recipe) ||
    computed.closure.scenario_digest !== retained.closure.scenario_digest
  )
    throw new Error("Recipe rebind source identity changed; explicit source migration required.");
  for (const file of retained.closure.files) {
    const next = computed.closure.files.find(
      (entry) => entry.source === file.source && entry.path === file.path,
    );
    if (next?.digest !== file.digest)
      throw new Error(`Recipe rebind pinned bytes changed: ${file.source}:${file.path}`);
  }
  for (const node of retained.closure.nodes) {
    const next = computed.closure.nodes.find((entry) => entry.id === node.id);
    if (
      !next ||
      k.kernelDigest(next.definition) !== k.kernelDigest(node.definition) ||
      !node.dependencies.every((id) => next.dependencies.includes(id))
    )
      throw new Error(`Recipe rebind pinned dependency changed: ${node.id}`);
  }
  const reference = await prepareRecipeClosureRetention({
    gitRoot: opts.command.resolvedProject.gitRoot,
    taskQualityRoot: path.join(
      opts.command.resolvedProject.gitRoot,
      provenance.closure.task_quality_root,
    ),
    computed,
  });
  return {
    proposal,
    reference,
    parameters: provenance.parameters,
    previous_closure_digest: provenance.closure.digest,
  };
}
