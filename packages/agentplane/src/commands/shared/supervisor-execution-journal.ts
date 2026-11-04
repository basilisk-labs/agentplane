import { mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { gitRevParse } from "@agentplaneorg/core/git";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import {
  digestSupervisorEpisodeValue,
  migrateSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionBudget,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import { tryAcquireSupervisorExecutionLease } from "./supervisor-execution-lease.js";

export type SupervisorEpisodeStore = {
  read: () => Promise<unknown>;
  write: (journal: SupervisorExecutionEpisodeJournal) => Promise<void>;
  compareAndSwap: (
    expected_digest: SupervisorExecutionEpisodeJournal["digest"] | null,
    journal: SupervisorExecutionEpisodeJournal,
  ) => Promise<boolean>;
  path: string;
};

const JOURNAL_LOCK_STALE_AFTER_MS = 60_000;
const JOURNAL_LOCK_RETRY_DELAY_MS = 10;
const JOURNAL_LOCK_WAIT_MS = 5000;

export function persistedJournalDigest(
  value: unknown,
): SupervisorExecutionEpisodeJournal["digest"] | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const digest = (value as { digest?: unknown }).digest;
  return typeof digest === "string" ? digest : null;
}

async function waitForJournalLock(lockPath: string): Promise<void> {
  const deadline = Date.now() + JOURNAL_LOCK_WAIT_MS;
  while (true) {
    try {
      await mkdir(lockPath, { mode: 0o700 });
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      const lockAge = await stat(lockPath)
        .then((entry) => Date.now() - entry.mtimeMs)
        .catch(() => 0);
      if (lockAge > JOURNAL_LOCK_STALE_AFTER_MS) {
        await rm(lockPath, { recursive: true, force: true });
        continue;
      }
      if (Date.now() >= deadline)
        throw new Error(`Timed out waiting for supervisor episode journal lock: ${lockPath}`);
      await new Promise<void>((resolve) => setTimeout(resolve, JOURNAL_LOCK_RETRY_DELAY_MS));
    }
  }
}

async function withJournalLock<T>(filePath: string, work: () => Promise<T>): Promise<T> {
  const lockPath = `${filePath}.lock`;
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await waitForJournalLock(lockPath);
  try {
    return await work();
  } finally {
    await rm(lockPath, { recursive: true, force: true });
  }
}

async function writeJournal(filePath: string, journal: SupervisorExecutionEpisodeJournal) {
  await atomicWriteFile(filePath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
}

export function createSupervisorEpisodeStore(filePath: string): SupervisorEpisodeStore {
  const read = async () => {
    try {
      return JSON.parse(await readFile(filePath, "utf8")) as unknown;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
      throw error;
    }
  };
  return {
    path: filePath,
    read,
    write: async (journal) => {
      await withJournalLock(filePath, async () => writeJournal(filePath, journal));
    },
    compareAndSwap: async (expectedDigest, journal) => {
      return withJournalLock(filePath, async () => {
        const current = await read();
        if (persistedJournalDigest(current) !== expectedDigest) return false;
        await writeJournal(filePath, journal);
        return true;
      });
    },
  };
}

function updateProvider(value: unknown): "gitlab" | "github" | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const operation = value as {
    id?: unknown;
    params?: { identity?: { provider?: unknown } | null } | null;
  };
  const provider = operation.params?.identity?.provider;
  return operation.id === "provider.pr.update_branch" &&
    (provider === "gitlab" || provider === "github")
    ? provider
    : null;
}

/** Classify only the retained transition, using its native identity and recovery context. */
export async function readProviderUpdateJournalProvider(store: SupervisorEpisodeStore) {
  return providerUpdateJournalProvider(await store.read());
}

function providerUpdateJournalProvider(retained: unknown, pendingOnly = true) {
  const operations = (retained as { operations?: unknown } | null)?.operations;
  const latest = Array.isArray(operations)
    ? (operations.at(-1) as {
        effect_ref?: unknown;
        authority_ref?: unknown;
        recovery?: { operation_identity?: unknown } | null;
      } | null)
    : null;
  const update =
    latest?.authority_ref === "workflow-operation:provider.pr.update_branch" ||
    (typeof latest?.effect_ref === "string" &&
      latest.effect_ref.startsWith("provider.pr.update_branch:")) ||
    updateProvider(latest?.recovery?.operation_identity) !== null;
  if (!update) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(retained);
  const operation = journal.operations.at(-1)!;
  if (pendingOnly && operation.status !== "intent" && journal.cursor.phase !== "completed")
    return null;
  const provider = updateProvider(operation.recovery?.operation_identity);
  const context = operation.recovery?.context as { kind?: unknown; task_id?: unknown } | undefined;
  if (context?.kind === "adopted_provider_effect") return "adopted" as const;
  if (provider === "github") return "github" as const;
  return provider === "gitlab" &&
    context?.kind === "gitlab_provider_update_branch" &&
    context.task_id === journal.task_id
    ? ("gitlab" as const)
    : ("unproven" as const);
}

export class LegacyJournalOriginConflictError extends CliError {
  constructor(message: string) {
    super({
      code: "E_RUNTIME",
      message,
      context: { reason_code: "provider_update_journal_route_conflict" },
    });
  }
}

function assertLegacyWorkflowSnapshot(input: unknown) {
  if (providerUpdateJournalProvider(input) === "gitlab")
    throw new LegacyJournalOriginConflictError(
      "The legacy route conflicts with the retained task-owned GitLab update.",
    );
  return input;
}

/** Recheck native origin on the actual legacy snapshot under the writer lock. */
function createLegacyWorkflowStore(filePath: string): SupervisorEpisodeStore {
  const store = createSupervisorEpisodeStore(filePath);
  return {
    ...store,
    read: async () => assertLegacyWorkflowSnapshot(await store.read()),
    compareAndSwap: async (expected, next) =>
      withJournalLock(filePath, async () => {
        const current = assertLegacyWorkflowSnapshot(await store.read());
        if (persistedJournalDigest(current) !== expected) return false;
        await writeJournal(filePath, next);
        return true;
      }),
  };
}

export async function publishLegacyWorkflowJournalTransition(opts: {
  store: SupervisorEpisodeStore;
  before: SupervisorExecutionEpisodeJournal;
  next: SupervisorExecutionEpisodeJournal;
}) {
  await withJournalLock(opts.store.path, async () => {
    try {
      const current = assertLegacyWorkflowSnapshot(await opts.store.read());
      if (
        providerUpdateJournalProvider(current, false) === "gitlab" &&
        validateSupervisorExecutionEpisodeJournal(current).digest !== opts.before.digest
      )
        throw new Error("The native GitLab journal changed before legacy replacement");
    } catch (error) {
      throw new LegacyJournalOriginConflictError(
        error instanceof Error
          ? error.message
          : "The journal origin is unproven before legacy replacement",
      );
    }
    await writeJournal(opts.store.path, opts.next);
  });
}

export class GitLabJournalPublicationError extends Error {
  constructor(
    error: unknown,
    readonly durable_state: "before" | "changed" | "unavailable",
  ) {
    super(error instanceof Error ? error.message : "GitLab journal publication is unconfirmed");
    this.name = "GitLabJournalPublicationError";
  }
}

/** Authenticate supported snapshots, including empty legacy records, before comparing them. */
function nativeSnapshotDigest(value: unknown, next: SupervisorExecutionEpisodeJournal) {
  if (value === null) return null;
  migrateSupervisorExecutionEpisodeJournal({
    input: value,
    create: {
      task_id: next.task_id,
      task_revision: next.task_revision,
      state_fingerprint_digest: next.state_fingerprint_digest,
      budget: next.budget,
    },
  });
  return digestSupervisorEpisodeValue(value);
}

/** Validate the complete current record under the same lock as its replacement. */
async function compareAndSwapNativeJournal(opts: {
  store: SupervisorEpisodeStore;
  before: unknown;
  next: SupervisorExecutionEpisodeJournal;
}) {
  const next = validateSupervisorExecutionEpisodeJournal(opts.next);
  const expected = nativeSnapshotDigest(opts.before, next);
  return withJournalLock(opts.store.path, async () => {
    const current = nativeSnapshotDigest(await opts.store.read(), next);
    if (current !== expected || current === nativeSnapshotDigest(next, next)) return false;
    await writeJournal(opts.store.path, next);
    return true;
  });
}

export async function publishGitLabJournalTransition(opts: {
  store: SupervisorEpisodeStore;
  before: unknown;
  next: SupervisorExecutionEpisodeJournal;
  phase: "dispatch" | "state";
}): Promise<void> {
  let failure: unknown;
  try {
    if (await compareAndSwapNativeJournal(opts)) return;
    failure = new Error("GitLab journal changed before transition publication");
  } catch (error) {
    failure = error;
  }
  // An intent afterimage proves storage, not this caller's dispatch ownership.
  // Only an acknowledged successful CAS permits the provider invocation.
  if (opts.phase === "dispatch") throw new GitLabJournalPublicationError(failure, "unavailable");
  let observed: string | null;
  try {
    const durable = await opts.store.read();
    observed = nativeSnapshotDigest(durable, opts.next);
  } catch {
    throw new GitLabJournalPublicationError(failure, "unavailable");
  }
  if (observed === nativeSnapshotDigest(opts.next, opts.next)) return;
  throw new GitLabJournalPublicationError(
    failure,
    observed === nativeSnapshotDigest(opts.before, opts.next) ? "before" : "changed",
  );
}

export async function withGitLabJournalLease<T>(opts: {
  journal_path: string;
  run: () => Promise<T>;
  failed: (outcome: T) => boolean;
}): Promise<T> {
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opts.journal_path });
  if (!lease)
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor owns the GitLab operation window. Refresh before continuing.",
      context: { reason_code: "supervisor_execution_lease_busy" },
    });
  let primaryFailure = false;
  let primaryError: { error: unknown } | null = null;
  let releaseError: { error: unknown } | null = null;
  let outcome: T | undefined;
  try {
    outcome = await opts.run();
    primaryFailure = opts.failed(outcome);
  } catch (error) {
    primaryFailure = true;
    primaryError = { error };
  } finally {
    try {
      await lease.release();
    } catch (error) {
      releaseError = { error };
    }
  }
  // Finish releasing ownership before choosing which outcome to report.
  if (primaryError) throw primaryError.error;
  if (releaseError && !primaryFailure) throw releaseError.error;
  return outcome!;
}

const SUPERVISOR_EPISODE_ARTIFACT_DIRECTORY = "agentplane/supervisor/episodes";

/** Persisted only because schema_version=1 journals include this legacy field. */
const LEGACY_DISABLED_SUPERVISOR_EXECUTION_BUDGET: SupervisorExecutionBudget = {
  max_episodes: Number.MAX_SAFE_INTEGER,
  max_agent_runs: null,
  max_input_tokens: null,
  max_output_tokens: null,
  max_total_tokens: null,
  max_wall_time_ms: null,
  max_changed_files: null,
  max_diff_lines: null,
  max_no_progress_episodes: null,
};

function safeTaskPathSegment(taskId: string): string {
  const normalized = taskId.trim();
  if (
    !normalized ||
    normalized === "." ||
    normalized === ".." ||
    normalized.includes("\0") ||
    normalized.includes("/") ||
    normalized.includes("\\") ||
    path.basename(normalized) !== normalized
  ) {
    throw new Error(`Supervisor episode task_id must be a path segment: ${JSON.stringify(taskId)}`);
  }
  return normalized;
}

export async function resolveSupervisorExecutionEpisodePath(opts: {
  git_root: string;
  common_git_dir?: string;
  task_id: string;
}): Promise<string> {
  const taskId = safeTaskPathSegment(opts.task_id);
  const commonGitDir = opts.common_git_dir
    ? path.resolve(opts.common_git_dir)
    : path.resolve(opts.git_root, await gitRevParse(opts.git_root, ["--git-common-dir"]));
  return path.join(commonGitDir, SUPERVISOR_EPISODE_ARTIFACT_DIRECTORY, taskId, "journal.json");
}

function defaultSupervisorExecutionBudget(): SupervisorExecutionBudget {
  return structuredClone(LEGACY_DISABLED_SUPERVISOR_EXECUTION_BUDGET);
}

export async function openSupervisorExecutionEpisode(opts: {
  git_root: string;
  common_git_dir?: string;
  task_id: string;
  task_revision: number | null;
  state_fingerprint_digest: string;
  budget?: SupervisorExecutionBudget;
  recover_intent?: boolean;
}): Promise<{
  journal: SupervisorExecutionEpisodeJournal;
  store: SupervisorEpisodeStore;
  journal_path: string;
}> {
  return openEpisode(opts, false);
}

export async function openGitLabSupervisorExecutionEpisode(
  opts: Parameters<typeof openSupervisorExecutionEpisode>[0],
) {
  return openEpisode(opts, true);
}

export async function openLegacyWorkflowSupervisorExecutionEpisode(
  opts: Parameters<typeof openSupervisorExecutionEpisode>[0],
) {
  return openEpisode(opts, false, true);
}

async function openEpisode(
  opts: Parameters<typeof openSupervisorExecutionEpisode>[0],
  gitLabJournal: boolean,
  legacyWorkflow = false,
) {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.git_root,
    common_git_dir: opts.common_git_dir,
    task_id: opts.task_id,
  });
  const store = legacyWorkflow
    ? createLegacyWorkflowStore(journalPath)
    : createSupervisorEpisodeStore(journalPath);
  const budget = opts.budget ?? defaultSupervisorExecutionBudget();
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const input = await store.read();
    const migration = migrateSupervisorExecutionEpisodeJournal({
      input,
      create: {
        task_id: opts.task_id,
        task_revision: opts.task_revision,
        state_fingerprint_digest: opts.state_fingerprint_digest,
        budget,
      },
    });
    const journal =
      migration.source === "current" && opts.recover_intent !== false
        ? recoverSupervisorExecutionEpisodeJournal({
            journal: migration.journal,
            state_fingerprint_digest: opts.state_fingerprint_digest,
          })
        : migration.journal;
    const observedDigest = persistedJournalDigest(input);
    if (journal.digest === observedDigest) return { journal, store, journal_path: store.path };
    if (gitLabJournal) {
      await publishGitLabJournalTransition({ store, before: input, next: journal, phase: "state" });
      return { journal, store, journal_path: store.path };
    }
    if (await store.compareAndSwap(observedDigest, journal)) {
      return { journal, store, journal_path: store.path };
    }
  }
  throw new Error(
    "Supervisor episode journal changed while it was being opened; retry the command.",
  );
}
