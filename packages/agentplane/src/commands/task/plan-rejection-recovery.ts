import { taskCentricDigest } from "@agentplaneorg/core/tasks";

import { TaskCentricBackendAdapter } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { assertTaskMutationPolicy } from "../shared/task-mutation.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { loadPlanBackend } from "./plan-shared.js";
import { nowIso } from "./shared.js";

export async function recoverTaskPlanRejection(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  expectedReadmeRevision: number;
  expectedAggregateRevision: number;
  rejectedPlanDigest: `sha256:${string}`;
  expectedStateFingerprint: `sha256:${string}`;
  observedStateFingerprint: `sha256:${string}`;
  by: string;
  note: string;
}) {
  try {
    const { ctx, backend } = await loadPlanBackend({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
    });
    const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
    assertTaskMutationPolicy({
      ctx,
      taskId: task.id,
      task,
      action: "task_plan_reject",
      phase: "plan",
    });
    const by = opts.by.trim();
    const note = opts.note.trim();
    if (!by || !note) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Plan rejection recovery requires non-empty --by and --note values.",
      });
    }
    const idempotencyKey = `plan-rejection-recovery-${taskCentricDigest({
      task_id: task.id,
      readme_revision: opts.expectedReadmeRevision,
      aggregate_revision: opts.expectedAggregateRevision,
      plan_digest: opts.rejectedPlanDigest,
      state_fingerprint: opts.expectedStateFingerprint,
      by,
      note,
    }).slice(7, 39)}`;
    return await new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.reject(new Error("Repository observation not required.")),
    }).recoverRejectedPlanProjection({
      task_id: task.id,
      expected_readme_revision: opts.expectedReadmeRevision,
      expected_aggregate_revision: opts.expectedAggregateRevision,
      plan_digest: opts.rejectedPlanDigest,
      expected_state_fingerprint: opts.expectedStateFingerprint,
      observed_state_fingerprint: opts.observedStateFingerprint,
      actor_id: by,
      note,
      recovered_at: nowIso(),
      idempotency_key: idempotencyKey,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task plan recover-rejection",
      root: opts.rootOverride ?? null,
    });
  }
}
