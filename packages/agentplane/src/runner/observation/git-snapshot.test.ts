import { chmod, mkdir, mkdtemp, realpath, rm, symlink, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";
import * as snapshots from "./git-snapshot.js";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  captureGitSnapshot,
  compareGitSnapshots,
  projectGitSnapshot,
  type GitSnapshotDelta,
  type GitSnapshotDeltaEntry,
} from "./git-snapshot.js";

import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { observeKernelRepository, kernelRepositoryChangedPaths } from "./kernel-repository.js";

const tempRoots: string[] = [];

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function git(root: string, args: readonly string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, {
    cwd: root,
    env: gitEnv(),
  });
  return String(stdout).trim();
}

async function writeRepoFile(root: string, relativePath: string, contents: string): Promise<void> {
  const absolutePath = path.join(root, ...relativePath.split("/"));
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, contents, "utf8");
}

async function createRepository(files?: Record<string, string>): Promise<string> {
  const seedFiles = files ?? { "tracked.txt": "base\n" };
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-snapshot-"));
  tempRoots.push(root);
  await git(root, ["init", "-q", "-b", "main"]);
  await git(root, ["config", "user.email", "agentplane@example.com"]);
  await git(root, ["config", "user.name", "AgentPlane"]);
  for (const [relativePath, contents] of Object.entries(seedFiles)) {
    await writeRepoFile(root, relativePath, contents);
  }
  await git(root, ["add", "--", ...Object.keys(seedFiles)]);
  await git(root, ["commit", "-q", "-m", "seed"]);
  return root;
}

function entry(delta: GitSnapshotDelta, entryPath: string): GitSnapshotDeltaEntry {
  const found = delta.entries.find((candidate) => candidate.path === entryPath);
  expect(found, `missing delta entry for ${entryPath}`).toBeDefined();
  return found!;
}

function expectSha256(value: string | null): void {
  expect(value).toMatch(/^sha256:[0-9a-f]{64}$/u);
}

describe("Git execution snapshot observation", () => {
  it("attributes clean tracked modifications and unreported untracked writes", async () => {
    const root = await createRepository();
    const before = await captureGitSnapshot({ repository_root: root });

    await writeRepoFile(root, "tracked.txt", "changed\n");
    await writeRepoFile(root, "unreported.txt", "agent output\n");

    const after = await captureGitSnapshot({ repository_root: root });
    const delta = await compareGitSnapshots({
      repository_root: root,
      before,
      after,
    });

    expect(before.state, JSON.stringify(before.errors)).toBe("available");
    expect(after.state, JSON.stringify(after.errors)).toBe("available");
    expect(delta.state, JSON.stringify(delta.errors)).toBe("available");
    expect(delta.changed_paths).toEqual(["tracked.txt", "unreported.txt"]);

    const tracked = entry(delta, "tracked.txt");
    expect(tracked.change).toBe("modified");
    expect(tracked.change_kinds).toEqual(expect.arrayContaining(["content", "status"]));
    expectSha256(tracked.before_sha256);
    expectSha256(tracked.after_sha256);
    expect(tracked.before_sha256).not.toBe(tracked.after_sha256);

    const unreported = entry(delta, "unreported.txt");
    expect(unreported.change).toBe("added");
    expect(unreported.before_sha256).toBeNull();
    expectSha256(unreported.after_sha256);
  });

  it("ignores unchanged pre-existing dirt but detects subsequent tracked and untracked edits", async () => {
    const root = await createRepository();
    await writeRepoFile(root, "tracked.txt", "pre-existing dirty\n");
    await writeRepoFile(root, "pre-existing-untracked.txt", "pre-existing untracked\n");

    const before = await captureGitSnapshot({ repository_root: root });
    const unchangedAfter = await captureGitSnapshot({ repository_root: root });
    const unchangedDelta = await compareGitSnapshots({
      repository_root: root,
      before,
      after: unchangedAfter,
    });

    expect(unchangedDelta.state).toBe("available");
    expect(unchangedDelta.changed_paths).toEqual([]);
    expect(unchangedDelta.entries).toEqual([]);
    expect(before.snapshot_sha256).toBe(unchangedAfter.snapshot_sha256);

    await writeRepoFile(root, "tracked.txt", "episode changed dirty file\n");
    await writeRepoFile(root, "pre-existing-untracked.txt", "episode changed untracked file\n");
    const changedAfter = await captureGitSnapshot({ repository_root: root });
    const changedDelta = await compareGitSnapshots({
      repository_root: root,
      before,
      after: changedAfter,
    });

    expect(changedDelta.changed_paths).toEqual(["pre-existing-untracked.txt", "tracked.txt"]);
    expect(entry(changedDelta, "tracked.txt").change_kinds).toContain("content");
    expect(entry(changedDelta, "pre-existing-untracked.txt").change_kinds).toContain("content");
  });

  it("records deletion and rename as structured deltas", async () => {
    const root = await createRepository({
      "deleted.txt": "remove me\n",
      "rename-source.txt": "rename me\n",
    });
    const before = await captureGitSnapshot({ repository_root: root });

    await unlink(path.join(root, "deleted.txt"));
    await git(root, ["mv", "--", "rename-source.txt", "rename-destination.txt"]);

    const after = await captureGitSnapshot({ repository_root: root });
    const delta = await compareGitSnapshots({
      repository_root: root,
      before,
      after,
    });

    expect(delta.state).toBe("available");
    expect(delta.changed_paths).toEqual([
      "deleted.txt",
      "rename-destination.txt",
      "rename-source.txt",
    ]);
    const deleted = entry(delta, "deleted.txt");
    expect(deleted.change).toBe("deleted");
    expectSha256(deleted.before_sha256);
    expect(deleted.after_sha256).toBeNull();

    const renamed = entry(delta, "rename-destination.txt");
    expect(renamed.change).toBe("renamed");
    expect(renamed.original_path).toBe("rename-source.txt");
    expectSha256(renamed.before_sha256);
    expect(renamed.before_sha256).toBe(renamed.after_sha256);
  });

  it("observes committed HEAD transitions even when the worktree is clean afterwards", async () => {
    const root = await createRepository();
    const before = await captureGitSnapshot({ repository_root: root });

    await writeRepoFile(root, "tracked.txt", "committed episode change\n");
    await git(root, ["add", "--", "tracked.txt"]);
    await git(root, ["commit", "-q", "-m", "episode commit"]);

    const after = await captureGitSnapshot({ repository_root: root });
    const delta = await compareGitSnapshots({
      repository_root: root,
      before,
      after,
    });

    expect(after.dirty_paths).toEqual([]);
    expect(delta.state).toBe("available");
    expect(delta.head_changed).toBe(true);
    expect(delta.before.head_commit).not.toBe(delta.after.head_commit);
    expect(delta.head_changes).toEqual([
      {
        status_code: "M",
        path: "tracked.txt",
        original_path: null,
      },
    ]);
    const committed = entry(delta, "tracked.txt");
    expect(committed.change_kinds).toContain("head");
    expect(committed.before_sha256).not.toBe(committed.after_sha256);
  });

  it("detects index-only mode changes without inventing a content change", async () => {
    const root = await createRepository();
    await chmod(path.join(root, "tracked.txt"), 0o644);
    const before = await captureGitSnapshot({ repository_root: root });

    await git(root, ["update-index", "--chmod=+x", "--", "tracked.txt"]);

    const after = await captureGitSnapshot({ repository_root: root });
    const delta = await compareGitSnapshots({
      repository_root: root,
      before,
      after,
    });
    const indexed = entry(delta, "tracked.txt");

    expect(delta.state).toBe("available");
    expect(indexed.change).toBe("index");
    expect(indexed.change_kinds).toContain("index");
    expect(indexed.change_kinds).not.toContain("content");
    expect(indexed.before_sha256).toBe(indexed.after_sha256);
    expect(indexed.before.index_entries[0]?.mode).toBe("100644");
    expect(indexed.after.index_entries[0]?.mode).toBe("100755");
  });

  it("excludes supervisor run artifacts and produces deterministic sorted digests", async () => {
    const root = await createRepository();
    const runDir = path.join(root, ".agentplane", "tasks", "T-1", "runs", "R-1");
    const excluded = [runDir];
    const before = await captureGitSnapshot({
      repository_root: root,
      excluded_roots: excluded,
    });

    await writeRepoFile(root, ".agentplane/tasks/T-1/runs/R-1/trace.jsonl", "{}\n");
    await writeRepoFile(root, "z-output.txt", "z\n");
    await writeRepoFile(root, "a-output.txt", "a\n");

    const after = await captureGitSnapshot({
      repository_root: root,
      excluded_roots: excluded,
    });
    const repeatedAfter = await captureGitSnapshot({
      repository_root: root,
      excluded_roots: excluded,
    });
    const delta = await compareGitSnapshots({
      repository_root: root,
      before,
      after,
      excluded_roots: excluded,
    });
    const repeatedDelta = await compareGitSnapshots({
      repository_root: root,
      before,
      after: repeatedAfter,
      excluded_roots: excluded,
    });

    expect(after.state).toBe("available");
    expect(after.excluded_paths).toEqual([".agentplane/tasks/T-1/runs/R-1"]);
    expect(after.dirty_paths).toEqual(["a-output.txt", "z-output.txt"]);
    expect(after.snapshot_sha256).toBe(repeatedAfter.snapshot_sha256);
    expect(delta.changed_paths).toEqual(["a-output.txt", "z-output.txt"]);
    expect(delta.sha256).toBe(repeatedDelta.sha256);
    expect(delta.changed_paths).not.toContain(".agentplane/tasks/T-1/runs/R-1/trace.jsonl");
    expectSha256(delta.sha256);
  });

  it("projects one complete observation into independently excluded semantic views", async () => {
    const root = await createRepository();
    await writeRepoFile(root, ".agentplane/tasks/T-1/README.md", "task state\n");
    await writeRepoFile(root, "source.ts", "export {};\n");

    const complete = await captureGitSnapshot({
      repository_root: root,
      trusted_repository_root: true,
    });
    const taskExcluded = projectGitSnapshot(complete, [".agentplane/tasks/T-1"]);
    const sourceExcluded = projectGitSnapshot(complete, ["source.ts"]);

    expect(complete.dirty_paths).toEqual([".agentplane/tasks/T-1/README.md", "source.ts"]);
    expect(taskExcluded.dirty_paths).toEqual(["source.ts"]);
    expect(sourceExcluded.dirty_paths).toEqual([".agentplane/tasks/T-1/README.md"]);
    expect(taskExcluded.head_commit).toBe(complete.head_commit);
    expect(taskExcluded.captured_at).toBe(complete.captured_at);
    expect(taskExcluded.snapshot_sha256).not.toBe(complete.snapshot_sha256);
    expect(sourceExcluded.snapshot_sha256).not.toBe(taskExcluded.snapshot_sha256);
  });

  it("accepts a route-preobserved HEAD without changing the snapshot contract", async () => {
    const root = await createRepository();
    const head = await git(root, ["rev-parse", "HEAD"]);

    const snapshot = await captureGitSnapshot({
      repository_root: root,
      trusted_repository_root: true,
      preobserved_head_commit: head,
    });

    expect(snapshot.state).toBe("available");
    expect(snapshot.head_commit).toBe(head);
    expectSha256(snapshot.snapshot_sha256);
  });

  it("returns unavailable evidence instead of throwing outside a Git repository", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-snapshot-non-repo-"));
    tempRoots.push(root);

    const snapshot = await captureGitSnapshot({ repository_root: root });

    expect(snapshot.state).toBe("unavailable");
    expect(snapshot.snapshot_sha256).toBeNull();
    expect(snapshot.errors).toHaveLength(1);
    expect(snapshot.errors[0]?.operation).toBe("git_root");
  });
});

describe("canonical implementation identity", () => {
  const identity = k.kernelDigest("logical-repository");
  const observe = (root: string) =>
    observeKernelRepository({
      repository_root: root,
      repository_identity: identity,
      operational_paths: [".agentplane/tasks", ".agentplane/tasks.json"],
    });

  async function addSubmodule(root: string, source: string, name = "module"): Promise<string> {
    await git(root, ["-c", "protocol.file.allow=always", "submodule", "add", "-q", source, name]);
    await git(root, ["commit", "-qm", "add submodule"]);
    return path.join(root, name);
  }

  it("separates expected gitlink identity from actual clean HEAD", async () => {
    const source = await createRepository();
    const root = await createRepository();
    const module = await addSubmodule(root, source);
    const expected = await git(module, ["rev-parse", "HEAD"]);
    const clean = await observe(root);
    expect(clean.files.find((file) => file.path === "module")).toMatchObject({
      kind: "submodule",
      expected_gitlink_sha: expected,
      actual_head_sha: expected,
      initialized: true,
      tracked_dirty: false,
      untracked_dirty: false,
    });
    expect((await observe(root)).fingerprint).toBe(clean.fingerprint);
    await git(module, [
      "-c",
      "user.name=AgentPlane",
      "-c",
      "user.email=agentplane@example.com",
      "commit",
      "--allow-empty",
      "-qm",
      "different HEAD",
    ]);
    const different = await observe(root);
    expect(different.files.find((file) => file.path === "module")).toMatchObject({
      expected_gitlink_sha: expected,
      actual_head_sha: await git(module, ["rev-parse", "HEAD"]),
      tracked_dirty: false,
      untracked_dirty: false,
    });
    expect(kernelRepositoryChangedPaths(clean, different)).toEqual(["module"]);
    await git(root, ["add", "module"]);
    const staged = await observe(root);
    expect(staged.fingerprint).not.toBe(different.fingerprint);
    await git(root, ["commit", "-qm", "record gitlink"]);
    expect((await observe(root)).fingerprint).toBe(staged.fingerprint);
  });

  it("fingerprints repeated tracked, hidden and untracked submodule writes", async () => {
    const root = await createRepository();
    const module = await addSubmodule(root, await createRepository());
    const clean = await observe(root);
    await writeRepoFile(module, "tracked.txt", "dirty");
    const dirty = await observe(root);
    expect(dirty.files.find((file) => file.path === "module")).toMatchObject({
      tracked_dirty: true,
      untracked_dirty: false,
    });
    expect(kernelRepositoryChangedPaths(clean, dirty)).toEqual(["module"]);
    await writeRepoFile(module, "tracked.txt", "different dirty");
    const repeated = await observe(root);
    expect(repeated.fingerprint).not.toBe(dirty.fingerprint);
    await git(module, ["update-index", "--assume-unchanged", "tracked.txt"]);
    const hidden = await observe(root);
    await writeRepoFile(module, "tracked.txt", "hidden dirty");
    expect((await observe(root)).fingerprint).not.toBe(hidden.fingerprint);
    await writeRepoFile(module, "untracked.txt", "first");
    const untracked = await observe(root);
    expect(untracked.files.find((file) => file.path === "module")).toMatchObject({
      untracked_dirty: true,
    });
    await writeRepoFile(module, "untracked.txt", "second");
    expect((await observe(root)).fingerprint).not.toBe(untracked.fingerprint);
  });

  it("represents uninitialized submodules without claiming an observed working tree", async () => {
    const root = await createRepository();
    const module = await addSubmodule(root, await createRepository());
    const initialized = await observe(root);
    const expected = await git(module, ["rev-parse", "HEAD"]);
    await git(root, ["submodule", "deinit", "-f", "--", "module"]);
    const empty = await observe(root);
    expect(empty.files.find((file) => file.path === "module")).toEqual({
      path: "module",
      kind: "submodule",
      expected_gitlink_sha: expected,
      actual_head_sha: null,
      initialized: false,
      tracked_dirty: null,
      untracked_dirty: null,
      working_state: null,
    });
    expect(kernelRepositoryChangedPaths(initialized, empty)).toEqual(["module"]);
    await rm(module, { recursive: true });
    expect((await observe(root)).fingerprint).toBe(empty.fingerprint);
    await git(root, [
      "-c",
      "protocol.file.allow=always",
      "submodule",
      "update",
      "--init",
      "module",
    ]);
    expect((await observe(root)).fingerprint).toBe(initialized.fingerprint);
  });

  it("recursively observes nested submodule checkout and content changes", async () => {
    const source = await createRepository();
    await addSubmodule(source, await createRepository(), "nested");
    const root = await createRepository();
    const module = await addSubmodule(root, source);
    const uninitialized = await observe(root);
    await git(root, [
      "-c",
      "protocol.file.allow=always",
      "submodule",
      "update",
      "--init",
      "--recursive",
    ]);
    const initialized = await observe(root);
    expect(initialized.fingerprint).not.toBe(uninitialized.fingerprint);
    await writeRepoFile(path.join(module, "nested"), "tracked.txt", "nested change");
    const dirty = await observe(root);
    expect(kernelRepositoryChangedPaths(initialized, dirty)).toEqual(["module"]);
    await writeRepoFile(path.join(module, "nested"), "tracked.txt", "another nested change");
    expect((await observe(root)).fingerprint).not.toBe(dirty.fingerprint);
  });

  it("fails closed for populated uninitialized paths and invalid Git metadata", async () => {
    const root = await createRepository();
    const module = await addSubmodule(root, await createRepository());
    await git(root, ["submodule", "deinit", "-f", "--", "module"]);
    await writeRepoFile(module, "unknown.txt", "unobserved content");
    await expect(observe(root)).rejects.toMatchObject({
      reason_code: "uninitialized_submodule_has_content",
    });
    await writeRepoFile(module, ".git", "gitdir: missing-git-directory\n");
    await expect(observe(root)).rejects.toThrow();
  });

  it("rejects symlink submodule checkouts and respects explicitly excluded submodules", async () => {
    const root = await createRepository();
    const source = await createRepository();
    const module = await addSubmodule(root, source);
    const excluded = await observeKernelRepository({
      repository_root: root,
      repository_identity: identity,
      operational_paths: ["module"],
    });
    expect(excluded.files.some((file) => file.path === "module")).toBe(false);
    await writeRepoFile(module, "tracked.txt", "excluded change");
    expect(
      (
        await observeKernelRepository({
          repository_root: root,
          repository_identity: identity,
          operational_paths: ["module"],
        })
      ).fingerprint,
    ).toBe(excluded.fingerprint);
    await rm(module, { recursive: true });
    await symlink(source, module);
    await expect(observe(root)).rejects.toThrow();
  });

  it("refuses a submodule that changes between the two complete observations", async () => {
    const root = await createRepository();
    const module = await addSubmodule(root, await createRepository());
    const canonicalModule = await realpath(module);
    const capture = snapshots.captureGitSnapshot;
    let changed = false;
    vi.spyOn(snapshots, "captureGitSnapshot").mockImplementation(async (input) => {
      const snapshot = await capture(input);
      if (!changed && input.repository_root === canonicalModule) {
        changed = true;
        await writeRepoFile(module, "tracked.txt", "concurrent change");
      }
      return snapshot;
    });
    await expect(observe(root)).rejects.toMatchObject({
      reason_code: "repository_changed_during_observation",
    });
  });

  it("keeps content identity across staging, commits and native evidence writes", async () => {
    const root = await createRepository();
    const before = await observe(root);
    await writeRepoFile(root, ".agentplane/tasks/T/README.md", "result received");
    await writeRepoFile(root, ".agentplane/tasks.json", "revision 2");
    await git(root, ["add", "."]);
    await git(root, ["commit", "-qm", "native evidence"]);
    const observation1 = await observe(root);
    expect(observation1.fingerprint).toBe(before.fingerprint);
    await writeRepoFile(root, "tracked.txt", "implementation");
    const dirty = await observe(root);
    expect(kernelRepositoryChangedPaths(before, dirty)).toEqual(["tracked.txt"]);
    await git(root, ["add", "."]);
    const observation2 = await observe(root);
    expect(observation2.fingerprint).toBe(dirty.fingerprint);
    await git(root, ["commit", "-qm", "implementation"]);
    const observation3 = await observe(root);
    expect(observation3.fingerprint).toBe(dirty.fingerprint);
  });

  it("detects repeated dirty writes, hidden tracked writes, executable bits and deleted files", async () => {
    const root = await createRepository();
    const before = await observe(root);
    await git(root, ["update-index", "--assume-unchanged", "tracked.txt"]);
    await writeRepoFile(root, "tracked.txt", "changed");
    const changed = await observe(root);
    expect(changed.fingerprint).not.toBe(before.fingerprint);
    await writeRepoFile(root, "tracked.txt", "another");
    const repeated = await observe(root);
    expect(repeated.fingerprint).not.toBe(changed.fingerprint);
    await chmod(path.join(root, "tracked.txt"), 0o755);
    const executable = await observe(root);
    expect(executable.fingerprint).not.toBe(repeated.fingerprint);
    await unlink(path.join(root, "tracked.txt"));
    const deleted = await observe(root);
    expect(kernelRepositoryChangedPaths(executable, deleted)).toEqual(["tracked.txt"]);
  });

  it("observes a symlink target without following it and refuses escaping tracked parents", async () => {
    const outside = await createRepository({ "private.txt": "not an implementation input" });
    const root = await createRepository({ "dir/private.txt": "source" });
    await symlink(path.join(outside, "private.txt"), path.join(root, "link"));
    const first = await observe(root);
    await writeRepoFile(outside, "private.txt", "different private data");
    const observation4 = await observe(root);
    expect(observation4.fingerprint).toBe(first.fingerprint);
    await rm(path.join(root, "dir"), { recursive: true });
    await symlink(outside, path.join(root, "dir"));
    await expect(observe(root)).rejects.toMatchObject({ reason_code: "git_observation_failed" });
  });
});
