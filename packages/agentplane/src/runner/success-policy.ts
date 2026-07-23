import type {
  ExecutionReceiptArtifactObservation,
  ExecutionReceiptCollection,
  ExecutionReceiptGitObservation,
  ExecutionReceiptObservedCheck,
  ExecutionReceiptProcessObservation,
  ExecutionReceiptSuccessPolicy,
} from "@agentplaneorg/core/schemas";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

export function evaluateExecutionSuccessPolicy(opts: {
  process: ExecutionReceiptProcessObservation;
  git: ExecutionReceiptGitObservation;
  artifacts: ExecutionReceiptArtifactObservation[];
  checks: ExecutionReceiptObservedCheck[];
  collection: ExecutionReceiptCollection;
}): ExecutionReceiptSuccessPolicy {
  const rejectionReasons: string[] = [];
  const unverifiedReasons: string[] = [];
  if (
    opts.process.outcome !== "exited" ||
    opts.process.exit_code !== 0 ||
    opts.process.exit_signal !== null ||
    opts.process.timeout_reason !== null
  ) {
    rejectionReasons.push("process did not complete with a clean observed exit");
  }
  if (opts.process.process_tree.containment_state !== "bounded") {
    unverifiedReasons.push(
      opts.process.process_tree.containment_limitation ??
        "bounded descendant containment was not established",
    );
  }
  if (opts.git.state !== "observed") {
    unverifiedReasons.push("Git observation is unavailable");
  }
  if (opts.collection.status !== "complete") {
    unverifiedReasons.push("receipt collection is partial");
  }
  for (const artifact of opts.artifacts) {
    if (artifact.required && artifact.state !== "present") {
      rejectionReasons.push(`required artifact is ${artifact.state}: ${artifact.path}`);
    }
  }
  for (const check of opts.checks) {
    if (check.required && check.status === "failed") {
      rejectionReasons.push(`required observed check failed: ${check.id}`);
    } else if (check.required && check.status === "not_run") {
      unverifiedReasons.push(`required observed check was not run: ${check.id}`);
    }
  }

  if (rejectionReasons.length > 0) {
    return {
      provenance: OBSERVED_PROVENANCE,
      outcome: "rejected",
      reasons: [...new Set([...rejectionReasons, ...unverifiedReasons])],
    };
  }
  if (unverifiedReasons.length > 0) {
    return {
      provenance: OBSERVED_PROVENANCE,
      outcome: "unverified",
      reasons: [...new Set(unverifiedReasons)],
    };
  }
  return {
    provenance: OBSERVED_PROVENANCE,
    outcome: "observed_success",
    reasons: [],
  };
}
