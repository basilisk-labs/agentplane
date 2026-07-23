import path from "node:path";

import type {
  ExecutionReceiptGitDeltaEntry,
  ExecutionReceiptGitObservation,
  ExecutionReceiptObservedCheck,
} from "@agentplaneorg/core/schemas";

import { createExecutionReceipt, writeExecutionReceipt } from "../execution-receipt.js";
import {
  captureGitSnapshot,
  compareGitSnapshots,
  type GitSnapshot,
  type GitSnapshotDelta,
} from "../observation/git-snapshot.js";
import { observeRunnerArtifacts } from "../observation/artifacts.js";
import type { RunnerInvocation, RunnerResult, RunnerResultArtifact } from "../types.js";
import type { SupervisedProcessResult } from "../process-supervision/run.js";
import type { RunnerRunRepository } from "../run-repository.js";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

export type RunnerReceiptManifestState = "valid" | "missing_allowed" | "failed" | "not_reached";

function observedCheck(opts: {
  id: string;
  required: boolean;
  status: ExecutionReceiptObservedCheck["status"];
  details: string;
}): ExecutionReceiptObservedCheck {
  return {
    provenance: OBSERVED_PROVENANCE,
    id: opts.id,
    required: opts.required,
    status: opts.status,
    details: opts.details,
  };
}

function mapGitChange(
  change: GitSnapshotDelta["entries"][number]["change"],
): ExecutionReceiptGitDeltaEntry["change"] {
  if (change === "added" || change === "modified" || change === "deleted" || change === "renamed") {
    return change;
  }
  return "modified";
}

function mapGitObservation(delta: GitSnapshotDelta): ExecutionReceiptGitObservation {
  if (
    delta.state !== "available" ||
    !delta.before.snapshot_sha256 ||
    !delta.after.snapshot_sha256 ||
    !delta.sha256
  ) {
    return {
      provenance: OBSERVED_PROVENANCE,
      state: "unavailable",
      before: null,
      after: null,
      delta: null,
      excluded_paths: delta.excluded_paths,
    };
  }
  return {
    provenance: OBSERVED_PROVENANCE,
    state: "observed",
    before: {
      head_commit: delta.before.head_commit,
      snapshot_sha256: delta.before.snapshot_sha256,
      dirty_paths: delta.before.dirty_paths,
    },
    after: {
      head_commit: delta.after.head_commit,
      snapshot_sha256: delta.after.snapshot_sha256,
      dirty_paths: delta.after.dirty_paths,
    },
    delta: {
      changed_paths: delta.changed_paths,
      entries: delta.entries.map((entry) => ({
        path: entry.path,
        change: mapGitChange(entry.change),
        before_sha256: entry.before_sha256,
        after_sha256: entry.after_sha256,
      })),
      sha256: delta.sha256,
    },
    excluded_paths: delta.excluded_paths,
  };
}

function prefixedSha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.startsWith("sha256:") ? value : `sha256:${value}`;
}

async function preparedArtifactDigests(
  repository: RunnerRunRepository,
  invocation: RunnerInvocation,
  sourceManifestSha256?: string | null,
): Promise<Map<string, string>> {
  const state = await repository.readState();
  const expected = new Map<string, string>();
  const bundleDigest = prefixedSha256(state?.prepared_metadata?.bundle_sha256);
  const bootstrapDigest = prefixedSha256(state?.prepared_metadata?.bootstrap_sha256);
  if (bundleDigest) expected.set(path.resolve(invocation.bundle_path), bundleDigest);
  if (bootstrapDigest && invocation.bootstrap_path) {
    expected.set(path.resolve(invocation.bootstrap_path), bootstrapDigest);
  }
  if (sourceManifestSha256) {
    expected.set(path.join(invocation.run_dir, "result.source.json"), sourceManifestSha256);
  }
  return expected;
}

function manifestCheck(state: RunnerReceiptManifestState): ExecutionReceiptObservedCheck {
  if (state === "valid") {
    return observedCheck({
      id: "runner.manifest.valid",
      required: true,
      status: "passed",
      details: "The supervisor parsed the preserved source manifest with the canonical schema.",
    });
  }
  if (state === "missing_allowed") {
    return observedCheck({
      id: "runner.manifest.valid",
      required: false,
      status: "not_run",
      details: "This adapter permits an absent semantic manifest.",
    });
  }
  return observedCheck({
    id: "runner.manifest.valid",
    required: state === "failed",
    status: state === "failed" ? "failed" : "not_run",
    details:
      state === "failed"
        ? "The supervisor could not validate the agent manifest."
        : "Execution stopped before manifest validation.",
  });
}

function processGroupCleanupCheck(
  processResult: SupervisedProcessResult | null,
): ExecutionReceiptObservedCheck {
  if (!processResult) {
    return observedCheck({
      id: "runner.process_group_cleanup",
      required: true,
      status: "failed",
      details: "The supervisor did not capture process-group cleanup.",
    });
  }
  const cleanup = processResult.process_tree;
  const passed =
    cleanup.scope === "posix_process_group" &&
    (cleanup.cleanup_state === "not_needed" ||
      cleanup.cleanup_state === "terminated" ||
      cleanup.cleanup_state === "force_killed") &&
    cleanup.residual_alive === false;
  if (passed) {
    return observedCheck({
      id: "runner.process_group_cleanup",
      required: true,
      status: "passed",
      details: `The supervisor completed ${cleanup.cleanup_state} cleanup for process group ${cleanup.group_id}.`,
    });
  }
  if (cleanup.cleanup_state === "unsupported") {
    return observedCheck({
      id: "runner.process_group_cleanup",
      required: true,
      status: "not_run",
      details:
        cleanup.error ??
        "The current platform does not support supervisor-owned process-group cleanup.",
    });
  }
  return observedCheck({
    id: "runner.process_group_cleanup",
    required: true,
    status: "failed",
    details:
      cleanup.error ??
      `Process-group cleanup ended in ${cleanup.cleanup_state} with residual_alive=${String(cleanup.residual_alive)}.`,
  });
}

function processContainmentCheck(
  processResult: SupervisedProcessResult | null,
): ExecutionReceiptObservedCheck {
  if (!processResult) {
    return observedCheck({
      id: "runner.process_containment",
      required: true,
      status: "failed",
      details: "The supervisor did not capture process-containment evidence.",
    });
  }
  const containment = processResult.process_tree;
  if (containment.containment_state === "bounded") {
    return observedCheck({
      id: "runner.process_containment",
      required: true,
      status: "passed",
      details: "The supervisor established bounded descendant containment.",
    });
  }
  return observedCheck({
    id: "runner.process_containment",
    required: true,
    status: "not_run",
    details:
      containment.containment_limitation ??
      "The current execution mode does not establish bounded descendant containment.",
  });
}

async function deferredTaskVerificationCheck(
  repository: RunnerRunRepository,
): Promise<ExecutionReceiptObservedCheck> {
  const bundle = await repository.readBundle();
  const commandCount = bundle?.task?.data.verify.length ?? 0;
  return observedCheck({
    id: "task.verify.deferred",
    required: false,
    status: "not_run",
    details:
      commandCount > 0
        ? `${commandCount} task verification command(s) remain for the independent verification phase; this execution receipt does not claim task or semantic success.`
        : "No task verification command was executed in the agent episode; this execution receipt establishes process integrity only.",
  });
}

export async function captureRunnerGitBefore(invocation: RunnerInvocation): Promise<GitSnapshot> {
  return await captureGitSnapshot({
    repository_root: invocation.repository_root,
    excluded_roots: [invocation.run_dir],
  });
}

export async function finalizeRunnerExecutionReceipt(opts: {
  invocation: RunnerInvocation;
  repository: RunnerRunRepository;
  git_before: GitSnapshot;
  process_result: SupervisedProcessResult | null;
  base_result: RunnerResult;
  artifacts: RunnerResultArtifact[];
  manifest_state: RunnerReceiptManifestState;
  source_manifest_sha256?: string | null;
  capabilities_used: string[];
  collection_errors?: string[];
}): Promise<{ result: RunnerResult; receipt_path: string }> {
  const gitAfter = await captureGitSnapshot({
    repository_root: opts.invocation.repository_root,
    excluded_roots: [opts.invocation.run_dir],
  });
  const gitDelta = await compareGitSnapshots({
    repository_root: opts.invocation.repository_root,
    before: opts.git_before,
    after: gitAfter,
    excluded_roots: [opts.invocation.run_dir],
  });
  const git = mapGitObservation(gitDelta);
  const artifactResult = await observeRunnerArtifacts({
    artifacts: opts.artifacts,
    excluded_paths: [opts.invocation.result_path, opts.invocation.receipt_path],
    expected_sha256_by_path: await preparedArtifactDigests(
      opts.repository,
      opts.invocation,
      opts.source_manifest_sha256,
    ),
  });
  const taskVerification = await deferredTaskVerificationCheck(opts.repository);
  const checks: ExecutionReceiptObservedCheck[] = [
    observedCheck({
      id: "runner.process.observed",
      required: true,
      status: opts.process_result ? "passed" : "failed",
      details: opts.process_result
        ? "The supervisor captured child-process completion."
        : "The supervisor did not capture child-process completion.",
    }),
    processGroupCleanupCheck(opts.process_result),
    processContainmentCheck(opts.process_result),
    observedCheck({
      id: "runner.git.observed",
      required: true,
      status: git.state === "observed" ? "passed" : "not_run",
      details:
        git.state === "observed"
          ? "The supervisor captured and compared Git state before and after execution."
          : "The supervisor could not capture a complete Git delta.",
    }),
    observedCheck({
      id: "runner.artifacts.integrity",
      required: true,
      status: artifactResult.errors.length === 0 ? "passed" : "failed",
      details:
        artifactResult.errors.length === 0
          ? "Every required non-self-referential artifact was hashed as a regular file."
          : artifactResult.errors.join("; "),
    }),
    manifestCheck(opts.manifest_state),
    taskVerification,
  ];
  const receipt = createExecutionReceipt({
    run_id: opts.invocation.run_id,
    work_order_id: opts.invocation.work_order_id,
    process_result: opts.process_result,
    started_at: opts.base_result.started_at,
    ended_at: opts.base_result.ended_at,
    capabilities_invoked: opts.capabilities_used,
    metrics: opts.base_result.metrics,
    git,
    artifacts: artifactResult.observations,
    checks,
    collection_errors: [
      ...(opts.collection_errors ?? []),
      ...(git.state === "unavailable"
        ? gitDelta.errors.map((error) => `${error.operation}: ${error.message}`)
        : []),
    ],
  });
  const reference = await writeExecutionReceipt({
    receipt_path: opts.invocation.receipt_path,
    reference_path: path
      .relative(opts.invocation.repository_root, opts.invocation.receipt_path)
      .split(path.sep)
      .join("/"),
    receipt,
  });
  const receiptArtifact: RunnerResultArtifact = {
    path: opts.invocation.receipt_path,
    label: "execution-receipt",
  };
  const finalArtifacts = [...opts.artifacts, receiptArtifact];
  const changedPaths = git.state === "observed" ? git.delta.changed_paths : [];
  const evidencePaths = [
    ...artifactResult.observations.flatMap((artifact) =>
      artifact.state === "present" ? [artifact.path] : [],
    ),
    opts.invocation.receipt_path,
  ];
  const status =
    receipt.success_policy.outcome === "observed_success"
      ? opts.base_result.status
      : opts.base_result.status === "cancelled"
        ? "cancelled"
        : "failed";
  return {
    result: {
      ...opts.base_result,
      status,
      output_paths: finalArtifacts.map((artifact) => artifact.path),
      artifacts: finalArtifacts,
      evidence: {
        provenance: OBSERVED_PROVENANCE,
        evidence_paths: evidencePaths,
        changed_paths: changedPaths,
        files_changed_count: changedPaths.length,
        observed_checks: checks.map((check) => ({
          id: check.id,
          status: check.status,
        })),
        receipt_path: reference.path,
        receipt_sha256: reference.sha256,
      },
      execution_receipt: reference,
    },
    receipt_path: opts.invocation.receipt_path,
  };
}
