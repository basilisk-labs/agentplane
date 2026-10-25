import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";

/** Compatibility route for a canonical, explicitly accepted FAILED final validation. */
export function canonicalTimingExceptionPresent(task: TaskData): boolean {
  const record = task.extensions?.task_kernel;
  if (!record || typeof record !== "object" || Array.isArray(record)) return false;
  const { digest, ...contents } = record as Record<string, unknown>;
  if (
    contents.kind !== "canonical_task" ||
    typeof digest !== "string" ||
    k.kernelDigest(contents) !== digest
  )
    return false;
  const aggregate = contents.aggregate;
  if (!aggregate || typeof aggregate !== "object" || Array.isArray(aggregate)) return false;
  const candidate = aggregate as k.TaskAggregate;
  const fingerprint = candidate.final_timing_exception?.acceptance_fingerprint;
  if (
    !["FINAL_VALIDATION", "COMPLETED"].includes(candidate.state) ||
    typeof fingerprint !== "string"
  )
    return false;
  try {
    return (
      k.hasAcceptedFinalTimingException(candidate, fingerprint) &&
      k.isTaskCompletionEligible({ ...candidate, state: "FINAL_VALIDATION" }, fingerprint)
    );
  } catch {
    return false;
  }
}

export function hasCanonicalTimingException(task: TaskData): boolean {
  return (
    task.verification?.state === "accepted_timing_exception" &&
    canonicalTimingExceptionPresent(task)
  );
}

export function canonicalTimingExceptionHead(task: TaskData): string | null {
  if (!hasCanonicalTimingException(task)) return null;
  const record = task.extensions?.task_kernel as { aggregate: k.TaskAggregate };
  return record.aggregate.final_timing_exception?.hosted_head_sha ?? null;
}

export function canonicalTimingExceptionRequiredChecks(task: TaskData): readonly string[] {
  if (!hasCanonicalTimingException(task)) return [];
  const record = task.extensions?.task_kernel as { aggregate: k.TaskAggregate };
  return record.aggregate.final_timing_exception?.hosted_required_checks ?? [];
}

export function hasAcceptedTaskVerification(task: TaskData): boolean {
  return task.verification?.state === "ok" || hasCanonicalTimingException(task);
}
