import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { afterEach, expect, it, vi } from "vitest";

import * as backend from "../shared/task-backend.js";
import * as episodes from "../shared/supervisor-execution-episode.js";
import * as finalization from "./direct-task-finalization.js";
import * as recovery from "./branch-task-supervisor-implementation.js";
import * as runner from "../../runner/usecases/task-run.js";
import { executeProductionBranchEpisode } from "./branch-task-supervisor-episodes.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const oldFingerprint = `sha256:${"a".repeat(64)}`;
const newFingerprint = `sha256:${"b".repeat(64)}`;
const taskId = "202609290001-BRANCH";

function journalFixture(state: "ready" | "stale" | "failed" | "intent") {
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: null,
    state_fingerprint_digest: oldFingerprint,
    budget: {
      max_episodes: 50,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: initial,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { id: "previous" },
    precondition_fingerprint_digest: oldFingerprint,
  });
  if (started.status !== "started") throw new Error("Invalid journal fixture");
  if (state === "intent") return started.journal;
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: state === "failed" ? "failed" : "succeeded" },
    failed: state === "failed",
  });
  if (state === "failed") return completed;
  const ready = advanceSupervisorExecutionEpisodeState({
    journal: completed,
    state_fingerprint_digest: oldFingerprint,
    route_observation: { id: "previous" },
  });
  return state === "stale"
    ? recoverSupervisorExecutionEpisodeJournal({
        journal: ready,
        state_fingerprint_digest: newFingerprint,
      })
    : ready;
}

afterEach(() => vi.restoreAllMocks());

it.each(["ready", "stale", "failed", "intent", "cas_lost"] as const)(
  "refreshes only a durably completed branch episode (%s)",
  async (state) => {
    const journal = journalFixture(state === "cas_lost" ? "ready" : state);
    const compareAndSwap = vi
      .fn<(expected: string | null, next: ReturnType<typeof journalFixture>) => Promise<boolean>>()
      .mockResolvedValue(state !== "cas_lost");
    const release = vi.fn();
    vi.spyOn(episodes, "openSupervisorExecutionEpisode").mockResolvedValue({
      journal,
      journal_path: "/repo/journal.json",
      store: { path: "/repo/journal.json", read: vi.fn(), write: vi.fn(), compareAndSwap },
    });
    vi.spyOn(episodes, "tryAcquireSupervisorExecutionLease").mockResolvedValue({
      release,
    } as never);
    vi.spyOn(backend, "loadCommandContext").mockResolvedValue({
      resolvedProject: { gitRoot: "/repo" },
    } as never);
    vi.spyOn(backend, "loadTaskFromContext").mockResolvedValue({ id: taskId } as never);
    vi.spyOn(recovery, "recoverProductionBranchConflict").mockResolvedValue(null);
    vi.spyOn(finalization, "readDirectTaskHead").mockResolvedValue("head");
    vi.spyOn(finalization, "readDirectRepositoryStatus").mockResolvedValue([]);
    const execute = vi
      .spyOn(runner, "executeTaskRunnerExecution")
      .mockRejectedValue(new Error("provider admission reached"));
    const decision = {
      task: { id: taskId },
      executionPacket: { mustRunFrom: "/repo" },
      workflowStep: {
        id: "agent.implementation",
        kind: "agent_episode",
        preconditionFingerprint: { digest: newFingerprint },
        episode: { role: "EXECUTOR", purpose: "implementation" },
      },
    } as unknown as TaskRouteDecision;
    const result = executeProductionBranchEpisode({
      input: { ctx: { cwd: "/repo" }, task_id: taskId } as never,
      decision,
      decide: vi.fn().mockResolvedValue(decision),
    });
    if (state === "cas_lost") {
      await expect(result).rejects.toThrow("journal changed before completed-state refresh");
      expect(execute).not.toHaveBeenCalled();
    } else if (state === "ready" || state === "stale") {
      expect(await result).toMatchObject({ stop: { code: "executor_adapter_crash" } });
      expect(execute).toHaveBeenCalledOnce();
      const refreshed = compareAndSwap.mock.calls[0][1];
      expect(refreshed.operations).toEqual(journal.operations);
      expect(refreshed.usage).toEqual(journal.usage);
      expect(refreshed.state_fingerprint_digest).toBe(newFingerprint);
      expect(compareAndSwap.mock.calls[0][0]).toBe(journal.digest);
    } else {
      expect(await result).toMatchObject({ status: "stopped" });
      expect(execute).not.toHaveBeenCalled();
      expect(compareAndSwap).not.toHaveBeenCalled();
    }
    expect(release).toHaveBeenCalledOnce();
  },
);
