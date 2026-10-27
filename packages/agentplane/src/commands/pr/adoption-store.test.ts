import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { assertTaskOwnedPrSync, createExistingPrAdoptionStore } from "./adoption-store.js";
import type { AdoptedPrIdentity } from "./adoption-identity.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

const receipt: AdoptedPrIdentity = {
  schema_version: 1,
  task_id: "T-1",
  provider: "github",
  hostname: "github.com",
  remote: "origin",
  source_project: "example/repo",
  target_project: "example/repo",
  pr_number: 42,
  head_ref: "upgrade/dependencies",
  base_ref: "main",
  head_sha: "a".repeat(40),
  base_sha: "b".repeat(40),
  observed_at: "2026-10-27T10:00:00.000Z",
  readback_digest: `sha256:${"c".repeat(64)}`,
  authority_digest: `sha256:${"d".repeat(64)}`,
};

describe("existing PR adoption metadata store", () => {
  it("keeps the original adoption proof and rejects another task's claim to the hosted PR", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-adoption-"));
    roots.push(root);
    const store = createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" });
    await expect(store.createIfUnbound(receipt)).resolves.toBeUndefined();
    expect(await store.readTask("T-1")).toEqual(receipt);
    expect(await store.findBinding({ ...receipt, head_sha: "e".repeat(40) })).toEqual({
      task_id: "T-1",
    });
    await expect(store.createIfUnbound({ ...receipt, task_id: "T-2" })).rejects.toThrow(
      "already has a task or provider binding",
    );
    await expect(store.createIfUnbound({ ...receipt, head_sha: "e".repeat(40) })).rejects.toThrow(
      "already has a task or provider binding",
    );
    const meta = JSON.parse(await readFile(path.join(root, "tasks/T-1/pr/meta.json"), "utf8")) as {
      adoption: AdoptedPrIdentity;
      head_sha?: string;
    };
    expect(meta.adoption).toEqual(receipt);
    expect(meta.head_sha).toBeUndefined();
    expect(() => assertTaskOwnedPrSync(meta)).toThrow("task-owned PR sync is forbidden");
  });

  it("does not create a receipt when task metadata is malformed", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-adoption-"));
    roots.push(root);
    const store = createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" });
    await expect(store.createIfUnbound(receipt)).resolves.toBeUndefined();
    await expect(store.readTask("../T-1")).rejects.toThrow("task ID is invalid");
    await expect(store.createIfUnbound({ ...receipt, task_id: "../T-2" })).rejects.toThrow(
      "task ID is invalid",
    );
  });

  it("ignores ordinary metadata on read while preserving strict adoption and creation checks", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-adoption-"));
    roots.push(root);
    const metaPath = path.join(root, "tasks/T-1/pr/meta.json");
    await mkdir(path.dirname(metaPath), { recursive: true });
    await writeFile(metaPath, "{}\n");
    const store = createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" });
    expect(await store.readTask("T-1")).toBeNull();
    expect(await store.findBinding(receipt)).toBeNull();
    await expect(store.createIfUnbound(receipt)).rejects.toThrow("schema validation failed");
    await writeFile(metaPath, `${JSON.stringify({ adoption: receipt })}\n`);
    await expect(store.readTask("T-1")).rejects.toThrow("schema validation failed");
    await expect(store.findBinding(receipt)).rejects.toThrow("schema validation failed");
  });

  it("records a provider-proven merge without changing the immutable adoption proof", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-adoption-"));
    roots.push(root);
    const store = createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" });
    await store.createIfUnbound(receipt);
    const commit = "e".repeat(40);
    const mergedAt = "2026-10-27T11:00:00.000Z";
    await expect(store.recordMerged("T-1", "f".repeat(40), commit, mergedAt)).rejects.toThrow(
      "exact head",
    );
    await store.recordMerged("T-1", receipt.head_sha, commit, mergedAt);
    await store.recordMerged("T-1", receipt.head_sha, commit, mergedAt);
    expect(await store.readTask("T-1")).toEqual(receipt);
    expect(await store.readMerged("T-1")).toEqual({
      headSha: receipt.head_sha,
      mergeCommit: commit,
      mergedAt,
    });
    await expect(
      store.recordMerged("T-1", receipt.head_sha, "f".repeat(40), mergedAt),
    ).rejects.toThrow("different evidence");
    await expect(
      store.recordMerged("T-1", receipt.head_sha, commit, "2026-10-27T11:00:01.000Z"),
    ).rejects.toThrow("different evidence");
  });

  it("moves only the mutable current head after a proven update and binds merge to that head", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-adoption-"));
    roots.push(root);
    const store = createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" });
    await store.createIfUnbound(receipt);
    const updated = "e".repeat(40);
    await expect(store.recordUpdatedHead("T-1", "f".repeat(40), updated)).rejects.toThrow(
      "retained current head",
    );
    await store.recordUpdatedHead("T-1", receipt.head_sha, updated);
    await store.recordUpdatedHead("T-1", receipt.head_sha, updated);
    expect(await store.readTask("T-1")).toEqual(receipt);
    const updatedMeta = await store.readMetadata("T-1");
    expect(updatedMeta?.head_sha).toBe(updated);
    await expect(
      store.recordMerged("T-1", receipt.head_sha, "f".repeat(40), "2026-10-27T11:00:00Z"),
    ).rejects.toThrow("exact head");
    await store.recordMerged("T-1", updated, "f".repeat(40), "2026-10-27T11:00:00Z");
    const mergedMeta = await store.readMetadata("T-1");
    expect(mergedMeta?.adoption).toEqual(receipt);
  });
});
