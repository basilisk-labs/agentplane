import type * as TaskBackend from "../../shared/task-backend.js";
import type * as ProviderBase from "./provider-base.js";
import type * as SyncSupport from "./sync-support.js";
import type { TaskData } from "../../../backends/task-backend.js";
import type { ObservedChangeRequest } from "./change-request-model.js";
import type * as ChangeRequestProvider from "./change-request-provider.js";
import type { GitHostIdentity } from "./git-host-identity.js";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";

const ports = vi.hoisted(() => ({
  task: vi.fn(),
  identity: vi.fn(),
  observe: vi.fn(),
  lookup: vi.fn(),
  update: vi.fn(),
  create: vi.fn(),
  now: vi.fn(),
  hostedBase: vi.fn(),
}));
vi.mock("../../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackend>()),
  loadBackendTask: ports.task,
}));
vi.mock("./provider-base.js", async (original) => ({
  ...(await original<typeof ProviderBase>()),
  resolveProviderBaseBranch: ports.hostedBase,
}));
vi.mock("./sync-support.js", async (original) => ({
  ...(await original<typeof SyncSupport>()),
  nowIso: ports.now,
}));
vi.mock("./change-request-provider.js", async (original) => ({
  ...(await original<typeof ChangeRequestProvider>()),
  resolveChangeRequestIdentity: ports.identity,
  observeExistingChangeRequestByBranch: ports.observe,
  tryLookupExistingChangeRequestByBranch: ports.lookup,
  tryUpdateChangeRequest: ports.update,
  tryCreateChangeRequest: ports.create,
}));

import { ensurePrArtifactsSynced, syncPrArtifacts } from "./sync.js";
import { requireCleanTaskWorktree } from "../../shared/task-worktree-cleanliness.js";

const exec = promisify(execFile);
const roots: string[] = [];
const taskId = "202610060950-C37KGK";
const branch = `task/${taskId}/sync`;
const files = ["meta.json", "diffstat.txt", "review.md", "github-title.txt", "github-body.md"];
async function git(root: string, ...args: string[]) {
  const result = await exec("git", args, { cwd: root });
  return result.stdout.trim();
}
async function fixture(provider: "github" | "gitlab" = "github") {
  const root = await mkdtemp(path.join(os.tmpdir(), "pr-frozen-sync-"));
  roots.push(root);
  await git(root, "init", "-b", "main");
  await git(root, "config", "user.name", "Fixture");
  await git(root, "config", "user.email", "fixture@example.com");
  await git(root, "config", "agentplane.baseBranch", "main");
  await writeFile(path.join(root, "source.ts"), "original\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "frozen base");
  const sha = await git(root, "rev-parse", "HEAD");
  await git(root, "checkout", "-b", branch);
  await writeFile(path.join(root, "source.ts"), "candidate\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "candidate implementation");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  const task: TaskData = {
    id: taskId,
    title: "Frozen base sync",
    description: "Preserve publication observations.",
    status: "DONE",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: [],
    extensions: { task_execution_context: { base_ref: sha, base_sha: sha } },
  };
  ports.task.mockResolvedValue({ task });
  const ctx = {
    resolvedProject: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
    config,
    taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask: vi.fn() },
  } as unknown as TaskBackend.CommandContext;
  const hostname = provider === "github" ? "github.com" : "gitlab.com";
  const identity: GitHostIdentity = {
    provider,
    hostname,
    remote: "origin",
    sourceProject: "owner/project",
    targetProject: "owner/project",
    sourceUrl: `https://${hostname}/owner/project.git`,
    targetUrl: `https://${hostname}/owner/project.git`,
  };
  const observed: ObservedChangeRequest = {
    provider,
    identity,
    prNumber: 12,
    prUrl: `https://${hostname}/owner/project/12`,
    status: "OPEN",
    base: "main",
    headSha: await git(root, "rev-parse", "HEAD"),
    mergedAt: null,
    mergeCommit: null,
  };
  ports.identity.mockResolvedValue(identity);
  ports.observe.mockImplementation(() => Promise.resolve({ state: "found", pr: observed }));
  ports.lookup.mockImplementation(() => observed);
  ports.update.mockImplementation(() => ({ observed }));
  ports.hostedBase.mockImplementation(() => observed.base);
  const options = { ctx, cwd: root, taskId, branch };
  const prDir = path.join(root, config.paths.workflow_dir, taskId, "pr");
  async function bytes(): Promise<Record<string, string>> {
    return Object.fromEntries<string>(
      await Promise.all(
        files.map(
          async (file): Promise<[string, string]> => [
            file,
            await readFile(path.join(prDir, file), "utf8"),
          ],
        ),
      ),
    );
  }
  return { root, sha, task, options, prDir, observed, bytes };
}
beforeEach(() => {
  vi.resetAllMocks();
  let clock = 0;
  ports.now.mockImplementation(() => new Date(Date.UTC(2026, 9, 6, 10, clock++)).toISOString());
});
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("real frozen-base PR artifact synchronization", () => {
  it.each(["github", "gitlab"] as const)(
    "keeps %s open/local/update/ensure bytes and actual worktree clean",
    async (provider) => {
      const f = await fixture(provider);
      const opened = await syncPrArtifacts({ ...f.options, mode: "open" });
      expect(opened.meta.base).toBe("main");
      expect(f.task.extensions?.task_execution_context).toEqual({
        base_ref: f.sha,
        base_sha: f.sha,
      });
      await git(f.root, "add", ".");
      await git(f.root, "commit", "-m", "published artifact fixture");
      const before = await f.bytes();
      const head = await git(f.root, "rev-parse", "HEAD");
      for (const mode of ["open", "update", "open", "update"] as const) {
        await syncPrArtifacts({
          ...f.options,
          mode,
          remoteMode: mode === "open" ? "sync-only" : "auto",
        });
        expect(await f.bytes()).toEqual(before);
        await expect(
          requireCleanTaskWorktree({ gitRoot: f.root, branch, taskId }),
        ).resolves.toMatchObject({ state: "clean" });
      }
      await ensurePrArtifactsSynced(f.options);
      expect(await f.bytes()).toEqual(before);
      expect(await git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(await git(f.root, "diff", "--cached")).toBe("");
      expect(ports.observe).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: "main" }));
      expect(ports.lookup).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: "main" }));
      // Advancing the moving provider branch must not replace the immutable diff basis.
      await git(f.root, "update-ref", "refs/heads/main", head);
      await syncPrArtifacts({ ...f.options, mode: "update" });
      expect(await f.bytes()).toEqual(before);
      await writeFile(path.join(f.root, "source.ts"), "dirty source\n");
      await expect(
        requireCleanTaskWorktree({ gitRoot: f.root, branch, taskId }),
      ).rejects.toMatchObject({ context: { reason_code: "task_worktree_dirty" } });
    },
  );

  it("persists a genuine configured target and observed link change once", async () => {
    const f = await fixture();
    const first = await syncPrArtifacts({ ...f.options, mode: "open" });
    await git(f.root, "branch", "release", f.sha);
    await git(f.root, "config", "agentplane.baseBranch", "release");
    f.observed.base = "release";
    f.observed.prUrl = "https://github.com/owner/project/pull/12";
    const changed = await syncPrArtifacts({ ...f.options, mode: "update" });
    expect(changed.meta.base).toBe("release");
    expect(changed.meta.pr_url).toBe(f.observed.prUrl);
    expect(changed.meta.updated_at).not.toBe(first.meta.updated_at);
    const after = await f.bytes();
    await syncPrArtifacts({ ...f.options, mode: "open" });
    await ensurePrArtifactsSynced(f.options);
    expect(await f.bytes()).toEqual(after);
  });

  it.each(["CLOSED", "MERGED"] as const)(
    "preserves existing %s handling and closure/verification evidence",
    async (status) => {
      const f = await fixture();
      const first = await syncPrArtifacts({ ...f.options, mode: "open" });
      const marker = { commit: "f".repeat(40) };
      const saved = {
        ...first.meta,
        pre_merge_closure: marker,
        verify: { status: "pass", commands: ["check"] },
        last_verified_at: first.meta.updated_at,
      };
      await writeFile(path.join(f.prDir, "meta.json"), JSON.stringify(saved));
      f.observed.status = status;
      if (status === "MERGED") {
        f.observed.mergedAt = "2026-10-06T12:00:00Z";
        f.observed.mergeCommit = "c".repeat(40);
      }
      ports.update.mockClear();
      const changed = await syncPrArtifacts({ ...f.options, mode: "update" });
      // Closed requests are deliberately not persisted as publication identity.
      expect(changed.meta.status).toBe(status === "CLOSED" ? "OPEN" : status);
      if (status === "CLOSED") expect(changed.meta.updated_at).toBe(first.meta.updated_at);
      else expect(changed.meta.updated_at).not.toBe(first.meta.updated_at);
      expect(changed.meta.pre_merge_closure).toEqual(marker);
      expect(changed.meta.verify).toEqual(saved.verify);
      const after = await f.bytes();
      await syncPrArtifacts({ ...f.options, mode: "open" });
      await syncPrArtifacts({ ...f.options, mode: "update" });
      expect(await f.bytes()).toEqual(after);
      expect(ports.update).not.toHaveBeenCalled();
    },
  );

  it("persists changed diffstat content against the frozen base and stabilizes again", async () => {
    const f = await fixture();
    const first = await syncPrArtifacts({ ...f.options, mode: "open" });
    const before = await f.bytes();
    await writeFile(path.join(f.root, "added.ts"), "new implementation\n");
    await git(f.root, "add", "added.ts");
    await git(f.root, "commit", "-m", "changed implementation fixture");
    const changed = await syncPrArtifacts({ ...f.options, mode: "update" });
    expect(changed.meta.diffstat_sha256).not.toBe(first.meta.diffstat_sha256);
    const after = await f.bytes();
    expect(after["diffstat.txt"]).not.toBe(before["diffstat.txt"]);
    expect(after["diffstat.txt"]).toContain("added.ts");
    await syncPrArtifacts({ ...f.options, mode: "open" });
    await ensurePrArtifactsSynced(f.options);
    expect(await f.bytes()).toEqual(after);
    expect(f.task.extensions?.task_execution_context).toEqual({ base_ref: f.sha, base_sha: f.sha });
  });

  it("renders the final observation when the provider update itself changes state", async () => {
    const f = await fixture();
    const first = await syncPrArtifacts({ ...f.options, mode: "open" });
    ports.update.mockImplementation(() => {
      f.observed.status = "MERGED";
      f.observed.mergedAt = "2026-10-06T12:00:00Z";
      f.observed.mergeCommit = "d".repeat(40);
      return { observed: f.observed };
    });
    const changed = await syncPrArtifacts({ ...f.options, mode: "update" });
    expect(changed.meta.updated_at).not.toBe(first.meta.updated_at);
    expect(changed.meta.status).toBe("MERGED");
    const after = await f.bytes();
    expect(after["github-body.md"]).toContain(changed.meta.updated_at);
    await syncPrArtifacts({ ...f.options, mode: "open" });
    expect(await f.bytes()).toEqual(after);
  });

  it("keeps a provider-free local packet stable and rejects recorded identity drift", async () => {
    const f = await fixture();
    ports.identity.mockRejectedValue(new Error("no publication remote"));
    await syncPrArtifacts({ ...f.options, mode: "open", remoteMode: "sync-only" });
    const local = await f.bytes();
    await syncPrArtifacts({ ...f.options, mode: "update" });
    expect(await f.bytes()).toEqual(local);
    expect(ports.hostedBase).not.toHaveBeenCalled();
    expect(ports.observe).not.toHaveBeenCalled();
    ports.identity.mockResolvedValue(f.observed.identity);
    await syncPrArtifacts({ ...f.options, mode: "open" });
    const linked = await f.bytes();
    ports.identity.mockRejectedValue(new Error("recorded provider identity mismatch"));
    for (const mode of ["open", "update"] as const) {
      await expect(syncPrArtifacts({ ...f.options, mode })).rejects.toThrow("identity mismatch");
      expect(await f.bytes()).toEqual(linked);
    }
  });
});
