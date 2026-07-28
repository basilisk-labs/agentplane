import { mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  migrateSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  type SupervisorEpisodeOperationKind,
  type SupervisorExecutionBudget,
  type SupervisorExecutionEpisodeJournal,
  type SupervisorExecutionUsage,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { gitRevParse } from "@agentplaneorg/core/git";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { readCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import {
  superviseWorkflowStep,
  type WorkflowSupervisorExecution,
  type WorkflowSupervisorExecutor,
} from "./workflow-supervisor.js";

const SUPERVISOR_EPISODE_ARTIFACT_DIRECTORY = "agentplane/supervisor/episodes";

/**
 * Conservative process limits. They bound supervisor-owned work without
 * becoming a second policy/configuration surface; later slices can project
 * explicit task policy onto the same canonical contract.
 */
const DEFAULT_SUPERVISOR_EXECUTION_BUDGET: SupervisorExecutionBudget = {
  max_episodes: 50,
  max_agent_runs: 50,
  max_input_tokens: 3_000_000,
  max_output_tokens: 1_000_000,
  max_total_tokens: 4_000_000,
  max_wall_time_ms: 4 * 60 * 60 * 1000,
  max_changed_files: 2000,
  // The runner has no supervisor-observed line delta yet. A non-null default
  // would falsely claim a hard limit while always charging zero.
  max_diff_lines: null,
  max_no_progress_episodes: 3,
};

export type SupervisorEpisodeStore = {
  read: () => Promise<unknown>;
  write: (journal: SupervisorExecutionEpisodeJournal) => Promise<void>;
  /**
   * Replace a journal only if the persisted digest is still the digest the
   * caller observed. This is the boundary between a read-only route decision
   * and a provider invocation: a loser must not launch a second provider.
   */
  compareAndSwap: (
    expected_digest: SupervisorExecutionEpisodeJournal["digest"] | null,
    journal: SupervisorExecutionEpisodeJournal,
  ) => Promise<boolean>;
  path: string;
};

const JOURNAL_LOCK_STALE_AFTER_MS = 60_000;
const JOURNAL_LOCK_RETRY_DELAY_MS = 10;
const JOURNAL_LOCK_WAIT_MS = 5_000;

function persistedJournalDigest(
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
      if (Date.now() >= deadline) {
        throw new Error(`Timed out waiting for supervisor episode journal lock: ${lockPath}`);
      }
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
  task_id: string;
}): Promise<string> {
  const taskId = safeTaskPathSegment(opts.task_id);
  const rawCommonGitDir = await gitRevParse(opts.git_root, ["--git-common-dir"]);
  const commonGitDir = path.resolve(opts.git_root, rawCommonGitDir);
  return path.join(commonGitDir, SUPERVISOR_EPISODE_ARTIFACT_DIRECTORY, taskId, "journal.json");
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
  const writeJournal = async (journal: SupervisorExecutionEpisodeJournal) => {
    await atomicWriteFile(filePath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
  };
  return {
    path: filePath,
    read,
    write: async (journal) => {
      await withJournalLock(filePath, async () => writeJournal(journal));
    },
    compareAndSwap: async (expectedDigest, journal) => {
      return withJournalLock(filePath, async () => {
        const current = await read();
        if (persistedJournalDigest(current) !== expectedDigest) return false;
        await writeJournal(journal);
        return true;
      });
    },
  };
}

function defaultSupervisorExecutionBudget(): SupervisorExecutionBudget {
  return structuredClone(DEFAULT_SUPERVISOR_EXECUTION_BUDGET);
}

export async function openSupervisorExecutionEpisode(opts: {
  git_root: string;
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
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.git_root,
    task_id: opts.task_id,
  });
  const store = createSupervisorEpisodeStore(journalPath);
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
    if (await store.compareAndSwap(observedDigest, journal)) {
      return { journal, store, journal_path: store.path };
    }
  }
  throw new Error(
    "Supervisor episode journal changed while it was being opened; retry the command.",
  );
}

function operationKind(decision: TaskRouteDecision): SupervisorEpisodeOperationKind {
  const operation =
    decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation : null;
  if (operation?.id === "runner.follow" && operation.params.mode === "run") {
    return "agent_episode";
  }
  return "cli_operation";
}

function operationRole(opts: {
  decision: TaskRouteDecision;
  kind: SupervisorEpisodeOperationKind;
}): "EXECUTOR" | "CURATOR" | "EVALUATOR" {
  if (opts.kind === "evaluator_episode") return "EVALUATOR";
  return opts.decision.task.owner.trim().toUpperCase() === "CURATOR" ? "CURATOR" : "EXECUTOR";
}

function stoppedExecution(opts: {
  decision: TaskRouteDecision;
  reason: string;
}): WorkflowSupervisorExecution {
  return {
    decision: opts.decision,
    operation:
      opts.decision.workflowStep.kind === "cli_operation"
        ? opts.decision.workflowStep.operation
        : null,
    executable: false,
    stop_reason: opts.reason,
    audit: [],
    result: null,
    refreshed_decision: null,
  };
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function observedRunnerUsage(opts: {
  result: Awaited<ReturnType<WorkflowSupervisorExecutor>>;
  budget: SupervisorExecutionBudget;
}): {
  usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">>;
  progress: unknown;
  missing_dimensions: string[];
} {
  const lifecycle =
    opts.result.operation_result?.kind === "runner_lifecycle"
      ? opts.result.operation_result.value
      : null;
  if (lifecycle?.phase !== "executed" || lifecycle.result === null) {
    return { usage: {}, progress: undefined, missing_dimensions: [] };
  }
  const metrics = lifecycle.result.metrics;
  const evidence = lifecycle.result.evidence;
  const providerUsage = readCodexProviderUsageForResult(lifecycle.result);
  const usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">> = {};
  const missing: string[] = [];
  for (const field of ["input_tokens", "output_tokens", "total_tokens"] as const) {
    if (isNonNegativeInteger(providerUsage?.[field])) usage[field] = providerUsage[field];
    else if (opts.budget[`max_${field}`] !== null) missing.push(`${field}_telemetry`);
  }
  if (isNonNegativeInteger(metrics?.duration_ms)) usage.wall_time_ms = metrics.duration_ms;
  else if (opts.budget.max_wall_time_ms !== null) missing.push("wall_time_ms_telemetry");
  if (isNonNegativeInteger(evidence?.files_changed_count)) {
    usage.changed_files = evidence.files_changed_count;
  } else if (opts.budget.max_changed_files !== null) {
    missing.push("changed_files_telemetry");
  }
  if (opts.budget.max_diff_lines !== null) missing.push("diff_lines_telemetry");
  return {
    usage,
    progress: lifecycle.lifecycle.state_fingerprint,
    missing_dimensions: missing.toSorted(),
  };
}

/**
 * Persist the intent before calling the existing typed supervisor. A restart
 * can therefore distinguish an uncompleted provider/effect from a completed
 * one and refuses to replay it implicitly.
 */
export async function supervisePersistedWorkflowEpisode(opts: {
  decision: TaskRouteDecision;
  git_root: string;
  task_revision?: number | null;
  execute: WorkflowSupervisorExecutor;
  refresh: () => Promise<TaskRouteDecision>;
  budget?: SupervisorExecutionBudget;
}): Promise<{
  execution: WorkflowSupervisorExecution;
  journal: SupervisorExecutionEpisodeJournal;
  journal_path: string;
}> {
  const budget = opts.budget ?? defaultSupervisorExecutionBudget();
  const currentFingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  const opened = await openSupervisorExecutionEpisode({
    git_root: opts.git_root,
    task_id: opts.decision.task.id,
    task_revision: opts.task_revision ?? null,
    state_fingerprint_digest: currentFingerprint,
    budget,
  });
  let journal = opened.journal;
  const store = opened.store;
  const operation =
    opts.decision.workflowStep.kind === "cli_operation"
      ? opts.decision.workflowStep.operation
      : null;
  if (!operation) {
    const inspected = await superviseWorkflowStep({ decision: opts.decision, mode: "inspect" });
    return {
      execution: inspected,
      journal,
      journal_path: opened.journal_path,
    };
  }

  // A restart can observe the durable agent outcome before the route cursor
  // was advanced. Refresh and commit that observation first; launching a new
  // provider here would replay an already completed semantic episode.
  if (journal.status === "running" && journal.cursor.phase === "completed") {
    const refreshed = await opts.refresh();
    journal = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    await store.write(journal);
    return {
      execution: await superviseWorkflowStep({ decision: refreshed, mode: "inspect" }),
      journal,
      journal_path: store.path,
    };
  }

  const kind = operationKind(opts.decision);
  const started = startSupervisorExecutionEpisode({
    journal,
    role: operationRole({ decision: opts.decision, kind }),
    kind,
    operation_identity: operation,
    precondition_fingerprint_digest: currentFingerprint,
    authority_ref: `workflow-operation:${operation.id}`,
    authority_digest: operation.preconditionFingerprint.digest,
    effect_ref: operation.id === "runner.follow" ? operation.idempotencyKey : null,
  });
  journal = started.journal;
  await store.write(journal);
  if (started.status !== "started") {
    return {
      execution: stoppedExecution({
        decision: opts.decision,
        reason:
          started.status === "effect_in_doubt"
            ? "supervisor episode has an effect in doubt; resolve it before retrying"
            : `supervisor episode stopped: ${started.stop.reason} (${started.stop.exhausted_dimensions.join(",") || "none"})`,
      }),
      journal,
      journal_path: store.path,
    };
  }

  let completed = false;
  let refreshed: TaskRouteDecision | null = null;
  const execution = await superviseWorkflowStep({
    decision: opts.decision,
    mode: "execute",
    execute: async ({ operation: invoked }) => {
      try {
        const result = await opts.execute({ operation: invoked });
        const observed = observedRunnerUsage({ result, budget: journal.budget });
        journal = completeSupervisorExecutionEpisode({
          journal,
          operation_key: started.operation_key,
          result: {
            status: result.status,
            observed_postconditions: result.observed_postconditions,
            exit_code: result.exit_code,
          },
          usage: observed.usage,
          ...(observed.progress === undefined ? {} : { progress: observed.progress }),
          failed: result.status !== "succeeded",
        });
        if (result.status === "succeeded" && observed.missing_dimensions.length > 0) {
          journal = stopSupervisorExecutionEpisode({
            journal,
            reason: "human_review",
            exhausted_dimensions: observed.missing_dimensions,
          });
        }
        completed = result.status === "succeeded" && journal.status === "running";
        await store.write(journal);
        return result;
      } catch (error) {
        journal = completeSupervisorExecutionEpisode({
          journal,
          operation_key: started.operation_key,
          result: { error: error instanceof Error ? error.name : "unknown_error" },
          failed: true,
        });
        await store.write(journal);
        throw error;
      }
    },
    refresh: async () => {
      refreshed = await opts.refresh();
      if (completed && journal.status === "running") {
        journal = advanceSupervisorExecutionEpisodeState({
          journal,
          state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
          route_observation: {
            step_id: refreshed.workflowStep.id,
          },
        });
        await store.write(journal);
      }
      return refreshed;
    },
  });
  return { execution, journal, journal_path: store.path };
}
