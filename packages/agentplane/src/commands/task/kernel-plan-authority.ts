import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend/shared/types.js";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import { kernelApprovalReference } from "../../runner/usecases/kernel-authority.js";
import type { CommandContext } from "../shared/task-backend.js";

function setIsSubset(child: readonly string[], parent: readonly string[]): boolean {
  const allowed = new Set(parent);
  return child.every((value) => allowed.has(value));
}

function scopeIsSubset(child: readonly string[], parent: readonly string[]): boolean {
  return child.every((candidate) =>
    parent.some((root) => root === "." || candidate === root || candidate.startsWith(`${root}/`)),
  );
}

/** Compare an agent-proposed Plan only with the trusted, intake-owned execution contract. */
export function canonicalPlanContractViolations(
  task: Pick<TaskData, "execution_contract">,
  plan: k.PlanRecord,
): string[] {
  const contract = task.execution_contract;
  if (!contract) return ["execution_contract_missing"];
  const violations = new Set<string>();
  for (const item of plan.work_items) {
    const requirements = item.execution_requirements;
    if (!scopeIsSubset(requirements.scope_roots, contract.authority.writable_roots))
      violations.add("scope_roots");
    if (
      !setIsSubset(requirements.repository_effects, contract.authority.allowed_repository_effects)
    )
      violations.add("repository_effects");
    if (!setIsSubset(requirements.external_effects, contract.authority.allowed_external_effects))
      violations.add("external_effects");
    if (!setIsSubset(requirements.capabilities, contract.authority.allowed_capabilities ?? []))
      violations.add("capabilities");
    if (!setIsSubset(requirements.resources, contract.authority.allowed_resources ?? []))
      violations.add("resources");
  }
  return [...violations].toSorted();
}

export function assertCanonicalPlanWithinExecutionContract(
  task: Pick<TaskData, "execution_contract">,
  plan: k.PlanRecord,
): void {
  const violations = canonicalPlanContractViolations(task, plan);
  if (violations.length > 0) {
    throw Object.assign(
      new Error(`Canonical Plan exceeds the trusted execution contract: ${violations.join(", ")}`),
      { reason_code: "plan_exceeds_execution_contract", violations },
    );
  }
}

export function repositoryPolicyApprovalEligible(opts: {
  config: AgentplaneConfig;
  task: Pick<TaskData, "execution_contract">;
  plan: k.PlanRecord;
}): boolean {
  const contract = opts.task.execution_contract;
  if (!contract) return false;
  if (
    opts.config.agents.approvals.require_plan === true ||
    contract.source !== "agent_declared" ||
    contract.declaration.requirements_uncertainty !== "bounded" ||
    contract.declaration.implementation_uncertainty !== "bounded" ||
    contract.declaration.reversibility !== "reversible" ||
    contract.safety.requires_user_approval ||
    canonicalPlanContractViolations(opts.task, opts.plan).length > 0
  )
    return false;
  return opts.plan.work_items.every(
    (item) => item.execution_requirements.external_effects.length === 0,
  );
}

export function executionContractCeiling(
  task: Pick<TaskData, "execution_contract">,
): Pick<
  k.ExecutionAuthority,
  | "scope_roots"
  | "repository_effects"
  | "external_effects"
  | "capabilities"
  | "resources"
  | "validation_requirements"
  | "risk"
> | null {
  const contract = task.execution_contract;
  if (!contract) return null;
  return {
    scope_roots: [...contract.authority.writable_roots],
    repository_effects: [...contract.authority.allowed_repository_effects],
    external_effects: [...contract.authority.allowed_external_effects],
    capabilities: [...(contract.authority.allowed_capabilities ?? [])],
    resources: [...(contract.authority.allowed_resources ?? [])],
    validation_requirements: contract.verification.contract?.selected_checks.toSorted() ?? [],
    risk: {
      requirements: contract.declaration.requirements_uncertainty,
      implementation: contract.declaration.implementation_uncertainty,
      reversibility: contract.declaration.reversibility,
    },
  };
}

export function kernelPlanApprovalOperatorAction(
  command: CommandContext,
  taskId: string,
  context: NativeAuthorityContext,
  plan: k.PlanRecord,
) {
  const authorityReference = kernelApprovalReference(context, plan);
  if (command.config.authority.approval_receipts.trusted_issuers.length === 0) {
    return {
      kind: "approve_plan" as const,
      required_role: "USER" as const,
      cwd: command.resolvedProject.gitRoot,
      argv: ["agentplane", "task", "plan", "approve", taskId, "--by", "USER"],
      authority_reference: authorityReference,
      transport: "manual_operator" as const,
    };
  }
  return {
    kind: "approve_plan" as const,
    required_role: "USER" as const,
    cwd: command.resolvedProject.gitRoot,
    argv: [
      "agentplane",
      "task",
      "plan",
      "approve",
      taskId,
      "--approval-receipt",
      "<base64url-receipt>",
    ],
    authority_reference: authorityReference,
    transport: "signed_user_receipt" as const,
    approval_receipt: {
      schema_version: 1 as const,
      format: "base64url-json+ed25519" as const,
      request: {
        approval_type: "plan_approval" as const,
        task_id: taskId,
        authority_reference: authorityReference,
        state_fingerprint: context.repository_fingerprint,
        operation_id: null,
        operation_digest: null,
        state_scope_digest: null,
      },
    },
  };
}
