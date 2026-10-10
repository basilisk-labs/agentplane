import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { nativeCandidateFixture } from "@agentplane/testkit/task";
import { readCandidateContext } from "./candidate-publication-context.js";
vi.mock("./kernel-runtime-context.js", () => ({ createKernelRuntime: vi.fn() }));
const roots: string[] = [];
afterEach(() => {
  vi.clearAllMocks();
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
function fixture(expiresAt: string | null = null) {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-context-"));
  roots.push(root);
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  const f = nativeCandidateFixture(root, "a".repeat(40), expiresAt);
  const file = path.join(
    root,
    ".git/agentplane/kernel/exchanges",
    f.record.aggregate.id,
    "a".repeat(64),
    "work-order.json",
  );
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(f.raw));
  vi.mocked(createKernelRuntime).mockResolvedValue({
    adapter: {
      read: () =>
        Promise.resolve({
          kind: "canonical",
          record: f.record,
          task: { id: f.record.aggregate.id, extensions: {} },
        }),
    },
  } as never);
  const command = { resolvedProject: { gitRoot: root }, memo: {} } as CommandContext;
  const read = (revokeOnly = false) =>
    readCandidateContext(command, f.record.aggregate.id, f.pins.work_order_digest, revokeOnly);
  return { ...f, file, read };
}
it("loads exact retained WorkOrder and current record without lifecycle mutation", async () => {
  const f = fixture();
  const context = await f.read();
  expect(context.record).toBe(f.record);
  expect(context.raw).toEqual(f.raw);
  expect(context.fingerprint.digest).toBe(f.raw.state_fingerprint.digest);
});
it("rejects changed retained bytes before dispatch", async () => {
  const f = fixture();
  writeFileSync(f.file, JSON.stringify({ ...f.raw, task: { ...f.raw.task, revision: 99 } }));
  await expect(f.read()).rejects.toThrow("unavailable");
});
it("rejects stale attempt for publication but permits revoking its retained grant", async () => {
  const f = fixture();
  f.record.aggregate.work_items.build.result_digest = k.kernelDigest("result");
  await expect(f.read()).rejects.toThrow("current canonical attempt");
  await expect(f.read(true)).resolves.toMatchObject({ raw: f.raw });
});
it("rejects expired native authority even with an otherwise authenticated live order", async () => {
  const f = fixture("2000-01-01T00:00:00.000Z");
  await expect(f.read()).rejects.toThrow("expired");
  await expect(f.read(true)).resolves.toMatchObject({ raw: f.raw });
});
