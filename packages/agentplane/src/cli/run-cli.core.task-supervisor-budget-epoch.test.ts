import { writeFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { createSupervisorEpisodeStore } from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Authorize a supervisor token budget epoch",
      "--description",
      "Exercise explicit USER-authorized supervisor recovery.",
      "--priority",
      "high",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      "bun run test:critical",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

function telemetryStoppedJournal(taskId: string, fingerprint: string) {
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprint,
    budget: {
      max_episodes: 20,
      max_agent_runs: 10,
      max_input_tokens: 100,
      max_output_tokens: 100,
      max_total_tokens: 200,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: initial,
    role: "PLANNER",
    kind: "agent_episode",
    operation_identity: { task_id: taskId, role: "PLANNER" },
    precondition_fingerprint_digest: fingerprint,
  });
  if (started.status !== "started") throw new Error("expected planner intent");
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "completed" },
    usage_attribution: {
      state: "unallocatable",
      reason: "external_host_turn_not_task_attributable",
    },
  });
  const ready = advanceSupervisorExecutionEpisodeState({
    journal: completed,
    state_fingerprint_digest: fingerprint,
    route_observation: { phase: "implementation" },
  });
  const stopped = startSupervisorExecutionEpisode({
    journal: ready,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { task_id: taskId, role: "EXECUTOR" },
    precondition_fingerprint_digest: fingerprint,
  });
  if (stopped.status !== "stopped") throw new Error("expected telemetry stop");
  return stopped.journal;
}

async function fixture() {
  const root = await mkGitRepoRootWithCommit();
  const config = defaultConfig();
  config.workflow_mode = "direct";
  await writeConfig(root, config);
  const taskId = await createTask(root);
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const decision = await buildTaskRouteDecision({
    ctx: command,
    cwd: root,
    rootOverride: root,
    includeRemote: false,
    freshHead: true,
    taskId,
  });
  const stoppedFingerprint = decision.workflowStep.preconditionFingerprint.digest;
  const store = createSupervisorEpisodeStore(
    `${root}/.git/agentplane/supervisor/episodes/${taskId}/journal.json`,
  );
  const stopped = telemetryStoppedJournal(taskId, stoppedFingerprint);
  await store.write(stopped);
  await writeFile(`${root}/implementation.txt`, "changed after the telemetry stop\n", "utf8");
  const currentDecision = await buildTaskRouteDecision({
    ctx: command,
    cwd: root,
    rootOverride: root,
    includeRemote: false,
    freshHead: true,
    taskId,
  });
  const fingerprint = currentDecision.workflowStep.preconditionFingerprint.digest;
  expect(fingerprint).not.toBe(stoppedFingerprint);
  return { root, taskId, fingerprint, stoppedFingerprint, store, stopped };
}

async function authorize(opts: {
  root: string;
  taskId: string;
  fingerprint: string;
  journalDigest: string;
  by?: string;
}) {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "supervisor",
      "budget-epoch",
      opts.taskId,
      "--expected-journal-digest",
      opts.journalDigest,
      "--state-fingerprint",
      opts.fingerprint,
      "--max-input-tokens",
      "1000",
      "--max-output-tokens",
      "500",
      "--max-total-tokens",
      "1500",
      "--by",
      opts.by ?? "USER",
      "--json",
      "--root",
      opts.root,
    ]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

describe("runCli task supervisor budget-epoch", { timeout: 60_000 }, () => {
  it("records a state-bound USER epoch and resumes the stopped journal", async () => {
    const current = await fixture();
    const first = await authorize({
      root: current.root,
      taskId: current.taskId,
      fingerprint: current.fingerprint,
      journalDigest: current.stopped.digest,
    });
    expect(first.code, first.stderr).toBe(0);
    const payload = JSON.parse(first.stdout) as { authority_digest: string };
    expect(payload.authority_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);

    const persisted = validateSupervisorExecutionEpisodeJournal(await current.store.read());
    expect(persisted.status).toBe("running");
    expect(persisted.stop).toBeNull();
    expect(persisted.previous_digest).toBe(current.stopped.digest);
    expect(persisted.operations[0]?.usage_attribution?.state).toBe("unallocatable");
    expect(persisted.operations.at(-1)?.recovery?.context).toMatchObject({
      kind: "supervisor_token_budget_epoch",
      authorized_by: "USER",
      prior_journal_digest: current.stopped.digest,
      stopped_state_fingerprint_digest: current.stoppedFingerprint,
      authorized_state_fingerprint_digest: current.fingerprint,
    });

    const replay = await authorize({
      root: current.root,
      taskId: current.taskId,
      fingerprint: current.fingerprint,
      journalDigest: current.stopped.digest,
    });
    expect(replay.code, replay.stderr).toBe(0);
    expect(validateSupervisorExecutionEpisodeJournal(await current.store.read()).digest).toBe(
      persisted.digest,
    );
  });

  it("rejects non-USER actors, stale fingerprints, and stale journal digests", async () => {
    const current = await fixture();
    expect(
      await runCliSilent([
        "task",
        "supervisor",
        "budget-epoch",
        current.taskId,
        "--expected-journal-digest",
        current.stopped.digest,
        "--state-fingerprint",
        current.fingerprint,
        "--max-input-tokens",
        "1000",
        "--max-output-tokens",
        "500",
        "--max-total-tokens",
        "1500",
        "--by",
        "POLICY",
        "--root",
        current.root,
      ]),
    ).toBe(2);

    const staleFingerprint = await authorize({
      root: current.root,
      taskId: current.taskId,
      fingerprint: `sha256:${"9".repeat(64)}`,
      journalDigest: current.stopped.digest,
    });
    expect(staleFingerprint.code).toBe(2);
    expect(staleFingerprint.stderr).toContain("state fingerprint is stale");

    const staleJournal = await authorize({
      root: current.root,
      taskId: current.taskId,
      fingerprint: current.fingerprint,
      journalDigest: `sha256:${"8".repeat(64)}`,
    });
    expect(staleJournal.code).not.toBe(0);
    expect(staleJournal.stderr).toContain("stale or conflicts with replay");
    expect(validateSupervisorExecutionEpisodeJournal(await current.store.read()).digest).toBe(
      current.stopped.digest,
    );
  });
});
