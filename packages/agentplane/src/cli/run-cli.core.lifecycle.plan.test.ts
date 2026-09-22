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
  createTask as createLegacyTask,
  executionGrantFromExtensions,
  parseTaskReadme,
  readTask,
  renderTaskReadme,
  setTaskDocSection,
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
import { materializeLegacyDrainIdentityFixture } from "../commands/shared/native-task-identity-fixture.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";

installRunCliIntegrationHarness();

async function createLegacyPlanTask(
  root: string,
  title: string,
  description: string,
): Promise<string> {
  const task = await createLegacyTask({
    cwd: root,
    rootOverride: root,
    title,
    description,
    priority: "med",
    owner: "CODER",
    tags: ["code"],
    dependsOn: [],
    verify: ["bun run test:cli:core"],
  });
  for (const [section, text] of [
    ["Summary", `${title}\n\n${description}`],
    ["Scope", "- In scope: legacy plan compatibility behavior."],
    ["Rollback Plan", "- Restore the previous approved plan."],
  ] as const) {
    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: task.id,
      section,
      text,
      updatedBy: "PLANNER",
    });
  }
  return task.id;
}

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
    if (!workOrder.canonical_binding) throw new Error("Missing canonical planner binding.");
    await writeFile(
      packet.exchange.result_path,
      JSON.stringify({
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        status: "completed",
        summary: "Exercise scaffolded verification through a canonical approval contract.",
        findings: [],
        uncertainty: [],
        canonical_binding: workOrder.canonical_binding,
        canonical_plan: {
          work_items: [
            {
              id: "exercise-approval",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["approval-result"],
              optional: false,
              execution_requirements: {
                scope_roots: ["."],
                repository_effects: ["repository_write", "source_code"],
                external_effects: [],
                capabilities: ["repository_write", "task.verify"],
                resources: [],
              },
              contract: {
                role: "EXECUTOR",
                objective: "Preserve scaffolded verification and state-bound host approval.",
                acceptance_criteria: ["The host approval remains bound to the current plan."],
                verification_commands: ["bun --version"],
              },
            },
          ],
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
        authority: { reference: string };
        operator_action: { kind: string };
      };
      expect(approval.action.kind).toBe("approval_required");
      expect(approval.operator_action.kind).toBe("approve_plan");
      return {
        authority_reference: approval.authority.reference,
        state_fingerprint: packet.state_fingerprint,
      };
    } finally {
      resumeIo.restore();
    }
  } finally {
    io.restore();
  }
}

describe("runCli", { timeout: START_COMMIT_PATH_HANDLING_TIMEOUT_MS }, () => {
  it("atomically rejects a canonical plan, invalidates stale approval, and replans", async () => {
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
    expect(Number(rejected.revision)).toBe(Number(before.revision) + 1);

    const staleIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "plan",
          "approve",
          taskId,
          "--by",
          "USER",
          "--note",
          "Stale approval after rejection",
          "--root",
          root,
        ]),
      ).not.toBe(0);
      expect(staleIo.stderr).toContain("proposed_plan_required");
    } finally {
      staleIo.restore();
    }

    const advanceIo = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
        advanceIo.stderr,
      ).toBe(0);
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

  it("recovers a 52/50 rejected projection fixture before explicit Kernel migration", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeDefaultConfig(root);
    const taskId = await createLegacyPlanTask(
      root,
      "Historical rejection recovery",
      "Recover the split projection fixture",
    );
    await materializeLegacyDrainIdentityFixture({ root, task_id: taskId });
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

    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const staleDecision = await buildTaskRouteDecision({
      ctx: command,
      cwd: root,
      rootOverride: null,
      includeRemote: false,
      taskId,
    });
    const staleFingerprint = staleDecision.workflowStep.preconditionFingerprint.digest;

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
          staleFingerprint,
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
      expect(await runCli(["task", "advance", taskId, "--agent-json", "--root", root])).toBe(2);
      expect(advanceIo.stderr).toContain(`task kernel-migrate ${taskId}`);
    } finally {
      advanceIo.restore();
    }
  });

  it("task plan approve rejects verify-required tasks with missing Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = await createLegacyPlanTask(
      root,
      "Plan gate task",
      "Verify Steps gate should block approve",
    );

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

  it("task plan approve requires task-specific Verify Steps for verify-required tasks", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeDefaultConfig(root);

    const taskId = await createLegacyPlanTask(
      root,
      "Approvable scaffold task",
      "Verify-required scaffolds should be approvable as created",
    );
    expect(
      await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "PLANNER fallback scaffold. Replace with task-specific acceptance checks.",
        "--updated-by",
        "PLANNER",
        "--root",
        root,
      ]),
    ).toBe(0);

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

    expect(
      await runCli([
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
      ]),
    ).not.toBe(0);

    expect(
      await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run `bun run test:critical`. Expected: the task-specific behavior passes.",
        "--updated-by",
        "PLANNER",
        "--root",
        root,
      ]),
    ).toBe(0);

    expect(
      await runCli([
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
      ]),
    ).toBe(0);

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain("Run `bun run test:critical`.");
    expect(readme).not.toContain("PLANNER fallback scaffold");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    expect(readme).toContain('status: "TODO"');
    expect(
      executionGrantFromExtensions(parseTaskReadme(readme).frontmatter.extensions),
    ).toMatchObject({
      task_id: taskId,
      actor: "USER",
      approval_kind: "manual_operator",
      status: "active",
    });

    const replanIo = captureStdIO();
    try {
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
        replanIo.stderr,
      ).toBe(0);
    } finally {
      replanIo.restore();
    }
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

    const taskId = await createLegacyPlanTask(
      root,
      "Start gate task",
      "Verify Steps gate should block start when require_plan=false",
    );

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
