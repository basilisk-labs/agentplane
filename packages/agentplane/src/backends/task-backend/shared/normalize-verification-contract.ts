import {
  computeLegacyVerificationContractKernel,
  computeVerificationContractKernel,
} from "@agentplaneorg/core/tasks";

import { isRecord } from "../../../shared/guards.js";

import type { TaskData } from "./types.js";

const REPOSITORY_EFFECTS = new Set([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const EXTERNAL_EFFECTS = new Set([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);

function stringList(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    return null;
  }
  return [...new Set(value as string[])];
}

export function normalizeVerificationContract(
  value: unknown,
): NonNullable<TaskData["execution_contract"]>["verification"]["contract"] | null {
  if (
    !isRecord(value) ||
    (value.schema_version !== 1 && value.schema_version !== 2) ||
    value.source !== "execution_contract" ||
    !isRecord(value.declared) ||
    !isRecord(value.observed) ||
    !isRecord(value.selector) ||
    !isRecord(value.policy_floor) ||
    !["task", "local", "pr", "release"].includes(String(value.phase)) ||
    value.policy_floor.pr_full_regression !== true ||
    value.policy_floor.unknown_or_central_full_regression !== true ||
    value.policy_floor.monotonic_strengthening !== true ||
    typeof value.requires_full_regression !== "boolean" ||
    typeof value.requires_real_e2e !== "boolean" ||
    typeof value.digest !== "string" ||
    !/^sha256:[0-9a-f]{64}$/u.test(value.digest)
  ) {
    return null;
  }

  const declaredRepositoryEffects = stringList(value.declared.repository_effects);
  const declaredExternalEffects = stringList(value.declared.external_effects);
  const observedRepositoryEffects = stringList(value.observed.repository_effects);
  const observedExternalEffects = stringList(value.observed.external_effects);
  const changedComponents = stringList(value.observed.changed_components);
  const changedFiles = stringList(value.observed.changed_files);
  const selectedTestFiles = stringList(value.selector.selected_test_files);
  const selectedChecks = stringList(value.selected_checks);
  const escalationReasons = stringList(value.escalation_reasons);
  if (
    declaredRepositoryEffects === null ||
    declaredRepositoryEffects.some((effect) => !REPOSITORY_EFFECTS.has(effect)) ||
    declaredExternalEffects === null ||
    declaredExternalEffects.some((effect) => !EXTERNAL_EFFECTS.has(effect)) ||
    observedRepositoryEffects === null ||
    observedRepositoryEffects.some((effect) => !REPOSITORY_EFFECTS.has(effect)) ||
    observedExternalEffects === null ||
    observedExternalEffects.some((effect) => !EXTERNAL_EFFECTS.has(effect)) ||
    changedComponents === null ||
    changedFiles === null ||
    selectedTestFiles === null ||
    !selectedChecks?.length ||
    escalationReasons === null ||
    typeof value.selector.kind !== "string" ||
    !value.selector.kind.trim() ||
    typeof value.selector.reason !== "string" ||
    !value.selector.reason.trim()
  ) {
    return null;
  }

  const input = {
    phase: value.phase as "task" | "local" | "pr" | "release",
    changedFiles,
    declaredRepositoryEffects: declaredRepositoryEffects as NonNullable<
      TaskData["execution_contract"]
    >["declaration"]["repository_effects"],
    declaredExternalEffects: declaredExternalEffects as NonNullable<
      TaskData["execution_contract"]
    >["declaration"]["external_effects"],
    observedRepositoryEffects: observedRepositoryEffects as NonNullable<
      TaskData["execution_contract"]
    >["observed"]["repository_effects"],
    observedExternalEffects: observedExternalEffects as NonNullable<
      TaskData["execution_contract"]
    >["observed"]["external_effects"],
    changedComponents,
    selectorKind: value.selector.kind,
    selectorReason: value.selector.reason,
    selectedTestFiles,
  };
  let computed;
  let executionGroups: string[] | null = null;
  if (value.schema_version === 1) {
    computed = computeLegacyVerificationContractKernel(input);
  } else {
    const risk = isRecord(value.declared.risk) ? value.declared.risk : null;
    const declaredComponents = stringList(value.declared.components);
    const evidenceRequirements = stringList(value.declared.evidence_requirements);
    executionGroups = stringList(value.execution_groups);
    const selectorBuckets = stringList(value.selector.buckets);
    const selectorLintTargets = stringList(value.selector.lint_targets);
    if (
      !risk ||
      declaredComponents === null ||
      !evidenceRequirements?.length ||
      !executionGroups?.length ||
      selectorBuckets === null ||
      selectorLintTargets === null ||
      !["bounded", "material"].includes(String(risk.requirements_uncertainty)) ||
      !["bounded", "material"].includes(String(risk.implementation_uncertainty)) ||
      !["reversible", "recovery_required", "irreversible"].includes(String(risk.reversibility)) ||
      typeof value.selector.execution_mode !== "string" ||
      (value.selector.bucket !== null && typeof value.selector.bucket !== "string") ||
      (value.selector.vitest_pool !== "threads" && value.selector.vitest_pool !== "forks") ||
      typeof value.selector.run_cli_docs_check !== "boolean"
    ) {
      return null;
    }
    computed = computeVerificationContractKernel({
      ...input,
      declaredComponents,
      requirementsUncertainty: risk.requirements_uncertainty as "bounded" | "material",
      implementationUncertainty: risk.implementation_uncertainty as "bounded" | "material",
      reversibility: risk.reversibility as "reversible" | "recovery_required" | "irreversible",
      evidenceRequirements,
      selectorExecutionMode: value.selector.execution_mode,
      selectorBucket: value.selector.bucket,
      selectorBuckets,
      selectorLintTargets,
      selectorVitestPool: value.selector.vitest_pool,
      selectorRunCliDocsCheck: value.selector.run_cli_docs_check,
    });
  }

  if (
    computed.digest !== value.digest ||
    JSON.stringify(computed.selected_checks) !== JSON.stringify(selectedChecks) ||
    ("execution_groups" in computed &&
      JSON.stringify(computed.execution_groups) !== JSON.stringify(executionGroups)) ||
    JSON.stringify(computed.escalation_reasons) !== JSON.stringify(escalationReasons) ||
    computed.requires_full_regression !== value.requires_full_regression ||
    computed.requires_real_e2e !== value.requires_real_e2e
  ) {
    return null;
  }
  const { kind: _kernelKind, ...persisted } = computed as typeof computed & {
    kind: "verification_contract";
  };
  return persisted;
}
