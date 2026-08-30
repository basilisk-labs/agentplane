import { rm } from "node:fs/promises";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { KernelBackendAdapter, type KernelCommandInput } from "./kernel-backend-adapter.js";
import { dispatchKernelEffect } from "./kernel-effect-dispatch.js";
import { readKernelEffectObservation } from "./kernel-observations.js";
import { observeKernelPersistenceState } from "./kernel-replay-capture.testkit.js";
import { replayBytesDigest } from "./kernel-replay.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "./kernel-replay-journey.test-fixtures.js";
import {
  kernelReplayStorage,
  replayBackendKinds,
  type ReplayBackendKind,
} from "./kernel-replay-storage.testkit.js";

const effectReplayScenarios = [
  "not-issued",
  "applied",
  "not-applied",
  "timeout-before",
  "timeout-after",
  "uncertain",
  "reconciled",
  "admission-before-write",
  "admission-after-write",
  "admission-unknown-readback",
  "concurrent-start",
] as const;
type Scenario = (typeof effectReplayScenarios)[number];
type Source = {
  backend: ReplayBackendKind;
  scenario: Scenario;
  journey: ReturnType<typeof kernelReplayJourney>;
};

export function kernelEffectReplayCases() {
  const full = kernelReplayJourney("branch_pr");
  const index = full.steps.findIndex((step) => step.input.command.kind === "prepare_effect");
  const journey = { ...full, steps: full.steps.slice(0, index + 1) };
  return replayBackendKinds.flatMap((backend) =>
    effectReplayScenarios
      .filter((scenario) => scenario !== "concurrent-start" || backend === "cloud-fake")
      .map((scenario) => ({
        id: `${backend}-effect-${scenario}`,
        backend,
        scenario,
        source_bytes: JSON.stringify({ backend, scenario, journey } satisfies Source),
      })),
  );
}

/** Run real storage and dispatch boundaries with a counted, explicitly fake provider. */
export async function observeKernelEffectReplay(sourceBytes: string) {
  const source = JSON.parse(sourceBytes) as Source;
  const roots: string[] = [];
  try {
    const store = await kernelReplayStorage(source.backend, roots);
    const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
    const journey = source.journey;
    const prepared = journey.steps.at(-1)!;
    if (prepared.input.command.kind !== "prepare_effect")
      throw new Error("Missing prepared effect");
    const effect = prepared.input.command.effect;
    const fingerprint = prepared.input.repository_fingerprint;
    const identity = {
      fixture_id: `${source.backend}-effect-${source.scenario}`,
      implementation_anchor: "capture-context",
      reproduction_command: "qualified kernel effect replay",
    };
    const observations = [];
    const commands: KernelCommandInput[] = journey.steps.map((step) => step.input);
    async function snapshot(label: string) {
      const captured = await observeKernelPersistenceState(
        store.restart(),
        journey.task.id,
        replayRepositoryIdentity,
        fingerprint,
        label,
        identity,
      );
      return captured.observation;
    }
    for (const [index, step] of journey.steps.entries()) {
      const result =
        index === 0
          ? await adapter.create(journey.task, step.input)
          : await adapter.execute(step.input);
      if (result.kind !== "committed") throw new Error(`${step.label}: ${JSON.stringify(result)}`);
    }
    observations.push(await snapshot("prepared"));
    const start = {
      ...prepared.input,
      mutation_id: "qualified-effect-start",
      command: {
        kind: "begin_effect" as const,
        task_id: journey.task.id,
        effect_id: effect.id,
        expected_task_revision: journey.steps.length,
        expected_state_fingerprint: fingerprint,
      },
    };
    let calls = 0;
    let applications = 0;
    const provider = () => {
      calls++;
      if (!["not-applied", "timeout-before"].includes(source.scenario)) applications++;
      if (["timeout-before", "timeout-after", "uncertain", "reconciled"].includes(source.scenario))
        return Promise.reject(new Error("provider response unavailable"));
      return Promise.resolve({ state: applications ? "APPLIED" : "NOT_APPLIED" });
    };
    const dispatches: { kind: string; reason?: string }[] = [];
    const save = (value: Awaited<ReturnType<typeof dispatchKernelEffect>>) => {
      dispatches.push({ kind: value.kind, ...("reason" in value ? { reason: value.reason } : {}) });
    };
    const originalWrite = store.backend.writeTask.bind(store.backend);
    if (source.scenario.startsWith("admission-")) {
      store.backend.writeTask = async (...args) => {
        if (source.scenario !== "admission-before-write") await originalWrite(...args);
        if (source.scenario === "admission-unknown-readback")
          store.backend.getTask = () => Promise.reject(new Error("readback unavailable"));
        throw new Error("write response unavailable");
      };
    }
    if (source.scenario === "concurrent-start") {
      let release: (() => void) | undefined;
      const barrier = new Promise<void>((resolve) => {
        release = resolve;
      });
      let writers = 0;
      store.backend.writeTask = async (...args) => {
        if (++writers === 2) release?.();
        await barrier;
        return originalWrite(...args);
      };
      commands.push(start, start);
      const outcomes = await Promise.all([
        dispatchKernelEffect({ adapter, input: start, dispatch: provider }),
        dispatchKernelEffect({ adapter, input: start, dispatch: provider }),
      ]);
      dispatches.push(
        ...outcomes
          .map((outcome) => ({
            kind: outcome.kind,
            ...("reason" in outcome ? { reason: outcome.reason } : {}),
          }))
          .toSorted((a, b) => a.kind.localeCompare(b.kind)),
      );
    } else if (source.scenario !== "not-issued") {
      commands.push(start);
      save(await dispatchKernelEffect({ adapter, input: start, dispatch: provider }));
    }
    observations.push(await snapshot("after-dispatch"));
    const restarted = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
    if (source.scenario !== "not-issued") {
      commands.push(start);
      save(await dispatchKernelEffect({ adapter: restarted, input: start, dispatch: provider }));
    }
    observations.push(await snapshot("after-restart"));
    if (calls > 1 || applications > 1)
      throw new Error(`${identity.fixture_id}: duplicate provider call`);
    if (source.scenario !== "not-issued") {
      const uncertain = ["uncertain", "reconciled"].includes(source.scenario);
      const current = await restarted.read(journey.task.id);
      if (current.kind !== "canonical") throw new Error("Missing readback aggregate");
      const observed = readKernelEffectObservation(
        {
          kind: "provider",
          task_id: journey.task.id,
          repository_fingerprint: fingerprint,
          effect_id: effect.id,
          request_digest: effect.request_digest,
          state: uncertain ? "IN_DOUBT" : applications ? "APPLIED" : "NOT_APPLIED",
          receipt_digest: k.kernelDigest({ provider: "counted-fake", applications }),
        },
        current.record.aggregate,
        fingerprint,
      );
      if (observed.kind !== "provider") throw new Error(JSON.stringify(observed));
      const observe: KernelCommandInput = {
        ...start,
        mutation_id: "qualified-provider-readback",
        command: {
          ...start.command,
          kind: "observe_effect",
          expected_task_revision: current.record.aggregate.revision,
          observed_state: observed.state,
          observation_digest: observed.receipt_digest,
        },
      };
      commands.push(observe);
      const result = await restarted.execute(observe);
      if (result.kind !== "committed") throw new Error(JSON.stringify(result));
      observations.push(await snapshot("provider-readback"));
      if (source.scenario === "reconciled") {
        const reconcile: KernelCommandInput = {
          ...start,
          mutation_id: "qualified-provider-reconciliation",
          command: {
            ...start.command,
            kind: "reconcile_effect",
            expected_task_revision: result.record.aggregate.revision,
            resolution: "APPLIED",
            provider_receipt_digest: k.kernelDigest({ independent_readback: true, applications }),
          },
        };
        commands.push(reconcile);
        const reconciled = await restarted.execute(reconcile);
        if (reconciled.kind !== "committed") throw new Error(JSON.stringify(reconciled));
        observations.push(await snapshot("reconciled"));
      }
    }
    return {
      commands,
      observations,
      dispatches,
      provider_calls: calls,
      provider_applications: applications,
    };
  } finally {
    await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  }
}

export async function captureKernelEffectReplay(anchor: string) {
  if (!/^[a-f0-9]{40}$/u.test(anchor)) throw new Error("Exact qualification anchor required");
  const fixtures = [];
  for (const fixture of kernelEffectReplayCases())
    fixtures.push({
      identity: {
        fixture_id: fixture.id,
        implementation_anchor: anchor,
        source_digest: replayBytesDigest(fixture.source_bytes),
        reproduction_command: `node scripts/bench/qualify-kernel-replay.mjs ${anchor}`,
      },
      family: "effects",
      source_bytes: fixture.source_bytes,
      expected: await observeKernelEffectReplay(fixture.source_bytes),
    });
  return fixtures;
}
