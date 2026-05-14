import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const HOOKS_SUITE_TIMEOUT_MS = 180_000;
export const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";
export const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

export function restoreEnv(name: string, previous: string | undefined): void {
  if (previous === undefined) delete process.env[name];
  else process.env[name] = previous;
}

export function markTaskDoneWithCommit(readmeText: string, hash: string, message: string): string {
  const commitBlock = `commit:\n  hash: "${hash}"\n  message: "${message}"`;
  const withDoneStatus = readmeText.replace('status: "TODO"', 'status: "DONE"');
  if (withDoneStatus.includes("commit: null")) {
    return withDoneStatus.replace("commit: null", commitBlock);
  }
  return withDoneStatus.replace("comments:", `${commitBlock}\ncomments:`);
}

export async function withInstalledAgentplaneRuntime<T>(fn: () => T | Promise<T>): Promise<T> {
  const previousActiveBin = process.env[ACTIVE_BIN_ENV];
  const packageRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-installed-runtime-"));
  const activeBin = path.join(packageRoot, "bin", "agentplane.js");
  await mkdir(path.dirname(activeBin), { recursive: true });
  await writeFile(path.join(packageRoot, "package.json"), '{"name":"agentplane"}\n', "utf8");
  await writeFile(activeBin, "process.exit(0);\n", "utf8");
  process.env[ACTIVE_BIN_ENV] = activeBin;
  try {
    return await fn();
  } finally {
    restoreEnv(ACTIVE_BIN_ENV, previousActiveBin);
  }
}
