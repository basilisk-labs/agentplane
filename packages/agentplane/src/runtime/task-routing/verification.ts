import type {
  TaskExecutionContract,
  TaskExecutionDeclaration,
  TaskExecutionRouteMode,
  TaskExternalEffect,
  TaskRepositoryEffect,
  TaskVerificationObservation,
} from "@agentplaneorg/core/tasks";
import { computeVerificationContractKernel } from "@agentplaneorg/core/tasks";

function uniqueSorted<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

export function requiredEvidence(opts: {
  declaration: TaskExecutionDeclaration;
  selected_mode: TaskExecutionRouteMode;
  observed_effects?: readonly TaskRepositoryEffect[];
  observed_external_effects?: readonly TaskExternalEffect[];
  verification_results?: readonly TaskVerificationObservation[];
  floor?: readonly string[];
}): string[] {
  const repositoryEffects = uniqueSorted([
    ...opts.declaration.repository_effects,
    ...(opts.observed_effects ?? []),
  ]);
  return uniqueSorted([
    ...(opts.floor ?? []),
    "task_outcome",
    ...repositoryEffects.map((effect) => `repository_effect:${effect}`),
    ...uniqueSorted([
      ...opts.declaration.external_effects,
      ...(opts.observed_external_effects ?? []),
    ]).map((effect) => `external_effect:${effect}`),
    ...(opts.verification_results ?? [])
      .filter((result) => result.result !== "pass")
      .map((result) => `verification_recovery:${result.id}`),
    ...(opts.selected_mode === "branch_pr" ? ["hosted_integration"] : []),
    ...(opts.declaration.requirements_uncertainty === "material"
      ? ["requirements_resolution"]
      : []),
    ...(opts.declaration.implementation_uncertainty === "material"
      ? ["implementation_risk_validation"]
      : []),
  ]);
}

export function verificationContract(opts: {
  declaration: TaskExecutionDeclaration;
  selectedMode: "direct" | "branch_pr";
  changedFiles?: readonly string[];
  observedRepositoryEffects?: readonly TaskRepositoryEffect[];
  observedExternalEffects?: readonly TaskExternalEffect[];
  changedComponents?: readonly string[];
  floor?: TaskExecutionContract["verification"];
}): NonNullable<TaskExecutionContract["verification"]["contract"]> {
  const previous = opts.floor?.contract;
  const floorV2 = previous?.schema_version === 2 ? previous : undefined;
  const selector = floorV2?.selector;
  const observedRepositoryEffects = uniqueSorted([
    ...(previous?.observed.repository_effects ?? []),
    ...(opts.observedRepositoryEffects ?? []),
  ]);
  const observedExternalEffects = uniqueSorted([
    ...(previous?.observed.external_effects ?? []),
    ...(opts.observedExternalEffects ?? []),
  ]);
  const evidenceRequirements = requiredEvidence({
    declaration: opts.declaration,
    selected_mode: opts.selectedMode,
    observed_effects: observedRepositoryEffects,
    observed_external_effects: observedExternalEffects,
    floor: opts.floor?.required_evidence.filter(
      (entry) => !entry.startsWith("verification_recovery:"),
    ),
  });
  const computed = computeVerificationContractKernel({
    phase: previous?.phase ?? "task",
    changedFiles: uniqueSorted([
      ...(previous?.observed.changed_files ?? []),
      ...(opts.changedFiles ?? []),
    ]),
    declaredRepositoryEffects: opts.declaration.repository_effects,
    declaredExternalEffects: opts.declaration.external_effects,
    observedRepositoryEffects,
    observedExternalEffects,
    changedComponents: uniqueSorted([
      ...(previous?.observed.changed_components ?? []),
      ...(opts.changedComponents ?? []),
    ]),
    declaredComponents: opts.declaration.scope_roots,
    requirementsUncertainty: opts.declaration.requirements_uncertainty,
    implementationUncertainty: opts.declaration.implementation_uncertainty,
    reversibility: opts.declaration.reversibility,
    evidenceRequirements: uniqueSorted([
      ...(floorV2?.declared.evidence_requirements ?? []),
      ...evidenceRequirements,
    ]),
    selectorKind: previous?.selector.kind,
    selectorReason: previous?.selector.reason,
    selectorExecutionMode: selector?.execution_mode,
    selectorBucket: selector?.bucket,
    selectorBuckets: selector?.buckets,
    selectorLintTargets: selector?.lint_targets,
    selectorVitestPool: selector?.vitest_pool,
    selectorRunCliDocsCheck: selector?.run_cli_docs_check,
    selectedTestFiles: previous?.selector.selected_test_files,
  });
  return {
    schema_version: computed.schema_version,
    source: "execution_contract",
    phase: computed.phase,
    declared: structuredClone(computed.declared),
    observed: {
      repository_effects: [...computed.observed.repository_effects],
      external_effects: [...computed.observed.external_effects],
      changed_components: [...computed.observed.changed_components],
      changed_files: [...computed.observed.changed_files],
    },
    policy_floor: structuredClone(computed.policy_floor),
    selector: structuredClone(computed.selector),
    selected_checks: [...computed.selected_checks],
    execution_groups: [...computed.execution_groups],
    escalation_reasons: [...computed.escalation_reasons],
    requires_full_regression: computed.requires_full_regression,
    requires_real_e2e: computed.requires_real_e2e,
    digest: computed.digest,
  };
}
