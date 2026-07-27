import {
  createRunnerEffectResolution,
  createRunnerEffectResolutionIntent,
  createRunnerEffectResolutionLease,
  createRunnerEffectResolutionRef,
  digestRunnerEffectValue,
  validateRunnerEffectResolution,
  validateRunnerEffectResolutionIntent,
  validateRunnerEffectResolutionLease,
  type RunnerEffectResolution,
  type RunnerEffectResolutionIntent,
  type RunnerEffectResolutionLease,
  type RunnerEffectResolutionRef,
  type RunnerEffectResolutionVerdict,
} from "@agentplaneorg/core/schemas";

import type { CommandContext } from "../../commands/shared/task-backend.js";
import { ensureStableRunnerArtifactDirectoryChain } from "../run-directory-boundary.js";
import { RunnerRunRepository } from "../run-repository.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import { assertSafeRunnerRunId } from "../task-run-paths.js";
import {
  loadRunnerEffectOperationForResolution,
  type RunnerEffectOperationPaths,
} from "../effect-operation.js";
import { runnerEffectRuntimeError } from "../effect-operation-contract.js";

import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { retireTaskRunnerActiveClaimAfterEffectResolution } from "./task-run-effect-resolution-claim.js";

const EFFECT_RESOLUTION_ARTIFACT_MAX_BYTES = 64 * 1024;
const LEGACY_EFFECT_ACCEPTANCE_FILENAME = ".runner-effect-legacy-acceptance.json";
const IMMUTABLE_ARTIFACT_OBSERVATION_ATTEMPTS = 5;
const CONCURRENT_RETIREMENT_OBSERVATION_ATTEMPTS = 10;

type ResolutionArtifacts = {
  intent: RunnerEffectResolutionIntent;
  lease: RunnerEffectResolutionLease;
  resolution: RunnerEffectResolution;
};

export type ResolveTaskRunnerEffectInput = {
  ctx: CommandContext;
  task_id: string;
  run_id: string;
  verdict: RunnerEffectResolutionVerdict;
  actor: string;
  observed_at: string;
  authority_ref: string;
  authority_digest: string;
  precondition_fingerprint_digest: string;
  precondition_policy_digest: string;
  evidence_ref: string;
  evidence_text: string;
  active_claim_generation: string;
};

export type ResolveTaskRunnerEffectResult = {
  task_id: string;
  run_id: string;
  operation_key: string;
  verdict: RunnerEffectResolutionVerdict;
  resolution: RunnerEffectResolutionRef;
  claim_retirement: "absent" | "retired";
  resumed: boolean;
};

export type AcceptLegacyTaskRunnerEffectResult = {
  task_id: string;
  run_id: string;
  acceptance_digest: string;
  active_claim_retained: true;
  next_safe_action: "manual_inspection_required";
};

type LegacyEffectAcceptance = {
  schema_version: 1;
  kind: "runner_effect_legacy_acceptance";
  run_id: string;
  actor: string;
  observed_at: string;
  evidence_ref: string;
  evidence_digest: string;
  acknowledgement: "pre_effect_operation_not_available";
  digest: string;
};

function resolutionError(reason: string, context: Record<string, unknown>) {
  return runnerEffectRuntimeError(
    "Runner effect resolution was refused without provider execution.",
    {
      reason,
      ...context,
    },
  );
}

function isConcurrentRetirementError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { context?: { reason?: unknown } }).context?.reason ===
      "runner_effect_resolution_retirement_busy"
  );
}

async function waitForConcurrentResolutionRetirement(opts: {
  repository: RunnerRunRepository;
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
  resolution: RunnerEffectResolutionRef;
}): Promise<boolean> {
  for (let attempt = 1; attempt <= CONCURRENT_RETIREMENT_OBSERVATION_ATTEMPTS; attempt += 1) {
    const [record, activeClaim] = await Promise.all([
      opts.repository.readRequiredRecord({ task_id: opts.task_id, run_id: opts.run_id }),
      readTaskRunnerActiveClaim({
        git_root: opts.git_root,
        workflow_dir: opts.workflow_dir,
        task_id: opts.task_id,
        run_id: opts.run_id,
      }),
    ]);
    if (record.state.effect_resolution?.digest === opts.resolution.digest && !activeClaim) {
      return true;
    }
    if (attempt < CONCURRENT_RETIREMENT_OBSERVATION_ATTEMPTS) {
      await new Promise<void>((resolve) => setTimeout(resolve, attempt * 5));
    }
  }
  return false;
}

async function readOptionalImmutable<T>(opts: {
  file_path: string;
  label: string;
  parse: (value: unknown) => T;
}): Promise<T | null> {
  for (let attempt = 1; attempt <= IMMUTABLE_ARTIFACT_OBSERVATION_ATTEMPTS; attempt += 1) {
    try {
      return opts.parse(
        JSON.parse(
          await readStableRegularTextNoFollow(opts.file_path, opts.label, {
            max_bytes: EFFECT_RESOLUTION_ARTIFACT_MAX_BYTES,
          }),
        ),
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
      const transientPublicationRace =
        error instanceof Error &&
        (error.message.includes("changed before it could be read") ||
          error.message.includes("changed while it was being read"));
      if (!transientPublicationRace || attempt === IMMUTABLE_ARTIFACT_OBSERVATION_ATTEMPTS) {
        throw error;
      }
      await new Promise<void>((resolve) => setTimeout(resolve, attempt * 5));
    }
  }
  return null;
}

async function publishOrReadImmutable<T extends { digest: string }>(opts: {
  file_path: string;
  label: string;
  expected: T;
  parse: (value: unknown) => T;
  conflict_reason: string;
  context: Record<string, unknown>;
}): Promise<{ value: T; created: boolean }> {
  let created = false;
  try {
    await writeNewStableRegularFileNoFollow(
      opts.file_path,
      `${JSON.stringify(opts.expected, null, 2)}\n`,
      opts.label,
    );
    created = true;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("Refusing pre-existing")) throw error;
  }
  const observed = await readOptionalImmutable({
    file_path: opts.file_path,
    label: opts.label,
    parse: opts.parse,
  });
  if (!observed || observed.digest !== opts.expected.digest) {
    throw resolutionError(opts.conflict_reason, {
      ...opts.context,
      expected_digest: opts.expected.digest,
      observed_digest: observed?.digest ?? null,
    });
  }
  return { value: observed, created };
}

function assertInputBindsOperation(opts: {
  input: ResolveTaskRunnerEffectInput;
  operation: {
    authority_ref: string;
    authority_digest: string;
    precondition_fingerprint_digest: string;
    precondition_policy_digest: string;
  };
  state: {
    state_fingerprint?: {
      precondition_fingerprint: { digest: string };
      precondition_policy: unknown;
    };
  };
}): void {
  const actualPolicyDigest = opts.state.state_fingerprint
    ? digestRunnerEffectValue(opts.state.state_fingerprint.precondition_policy)
    : null;
  if (
    opts.input.authority_ref !== opts.operation.authority_ref ||
    opts.input.authority_digest !== opts.operation.authority_digest ||
    opts.input.precondition_fingerprint_digest !== opts.operation.precondition_fingerprint_digest ||
    opts.input.precondition_policy_digest !== opts.operation.precondition_policy_digest ||
    opts.state.state_fingerprint?.precondition_fingerprint.digest !==
      opts.operation.precondition_fingerprint_digest ||
    actualPolicyDigest !== opts.operation.precondition_policy_digest
  ) {
    throw resolutionError("runner_effect_resolution_authority_or_fingerprint_mismatch", {
      task_id: opts.input.task_id,
      run_id: opts.input.run_id,
      expected_authority_ref: opts.operation.authority_ref,
      expected_authority_digest: opts.operation.authority_digest,
      expected_precondition_fingerprint_digest: opts.operation.precondition_fingerprint_digest,
      expected_precondition_policy_digest: opts.operation.precondition_policy_digest,
    });
  }
}

function assertUnresolvedJournal(opts: { task_id: string; run_id: string; phase: string }): void {
  if (opts.phase === "effect_unknown" || opts.phase === "post_state_unknown") return;
  throw resolutionError("runner_effect_resolution_journal_not_terminal_uncertain", opts);
}

async function persistResolutionArtifacts(opts: {
  paths: RunnerEffectOperationPaths;
  artifact_root: string;
  intent: RunnerEffectResolutionIntent;
  operation: Parameters<typeof createRunnerEffectResolution>[0]["operation"];
}): Promise<{ artifacts: ResolutionArtifacts; intent_created: boolean }> {
  await ensureStableRunnerArtifactDirectoryChain(opts.artifact_root, opts.paths.operation_dir);
  const intentResult = await publishOrReadImmutable({
    file_path: opts.paths.resolution_intent_path,
    label: "runner effect resolution intent",
    expected: opts.intent,
    parse: validateRunnerEffectResolutionIntent,
    conflict_reason: "runner_effect_resolution_intent_conflict",
    context: { operation_key: opts.operation.operation_key },
  });
  const expectedLease = createRunnerEffectResolutionLease({
    operation_key: opts.operation.operation_key,
    intent_digest: intentResult.value.digest,
  });
  const leaseResult = await publishOrReadImmutable({
    file_path: opts.paths.resolution_lease_path,
    label: "runner effect resolution lease",
    expected: expectedLease,
    parse: validateRunnerEffectResolutionLease,
    conflict_reason: "runner_effect_resolution_lease_conflict",
    context: {
      operation_key: opts.operation.operation_key,
      intent_digest: intentResult.value.digest,
    },
  });
  const expectedResolution = createRunnerEffectResolution({
    operation: opts.operation,
    intent: intentResult.value,
    lease: leaseResult.value,
  });
  const resolutionResult = await publishOrReadImmutable({
    file_path: opts.paths.resolution_path,
    label: "runner effect resolution",
    expected: expectedResolution,
    parse: validateRunnerEffectResolution,
    conflict_reason: "runner_effect_resolution_conflict",
    context: {
      operation_key: opts.operation.operation_key,
      intent_digest: intentResult.value.digest,
    },
  });
  return {
    artifacts: {
      intent: intentResult.value,
      lease: leaseResult.value,
      resolution: resolutionResult.value,
    },
    intent_created: intentResult.created,
  };
}

function createLegacyEffectAcceptance(opts: {
  run_id: string;
  actor: string;
  observed_at: string;
  evidence_ref: string;
  evidence_text: string;
}): LegacyEffectAcceptance {
  const acceptance = {
    schema_version: 1,
    kind: "runner_effect_legacy_acceptance",
    run_id: opts.run_id.trim(),
    actor: opts.actor.trim(),
    observed_at: opts.observed_at,
    evidence_ref: opts.evidence_ref.trim(),
    evidence_digest: digestRunnerEffectValue({ evidence_text: opts.evidence_text }),
    acknowledgement: "pre_effect_operation_not_available",
  } as const;
  if (
    !acceptance.run_id ||
    !acceptance.actor ||
    !acceptance.evidence_ref ||
    !Number.isFinite(Date.parse(acceptance.observed_at))
  ) {
    throw resolutionError("runner_effect_legacy_acceptance_invalid", {});
  }
  return { ...acceptance, digest: digestRunnerEffectValue(acceptance) };
}

function parseLegacyEffectAcceptance(value: unknown): LegacyEffectAcceptance {
  if (
    typeof value !== "object" ||
    value === null ||
    (value as { schema_version?: unknown }).schema_version !== 1 ||
    (value as { kind?: unknown }).kind !== "runner_effect_legacy_acceptance" ||
    typeof (value as { run_id?: unknown }).run_id !== "string" ||
    typeof (value as { actor?: unknown }).actor !== "string" ||
    typeof (value as { observed_at?: unknown }).observed_at !== "string" ||
    typeof (value as { evidence_ref?: unknown }).evidence_ref !== "string" ||
    typeof (value as { evidence_digest?: unknown }).evidence_digest !== "string" ||
    (value as { acknowledgement?: unknown }).acknowledgement !==
      "pre_effect_operation_not_available" ||
    typeof (value as { digest?: unknown }).digest !== "string"
  ) {
    throw resolutionError("runner_effect_legacy_acceptance_invalid", {});
  }
  const parsed = value as LegacyEffectAcceptance;
  const { digest, ...payload } = parsed;
  if (digest !== digestRunnerEffectValue(payload)) {
    throw resolutionError("runner_effect_legacy_acceptance_digest_invalid", {});
  }
  return parsed;
}

/**
 * RF-06 records lack a pre-effect operation and therefore cannot be upgraded
 * into a typed verdict. This explicit acknowledgement is intentionally
 * non-releasing: it records operator evidence while retaining the claim for
 * manual inspection rather than inventing missing authority.
 */
export async function acceptLegacyTaskRunnerEffect(opts: {
  ctx: CommandContext;
  task_id: string;
  run_id: string;
  actor: string;
  observed_at: string;
  evidence_ref: string;
  evidence_text: string;
}): Promise<AcceptLegacyTaskRunnerEffectResult> {
  const runId = assertSafeRunnerRunId(opts.run_id);
  if (!opts.evidence_text.trim()) {
    throw resolutionError("runner_effect_legacy_acceptance_evidence_required", {
      task_id: opts.task_id,
      run_id: runId,
    });
  }
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: runId,
    storage: "supervisor",
  });
  const record = await repository.readRequiredRecord({ task_id: opts.task_id, run_id: runId });
  const outcome = record.state.state_fingerprint?.outcome;
  if (
    record.state.effect_operation !== undefined ||
    (outcome !== "effect_started" &&
      outcome !== "effect_unknown" &&
      outcome !== "post_state_unknown")
  ) {
    throw resolutionError("runner_effect_legacy_acceptance_not_applicable", {
      task_id: opts.task_id,
      run_id: runId,
      state_outcome: outcome ?? null,
      effect_operation_present: record.state.effect_operation !== undefined,
    });
  }
  const expected = createLegacyEffectAcceptance({
    run_id: runId,
    actor: opts.actor,
    observed_at: opts.observed_at,
    evidence_ref: opts.evidence_ref,
    evidence_text: opts.evidence_text,
  });
  const result = await publishOrReadImmutable({
    file_path: `${repository.paths.run_dir}/${LEGACY_EFFECT_ACCEPTANCE_FILENAME}`,
    label: "runner effect legacy acceptance",
    expected,
    parse: parseLegacyEffectAcceptance,
    conflict_reason: "runner_effect_legacy_acceptance_conflict",
    context: { task_id: opts.task_id, run_id: runId },
  });
  return {
    task_id: opts.task_id,
    run_id: runId,
    acceptance_digest: result.value.digest,
    active_claim_retained: true,
    next_safe_action: "manual_inspection_required",
  };
}

export async function resolveTaskRunnerEffect(
  input: ResolveTaskRunnerEffectInput,
): Promise<ResolveTaskRunnerEffectResult> {
  const runId = assertSafeRunnerRunId(input.run_id);
  if (!input.evidence_text.trim()) {
    throw resolutionError("runner_effect_resolution_evidence_required", {
      task_id: input.task_id,
      run_id: runId,
    });
  }
  const repository = await RunnerRunRepository.openExistingTaskRun({
    git_root: input.ctx.resolvedProject.gitRoot,
    workflow_dir: input.ctx.config.paths.workflow_dir,
    task_id: input.task_id,
    run_id: runId,
    storage: "supervisor",
  });
  const record = await repository.readRequiredRecord({ task_id: input.task_id, run_id: runId });
  const effect = await loadRunnerEffectOperationForResolution({
    run_dir: repository.paths.run_dir,
    artifact_root: repository.paths.artifact_root ?? input.ctx.resolvedProject.gitRoot,
    expected_run_id: runId,
  });
  if (!effect) {
    throw resolutionError("runner_effect_resolution_legacy_acceptance_required", {
      task_id: input.task_id,
      run_id: runId,
      next_safe_action: "task run resolve-effect --accept-legacy",
    });
  }
  if (
    record.state.effect_operation?.digest !== effect.reference.digest ||
    effect.journal.operation_key !== effect.operation.operation_key ||
    effect.journal.operation_digest !== effect.operation.digest ||
    effect.journal.claim_generation !== effect.operation.claim_generation
  ) {
    throw resolutionError("runner_effect_resolution_operation_binding_invalid", {
      task_id: input.task_id,
      run_id: runId,
      operation_key: effect.operation.operation_key,
    });
  }
  assertUnresolvedJournal({ task_id: input.task_id, run_id: runId, phase: effect.journal.phase });
  assertInputBindsOperation({ input, operation: effect.operation, state: record.state });

  const activeClaim = await readTaskRunnerActiveClaim({
    git_root: input.ctx.resolvedProject.gitRoot,
    workflow_dir: input.ctx.config.paths.workflow_dir,
    task_id: input.task_id,
    run_id: runId,
  });
  if (!activeClaim) {
    if (!record.state.effect_resolution) {
      throw resolutionError("runner_effect_resolution_active_claim_missing", {
        task_id: input.task_id,
        run_id: runId,
      });
    }
  } else if (activeClaim.run_id !== runId) {
    throw resolutionError("runner_effect_resolution_active_claim_run_mismatch", {
      task_id: input.task_id,
      run_id: runId,
      active_claim_run_id: activeClaim.run_id,
    });
  }
  const attachedGeneration = record.state.effect_resolution?.active_claim_generation;
  const observedGeneration = activeClaim?.generation ?? attachedGeneration;
  if (!observedGeneration) {
    throw resolutionError("runner_effect_resolution_active_claim_generation_missing", {
      task_id: input.task_id,
      run_id: runId,
    });
  }
  if (input.active_claim_generation !== observedGeneration) {
    throw resolutionError("runner_effect_resolution_active_claim_generation_mismatch", {
      task_id: input.task_id,
      run_id: runId,
      expected_generation: observedGeneration,
      observed_generation: input.active_claim_generation,
    });
  }

  const intent = createRunnerEffectResolutionIntent({
    operation: effect.operation,
    active_claim_generation: input.active_claim_generation,
    verdict: input.verdict,
    actor: input.actor,
    observed_at: input.observed_at,
    evidence_ref: input.evidence_ref,
    evidence_digest: digestRunnerEffectValue({ evidence_text: input.evidence_text }),
  });
  const persisted = await persistResolutionArtifacts({
    paths: effect.paths,
    artifact_root: repository.paths.artifact_root ?? input.ctx.resolvedProject.gitRoot,
    intent,
    operation: effect.operation,
  });
  const reference = createRunnerEffectResolutionRef({
    run_id: runId,
    active_claim_generation: input.active_claim_generation,
    operation: effect.operation,
    intent: persisted.artifacts.intent,
    lease: persisted.artifacts.lease,
    resolution: persisted.artifacts.resolution,
  });

  let attached = false;
  const ensureResolutionAttached = async (): Promise<boolean> => {
    const latest = await repository.readRequiredRecord({ task_id: input.task_id, run_id: runId });
    if (latest.state.effect_resolution?.digest === reference.digest) return false;
    if (latest.state.effect_resolution) {
      throw resolutionError("runner_effect_resolution_state_conflict", {
        task_id: input.task_id,
        run_id: runId,
        expected_digest: reference.digest,
        observed_digest: latest.state.effect_resolution.digest,
      });
    }
    await repository.writeState({
      ...latest.state,
      effect_resolution: reference,
      updated_at: new Date().toISOString(),
    });
    await repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_effect_resolved",
      message: "operator-supplied effect verdict attached before active claim retirement",
      data: {
        operation_key: effect.operation.operation_key,
        resolution_digest: reference.resolution_digest,
        verdict: reference.verdict,
        provenance: "operator_supplied",
      },
    });
    attached = true;
    return true;
  };
  let claim_retirement: "absent" | "retired";
  try {
    claim_retirement = await retireTaskRunnerActiveClaimAfterEffectResolution({
      git_root: input.ctx.resolvedProject.gitRoot,
      workflow_dir: input.ctx.config.paths.workflow_dir,
      task_id: input.task_id,
      run_id: runId,
      expected_generation: input.active_claim_generation,
      resolution: reference,
      ensure_resolution_attached: ensureResolutionAttached,
    });
  } catch (error) {
    if (
      !isConcurrentRetirementError(error) ||
      !(await waitForConcurrentResolutionRetirement({
        repository,
        git_root: input.ctx.resolvedProject.gitRoot,
        workflow_dir: input.ctx.config.paths.workflow_dir,
        task_id: input.task_id,
        run_id: runId,
        resolution: reference,
      }))
    ) {
      throw error;
    }
    claim_retirement = "absent";
  }
  return {
    task_id: input.task_id,
    run_id: runId,
    operation_key: effect.operation.operation_key,
    verdict: reference.verdict,
    resolution: reference,
    claim_retirement,
    resumed: !persisted.intent_created || attached,
  };
}
