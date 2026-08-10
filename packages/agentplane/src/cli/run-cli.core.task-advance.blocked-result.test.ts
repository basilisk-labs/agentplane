import { execFile } from "node:child_process";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { MAX_AGENT_ACTION_PACKET_BYTES } from "../commands/task/agent-action-packet.js";
import { blockedResultBody } from "../commands/task/external-agent-blocked-result.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "../commands/task/external-agent-exchange.js";
import { resolveSupervisorExecutionEpisodePath } from "../commands/shared/supervisor-execution-episode.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
    result_path: string;
  };
  stop: { reason: string; resume: string };
};

async function createTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Exercise a typed blocked external-agent result.",
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
    expect(Buffer.byteLength(io.stdout.trim(), "utf8")).toBeLessThanOrEqual(
      MAX_AGENT_ACTION_PACKET_BYTES,
    );
    return JSON.parse(io.stdout) as AgentPacket;
  } finally {
    io.restore();
  }
}

async function writeBlockedResult(packet: AgentPacket, summary: string): Promise<string> {
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
          status: "blocked",
          summary,
          findings: ["The issued authority cannot satisfy the requested effect."],
          uncertainty: [],
          blocker: {
            summary,
            recommended_action: "Resolve the recorded authority boundary, then resume the task.",
          },
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

async function returnAgentResult(
  root: string,
  taskId: string,
  resultPath: string,
): Promise<{ code: number; stdout: string; stderr: string }> {
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

async function persistBlockedStatusWithoutCommit(opts: {
  packet: AgentPacket;
  resultPath: string;
  root: string;
}): Promise<void> {
  if (!opts.packet.exchange) throw new Error("expected an external-agent exchange");
  const exchange = JSON.parse(
    await readFile(path.join(opts.packet.exchange.directory, "exchange.json"), "utf8"),
  ) as ExternalAgentExchange;
  const envelope = JSON.parse(
    await readFile(opts.resultPath, "utf8"),
  ) as ExternalAgentResultEnvelope;
  await runCliSilent([
    "task",
    "set-status",
    opts.packet.task_id,
    "BLOCKED",
    "--author",
    "SUPERVISOR",
    "--body",
    blockedResultBody({ exchange, semantic: envelope.result }),
    "--root",
    opts.root,
  ]);
}

async function prepareBlockedResultTask(opts: {
  title: string;
  plan: string;
  slug: string;
}): Promise<{ taskId: string; taskWorktree: string }> {
  const root = await mkGitRepoRootWithBranch("main");
  await cp(
    path.join(process.cwd(), ".agentplane", "policy"),
    path.join(root, ".agentplane", "policy"),
    { recursive: true },
  );
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  const taskId = await createTask(root, opts.title);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    opts.plan,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", `test: seed ${opts.slug} task`], { cwd: root });

  const branch = `task/${taskId}/${opts.slug}`;
  const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-${opts.slug}`);
  await mkdir(path.dirname(taskWorktree), { recursive: true });
  await execFileAsync("git", ["worktree", "add", "-b", branch, taskWorktree], { cwd: root });
  return { taskId, taskWorktree };
}

describe("runCli task advance blocked results", { timeout: 180_000 }, () => {
  it("consumes a blocked branch implementation once and waits for an explicit resume", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Blocked external branch result",
      plan: "Attempt one scoped implementation and preserve any typed blocker.",
      slug: "blocked-external-result",
    });

    const issued = await readAgentPacket(taskWorktree, taskId);
    expect(issued.action.kind).toBe("agent_episode");
    const resultPath = await writeBlockedResult(
      issued,
      "The implementation requires authority outside the issued writable roots.",
    );
    const firstReturn = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(firstReturn.code, firstReturn.stderr).toBe(0);
    const blockedPacket = JSON.parse(firstReturn.stdout) as AgentPacket;
    expect(blockedPacket.action.kind).toBe("terminal");
    expect(blockedPacket.exchange).toBeUndefined();
    expect(blockedPacket.stop).toEqual({ reason: "terminal", resume: "none" });

    const readmePath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    const readmeAfterFirstReturn = await readFile(readmePath, "utf8");
    expect(readmeAfterFirstReturn).toContain('status: "BLOCKED"');
    expect(readmeAfterFirstReturn).toContain(
      "The implementation requires authority outside the issued writable roots.",
    );
    const firstHeadResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const firstHead = firstHeadResult.stdout.trim();
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: taskWorktree,
      task_id: taskId,
    });
    const firstJournal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(journalPath, "utf8")) as unknown,
    );

    const replay = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(replay.code).not.toBe(0);
    expect(replay.stderr).toContain("already consumed");
    expect(await readFile(readmePath, "utf8")).toBe(readmeAfterFirstReturn);
    const replayHead = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    expect(replayHead.stdout.trim()).toBe(firstHead);

    const stillBlocked = await readAgentPacket(taskWorktree, taskId);
    expect(stillBlocked.action.kind).toBe("terminal");
    expect(stillBlocked.exchange).toBeUndefined();
    const blockedJournal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(journalPath, "utf8")) as unknown,
    );
    expect(blockedJournal.usage.agent_runs).toBe(firstJournal.usage.agent_runs);

    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--author",
      "CODER",
      "--body",
      "Start: resume after the recorded authority boundary was resolved.",
      "--root",
      taskWorktree,
    ]);
    const resumed = await readAgentPacket(taskWorktree, taskId);
    expect(resumed.action.kind).toBe("agent_episode");
    expect(resumed.exchange).toBeDefined();
    expect(resumed.exchange!.result_path).not.toBe(resultPath);
    expect(resumed.state_fingerprint).not.toBe(issued.state_fingerprint);
  });

  it("rejects workspace changes returned with a blocked branch result", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Blocked result with workspace changes",
      plan: "Reject non-completed semantic results that leave workspace changes.",
      slug: "blocked-result-tamper",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    const headBeforeReturn = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    await mkdir(path.join(taskWorktree, "src"), { recursive: true });
    await writeFile(
      path.join(taskWorktree, "src", "blocked-tamper.txt"),
      "must not persist\n",
      "utf8",
    );
    const resultPath = await writeBlockedResult(
      issued,
      "The agent is blocked after changing an otherwise allowed source path.",
    );

    const rejected = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain("Blocked implementation result produced workspace changes");
    const readme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DOING"');
    expect(readme).not.toContain(
      "The agent is blocked after changing an otherwise allowed source path.",
    );
    const headAfterReturn = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    expect(headAfterReturn.stdout.trim()).toBe(headBeforeReturn.stdout.trim());
  });

  it("finishes a partially persisted blocker without duplicating task evidence", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Retry blocker status persistence",
      plan: "Recover one blocker after status persistence stops before its commit.",
      slug: "blocked-result-status-retry",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    const baselineResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const baseline = baselineResult.stdout.trim();
    const resultPath = await writeBlockedResult(
      issued,
      "The blocker status was persisted before the original commit attempt stopped.",
    );
    await persistBlockedStatusWithoutCommit({ packet: issued, resultPath, root: taskWorktree });
    const readmeBeforeRecovery = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const receiptCountBefore = readmeBeforeRecovery.match(/external-agent-blocker\//gu)?.length;

    const recovered = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(recovered.code, recovered.stderr).toBe(0);
    const readme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme.match(/external-agent-blocker\//gu)?.length).toBe(receiptCountBefore);
    const commitCount = await execFileAsync("git", ["rev-list", "--count", `${baseline}..HEAD`], {
      cwd: taskWorktree,
    });
    expect(commitCount.stdout.trim()).toBe("1");
    const status = await execFileAsync("git", ["status", "--short"], { cwd: taskWorktree });
    expect(status.stdout).toBe("");
  });

  it("amends an existing blocker commit instead of stacking a retry commit", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Retry blocker post-commit refresh",
      plan: "Recover one blocker when its commit exists but artifact refresh did not finish.",
      slug: "blocked-result-commit-retry",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    const baselineResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const baseline = baselineResult.stdout.trim();
    const resultPath = await writeBlockedResult(
      issued,
      "The blocker commit exists but its post-commit artifact refresh stopped.",
    );
    await persistBlockedStatusWithoutCommit({ packet: issued, resultPath, root: taskWorktree });
    const readmeBeforeRecovery = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const receiptCountBefore = readmeBeforeRecovery.match(/external-agent-blocker\//gu)?.length;
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: taskWorktree });
    await execFileAsync(
      "git",
      ["commit", "-m", `🚧 ${taskId.split("-").at(-1)} task: record external blocker`],
      { cwd: taskWorktree },
    );

    const recovered = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(recovered.code, recovered.stderr).toBe(0);
    const commitCount = await execFileAsync("git", ["rev-list", "--count", `${baseline}..HEAD`], {
      cwd: taskWorktree,
    });
    expect(commitCount.stdout.trim()).toBe("1");
    const readme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme.match(/external-agent-blocker\//gu)?.length).toBe(receiptCountBefore);
    const status = await execFileAsync("git", ["status", "--short"], { cwd: taskWorktree });
    expect(status.stdout).toBe("");
  });

  it("rejects a blocked result after external Git history changes", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Reject blocked result history changes",
      plan: "Reject a blocked result when the external agent created a commit.",
      slug: "blocked-result-history-tamper",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    await writeFile(path.join(taskWorktree, "history-tamper.txt"), "unauthorized commit\n", "utf8");
    await execFileAsync("git", ["add", "history-tamper.txt"], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: external history tamper"], {
      cwd: taskWorktree,
    });
    const resultPath = await writeBlockedResult(
      issued,
      "The external agent returned blocked after changing Git history.",
    );

    const rejected = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain("External agent changed Git history");
    const readme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DOING"');
    expect(readme).not.toContain("external-agent-blocker/");
  });

  it("rejects a spoofed blocker commit that contains non-task changes", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Reject spoofed blocker recovery",
      plan: "Recover only the exact task-local blocker commit effect.",
      slug: "blocked-result-spoofed-recovery",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    const resultPath = await writeBlockedResult(
      issued,
      "The blocker receipt exists in a commit that also contains unauthorized source changes.",
    );
    await persistBlockedStatusWithoutCommit({ packet: issued, resultPath, root: taskWorktree });
    await writeFile(path.join(taskWorktree, "spoofed-change.txt"), "must be rejected\n", "utf8");
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`, "spoofed-change.txt"], {
      cwd: taskWorktree,
    });
    await execFileAsync(
      "git",
      ["commit", "-m", `🚧 ${taskId.split("-").at(-1)} task: record external blocker`],
      { cwd: taskWorktree },
    );

    const rejected = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain(
      "Git history changed outside the recoverable Agentplane blocker effect",
    );
  });
});
