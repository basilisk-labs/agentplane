import type { TaskExternalEffect, TaskRepositoryEffect } from "./task-store.js";

export type VerificationContractPhase = "task" | "local" | "pr" | "release";
export type VerificationContractKernelInput = {
  phase?: VerificationContractPhase;
  changedFiles?: readonly string[];
  declaredRepositoryEffects?: readonly TaskRepositoryEffect[];
  declaredExternalEffects?: readonly TaskExternalEffect[];
  observedRepositoryEffects?: readonly TaskRepositoryEffect[];
  observedExternalEffects?: readonly TaskExternalEffect[];
  changedComponents?: readonly string[];
  selectorKind?: string;
  selectorReason?: string;
  selectedTestFiles?: readonly string[];
  unknownPaths?: readonly string[];
};
export type VerificationContractKernelResult = {
  schema_version: 1;
  kind: "verification_contract";
  source: "execution_contract";
  phase: VerificationContractPhase;
  declared: {
    repository_effects: TaskRepositoryEffect[];
    external_effects: TaskExternalEffect[];
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
  selector: { kind: string; reason: string; selected_test_files: string[] };
  selected_checks: string[];
  escalation_reasons: string[];
  requires_full_regression: boolean;
  requires_real_e2e: boolean;
  digest: `sha256:${string}`;
};

export function repositoryEffectsForPath(pathValue: string): TaskRepositoryEffect[];
export function componentForVerificationPath(pathValue: string): string;
export function isCentralVerificationPath(pathValue: string): boolean;
export function computeVerificationContractKernel(
  input?: VerificationContractKernelInput,
): VerificationContractKernelResult;
