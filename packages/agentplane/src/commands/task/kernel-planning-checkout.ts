import path from "node:path";
import { gitRevParse } from "@agentplaneorg/core/git";
import { taskExecutionBaseFromExtensions } from "@agentplaneorg/core/tasks";

import type { KernelRead } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { findRouteWorktreePath } from "../shared/route-decision-workspace.js";

/** Resolve the development checkout before planning binds repository authority. */
export async function canonicalPlanningCheckoutBoundary(opts: {
  command: CommandContext;
  read: KernelRead;
}) {
  if (
    opts.read.kind !== "canonical" ||
    !["CAPTURED", "PLANNING", "AWAITING_PLAN_APPROVAL"].includes(
      opts.read.record.aggregate.state,
    ) ||
    opts.read.record.aggregate.authority_lineage?.length ||
    opts.read.task.execution_route?.repository_mode !== "branch_pr"
  )
    return null;
  const base = taskExecutionBaseFromExtensions(opts.read.task.extensions);
  if (base?.source !== "explicit") return null;
  const root = opts.command.resolvedProject.gitRoot;
  const target = await findRouteWorktreePath(root, base.base_ref);
  const head = target ? await gitRevParse(target, ["HEAD^{commit}"]).catch(() => null) : null;
  if (!target || head !== base.base_sha) {
    return {
      kind: "human_required" as const,
      reason: "canonical_planning_base_unavailable",
      summary:
        "Planning requires one registered checkout of the frozen development base. " +
        "Restore that checkout or create a task with an available named base before planning.",
      base_ref: base.base_ref,
      base_sha: base.base_sha,
    };
  }
  if (path.resolve(target) === path.resolve(root)) return null;
  return {
    kind: "external_wait" as const,
    reason: "canonical_planning_checkout_required",
    must_run_from: target,
  };
}
