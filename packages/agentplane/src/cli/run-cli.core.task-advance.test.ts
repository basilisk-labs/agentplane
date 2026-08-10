import { execFile } from "node:child_process";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import {
  agentTransitionId,
  MAX_AGENT_ACTION_PACKET_BYTES,
} from "../commands/task/agent-action-packet.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { readRoute, readRouteFingerprint } from "./run-cli.core.task-advance.testkit.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { buildObservedGithubPrMeta, buildOpenedPrMeta } from "../commands/shared/pr-meta.js";
import {
  externalAgentResultDigest,
  type ExternalAgentExchange,
  validateExternalAgentResultEnvelope,
} from "../commands/task/external-agent-exchange.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  schema_version: number;
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority: {
    role: string;
    mutation: string;
    network: string;
    required: boolean;
    reference: string | null;
  };
  context_refs: { kind: string; ref: string; digest?: string }[];
  operator_action?: {
    kind: string;
    required_role: string;
    cwd: string | null;
    argv: string[] | null;
    authority_reference: string;
  };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_schema_ref: string;
    result_ref: string;
    return_invocation: string;
    result_path: string;
    resume_argv: string[];
  };
  recovery?: { reason: string; evidence_digest: string };
  stop: { reason: string; resume: string };
};

async function createTask(
  root: string,
  title: string,
  verify = "bun run test:critical",
): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Exercise the compact external-agent protocol.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      verify,
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

async function writeCompletedResult(
  packet: AgentPacket,
  summary: string,
  review?: {
    verdict: "pass" | "rework" | "blocked" | "human_review";
    missing_tests: string[];
    hidden_assumptions: string[];
    residual_risks: string[];
  },
): Promise<string> {
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
          findings: review ? ["The frozen diff satisfies the approved task intent."] : [],
          uncertainty: [],
          ...(review ? { review } : {}),
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

describe("runCli task advance", { timeout: 180_000 }, () => {
  it("returns one compact planning action without changing repository state", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Compact approval packet");
    const before = await execFileAsync("git", ["status", "--porcelain=v1"], { cwd: root });
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskBefore = await readFile(readmePath, "utf8");

    const first = await readAgentPacket(root, taskId);
    const second = await readAgentPacket(root, taskId);
    const after = await execFileAsync("git", ["status", "--porcelain=v1"], { cwd: root });
    const taskAfter = await readFile(readmePath, "utf8");

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      schema_version: 1,
      task_id: taskId,
      transition_id: agentTransitionId("agent.planning", first.state_fingerprint),
      action: { kind: "agent_episode" },
      authority: { role: "PLANNER", mutation: "read_only" },
      stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    });
    expect(first.state_fingerprint).toBe(await readRouteFingerprint(root, taskId));
    expect(first.context_refs.length).toBeGreaterThan(0);
    expect(first.exchange).toMatchObject({
      work_order_ref: "work-order.json",
      result_schema_ref: "result-schema.json",
      result_ref: "result.json",
      return_invocation:
        "agentplane task advance <task_id> --result <exchange_directory>/<result_ref> --agent-json",
      result_path: path.join(first.exchange!.directory, "result.json"),
      resume_argv: [
        "agentplane",
        "task",
        "advance",
        taskId,
        "--result",
        path.join(first.exchange!.directory, "result.json"),
        "--agent-json",
      ],
    });
    expect(JSON.stringify(first)).not.toMatch(
      /(?:\bgit\s|\bgh\s|worktree|pr open|\bverify\b|\bfinish\b|\bintegrate\b|\bcleanup\b)/iu,
    );
    expect(after.stdout).toBe(before.stdout);
    expect(taskAfter).toBe(taskBefore);
  });

  it("does not publish a concurrently rejected exchange", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Concurrent exchange publication");
    const issued = await readAgentPacket(root, taskId);
    if (!issued.exchange) throw new Error("expected an external-agent exchange");

    await writeFile(
      path.join(root, "concurrent-change.txt"),
      "changes the route fingerprint\n",
      "utf8",
    );
    await execFileAsync("git", ["add", "concurrent-change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change concurrent route fingerprint"], {
      cwd: root,
    });
    await runCliSilent([
      "task",
      "comment",
      taskId,
      "--author",
      "TESTER",
      "--body",
      "Concurrent route observation.",
      "--root",
      root,
    ]);
    const fingerprint = await readRouteFingerprint(root, taskId);
    expect(fingerprint).not.toBe(issued.state_fingerprint);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("A previous external-agent episode still owns this task");
    } finally {
      io.restore();
    }

    const rejectedExchangePath = path.join(
      path.dirname(issued.exchange.directory),
      fingerprint.slice("sha256:".length),
      "exchange.json",
    );
    await expect(readFile(rejectedExchangePath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
    expect(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")).toContain(
      '"status": "issued"',
    );
  });

  it("accepts one bound planning result and makes an identical replay idempotent", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Planning result round trip");
    const issued = await readAgentPacket(root, taskId);
    const plan = "1. Update the scoped implementation. 2. Run the declared verification.";
    const resultPath = await writeCompletedResult(issued, plan);

    const accepted = await returnAgentResult(root, taskId, resultPath);
    expect(accepted.code, accepted.stderr).toBe(0);
    const next = JSON.parse(accepted.stdout) as AgentPacket;
    expect(next.action.kind).toBe("approval_required");
    expect(next.stop.reason).toBe("authority_boundary");
    expect(next.exchange).toBeUndefined();
    expect(next.operator_action).toMatchObject({
      kind: "approve_plan",
      required_role: "USER",
      argv: ["agentplane", "task", "plan", "approve", taskId, "--by", "USER"],
    });
    expect(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).toContain(plan);

    const replay = await returnAgentResult(root, taskId, resultPath);
    expect(replay.code, replay.stderr).toBe(0);
    expect(JSON.parse(replay.stdout)).toMatchObject({ action: { kind: "approval_required" } });
    expect(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).toContain(plan);
  });

  it("returns an external wait instead of advertising start-ready for incomplete dependencies", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const dependencyId = await createTask(root, "Unfinished prerequisite");
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dependency-bound route",
        "--description",
        "Wait for the declared prerequisite before starting.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--depends-on",
        dependencyId,
        "--verify",
        "bun run test:critical",
        "--root",
        root,
      ]);
      expect(code, io.stderr).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Implement only after the declared prerequisite is complete.",
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]);

    const packet = await readAgentPacket(root, taskId);

    expect(packet).toMatchObject({
      transition_id: agentTransitionId("wait.dependencies"),
      action: { kind: "external_wait" },
      stop: { reason: "external_boundary", resume: "request_fresh_packet" },
    });
    expect(packet.exchange).toBeUndefined();
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
  });

  it("rejects a tampered exchange checkout before applying semantic task state", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Tampered exchange boundary");
    const packet = await readAgentPacket(root, taskId);
    const resultPath = await writeCompletedResult(packet, "This plan must not be applied.");
    if (!packet.exchange) throw new Error("expected external-agent exchange");
    const exchangePath = path.join(packet.exchange.directory, "exchange.json");
    const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as ExternalAgentExchange;
    await writeFile(
      exchangePath,
      `${JSON.stringify({ ...exchange, checkout: path.dirname(root) }, null, 2)}\n`,
      "utf8",
    );

    const rejected = await returnAgentResult(root, taskId, resultPath);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain("does not match the supervisor intent");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).not.toContain("This plan must not be applied.");
  });

  it("finalizes an accepted result after its effect and supervisor completion were persisted", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createTask(root, "Accepted external result recovery");
    const packet = await readAgentPacket(root, taskId);
    const recoveredPlan = "Use the recovered semantic plan.";
    const resultPath = await writeCompletedResult(packet, recoveredPlan);
    const packetExchange = packet.exchange;
    if (!packetExchange) throw new Error("expected external-agent exchange");
    const envelope = JSON.parse(await readFile(resultPath, "utf8")) as unknown;
    const exchangePath = path.join(packetExchange.directory, "exchange.json");
    const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as ExternalAgentExchange;
    const workOrder = JSON.parse(
      await readFile(path.join(packetExchange.directory, packetExchange.work_order_ref), "utf8"),
    ) as AgentWorkOrderV2;
    const validatedEnvelope = validateExternalAgentResultEnvelope({
      raw: envelope,
      exchange,
      work_order: workOrder,
    });
    const resultDigest = externalAgentResultDigest(validatedEnvelope);
    await writeFile(
      exchangePath,
      `${JSON.stringify(
        {
          ...exchange,
          status: "accepted",
          result_digest: resultDigest,
          result: validatedEnvelope,
          updated_at: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      recoveredPlan,
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const decision = await buildTaskRouteDecision({
      ctx: command,
      cwd: root,
      rootOverride: root,
      taskId,
      includeRemote: false,
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const issued = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = issued.operations.at(-1);
    if (!operation) throw new Error("expected issued external-agent operation");
    const limited = createSupervisorExecutionEpisodeJournal({
      task_id: issued.task_id,
      task_revision: issued.task_revision,
      state_fingerprint_digest: issued.state_fingerprint_digest,
      budget: { ...issued.budget, max_episodes: 1, max_agent_runs: 1 },
    });
    const started = startSupervisorExecutionEpisode({
      journal: limited,
      role: operation.role,
      kind: operation.kind,
      operation_identity: { test: "budget-exhausted recovery" },
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      work_order_ref: operation.work_order_ref,
      effect_ref: operation.effect_ref,
    });
    if (started.status !== "started") throw new Error("expected limited supervisor intent");
    const completedJournal = (workOrderId: string, progress: unknown) =>
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: {
          work_order_id: workOrderId,
          semantic_status: "completed",
          result_digest: resultDigest,
        },
        progress,
      });
    await store.write(
      completedJournal("mismatched-work-order", decision.workflowStep.preconditionFingerprint),
    );
    const mismatched = await returnAgentResult(root, taskId, resultPath);
    expect(mismatched.code).not.toBe(0);
    expect(mismatched.stderr).toContain("does not match the accepted semantic result");
    expect(JSON.parse(await readFile(exchangePath, "utf8"))).toMatchObject({ status: "accepted" });
    await store.write(completedJournal(exchange.work_order_id, { stale: true }));
    const stale = await returnAgentResult(root, taskId, resultPath);
    expect(stale.code).not.toBe(0);
    expect(stale.stderr).toContain("no longer matches the current task state");
    await store.write(
      completedJournal(exchange.work_order_id, decision.workflowStep.preconditionFingerprint),
    );
    const readmeBeforeRecovery = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );

    const recovered = await returnAgentResult(root, taskId, resultPath);
    expect(recovered.code, recovered.stderr).toBe(0);
    expect((JSON.parse(recovered.stdout) as AgentPacket).action.kind).toBe("approval_required");
    const taskReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toContain(recoveredPlan);
    expect(taskReadme).toBe(readmeBeforeRecovery);
    expect(JSON.parse(await readFile(exchangePath, "utf8"))).toMatchObject({ status: "consumed" });
    const finalized = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(finalized.operations.at(-1)?.postcondition_fingerprint_digest).toBe(
      decision.workflowStep.preconditionFingerprint.digest,
    );
  });

  it("rejects a stale planning result before applying semantic task state", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Stale planning result");
    const issued = await readAgentPacket(root, taskId);
    const resultPath = await writeCompletedResult(issued, "This stale plan must not be applied.");
    await runCliSilent([
      "task",
      "comment",
      taskId,
      "--author",
      "USER",
      "--body",
      "Concurrent scope clarification.",
      "--root",
      root,
    ]);

    const stale = await returnAgentResult(root, taskId, resultPath);
    expect(stale.code).not.toBe(0);
    expect(stale.stderr).toContain("stale");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).not.toContain("This stale plan must not be applied.");
  });

  it("rejects a read-only evaluator result after a concurrent commit transition", async () => {
    const root = await mkGitRepoRoot();
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await writeFile(
      path.join(root, "package.json"),
      `${JSON.stringify({ scripts: { check: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
      "utf8",
    );
    const taskId = await createTask(root, "Commit-stale evaluator result", "bun run check");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Create the scoped implementation before quality review.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed evaluator freshness"], { cwd: root });
    const implementationPacket = await readAgentPacket(root, taskId);
    await writeFile(path.join(root, "implemented.txt"), "implemented\n", "utf8");
    const implementationResult = await writeCompletedResult(
      implementationPacket,
      "Created the scoped implementation.",
    );
    const afterImplementation = await returnAgentResult(root, taskId, implementationResult);
    expect(afterImplementation.code, afterImplementation.stderr).toBe(0);
    const evaluatorPacket = JSON.parse(afterImplementation.stdout) as AgentPacket;
    const resultPath = await writeCompletedResult(
      evaluatorPacket,
      "This stale review must not apply.",
      {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    );
    await writeFile(path.join(root, "concurrent.txt"), "concurrent\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: concurrent evaluator commit"], {
      cwd: root,
    });

    const stale = await returnAgentResult(root, taskId, resultPath);
    expect(stale.code).not.toBe(0);
    expect(stale.stderr).toContain("stale");
  }, 30_000);

  it("projects the direct runner boundary as the same semantic agent episode", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      {
        recursive: true,
      },
    );
    const taskId = await createTask(root, "Direct semantic packet");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Implement the scoped change and report evidence.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const packet = await readAgentPacket(root, taskId);
    expect(packet.action.kind).toBe("agent_episode");
    expect(packet.stop).toEqual({
      reason: "semantic_boundary",
      resume: "request_fresh_packet",
    });
    expect(packet.authority).toMatchObject({ role: "EXECUTOR", network: "deny" });
    expect(packet.state_fingerprint).toBe(await readRouteFingerprint(root, taskId));
    const taskReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toContain('status: "DOING"');
    expect(taskReadme).toContain("Start: continue direct-mode task in current checkout.");
  });

  it("converges a direct external-agent implementation and evaluator through CLI-owned closeout", async () => {
    const root = await mkGitRepoRoot();
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      {
        recursive: true,
      },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await writeFile(
      path.join(root, "package.json"),
      `${JSON.stringify({ scripts: { check: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
      "utf8",
    );
    const taskId = await createTask(root, "Direct external round trip", "bun run check");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Create one scoped implementation file and verify it.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed direct external task"], { cwd: root });

    const implementationPacket = await readAgentPacket(root, taskId);
    expect(implementationPacket.authority.role).toBe("EXECUTOR");
    expect(implementationPacket.exchange).toBeDefined();
    await writeFile(path.join(root, "external-result.txt"), "implemented\n", "utf8");
    const implementationResult = await writeCompletedResult(
      implementationPacket,
      "Created the scoped external implementation file.",
    );
    const afterImplementation = await returnAgentResult(root, taskId, implementationResult);
    expect(afterImplementation.code, afterImplementation.stderr).toBe(0);
    const evaluatorPacket = JSON.parse(afterImplementation.stdout) as AgentPacket;
    expect(evaluatorPacket.action.kind).toBe("agent_episode");
    expect(evaluatorPacket.authority.role).toBe("EVALUATOR");
    expect(evaluatorPacket.exchange).toBeDefined();

    const evaluatorResult = await writeCompletedResult(evaluatorPacket, "Quality review passed.", {
      verdict: "pass",
      missing_tests: [],
      hidden_assumptions: [],
      residual_risks: [],
    });
    const completed = await returnAgentResult(root, taskId, evaluatorResult);
    expect(completed.code, completed.stderr).toBe(0);
    const terminal = JSON.parse(completed.stdout) as AgentPacket;
    expect(terminal.action.kind).toBe("terminal");
    expect(terminal.stop).toEqual({ reason: "terminal", resume: "none" });
    const taskReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toContain('status: "DONE"');
  }, 30_000);

  it("recovers an accepted implementation after the CLI-owned commit was already created", async () => {
    const root = await mkGitRepoRoot();
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      {
        recursive: true,
      },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await writeFile(
      path.join(root, "package.json"),
      `${JSON.stringify({ scripts: { check: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
      "utf8",
    );
    const taskId = await createTask(root, "Implementation commit recovery", "bun run check");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Create one scoped recovery file and verify it.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed implementation recovery"], {
      cwd: root,
    });

    const packet = await readAgentPacket(root, taskId);
    await writeFile(path.join(root, "recovered-result.txt"), "implemented\n", "utf8");
    const resultPath = await writeCompletedResult(packet, "Created the recovery file.");
    await execFileAsync("git", ["add", "recovered-result.txt"], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "-m", `🚧 ${taskId.split("-").at(-1)} task: apply external agent result`],
      { cwd: root },
    );

    const recovered = await returnAgentResult(root, taskId, resultPath);
    expect(recovered.code, recovered.stderr).toBe(0);
    const evaluatorPacket = JSON.parse(recovered.stdout) as AgentPacket;
    expect(evaluatorPacket.authority.role).toBe("EVALUATOR");
    expect(evaluatorPacket.stop.reason).toBe("semantic_boundary");
  }, 30_000);

  it("converges branch implementation and evaluator to the protected publication boundary", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      {
        recursive: true,
      },
    );
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(
      path.join(root, "package.json"),
      `${JSON.stringify({ scripts: { check: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
      "utf8",
    );
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root, "Branch external round trip", "bun run check");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Create one scoped branch implementation file and verify it.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed branch external task"], {
      cwd: root,
    });

    const branch = `task/${taskId}/external-round-trip`;
    const taskWorktree = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${taskId}-external-round-trip`,
    );
    await mkdir(path.dirname(taskWorktree), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, taskWorktree], { cwd: root });
    const at = new Date().toISOString();
    const opened = buildOpenedPrMeta({
      taskId,
      branch,
      at,
      previousMeta: null,
      base: "main",
    });
    const head = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: taskWorktree });
    const observed = buildObservedGithubPrMeta({
      meta: opened,
      observed: {
        prNumber: 1,
        prUrl: "https://github.com/example/agentplane/pull/1",
        status: "OPEN",
        base: "main",
        headSha: head.stdout.trim(),
      },
      at,
    });
    const metaPath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await mkdir(path.dirname(metaPath), { recursive: true });
    await writeFile(metaPath, `${JSON.stringify(observed, null, 2)}\n`, "utf8");

    const route = await readRoute(taskWorktree, taskId);
    const request = route.workflow_step.request;
    if (request?.type === "side_effect") {
      await runCliSilent([
        "task",
        "authority",
        "grant",
        taskId,
        "--operation",
        request.operationId,
        "--operation-digest",
        request.operationDigest,
        "--state-fingerprint",
        request.stateFingerprintDigest,
        "--state-scope-digest",
        request.stateScopeDigest,
        "--by",
        "USER",
        "--root",
        taskWorktree,
      ]);
    }
    const implementationPacket = await readAgentPacket(taskWorktree, taskId);
    expect(implementationPacket.authority.role).toBe("EXECUTOR");
    await mkdir(path.join(taskWorktree, "src"), { recursive: true });
    await writeFile(path.join(taskWorktree, "src", "branch-external.txt"), "implemented\n", "utf8");
    const implementationResult = await writeCompletedResult(
      implementationPacket,
      "Created the scoped branch implementation file.",
    );
    const afterImplementation = await returnAgentResult(taskWorktree, taskId, implementationResult);
    expect(afterImplementation.code, afterImplementation.stderr).toBe(0);
    const evaluatorPacket = JSON.parse(afterImplementation.stdout) as AgentPacket;
    expect(evaluatorPacket.authority.role).toBe("EVALUATOR");

    const evaluatorResult = await writeCompletedResult(
      evaluatorPacket,
      "Branch quality review passed.",
      {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    );
    const protectedBoundary = await returnAgentResult(taskWorktree, taskId, evaluatorResult);
    expect(protectedBoundary.code, protectedBoundary.stderr).toBe(0);
    const packet = JSON.parse(protectedBoundary.stdout) as AgentPacket;
    expect(["approval_required", "external_wait"]).toContain(packet.action.kind);
    expect(packet.stop.reason).not.toBe("semantic_boundary");
  }, 30_000);

  it("matches the managed direct-run preview fingerprint and preserves task evidence", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Managed and external direct parity");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Compare the managed and external supervisor entry from one persisted task state.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const packet = await readAgentPacket(root, taskId);
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskBeforeManagedPreview = await readFile(readmePath, "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--json", "--root", root]);
      expect(code, io.stderr).toBe(0);
      const managed = JSON.parse(io.stdout) as {
        bundle_path: string;
        lifecycle_result: { lifecycle: { state_fingerprint: { digest: string } } };
      };
      const bundle = JSON.parse(await readFile(managed.bundle_path, "utf8")) as {
        route_decision: { workflowStep: { id: string } };
        work_order: { state_fingerprint: { digest: string } };
      };
      expect(bundle.work_order.state_fingerprint.digest).toBe(packet.state_fingerprint);
      expect(
        agentTransitionId(bundle.route_decision.workflowStep.id, packet.state_fingerprint),
      ).toBe(packet.transition_id);
      expect(await readFile(readmePath, "utf8")).toBe(taskBeforeManagedPreview);
    } finally {
      io.restore();
    }
  });

  it("fails closed when a branch control-plane path is not authoritative", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Branch semantic packet");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Implement the scoped branch change and report evidence.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const packet = await readAgentPacket(root, taskId);
    const route = await readRoute(root, taskId);
    expect(packet.action.kind).toBe("framework_transition");
    expect(packet.stop.reason).toBe("control_plane_boundary");
    expect(packet.authority.required).toBe(false);
    expect(packet.state_fingerprint).toBe(route.workflow_step.preconditionFingerprint.digest);
    expect(route.workflow_step.kind).toBe("cli_operation");
  });
});
