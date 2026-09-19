import { createHash } from "node:crypto";

import { canonicalizeJson, taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import {
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";

export type NativeTaskIdentity = {
  schema_version: 1;
  kind: "agentplane.native_task_identity";
  task_id: string;
  plan: {
    revision: number;
    digest: `sha256:${string}`;
    approval_state: string;
    approved_digest: `sha256:${string}`;
  };
  policy: { digest: `sha256:${string}` };
  capability: { digest: `sha256:${string}` };
  checks: {
    digest: `sha256:${string}`;
    verification_contract_digest: `sha256:${string}`;
    required_check_ids: string[];
  };
  digest: `sha256:${string}`;
};

export type NativeQualityReviewIdentity = {
  schema_version: 1;
  kind: "agentplane.native_quality_review_identity";
  task_id: string;
  plan_digest: `sha256:${string}`;
  policy_digest: `sha256:${string}`;
  capability_digest: `sha256:${string}`;
  checks_digest: `sha256:${string}`;
  verification_input_digest: `sha256:${string}`;
  acceptance_digest: `sha256:${string}`;
  implementation_sha: string | null;
  digest: `sha256:${string}`;
};

function sha256(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(value)))
    .digest("hex")}`;
}

function isSha256(value: unknown): value is `sha256:${string}` {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/u.test(value);
}

function requiredCheckIds(task: TaskData): string[] {
  return (task.execution_contract?.verification.contract?.selected_checks ?? [])
    .filter((checkId) => checkId !== "hosted_integration")
    .toSorted();
}

function approvedPlanIdentity(task: TaskData) {
  const taskCentric = taskCentricAggregateFromExtensions(task.extensions)?.current_plan;
  if (
    taskCentric?.approval.state === "approved" &&
    isSha256(taskCentric.approval.approved_digest)
  ) {
    return {
      revision: taskCentric.revision,
      digest: taskCentric.digest,
      approval_state: taskCentric.approval.state,
      approved_digest: taskCentric.approval.approved_digest,
    };
  }
  const raw = task.extensions?.[TASK_KERNEL_EXTENSION] as
    | { repository_identity?: unknown }
    | undefined;
  if (!isSha256(raw?.repository_identity)) return null;
  const read = readKernelRecord(task, raw.repository_identity);
  const plan = read.kind === "canonical" ? read.record.aggregate.current_plan : null;
  if (plan?.state !== "APPROVED") return null;
  return {
    revision: plan.revision,
    digest: plan.digest,
    approval_state: "approved" as const,
    approved_digest: plan.digest,
  };
}

/**
 * Resolve the immutable native owners used by current verification and review.
 * A task without an accepted Plan remains a legacy task until the retirement
 * migration creates one; callers must not manufacture a current identity.
 */
export function resolveNativeTaskIdentity(task: TaskData): NativeTaskIdentity | null {
  const plan = approvedPlanIdentity(task);
  const contract = task.execution_contract;
  const verificationContract = contract?.verification.contract;
  const contractDigest = verificationContract?.digest;
  if (
    plan?.approval_state !== "approved" ||
    !isSha256(plan.digest) ||
    plan.approved_digest !== plan.digest ||
    !verificationContract ||
    !isSha256(contractDigest)
  ) {
    return null;
  }

  const policy = {
    digest: sha256({
      route: task.execution_route ?? null,
      reason_codes: contract.reason_codes,
      safety: contract.safety,
      policy_floor: verificationContract.policy_floor,
    }),
  };
  const capability = {
    digest: sha256({
      authority: contract.authority,
      selected_mode: contract.selected_mode,
      repository_mode: contract.repository_mode,
    }),
  };
  const checks = {
    verification_contract_digest: contractDigest,
    required_check_ids: requiredCheckIds(task),
  };
  const identity = {
    schema_version: 1 as const,
    kind: "agentplane.native_task_identity" as const,
    task_id: task.id,
    plan,
    policy,
    capability,
    checks: { ...checks, digest: sha256(checks) },
  };
  return { ...identity, digest: sha256(identity) };
}

export function latestVerificationInputDigest(task: TaskData): `sha256:${string}` | null {
  const doc = typeof task.doc === "string" ? task.doc : "";
  const matches = [...doc.matchAll(/\binput_digest=(sha256:[a-f0-9]{64})\b/gu)];
  const value = matches.at(-1)?.[1];
  return isSha256(value) ? value : null;
}

export function buildNativeQualityReviewIdentity(opts: {
  task: TaskData;
  native_identity?: NativeTaskIdentity | null;
  verification_input_digest: string | null;
  acceptance_criteria: readonly string[];
  implementation_sha: string | null;
}): NativeQualityReviewIdentity | null {
  const nativeIdentity = opts.native_identity ?? resolveNativeTaskIdentity(opts.task);
  if (!nativeIdentity) return null;
  const verificationInputDigest = isSha256(opts.verification_input_digest)
    ? opts.verification_input_digest
    : sha256({ state: "missing" });
  const identity = {
    schema_version: 1 as const,
    kind: "agentplane.native_quality_review_identity" as const,
    task_id: opts.task.id,
    plan_digest: nativeIdentity.plan.digest,
    policy_digest: nativeIdentity.policy.digest,
    capability_digest: nativeIdentity.capability.digest,
    checks_digest: nativeIdentity.checks.digest,
    verification_input_digest: verificationInputDigest,
    acceptance_digest: sha256([...opts.acceptance_criteria]),
    implementation_sha: opts.implementation_sha,
  };
  return { ...identity, digest: sha256(identity) };
}
