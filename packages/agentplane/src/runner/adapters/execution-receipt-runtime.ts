import path from "node:path";

import type {
  ExecutionReceiptGitDeltaEntry,
  ExecutionReceiptGitObservation,
  ExecutionReceiptObservedCheck,
  ExecutionReceiptScopeEvaluation,
} from "@agentplaneorg/core/schemas";

import { createExecutionReceipt, writeExecutionReceipt } from "../execution-receipt.js";
import {
  captureGitSnapshot,
  compareGitSnapshots,
  type GitSnapshotDelta,
} from "../observation/git-snapshot.js";
import {
  captureProtectedFilesystemSnapshot,
  compareProtectedFilesystemSnapshots,
} from "../observation/protected-filesystem.js";
import { observeRunnerArtifacts } from "../observation/artifacts.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerResultArtifact,
} from "../types.js";
import type { SupervisedProcessResult } from "../process-supervision/run.js";
import type { RunnerRunRepository } from "../run-repository.js";
import {
  evaluateRunnerWriteScope,
  type RunnerProtectedFilesystemObservation,
} from "../write-scope.js";
import { createSupervisorExecutionReceiptLocator } from "../task-run-paths.js";
import type {
  RunnerExecutionObservationBefore,
  RunnerReceiptManifestState,
} from "./execution-receipt-runtime-types.js";
import { buildExecutionContainmentChecks } from "./execution-receipt-containment.js";
import {
  captureRunnerExecutionBeforeImpl,
  containedRunDirectory,
  filesystemObservationExcludedRoots,
  mapProtectedFilesystemObservation,
} from "./execution-receipt-observation.js";

export type {
  RunnerExecutionObservationBefore,
  RunnerReceiptManifestState,
} from "./execution-receipt-runtime-types.js";

function receiptTaskId(bundle: RunnerContextBundle | null | undefined): string {
  const taskId = bundle?.task?.task_id ?? bundle?.target.task_id;
  if (!taskId) {
    throw new Error("Runner execution receipt requires a task-bound supervisor artifact locator.");
  }
  return taskId;
}

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

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

function expectedArtifactDigests(
  observationBefore: RunnerExecutionObservationBefore,
  invocation: RunnerInvocation,
  sourceManifestSha256?: string | null,
): Map<string, string> {
  const expected = new Map(observationBefore.prepared_artifact_digests);
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
  opts: { allow_unsupported_effect_fallback: boolean },
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
      required: !opts.allow_unsupported_effect_fallback,
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

function writeScopeCheck(scope: ExecutionReceiptScopeEvaluation): ExecutionReceiptObservedCheck {
  if (scope.state === "passed") {
    return observedCheck({
      id: "runner.scope.within_authority",
      required: true,
      status: "passed",
      details: "Observed writes remained inside writable roots and outside protected paths.",
    });
  }
  if (scope.state === "rejected") {
    return observedCheck({
      id: "runner.scope.within_authority",
      required: true,
      status: "failed",
      details: scope.violations
        .map((violation) => `${violation.kind}:${violation.path}`)
        .join("; "),
    });
  }
  return observedCheck({
    id: "runner.scope.within_authority",
    required: true,
    status: "not_run",
    details:
      scope.state === "unverified"
        ? scope.limitations.join("; ")
        : "The runner bundle did not contain a write-scope policy.",
  });
}

function deferredTaskVerificationCheck(
  bundle: RunnerContextBundle | null,
): ExecutionReceiptObservedCheck {
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

export async function captureRunnerExecutionBefore(opts: {
  invocation: RunnerInvocation;
  repository: RunnerRunRepository;
}): Promise<RunnerExecutionObservationBefore> {
  return await captureRunnerExecutionBeforeImpl(opts);
}

export async function finalizeRunnerExecutionReceipt(opts: {
  invocation: RunnerInvocation;
  repository: RunnerRunRepository;
  observation_before: RunnerExecutionObservationBefore;
  process_result: SupervisedProcessResult | null;
  base_result: RunnerResult;
  artifacts: RunnerResultArtifact[];
  manifest_state: RunnerReceiptManifestState;
  source_manifest_sha256?: string | null;
  capabilities_used: string[];
  collection_errors?: string[];
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<{ result: RunnerResult; receipt_path: string }> {
  await opts.assert_artifact_boundary?.("before final execution observation");
  const gitAfter = await captureGitSnapshot({
    repository_root: opts.invocation.repository_root,
    excluded_roots: containedRunDirectory(opts.invocation),
  });
  const gitDelta = await compareGitSnapshots({
    repository_root: opts.invocation.repository_root,
    before: opts.observation_before.git,
    after: gitAfter,
    excluded_roots: containedRunDirectory(opts.invocation),
  });
  const git = mapGitObservation(gitDelta);
  await opts.assert_artifact_boundary?.("after Git execution observation");
  const bundle = opts.observation_before.bundle;
  const protectedFilesystemDelta =
    opts.observation_before.protected_filesystem &&
    opts.observation_before.filesystem_observation_prefixes.length > 0 &&
    opts.observation_before.filesystem_observation_mode
      ? compareProtectedFilesystemSnapshots({
          repository_root: opts.invocation.repository_root,
          before: opts.observation_before.protected_filesystem,
          after: await captureProtectedFilesystemSnapshot({
            repository_root: opts.invocation.repository_root,
            protected_prefixes: opts.observation_before.filesystem_observation_prefixes,
            capture_mode: opts.observation_before.filesystem_observation_mode,
            excluded_roots: filesystemObservationExcludedRoots(opts.invocation),
          }),
        })
      : null;
  const protectedFilesystem =
    opts.observation_before.filesystem_observation_prefixes.length === 0 &&
    opts.observation_before.errors.length === 0
      ? ({
          state: "observed",
          changed_paths: [],
          errors: [],
        } satisfies RunnerProtectedFilesystemObservation)
      : mapProtectedFilesystemObservation(protectedFilesystemDelta, opts.observation_before.errors);
  const scopeEvaluation = bundle
    ? evaluateRunnerWriteScope({
        bundle,
        git,
        protected_filesystem: protectedFilesystem,
      })
    : {
        provenance: OBSERVED_PROVENANCE,
        state: "not_evaluated" as const,
      };
  await opts.assert_artifact_boundary?.("before observing runner artifacts");
  const artifactResult = await observeRunnerArtifacts({
    artifacts: opts.artifacts,
    excluded_paths: [opts.invocation.result_path, opts.invocation.receipt_path],
    expected_sha256_by_path: expectedArtifactDigests(
      opts.observation_before,
      opts.invocation,
      opts.source_manifest_sha256,
    ),
  });
  await opts.assert_artifact_boundary?.("after observing runner artifacts");
  const taskVerification = deferredTaskVerificationCheck(bundle);
  const containmentChecks = buildExecutionContainmentChecks({
    invocation: opts.invocation,
    bundle,
    process_result: opts.process_result,
  });
  const allowUnsupportedEffectFallback = containmentChecks.some(
    (check) =>
      check.id === "runner.sandbox.filesystem_effects_enforced" &&
      check.required &&
      check.status === "passed",
  );
  const checks: ExecutionReceiptObservedCheck[] = [
    observedCheck({
      id: "runner.process.observed",
      required: true,
      status: opts.process_result ? "passed" : "failed",
      details: opts.process_result
        ? "The supervisor captured child-process completion."
        : "The supervisor did not capture child-process completion.",
    }),
    processGroupCleanupCheck(opts.process_result, {
      allow_unsupported_effect_fallback: allowUnsupportedEffectFallback,
    }),
    ...containmentChecks,
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
      id: "runner.protected_filesystem.observed",
      required: opts.observation_before.filesystem_observation_prefixes.length > 0,
      status:
        opts.observation_before.filesystem_observation_prefixes.length === 0
          ? "not_run"
          : protectedFilesystem.state === "observed"
            ? "passed"
            : "not_run",
      details:
        opts.observation_before.filesystem_observation_prefixes.length === 0
          ? "The runner bundle did not require supplemental filesystem observation."
          : protectedFilesystem.state === "observed"
            ? "The supervisor captured and compared required filesystem state before and after execution."
            : protectedFilesystem.errors.join("; "),
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
    writeScopeCheck(scopeEvaluation),
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
    scope_evaluation: scopeEvaluation,
    collection_errors: [
      ...(opts.collection_errors ?? []),
      ...opts.observation_before.errors,
      ...(git.state === "unavailable"
        ? gitDelta.errors.map((error) => `${error.operation}: ${error.message}`)
        : []),
      ...(protectedFilesystem.state === "unavailable" ? protectedFilesystem.errors : []),
    ],
  });
  await opts.assert_artifact_boundary?.("before writing execution receipt");
  const reference = await writeExecutionReceipt({
    receipt_path: opts.invocation.receipt_path,
    reference_path: createSupervisorExecutionReceiptLocator({
      task_id: receiptTaskId(bundle),
      run_id: opts.invocation.run_id,
    }),
    receipt,
  });
  await opts.assert_artifact_boundary?.("after writing execution receipt");
  const receiptArtifact: RunnerResultArtifact = {
    path: opts.invocation.receipt_path,
    label: "execution-receipt",
  };
  const finalArtifacts = [...opts.artifacts, receiptArtifact];
  const changedPaths = [
    ...new Set([
      ...(git.state === "observed" ? git.delta.changed_paths : []),
      ...(protectedFilesystem.state === "observed" ? protectedFilesystem.changed_paths : []),
    ]),
  ].toSorted((left, right) => left.localeCompare(right));
  const evidencePaths = [
    ...artifactResult.observations.flatMap((artifact) =>
      artifact.state === "present" ? [artifact.path] : [],
    ),
    opts.invocation.receipt_path,
  ];
  const status =
    receipt.success_policy.outcome === "rejected" && opts.base_result.status !== "cancelled"
      ? "failed"
      : opts.base_result.status;
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
