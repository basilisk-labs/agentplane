/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import {
  executionGrantFromExtensions,
  parseTaskReadme,
  readTask,
  renderTaskReadme,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithCommit,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";
import {
  START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  startDirectWork,
} from "@agentplane/testkit/cli-core-lifecycle";

installRunCliIntegrationHarness();

async function prepareHostApproval(root: string, taskId: string): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  try {
    expect(
      await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
      io.stderr,
    ).toBe(0);
    const packet = JSON.parse(io.stdout) as {
      transition_id: string;
      state_fingerprint: string;
      authority: { role: string };
      exchange: {
        directory: string;
        work_order_ref: string;
        result_path: string;
        resume_argv: string[];
      };
    };
    expect(packet.authority.role).toBe("PLANNER");
    const workOrder = JSON.parse(
      await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    ) as AgentWorkOrderV2;
    const baseline = workOrder.planning_context!.repository_snapshot;
    const criterion = {
      id: "approval-contract",
      description: "Preserve scaffolded verification and state-bound host approval.",
      required: true,
      check_ids: ["task-check"],
    };
    const validation = {
      schema_version: 1,
      criteria: [criterion],
      checks: [
        { id: "task-check", kind: "deterministic", required: true, capability: "task.verify" },
      ],
      evidence_fingerprint: baseline.digest,
    };
    await writeFile(
      packet.exchange.result_path,
      JSON.stringify({
        schema_version: 1,
        kind: "agent_action_result",
        task_id: taskId,
        transition_id: packet.transition_id,
        state_fingerprint: packet.state_fingerprint,
        role: "PLANNER",
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: "Exercise scaffolded verification through a structured approval contract.",
          findings: [],
          uncertainty: [],
          task_intent: {
            task_kind: "code",
            mutation_scope: "code",
            risk_flags: [],
            tags: ["code"],
            execution: {
              schema_version: 2,
              preferred_mode: "direct",
              scope_roots: ["."],
              repository_effects: ["repository_write", "source_code"],
              external_effects: [],
              requirements_uncertainty: "bounded",
              implementation_uncertainty: "bounded",
              reversibility: "reversible",
              rationale: [
                "The fixture exercises approval without implementation or external effects.",
              ],
            },
          },
          task_plan_proposal: {
            schema_version: 1,
            task_id: taskId,
            planning_baseline: baseline,
            work_items: {
              schema_version: 1,
              work_items: [
                {
                  id: "exercise-approval",
                  objective: criterion.description,
                  depends_on: [],
                  required_inputs: [],
                  expected_outputs: ["approval-result"],
                  scope_roots: ["."],
                  acceptance_criteria: [criterion],
                  validation,
                  context: {
                    required_sources: [],
                    optional_sources: [],
                    symbol_hints: [],
                    max_bytes: 65_536,
                  },
                  risk: "low",
                  capabilities: ["task.verify"],
                  resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
                  optional: false,
                  priority: 1,
                },
              ],
            },
            assumptions: [],
            unresolved_questions: [],
            top_level_validation: validation,
          },
        },
      }),
    );
    const resumeIo = captureStdIO();
    try {
      expect(
        await runCli([...packet.exchange.resume_argv.slice(1), "--root", root]),
        resumeIo.stderr,
      ).toBe(0);
      const approval = JSON.parse(resumeIo.stdout) as {
        action: { kind: string };
        operator_action: { host_user_decision: { request: Record<string, unknown> } };
      };
      expect(approval.action.kind).toBe("approval_required");
      return approval.operator_action.host_user_decision.request;
    } finally {
      resumeIo.restore();
    }
  } finally {
    io.restore();
  }
}

describe("runCli", { timeout: START_COMMIT_PATH_HANDLING_TIMEOUT_MS }, () => {
  it("atomically rejects a task-centric proposal, invalidates stale approval, and replans", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeDefaultConfig(root);
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Atomic rejection",
          "--description",
          "Reject the structured plan atomically",
          "--priority",
          "high",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }
    const staleRequest = await prepareHostApproval(root, taskId);
    const before = parseTaskReadme(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).frontmatter;
    const beforeAggregate = taskCentricAggregateFromExtensions(before.extensions)!;

    const rejectIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "plan",
          "reject",
          taskId,
          "--by",
          "USER",
          "--note",
          "Revise authority roots",
          "--root",
          root,
        ]),
        rejectIo.stderr,
      ).toBe(0);
    } finally {
      rejectIo.restore();
    }
    const rejected = parseTaskReadme(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).frontmatter;
    const aggregate = taskCentricAggregateFromExtensions(rejected.extensions)!;
    const runtime = rejected.extensions?.["agentplane.task_centric_runtime"] as {
      events: unknown[];
      mutation_receipts: Record<string, unknown>;
    };
    expect(rejected.revision).toBe(before.revision! + 1);
    expect(aggregate.revision).toBe(rejected.revision);
    expect(aggregate).toMatchObject({ lifecycle: "PLANNING" });
    expect(aggregate.current_plan?.approval.state).toBe("rejected");
    expect(aggregate.current_plan?.digest).toBe(beforeAggregate.current_plan?.digest);
    expect(runtime.events).toHaveLength(1);
    expect(Object.keys(runtime.mutation_receipts)).toHaveLength(1);

    const staleDecision = Buffer.from(
      JSON.stringify({
        schema_version: 1,
        ...staleRequest,
        host_id: "codex",
        conversation_id: "stale-rejection",
        message_id: "stale-approval",
        decided_at: "2026-09-03T10:00:00.000Z",
      }),
      "utf8",
    ).toString("base64url");
    const staleIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "plan",
          "approve",
          taskId,
          "--host-user-decision",
          staleDecision,
          "--root",
          root,
        ]),
      ).not.toBe(0);
      expect(staleIo.stderr).toContain("current route no longer requests plan approval");
    } finally {
      staleIo.restore();
    }

    const advanceIo = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).toBe(0);
      const packet = JSON.parse(advanceIo.stdout) as {
        action: { kind: string };
        authority: { role: string };
        state_fingerprint: string;
      };
      expect(packet.action.kind).toBe("agent_episode");
      expect(packet.authority.role).toBe("PLANNER");
      expect(packet.state_fingerprint).not.toBe(staleRequest.state_fingerprint);
    } finally {
      advanceIo.restore();
    }
  });

  it("recovers a 52/50 rejected projection fixture and emits a fresh planning packet", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeDefaultConfig(root);
    const createIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Historical rejection recovery",
          "--description",
          "Recover the split projection fixture",
          "--priority",
          "high",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }
    await prepareHostApproval(root, taskId);
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const proposed = parseTaskReadme(await readFile(readmePath, "utf8")).frontmatter;
    const proposedAggregate = taskCentricAggregateFromExtensions(proposed.extensions)!;
    await writeFile(
      readmePath,
      renderTaskReadme(
        {
          ...proposed,
          revision: 52,
          plan_approval: {
            state: "rejected",
            updated_at: "2026-09-02T13:52:00.000Z",
            updated_by: "USER",
            note: "Rejected authority-incomplete plan",
          },
          extensions: withTaskCentricAggregate(proposed.extensions, {
            ...proposedAggregate,
            revision: 50,
          }),
        },
        "",
      ),
      "utf8",
    );

    const staleIo = captureStdIO();
    let stalePacket: {
      state_fingerprint: string;
      action: { kind: string };
    };
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).toBe(0);
      stalePacket = JSON.parse(staleIo.stdout) as typeof stalePacket;
      expect(stalePacket.action.kind).toBe("approval_required");
    } finally {
      staleIo.restore();
    }

    const recoveryIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "plan",
          "recover-rejection",
          taskId,
          "--expected-readme-revision",
          "52",
          "--expected-aggregate-revision",
          "50",
          "--rejected-plan-digest",
          proposedAggregate.current_plan!.digest,
          "--expected-state-fingerprint",
          stalePacket!.state_fingerprint,
          "--by",
          "USER",
          "--note",
          "Repair historical split rejection",
          "--root",
          root,
        ]),
        recoveryIo.stderr,
      ).toBe(0);
      const output = JSON.parse(recoveryIo.stdout) as {
        receipt: { previous_revision: number; next_revision: number };
      };
      expect(output.receipt).toMatchObject({ previous_revision: 50, next_revision: 53 });
    } finally {
      recoveryIo.restore();
    }

    const recovered = parseTaskReadme(await readFile(readmePath, "utf8")).frontmatter;
    const aggregate = taskCentricAggregateFromExtensions(recovered.extensions)!;
    expect(recovered.revision).toBe(53);
    expect(aggregate.revision).toBe(53);
    expect(aggregate.current_plan?.approval.state).toBe("rejected");

    const advanceIo = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).toBe(0);
      const packet = JSON.parse(advanceIo.stdout) as {
        action: { kind: string };
        authority: { role: string };
        state_fingerprint: string;
      };
      expect(packet.action.kind).toBe("agent_episode");
      expect(packet.authority.role).toBe("PLANNER");
      expect(packet.state_fingerprint).not.toBe(stalePacket!.state_fingerprint);
    } finally {
      advanceIo.restore();
    }
  });

  it("task plan approve rejects verify-required tasks with missing Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Plan gate task",
        "--description",
        "Verify Steps gate should block approve",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const codeSet = await runCli([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1) Do the work\n2) Verify the work",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    expect(codeSet).toBe(0);

    const codeResetVerifySteps = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
      "--root",
      root,
    ]);
    expect(codeResetVerifySteps).toBe(0);

    const ioApprove = captureStdIO();
    try {
      const codeApprove = await runCli([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "USER",
        "--note",
        "OK",
        "--root",
        root,
      ]);
      expect(codeApprove).toBe(3);
      expect(ioApprove.stderr).toContain("cannot approve plan");
      expect(ioApprove.stderr).toContain("Verify Steps");
    } finally {
      ioApprove.restore();
    }

    const codeFill = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Run bun run test:cli:core; expect exit 0.",
      "--root",
      root,
    ]);
    expect(codeFill).toBe(0);

    const codeApprove2 = await runCli([
      "task",
      "plan",
      "approve",
      taskId,
      "--by",
      "USER",
      "--note",
      "OK",
      "--root",
      root,
    ]);
    expect(codeApprove2).toBe(0);
  });

  it("task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Approvable scaffold task",
        "--description",
        "Verify-required scaffolds should be approvable as created",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
      expect(ioNew.stderr).toContain("seeded a PLANNER fallback ## Verify Steps scaffold");
    } finally {
      ioNew.restore();
    }

    const codeSet = await runCli([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1) Implement the change\n2) Verify the change",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    expect(codeSet).toBe(0);

    const hostRequest = await prepareHostApproval(root, taskId);
    const hostDecision = Buffer.from(
      JSON.stringify({
        schema_version: 1,
        ...hostRequest,
        host_id: "codex",
        conversation_id: "conversation-1",
        message_id: "message-1",
        decided_at: "2026-08-21T10:00:00.000Z",
      }),
      "utf8",
    ).toString("base64url");
    const codeApprove = await runCli([
      "task",
      "plan",
      "approve",
      taskId,
      "--host-user-decision",
      hostDecision,
      "--note",
      "OK",
      "--root",
      root,
    ]);
    expect(codeApprove).toBe(0);

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain("Review the changed artifact or behavior for the `code` task.");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    expect(
      executionGrantFromExtensions(parseTaskReadme(readme).frontmatter.extensions),
    ).toMatchObject({
      task_id: taskId,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      status: "active",
    });

    expect(
      await runCli([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1) Implement the revised change\n2) Verify the revised change",
        "--updated-by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]),
    ).toBe(0);
    const replanned = parseTaskReadme(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    ).frontmatter;
    expect(replanned.plan_approval?.state).toBe("pending");
    expect(executionGrantFromExtensions(replanned.extensions)).toBeNull();
  });

  it("start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing", async () => {
    const root = await mkGitRepoRootWithCommit();

    const cfg = defaultConfig();
    cfg.agents.approvals.require_plan = false;
    await writeConfig(root, cfg);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start gate task",
        "--description",
        "Verify Steps gate should block start when require_plan=false",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const codeResetVerifySteps = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
      "--root",
      root,
    ]);
    expect(codeResetVerifySteps).toBe(0);

    const ioStart = captureStdIO();
    try {
      const codeStart = await runCli([
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: this comment is long enough to satisfy the min_chars requirement.",
        "--root",
        root,
      ]);
      expect(codeStart).toBe(3);
      expect(ioStart.stderr).toContain("cannot start work");
      expect(ioStart.stderr).toContain("Verify Steps");
    } finally {
      ioStart.restore();
    }

    const codeFill = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Exit criteria: start must succeed when plan approval is disabled.",
      "--root",
      root,
    ]);
    expect(codeFill).toBe(0);

    const codeStart2 = await runCli([
      "start",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: this comment is long enough to satisfy the min_chars requirement.",
      "--root",
      root,
    ]);
    expect(codeStart2).toBe(0);
  });
});
