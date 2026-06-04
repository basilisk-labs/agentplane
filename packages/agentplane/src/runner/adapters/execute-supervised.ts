import { CliError } from "../../shared/errors.js";
import { runSupervisedProcess, type SupervisedProcessResult } from "../process-supervision/run.js";
import {
  InvalidRunnerResultManifestError,
  manifestFromRunnerResult,
  preserveInvalidRunnerResultManifest,
  preserveRunnerResultManifestSource,
  readRunnerResultManifest,
  salvageBlockedRunnerResultManifest,
  writeRunnerResultManifest,
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
  preserveSourceManifestOnSuccess?: (manifest: RunnerResultManifest) => boolean;
  successEventMessage: (result: RunnerResult) => string;
  failureSummary: string;
  failureEventType: "runner_execute_error" | "runner_execute_finish";
  failureEventMessage: (result: RunnerResult) => string;
}): Promise<RunnerResult> {
  const { invocation } = opts;
  const started_at = new Date().toISOString();
  let processResult: SupervisedProcessResult | null = null;

  try {
    opts.assertInvocation(invocation);
    const repository = RunnerRunRepository.fromInvocation(invocation);
    const stdinText = await opts.readStdinText(invocation);
    processResult = await runSupervisedProcess({
      invocation,
      stdin_text: stdinText,
      start_message: opts.startMessage,
    });
    const manifest = await readRunnerResultManifest(invocation.result_path);
    const sourceManifestPath =
      opts.preserveSourceManifestOnSuccess?.(manifest) === true
        ? await preserveRunnerResultManifestSource(invocation.result_path)
        : null;
    assertRunnerManifestArtifactPolicy({
      adapter_id: invocation.adapter_id,
      allowed_prefixes: readRecipeArtifactPrefixesFromRunnerEnv(invocation.env),
      manifest,
    });
    opts.assertManifest?.({ invocation, processResult, manifest });

    const artifacts = opts.buildArtifacts({
      invocation,
      processResult,
      source_manifest_path: sourceManifestPath,
    });
    const output_paths = artifacts.map((artifact) => artifact.path);
    const baseResult = await opts.buildBaseResult({
      invocation,
      processResult,
      artifacts,
      output_paths,
    });
    const result = opts.applyManifest({ base: baseResult, manifest });
    await writeRunnerResultManifest({
      result_path: invocation.result_path,
      manifest: manifestFromRunnerResult(result),
    });
    await writeRunnerExecutionState({
      repository,
      result,
      processResult,
      command: invocation.argv.join(" "),
    });
    await appendRunnerExecutionEvent({
      repository,
      invocation,
      result,
      processResult,
      message: opts.successEventMessage(result),
      outputPaths: output_paths,
    });
    return result;
  } catch (err) {
    const ended_at = new Date().toISOString();
    const sourceManifestPath = await preserveRunnerResultManifestSource(invocation.result_path);
    const invalidManifestPath =
      err instanceof InvalidRunnerResultManifestError
        ? await preserveInvalidRunnerResultManifest({
            result_path: invocation.result_path,
            error: err,
          })
        : null;
    const blockedManifestFallback =
      err instanceof InvalidRunnerResultManifestError
        ? salvageBlockedRunnerResultManifest(err.raw_content)
        : null;
    const artifacts = opts.buildArtifacts({
      invocation,
      processResult,
      source_manifest_path: sourceManifestPath,
      invalid_manifest_path: invalidManifestPath,
    });
    const output_paths = artifacts.map((artifact) => artifact.path);
    const result: RunnerResult = {
      ...runnerAdapterFailureResult({
        err,
        summary:
          blockedManifestFallback?.summary ??
          blockedManifestFallback?.evidence?.blocked_reason ??
          opts.failureSummary,
        started_at,
        ended_at,
        exit_code: err instanceof CliError ? err.exitCode : undefined,
        output_paths,
      }),
      artifacts,
      capabilities_used: opts.capabilitiesUsed(invocation),
      evidence: blockedManifestFallback?.evidence,
    };
    await writeRunnerResultManifest({
      result_path: invocation.result_path,
      manifest: manifestFromRunnerResult(result),
    });
    const repository = RunnerRunRepository.fromInvocation(invocation);
    await writeRunnerResultState({ repository, result });
    await appendRunnerResultEvent({
      repository,
      invocation,
      result,
      type: opts.failureEventType,
      message: opts.failureEventMessage(result),
      outputPaths: output_paths,
    });
    return result;
  }
}
