import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { agentTransitionId } from "../commands/task/agent-action-packet.js";
import type { ExternalAgentExchange } from "../commands/task/external-agent-exchange.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  authority: { role: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
};

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "External task-worktree resolution",
      "--description",
      "Exercise the state-bound worktree resolution protocol.",
      "--priority",
      "med",
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

async function readAgentPacket(root: string, taskId: string): Promise<AgentPacket> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as AgentPacket;
  } finally {
    io.restore();
  }
}

async function writeCompletedResult(packet: AgentPacket): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as { work_order_id: string; role: string };
  const resultPath = path.join(packet.exchange.directory, packet.exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: packet.task_id,
        transition_id: packet.transition_id,
        state_fingerprint: packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: "Keep the intended worktree changes.",
          findings: [],
          uncertainty: [],
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

async function returnAgentResult(root: string, taskId: string, resultPath: string) {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "advance",
      taskId,
      "--result",
      resultPath,
      "--agent-json",
      "--root",
      root,
    ]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

describe("runCli task advance worktree resolution", { timeout: 180_000 }, () => {
  it("recovers a completed stale journal and replaces prior implementation metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Keep and commit the intended task-worktree change.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed worktree resolution"], { cwd: root });

    const slug = "external-resolution";
    const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-${slug}`);
    await runCliSilent([
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      slug,
      "--worktree",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: reproduce external task-worktree resolution.",
      "--root",
      taskWorktree,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: persist start-ready fixture"], {
      cwd: taskWorktree,
    });
    const priorImplementationHeadResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const priorImplementationHead = priorImplementationHeadResult.stdout.trim();
    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--commit",
      priorImplementationHead,
      "--root",
      taskWorktree,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: persist prior implementation metadata"], {
      cwd: taskWorktree,
    });
    await writeFile(path.join(taskWorktree, "intended-resolution.txt"), "keep\n", "utf8");

    const taskCommand = await loadCommandContext({ cwd: taskWorktree, rootOverride: taskWorktree });
    const currentDecision = await buildTaskRouteDecision({
      ctx: taskCommand,
      cwd: taskWorktree,
      rootOverride: taskWorktree,
      taskId,
      includeRemote: false,
    });
    const oldFingerprint = `sha256:${"a".repeat(64)}`;
    const prior = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: currentDecision.workflowStep.preconditionFingerprint.task_revision,
      state_fingerprint_digest: oldFingerprint,
      budget: {
        max_episodes: 4,
        max_agent_runs: 4,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const priorStarted = startSupervisorExecutionEpisode({
      journal: prior,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { test: "completed prior external episode" },
      precondition_fingerprint_digest: oldFingerprint,
    });
    if (priorStarted.status !== "started") throw new Error("expected prior supervisor intent");
    const priorCompleted = completeSupervisorExecutionEpisode({
      journal: priorStarted.journal,
      operation_key: priorStarted.operation_key,
      result: { verdict: "rework" },
    });
    const priorReady = advanceSupervisorExecutionEpisodeState({
      journal: priorCompleted,
      state_fingerprint_digest: oldFingerprint,
      route_observation: { test: "prior result persisted" },
    });
    const stale = startSupervisorExecutionEpisode({
      journal: priorReady,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { test: "changed route after prior result" },
      precondition_fingerprint_digest: currentDecision.workflowStep.preconditionFingerprint.digest,
    });
    if (stale.status !== "stopped" || stale.stop.reason !== "stale_state") {
      throw new Error("expected stale supervisor journal fixture");
    }
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: taskWorktree,
      task_id: taskId,
    });
    await createSupervisorEpisodeStore(journalPath).write(priorReady);

    const packet = await readAgentPacket(taskWorktree, taskId);
    expect(packet.transition_id).toBe(agentTransitionId("agent.task_worktree_resolution"));
    const resultPath = await writeCompletedResult(packet);
    await execFileAsync("git", ["add", "intended-resolution.txt"], { cwd: taskWorktree });
    await execFileAsync(
      "git",
      ["commit", "-m", `🚧 ${taskId.split("-").at(-1)} task: apply external agent result`],
      { cwd: taskWorktree },
    );
    if (!packet.exchange) throw new Error("expected task-worktree resolution exchange");
    const accepted = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(accepted.code, accepted.stderr).toBe(0);
    expect(accepted.stderr).not.toMatch(/unsupported purpose|stale/iu);
    expect(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "consumed" });
    const exchange = JSON.parse(
      await readFile(path.join(packet.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(exchange.baseline.head).not.toBe(priorImplementationHead);
    const taskReadme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toMatch(/commit:\n {2}hash: "[0-9a-f]{40}"/u);
    expect(taskReadme).not.toContain(`hash: "${priorImplementationHead}"`);
  });
});
