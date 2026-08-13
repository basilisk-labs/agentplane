import { computeVerificationContractKernel } from "../../packages/core/src/tasks/verification-contract-kernel.js";

function uniqueSorted(values) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))].toSorted();
}

export function computeVerificationContract({
  phase = "local",
  changedFiles = [],
  declaredRepositoryEffects = [],
  declaredExternalEffects = [],
  observedRepositoryEffects = [],
  observedExternalEffects = [],
  declaredComponents = [],
  requirementsUncertainty = "bounded",
  implementationUncertainty = "bounded",
  reversibility = "reversible",
  evidenceRequirements = ["task_outcome"],
  selectorKind = "full-fast",
  selectorReason = "unclassified_changed_paths",
  selectorExecutionMode = "fast",
  selectorBucket = null,
  selectorBuckets = [],
  selectorLintTargets = [],
  selectorVitestPool = "forks",
  selectorRunCliDocsCheck = false,
  selectedTestFiles = [],
} = {}) {
  const files = uniqueSorted(changedFiles);
  return computeVerificationContractKernel({
    phase,
    changedFiles: files,
    declaredRepositoryEffects,
    declaredExternalEffects,
    observedRepositoryEffects,
    observedExternalEffects,
    declaredComponents,
    requirementsUncertainty,
    implementationUncertainty,
    reversibility,
    evidenceRequirements,
    selectorKind,
    selectorReason,
    selectorExecutionMode,
    selectorBucket,
    selectorBuckets,
    selectorLintTargets,
    selectorVitestPool,
    selectorRunCliDocsCheck,
    selectedTestFiles,
  });
}

export function mergeVerificationContracts(previous, next) {
  if (!previous) return structuredClone(next);
  return computeVerificationContract({
    phase: next.phase,
    changedFiles: [...previous.observed.changed_files, ...next.observed.changed_files],
    declaredRepositoryEffects: [
      ...previous.declared.repository_effects,
      ...next.declared.repository_effects,
    ],
    declaredExternalEffects: [
      ...previous.declared.external_effects,
      ...next.declared.external_effects,
    ],
    declaredComponents: [
      ...(previous.declared.components ?? []),
      ...(next.declared.components ?? []),
    ],
    requirementsUncertainty:
      previous.declared.risk?.requirements_uncertainty === "material" ||
      next.declared.risk?.requirements_uncertainty === "material"
        ? "material"
        : "bounded",
    implementationUncertainty:
      previous.declared.risk?.implementation_uncertainty === "material" ||
      next.declared.risk?.implementation_uncertainty === "material"
        ? "material"
        : "bounded",
    reversibility:
      previous.declared.risk?.reversibility === "irreversible" ||
      next.declared.risk?.reversibility === "irreversible"
        ? "irreversible"
        : previous.declared.risk?.reversibility === "recovery_required" ||
            next.declared.risk?.reversibility === "recovery_required"
          ? "recovery_required"
          : "reversible",
    evidenceRequirements: [
      ...(previous.declared.evidence_requirements ?? ["task_outcome"]),
      ...(next.declared.evidence_requirements ?? ["task_outcome"]),
    ],
    observedRepositoryEffects: [
      ...previous.observed.repository_effects,
      ...next.observed.repository_effects,
    ],
    observedExternalEffects: [
      ...previous.observed.external_effects,
      ...next.observed.external_effects,
    ],
    selectorKind:
      previous.requires_full_regression || next.requires_full_regression
        ? "full-fast"
        : next.selector.kind,
    selectorReason: previous.requires_full_regression
      ? "monotonic_previous_full_regression"
      : next.selector.reason,
    selectorExecutionMode: next.selector.execution_mode ?? "fast",
    selectorBucket: next.selector.bucket ?? null,
    selectorBuckets: next.selector.buckets ?? [],
    selectorLintTargets: next.selector.lint_targets ?? [],
    selectorVitestPool: next.selector.vitest_pool ?? "forks",
    selectorRunCliDocsCheck: next.selector.run_cli_docs_check ?? false,
    selectedTestFiles: [
      ...previous.selector.selected_test_files,
      ...next.selector.selected_test_files,
    ],
  });
}
