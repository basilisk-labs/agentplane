import type {
  TaskExternalEffect,
  TaskRepositoryEffect,
  TaskVerificationContract,
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
export type VerificationContractKernelResult = TaskVerificationContract & {
  kind: "verification_contract";
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
