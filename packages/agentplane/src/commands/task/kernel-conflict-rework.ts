import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { hasChangedTaskArtifacts } from "./external-agent-implementation-finalization.js";
import { runKernelFinalValidation } from "./kernel-final-validation.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";

/** Refresh canonical repository authority and revalidate the exact conflict-resolution HEAD. */
export async function finalizeKernelConflictRework(opts: {
  command: CommandContext;
  task_id: string;
  operation_id: string;
  evidence_message: () => Promise<string>;
}): Promise<void> {
  const runtime = await createKernelRuntime({
    command: opts.command,
    task_id: opts.task_id,
    transport: "host",
    operation_id: opts.operation_id,
  });
  const context = await runtime.native.readContext(opts.task_id);
  const initial = await runtime.adapter.read(opts.task_id);
  if (initial.kind !== "canonical") {
    throw new Error(`Canonical conflict rework requires a Task Kernel record: ${initial.kind}`);
  }
  const currentAuthority = initial.record.aggregate.authority_lineage?.at(-1)?.authority;
  if (!currentAuthority) throw new Error("Canonical conflict rework authority is unavailable");
  if (currentAuthority.repository_fingerprint !== context.repository_fingerprint) {
    requireKernelCommit(await runtime.authority.continue(opts.task_id));
  }
  const continued = await runtime.adapter.read(opts.task_id);
  if (continued.kind !== "canonical") {
    throw new Error(`Canonical conflict rework lost its Task Kernel record: ${continued.kind}`);
  }
  const validation = await runKernelFinalValidation(opts.command, runtime, continued.record);
  if (validation.stop) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        validation.stop.summary ??
        "Canonical final validation failed after provider conflict rework.",
    });
  }
  const status = await readDirectRepositoryStatus(opts.command.resolvedProject.gitRoot);
  if (!hasChangedTaskArtifacts(status?.lines ?? [], opts.task_id)) {
    throw new Error("Canonical conflict rework produced no persistent validation evidence");
  }
  await commitBranchSupervisorTaskArtifacts({
    command: opts.command,
    cwd: opts.command.resolvedProject.gitRoot,
    task_id: opts.task_id,
    message: await opts.evidence_message(),
  });
}
