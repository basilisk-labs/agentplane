import { execFile } from "node:child_process";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import * as verification from "../commands/task/direct-task-verification.js";
import * as scopeExtension from "../commands/shared/task-scope-extension-request.js";
import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import {
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
  type RepositorySnapshot,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { MAX_AGENT_ACTION_PACKET_BYTES } from "../commands/task/agent-action-packet.js";
import { blockedResultBody } from "../commands/task/external-agent-blocked-result.js";
import { cmdTaskScopeExtend } from "../commands/task/scope-extend.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "../commands/task/external-agent-exchange.js";
import { resolveSupervisorExecutionEpisodePath } from "../commands/shared/supervisor-execution-episode.js";
import { parseTaskScopeExtensionRequestState } from "../commands/shared/task-scope-extension-request.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
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
  operator_action?: { argv: string[] };
};

type AgentWorkOrder = {
  work_order_id: string;
  role: string;
  planning_context?: { repository_snapshot: RepositorySnapshot };
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

async function writeBlockedResult(
  packet: AgentPacket,
  summary: string,
  scopeExtension?: { scopeRoots: string[]; repositoryEffects: string[] },
): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrder;
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
            ...(scopeExtension
              ? {
                  scope_extension_request: {
                    schema_version: 1,
                    scope_roots: scopeExtension.scopeRoots,
                    repository_effects: scopeExtension.repositoryEffects,
                    rationale: "The required generated artifact is outside the issued scope.",
                  },
                }
              : {}),
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

async function writeStructuredPlanningResult(packet: AgentPacket, plan: string): Promise<string> {
  if (!packet.exchange) throw new Error("expected a planner exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrder;
  if (workOrder.role !== "PLANNER") throw new Error("expected a planner work order");
  const baseline = workOrder.planning_context?.repository_snapshot;
  if (!baseline) throw new Error("expected a planning repository snapshot");
  if (baseline.git.kind !== "commit") throw new Error("expected a commit planning baseline");
  const criterion = {
    id: "criterion-blocked-result-fixture",
    description: "The blocked-result lifecycle fixture reaches its declared verification.",
    required: true,
    check_ids: ["check-blocked-result-fixture"],
  };
  const validation = {
    schema_version: 1 as const,
    criteria: [criterion],
    checks: [
      {
        id: "check-blocked-result-fixture",
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        command: "bun run test:critical",
      },
    ],
    evidence_fingerprint: taskCentricDigest({ task_id: packet.task_id, plan }),
  };
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: packet.task_id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "exercise-blocked-result",
          objective: plan,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["blocked-result-lifecycle-evidence"],
          scope_roots: ["src/blocked-result-fixture.ts"],
          acceptance_criteria: [criterion],
          validation,
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [
            { kind: "path", resource: "src/blocked-result-fixture.ts", mode: "write" },
          ],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
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
          summary: plan,
          findings: [],
          uncertainty: [],
          task_intent: {
            task_kind: "code",
            mutation_scope: "code",
            risk_flags: [],
            tags: ["code"],
            execution: {
              schema_version: 2,
              preferred_mode: "branch_pr",
              scope_roots: ["src/blocked-result-fixture.ts"],
              repository_effects: ["repository_write", "source_code", "tests"],
              external_effects: [],
              requirements_uncertainty: "bounded",
              implementation_uncertainty: "bounded",
              reversibility: "reversible",
              rationale: ["The fixture exercises a blocked branch implementation."],
            },
          },
          task_plan_proposal: proposal,
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

async function writeCompletedResult(packet: AgentPacket, summary: string): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrder;
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
  authorityAll?: boolean;
}): Promise<{ root: string; taskId: string; taskWorktree: string }> {
  const root = await mkGitRepoRootWithBranch("main");
  await cp(
    path.join(process.cwd(), ".agentplane", "policy"),
    path.join(root, ".agentplane", "policy"),
    { recursive: true },
  );
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  if (opts.authorityAll) config.authority.mode = "all";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  const taskId = await createTask(root, opts.title);
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", `test: create ${opts.slug} task`], { cwd: root });
  const planning = await readAgentPacket(root, taskId);
  expect(planning.action.kind).toBe("agent_episode");
  const planningResult = await writeStructuredPlanningResult(planning, opts.plan);
  const prepared = await returnAgentResult(root, taskId, planningResult);
  expect(prepared.code, prepared.stderr).toBe(0);
  expect(JSON.parse(prepared.stdout)).toMatchObject({
    action: { kind: "approval_required" },
  });
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]);
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", `test: seed ${opts.slug} task`], { cwd: root });

  const branch = `task/${taskId}/${opts.slug}`;
  const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-${opts.slug}`);
  await mkdir(path.dirname(taskWorktree), { recursive: true });
  await execFileAsync("git", ["worktree", "add", "-b", branch, taskWorktree], { cwd: root });
  return { root, taskId, taskWorktree };
}

describe("runCli task advance blocked results", { timeout: 180_000 }, () => {
  it("persists and replays a scope blocker from pre-merge DONE rework", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Pre-merge blocker recovery",
      plan: "Preserve an accepted blocker when a closed task needs implementation rework.",
      slug: "pre-merge-blocker-recovery",
    });
    const ctx = await loadCommandContext({ cwd: taskWorktree, rootOverride: taskWorktree });
    const task = await ctx.taskBackend.getTask(taskId);
    if (!task) throw new Error("expected task fixture");
    const aggregate = taskCentricAggregateFromExtensions(task.extensions);
    if (!aggregate) throw new Error("expected canonical task fixture");
    const extensions = withTaskCentricAggregate(task.extensions, {
      ...aggregate,
      revision: (task.revision ?? aggregate.revision) + 1,
      lifecycle: "COMPLETED",
      work_items: Object.fromEntries(
        Object.entries(aggregate.work_items).map(([id, item]) => [
          id,
          { ...item, state: "COMPLETED" as const },
        ]),
      ),
    });
    await ctx.taskBackend.writeTask({
      ...task,
      status: "DONE",
      extensions,
      quality_review: {
        state: "rework",
        updated_at: new Date().toISOString(),
        updated_by: "EVALUATOR",
        provenance: "evaluator_supplied",
        note: "The packaged fixture requires scoped rework.",
        evaluated_sha: null,
        blueprint_digest: null,
        evidence_refs: [],
        findings: ["Packaged fixture requires additional scope."],
      },
      verification: {
        state: "needs_rework",
        updated_at: new Date().toISOString(),
        updated_by: "TESTER",
        note: "Hosted qualification requires implementation rework before integration.",
      },
    });
    await execFileAsync("git", ["add", ".agentplane"], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: seed pre-merge rework"], {
      cwd: taskWorktree,
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    expect(issued.exchange).toBeDefined();
    const exchange = JSON.parse(
      await readFile(path.join(issued.exchange!.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(exchange.purpose).toBe("implementation_rework");
    const resultPath = await writeBlockedResult(issued, "Packaged fixture needs exact scope.", {
      scopeRoots: ["docs/fixture.md"],
      repositoryEffects: ["documentation"],
    });
    const envelopeText = await readFile(resultPath, "utf8");
    const staleEnvelope = JSON.parse(envelopeText) as ExternalAgentResultEnvelope;
    staleEnvelope.state_fingerprint = `sha256:${"0".repeat(64)}`;
    await writeFile(resultPath, JSON.stringify(staleEnvelope));
    const rejected = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain("No issued external-agent exchange matches this result");
    const rejectedTask = await ctx.taskBackend.getTask(taskId);
    expect(rejectedTask?.status).toBe("DONE");
    await writeFile(resultPath, envelopeText);
    const returned = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(returned.code, returned.stderr).toBe(0);
    expect(JSON.parse(returned.stdout)).toMatchObject({ action: { kind: "approval_required" } });
    const readmePath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain('status: "BLOCKED"');
    const blockedTask = await ctx.taskBackend.getTask(taskId);
    expect(taskCentricAggregateFromExtensions(blockedTask?.extensions)?.lifecycle).toBe("BLOCKED");
    const head = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: taskWorktree });
    const replay = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(replay.code, replay.stderr).toBe(0);
    expect(await readFile(readmePath, "utf8")).toBe(readme);
    const replayHead = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: taskWorktree });
    expect(replayHead.stdout).toBe(head.stdout);
  });

  it("accepts a scope-extension blocker that preserves the dirty issuance baseline", async () => {
    const { taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Dirty baseline scope extension",
      plan: "Preserve pre-existing work while requesting the exact missing scope.",
      slug: "dirty-baseline-scope-extension",
    });
    const dirtyBaselinePath = path.join(taskWorktree, "src", "blocked-result-fixture.ts");
    await mkdir(path.dirname(dirtyBaselinePath), { recursive: true });
    await writeFile(dirtyBaselinePath, "export const concurrency = 1;\n", "utf8");
    let issued = await readAgentPacket(taskWorktree, taskId);
    if (!issued.exchange) throw new Error("expected a task-worktree exchange");
    const exchange = JSON.parse(
      await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8"),
    ) as { purpose: string };
    if (exchange.purpose === "task_worktree_resolution") {
      const resolutionResult = await writeCompletedResult(
        issued,
        "The pre-existing dirty baseline is intentional and ready for the scoped episode.",
      );
      const resolved = await returnAgentResult(taskWorktree, taskId, resolutionResult);
      expect(resolved.code, resolved.stderr).toBe(0);
      issued = JSON.parse(resolved.stdout) as AgentPacket;
    }
    const resultPath = await writeBlockedResult(
      issued,
      "The preserved scheduler change needs one exact writable root.",
      { scopeRoots: ["scripts/generated-scheduler.mjs"], repositoryEffects: ["source_code"] },
    );

    const returned = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(returned.code, returned.stderr).toBe(0);
    expect(JSON.parse(returned.stdout)).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "EXECUTOR" },
    });
    await expect(readFile(dirtyBaselinePath, "utf8")).resolves.toBe(
      "export const concurrency = 1;\n",
    );
  });

  it.each([false, true])(
    "projects explicit USER approval and replays accepted scope implementation (legacy split=%s)",
    async (legacySplit) => {
      const { taskId, taskWorktree } = await prepareBlockedResultTask({
        title: "Structured blocked scope extension",
        plan: "Request and approve one exact repository scope extension before resuming implementation.",
        slug: "blocked-scope-extension",
        authorityAll: true,
      });
      const issued = await readAgentPacket(taskWorktree, taskId);
      const resultPath = await writeBlockedResult(
        issued,
        "The release image generator needs one additional writable root.",
        { scopeRoots: ["website/static/img/social"], repositoryEffects: ["documentation"] },
      );

      const returned = await returnAgentResult(taskWorktree, taskId, resultPath);
      expect(returned.code, returned.stderr).toBe(0);
      const approval = JSON.parse(returned.stdout) as AgentPacket;
      expect(approval.action.kind, returned.stdout).toBe("approval_required");
      expect(approval.operator_action?.argv).toEqual(
        expect.arrayContaining([
          "task",
          "authority",
          "grant",
          taskId,
          "--operation",
          "task.scope.extend",
        ]),
      );

      const authorityArgv = [...(approval.operator_action?.argv.slice(1) ?? [])];
      const receiptIndex = authorityArgv.indexOf("--approval-receipt");
      if (receiptIndex !== -1) authorityArgv.splice(receiptIndex, 2);
      await runCliSilent([...authorityArgv, "--by", "USER", "--root", taskWorktree]);

      const applyScope = scopeExtension.applyApprovedTaskScopeExtension;
      const splitWrite = legacySplit
        ? vi
            .spyOn(scopeExtension, "applyApprovedTaskScopeExtension")
            .mockImplementationOnce((options) => {
              const next = applyScope(options);
              const aggregate = taskCentricAggregateFromExtensions(next.extensions)!;
              return {
                ...next,
                extensions: withTaskCentricAggregate(next.extensions, {
                  ...aggregate,
                  revision: aggregate.revision - 1,
                  lifecycle: "BLOCKED",
                }),
              };
            })
        : null;
      let resumed: AgentPacket;
      try {
        resumed = await readAgentPacket(taskWorktree, taskId);
      } finally {
        splitWrite?.mockRestore();
      }
      expect(resumed.action.kind, JSON.stringify(resumed, null, 2)).toBe("agent_episode");
      expect(resumed.exchange?.result_path).not.toBe(resultPath);
      if (!resumed.exchange) throw new Error("expected a fresh executor exchange");
      const workOrder = JSON.parse(
        await readFile(
          path.join(resumed.exchange.directory, resumed.exchange.work_order_ref),
          "utf8",
        ),
      ) as { role: string; authority: { writable_roots: string[] } };
      expect(workOrder.role).toBe("EXECUTOR");
      expect(
        workOrder.authority.writable_roots.some((root) =>
          root.endsWith("/website/static/img/social"),
        ),
        JSON.stringify({ resumed, workOrder }, null, 2),
      ).toBe(true);

      const readme = await readFile(
        path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
        "utf8",
      );
      expect(readme).toContain('status: "DOING"');
      expect(readme).toContain('status: "applied"');
      const ctx = await loadCommandContext({ cwd: taskWorktree, rootOverride: taskWorktree });
      const extended = await ctx.taskBackend.getTask(taskId);
      const canonical = taskCentricAggregateFromExtensions(extended?.extensions);
      expect(canonical?.revision).toBe(extended!.revision! - (legacySplit ? 1 : 0));
      expect(canonical?.lifecycle).toBe(legacySplit ? "BLOCKED" : "ACTIVE");
      const imageDirectory = path.join(taskWorktree, "website/static/img/social");
      await mkdir(imageDirectory, { recursive: true });
      await writeFile(
        path.join(imageDirectory, "fixture.svg"),
        '<svg xmlns="http://www.w3.org/2000/svg"/>\n',
      );
      const completedPath = await writeCompletedResult(
        resumed,
        "Implemented the approved scope extension.",
      );
      const exactResult = await readFile(completedPath, "utf8");
      const interruption = vi
        .spyOn(verification, "recordDirectTaskVerification")
        .mockRejectedValueOnce(new Error("injected post-scope verification interruption"));
      try {
        const interrupted = await returnAgentResult(taskWorktree, taskId, completedPath);
        expect(interrupted.code, interrupted.stderr).not.toBe(0);
        expect(interrupted.stderr).toContain("injected post-scope verification interruption");
        expect(interruption).toHaveBeenCalledOnce();
      } finally {
        interruption.mockRestore();
      }
      const accepted = JSON.parse(
        await readFile(path.join(resumed.exchange.directory, "exchange.json"), "utf8"),
      ) as ExternalAgentExchange;
      expect(accepted.status).toBe("result_received");
      const replay = await returnAgentResult(taskWorktree, taskId, completedPath);
      expect(replay.code, replay.stderr).toBe(0);
      expect(await readFile(completedPath, "utf8")).toBe(exactResult);
      const recovered = await ctx.taskBackend.getTask(taskId);
      expect(taskCentricAggregateFromExtensions(recovered?.extensions)?.revision).toBe(
        recovered?.revision,
      );
    },
  );

  it("applies the exact scope extension through the authoritative task checkout from base", async () => {
    const { root, taskId, taskWorktree } = await prepareBlockedResultTask({
      title: "Base-invoked blocked scope extension",
      plan: "Apply one exact scope extension from the base checkout without reading stale task state.",
      slug: "base-blocked-scope-extension",
    });
    const issued = await readAgentPacket(taskWorktree, taskId);
    const resultPath = await writeBlockedResult(
      issued,
      "The release image generator needs one additional writable root.",
      { scopeRoots: ["website/static/img/social"], repositoryEffects: ["documentation"] },
    );
    const returned = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(returned.code, returned.stderr).toBe(0);
    const approval = JSON.parse(returned.stdout) as AgentPacket;
    expect(approval.action.kind).toBe("approval_required");
    const authorityArgv = [...(approval.operator_action?.argv.slice(1) ?? [])];
    const receiptIndex = authorityArgv.indexOf("--approval-receipt");
    if (receiptIndex !== -1) authorityArgv.splice(receiptIndex, 2);
    await runCliSilent([...authorityArgv, "--by", "USER", "--root", taskWorktree]);

    const taskCommand = await loadCommandContext({
      cwd: taskWorktree,
      rootOverride: taskWorktree,
    });
    const blockedTask = await taskCommand.taskBackend.getTask(taskId);
    if (!blockedTask) throw new Error("expected blocked task in its authoritative checkout");
    const pending = parseTaskScopeExtensionRequestState(blockedTask);
    if (!pending) throw new Error("expected pending scope extension request");
    const baseCommand = await loadCommandContext({ cwd: root, rootOverride: root });
    const authorizedDecision = await buildTaskRouteDecision({
      ctx: baseCommand,
      cwd: root,
      includeRemote: false,
      rootOverride: root,
      taskId,
    });

    await expect(
      cmdTaskScopeExtend({
        ctx: baseCommand,
        cwd: root,
        taskId,
        scopeRoots: ["website/static/img/social"],
        repositoryEffects: ["documentation"],
        requestDigest: pending.request_digest,
        stateFingerprint: authorizedDecision.workflowStep.preconditionFingerprint.digest,
        by: "USER",
        quiet: true,
      }),
    ).resolves.toBe(0);

    const worktreeReadme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const baseReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(worktreeReadme).toContain('status: "DOING"');
    expect(worktreeReadme).toContain('status: "applied"');
    expect(baseReadme).not.toContain('status: "applied"');
  });

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
    expect(replay.code, replay.stderr).toBe(0);
    expect(JSON.parse(replay.stdout)).toMatchObject({ action: { kind: "terminal" } });
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
    expect(rejected.stderr).toContain(
      "External-agent changes escaped semantic authority: src/blocked-tamper.txt.",
    );
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
