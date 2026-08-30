import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { getTaskStore, setTaskFieldsIntent } from "../commands/shared/task-store.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithCommit,
  withEvaluatorPolicyFixture,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

async function recordObservedRunnerReceipt(root: string, taskId: string): Promise<void> {
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  await getTaskStore(command).mutate(taskId, () =>
    setTaskFieldsIntent({
      runner: {
        run_id: "run-guided-observed",
        status: "success",
        adapter_id: "test-supervisor",
        mode: "execute",
        updated_at: "2026-08-02T00:00:00.000Z",
        exit_code: 0,
        target: { kind: "task", task_id: taskId },
        execution_receipt: {
          path: `agentplane-run://${taskId}/run-guided-observed/execution-receipt.json`,
          sha256: `sha256:${"a".repeat(64)}`,
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
      },
    }),
  );
}

describe("runCli task guided shortcuts", { timeout: 180_000 }, () => {
  it("task begin rejects an unsupported check before semantic planning or persistence", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "begin",
        "Unsafe guided task",
        "--tag",
        "code",
        "--verify",
        "node -e 'process.exit(0)'",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("inline code evaluation is not allowed for node");
    } finally {
      io.restore();
    }
    await expect(readFile(path.join(root, ".agentplane", "tasks"), "utf8")).rejects.toThrow();
  });

  it("task begin creates a direct task and stops at semantic planning", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const io = captureStdIO();
    let payload: {
      task_id: string;
      status: string;
      required_role: string;
      next_command: string;
    };
    try {
      const code = await runCli([
        "task",
        "begin",
        "Fix parser edge case",
        "--tag",
        "code",
        "--verify",
        "bun test",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      payload = JSON.parse(io.stdout.trim()) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!.status).toBe("semantic_input_required");
    expect(payload!.required_role).toBe("PLANNER");
    expect(payload!.next_command).toBe(`agentplane task advance ${payload!.task_id} --agent-json`);
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", payload!.task_id, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "pending"');
    expect(readme).toContain("PLANNER semantic plan required");
    expect(readme).toContain("Fix parser edge case");
    expect(readme).toContain("bun test");

    const approvalIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "plan",
        "approve",
        payload!.task_id,
        "--by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(approvalIo.stderr).toContain("cannot approve the generated planning placeholder");
    } finally {
      approvalIo.restore();
    }

    expect(
      await runCli([
        "task",
        "plan",
        "set",
        payload!.task_id,
        "--text",
        '1. Implement the change for "Fix parser edge case".\n2. Run required checks and capture verification evidence.\n3. Finalize task findings and finish with traceable commit metadata.',
        "--updated-by",
        "PLANNER",
        "--root",
        root,
      ]),
    ).toBe(0);
    const legacyApprovalIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "plan",
        "approve",
        payload!.task_id,
        "--by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(legacyApprovalIo.stderr).toContain(
        "cannot approve the generated planning placeholder",
      );
    } finally {
      legacyApprovalIo.restore();
    }
    const command = await loadCommandContext({ cwd: root, rootOverride: null });
    await getTaskStore(command).mutate(payload!.task_id, () =>
      setTaskFieldsIntent({
        plan_approval: {
          state: "approved",
          updated_at: "2026-08-01T00:00:00.000Z",
          updated_by: "ORCHESTRATOR",
          note: "Legacy synthetic approval fixture.",
        },
      }),
    );

    const runIo = captureStdIO();
    try {
      const code = await runCli(["task", "run", payload!.task_id, "--json", "--root", root]);
      expect(code, runIo.stderr).toBe(0);
      expect(JSON.parse(runIo.stdout)).toMatchObject({
        status: "stopped",
        route: { step_id: "agent.planning" },
        stop: { code: "semantic_input_required" },
        metrics: { provider_episodes: 0 },
      });
    } finally {
      runIo.restore();
    }
  });

  it("task begin with an explicit plan stops at approval in branch_pr mode", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const io = captureStdIO();
    let payload: { task_id: string; status: string; next_command: string };
    try {
      const code = await runCli([
        "task",
        "begin",
        "Fix branch route",
        "--tag",
        "code",
        "--plan",
        "1. Implement the explicit branch change.\n2. Verify the branch result.",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      payload = JSON.parse(io.stdout.trim()) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!.status).toBe("approval_required");
    expect(payload!.next_command).toBe(`agentplane task advance ${payload!.task_id} --agent-json`);
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", payload!.task_id, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "pending"');
    expect(readme).toContain('doc_updated_by: "USER"');
    expect(readme).toContain("Implement the explicit branch change");
  });

  it("task begin with a plan routes creation and the plan update out of a linked worktree", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
    await commitAll(root, "seed primary checkout");

    const taskWorktree = path.join(root, ".agentplane", "worktrees", "existing-task");
    await execFileAsync(
      "git",
      ["worktree", "add", "-b", "task/202608211010-EXIST2/work", taskWorktree],
      { cwd: root },
    );

    const io = captureStdIO();
    let payload: { task_id: string; status: string };
    try {
      const code = await runCli([
        "task",
        "begin",
        "Route planned task creation",
        "--tag",
        "code",
        "--plan",
        "1. Keep task artifacts in the primary checkout.\n2. Verify worktree isolation.",
        "--json",
        "--root",
        taskWorktree,
      ]);
      expect(code).toBe(0);
      payload = JSON.parse(io.stdout.trim()) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!.status).toBe("approval_required");
    const primaryReadme = await readFile(
      path.join(root, ".agentplane", "tasks", payload!.task_id, "README.md"),
      "utf8",
    );
    expect(primaryReadme).toContain("Keep task artifacts in the primary checkout");
    await expect(
      readFile(path.join(taskWorktree, ".agentplane", "tasks", payload!.task_id, "README.md")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("task complete records verification and finishes a direct task", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
    await commitAll(root, "seed");

    const ioBegin = captureStdIO();
    let taskId = "";
    try {
      await runCli([
        "task",
        "begin",
        "Complete shortcut",
        "--tag",
        "code",
        "--json",
        "--root",
        root,
      ]);
      taskId = (JSON.parse(ioBegin.stdout.trim()) as { task_id: string }).task_id;
    } finally {
      ioBegin.restore();
    }
    expect(
      await runCli([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1. Complete the scoped shortcut.\n2. Run the declared verification.",
        "--updated-by",
        "PLANNER",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCli(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]),
    ).toBe(0);
    expect(
      await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: exercise evidence-safe compatibility closeout.",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Declared compatibility checks passed.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordObservedRunnerReceipt(root, taskId);
    const { stdout: commit } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const evidencePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const ioEvaluator = captureStdIO();
    try {
      const code = await withEvaluatorPolicyFixture(root, () =>
        runCli([
          "evaluator",
          "run",
          taskId,
          "--provenance",
          "evaluator_supplied",
          "--verdict",
          "pass",
          "--summary",
          "Reviewed guided shortcut completion test.",
          "--finding",
          "No unresolved findings before task complete.",
          "--evidence",
          evidencePath,
          "--root",
          root,
        ]),
      );
      expect(code, ioEvaluator.stderr).toBe(0);
    } finally {
      ioEvaluator.restore();
    }

    const ioComplete = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Shortcut finished",
        "--commit",
        commit.trim(),
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(ioComplete.stdout.trim())).toMatchObject({
        task_id: taskId,
        status: "finished",
      });
    } finally {
      ioComplete.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DONE"');
    expect(readme).toContain('state: "ok"');
    expect(readme).toContain("Shortcut finished");
    expect(readme).not.toContain("UNSAFE: operator accepted missing observed runner receipt");
  });

  it("task complete refuses to synthesize verification from an executor claim", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const ioBegin = captureStdIO();
    let taskId = "";
    try {
      await runCli([
        "task",
        "begin",
        "Missing commit shortcut",
        "--tag",
        "code",
        "--json",
        "--root",
        root,
      ]);
      taskId = (JSON.parse(ioBegin.stdout.trim()) as { task_id: string }).task_id;
    } finally {
      ioBegin.restore();
    }

    const ioComplete = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Shortcut should fail before verify",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(ioComplete.stderr).toContain(
        "task complete cannot turn an executor claim into verification",
      );
    } finally {
      ioComplete.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "pending"');
    expect(readme).not.toContain("Shortcut should fail before verify");
  });

  it("task complete records branch_pr verification without implying lifecycle closure", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch complete shortcut",
        "--description",
        "verify only",
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
    expect(
      await runCli([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1. Verify the route.",
        "--updated-by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCli(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]),
    ).toBe(0);
    expect(
      await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Branch evidence was checked independently.",
        "--root",
        root,
      ]),
    ).toBe(0);
    const evidencePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const ioEvaluator = captureStdIO();
    try {
      const code = await withEvaluatorPolicyFixture(root, () =>
        runCli([
          "evaluator",
          "run",
          taskId,
          "--provenance",
          "evaluator_supplied",
          "--verdict",
          "pass",
          "--summary",
          "Reviewed branch compatibility closeout.",
          "--finding",
          "No unresolved semantic findings.",
          "--evidence",
          evidencePath,
          "--root",
          root,
        ]),
      );
      expect(code, ioEvaluator.stderr).toBe(0);
    } finally {
      ioEvaluator.restore();
    }

    const observedReceiptIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Must remain open without a runner receipt",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(observedReceiptIo.stderr).toContain(
        "task complete requires an AgentPlane-observed successful runner receipt",
      );
    } finally {
      observedReceiptIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Ready for PR",
        "--json",
        "--accept-unobserved",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout.trim())).toMatchObject({
        task_id: taskId,
        status: "verified_pending_closeout",
        lifecycle_status: "not_finished",
        next_command: `agentplane task next-action ${taskId} --explain`,
        pr_command: `agentplane pr open ${taskId} --branch task/${taskId}/<slug> --author CODER`,
      });
    } finally {
      io.restore();
    }
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "ok"');
    expect(readme).toContain(
      "CODER used --accept-unobserved --yes. UNSAFE compatibility override: accepted a missing AgentPlane-observed runner receipt",
    );
    expect(readme).toContain('author: "CODER"');
  });
});
