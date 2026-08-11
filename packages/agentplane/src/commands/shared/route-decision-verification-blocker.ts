import type { TaskData } from "../../backends/task-backend.js";
import type { RouteBlocker } from "./route-oracle.js";

export function addVerificationRequiredBlocker(opts: {
  blockers: RouteBlocker[];
  task: TaskData;
  acceptedVerificationRecord?: boolean;
  verificationReason?: string | null;
  finalizedDoneTask?: boolean;
}): void {
  if (opts.finalizedDoneTask === true) return;
  const status = String(opts.task.status).toUpperCase();
  const requiresVerification =
    status === "DONE" ||
    (status === "DOING" &&
      (Boolean(opts.task.commit?.hash?.trim()) || opts.task.verification?.state === "ok"));
  if (
    !requiresVerification ||
    (opts.task.verification?.state === "ok" && opts.acceptedVerificationRecord !== false)
  ) {
    return;
  }
  if (opts.blockers.some((blocker) => blocker.code === "verification_required")) return;
  opts.blockers.push({
    code: "verification_required",
    summary:
      opts.task.verification?.state === "ok"
        ? opts.verificationReason
          ? `the passing verification record does not cover the current verification input (reason_code=${opts.verificationReason})`
          : "the passing verification record does not cover the current implementation head"
        : "the recorded task implementation does not have a passing verification record",
  });
}
