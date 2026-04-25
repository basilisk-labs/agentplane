import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";
import {
  renderHookShimScript,
  resolveInstalledHookRunnerPath,
} from "../shared/hook-shim-template.js";

export async function materializeHookShimForWorktree(worktreePath: string): Promise<void> {
  const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
  if (await fileExists(shimPath)) return;

  await mkdir(path.dirname(shimPath), { recursive: true });
  await writeFile(shimPath, renderHookShimScript(resolveInstalledHookRunnerPath()), "utf8");
  await chmod(shimPath, 0o755);
}
