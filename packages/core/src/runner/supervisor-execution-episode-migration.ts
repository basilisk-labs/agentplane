import { z } from "zod";

import {
  createSupervisorExecutionEpisodeJournal,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionBudget,
  type SupervisorExecutionEpisodeJournal,
} from "./supervisor-execution-episode.js";

export const SUPERVISOR_EXECUTION_EPISODE_LEGACY_SCHEMA_VERSION = 0 as const;

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const NON_EMPTY_STRING = z.string().trim().min(1).max(4096);
const ISO_UTC_TIMESTAMP_SCHEMA = z.string().datetime({ offset: true });

const LEGACY_EMPTY_JOURNAL_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(SUPERVISOR_EXECUTION_EPISODE_LEGACY_SCHEMA_VERSION),
    kind: z.literal("supervisor_execution_episode"),
    task_id: NON_EMPTY_STRING,
    task_revision: z.number().int().positive().nullable(),
    state_fingerprint_digest: SHA256_DIGEST_SCHEMA,
    budget: z.unknown(),
    started_at: ISO_UTC_TIMESTAMP_SCHEMA,
  })
  .strict();

export type SupervisorExecutionEpisodeMigrationSource = "absent" | "legacy_v0" | "current";

export type SupervisorExecutionEpisodeMigrationResult = {
  journal: SupervisorExecutionEpisodeJournal;
  source: SupervisorExecutionEpisodeMigrationSource;
  migrated: boolean;
};

/**
 * v0 was an unpublished, empty preparation record. It has no operation
 * intent, receipt, or cursor, so converting it cannot replay an effect. Any
 * other historical shape is intentionally rejected rather than guessed.
 */
export function migrateSupervisorExecutionEpisodeJournal(opts: {
  input: unknown;
  create: {
    task_id: string;
    task_revision: number | null;
    state_fingerprint_digest: string;
    budget: SupervisorExecutionBudget;
    now?: string;
  };
}): SupervisorExecutionEpisodeMigrationResult {
  if (opts.input === null) {
    return {
      journal: createSupervisorExecutionEpisodeJournal(opts.create),
      source: "absent",
      migrated: true,
    };
  }
  if (typeof opts.input !== "object" || Array.isArray(opts.input)) {
    throw new Error(
      "Supervisor episode journal must be an object, null, or a supported legacy record.",
    );
  }
  const version = (opts.input as { schema_version?: unknown }).schema_version;
  if (version === 1) {
    return {
      journal: validateSupervisorExecutionEpisodeJournal(opts.input),
      source: "current",
      migrated: false,
    };
  }
  if (version !== SUPERVISOR_EXECUTION_EPISODE_LEGACY_SCHEMA_VERSION) {
    throw new Error(`Unsupported supervisor episode journal schema version: ${String(version)}.`);
  }
  const legacy = LEGACY_EMPTY_JOURNAL_ZOD_SCHEMA.parse(opts.input);
  const budget = opts.create.budget;
  return {
    journal: createSupervisorExecutionEpisodeJournal({
      task_id: legacy.task_id,
      task_revision: legacy.task_revision,
      state_fingerprint_digest: legacy.state_fingerprint_digest,
      budget,
      now: legacy.started_at,
    }),
    source: "legacy_v0",
    migrated: true,
  };
}
