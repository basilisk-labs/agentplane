import { rm } from "node:fs/promises";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskBackend } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";
import { projectKernelTask } from "./kernel-projector.js";
import {
  compareKernelReadPaths,
  compareReplayObservations,
  replayBytesDigest,
  type ReplayIdentity,
} from "./kernel-replay.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
  type ReplayTaskClass,
} from "./kernel-replay-journey.test-fixtures.js";
import { kernelReplayStorage, type ReplayBackendKind } from "./kernel-replay-storage.testkit.js";

/** One read-only observation owner for persistence, effect, evidence and crash captures. */
export async function observeKernelPersistenceState(
  backend: TaskBackend,
  taskId: string,
  repositoryIdentity: k.Sha256Digest,
  fingerprint: k.Sha256Digest,
  label: string,
  identity: Omit<ReplayIdentity, "source_digest">,
) {
  const adapter = new KernelBackendAdapter(backend, repositoryIdentity);
  const read = await adapter.read(taskId);
  if (read.kind !== "canonical") throw new Error(`${label}: canonical record missing`);
  const comparison = await compareKernelReadPaths(backend, adapter, taskId, fingerprint, identity);
  if (!comparison.comparison.matched)
    throw new Error(`${label}: ${JSON.stringify(comparison.comparison)}`);
  return {
    read,
    observation: {
      label,
      events: read.record.events,
      receipts: read.record.aggregate.mutation_receipts,
      aggregate_digest: k.kernelDigest(read.record.aggregate),
      projection_digest: k.kernelDigest(projectKernelTask(read.record.aggregate)),
      effect_states: read.record.aggregate.effects.map(({ id, state }) => ({ id, state })),
      next_action: comparison.next_action,
      read_comparison: {
        scope: comparison.comparison_scope,
        expected_digest: comparison.comparison.expected_digest,
        actual_digest: comparison.comparison.actual_digest,
        first_divergent_field: comparison.comparison.first_divergent_field,
      },
    },
  };
}

/** Capture from real storage clients. The caller must supply an independently checked Git anchor. */
export async function captureKernelPersistenceFixture(
  backendKind: ReplayBackendKind,
  taskClass: ReplayTaskClass,
  implementationAnchor: string,
  journey = kernelReplayJourney(taskClass),
) {
  if (!/^[a-f0-9]{40}$/u.test(implementationAnchor)) throw new Error("Exact anchor required");
  const roots: string[] = [];
  try {
    const store = await kernelReplayStorage(backendKind, roots);
    const sourceBytes = JSON.stringify(journey);
    const identity = {
      fixture_id: `${backendKind}-${taskClass}`,
      source_digest: replayBytesDigest(sourceBytes),
      implementation_anchor: implementationAnchor,
      reproduction_command: `node scripts/bench/qualify-kernel-replay.mjs ${implementationAnchor}`,
    };
    const observations = [];
    for (const [index, step] of journey.steps.entries()) {
      const adapter = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
      const result =
        index === 0
          ? await adapter.create(journey.task, step.input)
          : await adapter.execute(step.input);
      if (result.kind !== "committed")
        throw new Error(`${identity.fixture_id}/${step.label}: ${JSON.stringify(result)}`);
      const { read, observation } = await observeKernelPersistenceState(
        store.restart(),
        journey.task.id,
        replayRepositoryIdentity,
        step.input.repository_fingerprint,
        step.label,
        identity,
      );
      if (
        read.record.digest !== result.record.digest ||
        observation.next_action.reason_code !== step.expected_next_reason
      )
        throw new Error(`${identity.fixture_id}/${step.label}: restart or route mismatch`);
      observations.push(observation);
    }
    return {
      identity,
      backend: backendKind,
      task_class: taskClass,
      source_bytes: sourceBytes,
      expected: observations,
    };
  } finally {
    await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  }
}

export type KernelPersistenceFixture = Awaited<ReturnType<typeof captureKernelPersistenceFixture>>;

/** Replay independently captured inputs. Never generate an expectation from the current code. */
export async function replayKernelPersistenceFixture(fixture: KernelPersistenceFixture) {
  const digest = replayBytesDigest(fixture.source_bytes);
  if (digest !== fixture.identity.source_digest) {
    return compareReplayObservations(
      fixture.identity,
      { source_digest: fixture.identity.source_digest },
      { source_digest: digest },
    );
  }
  const journey = JSON.parse(fixture.source_bytes) as ReturnType<typeof kernelReplayJourney>;
  const actual = await captureKernelPersistenceFixture(
    fixture.backend,
    fixture.task_class,
    fixture.identity.implementation_anchor,
    journey,
  );
  return compareReplayObservations(fixture.identity, fixture.expected, actual.expected);
}
