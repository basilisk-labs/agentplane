import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

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

describe("task next-action JSON", () => {
  it("prints snake_case fields while preserving camelCase aliases", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
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
      expect(parsed.execution_packet.schema_version).toBe(1);
      expect(parsed.execution_packet.schemaVersion).toBe(1);
      expect(parsed.execution_packet.action_kind).toBe("local_command");
      expect(parsed.execution_packet.actionKind).toBe("local_command");
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

  it("routes open user questions to task answer before task progression", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
      expect(parsed.blockers[0]).toEqual(
        expect.objectContaining({
          code: "human_input_required",
          summary: expect.stringContaining("Which implementation path should this use?"),
        }),
      );
    } finally {
      io.restore();
    }
  });
});
