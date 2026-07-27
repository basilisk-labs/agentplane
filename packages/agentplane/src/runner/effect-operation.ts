import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import {
  createRunnerEffectClaim,
  createRunnerEffectJournal,
  createRunnerEffectOperationRef,
  validateRunnerEffectClaim,
  validateRunnerEffectJournal,
  validateRunnerEffectOperation,
  validateRunnerEffectOperationRef,
  type RunnerEffectJournalPhase,
  type RunnerEffectOperation,
  type RunnerEffectOperationRef,
} from "@agentplaneorg/core/schemas";

import {
  applyForwardedRunnerEffectIdempotencyKey,
  buildFreshRunnerEffectOperation,
  runnerEffectOperationMatchesIdentity,
  runnerEffectRuntimeError,
} from "./effect-operation-contract.js";
export { RUNNER_EFFECT_IDEMPOTENCY_KEY_ENV } from "./effect-operation-contract.js";
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
export const EFFECT_RESOLUTION_INTENT_FILENAME = "resolution-intent.json";
export const EFFECT_RESOLUTION_LEASE_FILENAME = "resolution-lease.json";
export const EFFECT_RESOLUTION_FILENAME = "resolution.json";
const EFFECT_OPERATION_REF_FILENAME = ".runner-effect-operation.json";
const EFFECT_ARTIFACT_MAX_BYTES = 64 * 1024;

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
  resolution_intent_path: string;
  resolution_lease_path: string;
  resolution_path: string;
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
    resolution_intent_path: path.join(operation_dir, EFFECT_RESOLUTION_INTENT_FILENAME),
    resolution_lease_path: path.join(operation_dir, EFFECT_RESOLUTION_LEASE_FILENAME),
    resolution_path: path.join(operation_dir, EFFECT_RESOLUTION_FILENAME),
  };
}

export async function loadRunnerEffectOperationForResolution(opts: {
  run_dir: string;
  artifact_root: string;
  expected_run_id: string;
}): Promise<{
  operation: RunnerEffectOperation;
  reference: RunnerEffectOperationRef;
  journal: NonNullable<Awaited<ReturnType<typeof readRunnerEffectJournal>>>;
  paths: RunnerEffectOperationPaths;
} | null> {
  const loaded = await readEffectOperationForRun(opts);
  if (!loaded) return null;
  const paths = resolveRunnerEffectOperationPaths({
    run_dir: opts.run_dir,
    operation_key: loaded.operation.operation_key,
  });
  const journal = await readRunnerEffectJournal(paths.journal_path);
  if (!journal) {
    throw runnerEffectRuntimeError("Runner effect operation is missing its required journal.", {
      reason: "runner_effect_journal_missing",
      operation_key: loaded.operation.operation_key,
    });
  }
  return { ...loaded, journal, paths };
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
  if (observed?.digest !== opts.journal.digest) {
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
    throw runnerEffectRuntimeError(
      "Runner effect operation reference is bound to a different run.",
      {
        reason: "runner_effect_reference_run_mismatch",
        expected_run_id: opts.expected_run_id,
        observed_run_id: reference.run_id,
      },
    );
  }
  const paths = resolveRunnerEffectOperationPaths({
    run_dir: opts.run_dir,
    operation_key: reference.operation_key,
  });
  await ensureOperationDirectory({ artifact_root: opts.artifact_root, paths });
  const operation = await readRunnerEffectOperation(paths.operation_path);
  if (operation?.digest !== reference.operation_digest) {
    throw runnerEffectRuntimeError(
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
    throw runnerEffectRuntimeError(
      "Runner effect operation reference has incompatible claim authority.",
      {
        reason: "runner_effect_operation_reference_authority_invalid",
        operation_key: operation.operation_key,
      },
    );
  }
  return { operation, reference };
}

export async function prepareRunnerEffectOperation(opts: {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state_fingerprint: RunnerStateFingerprintRecord;
  source_run_id?: string | null;
  resolved_not_applied_source?: boolean;
}): Promise<PreparedRunnerEffectOperation> {
  const artifactRoot = opts.invocation.artifact_root ?? opts.invocation.repository_root;
  const existingForRun = await readEffectOperationForRun({
    run_dir: opts.invocation.run_dir,
    artifact_root: artifactRoot,
    expected_run_id: opts.invocation.run_id,
  });
  if (existingForRun) {
    if (!opts.source_run_id) {
      const expected = buildFreshRunnerEffectOperation(opts);
      if (!runnerEffectOperationMatchesIdentity(existingForRun.operation, expected)) {
        throw runnerEffectRuntimeError(
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
      throw runnerEffectRuntimeError("Runner effect operation is missing its required journal.", {
        reason: "runner_effect_journal_missing",
        operation_key: existingForRun.operation.operation_key,
      });
    }
    applyForwardedRunnerEffectIdempotencyKey({
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
    if (source === null) {
      candidate = buildFreshRunnerEffectOperation({
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
        throw runnerEffectRuntimeError("Runner effect operation is missing its required journal.", {
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
        throw runnerEffectRuntimeError(
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
          ? buildFreshRunnerEffectOperation({
              ...opts,
              replay_source: {
                source_run_id: normalizedSourceRunId,
                disposition: "prepared_fresh",
              },
            })
          : opts.resolved_not_applied_source
            ? buildFreshRunnerEffectOperation({
                ...opts,
                replay_source: {
                  source_run_id: normalizedSourceRunId,
                  disposition: "resolved_not_applied_fresh",
                },
              })
            : source.operation;
    }
  } else {
    candidate = buildFreshRunnerEffectOperation(opts);
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
  if (!runnerEffectOperationMatchesIdentity(operation, candidate)) {
    throw runnerEffectRuntimeError(
      "Runner effect operation key already names incompatible authority.",
      {
        reason: "runner_effect_operation_identity_conflict",
        operation_key: candidate.operation_key,
        published,
      },
    );
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
  if (observedReference?.digest !== reference.digest) {
    throw runnerEffectRuntimeError(
      "Runner effect operation reference changed during preparation.",
      {
        reason: "runner_effect_operation_reference_conflict",
        run_id: opts.invocation.run_id,
        operation_key: operation.operation_key,
        wrote_reference: wroteReference,
      },
    );
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
    throw runnerEffectRuntimeError(
      "Runner effect journal is not bound to the immutable operation authority.",
      {
        reason: "runner_effect_journal_authority_mismatch",
        operation_key: operation.operation_key,
      },
    );
  }
  applyForwardedRunnerEffectIdempotencyKey({
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
  resolved_not_applied_source?: boolean;
}): Promise<StartedRunnerEffectOperation> {
  const prepared = await prepareRunnerEffectOperation(opts);
  if (prepared.journal.phase !== "prepared") {
    throw runnerEffectRuntimeError(
      "Runner refuses a second adapter spawn for an existing effect operation.",
      {
        reason: "runner_effect_operation_not_spawnable",
        operation_key: prepared.operation.operation_key,
        journal_phase: prepared.journal.phase,
        enforcement: prepared.operation.enforcement,
      },
    );
  }
  const claim = createRunnerEffectClaim({ operation: prepared.operation });
  const won = await writeImmutableJson({
    file_path: prepared.paths.claim_path,
    label: "runner effect start claim",
    value: claim,
  });
  const observedClaim = await readRunnerEffectClaim(prepared.paths.claim_path);
  if (observedClaim?.digest !== claim.digest || !won) {
    throw runnerEffectRuntimeError(
      "Runner effect start authority is already claimed by another supervisor.",
      {
        reason: "runner_effect_operation_claimed",
        operation_key: prepared.operation.operation_key,
        claim_generation: prepared.operation.claim_generation,
        observed_claim_digest: observedClaim?.digest ?? null,
      },
    );
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
    throw runnerEffectRuntimeError(
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
    throw runnerEffectRuntimeError(
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
    throw runnerEffectRuntimeError(
      "Runner effect journal transition lost exclusive operation authority.",
      {
        reason: "runner_effect_journal_transition_conflict",
        operation_key: opts.session.operation.operation_key,
        expected_journal_digest: opts.session.journal.digest,
        observed_journal_digest: current.digest,
        observed_phase: current.phase,
      },
    );
  }
  if (current.phase === opts.phase) {
    if (current.previous_digest !== opts.session.journal.digest) {
      throw runnerEffectRuntimeError(
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
