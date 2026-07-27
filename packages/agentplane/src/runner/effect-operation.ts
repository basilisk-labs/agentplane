import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import {
  createRunnerEffectClaim,
  createRunnerEffectJournal,
  createRunnerEffectOperation,
  createRunnerEffectOperationRef,
  digestRunnerEffectValue,
  validateRunnerEffectClaim,
  validateRunnerEffectJournal,
  validateRunnerEffectOperation,
  validateRunnerEffectOperationRef,
  type RunnerEffectJournalPhase,
  type RunnerEffectOperation,
  type RunnerEffectOperationRef,
  type RunnerEffectReplayDisposition,
} from "@agentplaneorg/core/schemas";

import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";

import { ensureStableRunnerArtifactDirectoryChain } from "./run-directory-boundary.js";
import { readStableRegularTextNoFollow, writeNewStableRegularFileNoFollow } from "./stable-file.js";
import { assertSafeRunnerRunId } from "./task-run-paths.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerStateFingerprintRecord,
} from "./types.js";

const EFFECT_OPERATIONS_DIRECTORY = "effect-operations";
const EFFECT_OPERATION_FILENAME = "operation.json";
const EFFECT_JOURNAL_FILENAME = "journal.json";
const EFFECT_START_CLAIM_FILENAME = "start-claim.json";
const EFFECT_OPERATION_REF_FILENAME = ".runner-effect-operation.json";
const EFFECT_ARTIFACT_MAX_BYTES = 64 * 1024;
export const RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV = "AGENTPLANE_RUNNER_EFFECT_IDEMPOTENCY_KEY";

const JOURNAL_PHASE_ORDER: Record<RunnerEffectJournalPhase, number> = {
  prepared: 0,
  started: 1,
  effect_unknown: 2,
  post_state_unknown: 2,
  accepted: 2,
};

export type RunnerEffectOperationPaths = {
  task_dir: string;
  run_ref_path: string;
  operation_dir: string;
  operation_path: string;
  journal_path: string;
  claim_path: string;
};

export type PreparedRunnerEffectOperation = {
  operation: RunnerEffectOperation;
  reference: RunnerEffectOperationRef;
  journal: NonNullable<Awaited<ReturnType<typeof readRunnerEffectJournal>>>;
  paths: RunnerEffectOperationPaths;
};

export type StartedRunnerEffectOperation = PreparedRunnerEffectOperation & {
  journal: NonNullable<Awaited<ReturnType<typeof readRunnerEffectJournal>>>;
};

function runtimeError(message: string, context: Record<string, unknown>): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message,
    context,
  });
}

function taskIdFromBundle(bundle: RunnerContextBundle): string {
  const taskId = bundle.task?.task_id ?? bundle.target.task_id;
  if (!taskId) throw new Error("Runner effect operation requires a task-bound invocation.");
  return taskId;
}

function taskDirectoryFromRunDir(runDir: string): string {
  return path.dirname(path.dirname(path.resolve(runDir)));
}

function operationKeySegment(operationKey: string): string {
  const prefix = "sha256:";
  if (
    !operationKey.startsWith(prefix) ||
    !/^[0-9a-f]{64}$/u.test(operationKey.slice(prefix.length))
  ) {
    throw new Error(`Runner effect operation key is not a safe directory segment: ${operationKey}`);
  }
  return operationKey.slice(prefix.length);
}

export function resolveRunnerEffectOperationPaths(opts: {
  run_dir: string;
  operation_key: string;
}): RunnerEffectOperationPaths {
  const task_dir = taskDirectoryFromRunDir(opts.run_dir);
  const operation_dir = path.join(
    task_dir,
    EFFECT_OPERATIONS_DIRECTORY,
    operationKeySegment(opts.operation_key),
  );
  return {
    task_dir,
    run_ref_path: path.join(path.resolve(opts.run_dir), EFFECT_OPERATION_REF_FILENAME),
    operation_dir,
    operation_path: path.join(operation_dir, EFFECT_OPERATION_FILENAME),
    journal_path: path.join(operation_dir, EFFECT_JOURNAL_FILENAME),
    claim_path: path.join(operation_dir, EFFECT_START_CLAIM_FILENAME),
  };
}

async function readOptional<T>(opts: {
  file_path: string;
  label: string;
  parse: (value: unknown) => T;
}): Promise<T | null> {
  try {
    return opts.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(opts.file_path, opts.label, {
          max_bytes: EFFECT_ARTIFACT_MAX_BYTES,
        }),
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

async function readRunnerEffectOperation(filePath: string): Promise<RunnerEffectOperation | null> {
  return await readOptional({
    file_path: filePath,
    label: "runner effect operation",
    parse: validateRunnerEffectOperation,
  });
}

async function readRunnerEffectJournal(
  filePath: string,
): Promise<ReturnType<typeof validateRunnerEffectJournal> | null> {
  return await readOptional({
    file_path: filePath,
    label: "runner effect journal",
    parse: validateRunnerEffectJournal,
  });
}

async function readRunnerEffectClaim(
  filePath: string,
): Promise<ReturnType<typeof validateRunnerEffectClaim> | null> {
  return await readOptional({
    file_path: filePath,
    label: "runner effect start claim",
    parse: validateRunnerEffectClaim,
  });
}

async function readRunnerEffectOperationRef(
  filePath: string,
): Promise<RunnerEffectOperationRef | null> {
  return await readOptional({
    file_path: filePath,
    label: "runner effect operation reference",
    parse: validateRunnerEffectOperationRef,
  });
}

function operationMatchesIdentity(
  left: RunnerEffectOperation,
  right: RunnerEffectOperation,
): boolean {
  return (
    left.operation_key === right.operation_key &&
    left.claim_generation === right.claim_generation &&
    left.task_id === right.task_id &&
    left.adapter_id === right.adapter_id &&
    left.work_order_id === right.work_order_id &&
    left.authority_ref === right.authority_ref &&
    left.authority_digest === right.authority_digest &&
    left.precondition_fingerprint_digest === right.precondition_fingerprint_digest &&
    left.precondition_policy_digest === right.precondition_policy_digest &&
    left.invocation_digest === right.invocation_digest &&
    left.enforcement === right.enforcement &&
    left.idempotency_key === right.idempotency_key &&
    left.expected_postconditions.join("\n") === right.expected_postconditions.join("\n") &&
    JSON.stringify(left.replay_source) === JSON.stringify(right.replay_source)
  );
}

function adapterForwardsEffectIdempotencyKey(bundle: RunnerContextBundle): boolean {
  const capability = bundle.execution?.adapter_capabilities?.fields.effect_idempotency_key;
  return capability?.level === "native" && capability.channel === "env";
}

function injectionEnvironmentKeys(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
}): string[] {
  const keys = new Set(Object.keys(opts.invocation.env));
  if (adapterForwardsEffectIdempotencyKey(opts.bundle)) {
    keys.add(RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV);
  }
  return [...keys].toSorted();
}

function applyForwardedEffectIdempotencyKey(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  operation: RunnerEffectOperation;
}): void {
  if (opts.operation.enforcement !== "provider_key_forwarded") return;
  if (!adapterForwardsEffectIdempotencyKey(opts.bundle)) {
    throw runtimeError("Runner operation requires a provider idempotency-key forwarding adapter.", {
      reason: "runner_effect_provider_forwarding_unavailable",
      operation_key: opts.operation.operation_key,
      adapter_id: opts.invocation.adapter_id,
    });
  }
  const existing = opts.invocation.env[RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV];
  if (existing && existing !== opts.operation.idempotency_key) {
    throw runtimeError("Runner invocation contains an incompatible provider idempotency key.", {
      reason: "runner_effect_provider_key_conflict",
      operation_key: opts.operation.operation_key,
      adapter_id: opts.invocation.adapter_id,
    });
  }
  opts.invocation.env[RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV] = opts.operation.idempotency_key;
}

function buildFreshEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  replay_source?: {
    source_run_id: string;
    disposition: RunnerEffectReplayDisposition;
  } | null;
}): RunnerEffectOperation {
  const authority = opts.bundle.work_order?.authority ?? {
    kind: "runner_route_authority",
    state_fingerprint: opts.state_fingerprint.precondition_fingerprint.digest,
  };
  return createRunnerEffectOperation({
    task_id: taskIdFromBundle(opts.bundle),
    origin_run_id: opts.invocation.run_id,
    adapter_id: opts.invocation.adapter_id,
    work_order_id: opts.invocation.work_order_id,
    authority_ref: opts.bundle.work_order
      ? `work-order:${opts.bundle.work_order.work_order_id}`
      : `runner:${taskIdFromBundle(opts.bundle)}:${opts.state_fingerprint.precondition_fingerprint.digest}`,
    authority_digest: digestRunnerEffectValue(authority),
    precondition_fingerprint_digest: opts.state_fingerprint.precondition_fingerprint.digest,
    precondition_policy_digest: digestRunnerEffectValue(opts.state_fingerprint.precondition_policy),
    invocation_digest: digestRunnerEffectValue({
      adapter_id: opts.invocation.adapter_id,
      argv: opts.invocation.argv,
      env_keys: injectionEnvironmentKeys(opts),
      work_order_id: opts.invocation.work_order_id,
    }),
    expected_postconditions: [
      "runner.execution_receipt.observed",
      "runner.result.recorded",
      "runner.state_fingerprint.recorded",
    ],
    replay_source: opts.replay_source
      ? {
          source_run_id: opts.replay_source.source_run_id,
          destination_run_id: opts.invocation.run_id,
          disposition: opts.replay_source.disposition,
        }
      : null,
    enforcement: adapterForwardsEffectIdempotencyKey(opts.bundle)
      ? "provider_key_forwarded"
      : "supervisor_single_spawn",
  });
}

async function ensureOperationDirectory(opts: {
  artifact_root: string;
  paths: RunnerEffectOperationPaths;
}): Promise<void> {
  await ensureStableRunnerArtifactDirectoryChain(opts.artifact_root, opts.paths.operation_dir);
}

async function writeImmutableJson(opts: {
  file_path: string;
  label: string;
  value: unknown;
}): Promise<boolean> {
  try {
    await writeNewStableRegularFileNoFollow(
      opts.file_path,
      `${JSON.stringify(opts.value, null, 2)}\n`,
      opts.label,
    );
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Refusing pre-existing")) return false;
    throw error;
  }
}

async function writeJournal(opts: {
  paths: RunnerEffectOperationPaths;
  journal: ReturnType<typeof validateRunnerEffectJournal>;
}): Promise<void> {
  await atomicWriteFile(
    opts.paths.journal_path,
    `${JSON.stringify(opts.journal, null, 2)}\n`,
    "utf8",
  );
  const observed = await readRunnerEffectJournal(opts.paths.journal_path);
  if (!observed || observed.digest !== opts.journal.digest) {
    throw new Error(
      "Runner effect journal changed while its atomic transition was being observed.",
    );
  }
}

async function readEffectOperationForRun(opts: {
  run_dir: string;
  artifact_root: string;
  expected_run_id: string;
}): Promise<{ operation: RunnerEffectOperation; reference: RunnerEffectOperationRef } | null> {
  const reference = await readRunnerEffectOperationRef(
    path.join(path.resolve(opts.run_dir), EFFECT_OPERATION_REF_FILENAME),
  );
  if (!reference) return null;
  if (reference.run_id !== opts.expected_run_id) {
    throw runtimeError("Runner effect operation reference is bound to a different run.", {
      reason: "runner_effect_reference_run_mismatch",
      expected_run_id: opts.expected_run_id,
      observed_run_id: reference.run_id,
    });
  }
  const paths = resolveRunnerEffectOperationPaths({
    run_dir: opts.run_dir,
    operation_key: reference.operation_key,
  });
  await ensureOperationDirectory({ artifact_root: opts.artifact_root, paths });
  const operation = await readRunnerEffectOperation(paths.operation_path);
  if (!operation || operation.digest !== reference.operation_digest) {
    throw runtimeError(
      "Runner effect operation reference does not resolve to its immutable operation.",
      {
        reason: "runner_effect_operation_reference_invalid",
        operation_key: reference.operation_key,
        operation_digest: reference.operation_digest,
      },
    );
  }
  if (
    operation.claim_generation !== reference.claim_generation ||
    operation.enforcement !== reference.enforcement
  ) {
    throw runtimeError("Runner effect operation reference has incompatible claim authority.", {
      reason: "runner_effect_operation_reference_authority_invalid",
      operation_key: operation.operation_key,
    });
  }
  return { operation, reference };
}

export async function prepareRunnerEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  source_run_id?: string | null;
}): Promise<PreparedRunnerEffectOperation> {
  const artifactRoot = opts.invocation.artifact_root ?? opts.invocation.repository_root;
  const existingForRun = await readEffectOperationForRun({
    run_dir: opts.invocation.run_dir,
    artifact_root: artifactRoot,
    expected_run_id: opts.invocation.run_id,
  });
  if (existingForRun) {
    if (!opts.source_run_id) {
      const expected = buildFreshEffectOperation(opts);
      if (!operationMatchesIdentity(existingForRun.operation, expected)) {
        throw runtimeError(
          "Runner effect operation no longer matches current prepared authority.",
          {
            reason: "runner_effect_operation_precondition_mismatch",
            operation_key: existingForRun.operation.operation_key,
          },
        );
      }
    }
    const paths = resolveRunnerEffectOperationPaths({
      run_dir: opts.invocation.run_dir,
      operation_key: existingForRun.operation.operation_key,
    });
    const journal = await readRunnerEffectJournal(paths.journal_path);
    if (!journal) {
      throw runtimeError("Runner effect operation is missing its required journal.", {
        reason: "runner_effect_journal_missing",
        operation_key: existingForRun.operation.operation_key,
      });
    }
    applyForwardedEffectIdempotencyKey({
      bundle: opts.bundle,
      invocation: opts.invocation,
      operation: existingForRun.operation,
    });
    return { ...existingForRun, journal, paths };
  }

  let candidate: RunnerEffectOperation;
  let sourceRunId: string | null = null;
  if (opts.source_run_id) {
    const normalizedSourceRunId = assertSafeRunnerRunId(opts.source_run_id);
    const sourceRunDir = path.join(
      taskDirectoryFromRunDir(opts.invocation.run_dir),
      "runs",
      normalizedSourceRunId,
    );
    const source = await readEffectOperationForRun({
      run_dir: sourceRunDir,
      artifact_root: artifactRoot,
      expected_run_id: normalizedSourceRunId,
    });
    sourceRunId = normalizedSourceRunId;
    if (!source) {
      candidate = buildFreshEffectOperation({
        ...opts,
        replay_source: {
          source_run_id: normalizedSourceRunId,
          disposition: "legacy_fresh",
        },
      });
    } else {
      const sourcePaths = resolveRunnerEffectOperationPaths({
        run_dir: sourceRunDir,
        operation_key: source.operation.operation_key,
      });
      const sourceJournal = await readRunnerEffectJournal(sourcePaths.journal_path);
      if (!sourceJournal) {
        throw runtimeError("Runner effect operation is missing its required journal.", {
          reason: "runner_effect_source_journal_missing",
          source_run_id: normalizedSourceRunId,
          operation_key: source.operation.operation_key,
        });
      }
      if (
        sourceJournal.operation_key !== source.operation.operation_key ||
        sourceJournal.operation_digest !== source.operation.digest ||
        sourceJournal.claim_generation !== source.operation.claim_generation
      ) {
        throw runtimeError(
          "Runner effect source journal is not bound to its immutable operation authority.",
          {
            reason: "runner_effect_source_journal_authority_mismatch",
            source_run_id: normalizedSourceRunId,
            operation_key: source.operation.operation_key,
          },
        );
      }
      candidate =
        sourceJournal.phase === "prepared"
          ? buildFreshEffectOperation({
              ...opts,
              replay_source: {
                source_run_id: normalizedSourceRunId,
                disposition: "prepared_fresh",
              },
            })
          : source.operation;
    }
  } else {
    candidate = buildFreshEffectOperation(opts);
  }

  const paths = resolveRunnerEffectOperationPaths({
    run_dir: opts.invocation.run_dir,
    operation_key: candidate.operation_key,
  });
  await ensureOperationDirectory({ artifact_root: artifactRoot, paths });
  const published = await writeImmutableJson({
    file_path: paths.operation_path,
    label: "runner effect operation",
    value: candidate,
  });
  const operation = await readRunnerEffectOperation(paths.operation_path);
  if (!operation) throw new Error("Runner effect operation disappeared after publication.");
  if (!operationMatchesIdentity(operation, candidate)) {
    throw runtimeError("Runner effect operation key already names incompatible authority.", {
      reason: "runner_effect_operation_identity_conflict",
      operation_key: candidate.operation_key,
      published,
    });
  }
  const reference = createRunnerEffectOperationRef({
    run_id: opts.invocation.run_id,
    source_run_id:
      sourceRunId ??
      (operation.origin_run_id === opts.invocation.run_id ? null : operation.origin_run_id),
    operation,
  });
  const wroteReference = await writeImmutableJson({
    file_path: paths.run_ref_path,
    label: "runner effect operation reference",
    value: reference,
  });
  const observedReference = await readRunnerEffectOperationRef(paths.run_ref_path);
  if (!observedReference || observedReference.digest !== reference.digest) {
    throw runtimeError("Runner effect operation reference changed during preparation.", {
      reason: "runner_effect_operation_reference_conflict",
      run_id: opts.invocation.run_id,
      operation_key: operation.operation_key,
      wrote_reference: wroteReference,
    });
  }
  let journal = await readRunnerEffectJournal(paths.journal_path);
  if (!journal) {
    const prepared = createRunnerEffectJournal({
      operation,
      phase: "prepared",
      previous_digest: null,
      observed_evidence: { code: "runner_effect_operation_prepared", digest: operation.digest },
    });
    await writeJournal({ paths, journal: prepared });
    journal = prepared;
  }
  if (
    journal.operation_key !== operation.operation_key ||
    journal.operation_digest !== operation.digest ||
    journal.claim_generation !== operation.claim_generation
  ) {
    throw runtimeError("Runner effect journal is not bound to the immutable operation authority.", {
      reason: "runner_effect_journal_authority_mismatch",
      operation_key: operation.operation_key,
    });
  }
  applyForwardedEffectIdempotencyKey({
    bundle: opts.bundle,
    invocation: opts.invocation,
    operation,
  });
  return { operation, reference: observedReference, journal, paths };
}

export async function startRunnerEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  source_run_id?: string | null;
}): Promise<StartedRunnerEffectOperation> {
  const prepared = await prepareRunnerEffectOperation(opts);
  if (prepared.journal.phase !== "prepared") {
    throw runtimeError("Runner refuses a second adapter spawn for an existing effect operation.", {
      reason: "runner_effect_operation_not_spawnable",
      operation_key: prepared.operation.operation_key,
      journal_phase: prepared.journal.phase,
      enforcement: prepared.operation.enforcement,
    });
  }
  const claim = createRunnerEffectClaim({ operation: prepared.operation });
  const won = await writeImmutableJson({
    file_path: prepared.paths.claim_path,
    label: "runner effect start claim",
    value: claim,
  });
  const observedClaim = await readRunnerEffectClaim(prepared.paths.claim_path);
  if (!observedClaim || observedClaim.digest !== claim.digest || !won) {
    throw runtimeError("Runner effect start authority is already claimed by another supervisor.", {
      reason: "runner_effect_operation_claimed",
      operation_key: prepared.operation.operation_key,
      claim_generation: prepared.operation.claim_generation,
      observed_claim_digest: observedClaim?.digest ?? null,
    });
  }
  const started = createRunnerEffectJournal({
    operation: prepared.operation,
    phase: "started",
    previous_digest: prepared.journal.digest,
    observed_evidence: { code: "runner_effect_start_claimed", digest: claim.digest },
  });
  await writeJournal({ paths: prepared.paths, journal: started });
  return { ...prepared, journal: started };
}

export async function advanceRunnerEffectJournal(opts: {
  session: StartedRunnerEffectOperation;
  phase: Exclude<RunnerEffectJournalPhase, "prepared" | "started">;
  evidence: { code: string; digest?: string | null };
}): Promise<ReturnType<typeof validateRunnerEffectJournal>> {
  const current = await readRunnerEffectJournal(opts.session.paths.journal_path);
  if (!current) {
    throw runtimeError(
      "Runner effect journal disappeared after adapter spawn authority was claimed.",
      {
        reason: "runner_effect_journal_missing_after_start",
        operation_key: opts.session.operation.operation_key,
      },
    );
  }
  if (
    JOURNAL_PHASE_ORDER[current.phase] > JOURNAL_PHASE_ORDER[opts.phase] ||
    (current.phase !== "prepared" && current.phase !== "started" && current.phase !== opts.phase)
  ) {
    throw runtimeError(
      "Runner effect journal refuses a downgrade after an observed terminal phase.",
      {
        reason: "runner_effect_journal_downgrade",
        operation_key: opts.session.operation.operation_key,
        current_phase: current.phase,
        requested_phase: opts.phase,
      },
    );
  }
  if (current.digest !== opts.session.journal.digest && current.phase !== opts.phase) {
    throw runtimeError("Runner effect journal transition lost exclusive operation authority.", {
      reason: "runner_effect_journal_transition_conflict",
      operation_key: opts.session.operation.operation_key,
      expected_journal_digest: opts.session.journal.digest,
      observed_journal_digest: current.digest,
      observed_phase: current.phase,
    });
  }
  if (current.phase === opts.phase) {
    if (current.previous_digest !== opts.session.journal.digest) {
      throw runtimeError(
        "Runner effect journal terminal record is not chained to the claimed start.",
        {
          reason: "runner_effect_journal_terminal_chain_invalid",
          operation_key: opts.session.operation.operation_key,
          expected_previous_digest: opts.session.journal.digest,
          observed_previous_digest: current.previous_digest,
        },
      );
    }
    return current;
  }
  const next = createRunnerEffectJournal({
    operation: opts.session.operation,
    phase: opts.phase,
    previous_digest: current.digest,
    observed_evidence: opts.evidence,
  });
  await writeJournal({ paths: opts.session.paths, journal: next });
  return next;
}
