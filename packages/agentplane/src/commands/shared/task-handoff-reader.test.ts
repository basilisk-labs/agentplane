import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type * as CoreGit from "@agentplaneorg/core/git";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readTaskHandoffForTask } from "./task-handoff-reader.js";
import { buildTaskHandoffArtifact, type TaskHandoffArtifact } from "./task-handoff.js";

const mocks = vi.hoisted(() => ({ findWorktreeForBranch: vi.fn() }));
vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreGit>()),
  findWorktreeForBranch: mocks.findWorktreeForBranch,
}));

const taskId = "202608272129-READ01";
let root: string;
let base: string;
let worktree: string;
const artifactPath = (checkout: string): string =>
  path.join(checkout, ".agentplane/tasks", taskId, "handoff/latest.json");
const protectedHandoff = (): TaskHandoffArtifact =>
  buildTaskHandoffArtifact({
    task_id: taskId,
    created_at: "2026-08-27T00:00:00.000Z",
    from_role: "INTEGRATOR",
    reason: "Protected integration needs provider recovery.",
    branch: `task/${taskId}/repair`,
    pr_branch: `task/${taskId}/repair`,
    base_branch: "main",
    head_sha: "a".repeat(40),
    route: { kind: "protected_base_integrate", status: "awaiting_github_merge", pr_number: 123 },
  });

async function write(checkout: string, value: unknown): Promise<void> {
  const target = artifactPath(checkout);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(value), "utf8");
}

const read = (mode: "direct" | "branch_pr" = "branch_pr") =>
  readTaskHandoffForTask({
    gitRoot: worktree,
    workflowDir: ".agentplane/tasks",
    taskId,
    workflowMode: mode,
    baseBranch: "main",
  });

beforeEach(async () => {
  root = await mkdtemp(path.join(os.tmpdir(), "agentplane-handoff-owner-"));
  base = path.join(root, "base");
  worktree = path.join(root, "task");
  await Promise.all([mkdir(base), mkdir(worktree)]);
  mocks.findWorktreeForBranch.mockReset().mockResolvedValue(base);
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("task handoff owner readback", () => {
  it("recovers the base-owned legacy handoff without copying or changing it", async () => {
    const handoff = protectedHandoff();
    delete handoff.route!.provider_base_sha;
    await write(base, handoff);
    const before = await readFile(artifactPath(base), "utf8");
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const observed = await read();
      expect(observed).toEqual(handoff);
      expect(observed?.route).not.toHaveProperty("provider_base_sha");
    }
    expect(mocks.findWorktreeForBranch).toHaveBeenCalledWith(worktree, "main");
    expect(await readFile(artifactPath(base), "utf8")).toBe(before);
    expect(await readdir(worktree)).toEqual([]);
  });

  it("keeps local runner hints unless protected integration owns the handoff", async () => {
    const local = buildTaskHandoffArtifact({
      task_id: taskId,
      created_at: "2026-08-26T00:00:00.000Z",
      from_role: "CODER",
      reason: "Resume a local runner.",
    });
    await write(worktree, local);
    expect(await read()).toEqual(local);
    await write(base, protectedHandoff());
    const observed = await read();
    expect(observed?.from_role).toBe("INTEGRATOR");
    expect(await read("direct")).toEqual(local);
    expect(JSON.parse(await readFile(artifactPath(worktree), "utf8"))).toEqual(local);
  });

  it("does not adopt an unrelated generic handoff from the base checkout", async () => {
    await write(
      base,
      buildTaskHandoffArtifact({
        task_id: taskId,
        created_at: "2026-08-27T00:00:00.000Z",
        from_role: "CODER",
        reason: "Local base runner hint.",
      }),
    );
    expect(await read()).toBeNull();
  });

  it.each(["base", "local"])("rejects another task in the %s artifact", async (location) => {
    await write(location === "base" ? base : worktree, {
      ...protectedHandoff(),
      task_id: "202608272129-OTHER1",
    });
    await expect(read()).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it.each(["role", "base"])(
    "rejects a protected artifact with a mismatched %s owner",
    async (field) => {
      const handoff = protectedHandoff();
      if (field === "role") handoff.from_role = "CODER";
      else handoff.base_branch = "other";
      await write(base, handoff);
      await expect(read()).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it.each(["role", "branch", "pr-branch", "base", "head", "pr", "provider", "provider-base"])(
    "rejects ambiguous protected %s identities",
    async (field) => {
      const local = protectedHandoff();
      if (field === "role") local.from_role = "CODER";
      if (field === "branch") local.branch = `task/${taskId}/other`;
      if (field === "pr-branch") local.pr_branch = `task/${taskId}/other`;
      if (field === "base") local.base_branch = "other";
      if (field === "head") local.head_sha = "b".repeat(40);
      if (field === "pr") local.route!.pr_number = 456;
      if (field === "provider") local.route!.provider = "github";
      if (field === "provider-base") local.route!.provider_base_sha = null;
      await write(base, protectedHandoff());
      await write(worktree, local);
      await expect(read()).rejects.toMatchObject({ code: "E_VALIDATION" });
    },
  );

  it("rejects malformed owner evidence instead of falling back to a local hint", async () => {
    await write(base, { task_id: taskId, route: { kind: "protected_base_integrate" } });
    await expect(read()).rejects.toThrow();
  });

  it("accepts matching protected identities without copying over either artifact", async () => {
    const local = { ...protectedHandoff(), created_at: "2026-08-26T00:00:00.000Z" };
    await write(worktree, local);
    await write(base, protectedHandoff());
    expect(await read()).toEqual(protectedHandoff());
    expect(JSON.parse(await readFile(artifactPath(worktree), "utf8"))).toEqual(local);
  });

  it("reads a protected artifact when the caller is already on its owner", async () => {
    await write(worktree, protectedHandoff());
    mocks.findWorktreeForBranch.mockResolvedValue(worktree);
    expect(await read()).toEqual(protectedHandoff());
  });
});
