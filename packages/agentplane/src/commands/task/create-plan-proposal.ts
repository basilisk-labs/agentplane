import {
  kernelPlanProposalSchema,
  taskKernel as k,
  type KernelPlanProposal,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";

/** Convert explicit requirements only. Input bytes remain part of the canonical documents. */
export function suppliedKernelProposal(
  input: ParsedTaskPlanProposal,
  task: Pick<TaskData, "execution_contract" | "verify">,
): KernelPlanProposal {
  if (input.unresolved_questions.length > 0)
    throw new CliError({
      code: "E_VALIDATION",
      message: `Supplied Plan requires PLANNER: unresolved_questions: ${input.unresolved_questions.join("; ")}`,
    });
  const declaration = task.execution_contract?.declaration;
  if (!declaration)
    throw new CliError({
      code: "E_VALIDATION",
      message: "Supplied Plan requires a trusted execution declaration.",
    });
  const top = input.top_level_validation;
  const declaredChecks = new Set(task.verify ?? []);
  for (const check of top.checks) {
    if (check.command && !declaredChecks.has(check.command))
      throw new CliError({
        code: "E_VALIDATION",
        message: `top_level_validation.checks.${check.id}: command is not a declared Task check`,
      });
  }
  const sourceDigest = k.kernelDigest(input);
  return kernelPlanProposalSchema.parse({
    work_items: input.work_items.work_items.map((item) => ({
      id: item.id,
      depends_on: item.depends_on,
      required_inputs: item.required_inputs,
      expected_outputs: item.expected_outputs,
      optional: item.optional,
      execution_requirements: {
        scope_roots: item.scope_roots,
        repository_effects: declaration.repository_effects,
        external_effects: declaration.external_effects,
        capabilities: item.capabilities,
        resources: item.resource_claims.map(
          (claim) => `${claim.kind}:${claim.resource}:${claim.mode}`,
        ),
      },
      contract: {
        objective: item.objective,
        acceptance_criteria: [
          ...new Set(
            [...item.acceptance_criteria, ...top.criteria].map(
              (criterion) => criterion.description,
            ),
          ),
        ],
        verification_commands: item.validation.checks
          .map((check) => check.command)
          .filter((command): command is string => command !== undefined),
        role: "EXECUTOR",
        plan_input_digest: sourceDigest,
      },
    })),
  });
}
