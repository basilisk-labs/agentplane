import { execFileSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";
import { makeKernelRecord } from "./kernel-record.js";
import { compareKernelReadPaths } from "./kernel-replay.js";
import { bindKernelWorkItemEvidence, readKernelReview } from "./kernel-observations.js";
import {
  captureKernelPersistenceFixture,
  replayKernelPersistenceFixture,
  type KernelPersistenceFixture,
} from "./kernel-replay-capture.testkit.js";
import {
  kernelReplayStorage,
  replayBackendKinds,
  type ReplayBackendKind,
} from "./kernel-replay-storage.testkit.js";
import {
  kernelReplayJourney,
  kernelReplayCrashPoints,
  replayRepositoryIdentity,
  replayTaskClasses,
} from "./kernel-replay-journey.test-fixtures.js";

const roots: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
const storage = (kind: ReplayBackendKind) => kernelReplayStorage(kind, roots);

// The isolated driver alone supplies this destination. Normal tests never update frozen inputs.
if (process.env.AGENTPLANE_KERNEL_CAPTURE_OUTPUT) {
  it("captures persistence observations at the isolated exact anchor", async () => {
    const anchor = process.env.AGENTPLANE_KERNEL_CAPTURE_ANCHOR;
    if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor)) throw new Error("Missing capture anchor");
    expect(execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim()).toBe(anchor);
    expect(
      execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" }),
    ).toBe("");
    const fixtures = [];
    for (const backend of replayBackendKinds)
      for (const taskClass of replayTaskClasses)
        fixtures.push(await captureKernelPersistenceFixture(backend, taskClass, anchor));
    await writeFile(
      process.env.AGENTPLANE_KERNEL_CAPTURE_OUTPUT!,
      JSON.stringify({ schema_version: 1, source_anchor: anchor, fixtures }, null, 2) + "\n",
      { flag: "wx" },
    );
  });
}

const frozen = JSON.parse(
  await readFile(new URL("kernel-replay-persistence.corpus.json", import.meta.url), "utf8"),
) as { schema_version: 1; source_anchor: string; fixtures: KernelPersistenceFixture[] };

describe("frozen persistence replay", () => {
  it("retains the captured five-class, three-backend observation matrix", () => {
    expect(frozen.source_anchor).toBe("8e92d66b8671d083b9928ef04b15a49dfece4292");
    expect(frozen.fixtures.map((fixture) => fixture.identity.fixture_id).toSorted()).toEqual(
      replayBackendKinds
        .flatMap((backend) => replayTaskClasses.map((taskClass) => `${backend}-${taskClass}`))
        .toSorted(),
    );
    expect(frozen.fixtures.reduce((count, fixture) => count + fixture.expected.length, 0)).toBe(
      246,
    );
    for (const fixture of frozen.fixtures)
      expect(fixture.identity.implementation_anchor).toBe(frozen.source_anchor);
  });

  for (const fixture of frozen.fixtures) {
    it(`replays ${fixture.identity.fixture_id} against independently frozen observations`, async () => {
      const comparison = await replayKernelPersistenceFixture(fixture);
      expect(comparison.matched, JSON.stringify(comparison)).toBe(true);
    });
  }

  it("rejects changed source bytes before opening storage or parsing commands", async () => {
    const comparison = await replayKernelPersistenceFixture({
      ...frozen.fixtures[0]!,
      source_bytes: "not JSON",
    });
    expect(comparison).toMatchObject({
      matched: false,
      first_divergent_field: '$["source_digest"]',
    });
  });

  it("reports a bounded difference against the frozen event history", async () => {
    const fixture = structuredClone(frozen.fixtures[0]!);
    fixture.expected[0]!.events = [];
    const comparison = await replayKernelPersistenceFixture(fixture);
    expect(comparison).toMatchObject({
      matched: false,
      first_divergent_field: '$[0]["events"][0]',
      implementation_anchor: frozen.source_anchor,
    });
    expect(JSON.stringify(comparison).length).toBeLessThan(1000);
  });
});

describe("canonical replay through persistence and restart", () => {
  for (const taskClass of replayTaskClasses) {
    it(`${taskClass} captures equal semantic observations across all storage modes`, async () => {
      // This anchor belongs to the unit fixture. Only the isolated driver produces qualification proof.
      const fixtures = [];
      for (const backend of replayBackendKinds)
        fixtures.push(await captureKernelPersistenceFixture(backend, taskClass, "0".repeat(40)));
      for (const fixture of fixtures.slice(1)) {
        expect(fixture.source_bytes).toBe(fixtures[0]!.source_bytes);
        expect(fixture.expected).toEqual(fixtures[0]!.expected);
      }
      expect(fixtures[0]!.expected.at(-1)?.next_action.reason_code).toBe("kernel_task_completed");
    });
  }
  for (const backendKind of replayBackendKinds) {
    it(`${backendKind} does not require an unclaimed optional WorkItem before final validation`, async () => {
      const original = kernelReplayJourney("direct").steps[1]!.input.command;
      if (original.kind !== "propose_plan") throw new Error("Missing fixture plan");
      const optional = {
        ...original.plan.work_items[0]!,
        id: "optional",
        optional: true,
        expected_outputs: ["optional-output"],
      };
      const fixture = await captureKernelPersistenceFixture(
        backendKind,
        "direct",
        "0".repeat(40),
        kernelReplayJourney("direct", [optional]),
      );
      expect(fixture.expected.at(-1)?.next_action.reason_code).toBe("kernel_task_completed");
    });

    it(`${backendKind} selects independent ready work while another WorkItem is blocked`, async () => {
      const original = kernelReplayJourney("direct").steps[1]!.input.command;
      if (original.kind !== "propose_plan") throw new Error("Missing fixture plan");
      const other = {
        ...original.plan.work_items[0]!,
        id: "other",
        expected_outputs: ["other-output"],
      };
      const journey = kernelReplayJourney("direct", [other]);
      const store = await storage(backendKind);
      const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
      for (const [index, step] of journey.steps.slice(0, 4).entries()) {
        const result =
          index === 0
            ? await adapter.create(journey.task, step.input)
            : await adapter.execute(step.input);
        expect(result.kind).toBe("committed");
      }
      const claim = journey.steps[4]!.input;
      if (claim.command.kind !== "transition_work_item") throw new Error("Missing claim fixture");
      expect(
        await adapter.execute({
          ...claim,
          mutation_id: "block-build",
          command: { ...claim.command, action: "block", claim_id: null },
        }),
      ).toMatchObject({ kind: "committed" });
      const restarted = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
      expect(
        await restarted.nextAction(journey.task.id, claim.repository_fingerprint),
      ).toMatchObject({
        reason_code: "kernel_work_item_claim_required",
        work_item_id: "other",
        grants_authority: false,
      });
      expect(
        await restarted.execute({
          ...claim,
          mutation_id: "claim-other",
          authority: { ...claim.authority!, work_item_id: "other" },
          command: { ...claim.command, expected_task_revision: 5, work_item_id: "other" },
        }),
      ).toMatchObject({ kind: "committed" });
    });

    it(`${backendKind} keeps review fresh across metadata changes and rejects a replaced semantic result`, async () => {
      const store = await storage(backendKind);
      const journey = kernelReplayJourney("direct");
      const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
      for (const [index, step] of journey.steps.slice(0, 7).entries()) {
        const result =
          index === 0
            ? await adapter.create(journey.task, step.input)
            : await adapter.execute(step.input);
        expect(result.kind).toBe("committed");
      }
      const fingerprint = journey.steps[0]!.input.repository_fingerprint;
      const before = bindKernelWorkItemEvidence(
        await adapter.read(journey.task.id),
        "build",
        fingerprint,
      );
      if (before.kind !== "binding") throw new Error(JSON.stringify(before));
      const review = {
        kind: "review",
        binding: before.binding,
        verdict: "PASS",
        evidence_digests: [k.kernelDigest("review-evidence")],
        findings: [],
      };
      const saved = await store.backend.getTask(journey.task.id);
      if (!saved) throw new Error("Missing saved Task");
      await store.backend.writeTask(
        {
          ...saved,
          doc_updated_at: "2026-08-30T01:00:00.000Z",
          doc_updated_by: "fixture-operator",
          revision: saved.revision! + 1,
        },
        { expectedRevision: saved.revision },
      );
      const updated = await store.backend.getTask(journey.task.id);
      expect(updated?.revision).toBe(saved.revision! + 1);
      const metadata = bindKernelWorkItemEvidence(
        await adapter.read(journey.task.id),
        "build",
        fingerprint,
      );
      expect(metadata).toEqual(before);
      expect(readKernelReview(review, before.binding)).toMatchObject({
        kind: "review",
        verdict: "PASS",
      });
      let counter = 0;
      const run = async (command: k.TaskCommand) => {
        const current = await adapter.read(journey.task.id);
        if (current.kind !== "canonical") throw new Error(JSON.stringify(current));
        const result = await adapter.execute({
          ...journey.steps[6]!.input,
          command: { ...command, expected_task_revision: current.record.aggregate.revision },
          mutation_id: `review-rework-${counter++}`,
        });
        expect(result.kind, JSON.stringify(result)).toBe("committed");
      };
      await run(journey.steps[7]!.input.command);
      const validation = journey.steps[8]!.input.command;
      if (validation.kind !== "record_work_item_validation")
        throw new Error("Missing validation fixture");
      await run({ ...validation, validation: { ...validation.validation, status: "FAILED" } });
      const claim = journey.steps[4]!.input.command;
      if (claim.kind !== "transition_work_item") throw new Error("Missing claim fixture");
      await run({ ...claim, action: "rework" });
      await run(claim);
      const claimed = await adapter.read(journey.task.id);
      expect(bindKernelWorkItemEvidence(claimed, "build", fingerprint)).toEqual({
        kind: "rejected",
        code: "observation_binding_unavailable",
      });
      await run(journey.steps[5]!.input.command);
      const result = journey.steps[6]!.input.command;
      if (result.kind !== "accept_work_item_result") throw new Error("Missing result fixture");
      const changed = k.kernelDigest("changed-implementation");
      await run({
        ...result,
        result_digest: changed,
        output_manifests: result.output_manifests.map((output) => ({
          ...output,
          digest: changed,
          attempt: 2,
        })),
      });
      const after = bindKernelWorkItemEvidence(
        await adapter.read(journey.task.id),
        "build",
        fingerprint,
      );
      if (after.kind !== "binding") throw new Error(JSON.stringify(after));
      expect(readKernelReview(review, after.binding)).toEqual({
        kind: "rejected",
        code: "observation_binding_mismatch",
      });
    });

    it(`${backendKind} reports an actual legacy projection mismatch without repairing or writing it`, async () => {
      const store = await storage(backendKind);
      const journey = kernelReplayJourney("direct");
      const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
      await adapter.create(journey.task, journey.steps[0]!.input);
      const legacy = store.restart();
      const read = legacy.getTask.bind(legacy);
      vi.spyOn(legacy, "getTask").mockImplementation(async (id) => {
        const task = await read(id);
        return task ? { ...task, status: "DONE" } : task;
      });
      const legacyWrite = vi.spyOn(legacy, "writeTask");
      const canonicalWrite = vi.spyOn(store.backend, "writeTask");
      const comparison = await compareKernelReadPaths(
        legacy,
        adapter,
        journey.task.id,
        journey.steps[0]!.input.repository_fingerprint,
        {
          fixture_id: `${backendKind}-legacy-projection-mismatch`,
          implementation_anchor: "runtime-test",
          reproduction_command:
            "bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts",
        },
      );
      expect(comparison.comparison).toMatchObject({
        matched: false,
        first_divergent_field: '$["status"]',
      });
      expect(comparison.next_action).toMatchObject({
        reason_code: "kernel_plan_required",
        grants_authority: false,
      });
      expect(legacyWrite).not.toHaveBeenCalled();
      expect(canonicalWrite).not.toHaveBeenCalled();
    });

    it(`${backendKind} serializes competing resource claims and rejects a fresh conflicting retry`, async () => {
      const store = await storage(backendKind);
      const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
      const journey = kernelReplayJourney("direct");
      const proposal = journey.steps[1]!.input.command;
      if (proposal.kind !== "propose_plan") throw new Error("Missing fixture plan");
      const first = proposal.plan.work_items[0]!;
      const workItems = [first, { ...first, id: "other", expected_outputs: ["other-output"] }].map(
        (definition) => ({
          ...definition,
          execution_requirements: {
            ...definition.execution_requirements,
            resources: ["shared-path"],
          },
        }),
      );
      const plan = {
        ...proposal.plan,
        work_items: workItems,
        digest: k.kernelDigest({ revision: 1, work_items: workItems }),
      };
      for (const [index, step] of journey.steps.slice(0, 4).entries()) {
        let command = step.input.command;
        if (command.kind === "propose_plan") command = { ...command, plan };
        if (command.kind === "approve_plan" || command.kind === "materialize_work_items")
          command = { ...command, plan_digest: plan.digest };
        const input = {
          ...step.input,
          command,
          authority: {
            ...step.input.authority!,
            resources: ["shared-path"],
            ...(index > 1 ? { plan_digest: plan.digest } : {}),
          },
        };
        expect(
          (index === 0 ? await adapter.create(journey.task, input) : await adapter.execute(input))
            .kind,
        ).toBe("committed");
      }
      const inputs = ["build", "other"].map((id) => ({
        ...journey.steps[4]!.input,
        mutation_id: `claim-${id}`,
        authority: {
          ...journey.steps[4]!.input.authority!,
          work_item_id: id,
          resources: ["shared-path"],
          plan_digest: plan.digest,
        },
        command: {
          ...journey.steps[4]!.input.command,
          kind: "transition_work_item" as const,
          action: "claim" as const,
          work_item_id: id,
          claim_id: `claim-${id}`,
        },
      }));
      const outcomes = await Promise.all(inputs.map((input) => adapter.execute(input)));
      // Concurrent lock activity can invalidate a stable readback after the winning write.
      // An uncertain response must be reconciled from durable receipts, not counted as failure.
      expect(outcomes.filter((outcome) => outcome.kind === "committed").length).toBeLessThanOrEqual(
        1,
      );
      const fresh = await new KernelBackendAdapter(store.restart(), replayRepositoryIdentity).read(
        journey.task.id,
      );
      if (fresh.kind !== "canonical") throw new Error(JSON.stringify(fresh));
      const winners = inputs.flatMap((input, index) =>
        fresh.record.aggregate.mutation_receipts[input.mutation_id] ? [index] : [],
      );
      expect(winners, JSON.stringify(outcomes)).toHaveLength(1);
      const winner = winners[0]!;
      const loser = winner === 0 ? 1 : 0;
      const write = vi.spyOn(store.backend, "writeTask");
      expect(await adapter.execute(inputs[winner]!)).toMatchObject({
        kind: "committed",
        replayed: true,
      });
      expect(await adapter.execute(inputs[loser]!)).toMatchObject({
        kind: "rejected",
        code: "STALE_TASK_REVISION",
      });
      expect(write).not.toHaveBeenCalled();
      write.mockRestore();
      const retry = inputs[loser]!;
      expect(
        await adapter.execute({
          ...retry,
          mutation_id: "fresh-conflicting-claim",
          command: {
            ...retry.command,
            expected_task_revision: fresh.record.aggregate.revision,
          },
        }),
      ).toMatchObject({ kind: "rejected", code: "WORK_ITEM_RESOURCE_CONFLICT" });
      expect(fresh.record.events).toHaveLength(5);
      expect(
        Object.values(fresh.record.aggregate.work_items).filter((item) => item.state === "CLAIMED"),
      ).toHaveLength(1);
      const owner = inputs[winner]!;
      const blocked = await adapter.execute({
        ...owner,
        mutation_id: "block-resource-owner",
        command: {
          ...owner.command,
          action: "block",
          expected_task_revision: fresh.record.aggregate.revision,
        },
      });
      if (blocked.kind !== "committed") throw new Error(JSON.stringify(blocked));
      expect(await adapter.nextAction(journey.task.id, owner.repository_fingerprint)).toMatchObject(
        {
          reason_code: "kernel_work_item_blocked",
          work_item_id: owner.command.work_item_id,
        },
      );
      const cancelled = await adapter.execute({
        ...owner,
        mutation_id: "cancel-resource-owner",
        command: {
          ...owner.command,
          action: "cancel",
          expected_task_revision: blocked.record.aggregate.revision,
        },
      });
      expect(cancelled.kind).toBe("committed");
      expect(await adapter.nextAction(journey.task.id, owner.repository_fingerprint)).toMatchObject(
        {
          reason_code: "kernel_work_item_claim_required",
          work_item_id: retry.command.work_item_id,
        },
      );
    });

    for (const taskClass of replayTaskClasses) {
      it(`${backendKind} ${taskClass} preserves every command, event and receipt after restart`, async () => {
        const store = await storage(backendKind);
        const { task, steps } = kernelReplayJourney(taskClass);
        let previous: k.TaskAggregate | null = null;
        let events: readonly k.DomainEvent[] = [];
        for (const [index, step] of steps.entries()) {
          const adapter = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
          const result =
            index === 0
              ? await adapter.create(task, step.input)
              : await adapter.execute(step.input);
          expect(result.kind, step.label + JSON.stringify(result)).toBe("committed");
          if (result.kind !== "committed") throw new Error(step.label);
          if (previous) {
            const expected = k.reduceTaskCommand({ ...step.input, aggregate: previous });
            expect(expected.kind).toBe("accepted");
            if (expected.kind !== "accepted") throw new Error(step.label);
            events = [...events, ...expected.events];
            expect(result.record).toEqual(
              makeKernelRecord(replayRepositoryIdentity, expected.aggregate, events),
            );
          } else events = result.record.events;
          previous = result.record.aggregate;
          const reader = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
          expect(await reader.read(task.id)).toMatchObject({
            kind: "canonical",
            record: result.record,
          });
          const write = vi.spyOn(reader.backend, "writeTask");
          const legacyReader = store.restart();
          const legacyWrite = vi.spyOn(legacyReader, "writeTask");
          const comparison = await compareKernelReadPaths(
            legacyReader,
            reader,
            task.id,
            step.input.repository_fingerprint,
            {
              fixture_id: `${backendKind}-${taskClass}-${step.label}`,
              implementation_anchor: "runtime-test",
              reproduction_command: `bunx vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts`,
            },
          );
          expect(comparison.comparison, JSON.stringify(comparison)).toMatchObject({
            matched: true,
            first_divergent_field: null,
          });
          expect(comparison.next_action).toMatchObject({
            reason_code: step.expected_next_reason,
            grants_authority: false,
          });
          expect(legacyWrite).not.toHaveBeenCalled();
          legacyWrite.mockRestore();
          expect(await reader.execute(step.input)).toMatchObject({
            kind: "committed",
            replayed: true,
          });
          expect(write).not.toHaveBeenCalled();
          write.mockRestore();
        }
        expect(previous?.state).toBe("COMPLETED");
        expect(Object.keys(previous!.mutation_receipts)).toHaveLength(steps.length);
        expect(events).toHaveLength(steps.length);
        expect(new Set(events.map((event) => event.id)).size).toBe(steps.length);
      });
    }
    for (const mode of ["before-write", "after-write", "unknown-readback"] as const) {
      for (const { journey, step: crashStep, index: crashIndex } of kernelReplayCrashPoints()) {
        it(`${backendKind} ${mode} at ${crashStep.label} recovers without a duplicate mutation`, async () => {
          const store = await storage(backendKind);
          const adapter = new KernelBackendAdapter(store.backend, replayRepositoryIdentity);
          for (const [index, step] of journey.steps.slice(0, crashIndex).entries()) {
            const result =
              index === 0
                ? await adapter.create(journey.task, step.input)
                : await adapter.execute(step.input);
            expect(result.kind).toBe("committed");
          }
          const original = store.backend.writeTask.bind(store.backend);
          const write = vi
            .spyOn(store.backend, "writeTask")
            .mockImplementationOnce(async (...args) => {
              if (mode === "before-write") throw new Error("interrupted before atomic write");
              await original(...args);
              if (mode === "unknown-readback")
                vi.spyOn(store.backend, "getTask").mockRejectedValue(
                  new Error("readback unavailable"),
                );
              throw new Error("interrupted after atomic write");
            });
          const interrupted =
            crashIndex === 0
              ? await adapter.create(journey.task, crashStep.input)
              : await adapter.execute(crashStep.input);
          expect(interrupted.kind).toBe(mode === "after-write" ? "committed" : "unavailable");
          if (mode === "unknown-readback")
            expect(interrupted).toMatchObject({ code: "write_in_doubt" });
          write.mockRestore();
          const restarted = new KernelBackendAdapter(store.restart(), replayRepositoryIdentity);
          const resumedWrite = vi.spyOn(restarted.backend, "writeTask");
          const resumed =
            crashIndex === 0
              ? await restarted.create(journey.task, crashStep.input)
              : await restarted.execute(crashStep.input);
          expect(resumed.kind).toBe("committed");
          if (resumed.kind !== "committed") throw new Error(JSON.stringify(resumed));
          expect(resumed.record.events).toHaveLength(crashIndex + 1);
          expect(Object.keys(resumed.record.aggregate.mutation_receipts)).toHaveLength(
            crashIndex + 1,
          );
          expect(resumedWrite).toHaveBeenCalledTimes(mode === "before-write" ? 1 : 0);
          expect(
            await restarted.nextAction(journey.task.id, crashStep.input.repository_fingerprint),
          ).toMatchObject({ reason_code: crashStep.expected_next_reason, grants_authority: false });
        });
      }
    }
  }
});
