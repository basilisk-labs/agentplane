import { assertNoOrphanedRunnerEffectInDoubt } from "../../runner/usecases/task-run-orphaned-effect-guard.js";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { AGENT_SEMANTIC_RESULT_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { assertTaskMutationPolicy } from "../shared/task-mutation.js";
import {
  resolveTaskOwnerCommandContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import {
  acquireTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "../../runner/usecases/task-run-active-claim.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";

type Cancel = Extract<k.TaskCommand, { kind: "cancel_withdrawn_scope" }>;
export type CancellationOptions = {
  command: CommandContext;
  taskId: string;
  reason: string;
  approvedBy?: string;
  requestDigest?: string;
  recordDigest?: string;
  planDigest?: string;
  fingerprint?: string;
  revision?: number;
  approvalEvidence?: string;
};
function refuse(message: string): never {
  throw new CliError({ code: "E_VALIDATION", message });
}
async function stoppedResults(
  command: CommandContext,
  record: KernelRecord,
): Promise<Cancel["stops"]> {
  const root = path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "exchanges",
    record.aggregate.id,
  );
  const proofs: Cancel["stops"][number][] = [];
  for (const item of Object.values(record.aggregate.work_items).filter(
    (entry) => entry.state === "BLOCKED" && entry.attempt > 0,
  )) {
    const candidates = Object.keys(record.aggregate.mutation_receipts).filter((id) =>
      /^semantic-stop:sha256:[a-f0-9]{64}$/u.test(id),
    );
    for (const id of candidates) {
      const orderId = id.slice("semantic-stop:".length) as k.Sha256Digest;
      const directory = path.join(root, orderId.slice(7));
      const saved = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "semantic-stop-command.json"),
          "cancellation stop command",
        ),
      ) as { command: Cancel["stops"][number]["command"] };
      if (
        saved.command?.work_item_id !== item.definition.id ||
        saved.command.claim_id !== item.claim_id
      )
        continue;
      const result = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
        JSON.parse(
          await readStableRegularTextNoFollow(
            path.join(directory, "received-result.json"),
            "cancellation blocked result",
          ),
        ),
      );
      const binding = result.canonical_binding;
      if (
        result.status !== "blocked" ||
        result.work_order_id !== orderId ||
        saved.command.semantic_result_digest !== k.kernelDigest(result) ||
        record.aggregate.mutation_receipts[id]?.command_digest !== k.kernelDigest(saved.command) ||
        binding?.phase !== "implementation" ||
        binding.task_id !== record.aggregate.id ||
        binding.repository_identity !== record.repository_identity ||
        binding.work_item_id !== item.definition.id ||
        binding.claim_id !== item.claim_id ||
        binding.attempt !== item.attempt ||
        binding.contract_digest !== item.definition.contract_digest
      )
        refuse("Cancellation requires authenticated current BLOCKED result evidence.");
      proofs.push({ work_order_id: orderId, command: saved.command });
    }
  }
  return proofs;
}
export async function cancelWithdrawnScope(opts: CancellationOptions): Promise<number> {
  const command = await resolveTaskOwnerCommandContext({ ctx: opts.command, taskId: opts.taskId });
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: "task-cancel",
  });
  const read = await runtime.adapter.read(opts.taskId);
  if (read.kind !== "canonical")
    refuse("Cancellation requires a live canonical task in its repository.");
  assertTaskMutationPolicy({
    ctx: command,
    taskId: opts.taskId,
    task: read.task,
    action: "task_mutation",
  });
  if (!opts.reason.trim()) refuse("Cancellation requires a nonempty withdrawal reason.");
  const prior = read.record.aggregate.cancellation;
  if (read.record.aggregate.state === "CANCELLED") {
    if (
      opts.approvedBy === "USER" &&
      prior &&
      prior.record_digest === opts.recordDigest &&
      prior.reason === opts.reason &&
      prior.request_digest === opts.requestDigest &&
      prior.approval_evidence_digest === opts.approvalEvidence &&
      prior.plan_digest === opts.planDigest &&
      prior.repository_fingerprint === opts.fingerprint &&
      prior.prior_revision === opts.revision
    )
      return 0;
    refuse("Cancelled task only accepts the exact original cancellation approval.");
  }
  const observation = await runtime.observe();
  const plan = read.record.aggregate.current_plan;
  if (plan?.state !== "APPROVED") refuse("Cancellation requires an approved plan.");
  const request = k.kernelDigest({
    kind: "withdrawn_scope_cancellation",
    task_id: opts.taskId,
    record_digest: read.record.digest,
    aggregate_digest: k.kernelDigest(read.record.aggregate),
    task_revision: read.record.aggregate.revision,
    plan_digest: plan.digest,
    repository_fingerprint: observation.fingerprint,
    reason: opts.reason,
  });
  const approval = k.kernelDigest({
    kind: "manual_user_cancellation_approval",
    request_digest: request,
    actor_id: "USER",
  });
  const argv = [
    "agentplane",
    "task",
    "cancel",
    opts.taskId,
    "--reason",
    opts.reason,
    "--approved-by",
    "USER",
    "--request-digest",
    request,
    "--record-digest",
    read.record.digest,
    "--plan-digest",
    plan.digest,
    "--fingerprint",
    observation.fingerprint,
    "--revision",
    String(read.record.aggregate.revision),
    "--approval-evidence",
    approval,
  ];
  if (!opts.approvedBy)
    throw new CliError({
      code: "E_HANDOFF",
      message: "Scope withdrawal requires explicit state-bound manual USER approval.",
      context: {
        reason_code: "canonical_cancellation_requires_user",
        recovery_argv: argv,
        cwd: command.resolvedProject.gitRoot,
      },
    });
  if (
    opts.approvedBy !== "USER" ||
    opts.requestDigest !== request ||
    opts.recordDigest !== read.record.digest ||
    opts.planDigest !== plan.digest ||
    opts.fingerprint !== observation.fingerprint ||
    opts.revision !== read.record.aggregate.revision ||
    opts.approvalEvidence !== approval
  )
    refuse("Cancellation approval is stale or does not bind this state.");
  const stops = await stoppedResults(command, read.record);
  const lease = await acquireTaskRunnerActiveClaim({
    git_root: command.resolvedProject.gitRoot,
    workflow_dir: command.config.paths.workflow_dir,
    task_id: opts.taskId,
    run_id: `cancel-${request.slice(7)}`,
    operation: "cancel",
  });
  try {
    await assertNoOrphanedRunnerEffectInDoubt({
      git_root: command.resolvedProject.gitRoot,
      workflow_dir: command.config.paths.workflow_dir,
      task_id: opts.taskId,
      expected_active_claim: { run_id: lease.claim.run_id, generation: lease.claim.generation },
      expected_history_anchor: lease.history_anchor,
    });
    const fresh = await runtime.adapter.read(opts.taskId);
    const repository = await runtime.observe();
    if (
      fresh.kind !== "canonical" ||
      fresh.record.digest !== read.record.digest ||
      repository.fingerprint !== observation.fingerprint
    )
      refuse("Cancellation state changed after acquiring the shared claim.");
    requireKernelCommit(
      await runtime.adapter.execute({
        command: {
          kind: "cancel_withdrawn_scope",
          record_digest: read.record.digest,
          task_id: opts.taskId,
          expected_task_revision: read.record.aggregate.revision,
          expected_state_fingerprint: observation.fingerprint,
          reason: opts.reason,
          plan_digest: plan.digest,
          request_digest: request,
          approval_evidence_digest: approval,
          stops,
        },
        actor: { id: "USER", kind: "USER", transport: "manual", capabilities: ["task.cancel"] },
        authority: null,
        repository_fingerprint: observation.fingerprint,
        occurred_at: new Date().toISOString(),
        mutation_id: `cancel:${request}`,
      }),
    );
  } finally {
    await releaseTaskRunnerActiveClaim(lease);
  }
  return 0;
}
