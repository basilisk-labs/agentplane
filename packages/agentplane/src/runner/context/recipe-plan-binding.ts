import {
  parseTaskPlanProposal,
  recipeSourcePlanSemanticDigest,
  taskCentricDigest,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import {
  parseScenarioV2,
  resolveScenarioParameters,
  type ScenarioParameterBinding,
} from "@agentplaneorg/recipes";
import {
  assertRecipeApplicable,
  observeRecipeApplicability,
  type RecipeApplicabilityObservation,
  type RecipeApplicabilityObservers,
} from "./recipe-applicability.js";
import { readRetainedRecipeClosure, type RecipeClosureReference } from "./recipe-retention.js";

const compiler = { id: "agentplane.scenario", version: 1 } as const;
function freezeJson<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeJson(child);
    Object.freeze(value);
  }
  return value;
}

function retainedScenario(retained: Awaited<ReturnType<typeof readRetainedRecipeClosure>>) {
  const scenarioNode = retained.closure.nodes.find(
    (node) => node.id === `scenario:${retained.closure.scenario_id}`,
  );
  const definition = scenarioNode?.definition;
  const file =
    definition && typeof definition === "object" && "file" in definition
      ? definition.file
      : undefined;
  if (typeof file !== "string")
    throw new Error("Retained Recipe Scenario entrypoint is unavailable.");
  return parseScenarioV2(
    JSON.parse(Buffer.from(retained.readFile("recipe", file)).toString("utf8")),
  );
}

/** Native pre-approval binding. The existing Kernel stores this proposal once in plan_inputs;
 * contract.plan_input_digest binds it to Plan approval and every canonical episode/result.
 * This function neither admits a Plan nor supplies execution authority.
 */
export async function bindRecipePlanProvenance(opts: {
  gitRoot: string;
  proposal: unknown;
  reference: RecipeClosureReference;
  bindings: readonly ScenarioParameterBinding[];
  applicability: RecipeApplicabilityObservation;
}): Promise<ParsedTaskPlanProposal> {
  const proposal = parseTaskPlanProposal(opts.proposal);
  if (proposal.recipe_provenance) throw new Error("Recipe Plan provenance is already bound.");
  const reference = structuredClone(opts.reference);
  const retained = await readRetainedRecipeClosure({
    gitRoot: opts.gitRoot,
    reference,
    expectedClosureDigest: reference.closure_digest,
  });
  if (retained.closure.schema_version !== 2)
    throw new Error("Historical Recipe closure v1 requires explicit recompilation before binding.");
  if (retained.closure.plan_semantics_digest !== recipeSourcePlanSemanticDigest(proposal))
    throw new Error("Retained Recipe closure belongs to a different source Plan.");
  const scenario = retainedScenario(retained);
  const bindings = structuredClone(opts.bindings);
  const expanded = resolveScenarioParameters(scenario, bindings);
  if (
    expanded.id !== retained.closure.scenario_id ||
    taskCentricDigest(expanded) !== retained.closure.scenario_digest
  )
    throw new Error("Retained Recipe Scenario or parameters do not match the pinned closure.");
  await assertRecipeApplicable(opts.applicability, expanded, opts.gitRoot);
  const supplied = new Map(bindings.map((entry) => [entry.name, entry.value]));
  const parameters = scenario.parameters
    .flatMap((entry) => {
      const value = supplied.get(entry.name) ?? entry.default;
      return value === undefined ? [] : [{ name: entry.name, value }];
    })
    .toSorted((a, b) => Number(a.name > b.name) - Number(a.name < b.name));
  // The observation is identity evidence, not replay permission. A future native compiler must
  // observe applicability again; an agent cannot manufacture an issued observation here.
  return freezeJson(
    parseTaskPlanProposal({
      ...proposal,
      recipe_provenance: {
        schema_version: 1,
        package: retained.closure.recipe,
        scenario: { id: expanded.id, api_version: "2", digest: retained.closure.scenario_digest },
        compiler,
        source_plan_semantics_digest: retained.closure.plan_semantics_digest,
        parameters,
        applicability: {
          observed_by: "agentplane",
          evidence_digest: taskCentricDigest(opts.applicability),
        },
        closure: {
          digest: retained.closure.digest,
          artifact_digest: reference.artifact.sha256,
          artifact_path: reference.artifact.path,
          artifact_size_bytes: reference.artifact.size_bytes,
          task_quality_root: reference.task_quality_root,
        },
      },
    }),
  );
}

/** Resolve the source proposal obtained from Kernel documents by its contract.plan_input_digest.
 * The caller verifies that native document binding; caller-provided Recipe identity is not authority.
 * Installed package state is deliberately absent from this API.
 */
export async function readBoundRecipePlanClosure(opts: { gitRoot: string; proposal: unknown }) {
  const proposal = parseTaskPlanProposal(opts.proposal);
  const provenance = proposal.recipe_provenance;
  if (!provenance) throw new Error("Plan has no bound Recipe provenance.");
  const pin = provenance.closure;
  const retained = await readRetainedRecipeClosure({
    gitRoot: opts.gitRoot,
    expectedClosureDigest: pin.digest,
    reference: {
      schema_version: 1,
      kind: "recipe_closure_reference",
      closure_digest: pin.digest,
      task_quality_root: pin.task_quality_root,
      retention: "keep_in_current_tree_until_task_and_audit_complete",
      artifact: {
        logical_name: `recipe-closure:${pin.digest}`,
        kind: "recipe_closure",
        path: pin.artifact_path,
        sha256: pin.artifact_digest,
        size_bytes: pin.artifact_size_bytes,
        media_type: "application/vnd.agentplane.recipe-closure+json",
      },
    },
  });
  if (
    retained.closure.schema_version !== 2 ||
    retained.closure.plan_semantics_digest !== provenance.source_plan_semantics_digest ||
    retained.closure.scenario_id !== provenance.scenario.id ||
    retained.closure.scenario_digest !== provenance.scenario.digest ||
    taskCentricDigest(retained.closure.recipe) !== taskCentricDigest(provenance.package)
  )
    throw new Error("Retained Recipe closure does not match bound Plan provenance.");
  const scenario = retainedScenario(retained);
  const expanded = resolveScenarioParameters(scenario, provenance.parameters);
  if (taskCentricDigest(expanded) !== provenance.scenario.digest)
    throw new Error("Bound Recipe parameters do not match the retained Scenario.");
  return { ...retained, scenario };
}

/** Common native intake validates full proposals too. Serialized provenance never proves truth.
 * Unavailable native observers fail closed and require supported native recompilation/observation.
 */
export async function validateRecipePlanForAdmission(opts: {
  gitRoot: string;
  proposal: unknown;
  observers?: RecipeApplicabilityObservers;
}): Promise<void> {
  const proposal = parseTaskPlanProposal(opts.proposal);
  const provenance = proposal.recipe_provenance;
  if (!provenance) return;
  const retained = await readBoundRecipePlanClosure(opts);
  const observation = await observeRecipeApplicability({
    scenario: retained.scenario,
    bindings: provenance.parameters,
    repository_root: opts.gitRoot,
    observers: opts.observers,
  });
  const expanded = resolveScenarioParameters(retained.scenario, provenance.parameters);
  await assertRecipeApplicable(observation, expanded, opts.gitRoot);
  if (taskCentricDigest(observation) !== provenance.applicability.evidence_digest)
    throw new Error(
      "Recipe applicability provenance requires native recompilation: observation changed.",
    );
}
