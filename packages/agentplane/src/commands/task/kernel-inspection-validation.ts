import path from "node:path";
import { taskKernel as k, type KernelEpisodeBinding } from "@agentplaneorg/core/tasks";

import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import {
  directTaskVerificationInputIdentity,
  runDirectTaskVerification,
  type DirectTaskVerificationInputIdentity,
  type DirectTaskVerificationResult,
} from "./direct-task-verification.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import {
  readKernelRepositoryEvidence,
  type KernelRepositoryEvidence,
} from "./kernel-repository-coordinator.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import {
  isInfrastructureVerification,
  prepareInfrastructureVerificationForCheckout,
} from "./verification-infrastructure.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;
export type KernelValidationEvidence = {
  task_id: string;
  work_item_id: string;
  attempt: number;
  contract_digest: string;
  repository_fingerprint: string;
  result_digest: string;
  review_digest: string | null;
  native_evidence_digest: k.Sha256Digest;
  status: k.ValidationRecord["status"];
  checks: DirectTaskVerificationResult;
  repository_evidence: KernelRepositoryEvidence | null;
};

type KernelNativeValidationInput = Readonly<{
  schema_version: 1;
  kind: "kernel_native_validation_input";
  task_id: string;
  work_item_id: string;
  result_digest: string;
  repository_fingerprint: string;
  repository_evidence_digest: string | null;
  verification: DirectTaskVerificationInputIdentity;
}>;

export type KernelNativeValidationEvidence = Readonly<{
  schema_version: 1;
  kind: "kernel_native_validation";
  input_digest: k.Sha256Digest;
  input: KernelNativeValidationInput;
  checks: DirectTaskVerificationResult;
  repository_evidence: KernelRepositoryEvidence | null;
}>;

export type InspectionBinding = Extract<KernelEpisodeBinding, { phase: "inspection" }>;

type ResolvedRepositoryEvidence = Readonly<{
  directory: string;
  evidence: KernelRepositoryEvidence;
}>;

export function kernelCheckReviewDisposition(
  checks: DirectTaskVerificationResult,
): "review" | "rework" | "blocked" | "retry" {
  if (isInfrastructureVerification(checks)) return "retry";
  if (checks.status === "passed") return "review";
  return checks.status === "failed" ? "rework" : "blocked";
}

export async function resolveInspectionRepositoryEvidence(
  command: CommandContext,
  record: KernelRecord,
  workItemId: string,
  resultDirectory: string,
): Promise<ResolvedRepositoryEvidence | null> {
  const head = await readDirectTaskHead(command.resolvedProject.gitRoot);
  const currentOrderId = `sha256:${path.basename(resultDirectory)}`;
  let current: KernelRepositoryEvidence | null = null;
  try {
    current = await readKernelRepositoryEvidence(resultDirectory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (current) {
    if (
      current.task_id !== record.aggregate.id ||
      current.work_item_id !== workItemId ||
      current.work_order_id !== currentOrderId ||
      path.resolve(current.checkout) !== path.resolve(command.resolvedProject.gitRoot) ||
      current.evaluator_target !== current.implementation_commit ||
      head !== current.implementation_commit
    ) {
      throw new Error("Canonical evaluator target differs from repository evidence");
    }
    return { directory: resultDirectory, evidence: current };
  }

  for (const mutationId of Object.keys(record.aggregate.mutation_receipts)
    .filter((id) => /^result:sha256:[a-f0-9]{64}$/u.test(id))
    .toReversed()) {
    const directory = await kernelExchangeDirectory(
      command,
      record.aggregate.id,
      mutationId.slice("result:".length),
    );
    if (directory === resultDirectory) continue;
    let candidate: KernelRepositoryEvidence;
    try {
      candidate = await readKernelRepositoryEvidence(directory);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    if (candidate.task_id !== record.aggregate.id || candidate.work_item_id !== workItemId)
      continue;
    if (
      candidate.work_order_id !== `sha256:${path.basename(directory)}` ||
      candidate.task_revision > record.aggregate.revision ||
      path.resolve(candidate.checkout) !== path.resolve(command.resolvedProject.gitRoot) ||
      candidate.evaluator_target !== candidate.implementation_commit
    ) {
      throw new Error("Canonical evaluator target differs from retained repository evidence");
    }
    if (candidate.implementation_commit === head) {
      return { directory, evidence: candidate };
    }
  }
  return null;
}

export function nativeValidationInput(opts: {
  command: CommandContext;
  binding: InspectionBinding;
  commands: readonly string[];
  repositoryEvidence: KernelRepositoryEvidence | null;
}): { input: KernelNativeValidationInput; digest: k.Sha256Digest; path: string } {
  const input: KernelNativeValidationInput = {
    schema_version: 1,
    kind: "kernel_native_validation_input",
    task_id: opts.binding.task_id,
    work_item_id: opts.binding.work_item_id,
    result_digest: opts.binding.result_digest,
    repository_fingerprint: opts.binding.repository_fingerprint,
    repository_evidence_digest: opts.repositoryEvidence?.digest ?? null,
    verification: directTaskVerificationInputIdentity({
      cwd: opts.command.resolvedProject.gitRoot,
      commands: opts.commands,
    }),
  };
  const digest = k.kernelDigest(input);
  return {
    input,
    digest,
    path: `native-validation-${digest.slice(7)}.json`,
  };
}

async function readNativeValidation(
  directory: string,
  name: string,
): Promise<KernelNativeValidationEvidence | null> {
  try {
    return JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, name),
        "canonical native validation",
      ),
    ) as KernelNativeValidationEvidence;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export function requireNativeValidationEvidence(opts: {
  evidence: KernelNativeValidationEvidence;
  input: KernelNativeValidationInput;
  digest: k.Sha256Digest;
}) {
  if (
    opts.evidence.schema_version !== 1 ||
    opts.evidence.kind !== "kernel_native_validation" ||
    opts.evidence.input_digest !== opts.digest ||
    k.kernelDigest(opts.evidence.input) !== opts.digest ||
    k.kernelDigest(opts.evidence.input) !== k.kernelDigest(opts.input) ||
    opts.evidence.repository_evidence?.digest !==
      (opts.input.repository_evidence_digest ?? undefined)
  ) {
    throw new Error("Canonical native validation input identity mismatch");
  }
  return opts.evidence;
}

export async function runKernelNativeValidation(opts: {
  command: CommandContext;
  runtime: Runtime;
  binding: InspectionBinding;
  commands: readonly string[];
  directory: string;
  repositoryEvidence: KernelRepositoryEvidence | null;
}): Promise<
  | { kind: "observed"; evidence: KernelNativeValidationEvidence; path: string }
  | { kind: "retry"; reason: string | null }
> {
  const identity = nativeValidationInput(opts);
  const retained = await readNativeValidation(opts.directory, identity.path);
  if (retained) {
    return {
      kind: "observed",
      evidence: requireNativeValidationEvidence({
        evidence: retained,
        input: identity.input,
        digest: identity.digest,
      }),
      path: path.join(opts.directory, identity.path),
    };
  }
  const implementationCommit =
    opts.repositoryEvidence?.implementation_commit ??
    (await readDirectTaskHead(opts.command.resolvedProject.gitRoot));
  if (!implementationCommit)
    throw new Error("Canonical native validation requires an implementation commit");
  const retainInfrastructure = await prepareInfrastructureVerificationForCheckout({
    command: opts.command,
    task_id: opts.binding.task_id,
    implementation_commit: implementationCommit,
    verification_scope: opts.binding.work_item_id,
    identity: identity.input,
    checkout: opts.command.resolvedProject.gitRoot,
  });
  const checks = await runDirectTaskVerification({
    command: opts.command,
    task: { verify: [] },
    task_id: opts.binding.task_id,
    cwd: opts.command.resolvedProject.gitRoot,
    additional_only: true,
    additional_commands: opts.commands.map((check) => ({ command: check })),
    allow_empty: true,
  });
  if (kernelCheckReviewDisposition(checks) === "retry") {
    await retainInfrastructure({
      status: checks.status,
      checks: checks.checks,
      reason: checks.reason,
    });
    return { kind: "retry", reason: checks.reason };
  }
  const observed = await opts.runtime.observe();
  if (observed.fingerprint !== opts.binding.repository_fingerprint)
    throw new Error("Canonical repository changed during native validation");
  if (
    opts.repositoryEvidence &&
    (await readDirectTaskHead(opts.command.resolvedProject.gitRoot)) !==
      opts.repositoryEvidence.implementation_commit
  )
    throw new Error("Canonical evaluator target changed during native validation");
  const evidence: KernelNativeValidationEvidence = {
    schema_version: 1,
    kind: "kernel_native_validation",
    input_digest: identity.digest,
    input: identity.input,
    checks,
    repository_evidence: opts.repositoryEvidence,
  };
  await writeKernelArtifact(opts.directory, identity.path, evidence);
  return { kind: "observed", evidence, path: path.join(opts.directory, identity.path) };
}

export function validationRecord(opts: {
  binding: InspectionBinding;
  contractCommands: readonly string[];
  native: KernelNativeValidationEvidence;
  reviewDigest: k.Sha256Digest | null;
  status: k.ValidationRecord["status"];
  observedAt: string;
}): k.ValidationRecord {
  return {
    status: opts.status,
    identity: {
      implementation_identity: opts.binding.result_digest as k.Sha256Digest,
      check_id:
        opts.reviewDigest === null
          ? "canonical-native-checks"
          : "canonical-contract-and-inspection",
      command_digest: k.kernelDigest(opts.contractCommands),
      toolchain_digest: k.kernelDigest(
        opts.native.input.verification.runtimes.map((runtime) => runtime.toolchain_digest),
      ),
      environment_digest: k.kernelDigest({
        repository: opts.binding.repository_fingerprint,
        verification: opts.native.input.verification,
      }),
    },
    evidence_digests: [
      k.kernelDigest(opts.native),
      ...(opts.reviewDigest === null ? [] : [opts.reviewDigest]),
    ],
    observed_at: opts.observedAt,
  };
}

export async function recordKernelValidation(opts: {
  runtime: Runtime;
  directory: string;
  binding: InspectionBinding;
  evidence: KernelValidationEvidence;
  validation: k.ValidationRecord;
  mutationId: string;
}) {
  await writeKernelArtifact(opts.directory, "validation.json", opts.evidence);
  const inputPath = path.join(opts.directory, "validation-command.json");
  let input: KernelCommandInput;
  try {
    input = JSON.parse(
      await readStableRegularTextNoFollow(inputPath, "canonical validation command"),
    ) as KernelCommandInput;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    input = await opts.runtime.input(
      {
        kind: "record_work_item_validation",
        work_item_id: opts.binding.work_item_id,
        validation: opts.validation,
      },
      opts.mutationId,
    );
    await writeKernelArtifact(opts.directory, "validation-command.json", input);
  }
  requireKernelCommit(await opts.runtime.lifecycle.apply(input));
}

export async function resolveRecordedNativeValidation(
  runtime: Runtime,
  binding: InspectionBinding,
  validation: k.ValidationRecord,
) {
  if (validation.status === "BLOCKED")
    return { kind: "human_required" as const, reason: "canonical_validation_infrastructure" };
  requireKernelCommit(
    await runtime.lifecycle.apply(
      await runtime.input(
        {
          kind: "transition_work_item",
          action: validation.status === "PASSED" ? "complete" : "rework",
          work_item_id: binding.work_item_id,
          claim_id: binding.claim_id,
        },
        `validation-resolution:${k.kernelDigest(validation)}`,
      ),
    ),
  );
  return null;
}
