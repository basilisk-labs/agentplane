import { findGitRoot } from "@agentplaneorg/core";

import { gitInitRepo } from "../../../../commands/workflow.js";

export async function ensureGitRoot(opts: {
  initRoot: string;
  baseBranchFallback: string;
}): Promise<{ gitRoot: string; gitRootExisted: boolean }> {
  const existingGitRoot = await findGitRoot(opts.initRoot);
  const gitRootExisted = Boolean(existingGitRoot);
  let gitRoot = existingGitRoot;
  if (!gitRoot) {
    await gitInitRepo(opts.initRoot, opts.baseBranchFallback);
    gitRoot = opts.initRoot;
  }
  return { gitRoot, gitRootExisted };
}
