import type {
  VerificationContractKernelInput,
  VerificationContractKernelResult,
} from "../../packages/core/src/tasks/verification-contract.js";

export function computeVerificationContract(
  input?: VerificationContractKernelInput,
): VerificationContractKernelResult;

export function mergeVerificationContracts(
  previous: VerificationContractKernelResult | null,
  next: VerificationContractKernelResult,
): VerificationContractKernelResult;
