import {
  taskKernel as k,
  repositoryEffectsForPath,
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
) {
  const contract = task.execution_contract;
  if (!contract) throw new Error("Scope request requires a trusted intake contract");
  const generatedForbidden = ALL_REPOSITORY_EFFECTS.filter(
    (effect) => !contract.authority.allowed_repository_effects.includes(effect),
  );
  if (
    k.kernelDigest([...contract.authority.forbidden_repository_effects].toSorted()) !==
    k.kernelDigest([...generatedForbidden].toSorted())
  )
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
  if (effects.some((effect) => !safeEffects.has(effect)))
    throw new Error("Scope request contains a forbidden or unsupported repository effect");
  if (
    effects.includes("public_api") &&
    (contract.selected_mode !== "branch_pr" || !contract.safety.requires_worktree)
  )
    throw new Error("Public API scope approval requires an already isolated branch_pr task");
  const allowed = new Set([...contract.authority.allowed_repository_effects, ...effects]);
  for (const root of roots) {
    if (
      repositoryEffectsForPath(root).some(
        (effect) => !allowed.has(effect) || !safeEffects.has(effect),
      )
    )
      throw new Error("Scope root requires a forbidden or unrequested repository effect");
  }
  const union = <T extends string>(a: readonly T[], b: readonly T[]) =>
    [...new Set([...a, ...b])].toSorted();
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
  next.authority.forbidden_repository_effects = next.authority.forbidden_repository_effects.filter(
    (effect) => !effects.includes(effect),
  );
  return reconcileTaskExecutionContract({
    contract: next,
    changed_paths: next.observed.changed_paths,
  }).contract;
}

export function projectApprovedScopeIntake(task: TaskData, request: k.ProspectiveScopeRequest) {
  if (scopeIntakeDigest(task.execution_contract) !== request.intake_before_digest)
    throw new Error("Scope request intake changed");
  const next = amendedScopeIntake(task, request.scope_roots, request.repository_effects);
  if (scopeIntakeDigest(next) !== request.intake_after_digest)
    throw new Error("Scope request intake projection changed");
  return next;
}
