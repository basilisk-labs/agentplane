import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { findGitRoot, resolveProject } from "../index.js";

async function mkTmpDir(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "agentplane-test-"));
}

describe("project-root", () => {
  it("findGitRoot returns null when no .git in parents", async () => {
    const root = await mkTmpDir();
    const nested = path.join(root, "a", "b");
    await mkdir(nested, { recursive: true });
    const gitRoot = await findGitRoot(nested);
    expect(gitRoot).toBeNull();
  });

  it("findGitRoot finds directory containing .git", async () => {
    const root = await mkTmpDir();
    await mkdir(path.join(root, ".git"), { recursive: true });
    const nested = path.join(root, "a", "b");
    await mkdir(nested, { recursive: true });
    const gitRoot = await findGitRoot(nested);
    expect(gitRoot).toBe(root);
  });

  it("findGitRoot supports worktree-style .git file", async () => {
    const root = await mkTmpDir();
    await writeFile(path.join(root, ".git"), "gitdir: /tmp/does-not-matter\n", "utf8");
    const nested = path.join(root, "x", "y");
    await mkdir(nested, { recursive: true });
    const gitRoot = await findGitRoot(nested);
    expect(gitRoot).toBe(root);
  });

  it("resolveProject uses --root override when provided", async () => {
    const root = await mkTmpDir();
    await mkdir(path.join(root, ".git"), { recursive: true });
    const elsewhere = await mkTmpDir();
    const resolved = await resolveProject({ cwd: elsewhere, rootOverride: root });
    expect(resolved.gitRoot).toBe(root);
    expect(resolved.agentplaneDir).toBe(path.join(root, ".agentplane"));
  });

  it("resolveProject throws when no git root is found", async () => {
    const root = await mkTmpDir();
    await expect(resolveProject({ cwd: root })).rejects.toThrow(/Not a git repository/);
  });
});
