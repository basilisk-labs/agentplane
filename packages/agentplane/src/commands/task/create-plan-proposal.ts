import {
  kernelPlanProposalSchema,
  validateTaskPlanProposal,
  taskKernel as k,
  type KernelPlanProposal,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { suppliedAggregateValidationItem } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { PLAN_VALIDATION_CAPABILITIES } from "./planning-capabilities.js";

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
  const issues = validateTaskPlanProposal({
    proposal: input,
    expected_task_id: input.task_id,
    current_repository_digest: input.planning_baseline.digest,
    supported_capabilities: new Set([
      ...PLAN_VALIDATION_CAPABILITIES,
      ...(task.execution_contract?.authority.allowed_capabilities ?? []),
    ]),
  });
  if (issues.length > 0)
    throw new CliError({
      code: "E_VALIDATION",
      message: `Supplied Plan requires PLANNER: ${issues.map((issue) => `${issue.path}: ${issue.message}`).join("; ")}`,
    });
  for (const check of [
    ...top.checks,
    ...input.work_items.work_items.flatMap((item) => item.validation.checks),
  ]) {
    if (
      !PLAN_VALIDATION_CAPABILITIES.has(check.capability) ||
      check.kind === "provider" ||
      (check.kind !== "semantic" && !check.command)
    )
      throw new CliError({
        code: "E_VALIDATION",
        message: `Supplied Plan requires PLANNER: checks.${check.id} has no supported executable validation contract`,
      });
  }
  const declaredChecks = new Set(task.verify);
  for (const check of top.checks) {
    if (check.command && !declaredChecks.has(check.command))
      throw new CliError({
        code: "E_VALIDATION",
        message: `top_level_validation.checks.${check.id}: command is not a declared Task check`,
      });
  }
  const sourceDigest = k.kernelDigest(input);
  return kernelPlanProposalSchema.parse({
    work_items: [
      ...input.work_items.work_items.map((item) => ({
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
              (input.work_items.work_items.length === 1
                ? [...item.acceptance_criteria, ...top.criteria]
                : item.acceptance_criteria
              ).map((criterion) => criterion.description),
            ),
          ],
          verification_commands: item.validation.checks
            .map((check) => check.command)
            .filter((command): command is string => command !== undefined),
          role: "EXECUTOR",
          plan_input_digest: sourceDigest,
        },
      })),
      ...(input.work_items.work_items.length > 1 ? [suppliedAggregateValidationItem(input)] : []),
    ],
  });
}

/** Read-only compatibility reconstruction. New admission always uses suppliedKernelProposal. */
export function legacySuppliedKernelProposal(
  input: ParsedTaskPlanProposal,
  task: Pick<TaskData, "execution_contract" | "verify">,
): KernelPlanProposal {
  const proposal = suppliedKernelProposal(input, task);
  return {
    work_items: proposal.work_items
      .filter((item) => !item.contract.generated_origin)
      .map((item) => ({
        ...item,
        contract: {
          ...item.contract,
          acceptance_criteria: [
            ...new Set([
              ...item.contract.acceptance_criteria,
              ...input.top_level_validation.criteria.map((criterion) => criterion.description),
            ]),
          ],
        },
      })),
  };
}
