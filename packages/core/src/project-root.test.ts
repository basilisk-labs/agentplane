import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { findGitRoot, resolveProject } from "./project-root.js";

async function mkTmpDir(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "agentplane-test-"));
}

test("findGitRoot returns null when no .git in parents", async () => {
  const root = await mkTmpDir();
  const nested = path.join(root, "a", "b");
  await mkdir(nested, { recursive: true });
  const gitRoot = await findGitRoot(nested);
  assert.equal(gitRoot, null);
});

test("findGitRoot finds directory containing .git", async () => {
  const root = await mkTmpDir();
  await mkdir(path.join(root, ".git"), { recursive: true });
  const nested = path.join(root, "a", "b");
  await mkdir(nested, { recursive: true });
  const gitRoot = await findGitRoot(nested);
  assert.equal(gitRoot, root);
});

test("findGitRoot supports worktree-style .git file", async () => {
  const root = await mkTmpDir();
  await writeFile(path.join(root, ".git"), "gitdir: /tmp/does-not-matter\n", "utf8");
  const nested = path.join(root, "x", "y");
  await mkdir(nested, { recursive: true });
  const gitRoot = await findGitRoot(nested);
  assert.equal(gitRoot, root);
});

test("resolveProject uses --root override when provided", async () => {
  const root = await mkTmpDir();
  await mkdir(path.join(root, ".git"), { recursive: true });
  const elsewhere = await mkTmpDir();
  const resolved = await resolveProject({ cwd: elsewhere, rootOverride: root });
  assert.equal(resolved.gitRoot, root);
  assert.equal(resolved.agentplaneDir, path.join(root, ".agentplane"));
});
