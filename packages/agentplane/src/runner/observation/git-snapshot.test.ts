import { chmod, mkdir, mkdtemp, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  captureGitSnapshot,
  compareGitSnapshots,
  type GitSnapshotDelta,
  type GitSnapshotDeltaEntry,
} from "./git-snapshot.js";

const tempRoots: string[] = [];

afterEach(async () => {
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
