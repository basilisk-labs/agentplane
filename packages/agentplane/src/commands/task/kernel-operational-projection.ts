import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { KernelRepositoryEvidence } from "./kernel-repository-coordinator.js";

export const KERNEL_OPERATIONAL_PROJECTION = "agentplane.kernel_operational_projection";

/** Reset derived branch evidence for rework without reopening the completed Kernel aggregate. */
export async function projectKernelImplementationRework(opts: {
  command: CommandContext;
  task_id: string;
  implementation_commit: string;
  projected_at: string;
}): Promise<TaskData> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  if (!task?.extensions || !Object.hasOwn(task.extensions, TASK_KERNEL_EXTENSION)) {
    throw new Error("Canonical implementation rework requires a Task Kernel record");
  }
  if (
    task.commit?.hash === opts.implementation_commit &&
    task.quality_review?.state === "pending"
  ) {
    return task;
  }
  const revision = task.revision ?? 0;
  await opts.command.taskBackend.writeTask(
    {
      ...task,
      revision: revision + 1,
      commit: {
        hash: opts.implementation_commit,
        message: "AgentPlane-owned canonical implementation rework commit",
      },
      verification: {
        state: "pending",
        attempts: task.verification?.attempts ?? 0,
        updated_at: opts.projected_at,
        updated_by: "SUPERVISOR",
        note: "Canonical implementation rework is ready for fresh verification.",
      },
      quality_review: {
        state: "pending",
        updated_at: opts.projected_at,
        updated_by: "SUPERVISOR",
        note: "Canonical implementation rework requires a fresh EVALUATOR review.",
        evaluated_sha: null,
        review_identity_digest: null,
        evidence_refs: [],
        findings: [],
      },
    },
    { expectedRevision: revision },
  );
  const observed = await opts.command.taskBackend.getTask(opts.task_id);
  if (
    !observed ||
    observed.commit?.hash !== opts.implementation_commit ||
    observed.quality_review?.state !== "pending" ||
    JSON.stringify(observed.extensions?.[TASK_KERNEL_EXTENSION]) !==
      JSON.stringify(task.extensions[TASK_KERNEL_EXTENSION])
  ) {
    throw new Error("Canonical implementation rework projection was not observed");
  }
  return observed;
}

function projectedVerification(
  verification: TaskData["verification"],
  fallback: NonNullable<TaskData["verification"]>,
): NonNullable<TaskData["verification"]> {
  return verification?.state === "ok" ? verification : fallback;
}

type Projection = Readonly<{
  schema_version: 1;
  source: "task_kernel";
  work_order_id: string;
  implementation_commit: string;
  implementation_tree: string;
  verification_evidence_digest: k.Sha256Digest;
  review_identity_digest: k.Sha256Digest;
  evidence_refs: readonly string[];
  findings: readonly string[];
  projected_at: string;
  digest: k.Sha256Digest;
}>;

/**
 * Compatibility fields are evidence projections only. The Task Kernel record remains the sole
 * lifecycle and authority source; mature PR/integration gates may consume these fields without
 * treating them as command authority.
 */
export async function projectKernelOperationalEvidence(opts: {
  command: CommandContext;
  task_id: string;
  repository_evidence: KernelRepositoryEvidence;
  verification_evidence_digest: k.Sha256Digest;
  review_identity_digest: k.Sha256Digest;
  evidence_refs: readonly string[];
  findings: readonly string[];
  projected_at: string;
}): Promise<void> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  if (!task?.extensions || !Object.hasOwn(task.extensions, TASK_KERNEL_EXTENSION)) {
    throw new Error("Canonical operational evidence requires a Task Kernel record");
  }
  if (opts.repository_evidence.task_id !== opts.task_id) {
    throw new Error("Canonical operational evidence belongs to another task");
  }
  const contents = {
    schema_version: 1 as const,
    source: "task_kernel" as const,
    work_order_id: opts.repository_evidence.work_order_id,
    implementation_commit: opts.repository_evidence.implementation_commit,
    implementation_tree: opts.repository_evidence.implementation_tree,
    verification_evidence_digest: opts.verification_evidence_digest,
    review_identity_digest: opts.review_identity_digest,
    evidence_refs: [...opts.evidence_refs],
    findings: [...opts.findings],
    projected_at: opts.projected_at,
  };
  const projection: Projection = { ...contents, digest: k.kernelDigest(contents) };
  const existing = task.extensions[KERNEL_OPERATIONAL_PROJECTION] as
    | Partial<Projection>
    | undefined;
  if (existing?.digest === projection.digest) return;
  const revision = task.revision ?? 0;
  await opts.command.taskBackend.writeTask(
    {
      ...task,
      revision: revision + 1,
      plan_approval: {
        state: "approved",
        updated_at: opts.projected_at,
        updated_by: "USER",
        note: "Projected from the approved canonical Task Kernel plan.",
      },
      commit: {
        hash: opts.repository_evidence.implementation_commit,
        message: "AgentPlane-owned canonical implementation commit",
      },
      verification: projectedVerification(task.verification, {
        state: "ok",
        attempts: Math.max(1, task.verification?.attempts ?? 0),
        updated_at: opts.projected_at,
        updated_by: "SUPERVISOR",
        note: `Canonical validation ${opts.verification_evidence_digest}`,
      }),
      quality_review: {
        state: "pass",
        provenance: "evaluator_supplied",
        updated_at: opts.projected_at,
        updated_by: "EVALUATOR",
        note: "Canonical EVALUATOR review passed.",
        evaluated_sha: opts.repository_evidence.evaluator_target,
        review_identity_digest: opts.review_identity_digest,
        evidence_refs: [...opts.evidence_refs],
        findings: [...opts.findings],
      },
      extensions: {
        ...task.extensions,
        [KERNEL_OPERATIONAL_PROJECTION]: projection,
      },
    },
    { expectedRevision: revision },
  );
}

/** Keep non-authoritative evidence stable across later Kernel effect writes. */
export async function ensureKernelOperationalProjectionEvidence(opts: {
  command: CommandContext;
  task_id: string;
  verification_evidence_digest?: k.Sha256Digest;
}): Promise<void> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  const existing = task ? readKernelOperationalProjection(task.extensions) : null;
  if (!task || !existing) {
    throw new Error("Canonical operational projection is unavailable");
  }
  const verificationEvidenceDigest =
    opts.verification_evidence_digest ?? existing.verification_evidence_digest;
  const projectionContents = {
    schema_version: existing.schema_version,
    source: existing.source,
    work_order_id: existing.work_order_id,
    implementation_commit: existing.implementation_commit,
    implementation_tree: existing.implementation_tree,
    verification_evidence_digest: verificationEvidenceDigest,
    review_identity_digest: existing.review_identity_digest,
    evidence_refs: existing.evidence_refs,
    findings: existing.findings,
    projected_at: existing.projected_at,
  };
  const projection: Projection = {
    ...projectionContents,
    digest: k.kernelDigest(projectionContents),
  };
  const fallbackVerification = projectedVerification(task.verification, {
    state: "ok",
    attempts: 1,
    updated_at: existing.projected_at,
    updated_by: "SUPERVISOR",
    note: `Canonical validation ${verificationEvidenceDigest}`,
  });
  if (
    projection.digest === existing.digest &&
    task.verification?.state === fallbackVerification.state
  )
    return;
  const revision = task.revision ?? 0;
  await opts.command.taskBackend.writeTask(
    {
      ...task,
      revision: revision + 1,
      verification: fallbackVerification,
      extensions: {
        ...task.extensions,
        [KERNEL_OPERATIONAL_PROJECTION]: projection,
      },
    },
    { expectedRevision: revision },
  );
}

export function readKernelOperationalProjection(
  extensions: Record<string, unknown> | undefined,
): Projection | null {
  const value = extensions?.[KERNEL_OPERATIONAL_PROJECTION] as Projection | undefined;
  if (value?.schema_version !== 1 || value.source !== "task_kernel") return null;
  const { digest, ...contents } = value;
  return k.kernelDigest(contents) === digest ? value : null;
}
