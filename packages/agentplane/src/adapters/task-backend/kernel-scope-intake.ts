import {
  taskKernel as k,
  repositoryEffectsForPath,
  computeVerificationContractKernel,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";
import { reconcileTaskExecutionContract } from "../../runtime/task-routing/resolve.js";
import { ALL_REPOSITORY_EFFECTS } from "../../runtime/task-routing/effects.js";
import type { TaskData } from "../../backends/task-backend.js";

/** Bind the immutable intake grant, not evolving observations or verification receipts. */
export function scopeIntakeDigest(contract: TaskData["execution_contract"]) {
  return k.kernelDigest(
    contract ? { declaration: contract.declaration, authority: contract.authority } : null,
  );
}

const union = <T extends string>(...values: readonly (readonly T[])[]) =>
  [...new Set(values.flat())].toSorted();

const safeEffects = new Set([
  "repository_write",
  "source_code",
  "tests",
  "documentation",
  "public_api",
]);

/** No executable policy, credentials, external effects or capabilities are admitted by this route. */
export function amendedScopeIntake(
  task: TaskData,
  roots: readonly string[],
  effects: readonly string[],
  completedRepair = false,
) {
  const contract = task.execution_contract;
  if (!contract) throw new Error("Scope request requires a trusted intake contract");
  const generatedForbidden = ALL_REPOSITORY_EFFECTS.filter(
    (effect) => !contract.authority.allowed_repository_effects.includes(effect),
  );
  const independentDeny =
    k.kernelDigest([...contract.authority.forbidden_repository_effects].toSorted()) !==
    k.kernelDigest([...generatedForbidden].toSorted());
  if (independentDeny && !completedRepair)
    throw new Error("Scope request cannot replace an independently constrained effect policy");
  for (const root of roots) {
    if (
      !root ||
      root === "." ||
      root.includes("\\") ||
      root.startsWith("/") ||
      /^[a-z]:/iu.test(root) ||
      root.split("/").some((part) => !part || part === "." || part === "..") ||
      /^(?:\.git|\.agentplane|AGENTS\.md)(?:\/|$)/u.test(root)
    )
      throw new Error("Scope request contains an unsupported or protected root");
  }
  const existing = new Set<string>(contract.authority.allowed_repository_effects);
  if (effects.some((effect) => !existing.has(effect) && !safeEffects.has(effect)))
    throw new Error("Scope request contains a forbidden or unsupported repository effect");
  if (
    effects.includes("public_api") &&
    !existing.has("public_api") &&
    (contract.selected_mode !== "branch_pr" || !contract.safety.requires_worktree)
  )
    throw new Error("Public API scope approval requires an already isolated branch_pr task");
  const allowed = new Set([...contract.authority.allowed_repository_effects, ...effects]);
  if (
    independentDeny &&
    effects.some((effect) =>
      contract.authority.forbidden_repository_effects.includes(effect as TaskRepositoryEffect),
    )
  )
    throw new Error("Scope request conflicts with an independent effect restriction");
  for (const root of roots) {
    if (
      repositoryEffectsForPath(root).some(
        (effect) =>
          !allowed.has(effect) ||
          (!existing.has(effect) && !safeEffects.has(effect)) ||
          (independentDeny && contract.authority.forbidden_repository_effects.includes(effect)),
      )
    )
      throw new Error("Scope root requires a forbidden or unrequested repository effect");
  }
  const next = structuredClone(contract);
  next.declaration.scope_roots = union(next.declaration.scope_roots, roots);
  next.declaration.repository_effects = union(
    next.declaration.repository_effects,
    effects as TaskRepositoryEffect[],
  );
  next.authority.writable_roots = union(next.authority.writable_roots, roots);
  next.authority.allowed_repository_effects = union(
    next.authority.allowed_repository_effects,
    effects as TaskRepositoryEffect[],
  );
  // This list is the resolver-generated complement of allowed effects, not an independent policy grant.
  if (!independentDeny)
    next.authority.forbidden_repository_effects =
      next.authority.forbidden_repository_effects.filter((effect) => !effects.includes(effect));
  return reconcileTaskExecutionContract({
    contract: next,
    changed_paths: next.observed.changed_paths,
  }).contract;
}

/** Monotonic completed intake: retain grants and all historical verification obligations. */
export function completedScopeIntake(
  task: TaskData,
  roots: readonly string[],
  effects: readonly string[],
) {
  const before = task.execution_contract!;
  const next = amendedScopeIntake(task, roots, effects, true);
  next.verification.required_evidence = union(
    before.verification.required_evidence,
    next.verification.required_evidence,
  );
  const prior = before.verification.contract,
    fresh = next.verification.contract;
  if (prior?.schema_version === 2 && fresh?.schema_version === 2) {
    const { kind: _kind, ...floor } = computeVerificationContractKernel({
      phase: prior.phase,
      changedFiles: union(prior.observed.changed_files, fresh.observed.changed_files),
      declaredRepositoryEffects: fresh.declared.repository_effects,
      declaredExternalEffects: fresh.declared.external_effects,
      observedRepositoryEffects: union(
        prior.observed.repository_effects,
        fresh.observed.repository_effects,
      ),
      observedExternalEffects: union(
        prior.observed.external_effects,
        fresh.observed.external_effects,
      ),
      changedComponents: union(
        prior.observed.changed_components,
        fresh.observed.changed_components,
      ),
      declaredComponents: union(prior.declared.components, fresh.declared.components),
      requirementsUncertainty: prior.declared.risk.requirements_uncertainty,
      implementationUncertainty: prior.declared.risk.implementation_uncertainty,
      reversibility: prior.declared.risk.reversibility,
      evidenceRequirements: union(
        prior.declared.evidence_requirements,
        fresh.declared.evidence_requirements,
        next.verification.required_evidence,
      ),
      selectorKind: prior.selector.kind,
      selectorReason: prior.selector.reason,
      selectorExecutionMode: prior.selector.execution_mode,
      selectorBucket: prior.selector.bucket,
      selectorBuckets: prior.selector.buckets,
      selectorLintTargets: prior.selector.lint_targets,
      selectorVitestPool: prior.selector.vitest_pool,
      selectorRunCliDocsCheck: prior.selector.run_cli_docs_check,
      selectedTestFiles: prior.selector.selected_test_files,
    });
    next.verification.contract = floor;
  }
  if (
    prior?.selected_checks.some(
      (check) => !next.verification.contract?.selected_checks.includes(check),
    )
  )
    throw new Error("Completed scope cannot reduce the historical verification floor");
  return next;
}

export function projectApprovedScopeIntake(task: TaskData, request: k.ProspectiveScopeRequest) {
  if (scopeIntakeDigest(task.execution_contract) !== request.intake_before_digest)
    throw new Error("Scope request intake changed");
  const next = amendedScopeIntake(task, request.scope_roots, request.repository_effects);
  if (scopeIntakeDigest(next) !== request.intake_after_digest)
    throw new Error("Scope request intake projection changed");
  return next;
}
