import { gitRevParse } from "@agentplaneorg/core/git";
import type { TaskData } from "../../backends/task-backend.js";

import { resolveCleanupPlan } from "../branch/cleanup-merged-proof.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteCleanupProbe } from "./route-decision-types.js";
import type { CommandContext } from "./task-backend.js";

export async function resolveDoneCleanupProbe(opts: {
  ctx: CommandContext;
  resume: TaskResumeContext;
  task: TaskData;
  onDiagnostic?: (message: string) => void;
}): Promise<RouteCleanupProbe> {
  if (
    opts.ctx.config.workflow_mode !== "branch_pr" ||
    String(opts.task.status).toUpperCase() !== "DONE"
  ) {
    return { state: "not_requested" };
  }
  const baseBranch = opts.resume.base_branch?.trim() ?? "";
  if (!baseBranch) return { state: "unavailable", reason: "base branch is unavailable" };
  try {
    const resolution = await resolveCleanupPlan({
      ctx: opts.ctx,
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      baseBranch,
      taskIds: [opts.task.id],
    });
    if (resolution.blocked.length > 0) {
      return {
        state: "blocked",
        reasons: resolution.blocked.map((item) => `branch=${item.branch}: ${item.reason}`),
      };
    }
    if (resolution.candidates.length > 0) {
      return { state: "candidate", count: resolution.candidates.length };
    }
    if (!resolution.matchedTaskIds.has(opts.task.id)) {
      const [localBaseSha, remoteBaseSha] = await Promise.all([
        gitRevParse(opts.ctx.resolvedProject.gitRoot, [baseBranch]).catch(() => null),
        gitRevParse(opts.ctx.resolvedProject.gitRoot, [`origin/${baseBranch}`]).catch(() => null),
      ]);
      return {
        state: "already_clean",
        baseSynchronized:
          localBaseSha !== null && remoteBaseSha !== null && localBaseSha === remoteBaseSha,
      };
    }
    return {
      state: "unavailable",
      reason: "cleanup proof returned a matched task without a candidate or blocker",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    opts.onDiagnostic?.(`cleanup candidate probe failed: ${message}`);
    return { state: "unavailable", reason: message };
  }
}
