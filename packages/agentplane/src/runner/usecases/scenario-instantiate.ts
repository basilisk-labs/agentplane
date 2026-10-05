import { taskCentricDigest, type ParsedTaskPlanProposal } from "@agentplaneorg/core/tasks";
import {
  compileScenarioInstantiation,
  type ScenarioInstantiationCompilation,
  type ScenarioParameterBinding,
} from "@agentplaneorg/recipes";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import {
  observeSuppliedPlanBaseline,
  prepareSuppliedPlan,
} from "../../commands/task/create-plan-input.js";
import { suppliedKernelProposal } from "../../commands/task/create-plan-proposal.js";
import {
  observeRecipeApplicability,
  type RecipeApplicabilityObservation,
} from "../context/recipe-applicability.js";
import { createNativeRecipeApplicabilityObservers } from "../context/recipe-native-observers.js";
import {
  bindRecipePlanProvenance,
  readRetainedRecipeScenario,
} from "../context/recipe-plan-binding.js";
import {
  validateRecipeScenarioPlan,
  MissingRecipeContextSourceError,
} from "../context/recipe-plan-validation.js";
import {
  readRetainedRecipeClosure,
  type RecipeClosureReference,
} from "../context/recipe-retention.js";

type ParameterNeed = Extract<
  ScenarioInstantiationCompilation,
  { kind: "needs_evidence" }
>["evidence_needs"][number];
type PredicateNeed = RecipeApplicabilityObservation["evidence_needs"][number];
export type RecipeInstantiationOutcome =
  | {
      kind: "needs_evidence";
      evidence_needs: (
        | ParameterNeed
        | PredicateNeed
        | {
            kind: "retained_closure" | "task_intent" | "context_source";
            source_ref: string;
            reason: string;
          }
      )[];
    }
  | { kind: "mismatch"; mismatches: string[] }
  | {
      kind: "specialization_required";
      request: {
        schema_version: 1;
        kind: "recipe_specialization_request";
        task_id: string;
        scenario_digest: string;
        closure_digest: string;
        questions: string[];
      };
    }
  | { kind: "compiled"; proposal: ParsedTaskPlanProposal };

/** Read-only V2 preparation for an existing native Task. No creation, approval, checks or dispatch.
 * The returned full proposal uses the same supplied-Plan intake and Kernel conversion as .12.
 */
export async function prepareRecipeScenarioInstantiation(opts: {
  command: CommandContext;
  task: TaskData;
  mode: "instantiate";
  reference: RecipeClosureReference;
  bindings: readonly ScenarioParameterBinding[];
}): Promise<RecipeInstantiationOutcome> {
  if (opts.mode !== "instantiate") throw new Error("Unsupported Recipe compilation mode.");
  const root = opts.command.resolvedProject.gitRoot;
  const bindings = structuredClone(opts.bindings);
  const task = structuredClone(opts.task);
  const reference = structuredClone(opts.reference);
  if (
    typeof reference?.closure_digest !== "string" ||
    !/^sha256:[a-f0-9]{64}$/u.test(reference.closure_digest)
  )
    throw new Error("Invalid Recipe closure reference digest.");
  let retained: Awaited<ReturnType<typeof readRetainedRecipeClosure>>;
  try {
    retained = await readRetainedRecipeClosure({
      gitRoot: root,
      reference,
      expectedClosureDigest: reference.closure_digest,
    });
  } catch {
    return {
      kind: "needs_evidence",
      evidence_needs: [
        {
          kind: "retained_closure",
          source_ref: reference.closure_digest,
          reason: "committed_retained_closure_unavailable_or_invalid",
        },
      ],
    };
  }
  if (retained.closure.schema_version !== 2)
    return {
      kind: "needs_evidence",
      evidence_needs: [
        {
          kind: "retained_closure",
          source_ref: retained.closure.digest,
          reason: "closure_v2_recompilation_required",
        },
      ],
    };
  const raw = readRetainedRecipeScenario(retained);
  const planningBaseline = await observeSuppliedPlanBaseline(opts.command);
  const compilation = compileScenarioInstantiation({
    mode: opts.mode,
    scenario: raw,
    bindings: [...bindings],
    task_id: task.id,
    planning_baseline: planningBaseline,
  });
  if (compilation.kind === "needs_evidence") return compilation;
  const observers = createNativeRecipeApplicabilityObservers(opts.command);
  const applicability = await observeRecipeApplicability({
    scenario: raw,
    bindings,
    repository_root: root,
    observers,
  });
  if (applicability.disposition === "needs_evidence")
    return { kind: "needs_evidence", evidence_needs: applicability.evidence_needs };
  if (applicability.disposition === "mismatch")
    return { kind: "mismatch", mismatches: applicability.mismatches };
  let validated: Awaited<ReturnType<typeof validateRecipeScenarioPlan>>;
  try {
    validated = await validateRecipeScenarioPlan({
      scenario: raw,
      bindings,
      repository_root: root,
      task_id: task.id,
      planning_baseline: planningBaseline,
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
    };
  }
  if (taskCentricDigest(validated.proposal) !== taskCentricDigest(compilation.proposal))
    throw new Error("Recipe compiler and common Plan validation disagree.");
  const bound = await bindRecipePlanProvenance({
    gitRoot: root,
    proposal: compilation.proposal,
    reference,
    bindings,
    applicability,
  });
  await validated.assertPathsUnchanged();
  if (compilation.kind === "specialization_required")
    return {
      kind: "specialization_required",
      request: { ...compilation.request, closure_digest: retained.closure.digest },
    };
  const declaration = task.execution_contract?.declaration;
  if (!declaration)
    return {
      kind: "needs_evidence",
      evidence_needs: [
        {
          kind: "task_intent",
          source_ref: "task.execution_contract.declaration",
          reason: "native_execution_declaration_missing",
        },
      ],
    };
  if (declaration.requirements_uncertainty !== "bounded")
    return {
      kind: "specialization_required",
      request: {
        schema_version: 1,
        kind: "recipe_specialization_request",
        task_id: task.id,
        scenario_digest: retained.closure.scenario_digest,
        closure_digest: retained.closure.digest,
        questions: ["Resolve the Task execution declaration's requirements uncertainty."],
      },
    };
  const proposal = await prepareSuppliedPlan(opts.command, task.id, bound, bound, observers);
  // Apply the existing complete executable-contract validator. No alternate DAG/admission rules.
  suppliedKernelProposal(proposal, task);
  await validated.assertPathsUnchanged();
  return { kind: "compiled", proposal };
}
