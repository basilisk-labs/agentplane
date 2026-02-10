import path from "node:path";

import { gitInitRepo } from "../../../../commands/workflow.js";
import { getPathKind } from "../../../fs-utils.js";

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
