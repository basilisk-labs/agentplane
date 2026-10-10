import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { readPinnedReviewedBaseOrder } from "./kernel-reviewed-base-import.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "reviewed-base-discovery-"));
  roots.push(root);
  const validation = path.join(root, "0".repeat(64));
  const selected = path.join(root, "f".repeat(64));
  await mkdir(validation);
  await mkdir(selected);
  await writeFile(path.join(validation, "final-validation.json"), '{"status":"failed"}');
  const raw = { work_order_id: "retained-order", objective: "unchanged" };
  const file = path.join(selected, "work-order.json");
  await writeFile(file, JSON.stringify(raw));
  return { root, validation, selected, file, raw, digest: k.kernelDigest(raw) };
}
describe("reviewed base exchange discovery", () => {
  it("skips a final-validation-only exchange and selects exact pinned bytes", async () => {
    const f = await fixture();
    expect(await readPinnedReviewedBaseOrder(f.root, f.digest)).toEqual({
      raw: f.raw,
      selectedPath: f.file,
    });
  });
  it("rejects absent pinned evidence instead of selecting another WorkOrder", async () => {
    const f = await fixture();
    await expect(readPinnedReviewedBaseOrder(f.root, k.kernelDigest("missing"))).rejects.toThrow(
      "pinned WorkOrder is unavailable",
    );
  });
  it("rejects malformed WorkOrder files", async () => {
    const f = await fixture();
    await writeFile(path.join(f.validation, "work-order.json"), "{");
    await expect(readPinnedReviewedBaseOrder(f.root, f.digest)).rejects.toThrow(SyntaxError);
  });
  it("rejects symlinked WorkOrder files", async () => {
    const f = await fixture();
    await symlink(f.file, path.join(f.validation, "work-order.json"));
    await expect(readPinnedReviewedBaseOrder(f.root, f.digest)).rejects.toThrow();
  });
  it("rejects non-regular WorkOrder paths", async () => {
    const f = await fixture();
    await mkdir(path.join(f.validation, "work-order.json"));
    await expect(readPinnedReviewedBaseOrder(f.root, f.digest)).rejects.toThrow();
  });
});
