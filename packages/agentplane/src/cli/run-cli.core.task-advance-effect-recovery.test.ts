import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  createSupervisorEpisodeStore,
  preparePersistedSupervisorReplacementAfterFailure,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import {
  externalAgentResultDigest,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "../commands/task/external-agent-exchange.js";
import {
  requiresImplementationRecoveryReplacement,
  requiresPlanningRecoveryReplacement,
} from "../commands/task/external-agent-supervisor-recovery.js";
import { blockingImplementationAuthorityViolations } from "../commands/task/external-agent-implementation-authority.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { readRouteFingerprint } from "./run-cli.core.task-advance.testkit.js";
import { recoveryPlanningProposal } from "./task-advance-effect-recovery.testkit.js";
import { applyExternalPlanningResult } from "../commands/task/external-agent-planning-authority.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

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
  ) as AgentWorkOrderV2;
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
          ...(workOrder.role === "PLANNER"
            ? { task_plan_proposal: recoveryPlanningProposal(workOrder, summary) }
            : {}),
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
  it("requires replacement when a non-planning result predates an explicit PLANNER reset", () => {
    const stateFingerprint = `sha256:${"a".repeat(64)}`;
    const planningFingerprint = `sha256:${"b".repeat(64)}`;
    expect(
      requiresPlanningRecoveryReplacement({
        decision: {
          workflowStep: {
            kind: "agent_episode",
            episode: { purpose: "planning" },
            preconditionFingerprint: { digest: planningFingerprint },
          },
        } as never,
        exchange: {
          purpose: "implementation",
          state_fingerprint: stateFingerprint,
        } as ExternalAgentExchange,
      }),
    ).toBe(true);
  });

  it("requires replacement when plan approval changes pending implementation authority", () => {
    const taskDigest = `sha256:${"a".repeat(64)}`;
    const backendDigest = `sha256:${"b".repeat(64)}`;
    const fingerprint = {
      task_id: "202608171106-XFN696",
      task_revision: 16,
      worktree: "/repo/.agentplane/worktrees/task",
      components: {
        task: { digest: taskDigest },
        backend_projection: { digest: backendDigest },
      },
    };
    const decision = {
      workflowStep: {
        preconditionFingerprint: {
          ...fingerprint,
          task_revision: 19,
          digest: `sha256:${"c".repeat(64)}`,
        },
      },
    } as never;
    const exchange = { purpose: "task_worktree_resolution" } as ExternalAgentExchange;
    const workOrder = { state_fingerprint: fingerprint } as AgentWorkOrderV2;

    expect(
      requiresImplementationRecoveryReplacement({ decision, exchange, work_order: workOrder }),
    ).toBe(true);
    expect(
      requiresImplementationRecoveryReplacement({
        decision,
        exchange: { purpose: "implementation_rework" } as ExternalAgentExchange,
        work_order: workOrder,
      }),
    ).toBe(true);
    expect(
      requiresImplementationRecoveryReplacement({
        decision: {
          workflowStep: {
            preconditionFingerprint: {
              ...fingerprint,
              digest: `sha256:${"d".repeat(64)}`,
            },
          },
        } as never,
        exchange,
        work_order: workOrder,
      }),
    ).toBe(false);
  });

  it("lets implementation rework proceed past stale verification failures only", () => {
    expect(
      blockingImplementationAuthorityViolations([
        "verification:verification-record:fail",
        "repository_effect:ci",
        "external_effect:network_read",
      ]),
    ).toEqual(["repository_effect:ci", "external_effect:network_read"]);
  });

  it("retires a drifted result-less exchange and issues one exact-key replacement", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
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

    const rejected = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).not.toBe(0);
      expect(rejected.stderr).toContain("AgentPlane retired it");
      expect(rejected.stderr).toContain("--replacement");
    } finally {
      rejected.restore();
    }

    const rejectedExchangePath = path.join(
      path.dirname(issued.exchange.directory),
      fingerprint.slice("sha256:".length),
      "exchange.json",
    );
    await expect(readFile(rejectedExchangePath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
    expect(
      JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "retired", postcondition_fingerprint: fingerprint });

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const retiredJournal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const retiredOperation = retiredJournal.operations.at(-1);
    expect(retiredJournal).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      operations: [expect.objectContaining({ status: "failed" })],
    });

    const replacementIo = captureStdIO();
    let replacement: AgentPacket;
    try {
      expect(
        await runCli(["task", "advance", taskId, "--replacement", "--agent-json", "--root", root]),
        replacementIo.stderr,
      ).toBe(0);
      replacement = JSON.parse(replacementIo.stdout) as AgentPacket;
    } finally {
      replacementIo.restore();
    }
    expect(replacement.transition_id).not.toBe(issued.transition_id);
    expect(replacement.exchange?.directory).not.toBe(issued.exchange.directory);
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      cursor: { phase: "intent_recorded" },
      operations: [
        { status: "failed" },
        {
          status: "intent",
          replacement_of_operation_key: retiredOperation?.operation_key,
        },
      ],
    });

    const lateResultPath = await writePlanningResult(issued, "Late output must stay retired.");
    const lateResult = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "advance",
          taskId,
          "--result",
          lateResultPath,
          "--agent-json",
          "--root",
          root,
        ]),
      ).not.toBe(0);
      expect(lateResult.stderr).toContain("exchange was retired after state drift");
    } finally {
      lateResult.restore();
    }
  });

  it("recovers an interrupted formal verification before issuing the next agent episode", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    let journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const issuedOperation = journal.operations.at(-1);
    expect(issuedOperation?.status).toBe("intent");
    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: issuedOperation!.operation_key,
      result: { test_setup: "planning_episode_completed" },
    });
    journal = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: issued.state_fingerprint,
      route_observation: { test_setup: "ready_for_formal_operation" },
    });
    const formal = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { direct_task_operation: "task_verify" },
      precondition_fingerprint_digest: issued.state_fingerprint,
      authority_ref: "direct-task-supervisor:task_verify",
      authority_digest: issued.state_fingerprint,
      effect_ref: "task_verify",
    });
    expect(formal.status).toBe("started");
    if (formal.status !== "started") throw new Error("formal verification setup failed");
    await store.write(formal.journal);

    await runCliSilent([
      "task",
      "comment",
      taskId,
      "--author",
      "TESTER",
      "--body",
      "State changed while verification was interrupted.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
        io.stderr,
      ).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({ action: { kind: "agent_episode" } });
    } finally {
      io.restore();
    }
    const recovered = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(recovered).toMatchObject({
      status: "running",
      cursor: { phase: "intent_recorded" },
      operations: [
        { status: "completed" },
        { status: "failed", effect_ref: "task_verify" },
        {
          status: "intent",
          replacement_of_operation_key: formal.operation_key,
        },
      ],
    });
  });

  it("reconciles a retired exchange whose journal intent survived interruption", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    if (!issued.exchange) throw new Error("expected an external-agent exchange");

    await runCliSilent([
      "task",
      "comment",
      taskId,
      "--author",
      "TESTER",
      "--body",
      "Drift after the exchange was issued.",
      "--root",
      root,
    ]);
    const fingerprint = await readRouteFingerprint(root, taskId);
    expect(fingerprint).not.toBe(issued.state_fingerprint);

    const exchangePath = path.join(issued.exchange.directory, "exchange.json");
    const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as ExternalAgentExchange;
    await writeFile(
      exchangePath,
      `${JSON.stringify(
        {
          ...exchange,
          status: "retired",
          postcondition_fingerprint: fingerprint,
          updated_at: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const interrupted = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).not.toBe(0);
      expect(interrupted.stderr).toContain(
        "reconciled a retired external-agent exchange with its unresolved journal intent",
      );
      expect(interrupted.stderr).toContain("--replacement");
    } finally {
      interrupted.restore();
    }

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const retiredJournal = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(retiredJournal).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      operations: [expect.objectContaining({ status: "failed" })],
    });

    const replacement = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--replacement", "--agent-json", "--root", root]),
        replacement.stderr,
      ).toBe(0);
      expect(JSON.parse(replacement.stdout)).toMatchObject({
        action: { kind: "agent_episode" },
      });
    } finally {
      replacement.restore();
    }
  });

  it("rejects replacement when no terminal operation failure exists", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const io = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--replacement", "--agent-json", "--root", root]),
      ).toBe(2);
      expect(io.stderr).toContain("requires a terminal failed operation");
    } finally {
      io.restore();
    }
  });

  it("requires an explicit exact-key replacement after a known operation failure", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const failedOperation = journal.operations.at(-1);
    if (!failedOperation) throw new Error("expected issued operation");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal,
        operation_key: failedOperation.operation_key,
        result: { classification: "known_pre_result_failure" },
        failed: true,
      }),
    );

    const rejected = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).toBe(8);
      expect(rejected.stderr).toContain("rerun task advance with --replacement");
    } finally {
      rejected.restore();
    }

    const replaced = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--replacement", "--agent-json", "--root", root]),
        replaced.stderr,
      ).toBe(0);
      const replacementPacket = JSON.parse(replaced.stdout) as AgentPacket;
      expect(replacementPacket).toMatchObject({
        task_id: issued.task_id,
        action: { kind: "agent_episode" },
      });
      expect(replacementPacket.transition_id).not.toBe(issued.transition_id);
      expect(replacementPacket.exchange?.directory).not.toBe(issued.exchange?.directory);
    } finally {
      replaced.restore();
    }

    const replacement = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(replacement).toMatchObject({
      status: "running",
      cursor: { phase: "intent_recorded" },
      operations: [
        { operation_key: failedOperation.operation_key, status: "failed" },
        {
          status: "intent",
          replacement_of_operation_key: failedOperation.operation_key,
        },
      ],
    });
  });

  it("refreshes a pending exact-key replacement after route state changes", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const failedOperation = journal.operations.at(-1);
    if (!failedOperation) throw new Error("expected issued operation");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal,
        operation_key: failedOperation.operation_key,
        result: { classification: "known_pre_result_failure" },
        failed: true,
      }),
    );
    expect(
      await preparePersistedSupervisorReplacementAfterFailure({
        git_root: root,
        task_id: taskId,
        state_fingerprint_digest: issued.state_fingerprint,
      }),
    ).toBe("prepared");

    const doc = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Summary",
          "--text",
          "Changed after replacement reservation.",
          "--updated-by",
          "CODER",
          "--root",
          root,
        ]),
        doc.stderr,
      ).toBe(0);
    } finally {
      doc.restore();
    }

    const replacement = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--replacement", "--agent-json", "--root", root]),
        replacement.stderr,
      ).toBe(0);
    } finally {
      replacement.restore();
    }
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      cursor: { phase: "intent_recorded" },
      operations: [
        { operation_key: failedOperation.operation_key, status: "failed" },
        { status: "intent", replacement_of_operation_key: failedOperation.operation_key },
      ],
    });
  });

  it("rejects replacement while accepting an external result", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const resultPath = await writePlanningResult(issued, "1. Keep the result single-use.");
    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "advance",
          taskId,
          "--result",
          resultPath,
          "--replacement",
          "--agent-json",
          "--root",
          root,
        ]),
      ).toBe(2);
      expect(io.stderr).toContain("cannot be combined with --result");
    } finally {
      io.restore();
    }
  });

  it("automatically applies a durably received result on the next plain advance", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const packet = await readAgentPacket(root, taskId);
    const plan = "1. Resume the original result. 2. Do not ask the agent to repeat it.";
    const resultPath = await writePlanningResult(packet, plan);
    if (!packet.exchange) throw new Error("expected an external-agent exchange");
    const exchangePath = path.join(packet.exchange.directory, "exchange.json");
    const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as ExternalAgentExchange;
    const workOrder = JSON.parse(
      await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    ) as AgentWorkOrderV2;
    const envelope = validateExternalAgentResultEnvelope({
      raw: JSON.parse(await readFile(resultPath, "utf8")) as unknown,
      exchange,
      work_order: workOrder,
    });
    await writeFile(
      exchangePath,
      `${JSON.stringify(
        {
          ...exchange,
          status: "result_received",
          result_digest: externalAgentResultDigest(envelope),
          result: envelope,
          updated_at: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
      expect(code, io.stderr).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({ action: { kind: "approval_required" } });
    } finally {
      io.restore();
    }
    expect(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).toContain(plan);
    expect(JSON.parse(await readFile(exchangePath, "utf8"))).toMatchObject({ status: "consumed" });
  });

  it("rejects a conflicting replay after the original result was consumed", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const packet = await readAgentPacket(root, taskId);
    const resultPath = await writePlanningResult(packet, "1. Keep the original result.");
    const first = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "advance",
          taskId,
          "--result",
          resultPath,
          "--agent-json",
          "--root",
          root,
        ]),
        first.stderr,
      ).toBe(0);
    } finally {
      first.restore();
    }
    const conflicting = JSON.parse(await readFile(resultPath, "utf8")) as {
      result: { summary: string };
    };
    conflicting.result.summary = "A different replay result.";
    await writeFile(resultPath, `${JSON.stringify(conflicting, null, 2)}\n`, "utf8");
    const replay = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "advance",
          taskId,
          "--result",
          resultPath,
          "--agent-json",
          "--root",
          root,
        ]),
      ).not.toBe(0);
      expect(replay.stderr).toContain("different result is already recorded");
    } finally {
      replay.restore();
    }
  });

  it("reconciles an exact approved planning result without replaying the agent", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const plan = "1. Preserve the original intent. 2. Apply its observed result exactly once.";
    const resultPath = await writePlanningResult(issued, plan);
    if (!issued.exchange) throw new Error("expected an external-agent exchange");
    const exchange = JSON.parse(
      await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    const workOrder = JSON.parse(
      await readFile(path.join(issued.exchange.directory, issued.exchange.work_order_ref), "utf8"),
    ) as AgentWorkOrderV2;
    const envelope = validateExternalAgentResultEnvelope({
      raw: JSON.parse(await readFile(resultPath, "utf8")) as unknown,
      exchange,
      work_order: workOrder,
    });
    // Simulate interruption after the real planning effect, before journal completion.
    await applyExternalPlanningResult({
      command: await loadCommandContext({ cwd: root, rootOverride: root }),
      exchange,
      envelope,
      work_order: workOrder,
    });
    expect(
      await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
    ).toBe(0);
    const appliedContext = await loadCommandContext({ cwd: root, rootOverride: root });
    const appliedTask = await appliedContext.taskBackend.getTask(taskId);
    expect(appliedTask?.sections?.Plan?.trim()).toBe(plan);
    expect(
      taskCentricAggregateFromExtensions(appliedTask?.extensions)?.current_plan?.proposal,
    ).toEqual(envelope.result.task_plan_proposal);
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

    let executionRoot = root;
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
      const resumed = JSON.parse(io.stdout) as AgentPacket;
      expect(resumed).toMatchObject({
        action: { kind: "agent_episode" },
        authority: { role: "EXECUTOR" },
        stop: { reason: "semantic_boundary" },
      });
      if (!resumed.exchange) throw new Error("expected the next execution exchange");
      const nextWorkOrder = JSON.parse(
        await readFile(
          path.join(resumed.exchange.directory, resumed.exchange.work_order_ref),
          "utf8",
        ),
      ) as AgentWorkOrderV2;
      expect(nextWorkOrder).toMatchObject({
        role: "EXECUTOR",
        task: { id: taskId, work_item_id: "exercise-recovery" },
      });
      if (!nextWorkOrder.state_fingerprint.worktree) throw new Error("expected execution checkout");
      executionRoot = nextWorkOrder.state_fingerprint.worktree;
    } finally {
      io.restore();
    }
    expect(
      await readFile(path.join(executionRoot, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).toContain(plan);
    const recovered = validateSupervisorExecutionEpisodeJournal(await store.read());
    const nextOperation = recovered.operations.at(-1);
    expect(recovered).toMatchObject({
      status: "running",
      stop: null,
      cursor: { phase: "intent_recorded", operation_key: nextOperation?.operation_key },
      usage: {
        ...journal.usage,
        agent_runs: journal.usage.agent_runs + 1,
        episodes: journal.usage.episodes + recovered.operations.length - journal.operations.length,
      },
    });
    expect(
      recovered.operations.filter((operation) => operation.kind === "agent_episode"),
    ).toMatchObject([
      {
        role: "PLANNER",
        status: "completed",
        operation_key: journal.operations[0]?.operation_key,
        work_order_ref: journal.operations[0]?.work_order_ref,
        result_digest: digestSupervisorEpisodeValue({
          work_order_id: exchange.work_order_id,
          semantic_status: envelope.result.status,
          result_digest: externalAgentResultDigest(envelope),
        }),
      },
      { role: "EXECUTOR", status: "intent", result_digest: null },
    ]);
    expect(
      JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "consumed", result_digest: externalAgentResultDigest(envelope) });
  });

  it("rejects a late planning result when a different plan awaits approval", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    const issued = await readAgentPacket(root, taskId);
    const returnedPlan = "1. Apply the original plan exactly.";
    const currentPlan = "1. Preserve the independently revised plan.";
    const resultPath = await writePlanningResult(issued, returnedPlan);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      currentPlan,
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
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
      expect(code).toBe(3);
      expect(io.stderr).toContain("External-agent result is stale");
    } finally {
      io.restore();
    }
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain(currentPlan);
    expect(readme).not.toContain(returnedPlan);
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      cursor: { phase: "intent_recorded" },
      operations: [{ role: "PLANNER", status: "intent" }],
    });
  });
});
