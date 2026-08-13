import type {
  TaskExternalEffect,
  TaskRepositoryEffect,
  TaskVerificationContractV1,
} from "./task-store.js";
import * as kernel from "./verification-contract-kernel.js";

export type VerificationContractPhase = "task" | "local" | "pr" | "release";
export type VerificationContractKernelInput = {
  phase?: VerificationContractPhase;
  changedFiles?: readonly string[];
  declaredRepositoryEffects?: readonly TaskRepositoryEffect[];
  declaredExternalEffects?: readonly TaskExternalEffect[];
  observedRepositoryEffects?: readonly TaskRepositoryEffect[];
  observedExternalEffects?: readonly TaskExternalEffect[];
  changedComponents?: readonly string[];
  declaredComponents?: readonly string[];
  requirementsUncertainty?: "bounded" | "material";
  implementationUncertainty?: "bounded" | "material";
  reversibility?: "reversible" | "recovery_required" | "irreversible";
  evidenceRequirements?: readonly string[];
  selectorKind?: string;
  selectorReason?: string;
  selectorExecutionMode?: string;
  selectorBucket?: string | null;
  selectorBuckets?: readonly string[];
  selectorLintTargets?: readonly string[];
  selectorVitestPool?: "threads" | "forks";
  selectorRunCliDocsCheck?: boolean;
  selectedTestFiles?: readonly string[];
  unknownPaths?: readonly string[];
};
export type VerificationContractKernelResult = {
  schema_version: 2;
  kind: "verification_contract";
  source: "execution_contract";
  phase: VerificationContractPhase;
  declared: {
    repository_effects: TaskRepositoryEffect[];
    external_effects: TaskExternalEffect[];
    components: string[];
    risk: {
      requirements_uncertainty: "bounded" | "material";
      implementation_uncertainty: "bounded" | "material";
      reversibility: "reversible" | "recovery_required" | "irreversible";
    };
    evidence_requirements: string[];
  };
  observed: {
    repository_effects: TaskRepositoryEffect[];
    external_effects: TaskExternalEffect[];
    changed_components: string[];
    changed_files: string[];
  };
  policy_floor: {
    pr_full_regression: true;
    unknown_or_central_full_regression: true;
    monotonic_strengthening: true;
  };
  selector: {
    kind: string;
    reason: string;
    execution_mode: string;
    bucket: string | null;
    buckets: string[];
    lint_targets: string[];
    vitest_pool: "threads" | "forks";
    run_cli_docs_check: boolean;
    selected_test_files: string[];
  };
  selected_checks: string[];
  execution_groups: string[];
  escalation_reasons: string[];
  requires_full_regression: boolean;
  requires_real_e2e: boolean;
  digest: `sha256:${string}`;
};

export function repositoryEffectsForPath(pathValue: string): TaskRepositoryEffect[] {
  return kernel.repositoryEffectsForPath(pathValue);
}

export function componentForVerificationPath(pathValue: string): string {
  return kernel.componentForVerificationPath(pathValue);
}

export function isCentralVerificationPath(pathValue: string): boolean {
  return kernel.isCentralVerificationPath(pathValue);
}

export function computeVerificationContractKernel(
  input: VerificationContractKernelInput = {},
): VerificationContractKernelResult {
  return kernel.computeVerificationContractKernel(input) as VerificationContractKernelResult;
}

export function computeLegacyVerificationContractKernel(
  input: Omit<
    VerificationContractKernelInput,
    | "declaredComponents"
    | "requirementsUncertainty"
    | "implementationUncertainty"
    | "reversibility"
    | "evidenceRequirements"
    | "selectorExecutionMode"
    | "selectorBucket"
    | "selectorBuckets"
    | "selectorLintTargets"
    | "selectorVitestPool"
    | "selectorRunCliDocsCheck"
  > = {},
): TaskVerificationContractV1 {
  return kernel.computeLegacyVerificationContractKernel(input);
}
