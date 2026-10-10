import type { KernelWorkContract } from "../kernel-plan-refinement.js";
import { kernelDigest } from "./digest.js";
import { executionRequirementsAreSubset, isSupervisorOwnedRequirement } from "./invariants.js";
import type {
  CorrectiveAuthorityGrant,
  ExecutionRequirements,
  KernelInput,
  PlanRecord,
  Sha256Digest,
  TaskAggregate,
  TaskCommand,
} from "./model.js";

export function correctiveGrantDigest(
  grant: Omit<CorrectiveAuthorityGrant, "digest">,
): Sha256Digest {
  const {
    digest: _digest,
    revoked_at: _revoked,
    uses: _uses,
    ...identity
  } = grant as CorrectiveAuthorityGrant;
  return kernelDigest({ kind: "bounded_corrective_authority", ...identity });
}

export function correctiveRequirements(
  plan: Pick<PlanRecord, "work_items">,
): ExecutionRequirements {
  const union = (key: keyof ExecutionRequirements) =>
    [...new Set(plan.work_items.flatMap((item) => item.execution_requirements[key]))].toSorted();
  return {
    scope_roots: union("scope_roots"),
    repository_effects: union("repository_effects"),
    external_effects: [],
    capabilities: union("capabilities"),
    resources: union("resources"),
  };
}

export function correctiveVerificationCommands(
  plan: Pick<PlanRecord, "work_items">,
  contracts: Readonly<Record<string, KernelWorkContract>>,
): string[] {
  const commands: string[] = [];
  for (const item of plan.work_items) {
    const contract = item.contract_digest
      ? new Map(Object.entries(contracts)).get(item.contract_digest)
      : undefined;
    if (!contract || kernelDigest(contract) !== item.contract_digest)
      throw new Error("Corrective authority requires exact retained contracts");
    commands.push(...contract.verification_commands);
  }
  return [...new Set(commands)].toSorted();
}

function requiresFreshActionApproval(requirements: ExecutionRequirements): boolean {
  return (
    requirements.external_effects.length > 0 ||
    [
      ...requirements.repository_effects,
      ...requirements.capabilities,
      ...requirements.resources,
    ].some((requirement) => isSupervisorOwnedRequirement(requirement))
  );
}

export function correctiveGrantIssues(
  input: KernelInput,
  grant: CorrectiveAuthorityGrant,
  contracts: Readonly<Record<string, KernelWorkContract>>,
): string[] {
  const plan = input.aggregate.current_plan;
  if (requiresFreshActionApproval(grant.requirements)) return ["corrective_grant_sensitive_action"];
  if (
    input.actor.kind !== "USER" ||
    input.actor.transport !== "manual" ||
    input.actor.id !== grant.actor_id
  )
    return ["explicit_manual_corrective_grant_required"];
  if (
    plan?.state !== "APPROVED" ||
    input.authority?.work_item_id !== null ||
    !["ACTIVE", "FINAL_VALIDATION"].includes(input.aggregate.state)
  )
    return ["corrective_grant_requires_approved_plan"];
  if (
    grant.task_id !== input.aggregate.id ||
    grant.initial_plan_digest !== plan.digest ||
    grant.issued_at !== input.occurred_at ||
    grant.digest !== correctiveGrantDigest(grant) ||
    grant.revoked_at !== null ||
    grant.uses.length > 0 ||
    input.aggregate.corrective_authority?.some((g) => g.digest === grant.digest)
  )
    return ["corrective_grant_binding"];
  const expiry = Date.parse(grant.expires_at),
    issued = Date.parse(grant.issued_at);
  if (
    !Number.isFinite(expiry) ||
    !Number.isFinite(issued) ||
    expiry <= issued ||
    !Number.isSafeInteger(grant.max_attempts) ||
    grant.max_attempts < 1 ||
    grant.max_attempts > 100
  )
    return ["corrective_grant_budget"];
  if (
    kernelDigest(grant.requirements) !== kernelDigest(correctiveRequirements(plan)) ||
    !executionRequirementsAreSubset(input.authority, grant.requirements) ||
    grant.policy_digest !== kernelDigest(input.authority.policy_digests)
  )
    return ["corrective_grant_authority"];
  try {
    if (
      kernelDigest(grant.verification_commands) !==
      kernelDigest(correctiveVerificationCommands(plan, contracts))
    )
      return ["corrective_grant_checks"];
  } catch {
    return ["corrective_grant_contracts"];
  }
  return [];
}

export function correctiveAmendmentGrant(
  input: KernelInput,
  command: Extract<TaskCommand, { kind: "amend_plan" }>,
): CorrectiveAuthorityGrant | null {
  const grant = input.aggregate.corrective_authority?.find(
    (g) => g.digest === command.corrective_grant_digest,
  );
  const plan = input.aggregate.current_plan,
    failure = input.aggregate.final_validation;
  if (
    !grant ||
    !plan ||
    failure?.status !== "FAILED" ||
    input.authority?.work_item_id !== null ||
    command.authority_delta_digest !== null
  )
    return null;
  if (requiresFreshActionApproval(grant.requirements)) return null;
  const now = Date.parse(input.occurred_at);
  if (
    grant.digest !== correctiveGrantDigest(grant) ||
    grant.revoked_at !== null ||
    grant.uses.length >= grant.max_attempts ||
    !Number.isFinite(now) ||
    now < Date.parse(grant.issued_at) ||
    now >= Date.parse(grant.expires_at)
  )
    return null;
  if (
    (grant.uses.at(-1)?.to_plan_digest ?? grant.initial_plan_digest) !== plan.digest ||
    command.verification_contract_digest !== grant.verification_contract_digest ||
    grant.policy_digest !== kernelDigest(input.authority.policy_digests)
  )
    return null;
  const proposed = command.amended_plan;
  if (
    proposed.work_items.length !== plan.work_items.length + 1 ||
    plan.work_items.some(
      (item) =>
        kernelDigest(proposed.work_items.find((next) => next.id === item.id)) !==
        kernelDigest(item),
    )
  )
    return null;
  if (
    plan.work_items.some(
      (item) => !item.optional && input.aggregate.work_items[item.id]?.state !== "COMPLETED",
    )
  )
    return null;
  const added = proposed.work_items.find(
    (item) => !plan.work_items.some((old) => old.id === item.id),
  );
  const evidence = failure.evidence_digests;
  if (
    !added ||
    evidence.length !== 1 ||
    added.id !== `final-correction-${evidence[0]!.slice(7, 19)}` ||
    added.optional ||
    added.required_inputs.length > 0 ||
    added.expected_outputs.length !== 1 ||
    added.expected_outputs[0] !== added.id + "-evidence"
  )
    return null;
  const completed = plan.work_items
    .filter((item) => input.aggregate.work_items[item.id]?.state === "COMPLETED")
    .map((item) => item.id)
    .toSorted();
  if (
    kernelDigest([...added.depends_on].toSorted()) !== kernelDigest(completed) ||
    kernelDigest(added.execution_requirements) !== kernelDigest(grant.requirements) ||
    !executionRequirementsAreSubset(input.authority, added.execution_requirements)
  )
    return null;
  const contract = added.contract_digest
    ? new Map(Object.entries(command.work_contracts ?? {})).get(added.contract_digest)
    : undefined;
  if (
    !contract ||
    kernelDigest(contract) !== added.contract_digest ||
    contract.role !== "EXECUTOR" ||
    kernelDigest([...new Set(contract.verification_commands)].toSorted()) !==
      kernelDigest(grant.verification_commands)
  )
    return null;
  try {
    if (
      kernelDigest(correctiveVerificationCommands(plan, command.work_contracts ?? {})) !==
      kernelDigest(grant.verification_commands)
    )
      return null;
  } catch {
    return null;
  }
  return grant;
}

/** A retained consumed grant admits only the exact historical transition, including after revoke. */
export function isCorrectivePlanContinuation(
  aggregate: TaskAggregate,
  source: PlanRecord | undefined,
  plan: PlanRecord,
): boolean {
  return (
    !!source &&
    (aggregate.corrective_authority ?? []).some(
      (grant) =>
        grant.digest === correctiveGrantDigest(grant) &&
        grant.uses.some(
          (use) => use.from_plan_digest === source.digest && use.to_plan_digest === plan.digest,
        ),
    )
  );
}
