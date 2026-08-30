import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import {
  compareReplayObservations,
  observeKernelEvidenceReplay,
  replayBytesDigest,
  replayKernelFixture,
  type KernelReplayFixture,
  type ObservationReplayInput,
  type ReplayIdentity,
} from "./kernel-replay.js";

const corpus = JSON.parse(
  await readFile(new URL("kernel-replay.corpus.json", import.meta.url), "utf8"),
) as {
  source_anchor: string;
  fixtures: KernelReplayFixture[];
};

describe("frozen canonical kernel replay", () => {
  for (const fixture of corpus.fixtures) {
    it(fixture.identity.fixture_id, () => {
      const original = JSON.stringify(fixture);
      const replay = replayKernelFixture(fixture);
      expect(replay, JSON.stringify(replay)).toMatchObject({
        matched: true,
        first_divergent_field: null,
      });
      expect(JSON.stringify(fixture)).toBe(original);
    });
  }

  it("covers the closed Task and WorkItem action products without duplicate fixture identities", () => {
    const ids = corpus.fixtures.map((fixture) => fixture.identity.fixture_id);
    expect(new Set(ids).size).toBe(ids.length);
    const required = [
      ...Object.keys(taskKernel.TASK_ACTION_TRANSITION_TABLE).flatMap((action) =>
        taskKernel.TASK_STATES.map((state) => `task-${action}-${state}`),
      ),
      ...Object.keys(taskKernel.WORK_ITEM_TRANSITION_TABLE).flatMap((action) =>
        taskKernel.WORK_ITEM_STATES.map((state) => `work-item-${action}-${state}`),
      ),
    ];
    expect(required.filter((id) => !ids.includes(id))).toEqual([]);
    expect(
      corpus.fixtures.every(
        (fixture) => fixture.identity.implementation_anchor === corpus.source_anchor,
      ),
    ).toBe(true);
  });

  it("reports source corruption before interpreting the command", () => {
    const fixture = corpus.fixtures[0]!;
    const replay = replayKernelFixture({ ...fixture, source_bytes: "invalid JSON" });
    expect(replay).toMatchObject({ matched: false, first_divergent_field: '$["source_digest"]' });
  });

  it("reports the first divergent event and keeps exact source and reproduction identity", () => {
    const fixture = corpus.fixtures.find((value) => value.expected.events.length > 0)!;
    const expected = structuredClone(fixture.expected);
    Reflect.set(expected.events[0]!, "actor_id", "different-actor");
    const replay = replayKernelFixture({ ...fixture, expected });
    expect(replay).toMatchObject({
      ...fixture.identity,
      matched: false,
      first_divergent_field: '$["events"][0]["actor_id"]',
    });
  });

  it("does not hide missing fields, array reorder or a missing event behind final state equality", () => {
    const identity = corpus.fixtures[0]!.identity;
    expect(compareReplayObservations(identity, { a: undefined }, {}).matched).toBe(false);
    expect(compareReplayObservations(identity, [1, 2], [2, 1]).first_divergent_field).toBe("$[0]");
    expect(
      compareReplayObservations(identity, { events: ["one"] }, { events: [] })
        .first_divergent_field,
    ).toBe('$["events"][0]');
    expect(compareReplayObservations(identity, { b: 2, a: 1 }, { a: 1, b: 2 }).matched).toBe(true);
  });
});

const evidenceCorpus = JSON.parse(
  await readFile(new URL("kernel-replay-evidence.corpus.json", import.meta.url), "utf8"),
) as {
  fixtures: { identity: ReplayIdentity; source_bytes: string; expected: unknown }[];
};
describe("frozen evidence adapter replay", () => {
  for (const fixture of evidenceCorpus.fixtures) {
    it(fixture.identity.fixture_id, () => {
      expect(replayBytesDigest(fixture.source_bytes)).toBe(fixture.identity.source_digest);
      const input = JSON.parse(fixture.source_bytes) as ObservationReplayInput;
      const before = JSON.stringify(input);
      const comparison = compareReplayObservations(
        fixture.identity,
        fixture.expected,
        observeKernelEvidenceReplay(input),
      );
      expect(comparison, JSON.stringify(comparison)).toMatchObject({ matched: true });
      expect(JSON.stringify(input)).toBe(before);
    });
  }
});
