import path from "node:path";

import type { WorkflowPaths } from "./types.js";

export function resolveWorkflowPaths(repoRoot: string): WorkflowPaths {
  const workflowDir = path.join(repoRoot, ".agentplane", "workflows");
  const workflowPath = path.join(repoRoot, ".agentplane", "WORKFLOW.md");
  return {
    workflowPath,
    legacyWorkflowPath: path.join(repoRoot, "WORKFLOW.md"),
    lastKnownGoodPath: path.join(workflowDir, "last-known-good.md"),
    workflowDir,
  };
}
