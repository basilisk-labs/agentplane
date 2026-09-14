import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import {
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRootWithCommit, writeConfig } from "@agentplane/testkit";
import { expect } from "vitest";

import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { defaultConfig } from "./core-imports.js";
import {
  captureRecoveryCli,
  writePlanningResult,
  type AgentPacket,
} from "./task-advance-effect-recovery.testkit.js";

const execFileAsync = promisify(execFile);

async function advanceToImplementation(
  root: string,
  taskId: string,
  readAgentPacket: (root: string, taskId: string) => Promise<AgentPacket>,
): Promise<AgentPacket> {
  const planning = await readAgentPacket(root, taskId);
  const resultPath = await writePlanningResult(planning, "Exercise rejected result recovery.");
  const planned = await captureRecoveryCli([
    "task",
    "advance",
    taskId,
    "--result",
    resultPath,
    "--agent-json",
    "--root",
    root,
  ]);
  expect(planned.code, planned.stderr).toBe(0);
  expect(JSON.parse(planned.stdout)).toMatchObject({ action: { kind: "approval_required" } });
  const documented = await captureRecoveryCli([
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "Run the focused recovery test and confirm exact-key replacement.",
    "--updated-by",
    "PLANNER",
    "--root",
    root,
  ]);
  expect(documented.code, documented.stderr).toBe(0);
  const approved = await captureRecoveryCli([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  expect(approved.code, approved.stderr).toBe(0);
  const implementation = await readAgentPacket(root, taskId);
  expect(implementation).toMatchObject({ action: { kind: "agent_episode" } });
  return implementation;
}

export async function exerciseRejectedResultApplicationRecovery(callbacks: {
  createTask: (root: string) => Promise<string>;
  readAgentPacket: (root: string, taskId: string) => Promise<AgentPacket>;
}): Promise<void> {
  const root = await mkGitRepoRootWithCommit();
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  const taskId = await callbacks.createTask(root);
  const issued = await advanceToImplementation(root, taskId, callbacks.readAgentPacket);
  if (!issued.exchange) throw new Error("expected an implementation exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(issued.exchange.directory, issued.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const checkout = workOrder.state_fingerprint.worktree;
  await execFileAsync("git", ["commit", "--allow-empty", "-m", "foreign history change"], {
    cwd: checkout,
  });
  const resultPath = await writePlanningResult(
    issued,
    "This result must be rejected before semantic application.",
  );

  const rejected = await captureRecoveryCli([
    "task",
    "advance",
    taskId,
    "--result",
    resultPath,
    "--agent-json",
    "--root",
    root,
  ]);
  expect(rejected.code).toBe(8);
  expect(rejected.stderr).toContain(
    "Git history changed outside the recoverable Agentplane implementation effect.",
  );
  expect(rejected.stderr).toContain("retired the rejected result");
  expect(rejected.stderr).toContain("--replacement");
  expect(
    JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
  ).toMatchObject({ status: "retired" });

  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  const store = createSupervisorEpisodeStore(journalPath);
  const failed = validateSupervisorExecutionEpisodeJournal(await store.read());
  const failedOperation = failed.operations.at(-1);
  expect(failed).toMatchObject({
    status: "stopped",
    stop: { reason: "operation_failed" },
  });
  expect(failedOperation).toMatchObject({ status: "failed" });

  const plain = await captureRecoveryCli([
    "task",
    "advance",
    taskId,
    "--agent-json",
    "--root",
    root,
  ]);
  expect(plain.code).toBe(8);
  expect(plain.stderr).toContain("rerun task advance with --replacement");

  const replacement = await captureRecoveryCli([
    "task",
    "advance",
    taskId,
    "--replacement",
    "--agent-json",
    "--root",
    root,
  ]);
  expect(replacement.code, replacement.stderr).toBe(0);
  const fresh = JSON.parse(replacement.stdout) as AgentPacket;
  expect(fresh).toMatchObject({ action: { kind: "agent_episode" } });
  expect(fresh.transition_id).not.toBe(issued.transition_id);
  expect(fresh.exchange?.directory).not.toBe(issued.exchange.directory);
  const replaced = validateSupervisorExecutionEpisodeJournal(await store.read());
  expect(replaced).toMatchObject({
    status: "running",
    cursor: { phase: "intent_recorded" },
  });
  expect(replaced.operations.slice(-2)).toMatchObject([
    { operation_key: failedOperation?.operation_key, status: "failed" },
    {
      status: "intent",
      replacement_of_operation_key: failedOperation?.operation_key,
    },
  ]);
}
