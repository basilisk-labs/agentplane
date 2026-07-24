import type {
  ExecutionReceiptArtifactObservation,
  ExecutionReceiptCollection,
  ExecutionReceiptGitObservation,
  ExecutionReceiptObservedCheck,
  ExecutionReceiptProcessObservation,
  ExecutionReceiptScopeEvaluation,
  ExecutionReceiptSuccessPolicy,
} from "@agentplaneorg/core/schemas";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

export function evaluateExecutionSuccessPolicy(opts: {
  process: ExecutionReceiptProcessObservation;
  git: ExecutionReceiptGitObservation;
  artifacts: ExecutionReceiptArtifactObservation[];
  checks: ExecutionReceiptObservedCheck[];
  collection: ExecutionReceiptCollection;
  scope_evaluation: ExecutionReceiptScopeEvaluation;
}): ExecutionReceiptSuccessPolicy {
  const rejectionReasons: string[] = [];
  const unverifiedReasons: string[] = [];
  const filesystemEffectsEnforced = opts.checks.some(
    (check) =>
      check.id === "runner.sandbox.filesystem_effects_enforced" &&
      check.required &&
      check.status === "passed",
  );
  if (
    opts.process.outcome !== "exited" ||
    opts.process.exit_code !== 0 ||
    opts.process.exit_signal !== null ||
    opts.process.timeout_reason !== null
  ) {
    rejectionReasons.push("process did not complete with a clean observed exit");
  }
  if (opts.process.process_tree.containment_state !== "bounded" && !filesystemEffectsEnforced) {
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
  switch (opts.scope_evaluation.state) {
    case "rejected": {
      rejectionReasons.push(
        ...opts.scope_evaluation.violations.map(
          (violation) => `${violation.kind} write observed: ${violation.path}`,
        ),
      );
      unverifiedReasons.push(...opts.scope_evaluation.limitations);
      break;
    }
    case "unverified": {
      unverifiedReasons.push(...opts.scope_evaluation.limitations);
      break;
    }
    case "not_evaluated": {
      unverifiedReasons.push("write scope was not evaluated");
      break;
    }
    case "passed": {
      break;
    }
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
