import { createHash } from "node:crypto";
import { taskKernel } from "@agentplaneorg/core/tasks";
import type { TaskBackend } from "../../backends/task-backend.js";
import type { KernelBackendAdapter } from "./kernel-backend-adapter.js";

import { projectKernelTask } from "./kernel-projector.js";
import {
  readKernelValidation,
  readKernelReview,
  readKernelEffectObservation,
  type KernelEvidenceBinding,
} from "./kernel-observations.js";

export type ObservationReplayInput =
  | {
      kind: "validation";
      raw: unknown;
      binding: KernelEvidenceBinding;
      check: taskKernel.ValidationIdentity;
    }
  | { kind: "review"; raw: unknown; binding: KernelEvidenceBinding }
  | {
      kind: "provider";
      raw: unknown;
      aggregate: taskKernel.TaskAggregate;
      repository_fingerprint: taskKernel.Sha256Digest;
    };

export function observeKernelEvidenceReplay(input: ObservationReplayInput) {
  switch (input.kind) {
    case "validation": {
      return readKernelValidation(input.raw, input.binding, input.check);
    }
    case "review": {
      return readKernelReview(input.raw, input.binding);
    }
    case "provider": {
      return readKernelEffectObservation(input.raw, input.aggregate, input.repository_fingerprint);
    }
  }
}

export type ReplayIdentity = Readonly<{
  fixture_id: string;
  source_digest: taskKernel.Sha256Digest;
  implementation_anchor: string;
  reproduction_command: string;
}>;

/** Compare actual read surfaces. No write or provider capability is accepted by this boundary. */
export async function compareKernelReadPaths(
  legacy: Pick<TaskBackend, "getTask">,
  canonical: Pick<KernelBackendAdapter, "read" | "nextAction">,
  taskId: string,
  repositoryFingerprint: taskKernel.Sha256Digest,
  identity: Omit<ReplayIdentity, "source_digest">,
) {
  const legacyTask = await legacy.getTask(taskId);
  const canonicalRead = await canonical.read(taskId);
  const sourceBytes = JSON.stringify(legacyTask);
  const expected = legacyTask
    ? {
        task_id: legacyTask.id,
        storage_revision: legacyTask.revision ?? null,
        status: legacyTask.status,
      }
    : { kind: "missing" };
  const actual =
    canonicalRead.kind === "canonical"
      ? {
          task_id: canonicalRead.record.aggregate.id,
          storage_revision: canonicalRead.task.revision ?? null,
          status: projectKernelTask(canonicalRead.record.aggregate).status,
        }
      : canonicalRead.kind === "archived"
        ? {
            task_id: canonicalRead.archive.task_id,
            storage_revision: canonicalRead.task.revision ?? null,
            status: "DONE",
          }
        : { kind: canonicalRead.kind };
  return {
    source_bytes: sourceBytes,
    comparison_scope: ["task_id", "storage_revision", "status"],
    comparison: compareReplayObservations(
      { ...identity, source_digest: replayBytesDigest(sourceBytes) },
      expected,
      actual,
    ),
    next_action: await canonical.nextAction(taskId, repositoryFingerprint),
  };
}

export function replayBytesDigest(bytes: string): taskKernel.Sha256Digest {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** Compare observed values only. This boundary has no backend or provider capability. */
export function compareReplayObservations(
  identity: ReplayIdentity,
  expected: unknown,
  actual: unknown,
) {
  const field = firstDifference(expected, actual, "$", 0);
  return {
    ...identity,
    matched: field === null,
    expected_digest: taskKernel.kernelDigest(expected),
    actual_digest: taskKernel.kernelDigest(actual),
    first_divergent_field: field,
  };
}

function firstDifference(a: unknown, b: unknown, field: string, depth: number): string | null {
  if (Object.is(a, b)) return null;
  if (depth > 128) return field;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return field;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (i >= a.length || i >= b.length) return `${field}[${i}]`;
      const difference = firstDifference(a[i], b[i], `${field}[${i}]`, depth + 1);
      if (difference !== null) return difference;
    }
    return null;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const left = a as Record<string, unknown>;
    const right = b as Record<string, unknown>;
    for (const key of [...new Set([...Object.keys(left), ...Object.keys(right)])].toSorted()) {
      const next = `${field}[${JSON.stringify(key)}]`;
      if (!Object.hasOwn(left, key) || !Object.hasOwn(right, key)) return next;
      const difference = firstDifference(left[key], right[key], next, depth + 1);
      if (difference !== null) return difference;
    }
    return null;
  }
  return field;
}

/** Include events and receipts, not just final status. Rejection preserves the input state. */
export function observeKernelReplay(input: taskKernel.KernelInput) {
  const result = taskKernel.reduceTaskCommand(input);
  const aggregate = result.kind === "accepted" ? result.aggregate : input.aggregate;
  return {
    outcome: result.kind,
    rejection: result.kind === "rejected" ? result : null,
    events: result.kind === "accepted" ? result.events : [],
    receipts: result.kind === "accepted" ? result.receipts : [],
    aggregate_digest: taskKernel.kernelDigest(aggregate),
    projection: projectKernelTask(aggregate),
    effect_states: aggregate.effects.map(({ id, state }) => ({ id, state })),
  };
}

export type KernelReplayFixture = Readonly<{
  identity: ReplayIdentity;
  family: string;
  source_bytes: string;
  expected: ReturnType<typeof observeKernelReplay>;
}>;

/** Frozen fixture bytes are trusted test inputs, never production Task authority. */
export function replayKernelFixture(fixture: KernelReplayFixture) {
  const actualDigest = replayBytesDigest(fixture.source_bytes);
  if (actualDigest !== fixture.identity.source_digest) {
    return compareReplayObservations(
      fixture.identity,
      { source_digest: fixture.identity.source_digest },
      { source_digest: actualDigest },
    );
  }
  const input = JSON.parse(fixture.source_bytes) as taskKernel.KernelInput;
  return compareReplayObservations(fixture.identity, fixture.expected, observeKernelReplay(input));
}
