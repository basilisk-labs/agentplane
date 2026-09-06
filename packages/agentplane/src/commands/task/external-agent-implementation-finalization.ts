import { conflictEvidenceAuthority } from "./external-agent-conflict-application.js";
import type { AgentSemanticResult, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";

import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import type { ExternalAgentExchange } from "./external-agent-exchange.js";

import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import type { recordDirectTaskVerification } from "./direct-task-verification.js";
import { isTaskLevelVerificationReworkState } from "./direct-task-verification.js";

import {
  recordTaskCentricExternalResult,
  type TaskCentricExternalResultProjection,
} from "./task-centric-external-result.js";

export function pathFromStatusLine(line: string): string {
  const raw = line.length >= 4 ? line.slice(3).trim() : "";
  const renamed = raw.includes(" -> ") ? (raw.split(" -> ").at(-1) ?? raw) : raw;
  return renamed.replaceAll("\\", "/");
}

export function hasChangedTaskArtifacts(statusLines: readonly string[], taskId: string): boolean {
  const prefix = `.agentplane/tasks/${taskId}/`;
  return statusLines.some((line) => pathFromStatusLine(line).startsWith(prefix));
}

function isTaskLevelVerificationRework(opts: {
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  work_order: AgentWorkOrderV2;
  semantic: AgentSemanticResult;
}): boolean {
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  return isTaskLevelVerificationReworkState({
    work_item_id: opts.work_order.task.work_item_id ?? null,
    has_plan_refinement: Boolean(opts.semantic.plan_refinement),
    task_verification_state: opts.task.verification?.state,
    has_current_plan: Boolean(aggregate?.current_plan),
    all_required_work_items_completed:
      aggregate?.current_plan?.proposal.work_items.work_items
        .filter((item) => !item.optional)
        .every((item) => aggregate.work_items[item.id]?.state === "COMPLETED") ?? false,
  });
}

export async function finishExternalImplementationVerification(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  semantic: AgentSemanticResult;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  verification: Awaited<ReturnType<typeof recordDirectTaskVerification>>;
  conflict: boolean;
}): Promise<void> {
  const { semantic, verification } = opts;
  const postVerificationHead = await readDirectTaskHead(opts.exchange.checkout);
  const postVerificationStatus = await readDirectRepositoryStatus(opts.exchange.checkout);
  const canonicalProjection: TaskCentricExternalResultProjection | null =
    isTaskLevelVerificationRework({
      task: opts.task,
      work_order: opts.work_order,
      semantic,
    })
      ? null
      : await recordTaskCentricExternalResult({
          command: opts.command,
          work_order: opts.work_order,
          semantic,
          verification,
          head: postVerificationHead,
          dirty_paths: (postVerificationStatus?.lines ?? [])
            .map((line) => pathFromStatusLine(line))
            .filter(Boolean),
        });
  if (verification.status !== "passed") {
    if (canonicalProjection?.state !== "legacy_task") return;
    throw new CliError({
      code: "E_VALIDATION",
      message: verification.reason ?? "Declared implementation verification did not pass.",
    });
  }
  if (canonicalProjection?.state === "work_item_rework") return;
  if (opts.decision.workflowMode === "branch_pr") {
    opts.command.git.invalidateStatus();
    const currentStatus = await readDirectRepositoryStatus(opts.exchange.checkout);
    if (!hasChangedTaskArtifacts(currentStatus?.lines ?? [], opts.exchange.task_id)) return;
    const evidenceAuthority = opts.conflict
      ? conflictEvidenceAuthority(
          await refreshExternalAgentRoute({
            cwd: opts.exchange.checkout,
            task_id: opts.exchange.task_id,
            include_remote: true,
          }),
        )
      : null;
    await commitBranchSupervisorTaskArtifacts({
      command: opts.command,
      cwd: opts.exchange.checkout,
      task_id: opts.exchange.task_id,
      message:
        `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external implementation evidence` +
        (evidenceAuthority
          ? `\n\nAgentPlane-Result: ${opts.exchange.result_digest}\nAgentPlane-Postcondition: ${evidenceAuthority}`
          : ""),
    });
  }
}
