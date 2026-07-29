import type { CommandContext } from "../shared/task-backend.js";
import {
  recordDirectImplementationEvidence,
  resolveDirectImplementationCommit,
  type DirectImplementationEvidence,
  type DirectRepositoryStatus,
} from "./direct-task-finalization.js";

export type DirectImplementationPreparation =
  | { status: "ready"; evidence: DirectImplementationEvidence }
  | { status: "scope_violation" | "missing"; reason: string };

/** Validates and freezes the committed EXECUTOR delta before formal verification. */
export async function prepareDirectImplementationEvidence(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  execution_base_commit: string | null;
  execution_baseline_status: DirectRepositoryStatus | null;
  allowed_paths: readonly string[];
  observed_changed_paths: readonly string[] | null;
}): Promise<DirectImplementationPreparation> {
  let implementation: Awaited<ReturnType<typeof resolveDirectImplementationCommit>>;
  try {
    implementation = await resolveDirectImplementationCommit({
      command: opts.command,
      cwd: opts.cwd,
      task_id: opts.task_id,
      execution_base_commit: opts.execution_base_commit,
      allowed_paths: opts.allowed_paths,
      observed_changed_paths: opts.observed_changed_paths,
    });
  } catch {
    return {
      status: "missing",
      reason:
        "The CLI could not determine the committed implementation before formal verification.",
    };
  }
  if (implementation.status !== "ready") return implementation;
  const evidence = await recordDirectImplementationEvidence({
    command: opts.command,
    cwd: opts.cwd,
    task_id: opts.task_id,
    execution_base_commit: opts.execution_base_commit ?? "",
    implementation_commit: implementation.commit,
    execution_baseline_status: opts.execution_baseline_status,
  });
  return evidence
    ? { status: "ready", evidence }
    : {
        status: "missing",
        reason:
          "The CLI could not freeze independent Git evidence for the committed implementation.",
      };
}
