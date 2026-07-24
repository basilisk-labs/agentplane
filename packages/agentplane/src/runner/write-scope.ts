import type {
  ExecutionReceiptGitObservation,
  ExecutionReceiptScopeEvaluation,
} from "@agentplaneorg/core/schemas";

import { gitPathIsUnderPrefix } from "../shared/git-path.js";

import {
  RUNNER_DANGER_FULL_ACCESS_SANDBOX,
  type RunnerContextBundle,
  type RunnerPolicyFieldDecision,
} from "./types.js";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;
type EvaluatedScope = Extract<ExecutionReceiptScopeEvaluation, { state: "passed" }>;
type ReceiptSandboxMode = EvaluatedScope["sandbox"]["requested"];
type ScopeCommon = Pick<
  EvaluatedScope,
  "provenance" | "sandbox" | "mutation_scope" | "writable_roots" | "protected_paths"
>;

export type RunnerProtectedFilesystemObservation =
  | {
      state: "observed";
      changed_paths: string[];
      errors: [];
    }
  | {
      state: "unavailable";
      changed_paths: [];
      errors: string[];
    };

function receiptSandbox(bundle: RunnerContextBundle): EvaluatedScope["sandbox"] | null {
  const policy = bundle.execution.sandbox_policy;
  if (!policy) return null;
  const decision: RunnerPolicyFieldDecision | undefined =
    bundle.execution.policy_decision?.fields.sandbox;
  const enforcement =
    decision?.status === "enforced"
      ? "enforced"
      : decision?.status === "advisory"
        ? "advisory"
        : "unsupported";
  return {
    requested: policy.requested as ReceiptSandboxMode,
    effective:
      enforcement === "enforced" && typeof decision?.effective === "string"
        ? (decision.effective as ReceiptSandboxMode)
        : null,
    source: policy.source,
    role: policy.role,
    enforcement,
    capability_level: decision?.capability_level ?? "unsupported",
    channel: decision?.channel ?? "none",
    authority: structuredClone(policy.authority),
  };
}

function pathIsWritable(path: string, writableRoots: readonly string[]): boolean {
  return writableRoots.some((root) => gitPathIsUnderPrefix(path, root));
}

function pathIsProtected(path: string, protectedPaths: readonly string[]): boolean {
  return protectedPaths.some((prefix) => gitPathIsUnderPrefix(path, prefix));
}

export function evaluateRunnerWriteScope(opts: {
  bundle: RunnerContextBundle;
  git: ExecutionReceiptGitObservation;
  protected_filesystem: RunnerProtectedFilesystemObservation;
}): ExecutionReceiptScopeEvaluation {
  const policy = opts.bundle.execution.write_scope;
  const sandbox = receiptSandbox(opts.bundle);
  if (!policy || !sandbox) {
    return {
      provenance: OBSERVED_PROVENANCE,
      state: "not_evaluated",
    };
  }

  const changedPaths = new Set<string>();
  if (opts.git.state === "observed") {
    for (const changedPath of opts.git.delta.changed_paths) changedPaths.add(changedPath);
  }
  if (opts.protected_filesystem.state === "observed") {
    for (const changedPath of opts.protected_filesystem.changed_paths) {
      changedPaths.add(changedPath);
    }
  }

  const violations: EvaluatedScope["violations"] = [];
  for (const changedPath of [...changedPaths].toSorted((left, right) =>
    left.localeCompare(right),
  )) {
    if (pathIsProtected(changedPath, policy.protected_paths)) {
      violations.push({ path: changedPath, kind: "protected_path" });
      continue;
    }
    if (!pathIsWritable(changedPath, policy.writable_roots)) {
      violations.push({ path: changedPath, kind: "out_of_scope" });
    }
  }
  const limitations: string[] = [];
  if (opts.git.state !== "observed") {
    limitations.push("Git write observation is unavailable.");
  }
  if (opts.protected_filesystem.state !== "observed") {
    limitations.push(
      opts.protected_filesystem.errors[0] ??
        "Protected-path filesystem observation is unavailable.",
    );
  }
  if (sandbox.enforcement !== "enforced") {
    limitations.push(
      `Sandbox enforcement was downgraded to ${sandbox.enforcement} by the selected adapter.`,
    );
  }
  if (sandbox.requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX) {
    limitations.push(
      "Danger sandbox permits filesystem writes outside the observable repository boundary.",
    );
  }
  const mutationScope = policy.mutation_scope?.trim();
  const common: ScopeCommon = {
    provenance: OBSERVED_PROVENANCE,
    sandbox,
    mutation_scope: mutationScope && mutationScope.length > 0 ? mutationScope : null,
    writable_roots: [...policy.writable_roots],
    protected_paths: [...policy.protected_paths],
  };
  if (violations.length > 0) {
    return {
      ...common,
      state: "rejected",
      violations,
      limitations: [...new Set(limitations)],
    };
  }
  if (limitations.length > 0) {
    return {
      ...common,
      state: "unverified",
      violations: [],
      limitations: [...new Set(limitations)],
    };
  }
  return {
    ...common,
    state: "passed",
    violations: [],
    limitations: [],
  };
}
