import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import type { recoverableInspection } from "./kernel-operational-projection-recovery.js";

export function kernelTaskMetadataStatusOnly(line: string, prefix: string): boolean {
  const status = line.slice(0, 2);
  const rawPath = line.slice(3);
  // Reject both-endpoint operations, conflicts, and quoted/escaped names. Never normalize a
  // literal POSIX backslash into a directory separator when deciding source cleanliness.
  return (
    !/[RCU]/u.test(status) &&
    status !== "AA" &&
    status !== "DD" &&
    !rawPath.startsWith('"') &&
    !rawPath.includes("\\") &&
    rawPath.startsWith(prefix)
  );
}

/** Report completion uses accepted outputs and native inspection, never a fabricated code commit. */
export async function requireKernelReportOnlyCompletion(
  command: CommandContext,
  record: KernelRecord,
  inspect: typeof recoverableInspection,
): Promise<void> {
  const plan = record.aggregate.current_plan;
  if (plan?.state !== "APPROVED") throw new Error("Report completion requires an approved plan");
  const definitions = plan.work_items.filter(
    (item) => !item.optional || record.aggregate.work_items[item.id]?.state === "COMPLETED",
  );
  if (definitions.length === 0) throw new Error("Report completion requires inspected outputs");
  const head = await readDirectTaskHead(command.resolvedProject.gitRoot);
  const status = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
  const prefix = `${command.config.paths.workflow_dir}/${record.aggregate.id}/`;
  if (!head || !status || status.lines.some((line) => !kernelTaskMetadataStatusOnly(line, prefix)))
    throw new Error("Report completion requires unchanged source and task-only metadata changes");
  for (const definition of definitions) {
    const retained = await inspect(command, record, null, definition.id);
    const outputs = retained.implementation.canonical_outputs;
    if (!outputs?.length || outputs.some((output) => !["report", "artifact"].includes(output.kind)))
      throw new Error(
        "Report completion requires report or artifact outputs without source changes",
      );
    if (retained.order.state_fingerprint.git_head !== head)
      throw new Error("Report completion repository differs from its retained inspection");
  }
}
