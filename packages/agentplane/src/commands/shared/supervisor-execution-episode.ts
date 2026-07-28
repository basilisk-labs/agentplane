import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  migrateSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type SupervisorEpisodeOperationKind,
  type SupervisorExecutionBudget,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { gitRevParse } from "@agentplaneorg/core/git";

import type { TaskRouteDecision } from "./route-decision-types.js";
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
  max_diff_lines: 100_000,
  max_no_progress_episodes: 3,
};

type SupervisorEpisodeStore = {
  read: () => Promise<unknown>;
  write: (journal: SupervisorExecutionEpisodeJournal) => Promise<void>;
  path: string;
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
  task_id: string;
}): Promise<string> {
  const taskId = safeTaskPathSegment(opts.task_id);
  const rawCommonGitDir = await gitRevParse(opts.git_root, ["--git-common-dir"]);
  const commonGitDir = path.resolve(opts.git_root, rawCommonGitDir);
  return path.join(commonGitDir, SUPERVISOR_EPISODE_ARTIFACT_DIRECTORY, taskId, "journal.json");
}

export function createSupervisorEpisodeStore(filePath: string): SupervisorEpisodeStore {
  return {
    path: filePath,
    read: async () => {
      try {
        return JSON.parse(await readFile(filePath, "utf8")) as unknown;
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
        throw error;
      }
    },
    write: async (journal) => {
      await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
      await atomicWriteFile(filePath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
    },
  };
}

function operationKind(decision: TaskRouteDecision): SupervisorEpisodeOperationKind {
  const operation =
    decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation : null;
  if (operation?.id === "runner.follow" && operation.params.mode === "run") {
    return "agent_episode";
  }
  return "cli_operation";
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
  const operation =
    opts.decision.workflowStep.kind === "cli_operation"
      ? opts.decision.workflowStep.operation
      : null;
  if (!operation) {
    const inspected = await superviseWorkflowStep({ decision: opts.decision, mode: "inspect" });
    const journal = createSupervisorExecutionEpisodeJournal({
      task_id: opts.decision.task.id,
      task_revision: opts.task_revision ?? null,
      state_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
      budget: opts.budget ?? DEFAULT_SUPERVISOR_EXECUTION_BUDGET,
    });
    return {
      execution: inspected,
      journal,
      journal_path: await resolveSupervisorExecutionEpisodePath({
        git_root: opts.git_root,
        task_id: opts.decision.task.id,
      }),
    };
  }

  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.git_root,
    task_id: opts.decision.task.id,
  });
  const store = createSupervisorEpisodeStore(journalPath);
  const currentFingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  const migration = migrateSupervisorExecutionEpisodeJournal({
    input: await store.read(),
    create: {
      task_id: opts.decision.task.id,
      task_revision: opts.task_revision ?? null,
      state_fingerprint_digest: currentFingerprint,
      budget: opts.budget ?? DEFAULT_SUPERVISOR_EXECUTION_BUDGET,
    },
  });
  let journal =
    migration.source === "current"
      ? recoverSupervisorExecutionEpisodeJournal({
          journal: migration.journal,
          state_fingerprint_digest: currentFingerprint,
        })
      : migration.journal;
  await store.write(journal);

  const started = startSupervisorExecutionEpisode({
    journal,
    role: operationKind(opts.decision) === "evaluator_episode" ? "EVALUATOR" : "EXECUTOR",
    kind: operationKind(opts.decision),
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
        journal = completeSupervisorExecutionEpisode({
          journal,
          operation_key: started.operation_key,
          result: {
            status: result.status,
            observed_postconditions: result.observed_postconditions,
            exit_code: result.exit_code,
          },
          failed: result.status !== "succeeded",
        });
        completed = result.status === "succeeded";
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
