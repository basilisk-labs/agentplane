import { createHash, randomUUID } from "node:crypto";
import { link, unlink } from "node:fs/promises";
import path from "node:path";
import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { runSupervisedProcess, type SupervisedProcessResult } from "../process-supervision/run.js";
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
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import { applyFinalTraceRetention } from "../trace-artifacts.js";

type RunnerResultManifest = Awaited<ReturnType<typeof readRunnerResultManifest>>;

const RUNNER_PRE_SPAWN_DECISION_FILENAME = ".runner-pre-spawn-decision.json";
const RUNNER_CANCELLATION_INTENT_FILENAME = ".runner-cancellation-intent.json";

export type RunnerPreSpawnDecision = {
  schema_version: 1;
  run_id: string;
  decision: "start" | "cancel";
  decided_at: string;
};

export type RunnerCancellationIntent = {
  schema_version: 1;
  run_id: string;
  requested_at: string;
};

export type PublishedRunnerControlRecord<T> = {
  record: T;
  won: boolean;
};

class RunnerCancelledBeforeSpawnError extends Error {
  constructor(readonly requested_at: string) {
    super("Runner execution was cancelled before child-process spawn.");
    this.name = "RunnerCancelledBeforeSpawnError";
  }
}

function parseRunnerPreSpawnDecision(raw: string, expectedRunId: string): RunnerPreSpawnDecision {
  const parsed = JSON.parse(raw) as Partial<RunnerPreSpawnDecision>;
  if (
    parsed.schema_version !== 1 ||
    parsed.run_id !== expectedRunId ||
    (parsed.decision !== "start" && parsed.decision !== "cancel") ||
    typeof parsed.decided_at !== "string" ||
    !parsed.decided_at.trim()
  ) {
    throw new Error(`Invalid runner pre-spawn decision for run_id=${expectedRunId}.`);
  }
  return parsed as RunnerPreSpawnDecision;
}

function parseRunnerCancellationIntent(
  raw: string,
  expectedRunId: string,
): RunnerCancellationIntent {
  const parsed = JSON.parse(raw) as Partial<RunnerCancellationIntent>;
  if (
    parsed.schema_version !== 1 ||
    parsed.run_id !== expectedRunId ||
    typeof parsed.requested_at !== "string" ||
    !parsed.requested_at.trim()
  ) {
    throw new Error(`Invalid runner cancellation intent for run_id=${expectedRunId}.`);
  }
  return parsed as RunnerCancellationIntent;
}

async function publishImmutableRunnerControlRecord<T>(opts: {
  run_dir: string;
  filename: string;
  label: string;
  record: T;
  parse: (raw: string) => T;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<T>> {
  const destinationPath = path.join(opts.run_dir, opts.filename);
  const temporaryPath = path.join(
    opts.run_dir,
    `.${opts.filename}.${process.pid}.${randomUUID()}.tmp`,
  );
  await opts.assert_artifact_boundary?.(`before publishing ${opts.label}`);
  await writeNewStableRegularFileNoFollow(
    temporaryPath,
    `${JSON.stringify(opts.record)}\n`,
    `${opts.label} temporary file`,
  );
  let won = false;
  try {
    try {
      await link(temporaryPath, destinationPath);
      won = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    }
  } finally {
    await unlink(temporaryPath);
  }
  const raw = await readStableRegularTextNoFollow(destinationPath, opts.label, {
    max_bytes: 4096,
  });
  const record = opts.parse(raw);
  await opts.assert_artifact_boundary?.(`after publishing ${opts.label}`);
  return { record, won };
}

export async function claimRunnerPreSpawnDecision(opts: {
  invocation: RunnerInvocation;
  decision: RunnerPreSpawnDecision["decision"];
  decided_at?: string;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<RunnerPreSpawnDecision>> {
  const record: RunnerPreSpawnDecision = {
    schema_version: 1,
    run_id: opts.invocation.run_id,
    decision: opts.decision,
    decided_at: opts.decided_at ?? new Date().toISOString(),
  };
  return await publishImmutableRunnerControlRecord({
    run_dir: opts.invocation.run_dir,
    filename: RUNNER_PRE_SPAWN_DECISION_FILENAME,
    label: "runner pre-spawn decision",
    record,
    parse: (raw) => parseRunnerPreSpawnDecision(raw, opts.invocation.run_id),
    assert_artifact_boundary: opts.assert_artifact_boundary,
  });
}

export async function publishRunnerCancellationIntent(opts: {
  invocation: RunnerInvocation;
  requested_at?: string;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<RunnerCancellationIntent>> {
  const record: RunnerCancellationIntent = {
    schema_version: 1,
    run_id: opts.invocation.run_id,
    requested_at: opts.requested_at ?? new Date().toISOString(),
  };
  return await publishImmutableRunnerControlRecord({
    run_dir: opts.invocation.run_dir,
    filename: RUNNER_CANCELLATION_INTENT_FILENAME,
    label: "runner cancellation intent",
    record,
    parse: (raw) => parseRunnerCancellationIntent(raw, opts.invocation.run_id),
    assert_artifact_boundary: opts.assert_artifact_boundary,
  });
}

async function readRunnerCancellationIntent(
  invocation: RunnerInvocation,
): Promise<RunnerCancellationIntent | null> {
  const intentPath = path.join(invocation.run_dir, RUNNER_CANCELLATION_INTENT_FILENAME);
  try {
    return parseRunnerCancellationIntent(
      await readStableRegularTextNoFollow(intentPath, "runner cancellation intent", {
        max_bytes: 4096,
      }),
      invocation.run_id,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
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
}): Promise<RunnerResult> {
  const { invocation } = opts;
  const started_at = new Date().toISOString();
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
  try {
    opts.assertInvocation(invocation);
    const startDecision = await claimRunnerPreSpawnDecision({
      invocation,
      decision: "start",
      assert_artifact_boundary: async (phase) => await runDirectoryBoundary.assertStable(phase),
    });
    if (startDecision.record.decision === "cancel") {
      throw new RunnerCancelledBeforeSpawnError(startDecision.record.decided_at);
    }
    if (!startDecision.won) {
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
    const cancellationIntent = await readRunnerCancellationIntent(invocation);
    if (cancellationIntent) {
      throw new RunnerCancelledBeforeSpawnError(cancellationIntent.requested_at);
    }
    processResult = await runSupervisedProcess({
      invocation,
      stdin_text: stdinText,
      start_message: opts.startMessage,
      observe_stdout_line: opts.observeStdoutLine,
      assert_artifact_boundary: async (phase) => {
        await runDirectoryBoundary.assertStable(phase);
        if (phase !== "immediately before spawning child process") return;
        const intent = await readRunnerCancellationIntent(invocation);
        if (intent) throw new RunnerCancelledBeforeSpawnError(intent.requested_at);
      },
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
  } catch (err) {
    if (isRunnerRunDirectoryBoundaryError(err)) throw err;
    if (err instanceof RunnerCancelledBeforeSpawnError) {
      cancelledBeforeSpawn = true;
      const ended_at = new Date().toISOString();
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
      const stateBeforeCancellationFinalization = await repository.readState();
      if (stateBeforeCancellationFinalization?.status === "prepared") {
        await repository.writeState(
          evolveRunnerRunState({
            state: stateBeforeCancellationFinalization,
            status: "cancelled",
            result: baseResult,
            updated_at: ended_at,
          }),
        );
      }
    } else {
      executionError = err;
      if (manifestAttempted) manifestState = "failed";
      const ended_at = new Date().toISOString();
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
  if (processResult) {
    await writeRunnerExecutionState({
      repository,
      result,
      processResult,
      command: invocation.argv.join(" "),
    });
  } else {
    await writeRunnerResultState({ repository, result });
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
  return result;
}
