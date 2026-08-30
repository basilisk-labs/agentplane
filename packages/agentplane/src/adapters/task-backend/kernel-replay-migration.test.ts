import { mkdtemp, mkdir, readFile, readdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import { LocalBackend } from "../../backends/task-backend.js";
import {
  LocalTaskByteStore,
  taskBytesDigest,
} from "../../backends/task-backend/local-task-byte-store.js";
import { KernelMigration } from "./kernel-migration.js";
import { compareReplayObservations } from "./kernel-replay.js";

type MigrationFixture = {
  id: string;
  task_id: string;
  source_base64: string;
  source_digest: taskKernel.Sha256Digest;
  implementation_anchor: string;
  reproduction_command: string;
  expected: Awaited<ReturnType<KernelMigration["dryRun"]>>;
};
const corpus = JSON.parse(
  await readFile(new URL("kernel-replay-migration.corpus.json", import.meta.url), "utf8"),
) as {
  source_anchor: string;
  repository_identity: taskKernel.Sha256Digest;
  fixtures: MigrationFixture[];
};
const roots: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function storage(fixtures: MigrationFixture[]) {
  const root = await mkdtemp(path.join(os.tmpdir(), "frozen-migration-"));
  roots.push(root);
  for (const fixture of fixtures) {
    await mkdir(path.join(root, fixture.task_id));
    await writeFile(
      path.join(root, fixture.task_id, "README.md"),
      Buffer.from(fixture.source_base64, "base64"),
    );
  }
  const store = new LocalTaskByteStore(new LocalBackend({ dir: root }));
  return { root, store, migration: new KernelMigration(store, corpus.repository_identity) };
}

describe("frozen migration corpus", () => {
  for (const fixture of corpus.fixtures) {
    it(`${fixture.id} reproduces classification, exact digests, idempotency and rollback`, async () => {
      const source = Buffer.from(fixture.source_base64, "base64");
      expect(taskBytesDigest(source)).toBe(fixture.source_digest);
      expect(fixture.implementation_anchor).toBe(corpus.source_anchor);
      const { root, store, migration } = await storage([fixture]);
      const file = path.join(root, fixture.task_id, "README.md");
      const backup = vi.spyOn(store, "backup");
      const write = vi.spyOn(store, "compareAndSwap");
      const dry = await migration.dryRun(fixture.task_id);
      const comparison = compareReplayObservations(
        {
          fixture_id: fixture.id,
          source_digest: fixture.source_digest,
          implementation_anchor: fixture.implementation_anchor,
          reproduction_command: fixture.reproduction_command,
        },
        fixture.expected,
        dry,
      );
      expect(comparison, JSON.stringify(comparison)).toMatchObject({ matched: true });
      expect(backup).not.toHaveBeenCalled();
      expect(write).not.toHaveBeenCalled();
      const applied = await migration.apply(fixture.task_id, fixture.source_digest);
      if (fixture.expected.classification === "quarantined") {
        expect(applied).toEqual({ kind: "refused", reason: fixture.expected.reason });
        expect(await readdir(path.join(root, fixture.task_id))).toEqual(["README.md"]);
        expect(write).not.toHaveBeenCalled();
      } else {
        expect(applied.kind).toBe("applied");
        if (applied.kind !== "applied") throw new Error(JSON.stringify(applied));
        const canonical = await readFile(file);
        expect(taskBytesDigest(canonical)).toBe(fixture.expected.proposed_output_bytes_digest);
        expect(applied.proof.receipt.canonical_digest).toBe(
          fixture.expected.proposed_canonical_digest,
        );
        expect(applied.proof.receipt.projection_digest).toBe(
          fixture.expected.proposed_projection_digest,
        );
        expect(await migration.apply(fixture.task_id, fixture.source_digest)).toEqual({
          kind: "already_applied",
          proof: applied.proof,
        });
        expect(await readFile(file)).toEqual(canonical);
        expect(write).toHaveBeenCalledTimes(1);
        expect(await migration.rollback(applied.proof)).toEqual({
          kind: "rolled_back",
          source_digest: fixture.source_digest,
        });
      }
      expect(await readFile(file)).toEqual(source);
    });
  }

  it("stops the frozen canary batch at the first quarantined source and preserves the successor", async () => {
    const ids = ["legacy-TODO", "unknown-status", "legacy-DOING"];
    const fixtures = ids.map((id) => corpus.fixtures.find((fixture) => fixture.id === id)!);
    const { root, migration } = await storage(fixtures);
    const outcomes = await migration.applyCanaryBatch(fixtures);
    expect(outcomes.map((outcome) => outcome.kind)).toEqual(["applied", "refused"]);
    const successor = fixtures[2]!;
    expect(await readFile(path.join(root, successor.task_id, "README.md"))).toEqual(
      Buffer.from(successor.source_base64, "base64"),
    );
  });
});
