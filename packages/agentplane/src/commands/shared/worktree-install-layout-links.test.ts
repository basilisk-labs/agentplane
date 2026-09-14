import { lstat, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { unlinkWorktreeInstallLayout } from "./worktree-install-layout-links.js";

describe("worktree install-layout links", () => {
  it("unlinks materialized dependency directories without deleting their targets", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-links-"));
    const worktreePath = path.join(root, "worktree");
    const targetPath = path.join(root, "shared-node-modules");
    const targetMarker = path.join(targetPath, "keep.txt");
    const linkPath = path.join(worktreePath, "node_modules");
    const regularPath = path.join(worktreePath, "website", "node_modules");
    const regularMarker = path.join(regularPath, "keep.txt");

    try {
      await mkdir(targetPath, { recursive: true });
      await mkdir(regularPath, { recursive: true });
      await writeFile(targetMarker, "shared dependencies\n", "utf8");
      await writeFile(regularMarker, "worktree dependencies\n", "utf8");
      await symlink(targetPath, linkPath, process.platform === "win32" ? "junction" : "dir");

      await unlinkWorktreeInstallLayout(worktreePath);

      await expect(lstat(linkPath)).rejects.toMatchObject({ code: "ENOENT" });
      await expect(readFile(targetMarker, "utf8")).resolves.toBe("shared dependencies\n");
      await expect(readFile(regularMarker, "utf8")).resolves.toBe("worktree dependencies\n");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
