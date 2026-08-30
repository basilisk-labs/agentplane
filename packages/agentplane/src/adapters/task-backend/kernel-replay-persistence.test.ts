import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocalBackend, type TaskBackend, type TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";
import { makeKernelRecord } from "./kernel-record.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
  replayTaskClasses,
} from "./kernel-replay-journey.test-fixtures.js";

const roots: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function storage(kind: "local" | "cloud-fake") {
  if (kind === "local") {
    const dir = await mkdtemp(path.join(os.tmpdir(), "kernel-replay-"));
    roots.push(dir);
    return { backend: new LocalBackend({ dir }), restart: () => new LocalBackend({ dir }) };
  }
  let saved: TaskData | null = null;
  function client(): TaskBackend {
    const base = makeTaskBackendDouble();
    return makeTaskBackendDouble({
      id: "cloud-fake",
      capabilities: { ...base.capabilities, canonical_source: "remote", atomic_task_record: true },
      getTask: () => Promise.resolve(structuredClone(saved)),
      writeTask: (next, options) => {
        if ((saved?.revision ?? 0) !== options?.expectedRevision)
          return Promise.reject(new Error("CAS conflict"));
        saved = structuredClone(next);
        return Promise.resolve();
      },
    });
  }
  return { backend: client(), restart: client };
}

describe("canonical replay through persistence and restart", () => {
  for (const backendKind of ["local", "cloud-fake"] as const) {
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
      expect(outcomes.filter((outcome) => outcome.kind === "committed")).toHaveLength(1);
      const loser = outcomes.findIndex((outcome) => outcome.kind !== "committed");
      const fresh = await new KernelBackendAdapter(store.restart(), replayRepositoryIdentity).read(
        journey.task.id,
      );
      if (fresh.kind !== "canonical") throw new Error(JSON.stringify(fresh));
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
      const journey = kernelReplayJourney("branch_pr");
      for (const [crashIndex, crashStep] of journey.steps.entries()) {
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
        });
      }
    }
  }
});
