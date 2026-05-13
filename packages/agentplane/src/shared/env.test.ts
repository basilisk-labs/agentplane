import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveDotEnvRoot } from "./env.js";

describe("resolveDotEnvRoot", () => {
  it("uses git commondir instead of assuming the .git/worktrees path layout", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-dotenv-root-"));
    const repoRoot = path.join(root, "repo");
    const worktreeRoot = path.join(root, "worktree");
    const gitDir = path.join(root, "custom-admin", "linked-worktree");
    await mkdir(path.join(repoRoot, ".git"), { recursive: true });
    await mkdir(gitDir, { recursive: true });
    await mkdir(worktreeRoot, { recursive: true });
    await writeFile(path.join(worktreeRoot, ".git"), `gitdir: ${gitDir}\n`, "utf8");
    await writeFile(path.join(gitDir, "commondir"), path.join(repoRoot, ".git"), "utf8");

    await expect(resolveDotEnvRoot(worktreeRoot)).resolves.toBe(repoRoot);
  });
});
