import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { assertTaskMutationPolicy } from "../shared/task-mutation.js";
import {
  loadTaskFromContext,
  resolveTaskOwnerCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";

async function canonicalContext(command: CommandContext, taskId: string) {
  const task = await loadTaskFromContext({ ctx: command, taskId });
  if (!Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) return null;
  const owner = await resolveTaskOwnerCommandContext({ ctx: command, taskId });
  assertTaskMutationPolicy({ ctx: owner, taskId, task, action: "task_mutation" });
  return owner;
}

export async function appendCanonicalComment(opts: {
  command: CommandContext;
  taskId: string;
  author: string;
  body: string;
}) {
  const command = await canonicalContext(opts.command, opts.taskId);
  if (!command) return false;
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: "task-comment",
  });
  const read = await runtime.adapter.read(opts.taskId);
  if (read.kind !== "canonical")
    throw new CliError({ code: "E_VALIDATION", message: "Canonical audit record is unavailable." });
  if (
    read.record.aggregate.audit_comments?.some(
      (entry) => entry.author === opts.author && entry.body === opts.body,
    )
  )
    return true;
  const context = await runtime.native.readContext(opts.taskId);
  requireKernelCommit(
    await runtime.adapter.execute({
      command: {
        kind: "append_audit_comment",
        task_id: opts.taskId,
        expected_task_revision: context.task_revision,
        expected_state_fingerprint: context.repository_fingerprint,
        author: opts.author,
        body: opts.body,
      },
      actor: { ...context.actor, capabilities: ["task.audit"] },
      authority: null,
      repository_fingerprint: context.repository_fingerprint,
      occurred_at: context.occurred_at,
      mutation_id: `audit:${k.kernelDigest({ task: opts.taskId, revision: context.task_revision, author: opts.author, body: opts.body })}`,
    }),
  );
  return true;
}

export async function closeCanonicalWithoutImplementation(opts: {
  command: CommandContext;
  taskId: string;
  author: string;
  note: string;
  kind: "noop" | "duplicate" | "superseded";
  relatedTaskId?: string;
  approvedBy?: string;
}) {
  const command = await canonicalContext(opts.command, opts.taskId);
  if (!command) return false;
  const argv = [
    "agentplane",
    "task",
    opts.kind === "noop" ? "close-noop" : "close-duplicate",
    opts.taskId,
    "--author",
    opts.author,
    "--note",
    opts.note,
    "--approved-by",
    "USER",
    ...(opts.relatedTaskId ? ["--of", opts.relatedTaskId] : []),
    ...(opts.kind === "superseded" ? ["--superseded"] : []),
  ];
  if (opts.approvedBy !== "USER")
    throw new CliError({
      code: "E_HANDOFF",
      message:
        "Canonical bookkeeping closure requires explicit manual USER approval. --author and --force do not grant closure authority.",
      context: {
        reason_code: "canonical_closure_approval_required",
        task_id: opts.taskId,
        required_role: "USER",
        cwd: command.resolvedProject.gitRoot,
        recovery_argv: argv,
      },
    });
  if (opts.relatedTaskId) await loadTaskFromContext({ ctx: command, taskId: opts.relatedTaskId });
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: "task-administrative-close",
  });
  const read = await runtime.adapter.read(opts.taskId);
  if (read.kind !== "canonical")
    throw new CliError({
      code: "E_VALIDATION",
      message: "Canonical closure record is unavailable.",
    });
  const existing = read.record.aggregate.administrative_closure;
  if (
    read.record.aggregate.state === "CANCELLED" &&
    existing?.kind === opts.kind &&
    existing.note === opts.note &&
    existing.related_task_id === (opts.relatedTaskId ?? null)
  )
    return true;
  const context = await runtime.native.readContext(opts.taskId);
  const evidence = k.kernelDigest({
    kind: "canonical_administrative_closure",
    task_id: opts.taskId,
    task_revision: context.task_revision,
    fingerprint: context.repository_fingerprint,
    closure_kind: opts.kind,
    note: opts.note,
    related_task_id: opts.relatedTaskId ?? null,
    actor_id: opts.approvedBy,
  });
  requireKernelCommit(
    await runtime.adapter.execute({
      command: {
        kind: "close_without_implementation",
        task_id: opts.taskId,
        expected_task_revision: context.task_revision,
        expected_state_fingerprint: context.repository_fingerprint,
        closure_kind: opts.kind,
        note: opts.note,
        related_task_id: opts.relatedTaskId ?? null,
        approval_evidence_digest: evidence,
      },
      actor: {
        id: opts.approvedBy,
        kind: "USER",
        transport: "manual",
        capabilities: ["task.close"],
      },
      authority: null,
      repository_fingerprint: context.repository_fingerprint,
      occurred_at: context.occurred_at,
      mutation_id: `administrative-close:${evidence}`,
    }),
  );
  return true;
}
