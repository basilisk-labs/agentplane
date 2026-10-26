import { readdir } from "node:fs/promises";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";

/** Rebuild the exact immutable proof used by a USER-approved required-check correction. */
export async function failedRequiredCheckEvidence(
  directory: string,
  workOrderId: string,
  current: { work_items: readonly { id: string; contract_digest?: string }[] },
  proposal: {
    work_items: readonly { id: string; contract: { verification_commands: readonly string[] } }[];
  },
  contracts: Readonly<Record<string, { verification_commands: readonly string[] }>>,
) {
  const changed = proposal.work_items.flatMap((item) => {
    const original = current.work_items.find((candidate) => candidate.id === item.id);
    const before = original?.contract_digest && contracts[original.contract_digest];
    if (!before) return [];
    return before.verification_commands.flatMap((check, index) =>
      check === item.contract.verification_commands[index]
        ? []
        : [
            {
              work_item_id: item.id,
              previous_command: check,
              replacement_command: item.contract.verification_commands[index],
            },
          ],
    );
  });
  if (changed.length !== 1 || !changed[0]?.replacement_command)
    throw new Error("Required check correction must replace exactly one command");
  const acceptedResultCommand = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "command-input.json"),
      "accepted result command for failed check",
    ),
  ) as unknown;
  const failedWorkOrder = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "work-order.json"),
      "issued WorkOrder for failed check",
    ),
  ) as unknown;
  const validationCommand = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "validation-command.json"),
      "failed required check validation command",
    ),
  ) as { command?: { validation?: { evidence_digests?: string[] } } };
  const evidenceDigest = validationCommand.command?.validation?.evidence_digests?.[0];
  const files = await readdir(directory);
  const nativeFiles = files.filter((name) => /^native-validation-[a-f0-9]{64}\.json$/u.test(name));
  const matching = [];
  for (const name of nativeFiles) {
    const value: unknown = JSON.parse(
      await readStableRegularTextNoFollow(path.join(directory, name), "native failed check"),
    );
    if (k.kernelDigest(value) === evidenceDigest) matching.push(value);
  }
  if (matching.length !== 1) throw new Error("Native failed-check evidence is unavailable");
  return {
    work_item_id: changed[0].work_item_id,
    failed_work_order_id: workOrderId as k.Sha256Digest,
    previous_command: changed[0].previous_command,
    replacement_command: changed[0].replacement_command,
    failed_work_order: failedWorkOrder,
    accepted_result_command_input: acceptedResultCommand,
    validation_command_input: validationCommand,
    native_validation: matching[0],
  };
}
