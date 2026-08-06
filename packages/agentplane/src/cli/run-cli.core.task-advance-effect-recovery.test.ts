import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  recoverSupervisorExecutionEpisodeJournal,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
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
      "Effect-in-doubt planning result",
      "--description",
      "Exercise exact late planning-result reconciliation.",
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

async function writePlanningResult(packet: AgentPacket, summary: string): Promise<string> {
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
          summary,
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

describe("task advance effect recovery", () => {
  it("reconciles an exact approved planning result without replaying the agent", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const plan = "1. Preserve the original intent. 2. Apply its observed result exactly once.";
    const resultPath = await writePlanningResult(issued, plan);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      plan,
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    await store.write(
      recoverSupervisorExecutionEpisodeJournal({
        journal,
        state_fingerprint_digest: issued.state_fingerprint,
      }),
    );

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
      expect(code, io.stderr).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        action: { kind: "framework_transition" },
        stop: { reason: "control_plane_boundary" },
      });
    } finally {
      io.restore();
    }
    expect(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).toContain(plan);
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      stop: null,
      cursor: { phase: "ready", operation_key: null },
      usage: journal.usage,
      operations: [{ role: "PLANNER", status: "completed" }],
    });
  });
});
