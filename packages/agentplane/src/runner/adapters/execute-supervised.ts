import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
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
  captureRunnerGitBefore,
  finalizeRunnerExecutionReceipt,
  type RunnerReceiptManifestState,
} from "./execution-receipt-runtime.js";
import { runnerAdapterFailureResult } from "./shared.js";

type RunnerResultManifest = Awaited<ReturnType<typeof readRunnerResultManifest>>;

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
  const repository = RunnerRunRepository.fromInvocation(invocation);
  const gitBefore = await captureRunnerGitBefore(invocation);
  let processResult: SupervisedProcessResult | null = null;
  let sourceManifestPath: string | null = null;
  let sourceManifestSha256: string | null = null;
  let invalidManifestPath: string | null = null;
  let manifest: RunnerResultManifest = null;
  let manifestState: RunnerReceiptManifestState = "not_reached";
  let manifestAttempted = false;
  let executionError: unknown = null;
  let blockedManifestFallback: ReturnType<typeof salvageBlockedRunnerResultManifest> = null;
  let artifacts: NonNullable<RunnerResult["artifacts"]> = [];
  let baseResult: RunnerResult;
  try {
    opts.assertInvocation(invocation);
    const stdinText = await opts.readStdinText(invocation);
    processResult = await runSupervisedProcess({
      invocation,
      stdin_text: stdinText,
      start_message: opts.startMessage,
    });
    manifestAttempted = true;
    sourceManifestPath = await preserveRunnerResultManifestSource(invocation.result_path);
    if (sourceManifestPath) {
      const sourceText = await readFile(sourceManifestPath, "utf8");
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

  const finalized = await finalizeRunnerExecutionReceipt({
    invocation,
    repository,
    git_before: gitBefore,
    process_result: processResult,
    base_result: baseResult,
    artifacts,
    manifest_state: manifestState,
    source_manifest_sha256: sourceManifestSha256,
    capabilities_used: opts.capabilitiesUsed(invocation),
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
  await writeRunnerResultRecord({
    result_path: invocation.result_path,
    record: runnerResultRecordFromRunnerResult(result),
  });
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
  if (executionError === null && processResult) {
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
