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
  selectorKind = "full-fast",
  selectorReason = "unclassified_changed_paths",
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
    selectorKind,
    selectorReason,
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
    selectedTestFiles: [
      ...previous.selector.selected_test_files,
      ...next.selector.selected_test_files,
    ],
  });
}
