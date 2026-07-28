import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
import { z } from "zod";

export const SUPERVISOR_EXECUTION_EPISODE_SCHEMA_VERSION = 1 as const;
export const SUPERVISOR_EXECUTION_EPISODE_KIND = "supervisor_execution_episode" as const;

export const SUPERVISOR_EPISODE_ROLE_VALUES = ["EXECUTOR", "CURATOR", "EVALUATOR"] as const;
export const SUPERVISOR_EPISODE_OPERATION_KIND_VALUES = [
  "agent_episode",
  "cli_operation",
  "evaluator_episode",
  "side_effect",
] as const;
export const SUPERVISOR_EPISODE_CURSOR_PHASE_VALUES = [
  "ready",
  "intent_recorded",
  "completed",
  "stopped",
] as const;
export const SUPERVISOR_EPISODE_OPERATION_STATUS_VALUES = [
  "intent",
  "completed",
  "failed",
] as const;
export const SUPERVISOR_EPISODE_STATUS_VALUES = ["running", "stopped"] as const;
export const SUPERVISOR_EPISODE_STOP_REASON_VALUES = [
  "budget_exhausted",
  "effect_in_doubt",
  "human_review",
  "operation_failed",
  "stale_state",
] as const;

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const NON_EMPTY_STRING = z.string().trim().min(1).max(4096);
const ISO_UTC_TIMESTAMP_SCHEMA = z.string().datetime({ offset: true });
const NON_NEGATIVE_INTEGER = z.number().int().min(0);
const POSITIVE_INTEGER = z.number().int().positive();

const NULLABLE_LIMIT_SCHEMA = z.number().int().positive().nullable();

export const SUPERVISOR_EXECUTION_BUDGET_ZOD_SCHEMA = z
  .object({
    max_episodes: POSITIVE_INTEGER,
    max_agent_runs: NULLABLE_LIMIT_SCHEMA,
    max_input_tokens: NULLABLE_LIMIT_SCHEMA,
    max_output_tokens: NULLABLE_LIMIT_SCHEMA,
    max_total_tokens: NULLABLE_LIMIT_SCHEMA,
    max_wall_time_ms: NULLABLE_LIMIT_SCHEMA,
    max_changed_files: NULLABLE_LIMIT_SCHEMA,
    max_diff_lines: NULLABLE_LIMIT_SCHEMA,
    max_no_progress_episodes: NULLABLE_LIMIT_SCHEMA,
  })
  .strict()
  .refine(
    (budget) => budget.max_agent_runs === null || budget.max_agent_runs <= budget.max_episodes,
    "Supervisor episode max_agent_runs cannot exceed max_episodes.",
  );

export const SUPERVISOR_EXECUTION_USAGE_ZOD_SCHEMA = z
  .object({
    episodes: NON_NEGATIVE_INTEGER,
    agent_runs: NON_NEGATIVE_INTEGER,
    input_tokens: NON_NEGATIVE_INTEGER,
    output_tokens: NON_NEGATIVE_INTEGER,
    total_tokens: NON_NEGATIVE_INTEGER,
    wall_time_ms: NON_NEGATIVE_INTEGER,
    changed_files: NON_NEGATIVE_INTEGER,
    diff_lines: NON_NEGATIVE_INTEGER,
    no_progress_episodes: NON_NEGATIVE_INTEGER,
  })
  .strict();

const SUPERVISOR_EPISODE_CURSOR_ZOD_SCHEMA = z
  .object({
    episode: NON_NEGATIVE_INTEGER,
    phase: z.enum(SUPERVISOR_EPISODE_CURSOR_PHASE_VALUES),
    operation_key: SHA256_DIGEST_SCHEMA.nullable(),
    replacement_of_operation_key: SHA256_DIGEST_SCHEMA.optional(),
  })
  .strict();

const SUPERVISOR_EPISODE_OPERATION_ZOD_SCHEMA = z
  .object({
    sequence: POSITIVE_INTEGER,
    episode: POSITIVE_INTEGER,
    role: z.enum(SUPERVISOR_EPISODE_ROLE_VALUES),
    kind: z.enum(SUPERVISOR_EPISODE_OPERATION_KIND_VALUES),
    operation_key: SHA256_DIGEST_SCHEMA,
    precondition_fingerprint_digest: SHA256_DIGEST_SCHEMA,
    authority_ref: NON_EMPTY_STRING.nullable(),
    authority_digest: SHA256_DIGEST_SCHEMA.nullable(),
    work_order_ref: NON_EMPTY_STRING.nullable(),
    effect_ref: NON_EMPTY_STRING.nullable(),
    replacement_of_operation_key: SHA256_DIGEST_SCHEMA.nullable().optional(),
    status: z.enum(SUPERVISOR_EPISODE_OPERATION_STATUS_VALUES),
    result_digest: SHA256_DIGEST_SCHEMA.nullable(),
    postcondition_fingerprint_digest: SHA256_DIGEST_SCHEMA.nullable(),
    feedback_digest: SHA256_DIGEST_SCHEMA.nullable(),
    progress_digest: SHA256_DIGEST_SCHEMA.nullable(),
    started_at: ISO_UTC_TIMESTAMP_SCHEMA,
    completed_at: ISO_UTC_TIMESTAMP_SCHEMA.nullable(),
  })
  .strict();

const SUPERVISOR_EPISODE_STOP_ZOD_SCHEMA = z
  .object({
    reason: z.enum(SUPERVISOR_EPISODE_STOP_REASON_VALUES),
    exhausted_dimensions: z.array(NON_EMPTY_STRING).readonly(),
    operation_key: SHA256_DIGEST_SCHEMA.nullable(),
    at: ISO_UTC_TIMESTAMP_SCHEMA,
  })
  .strict();

export const SUPERVISOR_EXECUTION_EPISODE_JOURNAL_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(SUPERVISOR_EXECUTION_EPISODE_SCHEMA_VERSION),
    kind: z.literal(SUPERVISOR_EXECUTION_EPISODE_KIND),
    task_id: NON_EMPTY_STRING,
    task_revision: POSITIVE_INTEGER.nullable(),
    state_fingerprint_digest: SHA256_DIGEST_SCHEMA,
    budget: SUPERVISOR_EXECUTION_BUDGET_ZOD_SCHEMA,
    usage: SUPERVISOR_EXECUTION_USAGE_ZOD_SCHEMA,
    cursor: SUPERVISOR_EPISODE_CURSOR_ZOD_SCHEMA,
    operations: z.array(SUPERVISOR_EPISODE_OPERATION_ZOD_SCHEMA),
    status: z.enum(SUPERVISOR_EPISODE_STATUS_VALUES),
    stop: SUPERVISOR_EPISODE_STOP_ZOD_SCHEMA.nullable(),
    started_at: ISO_UTC_TIMESTAMP_SCHEMA,
    updated_at: ISO_UTC_TIMESTAMP_SCHEMA,
    previous_digest: SHA256_DIGEST_SCHEMA.nullable(),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export type SupervisorExecutionBudget = z.infer<typeof SUPERVISOR_EXECUTION_BUDGET_ZOD_SCHEMA>;
export type SupervisorExecutionUsage = z.infer<typeof SUPERVISOR_EXECUTION_USAGE_ZOD_SCHEMA>;
export type SupervisorExecutionEpisodeJournal = z.infer<
  typeof SUPERVISOR_EXECUTION_EPISODE_JOURNAL_ZOD_SCHEMA
>;
export type SupervisorEpisodeRole = (typeof SUPERVISOR_EPISODE_ROLE_VALUES)[number];
export type SupervisorEpisodeOperationKind =
  (typeof SUPERVISOR_EPISODE_OPERATION_KIND_VALUES)[number];
export type SupervisorEpisodeStopReason = (typeof SUPERVISOR_EPISODE_STOP_REASON_VALUES)[number];

export type SupervisorEpisodeBudgetStop = {
  reason: "budget_exhausted";
  exhausted_dimensions: readonly string[];
};

export type SupervisorEpisodeStartResult =
  | { status: "started"; journal: SupervisorExecutionEpisodeJournal; operation_key: string }
  | {
      status: "stopped";
      journal: SupervisorExecutionEpisodeJournal;
      stop: {
        reason: SupervisorEpisodeStopReason;
        exhausted_dimensions: readonly string[];
      };
    }
  | { status: "effect_in_doubt"; journal: SupervisorExecutionEpisodeJournal };

const ZERO_USAGE: SupervisorExecutionUsage = {
  episodes: 0,
  agent_runs: 0,
  input_tokens: 0,
  output_tokens: 0,
  total_tokens: 0,
  wall_time_ms: 0,
  changed_files: 0,
  diff_lines: 0,
  no_progress_episodes: 0,
};

function canonicalJson(value: unknown): string {
  const serialized = canonicalize(value);
  if (typeof serialized !== "string") {
    throw new Error("Supervisor episode records require canonical JSON values.");
  }
  return serialized;
}

export function digestSupervisorEpisodeValue(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(canonicalJson(value), "utf8").digest("hex")}`;
}

function journalDigest(
  journal: Omit<SupervisorExecutionEpisodeJournal, "digest">,
): SupervisorExecutionEpisodeJournal["digest"] {
  return digestSupervisorEpisodeValue(journal);
}

function createJournal(
  journal: Omit<SupervisorExecutionEpisodeJournal, "digest">,
): SupervisorExecutionEpisodeJournal {
  // Transition callers spread a validated journal for structural continuity.
  // Drop its old digest before hashing the new record; otherwise the old
  // digest would become an unmodelled part of the canonical payload.
  const { digest: _previousDigest, ...payload } = journal as SupervisorExecutionEpisodeJournal;
  return validateSupervisorExecutionEpisodeJournal({
    ...payload,
    digest: journalDigest(payload),
  });
}

function isAgentOperation(kind: SupervisorEpisodeOperationKind): boolean {
  return kind === "agent_episode" || kind === "evaluator_episode";
}

function exhaustedDimensions(opts: {
  budget: SupervisorExecutionBudget;
  usage: SupervisorExecutionUsage;
  next_kind?: SupervisorEpisodeOperationKind;
}): string[] {
  const { budget, usage } = opts;
  const dimensions: string[] = [];
  if (usage.episodes >= budget.max_episodes) dimensions.push("episodes");
  if (
    isAgentOperation(opts.next_kind ?? "cli_operation") &&
    budget.max_agent_runs !== null &&
    usage.agent_runs >= budget.max_agent_runs
  ) {
    dimensions.push("agent_runs");
  }
  if (budget.max_input_tokens !== null && usage.input_tokens >= budget.max_input_tokens) {
    dimensions.push("input_tokens");
  }
  if (budget.max_output_tokens !== null && usage.output_tokens >= budget.max_output_tokens) {
    dimensions.push("output_tokens");
  }
  if (budget.max_total_tokens !== null && usage.total_tokens >= budget.max_total_tokens) {
    dimensions.push("total_tokens");
  }
  if (budget.max_wall_time_ms !== null && usage.wall_time_ms >= budget.max_wall_time_ms) {
    dimensions.push("wall_time_ms");
  }
  if (budget.max_changed_files !== null && usage.changed_files >= budget.max_changed_files) {
    dimensions.push("changed_files");
  }
  if (budget.max_diff_lines !== null && usage.diff_lines >= budget.max_diff_lines) {
    dimensions.push("diff_lines");
  }
  if (
    budget.max_no_progress_episodes !== null &&
    usage.no_progress_episodes >= budget.max_no_progress_episodes
  ) {
    dimensions.push("no_progress_episodes");
  }
  return dimensions;
}

function stoppedJournal(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  reason: SupervisorEpisodeStopReason;
  exhausted_dimensions?: readonly string[];
  operation_key?: string | null;
  at: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    cursor: {
      episode: journal.cursor.episode,
      phase: "stopped",
      operation_key: journal.cursor.operation_key,
    },
    status: "stopped",
    stop: {
      reason: opts.reason,
      exhausted_dimensions: [...(opts.exhausted_dimensions ?? [])].toSorted(),
      operation_key: opts.operation_key ?? journal.cursor.operation_key,
      at: opts.at,
    },
    updated_at: opts.at,
    previous_digest: journal.digest,
  };
  return createJournal(next);
}

/** Stop a completed or ready episode without inventing another operation. */
export function stopSupervisorExecutionEpisode(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  reason: SupervisorEpisodeStopReason;
  exhausted_dimensions?: readonly string[];
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  return stoppedJournal({
    journal,
    reason: opts.reason,
    exhausted_dimensions: opts.exhausted_dimensions,
    at: opts.now ?? new Date().toISOString(),
  });
}

export function createSupervisorExecutionEpisodeJournal(input: {
  task_id: string;
  task_revision: number | null;
  state_fingerprint_digest: string;
  budget: SupervisorExecutionBudget;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const now = input.now ?? new Date().toISOString();
  const journal: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    schema_version: SUPERVISOR_EXECUTION_EPISODE_SCHEMA_VERSION,
    kind: SUPERVISOR_EXECUTION_EPISODE_KIND,
    task_id: input.task_id.trim(),
    task_revision: input.task_revision,
    state_fingerprint_digest: input.state_fingerprint_digest,
    budget: SUPERVISOR_EXECUTION_BUDGET_ZOD_SCHEMA.parse(input.budget),
    usage: { ...ZERO_USAGE },
    cursor: { episode: 0, phase: "ready", operation_key: null },
    operations: [],
    status: "running",
    stop: null,
    started_at: now,
    updated_at: now,
    previous_digest: null,
  };
  return createJournal(journal);
}

export function validateSupervisorExecutionEpisodeJournal(
  input: unknown,
): SupervisorExecutionEpisodeJournal {
  const parsed = SUPERVISOR_EXECUTION_EPISODE_JOURNAL_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = journalDigest(payload);
  if (digest !== expected) {
    throw new Error(
      `Supervisor episode journal digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  const sequences = parsed.operations.map((operation) => operation.sequence);
  if (new Set(sequences).size !== sequences.length) {
    throw new Error("Supervisor episode journal operation sequences must be unique.");
  }
  const pendingReplacement = parsed.cursor.replacement_of_operation_key;
  if (pendingReplacement !== undefined) {
    const last = parsed.operations.at(-1);
    if (
      parsed.status !== "running" ||
      parsed.stop !== null ||
      parsed.cursor.phase !== "ready" ||
      parsed.cursor.operation_key !== null ||
      last?.status !== "failed" ||
      last?.operation_key !== pendingReplacement
    ) {
      throw new Error(
        "Supervisor episode pending replacement must bind a running ready cursor to its failed latest operation.",
      );
    }
  }
  return parsed;
}

/**
 * Turn an interrupted intent into a typed terminal state.  The caller must
 * resolve the effect explicitly instead of guessing whether the provider ran.
 */
export function recoverSupervisorExecutionEpisodeJournal(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  state_fingerprint_digest: string;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  if (journal.status === "stopped") return journal;
  if (journal.cursor.phase === "intent_recorded") {
    return stoppedJournal({ journal, reason: "effect_in_doubt", at: now });
  }
  // A completed outcome is durable but its postcondition observation may not
  // be. The caller must refresh and advance it before another operation; a
  // changed fingerprint is expected at this exact checkpoint, not stale work.
  if (journal.cursor.phase === "completed") return journal;
  if (journal.state_fingerprint_digest !== opts.state_fingerprint_digest) {
    return stoppedJournal({ journal, reason: "stale_state", at: now });
  }
  return journal;
}

export function startSupervisorExecutionEpisode(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  role: SupervisorEpisodeRole;
  kind: SupervisorEpisodeOperationKind;
  operation_identity: unknown;
  precondition_fingerprint_digest: string;
  authority_ref?: string | null;
  authority_digest?: string | null;
  work_order_ref?: string | null;
  effect_ref?: string | null;
  replacement_of_operation_key?: string | null;
  now?: string;
}): SupervisorEpisodeStartResult {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  const replacementReference = opts.replacement_of_operation_key?.trim();
  const replacementBinding = replacementReference
    ? { replacement_of_operation_key: replacementReference }
    : {};
  const pendingReplacement = journal.cursor.replacement_of_operation_key;
  if (journal.status === "stopped") {
    return {
      status: "stopped",
      journal,
      stop: {
        reason: journal.stop?.reason ?? "human_review",
        exhausted_dimensions: journal.stop?.exhausted_dimensions ?? [],
      },
    };
  }
  if (journal.state_fingerprint_digest !== opts.precondition_fingerprint_digest) {
    return {
      status: "stopped",
      journal: stoppedJournal({ journal, reason: "stale_state", at: now }),
      stop: { reason: "stale_state", exhausted_dimensions: ["state_fingerprint"] },
    };
  }
  if (journal.cursor.phase === "intent_recorded") {
    return {
      status: "effect_in_doubt",
      journal: stoppedJournal({ journal, reason: "effect_in_doubt", at: now }),
    };
  }
  if (pendingReplacement !== undefined) {
    const predecessor = journal.operations.at(-1);
    if (
      replacementReference !== pendingReplacement ||
      predecessor?.role !== opts.role ||
      predecessor?.kind !== opts.kind
    ) {
      throw new Error(
        "Supervisor episode replacement requires the exact pending failed operation with the same role and kind.",
      );
    }
  } else if (replacementReference) {
    throw new Error(
      "Supervisor episode replacement requires a pending terminal operation_failed authorization.",
    );
  }
  const exhausted = exhaustedDimensions({
    budget: journal.budget,
    usage: journal.usage,
    next_kind: opts.kind,
  });
  if (exhausted.length > 0) {
    return {
      status: "stopped",
      journal: stoppedJournal({
        journal,
        reason: "budget_exhausted",
        exhausted_dimensions: exhausted,
        at: now,
      }),
      stop: { reason: "budget_exhausted", exhausted_dimensions: exhausted },
    };
  }
  const operation_key = digestSupervisorEpisodeValue({
    task_id: journal.task_id,
    episode: journal.usage.episodes + 1,
    role: opts.role,
    kind: opts.kind,
    operation_identity: opts.operation_identity,
    precondition_fingerprint_digest: opts.precondition_fingerprint_digest,
    authority_ref: opts.authority_ref?.trim() ?? null,
    authority_digest: opts.authority_digest ?? null,
    work_order_ref: opts.work_order_ref?.trim() ?? null,
    effect_ref: opts.effect_ref?.trim() ?? null,
    ...replacementBinding,
  });
  const operation = {
    sequence: journal.operations.length + 1,
    episode: journal.usage.episodes + 1,
    role: opts.role,
    kind: opts.kind,
    operation_key,
    precondition_fingerprint_digest: opts.precondition_fingerprint_digest,
    authority_ref: opts.authority_ref?.trim() ?? null,
    authority_digest: opts.authority_digest ?? null,
    work_order_ref: opts.work_order_ref?.trim() ?? null,
    effect_ref: opts.effect_ref?.trim() ?? null,
    ...replacementBinding,
    status: "intent" as const,
    result_digest: null,
    postcondition_fingerprint_digest: null,
    feedback_digest: null,
    progress_digest: null,
    started_at: now,
    completed_at: null,
  };
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    usage: {
      ...journal.usage,
      episodes: journal.usage.episodes + 1,
      agent_runs: journal.usage.agent_runs + (isAgentOperation(opts.kind) ? 1 : 0),
    },
    cursor: { episode: operation.episode, phase: "intent_recorded", operation_key },
    operations: [...journal.operations, operation],
    updated_at: now,
    previous_digest: journal.digest,
  };
  return { status: "started", journal: createJournal(next), operation_key };
}

export function completeSupervisorExecutionEpisode(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  operation_key: string;
  result: unknown;
  usage?: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">>;
  progress?: unknown;
  bounded_feedback?: unknown;
  failed?: boolean;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  if (journal.status !== "running" || journal.cursor.phase !== "intent_recorded") {
    throw new Error("Supervisor episode completion requires a running intent-recorded journal.");
  }
  if (journal.cursor.operation_key !== opts.operation_key) {
    throw new Error("Supervisor episode completion does not match the current operation intent.");
  }
  const last = journal.operations.at(-1);
  if (last?.operation_key !== opts.operation_key || last?.status !== "intent") {
    throw new Error("Supervisor episode completion requires the latest operation intent.");
  }
  const usageInput = opts.usage ?? {};
  const previousProgress = journal.operations.findLast(
    (operation) => operation.progress_digest !== null,
  )?.progress_digest;
  const progressDigest =
    opts.progress === undefined ? null : digestSupervisorEpisodeValue(opts.progress);
  const noProgress =
    progressDigest !== null && previousProgress !== null && progressDigest === previousProgress
      ? journal.usage.no_progress_episodes + 1
      : progressDigest === null
        ? journal.usage.no_progress_episodes
        : 0;
  const usage: SupervisorExecutionUsage = {
    episodes: journal.usage.episodes,
    agent_runs: journal.usage.agent_runs,
    input_tokens: journal.usage.input_tokens + Math.max(0, usageInput.input_tokens ?? 0),
    output_tokens: journal.usage.output_tokens + Math.max(0, usageInput.output_tokens ?? 0),
    total_tokens: journal.usage.total_tokens + Math.max(0, usageInput.total_tokens ?? 0),
    wall_time_ms: journal.usage.wall_time_ms + Math.max(0, usageInput.wall_time_ms ?? 0),
    changed_files: Math.max(
      journal.usage.changed_files,
      Math.max(0, usageInput.changed_files ?? 0),
    ),
    diff_lines: Math.max(journal.usage.diff_lines, Math.max(0, usageInput.diff_lines ?? 0)),
    no_progress_episodes: noProgress,
  };
  const operation = {
    ...last,
    status: opts.failed ? ("failed" as const) : ("completed" as const),
    result_digest: digestSupervisorEpisodeValue(opts.result),
    feedback_digest:
      opts.bounded_feedback === undefined
        ? null
        : digestSupervisorEpisodeValue(opts.bounded_feedback),
    progress_digest: progressDigest,
    completed_at: now,
  };
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    usage,
    cursor: {
      episode: journal.cursor.episode,
      phase: "completed",
      operation_key: last.operation_key,
    },
    operations: [...journal.operations.slice(0, -1), operation],
    updated_at: now,
    previous_digest: journal.digest,
  };
  const completed = createJournal(next);
  if (opts.failed)
    return stoppedJournal({ journal: completed, reason: "operation_failed", at: now });
  const exhausted = exhaustedDimensions({
    budget: completed.budget,
    usage: completed.usage,
  });
  return exhausted.length > 0
    ? stoppedJournal({
        journal: completed,
        reason: "budget_exhausted",
        exhausted_dimensions: exhausted,
        at: now,
      })
    : completed;
}

/**
 * A new route fingerprint is accepted only after the current intent has a
 * durable outcome. This lets the supervisor continue after its own observed
 * postcondition while refusing a restart that finds a different state between
 * checkpoints.
 */
export function advanceSupervisorExecutionEpisodeState(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  state_fingerprint_digest: string;
  route_observation: unknown;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  if (journal.status !== "running" || journal.cursor.phase !== "completed") {
    throw new Error("Supervisor episode state advance requires a completed running operation.");
  }
  const last = journal.operations.at(-1);
  if (!last || (last.status !== "completed" && last.status !== "failed")) {
    throw new Error("Supervisor episode state advance requires a completed latest operation.");
  }
  const operation = {
    ...last,
    postcondition_fingerprint_digest: opts.state_fingerprint_digest,
    result_digest:
      last.result_digest ??
      digestSupervisorEpisodeValue({ route_observation: opts.route_observation }),
  };
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    state_fingerprint_digest: opts.state_fingerprint_digest,
    cursor: { episode: journal.cursor.episode, phase: "ready", operation_key: null },
    operations: [...journal.operations.slice(0, -1), operation],
    updated_at: now,
    previous_digest: journal.digest,
  };
  return createJournal(next);
}

/**
 * Reopen a journal only when its last provider operation completed durably and
 * a later attempt was stopped before recording another intent because the
 * route fingerprint changed. This preserves the accumulated budget while
 * refusing to guess about failed or ambiguous provider effects.
 */
export function reopenCompletedSupervisorExecutionEpisodeAfterStaleState(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  state_fingerprint_digest: string;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  const last = journal.operations.at(-1);
  if (
    journal.status !== "stopped" ||
    journal.stop?.reason !== "stale_state" ||
    journal.cursor.phase !== "stopped" ||
    last?.status !== "completed"
  ) {
    throw new Error(
      "Supervisor episode stale-state reopening requires a stopped journal with a completed latest operation.",
    );
  }
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    state_fingerprint_digest: opts.state_fingerprint_digest,
    cursor: { episode: journal.cursor.episode, phase: "ready", operation_key: null },
    status: "running",
    stop: null,
    updated_at: now,
    previous_digest: journal.digest,
  };
  return createJournal(next);
}

/**
 * Open a distinct, explicitly authorized operation after a provider failure.
 * The failed operation remains in the journal and the next start binds its
 * replacement to that operation key. This is deliberately narrower than a
 * retry: ambiguous effects and exhausted budgets stay terminal.
 */
export function prepareReplacementSupervisorExecutionEpisodeAfterFailure(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  state_fingerprint_digest: string;
  now?: string;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const now = opts.now ?? new Date().toISOString();
  const last = journal.operations.at(-1);
  if (
    journal.status !== "stopped" ||
    journal.stop?.reason !== "operation_failed" ||
    journal.cursor.phase !== "stopped" ||
    last?.status !== "failed" ||
    journal.stop?.operation_key !== last?.operation_key
  ) {
    throw new Error(
      "Supervisor episode replacement requires a stopped operation_failed journal with a failed latest operation.",
    );
  }
  const exhausted = exhaustedDimensions({
    budget: journal.budget,
    usage: journal.usage,
    next_kind: last.kind,
  });
  if (exhausted.length > 0) {
    throw new Error(
      `Supervisor episode replacement requires remaining budget; exhausted: ${exhausted.join(", ")}.`,
    );
  }
  const next: Omit<SupervisorExecutionEpisodeJournal, "digest"> = {
    ...journal,
    state_fingerprint_digest: opts.state_fingerprint_digest,
    cursor: {
      episode: journal.cursor.episode,
      phase: "ready",
      operation_key: null,
      replacement_of_operation_key: last.operation_key,
    },
    status: "running",
    stop: null,
    updated_at: now,
    previous_digest: journal.digest,
  };
  return createJournal(next);
}
