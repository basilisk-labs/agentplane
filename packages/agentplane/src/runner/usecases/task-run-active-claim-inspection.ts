import path from "node:path";

import { captureRunnerArtifactDirectoryBoundaryIfPresent } from "../run-directory-boundary.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type {
  TaskRunnerActiveClaimDirectory,
  TaskRunnerActiveClaimPathOptions,
} from "./task-run-active-claim-record.js";

export async function inspectClaimDirectory(
  opts: TaskRunnerActiveClaimPathOptions,
): Promise<TaskRunnerActiveClaimDirectory | null> {
  const paths = await resolveSupervisorTaskRunnerPaths(opts);
  const claimPath = path.join(paths.task_dir, "active-run-claim.json");
  const boundary = await captureRunnerArtifactDirectoryBoundaryIfPresent({
    run_dir: paths.task_dir,
    artifact_root: paths.artifact_root,
    artifact_paths: [claimPath],
  });
  if (!boundary) return null;
  await boundary.assertStable("after capturing runner active claim task directory");
  return {
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: opts.task_id,
    task_dir: paths.task_dir,
    claim_path: claimPath,
    boundary,
  };
}
