import { createHash } from "node:crypto";
import { lstat, readdir, readlink } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";

/** Observe protected task artifacts without following links outside the task directory. */
export async function captureExternalTaskArtifacts(
  checkout: string,
  taskId: string,
): Promise<Record<string, string>> {
  const root = path.join(checkout, ".agentplane", "tasks", taskId);
  for (const parent of [path.join(checkout, ".agentplane"), path.dirname(root), root]) {
    try {
      const parentStat = await lstat(parent);
      if (!parentStat.isDirectory()) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "Task artifact root is not a directory.",
        });
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
      throw error;
    }
  }
  const entries: Record<string, string> = {};
  async function visit(directory: string): Promise<void> {
    const names = await readdir(directory);
    for (const name of names.toSorted()) {
      const file = path.join(directory, name);
      const relative = path.relative(root, file).replaceAll("\\", "/");
      const stat = await lstat(file, { bigint: true });
      if (stat.isDirectory()) {
        entries[relative] = `directory:${stat.mode & 0o777n}`;
        await visit(file);
      } else if (stat.isFile() || stat.isSymbolicLink()) {
        const bytes = stat.isSymbolicLink()
          ? await readlink(file)
          : await readStableRegularFileNoFollow(file, "task artifact", {
              expected_identity: { dev: stat.dev, ino: stat.ino },
            });
        entries[relative] =
          `${stat.isSymbolicLink() ? "link" : "file"}:${stat.mode & 0o777n}:${createHash("sha256").update(bytes).digest("hex")}`;
      } else {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Unsupported task artifact: ${relative}`,
        });
      }
    }
  }
  await visit(root);
  return entries;
}
