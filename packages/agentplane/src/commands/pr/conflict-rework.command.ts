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
import { recoverDivergedConflictHead } from "./conflict-rework-recovery.js";
import { resolvePrFlowStatus } from "./flow-status.js";

function packetFailure(
  taskId: string,
  preparation: Exclude<ConflictReworkPreparation, { state: "ready" }>,
): CliError {
  if (preparation.state === "publication_required") {
    const command = `agentplane task next-action ${taskId} --remote --explain`;
    return new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Cannot prepare semantic conflict rework for ${taskId}: ${preparation.reason}. ` +
        `Publish the guarded fast-forward head through the route oracle first: ${command}. ` +
        "No branch, worktree, PR, provider, queue, or task-state mutation was performed.",
      context: {
        reason_code: "provider_head_publication_required",
        task_id: taskId,
        provider_head_sha: preparation.provider_head_sha,
        local_head_sha: preparation.local_head_sha,
        next_command: command,
      },
    });
  }
  if (preparation.state === "adoption_required") {
    const command =
      `agentplane integrate queue adopt-legacy-protected-conflict ${taskId} ` +
      `--expect-adoption-token ${preparation.adoption.token}`;
    return new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Cannot prepare semantic conflict rework for ${taskId}: ${preparation.reason}. ` +
        `An INTEGRATOR must first record the formal legacy recovery receipt with: ${command}. ` +
        "No branch, worktree, PR, provider, queue, or task-state mutation was performed.",
      context: {
        reason_code: "legacy_protected_conflict_adoption_required",
        task_id: taskId,
        adoption_token: preparation.adoption.token,
        next_command: command,
      },
    });
  }
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
  recoverDivergedHead?: boolean;
  expectedLocalHead?: string | null;
  expectedProviderHead?: string | null;
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
    if (opts.recoverDivergedHead) {
      const recovery = await recoverDivergedConflictHead({
        gitRoot: ctx.resolvedProject.gitRoot,
        taskId: opts.taskId,
        report,
        taskWorktree,
        expectedLocalHead: opts.expectedLocalHead ?? "",
        expectedProviderHead: opts.expectedProviderHead ?? "",
      });
      const output = createCliEmitter();
      if (opts.json) {
        output.json({ schema_version: 1, mode: "diverged_head_recovery", recovery });
        return 0;
      }
      output.report(
        [
          { label: "task", value: recovery.task_id },
          { label: "branch", value: recovery.branch },
          { label: "archived_local_head", value: recovery.archived_local_head },
          { label: "archive_ref", value: recovery.archive_ref },
          { label: "adopted_provider_head", value: recovery.adopted_provider_head },
          { label: "provider_tracking_ref", value: recovery.provider_tracking_ref },
          { label: "next", value: recovery.next_command },
          { label: "semantic_resolution", value: "not performed" },
        ],
        { header: infoMessage(`Recovered diverged PR head: ${opts.taskId}`) },
      );
      return 0;
    }
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
        {
          label: "provider_conflict_base",
          value: preparation.packet.base_context.provider_conflict_base_sha,
        },
        { label: "current_base", value: preparation.packet.base_context.current_base_sha },
        { label: "base_relation", value: preparation.packet.base_context.relation },
        {
          label: "legacy_queue_base",
          value: preparation.packet.base_context.legacy_queue_base_sha ?? "none",
        },
        {
          label: "legacy_queue_relation",
          value: preparation.packet.base_context.legacy_queue_relation,
        },
        { label: "route_evidence", value: preparation.packet.route_evidence.kind },
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
