import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { CliError } from "../../shared/errors.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { captureKernelSemanticStop } from "./kernel-recovery-evidence.js";

export type WorkItemResumeOptions = {
  taskId: string;
  workItemId: string;
  stateDigest: string;
  by: string;
  note: string;
};

export function workItemResumeOperatorAction(record: KernelRecord, workItemId: string) {
  return {
    kind: "resume_work_item" as const,
    argv: [
      "agentplane",
      "task",
      "work-item",
      "resume",
      record.aggregate.id,
      "--work-item",
      workItemId,
      "--state-digest",
      record.digest,
      "--by",
      "USER",
    ],
    required_input: { option: "--note", description: "Explain how the blocker was resolved." },
  };
}

export function assertWorkItemResume(record: KernelRecord, opts: WorkItemResumeOptions) {
  const aggregate = record.aggregate;
  if (opts.by !== "USER" || !opts.note.trim())
    throw new CliError({
      code: "E_VALIDATION",
      message: "Recovery requires --by USER and a resolution note.",
    });
  if (aggregate.id !== opts.taskId || record.digest !== opts.stateDigest)
    throw new CliError({
      code: "E_VALIDATION",
      message: "Recovery state is stale. Request a fresh task advance packet.",
    });
  if (
    aggregate.state !== "ACTIVE" ||
    aggregate.current_plan?.state !== "APPROVED" ||
    aggregate.work_items[opts.workItemId]?.state !== "BLOCKED"
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Recovery requires a blocked WorkItem in an active approved Plan.",
    });
  if (
    aggregate.effects.some((effect) => ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state))
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Resolve outstanding effects before resuming the WorkItem.",
    });
}

export async function cmdWorkItemResume(command: CommandContext, opts: WorkItemResumeOptions) {
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: `work-item-resume:${opts.stateDigest}`,
  });
  const read = await runtime.adapter.read(opts.taskId);
  if (read.kind !== "canonical")
    throw new CliError({ code: "E_VALIDATION", message: "Recovery requires a canonical Task." });
  assertWorkItemResume(read.record, opts);
  const kernelRoot = path.join(await resolveCommandGitCommonDir(command), "agentplane", "kernel");
  const semanticStop = await captureKernelSemanticStop(kernelRoot, read.record, opts.workItemId);
  const receipt = {
    kind: "operator_work_item_resume",
    task_id: opts.taskId,
    work_item_id: opts.workItemId,
    state_digest: opts.stateDigest,
    actor: opts.by,
    note: opts.note.trim(),
    semantic_stop: semanticStop,
  };
  const digest = k.kernelDigest(receipt);
  const input = await runtime.input(
    {
      kind: "transition_work_item",
      action: "resume",
      work_item_id: opts.workItemId,
      claim_id: read.record.aggregate.work_items[opts.workItemId]!.claim_id,
    },
    `work-item-resume:${digest}`,
  );
  // Bind the mutation to the state the operator saw, including the planning revision.
  const boundInput = {
    ...input,
    command: { ...input.command, expected_task_revision: read.record.aggregate.revision },
    actor: { ...input.actor, id: opts.by, kind: "USER" as const, transport: "manual" as const },
  };
  const current = await runtime.adapter.read(opts.taskId);
  if (current.kind !== "canonical")
    throw new CliError({ code: "E_VALIDATION", message: "Canonical Task became unavailable." });
  assertWorkItemResume(current.record, opts);
  const directory = path.join(kernelRoot, "recoveries", opts.taskId);
  await writeKernelArtifact(directory, `${digest.slice(7)}.json`, receipt);
  requireKernelCommit(await runtime.lifecycle.apply(boundInput));
  process.stdout.write(
    `Resumed ${opts.taskId}/${opts.workItemId}. Request a fresh task advance packet.\n`,
  );
  return 0;
}
