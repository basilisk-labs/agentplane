import { afterEach, describe, expect, it, vi } from "vitest";
import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { syncHostedMergedTasks, syncLocallyShippedBranchPrTasks } from "./hosted-merge-sync.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";

const roots: string[] = [];
const fingerprintA = `sha256:${"a".repeat(64)}`;
const fingerprintB = `sha256:${"b".repeat(64)}`;
const at = "2026-08-03T00:00:00.000Z";

afterEach(async () => {
  vi.useRealTimers();
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

async function createRepo(): Promise<{ root: string; commit: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-reconcile-tokens-"));
  roots.push(root);
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root, env: process.env });
  await execFileAsync("git", ["commit", "--allow-empty", "-m", "seed"], {
    cwd: root,
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "AgentPlane Test",
      GIT_AUTHOR_EMAIL: "agentplane@example.invalid",
      GIT_COMMITTER_NAME: "AgentPlane Test",
      GIT_COMMITTER_EMAIL: "agentplane@example.invalid",
    },
  });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: process.env,
  });
  return { root, commit: stdout.trim() };
}

function commandContext(root: string): CommandContext {
  return {
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
    resolvedProject: { gitRoot: root },
    config: {
      workflow_mode: "branch_pr",
      paths: { workflow_dir: ".agentplane/tasks" },
      branch: { task_prefix: "task" },
    },
    taskBackend: {
      capabilities: {
        canonical_source: "local",
        writes_task_readmes: true,
      },
    },
    git: {},
    memo: {},
  } as unknown as CommandContext;
}

function task(taskId: string, commit: string): TaskData {
  return {
    id: taskId,
    title: "Reconcile observed token usage",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    revision: 1,
    verification: {
      state: "ok",
      updated_at: at,
      updated_by: "TESTER",
      note: "verified",
    },
    commit: { hash: commit, message: "implementation" },
    comments: [],
    events: [],
  } as TaskData;
}

async function writePrMeta(opts: {
  root: string;
  taskId: string;
  branch: string;
  commit: string;
  merged: boolean;
}): Promise<void> {
  const directory = path.join(opts.root, ".agentplane/tasks", opts.taskId, "pr");
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, "meta.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        task_id: opts.taskId,
        branch: opts.branch,
        base: "main",
        created_at: at,
        updated_at: at,
        ...(opts.merged
          ? {
              status: "MERGED",
              merged_at: at,
              merge_commit: opts.commit,
            }
          : {}),
        head_sha: opts.commit,
        last_verified_sha: opts.commit,
        last_verified_at: at,
        verify: { status: "pass" },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

async function installFakeGh(opts: { root: string; output: unknown }): Promise<() => void> {
  const bin = path.join(opts.root, "bin");
  const executable = path.join(bin, "gh");
  await mkdir(bin, { recursive: true });
  await writeFile(
    executable,
    `#!/bin/sh\nprintf '%s\\n' '${JSON.stringify(opts.output)}'\n`,
    "utf8",
  );
  await chmod(executable, 0o755);
  const previousPath = process.env.PATH;
  process.env.PATH = previousPath ? `${bin}:${previousPath}` : bin;
  return () => {
    if (previousPath === undefined) delete process.env.PATH;
    else process.env.PATH = previousPath;
  };
}

function completeAgent(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  role: "EXECUTOR" | "EVALUATOR";
  fingerprint: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
    visible_output_tokens: number;
    reasoning_tokens: number;
    total_tokens: number;
  };
}): SupervisorExecutionEpisodeJournal {
  const started = startSupervisorExecutionEpisode({
    journal: opts.journal,
    role: opts.role,
    kind: opts.role === "EVALUATOR" ? "evaluator_episode" : "agent_episode",
    operation_identity: { role: opts.role },
    precondition_fingerprint_digest: opts.fingerprint,
    now: at,
  });
  if (started.status !== "started") throw new Error("fixture episode did not start");
  return completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "completed" },
    usage: opts.usage,
    now: at,
  });
}

async function writeObservedJournal(opts: {
  root: string;
  taskId: string;
}): Promise<SupervisorExecutionEpisodeJournal> {
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: opts.taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprintA,
    budget: {
      max_episodes: 10,
      max_agent_runs: 10,
      max_input_tokens: 1_000_000,
      max_output_tokens: 1_000_000,
      max_total_tokens: 2_000_000,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
    now: at,
  });
  const executor = completeAgent({
    journal: initial,
    role: "EXECUTOR",
    fingerprint: fingerprintA,
    usage: {
      input_tokens: 10,
      output_tokens: 7,
      visible_output_tokens: 4,
      reasoning_tokens: 3,
      total_tokens: 17,
    },
  });
  const advanced = advanceSupervisorExecutionEpisodeState({
    journal: executor,
    state_fingerprint_digest: fingerprintB,
    route_observation: { state: "evaluator" },
    now: at,
  });
  const journal = completeAgent({
    journal: advanced,
    role: "EVALUATOR",
    fingerprint: fingerprintB,
    usage: {
      input_tokens: 5,
      output_tokens: 6,
      visible_output_tokens: 2,
      reasoning_tokens: 4,
      total_tokens: 11,
    },
  });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.root,
    task_id: opts.taskId,
  });
  await createSupervisorEpisodeStore(journalPath).write(journal);
  return journal;
}

function expectObservedAggregate(
  task: TaskData,
  journal: SupervisorExecutionEpisodeJournal,
  expectedUpdatedAt: string,
): void {
  expect(task.token_usage).toMatchObject({
    schema_version: 1,
    state: "observed",
    input_tokens: 15,
    output_tokens: 6,
    reasoning_tokens: 7,
    total_tokens: 28,
    agent_runs: 2,
    observed_agent_runs: 2,
    source: "supervisor_journal",
    observed_by: "agentplane",
    journal_digest: journal.digest,
    unavailable_reason: null,
  });
  expect(task.token_usage?.updated_at).toBe(expectedUpdatedAt);
}

describe("merge reconciliation token usage", () => {
  it("projects hosted merge usage from the supervisor journal and keeps replay stable", async () => {
    const { root, commit } = await createRepo();
    const taskId = "202608030001-HOSTED";
    const branch = `task/${taskId}/hosted`;
    await writePrMeta({ root, taskId, branch, commit, merged: false });
    const journal = await writeObservedJournal({ root, taskId });
    const restorePath = await installFakeGh({
      root,
      output: [
        {
          number: 42,
          title: "Hosted merge",
          mergedAt: at,
          baseRefName: "main",
          headRefName: branch,
          headRefOid: commit,
          mergeCommit: { oid: commit },
        },
      ],
    });

    const first = await syncHostedMergedTasks({
      ctx: commandContext(root),
      tasks: [task(taskId, commit)],
    }).finally(restorePath);
    expect(first.synced).toBe(1);
    expectObservedAggregate(first.tasks[0]!, journal, at);

    const second = await syncHostedMergedTasks({
      ctx: commandContext(root),
      tasks: first.tasks,
    });
    expect(second.synced).toBe(0);
    expect(second.tasks[0]?.token_usage).toEqual(first.tasks[0]?.token_usage);
  });

  it("projects local merged-metadata usage from the supervisor journal", async () => {
    const { root, commit } = await createRepo();
    const taskId = "202608030002-LOCALM";
    const branch = `task/${taskId}/local-merged`;
    await writePrMeta({ root, taskId, branch, commit, merged: true });
    const journal = await writeObservedJournal({ root, taskId });

    const result = await syncHostedMergedTasks({
      ctx: commandContext(root),
      tasks: [task(taskId, commit)],
    });
    expect(result.synced).toBe(1);
    expectObservedAggregate(result.tasks[0]!, journal, at);
  });

  it("projects locally shipped usage from the supervisor journal", async () => {
    const reconciledAt = "2026-08-04T00:00:00.000Z";
    vi.useFakeTimers();
    vi.setSystemTime(reconciledAt);
    const { root, commit } = await createRepo();
    const taskId = "202608030003-SHIPPED";
    const branch = `task/${taskId}/shipped`;
    await writePrMeta({ root, taskId, branch, commit, merged: false });
    const journal = await writeObservedJournal({ root, taskId });

    const result = await syncLocallyShippedBranchPrTasks({
      ctx: commandContext(root),
      tasks: [task(taskId, commit)],
    });
    expect(result.synced).toBe(1);
    expectObservedAggregate(result.tasks[0]!, journal, reconciledAt);

    const replay = await syncLocallyShippedBranchPrTasks({
      ctx: commandContext(root),
      tasks: result.tasks,
    });
    expect(replay.synced).toBe(0);
    expect(replay.tasks[0]?.token_usage).toEqual(result.tasks[0]?.token_usage);
  });
});
