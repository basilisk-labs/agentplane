import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe } from "vitest";

import {
  evaluateStateFingerprintPrecondition,
  type StateFingerprint,
} from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  configureGitUser,
  defaultConfig,
  execFile,
  expect,
  extractTaskSuffix,
  it,
  mkGitRepoRootWithBranch,
  promisify,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { WORKFLOW_STATE_FINGERPRINT_POLICY } from "../commands/shared/workflow-step-fingerprint.js";

async function writeRoutePolicies(root: string): Promise<void> {
  const files = [
    "AGENTS.md",
    ".agentplane/policy/security.must.md",
    ".agentplane/policy/dod.core.md",
    ".agentplane/policy/dod.code.md",
    ".agentplane/policy/workflow.branch_pr.md",
  ];
  for (const relativePath of files) {
    const absolutePath = path.join(root, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, `# ${relativePath}\n`, "utf8");
  }
}

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Next action JSON task",
      "--description",
      "Exercise task next-action JSON contract.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

type AuthorityRequest = {
  type: string;
  operationId: string;
  operationDigest: string;
  stateFingerprintDigest: string;
  stateScopeDigest: string;
};

type NextActionJson = {
  workflow_step: {
    kind: string;
    id: string;
    request?: AuthorityRequest;
    operation?: { id: string };
  };
};

async function readNextActionJson(root: string, taskId: string): Promise<NextActionJson> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    if (code !== 0) process.stderr.write(io.stderr);
    expect(code).toBe(0);
    return JSON.parse(io.stdout) as NextActionJson;
  } finally {
    io.restore();
  }
}

describe("task next-action JSON", () => {
  it("stores branch_pr authority without changing the task branch before the authorized PR operation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeRoutePolicies(root);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Commit authority records before continuing the protected PR route.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const branch = `task/${taskId}/authority-auto-commit`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: exercise the authority artifact commit boundary.",
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "commit",
        "-m",
        `🧩 ${extractTaskSuffix(taskId)} task: establish branch packet for authority regression`,
      ],
      { cwd: root },
    );
    const { stdout: setupStatus } = await execFileAsync("git", ["status", "--porcelain"], {
      cwd: root,
    });
    expect(setupStatus.trim()).toBe("");
    const { stdout: setupHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const initial = await readNextActionJson(root, taskId);
    expect(initial.workflow_step).toMatchObject({
      kind: "approval",
      id: "approval.pr.open",
      request: { type: "side_effect", operationId: "pr.open" },
    });
    const request = initial.workflow_step.request;
    if (!request) throw new Error("expected an authority request for pr.open");

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
      root,
    ]);

    const { stdout: authorizedHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    expect(authorizedHead.trim()).toBe(setupHead.trim());
    const { stdout: status } = await execFileAsync("git", ["status", "--porcelain"], { cwd: root });
    expect(status.trim()).toBe("");

    const authorized = await readNextActionJson(root, taskId);
    expect(authorized.workflow_step).toMatchObject({
      kind: "cli_operation",
      id: "pr.open",
      operation: { id: "pr.open" },
    });
  });

  it("prints snake_case fields while preserving camelCase aliases", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeRoutePolicies(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise next-action JSON contract.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      if (code !== 0) process.stderr.write(io.stderr);
      expect(code).toBe(0);
      const parsed = JSON.parse(io.stdout) as {
        workflow_step: {
          kind: string;
          id: string;
          preconditionFingerprint: StateFingerprint;
          operation: {
            id: string;
            params: { taskId: string; agent: string; slug: string };
            idempotencyKey: string;
            expectedPostconditions: { id: string }[];
          };
        };
        workflowStep: {
          kind: string;
          id: string;
          operation: { id: string };
        };
        execution_packet: {
          schema_version: number;
          schemaVersion: number;
          action_kind: string;
          actionKind: string;
          exact_argv: string[] | null;
          exactArgv: string[] | null;
          safe_to_mutate: boolean;
          safeToMutate: boolean;
        };
        operator_guidance: {
          can_execute_now: boolean;
          canExecuteNow: boolean;
          repeat_policy: { recompute_command: string; recomputeCommand: string };
        };
        approval: {
          route_requires_approval: boolean;
          gateway_mutation_policy: boolean;
          effective_mutation_approval: boolean;
        };
      };
      expect(parsed.workflow_step.kind).toBe("cli_operation");
      expect(parsed.workflow_step.id).toBe("worktree.prepare");
      expect(parsed.workflow_step.operation.id).toBe("worktree.prepare");
      expect(parsed.workflow_step.operation.params).toMatchObject({
        taskId,
        agent: "CODER",
      });
      expect(parsed.workflow_step.operation.idempotencyKey).toContain("worktree.prepare");
      expect(parsed.workflow_step.operation.expectedPostconditions.length).toBeGreaterThan(0);
      expect(parsed.workflow_step.preconditionFingerprint.components.blueprint).toMatchObject({
        state: "present",
        source: "workflow_route_blueprint",
      });
      expect(
        evaluateStateFingerprintPrecondition({
          expected: parsed.workflow_step.preconditionFingerprint,
          current: parsed.workflow_step.preconditionFingerprint,
          policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
        }),
      ).toMatchObject({
        status: "fresh_with_bounded_uncertainty",
        unavailable_required_components: [],
      });
      expect(parsed.workflowStep.operation.id).toBe(parsed.workflow_step.operation.id);
      expect(parsed.execution_packet.schema_version).toBe(1);
      expect(parsed.execution_packet.schemaVersion).toBe(1);
      expect(parsed.execution_packet.action_kind).toBe("local_command");
      expect(parsed.execution_packet.actionKind).toBe("local_command");
      expect(parsed.execution_packet.exact_argv?.slice(0, 3)).toEqual([
        "agentplane",
        "work",
        "start",
      ]);
      expect(parsed.execution_packet.exact_argv).toEqual(parsed.execution_packet.exactArgv);
      expect(parsed.execution_packet.safe_to_mutate).toBe(parsed.execution_packet.safeToMutate);
      expect(parsed.operator_guidance.can_execute_now).toBe(parsed.operator_guidance.canExecuteNow);
      expect(parsed.operator_guidance.repeat_policy.recompute_command).toBe(
        parsed.operator_guidance.repeat_policy.recomputeCommand,
      );
      expect(parsed.approval.route_requires_approval).toBe(false);
      expect(parsed.approval.gateway_mutation_policy).toBe(true);
      expect(parsed.approval.effective_mutation_approval).toBe(false);
    } finally {
      io.restore();
    }
  });

  it("routes open user questions to task answer before plan approval", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeRoutePolicies(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise user input route blocker.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "ask",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Which implementation path should this use?",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(io.stdout) as {
        next_action: { code: string; command: string; requiresApproval: boolean };
        execution_packet: {
          action_kind: string;
          recommended_role: string;
          human_provider_action: string;
        };
        blockers: { code: string; summary: string }[];
      };
      expect(parsed.next_action).toEqual(
        expect.objectContaining({
          code: "answer_user_question",
          command: `agentplane task answer ${taskId} --by USER --body "..."`,
          requiresApproval: true,
        }),
      );
      expect(parsed.execution_packet.action_kind).toBe("provider_action");
      expect(parsed.execution_packet.recommended_role).toBe("USER");
      expect(parsed.execution_packet.human_provider_action).toContain(
        "Which implementation path should this use?",
      );
      expect(parsed.blockers[0]?.code).toBe("human_input_required");
      expect(parsed.blockers[0]?.summary).toContain("Which implementation path should this use?");
    } finally {
      io.restore();
    }
  });
});
