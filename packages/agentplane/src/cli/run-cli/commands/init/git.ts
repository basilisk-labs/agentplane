import path from "node:path";

import { gitInitRepo } from "../../../../commands/workflow.js";
import { getPathKind } from "../../../fs-utils.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

export async function detectParentGitRoot(initRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--show-toplevel"], {
      cwd: initRoot,
      env: gitEnv(),
    });
    const discovered = path.resolve(stdout.trim());
    return discovered === path.resolve(initRoot) ? null : discovered;
  } catch {
    return null;
  }
}

export async function ensureGitRoot(opts: {
  initRoot: string;
  baseBranchFallback: string;
}): Promise<{ gitRoot: string; gitRootExisted: boolean }> {
  // Init is intentionally scoped to initRoot only. We do not search parent directories
  // for an existing git repository, to avoid accidentally initializing the wrong workspace.
  const dotGit = path.join(opts.initRoot, ".git");
  const kind = await getPathKind(dotGit);
  const gitRootExisted = kind === "dir";
  if (!gitRootExisted) {
    await gitInitRepo(opts.initRoot, opts.baseBranchFallback);
  }
  return { gitRoot: opts.initRoot, gitRootExisted };
}
