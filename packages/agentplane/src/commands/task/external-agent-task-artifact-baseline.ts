import { createHash } from "node:crypto";
import { lstat, readdir, readlink } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import {
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";

/** Observe protected task artifacts without following links outside the task directory. */
export async function captureExternalTaskArtifacts(
  checkout: string,
  taskId: string,
  workflowDir = ".agentplane/tasks",
): Promise<Record<string, string>> {
  if (
    !workflowDir.trim() ||
    path.isAbsolute(workflowDir) ||
    path.win32.isAbsolute(workflowDir) ||
    workflowDir.replaceAll("\\", "/").split("/").includes("..")
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task artifact workflow must be repository-relative.",
    });
  const root = path.resolve(checkout, workflowDir, taskId);
  const chain = await captureContainedPathChainIdentity({
    repository_root: checkout,
    file_path: root,
    label: "task artifact root",
    path_policy: { target_kind: "file_or_directory", allow_missing_ancestors: true },
  });
  if (!chain.target_exists) return {};
  const rootStat = await lstat(root);
  if (!rootStat.isDirectory())
    throw new CliError({ code: "E_VALIDATION", message: "Task artifact root is not a directory." });
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
  await assertContainedPathChainIdentityUnchanged(chain, "task artifact root");
  return entries;
}
