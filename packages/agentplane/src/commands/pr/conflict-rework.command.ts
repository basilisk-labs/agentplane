import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import {
  inspectTaskWorktreeCleanliness,
  type TaskWorktreeCleanliness,
} from "../shared/task-worktree-cleanliness.js";
import { prepareConflictReworkPacket, type ConflictReworkPreparation } from "./conflict-rework.js";
import { resolvePrFlowStatus } from "./flow-status.js";

function packetFailure(
  taskId: string,
  preparation: Exclude<ConflictReworkPreparation, { state: "ready" }>,
): CliError {
  const reasonCode =
    preparation.state === "invalid" ? preparation.reason_code : "provider_pr_not_conflicting";
  return new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Cannot prepare semantic conflict rework for ${taskId}: ${preparation.reason}. ` +
      "No branch, worktree, PR, provider, queue, or task-state mutation was performed.",
    context: { reason_code: reasonCode, task_id: taskId },
  });
}

export async function cmdPrConflictRework(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  expectedFreshnessToken?: string | null;
  json: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const report = await resolvePrFlowStatus({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const branch = report.branch.name?.trim() ?? "";
    const taskWorktree: TaskWorktreeCleanliness = branch
      ? await inspectTaskWorktreeCleanliness({
          gitRoot: ctx.resolvedProject.gitRoot,
          branch,
        })
      : { state: "not_present", branch: "", worktreePath: null, changedPaths: [] };
    const preparation = await prepareConflictReworkPacket({
      gitRoot: ctx.resolvedProject.gitRoot,
      taskId: opts.taskId,
      report,
      taskWorktree,
    });
    if (preparation.state !== "ready") throw packetFailure(opts.taskId, preparation);
    if (
      opts.expectedFreshnessToken &&
      opts.expectedFreshnessToken !== preparation.packet.freshness.token
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          `Conflict rework packet is stale for ${opts.taskId}: expected=${opts.expectedFreshnessToken} ` +
          `current=${preparation.packet.freshness.token}. Recompute the route before semantic resolution.`,
        context: {
          reason_code: "conflict_rework_packet_stale",
          task_id: opts.taskId,
          expected_freshness_token: opts.expectedFreshnessToken,
          current_freshness_token: preparation.packet.freshness.token,
        },
      });
    }
    const output = createCliEmitter();
    if (opts.json) {
      output.json(preparation.packet);
      return 0;
    }
    output.report(
      [
        { label: "task", value: preparation.packet.task_id },
        { label: "pr", value: `#${preparation.packet.provider.pr_number}` },
        { label: "branch", value: preparation.packet.provider.branch },
        { label: "provider_head", value: preparation.packet.provider.head_sha },
        { label: "provider_base", value: preparation.packet.provider.base_sha },
        { label: "merge_base", value: preparation.packet.local.merge_base_sha },
        {
          label: "candidate_conflict_paths",
          value:
            `${preparation.packet.candidate_conflict_paths.total} ` +
            `(shown=${preparation.packet.candidate_conflict_paths.paths.length})`,
        },
        { label: "freshness_token", value: preparation.packet.freshness.token },
        { label: "revalidate", value: preparation.packet.resolution_contract.revalidate_command },
        { label: "mutations", value: "none" },
      ],
      { header: infoMessage(`PR conflict rework: ${opts.taskId}`) },
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr conflict-rework", root: opts.rootOverride ?? null });
  }
}
