import { lstat, unlink } from "node:fs/promises";
import path from "node:path";

export const WORKTREE_INSTALL_LAYOUT_LINKS = [
  "node_modules",
  path.join("packages", "core", "node_modules"),
  path.join("packages", "agentplane", "node_modules"),
  path.join("website", "node_modules"),
  "agentplane-recipes",
] as const;

export async function unlinkWorktreeInstallLayout(worktreePath: string): Promise<void> {
  for (const relativePath of WORKTREE_INSTALL_LAYOUT_LINKS) {
    const linkPath = path.join(worktreePath, relativePath);
    const stats = await lstat(linkPath).catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!stats?.isSymbolicLink()) continue;
    await unlink(linkPath);
  }
}
