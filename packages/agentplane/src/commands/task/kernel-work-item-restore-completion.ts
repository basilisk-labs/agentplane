import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { readCompletionRestorationProof } from "./kernel-completion-restoration-evidence.js";
import { writeKernelArtifact } from "./kernel-exchange.js";

export type RestoreCompletionOptions = {
  taskId: string;
  workItemId: string;
  inspectionWorkOrder: string;
  stateDigest?: string;
  proofDigest?: string;
  by?: string;
  note?: string;
  dryRun: boolean;
};

export async function cmdRestoreCompletion(
  command: CommandContext,
  opts: RestoreCompletionOptions,
) {
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: `restore-completion:${opts.inspectionWorkOrder}`,
  });
  const read = await runtime.adapter.read(opts.taskId);
  if (read.kind !== "canonical") throw new Error("Restoration requires a canonical Task");
  const kernelRoot = path.join(await resolveCommandGitCommonDir(command), "agentplane", "kernel");
  const proof = await readCompletionRestorationProof(
    kernelRoot,
    read.record,
    opts.workItemId,
    opts.inspectionWorkOrder,
  );
  const proofDigest = k.kernelDigest(proof);
  if (opts.dryRun) {
    process.stdout.write(
      `${JSON.stringify(
        {
          kind: "completion_restoration_preview",
          grants_authority: false,
          task_id: opts.taskId,
          work_item_id: opts.workItemId,
          state_digest: read.record.digest,
          proof_digest: proofDigest,
          proof,
          operator_action: {
            argv: [
              "agentplane",
              "task",
              "work-item",
              "restore-completion",
              opts.taskId,
              "--work-item",
              opts.workItemId,
              "--inspection-work-order",
              opts.inspectionWorkOrder,
              "--state-digest",
              read.record.digest,
              "--proof-digest",
              proofDigest,
              "--by",
              "USER",
            ],
            required_input: {
              option: "--note",
              description: "Explain the authenticated historical reset recovery.",
            },
          },
        },
        null,
        2,
      )}\n`,
    );
    return 0;
  }
  if (
    opts.by !== "USER" ||
    !opts.note?.trim() ||
    opts.stateDigest !== read.record.digest ||
    opts.proofDigest !== proofDigest
  )
    throw new Error(
      "Restoration requires exact current state/proof digests and explicit USER note",
    );
  const input = await runtime.input(
    {
      kind: "restore_work_item_completion",
      work_item_id: opts.workItemId,
      proof,
      proof_digest: proofDigest,
      note: opts.note.trim(),
    },
    `restore-completion:${opts.stateDigest}:${proofDigest}`,
  );
  const current = await runtime.adapter.read(opts.taskId);
  if (
    current.kind !== "canonical" ||
    current.record.digest !== opts.stateDigest ||
    k.kernelDigest(
      await readCompletionRestorationProof(
        kernelRoot,
        current.record,
        opts.workItemId,
        opts.inspectionWorkOrder,
      ),
    ) !== proofDigest
  )
    throw new Error("Restoration state or evidence changed before admission");
  const bound = {
    ...input,
    command: { ...input.command, expected_task_revision: read.record.aggregate.revision },
    actor: { ...input.actor, id: "USER", kind: "USER" as const, transport: "manual" as const },
  };
  const receipt = {
    kind: "operator_completion_restoration",
    state_digest: opts.stateDigest,
    proof_digest: proofDigest,
    inspection_work_order: opts.inspectionWorkOrder,
    input: bound,
  };
  await writeKernelArtifact(
    path.join(kernelRoot, "recoveries", opts.taskId),
    `${k.kernelDigest(receipt).slice(7)}.json`,
    receipt,
  );
  requireKernelCommit(await runtime.adapter.execute(bound));
  process.stdout.write(
    `Restored authenticated completion for ${opts.taskId}/${opts.workItemId}. Final validation remains required.\n`,
  );
  return 0;
}
