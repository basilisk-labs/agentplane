import { createHash } from "node:crypto";
import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import {
  runSupervisedProcess,
  SupervisedProcessExecutionError,
  type SupervisedProcessResult,
} from "../process-supervision/run.js";
import { createSupervisionClock, type SupervisionClock } from "../process-supervision/clock.js";
import {
  InvalidRunnerResultManifestError,
  preserveInvalidRunnerResultManifest,
  preserveRunnerResultManifestSource,
  parseRunnerResultManifestText,
  readRunnerResultManifest,
  runnerResultRecordFromRunnerResult,
  salvageBlockedRunnerResultManifest,
  writeRunnerResultRecord,
} from "../result-manifest.js";
import {
  assertRunnerManifestArtifactPolicy,
  readRecipeArtifactPrefixesFromRunnerEnv,
} from "../result-manifest-policy.js";
import { RunnerRunRepository } from "../run-repository.js";
import type { RunnerInvocation, RunnerResult } from "../types.js";
import {
  appendRunnerExecutionEvent,
  appendRunnerResultEvent,
  writeRunnerExecutionState,
  writeRunnerResultState,
} from "./base.js";
import {
  captureRunnerExecutionBefore,
  finalizeRunnerExecutionReceipt,
  type RunnerReceiptManifestState,
} from "./execution-receipt-runtime.js";
import { runnerAdapterCancelledResult, runnerAdapterFailureResult } from "./shared.js";
import {
  captureRunnerRunDirectoryBoundary,
  isRunnerRunDirectoryBoundaryError,
} from "../run-directory-boundary.js";
import { readStableRegularTextNoFollow } from "../stable-file.js";
import { applyFinalTraceRetention } from "../trace-artifacts.js";
import {
  claimRunnerChildSpawn,
  claimRunnerPreSpawnDecision,
  finalizeRunnerPreSpawnCancellation,
  readRunnerCancellationIntent,
} from "./execution-control.js";

type RunnerResultManifest = Awaited<ReturnType<typeof readRunnerResultManifest>>;

class RunnerCancelledBeforeSpawnError extends Error {
  constructor(readonly requested_at: string) {
    super("Runner execution was cancelled before child-process spawn.");
    this.name = "RunnerCancelledBeforeSpawnError";
  }
}

export type SupervisedRunnerArtifactInput = {
  invocation: RunnerInvocation;
  processResult: SupervisedProcessResult | null;
  source_manifest_path?: string | null;
  invalid_manifest_path?: string | null;
};

export type SupervisedRunnerBaseResultInput = {
  invocation: RunnerInvocation;
  processResult: SupervisedProcessResult;
  artifacts: NonNullable<RunnerResult["artifacts"]>;
  output_paths: string[];
};

export async function executeSupervisedRunnerAdapter(opts: {
  invocation: RunnerInvocation;
  assertInvocation: (invocation: RunnerInvocation) => void;
  readStdinText: (invocation: RunnerInvocation) => Promise<string>;
  materializeResult?: (input: {
    invocation: RunnerInvocation;
    processResult: SupervisedProcessResult;
  }) => Promise<void>;
  observeStdoutLine?: (rawLine: string) => void;
  startMessage: string;
  buildArtifacts: (input: SupervisedRunnerArtifactInput) => NonNullable<RunnerResult["artifacts"]>;
  buildBaseResult: (input: SupervisedRunnerBaseResultInput) => Promise<RunnerResult> | RunnerResult;
  applyManifest: (opts: { base: RunnerResult; manifest: RunnerResultManifest }) => RunnerResult;
  capabilitiesUsed: (invocation: RunnerInvocation) => string[];
  assertManifest?: (opts: {
    invocation: RunnerInvocation;
    processResult: SupervisedProcessResult;
    manifest: RunnerResultManifest;
  }) => void;
  successEventMessage: (result: RunnerResult) => string;
  failureSummary: string;
  failureEventType: "runner_execute_error" | "runner_execute_finish";
  failureEventMessage: (result: RunnerResult) => string;
  maxOutputBytes?: number;
  supervisionClock?: SupervisionClock;
}): Promise<RunnerResult> {
  const { invocation } = opts;
  const supervisionClock = opts.supervisionClock ?? createSupervisionClock();
  const started_at = supervisionClock.nowIso();
  const runDirectoryBoundary = await captureRunnerRunDirectoryBoundary(invocation);
  const repository = RunnerRunRepository.fromInvocation(invocation, runDirectoryBoundary);
  await runDirectoryBoundary.assertStable("before pre-spawn observation");
  const observationBefore = await captureRunnerExecutionBefore({
    invocation,
    repository,
  });
  await runDirectoryBoundary.assertStable("after pre-spawn observation");
  const stdinText = await opts.readStdinText(invocation);
  let processResult: SupervisedProcessResult | null = null;
  let sourceManifestPath: string | null = null;
  let sourceManifestSha256: string | null = null;
  let invalidManifestPath: string | null = null;
  let manifest: RunnerResultManifest = null;
  let manifestState: RunnerReceiptManifestState = "not_reached";
  let manifestAttempted = false;
  let executionError: unknown = null;
  let cancelledBeforeSpawn = false;
  let blockedManifestFallback: ReturnType<typeof salvageBlockedRunnerResultManifest> = null;
  let artifacts: NonNullable<RunnerResult["artifacts"]> = [];
  let baseResult: RunnerResult;
  const startDecision = await claimRunnerPreSpawnDecision({
    invocation,
    decision: "start",
    assert_artifact_boundary: async (phase) => await runDirectoryBoundary.assertStable(phase),
  });
  supervisionClock.advanceToIso(startDecision.record.decided_at);
  if (startDecision.record.decision === "start" && !startDecision.won) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message: `Runner execution start was already claimed for run_id=${JSON.stringify(invocation.run_id)}.`,
      context: {
        run_id: invocation.run_id,
        decision: startDecision.record.decision,
        decided_at: startDecision.record.decided_at,
      },
    });
  }
  if (startDecision.record.decision === "cancel") {
    await finalizeRunnerPreSpawnCancellation({
      repository,
      decision: startDecision.record,
    });
  }
  try {
    if (startDecision.record.decision === "cancel") {
      throw new RunnerCancelledBeforeSpawnError(startDecision.record.decided_at);
    }
    if (!startDecision.record.owner_lease) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message: `Runner start authority is missing its owner lease for run_id=${JSON.stringify(invocation.run_id)}.`,
      });
    }
    const startOwnerLease = startDecision.record.owner_lease;
    opts.assertInvocation(invocation);
    const stateBeforeSpawn = await repository.readState();
    if (!stateBeforeSpawn) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message: `Runner prepared state is unavailable for run_id=${JSON.stringify(invocation.run_id)}.`,
        context: {
          run_id: invocation.run_id,
          state_path: invocation.state_path,
        },
      });
    }
    if (stateBeforeSpawn.status === "cancelled") {
      throw new RunnerCancelledBeforeSpawnError(stateBeforeSpawn.updated_at);
    }
    if (stateBeforeSpawn.status !== "prepared") {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Runner child-process spawn requires prepared state ` +
          `(current=${JSON.stringify(stateBeforeSpawn.status)}).`,
        context: {
          run_id: invocation.run_id,
          state_path: invocation.state_path,
          current_status: stateBeforeSpawn.status,
        },
      });
    }
    supervisionClock.advanceToIso(stateBeforeSpawn.updated_at);
    const cancellationIntent = await readRunnerCancellationIntent(invocation);
    if (cancellationIntent) {
      supervisionClock.advanceToIso(cancellationIntent.requested_at);
      throw new RunnerCancelledBeforeSpawnError(cancellationIntent.requested_at);
    }
    processResult = await runSupervisedProcess({
      invocation,
      stdin_text: stdinText,
      start_message: opts.startMessage,
      observe_stdout_line: opts.observeStdoutLine,
      read_cancellation_intent: async () => {
        await runDirectoryBoundary.assertStable("before reading cancellation intent");
        const intent = await readRunnerCancellationIntent(invocation);
        await runDirectoryBoundary.assertStable("after reading cancellation intent");
        return intent;
      },
      assert_artifact_boundary: async (phase) => {
        await runDirectoryBoundary.assertStable(phase);
        if (phase !== "immediately before spawning child process") return;
        const intentBeforeClaim = await readRunnerCancellationIntent(invocation);
        if (intentBeforeClaim) {
          supervisionClock.advanceToIso(intentBeforeClaim.requested_at);
          throw new RunnerCancelledBeforeSpawnError(intentBeforeClaim.requested_at);
        }
        const spawnClaim = await claimRunnerChildSpawn({
          invocation,
          start_owner_id: startOwnerLease.owner_id,
          assert_artifact_boundary: async (claimPhase) =>
            await runDirectoryBoundary.assertStable(claimPhase),
        });
        if (!spawnClaim.won || spawnClaim.record.start_owner_id !== startOwnerLease.owner_id) {
          throw new CliError({
            exitCode: exitCodeForError("E_RUNTIME"),
            code: "E_RUNTIME",
            message:
              `Runner child-process spawn authority was already claimed for ` +
              `run_id=${JSON.stringify(invocation.run_id)}.`,
          });
        }
        const intentAfterClaim = await readRunnerCancellationIntent(invocation);
        if (intentAfterClaim) {
          supervisionClock.advanceToIso(intentAfterClaim.requested_at);
          throw new RunnerCancelledBeforeSpawnError(intentAfterClaim.requested_at);
        }
      },
      ...(opts.maxOutputBytes === undefined ? {} : { max_output_bytes: opts.maxOutputBytes }),
      clock: supervisionClock,
    });
    await runDirectoryBoundary.assertStable("after child-process completion");
    manifestAttempted = true;
    await runDirectoryBoundary.assertStable("before materializing semantic result");
    await opts.materializeResult?.({ invocation, processResult });
    await runDirectoryBoundary.assertStable("after materializing semantic result");
    sourceManifestPath = await preserveRunnerResultManifestSource(invocation.result_path);
    if (sourceManifestPath) {
      const sourceText = await readStableRegularTextNoFollow(
        sourceManifestPath,
        "runner result source manifest",
      );
      sourceManifestSha256 = `sha256:${createHash("sha256").update(sourceText, "utf8").digest("hex")}`;
      manifest = parseRunnerResultManifestText(sourceText, sourceManifestPath);
    } else {
      manifest = await readRunnerResultManifest(invocation.result_path);
    }
    if (manifest && manifest.semantic_result.value.work_order_id !== invocation.work_order_id) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Agent semantic result work_order_id does not match the supervised invocation ` +
          `(${JSON.stringify(manifest.semantic_result.value.work_order_id)} != ${JSON.stringify(invocation.work_order_id)}).`,
        context: {
          adapter_id: invocation.adapter_id,
          expected_work_order_id: invocation.work_order_id,
          agent_reported_work_order_id: manifest.semantic_result.value.work_order_id,
        },
      });
    }
    assertRunnerManifestArtifactPolicy({
      adapter_id: invocation.adapter_id,
      allowed_prefixes: readRecipeArtifactPrefixesFromRunnerEnv(invocation.env),
      manifest,
    });
    opts.assertManifest?.({ invocation, processResult, manifest });
    manifestState = manifest ? "valid" : "missing_allowed";

    artifacts = opts.buildArtifacts({
      invocation,
      processResult,
      source_manifest_path: sourceManifestPath,
    });
    const output_paths = artifacts.map((artifact) => artifact.path);
    baseResult = await opts.buildBaseResult({
      invocation,
      processResult,
      artifacts,
      output_paths,
    });
  } catch (caught) {
    const err = caught instanceof SupervisedProcessExecutionError ? caught.primary_error : caught;
    if (caught instanceof SupervisedProcessExecutionError) {
      processResult = caught.process_result;
    }
    if (isRunnerRunDirectoryBoundaryError(err)) throw err;
    if (err instanceof RunnerCancelledBeforeSpawnError) {
      cancelledBeforeSpawn = true;
      const ended_at = supervisionClock.nowIso();
      artifacts = opts.buildArtifacts({
        invocation,
        processResult: null,
      });
      const output_paths = artifacts.map((artifact) => artifact.path);
      baseResult = {
        ...runnerAdapterCancelledResult({
          reason: err.message,
          summary: "Runner execution was cancelled before process spawn.",
          started_at,
          ended_at,
          output_paths,
        }),
        artifacts,
        capabilities_used: opts.capabilitiesUsed(invocation),
      };
    } else {
      executionError = err;
      if (manifestAttempted) manifestState = "failed";
      const ended_at = supervisionClock.nowIso();
      invalidManifestPath =
        err instanceof InvalidRunnerResultManifestError
          ? await preserveInvalidRunnerResultManifest({
              result_path: invocation.result_path,
              error: err,
            })
          : null;
      blockedManifestFallback =
        err instanceof InvalidRunnerResultManifestError
          ? salvageBlockedRunnerResultManifest(err.raw_content, invocation.result_path)
          : null;
      artifacts = opts.buildArtifacts({
        invocation,
        processResult,
        source_manifest_path: sourceManifestPath,
        invalid_manifest_path: invalidManifestPath,
      });
      const output_paths = artifacts.map((artifact) => artifact.path);
      baseResult = {
        ...runnerAdapterFailureResult({
          err,
          summary: opts.failureSummary,
          started_at: processResult?.started_at ?? started_at,
          ended_at,
          exit_code: err instanceof CliError ? err.exitCode : undefined,
          output_paths,
        }),
        artifacts,
        capabilities_used: opts.capabilitiesUsed(invocation),
      };
    }
  }

  const finalized = await finalizeRunnerExecutionReceipt({
    invocation,
    repository,
    observation_before: observationBefore,
    process_result: processResult,
    base_result: baseResult,
    artifacts,
    manifest_state: manifestState,
    source_manifest_sha256: sourceManifestSha256,
    capabilities_used: opts.capabilitiesUsed(invocation),
    assert_artifact_boundary: async (phase) => await runDirectoryBoundary.assertStable(phase),
  });
  let result =
    executionError === null
      ? opts.applyManifest({ base: finalized.result, manifest })
      : finalized.result;
  if (blockedManifestFallback) {
    result = {
      ...result,
      ...blockedManifestFallback,
    };
  }
  if (processResult) {
    const finalRetentionStatus =
      result.status === "success" &&
      result.execution_receipt?.verification_state === "observed_success"
        ? "success"
        : result.status === "cancelled"
          ? "cancelled"
          : "failed";
    await runDirectoryBoundary.assertStable("before applying final trace retention");
    const [traceArtifact, stderrArtifact] = await Promise.all([
      applyFinalTraceRetention({
        file_path: invocation.trace_path,
        policy: invocation.trace_policy,
        run_status: finalRetentionStatus,
      }),
      applyFinalTraceRetention({
        file_path: invocation.stderr_path,
        policy: invocation.trace_policy,
        run_status: finalRetentionStatus,
      }),
    ]);
    await runDirectoryBoundary.assertStable("after applying final trace retention");
    processResult = {
      ...processResult,
      trace_artifact_path: traceArtifact.artifact_path,
      trace_archive_path: traceArtifact.archive_path,
      stderr_artifact_path: stderrArtifact.artifact_path,
      stderr_archive_path: stderrArtifact.archive_path,
    };
    const retainedArtifacts = opts.buildArtifacts({
      invocation,
      processResult,
      source_manifest_path: sourceManifestPath,
      invalid_manifest_path: invalidManifestPath,
    });
    const receiptArtifact = {
      path: invocation.receipt_path,
      label: "execution-receipt",
    };
    const retainedArtifactsWithReceipt = [...retainedArtifacts, receiptArtifact];
    result = {
      ...result,
      artifacts: retainedArtifactsWithReceipt,
      output_paths: retainedArtifactsWithReceipt.map((artifact) => artifact.path),
      evidence: result.evidence
        ? {
            ...result.evidence,
            evidence_paths: retainedArtifactsWithReceipt.map((artifact) => artifact.path),
          }
        : result.evidence,
    };
  }
  await runDirectoryBoundary.assertStable("before writing canonical runner result");
  await writeRunnerResultRecord({
    result_path: invocation.result_path,
    record: runnerResultRecordFromRunnerResult(result),
  });
  await runDirectoryBoundary.assertStable("after writing canonical runner result");
  const outputPaths = result.output_paths ?? artifacts.map((artifact) => artifact.path);
  const canonicalState = processResult
    ? await writeRunnerExecutionState({
        repository,
        result,
        processResult,
        command: invocation.argv.join(" "),
      })
    : await writeRunnerResultState({ repository, result });
  if (canonicalState?.result && canonicalState.result !== result) {
    result = canonicalState.result;
    await writeRunnerResultRecord({
      result_path: invocation.result_path,
      record: runnerResultRecordFromRunnerResult(result),
    });
  }
  if (cancelledBeforeSpawn) {
    await repository.appendEvent({
      at: result.ended_at,
      type: "runner_execute_cancelled_before_start",
      message: "runner execution cancelled before child-process spawn",
      data: {
        adapter_id: invocation.adapter_id,
        run_id: invocation.run_id,
      },
    });
  } else if (executionError === null && processResult) {
    await appendRunnerExecutionEvent({
      repository,
      invocation,
      result,
      processResult,
      message: opts.successEventMessage(result),
      outputPaths,
    });
  } else {
    await appendRunnerResultEvent({
      repository,
      invocation,
      result,
      type: opts.failureEventType,
      message: opts.failureEventMessage(result),
      outputPaths,
    });
  }
  const clockDiagnosticAt = supervisionClock.nowIso();
  const clockDiagnostic = supervisionClock.diagnostic();
  if (clockDiagnostic) {
    await runDirectoryBoundary.assertStable("before writing clock-regression diagnostic");
    await repository.appendEvent({
      at: clockDiagnosticAt,
      type: "runner_wall_clock_regression_observed",
      message:
        "runner supervision observed wall-clock regression and preserved causal timestamps via monotonic projection",
      data: clockDiagnostic,
    });
    await runDirectoryBoundary.assertStable("after writing clock-regression diagnostic");
  }
  return result;
}
