import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";

export function verificationStateToQualityReviewState(
  state: string,
): "pass" | "rework" | "blocked" {
  if (state === "ok") return "pass";
  if (state === "blocked_external") return "blocked";
  return "rework";
}

export function shouldPreserveCompletedKernelStateDuringVerification(opts: {
  task: { status: TaskData["status"]; extensions?: TaskData["extensions"] };
  allowCanonicalProjection?: boolean;
}): boolean {
  return (
    opts.allowCanonicalProjection === true &&
    opts.task.status === "DONE" &&
    Object.hasOwn(opts.task.extensions ?? {}, TASK_KERNEL_EXTENSION)
  );
}
