import { mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

type MovedTaskArtifact = {
  relativePath: string;
  backupPath: string;
};

const noopPromise = (): Promise<void> => Promise.resolve();

async function listUntrackedTaskArtifacts(opts: {
  gitRoot: string;
  taskPrefix: string;
}): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--short", "--untracked-files=all", "--", opts.taskPrefix],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

export async function moveCollidingTaskArtifacts(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  changedPaths: string[];
}): Promise<{
  moved: MovedTaskArtifact[];
  restore: () => Promise<void>;
  cleanup: () => Promise<void>;
}> {
  const taskPrefix = `${opts.workflowDir.replaceAll("\\", "/")}/${opts.taskId}`;
  const candidatePaths = opts.changedPaths.filter(
    (changedPath) => changedPath === taskPrefix || changedPath.startsWith(`${taskPrefix}/`),
  );
  if (candidatePaths.length === 0) {
    return {
      moved: [],
      restore: noopPromise,
      cleanup: noopPromise,
    };
  }

  const untrackedPaths = await listUntrackedTaskArtifacts({
    gitRoot: opts.gitRoot,
    taskPrefix,
  });
  const collidingPaths = untrackedPaths.filter((untrackedPath) =>
    candidatePaths.includes(untrackedPath),
  );
  if (collidingPaths.length === 0) {
    return {
      moved: [],
      restore: noopPromise,
      cleanup: noopPromise,
    };
  }

  const backupRoot = path.join(
    opts.gitRoot,
    ".agentplane",
    "tmp",
    "integrate-backups",
    `${opts.taskId}-${Date.now()}`,
  );
  const backupParent = path.dirname(backupRoot);
  const backupGrandparent = path.dirname(backupParent);
  const moved: MovedTaskArtifact[] = [];
  for (const relativePath of collidingPaths) {
    const sourcePath = path.join(opts.gitRoot, relativePath);
    const backupPath = path.join(backupRoot, relativePath);
    await mkdir(path.dirname(backupPath), { recursive: true });
    await rename(sourcePath, backupPath);
    moved.push({ relativePath, backupPath });
  }

  return {
    moved,
    restore: async () => {
      for (const entry of moved.toReversed()) {
        await mkdir(path.dirname(path.join(opts.gitRoot, entry.relativePath)), { recursive: true });
        await rename(entry.backupPath, path.join(opts.gitRoot, entry.relativePath));
      }
      await rm(backupRoot, { recursive: true, force: true }).catch(() => null);
      await rm(backupParent).catch(() => null);
      await rm(backupGrandparent).catch(() => null);
    },
    cleanup: async () => {
      await rm(backupRoot, { recursive: true, force: true }).catch(() => null);
      await rm(backupParent).catch(() => null);
      await rm(backupGrandparent).catch(() => null);
    },
  };
}
