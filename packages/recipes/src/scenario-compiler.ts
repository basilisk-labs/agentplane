import {
  normalizeTaskPlanProposal,
  REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
  taskCentricDigest,
  type RepositorySnapshot,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { z } from "zod";
import {
  MissingScenarioParametersError,
  resolveScenarioParameters,
} from "./scenario-parameters.js";
import { parseScenarioV2, type ScenarioV2Definition } from "./scenario-v2.js";

const INPUT = z.strictObject({
  mode: z.literal("instantiate"),
  scenario: z.unknown(),
  bindings: z
    .array(
      z.strictObject({
        name: z.string().min(1),
        value: z.union([z.string(), z.number().int().safe(), z.boolean()]),
      }),
    )
    .max(256),
  task_id: z.string().min(1),
  planning_baseline: REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
});
export type ScenarioInstantiationInput = Omit<z.input<typeof INPUT>, "planning_baseline"> & {
  planning_baseline: RepositorySnapshot;
};
export type ScenarioInstantiationCompilation =
  | {
      kind: "needs_evidence";
      evidence_needs: {
        kind: "parameter";
        name: string;
        parameter_type: string;
        reason: "required_parameter_missing";
      }[];
    }
  | { kind: "compiled"; scenario: ScenarioV2Definition; proposal: ParsedTaskPlanProposal }
  | {
      kind: "specialization_required";
      scenario: ScenarioV2Definition;
      proposal: ParsedTaskPlanProposal;
      request: {
        schema_version: 1;
        kind: "recipe_specialization_request";
        task_id: string;
        scenario_digest: string;
        questions: string[];
      };
    };

/** Pure template compilation. The result is intent, never observed applicability or admission.
 * Native callers must validate paths, retained closure and observations through common Plan intake.
 */
export function compileScenarioInstantiation(
  value: ScenarioInstantiationInput,
): ScenarioInstantiationCompilation {
  const input = INPUT.parse(value);
  const raw = parseScenarioV2(input.scenario);
  let scenario: ScenarioV2Definition;
  try {
    scenario = resolveScenarioParameters(raw, input.bindings);
  } catch (error) {
    if (!(error instanceof MissingScenarioParametersError)) throw error;
    return {
      kind: "needs_evidence",
      evidence_needs: error.parameterNames.map((name) => ({
        kind: "parameter",
        name,
        parameter_type: raw.parameters.find((entry) => entry.name === name)!.type,
        reason: "required_parameter_missing",
      })),
    };
  }
  const proposal = normalizeTaskPlanProposal(scenario.plan_template, {
    task_id: input.task_id,
    planning_baseline: input.planning_baseline,
  });
  if (proposal.unresolved_questions.length > 0) {
    if (
      proposal.unresolved_questions.length > 64 ||
      proposal.unresolved_questions.some((question) => question.length > 4096)
    )
      throw new Error("Recipe specialization questions exceed the bounded request budget.");
    return {
      kind: "specialization_required",
      scenario,
      proposal,
      request: {
        schema_version: 1,
        kind: "recipe_specialization_request",
        task_id: input.task_id,
        scenario_digest: taskCentricDigest(scenario),
        questions: [...proposal.unresolved_questions],
      },
    };
  }
  return { kind: "compiled", scenario, proposal };
}
