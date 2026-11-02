import { link, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  readRetirementFile,
  retirementRequestSchema,
} from "./stale-admission-retirement-validation.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function files() {
  const root = await mkdtemp(path.join(os.tmpdir(), "admission-read-"));
  roots.push(root);
  await mkdir(path.join(root, "nested"));
  const file = path.join(root, "nested/source");
  await writeFile(file, "original\r\nbody\n");
  return { root, file };
}

describe("stale admission evidence observation boundary", () => {
  it("retains exact UTF-8 and mixed newline bytes", async () => {
    const { root, file } = await files();
    const original = await readFile(file);
    expect(Buffer.from(await readRetirementFile(root, file))).toEqual(original);
    expect(await readFile(file)).toEqual(original);
  });
  it("rejects non-UTF-8 bytes instead of retaining replacement characters", async () => {
    const { root, file } = await files();
    const original = Buffer.from([0x61, 0xff, 0x62]);
    await writeFile(file, original);
    await expect(readRetirementFile(root, file)).rejects.toThrow(/non-UTF-8/u);
    expect(await readFile(file)).toEqual(original);
  });
  it("refuses outside files and linked leaves without altering their targets", async () => {
    const { root, file } = await files();
    const other = await files();
    const before = await readFile(other.file);
    await expect(readRetirementFile(root, other.file)).rejects.toThrow(/outside/u);
    await rm(file);
    await symlink(other.file, file);
    await expect(readRetirementFile(root, file)).rejects.toThrow(/symlink|regular/u);
    expect(await readFile(other.file)).toEqual(before);
  });
  it("refuses an intermediate directory link", async () => {
    const { root } = await files();
    const other = await files();
    await symlink(path.dirname(other.file), path.join(root, "alias"), "junction");
    await expect(readRetirementFile(root, path.join(root, "alias/source"))).rejects.toThrow(
      /symlink/u,
    );
  });
  it("refuses a directory link used as the observation root", async () => {
    const { root } = await files();
    const other = await files();
    const before = await readFile(other.file);
    const alias = path.join(root, "alias");
    await symlink(other.root, alias, "junction");
    await expect(readRetirementFile(alias, path.join(alias, "nested/source"))).rejects.toThrow(
      /root/u,
    );
    expect(await readFile(other.file)).toEqual(before);
  });
  it("refuses hard-linked evidence", async () => {
    const { root, file } = await files();
    await link(file, path.join(root, "second"));
    await expect(readRetirementFile(root, file)).rejects.toThrow(/hard-linked/u);
  });
  it("enforces a bounded observation without truncating or changing the source", async () => {
    const { root, file } = await files();
    await writeFile(file, Buffer.alloc(4 * 1024 * 1024 + 1, 0x61));
    await expect(readRetirementFile(root, file)).rejects.toThrow(/budget/u);
    const retained = await readFile(file);
    expect(retained.length).toBe(4 * 1024 * 1024 + 1);
  });
  it("rejects caller-supplied outcome or authority claims", () => {
    const value = {
      schema_version: 1,
      kind: "stale_admission_retirement_request",
      task_id: "fixture",
      repository_identity: "sha256:" + "a".repeat(64),
      policy_digest: "sha256:" + "b".repeat(64),
      source_digest: "sha256:" + "c".repeat(64),
      journal_digest: "sha256:" + "d".repeat(64),
      operation_key: "sha256:" + "e".repeat(64),
      work_order_digest: "sha256:" + "f".repeat(64),
      exchange_digest: "sha256:" + "1".repeat(64),
      result_digest: null,
      original_checkout: "/fixture/missing",
    };
    expect(retirementRequestSchema.safeParse(value).success).toBe(true);
    for (const field of ["effect_outcome", "approved_by", "skip_lease", "after_journal"])
      expect(
        retirementRequestSchema.safeParse({ ...value, [field]: "caller assertion" }).success,
      ).toBe(false);
    expect(retirementRequestSchema.safeParse({ ...value, task_id: "../escape" }).success).toBe(
      false,
    );
  });
});
