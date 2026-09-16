import { execFileAsync } from "@agentplaneorg/core/process";
import { evaluateStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe } from "vitest";
import { readTask } from "@agentplaneorg/core/tasks";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { applyTaskMutation } from "../commands/shared/task-mutation.js";
import { setTaskFieldsIntent } from "../commands/shared/task-store.js";
import { resolveQualityReviewTargetSha } from "../commands/shared/quality-review-target.js";
import { runEvaluatorRun } from "../commands/evaluator/evaluator.command.js";
import { addTask, commitPath } from "../commands/evaluator/evaluator-test-helpers.js";
import {
  approveRouteTaskPlan,
  completeRouteWorkItem,
  recordRouteVerification,
} from "./route-decision.testkit.js";
import {
  mkGitRepoRoot,
  mkGitRepoRootWithCommit,
  writeDefaultConfig,
  withEvaluatorPolicyFixture,
} from "@agentplane/testkit";

import {
  captureStdIO,
  commitAll,
  configureGitUser,
  defaultConfig,
  expect,
  it,
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
      "Route decision task",
      "--description",
      "Exercise route decision commands for branch_pr recovery.",
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

async function recordEvaluatorReview(root: string, taskId: string): Promise<void> {
  const io = captureStdIO();
  try {
    expect(
      await withEvaluatorPolicyFixture(root, () =>
        runCli([
          "evaluator",
          "run",
          taskId,
          "--provenance",
          "evaluator_supplied",
          "--verdict",
          "pass",
          "--summary",
          "EVALUATOR quality gate passed for route decision closeout regression.",
          "--finding",
          "No unresolved findings for this route decision closeout regression.",
          "--evidence",
          `.agentplane/tasks/${taskId}/README.md`,
          "--root",
          root,
        ]),
      ),
      io.stderr,
    ).toBe(0);
  } finally {
    io.restore();
  }
}

async function completeDirectRunner(root: string, taskId: string): Promise<void> {
  const policyDir = path.join(root, ".agentplane", "policy");
  await mkdir(policyDir, { recursive: true });
  for (const policy of ["security.must.md", "dod.core.md", "dod.code.md", "workflow.direct.md"]) {
    await writeFile(path.join(policyDir, policy), `# ${policy}\n`, "utf8");
  }
  await runCliSilent(["task", "run", taskId, "--dry-run", "--root", root]);

  const statusIo = captureStdIO();
  let statePath = "";
  try {
    expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
    const payload = JSON.parse(statusIo.stdout) as { paths: { state: string } };
    statePath = payload.paths.state;
  } finally {
    statusIo.restore();
  }
  const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
  const fingerprint = state.state_fingerprint as {
    precondition_fingerprint: Parameters<
      typeof evaluateStateFingerprintPrecondition
    >[0]["expected"];
    precondition_policy: Parameters<typeof evaluateStateFingerprintPrecondition>[0]["policy"];
  };
  const completedAt = new Date().toISOString();
  const expected = fingerprint.precondition_fingerprint;
  state.state_fingerprint = {
    ...fingerprint,
    outcome: "accepted",
    state_before: expected,
    state_after: expected,
    precondition: evaluateStateFingerprintPrecondition({
      expected,
      current: expected,
      policy: fingerprint.precondition_policy,
    }),
    effect_applied: true,
    post_state_reason_code: null,
  };
  state.result = {
    status: "success",
    exit_code: 0,
    started_at: state.created_at,
    ended_at: completedAt,
  };
  state.updated_at = completedAt;
  await writeFile(
    statePath,
    `${JSON.stringify({ ...state, status: "success" }, null, 2)}\n`,
    "utf8",
  );
}

describe("runCli route decision direct closeout", () => {
  it.each([false, true])(
    "keeps a recorded direct target across other-task artifacts (metadata=%s)",
    async (withMetadata) => {
      const root = await mkGitRepoRoot();
      const taskId = "202609070900-DIRECT";
      const implementationSha = await commitPath(
        root,
        "src/direct.ts",
        "export const value = 1;\n",
        "feat: direct implementation",
      );
      let expectedSha = implementationSha;
      if (withMetadata) {
        expectedSha = await commitPath(
          root,
          `.agentplane/tasks/${taskId}/manual-note.md`,
          "reviewable task metadata\n",
          "docs: current task metadata",
        );
      }
      await commitPath(
        root,
        ".agentplane/tasks/202609070900-OTHER/manual-note.md",
        "other task metadata\n",
        "docs: other task metadata",
      );
      await expect(
        resolveQualityReviewTargetSha({
          gitRoot: root,
          workflowDir: ".agentplane/tasks",
          taskId,
          previousEvaluatedSha: implementationSha,
          workflowMode: "direct",
        }),
      ).resolves.toBe(expectedSha);
      await commitPath(
        root,
        `.agentplane/tasks/${taskId}/quality/review.json`,
        "{}\n",
        "test: record generated review",
      );
      await commitPath(
        root,
        ".agentplane/tasks/202609070900-OTHER/manual-note.md",
        "more other task metadata\n",
        "docs: update other task metadata",
      );
      await expect(
        resolveQualityReviewTargetSha({
          gitRoot: root,
          workflowDir: ".agentplane/tasks",
          taskId,
          previousEvaluatedSha: expectedSha,
          workflowMode: "direct",
        }),
      ).resolves.toBe(expectedSha);
      await expect(
        resolveQualityReviewTargetSha({
          gitRoot: root,
          workflowDir: ".agentplane/tasks",
          taskId,
          previousEvaluatedSha: "f".repeat(40),
          workflowMode: "direct",
        }),
      ).resolves.toBeNull();
    },
  );

  it("does not anchor an unrelated task artifact when the current task has no committed work", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV03";
    await addTask(root, taskId);
    await commitPath(root, "src/older-feature.txt", "older implementation", "feat: older work");
    await commitPath(
      root,
      ".agentplane/tasks/202605240900-OTHER/manual-note.md",
      "unrelated task artifact",
      "chore: unrelated task artifact",
    );

    await expect(
      runEvaluatorRun(
        { cwd: root, rootOverride: undefined },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "human_supplied",
          verdict: "pass",
          summary: "No current committed work unit",
          findings: ["Unrelated workflow history is not a valid review target."],
          evidenceRefs: [`.agentplane/tasks/${taskId}/README.md`],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: false,
          record: true,
        },
      ),
    ).rejects.toThrow("passing evaluator review requires a committed review target");
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review?.state).not.toBe("pass");
  });

  it("routes approved direct tasks to current-agent start-ready before execution", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(root, taskId, "Exercise direct route guidance before start-ready.");

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; nextCommand: string | null };
        next_action: { code: string; command: string | null };
      };
      expect(parsed.route_oracle.phase).toBe("direct_execution");
      expect(parsed.next_action).toMatchObject({
        code: "start_direct",
        command: `agentplane task start-ready ${taskId} --author CODER --body 'Start: continue direct-mode task in current checkout.'`,
      });
      expect(parsed.route_oracle.nextCommand).toBe(
        `agentplane task start-ready ${taskId} --author CODER --body 'Start: continue direct-mode task in current checkout.'`,
      );
      expect(parsed.next_action.command).not.toContain("task run");
    } finally {
      nextIo.restore();
    }
  });

  it("routes a newly started direct task to the typed EXECUTOR runner operation", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(root, taskId, "Exercise direct route guidance after start-ready.");
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct DOING task that has no runner artifact.",
      "--root",
      root,
    ]);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; nextCommand: string | null };
        workflow_step: {
          kind: string;
          id: string;
          operation?: { id: string; params: { mode: string; taskId: string } };
          execution: { actionKind: string };
        };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          mutationPathHint: string | null;
          exactArgv: string[] | null;
        };
        operator_guidance: {
          executor_context: {
            executor: string;
            current_agent_must_execute: boolean;
            instruction: string;
          };
          runner_context: {
            runner_is_required: boolean;
            runner_is_allowed_now: boolean;
            runner_failure_means: string;
          };
        };
        next_action: { code: string; command: string | null; summary: string };
      };
      expect(parsed.route_oracle.phase).toBe("direct_execution");
      expect(parsed.next_action).toMatchObject({
        code: "continue_direct",
        command: `agentplane task run ${taskId}`,
      });
      expect(parsed.route_oracle.nextCommand).toBe(`agentplane task run ${taskId}`);
      expect(parsed.workflow_step).toMatchObject({
        kind: "cli_operation",
        id: "runner.follow",
        operation: { id: "runner.follow", params: { mode: "run", taskId } },
        execution: { actionKind: "local_command" },
      });
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "local_command",
        safeToMutate: true,
        mutationPathHint: root,
        exactArgv: ["agentplane", "task", "run", taskId],
      });
      expect(parsed.operator_guidance.runner_context).toMatchObject({
        runner_is_required: true,
        runner_is_allowed_now: true,
      });
    } finally {
      nextIo.restore();
    }
  });

  it("stops for verification evidence after a successful runner instead of looping verify-show", async () => {
    const root = await mkGitRepoRootWithCommit();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await commitAll(root, "seed direct workflow config");

    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(
      root,
      taskId,
      "Exercise the direct terminal-runner verification gate.",
    );
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct task whose runner reaches terminal success.",
      "--root",
      root,
    ]);
    await commitAll(root, "track direct task state before terminal runner simulation");
    await completeDirectRunner(root, taskId);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code, nextIo.stderr).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        workflow_step: {
          kind: string;
          id: string;
          episode?: { purpose: string; role: string };
        };
        next_action: { code: string; command: string | null; summary: string };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          exactArgv: string[] | null;
        };
        operator_guidance: { canExecuteNow: boolean; safeCommand: string | null };
      };
      expect(parsed.next_action).toMatchObject({
        code: "review_direct_verification",
        command: null,
      });
      expect(parsed.next_action.summary).toContain(`agentplane verify ${taskId}`);
      expect(parsed.next_action.summary).not.toContain("verify-show");
      expect(parsed.workflow_step).toMatchObject({
        kind: "agent_episode",
        id: "agent.direct_verification",
        episode: { purpose: "verification", role: "TESTER" },
      });
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "stop",
        safeToMutate: false,
        exactArgv: null,
      });
      expect(parsed.operator_guidance).toMatchObject({
        canExecuteNow: false,
        safeCommand: null,
      });
    } finally {
      nextIo.restore();
    }
  });

  it("routes direct verification rework to a mutable CODER episode", async () => {
    const root = await mkGitRepoRootWithCommit();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await commitAll(root, "seed direct rework workflow config");

    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(root, taskId, "Exercise direct verification rework routing.");
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct task whose completed runner needs bounded repair.",
      "--root",
      root,
    ]);
    await commitAll(root, "track direct task state before rework simulation");
    await completeDirectRunner(root, taskId);
    await runCliSilent([
      "verify",
      taskId,
      "--rework",
      "--by",
      "TESTER",
      "--note",
      "The completed direct implementation needs bounded repository repair.",
      "--observation",
      "The direct runner completed but the verified behavior is incorrect.",
      "--impact",
      "Repeating verification cannot repair the repository or task contract.",
      "--resolution",
      "Return control to CODER for implementation rework or a plan refinement.",
      "--repo-fixable",
      "--root",
      root,
    ]);

    const nextIo = captureStdIO();
    try {
      expect(await runCli(["task", "next-action", taskId, "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string };
        workflow_step: {
          kind: string;
          id: string;
          episode?: { purpose: string; role: string; objective: string };
        };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          mutationPathHint: string | null;
          exactArgv: string[] | null;
        };
        next_action: { code: string; command: string | null };
      };
      expect(parsed.route_oracle.phase).toBe("implementation_rework_required");
      expect(parsed.workflow_step).toMatchObject({
        kind: "agent_episode",
        id: "agent.direct_implementation_rework",
        episode: { purpose: "implementation_rework", role: "CODER" },
      });
      expect(parsed.workflow_step.episode?.objective).toContain("plan refinement");
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "stop",
        safeToMutate: true,
        mutationPathHint: root,
        exactArgv: null,
      });
      expect(parsed.next_action).toMatchObject({
        code: "implementation_rework_required",
        command: null,
      });
    } finally {
      nextIo.restore();
    }

    const statusIo = captureStdIO();
    try {
      expect(await runCli(["task", "status", taskId, "--route", "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        oracle: { phase: string };
        executionPacket: {
          safeToMutate: boolean;
          mutationPathHint: string | null;
          recommendedRole: string;
        };
        nextAction: { code: string; command: string | null };
      };
      expect(parsed.oracle.phase).toBe("implementation_rework_required");
      expect(parsed.executionPacket).toMatchObject({
        safeToMutate: true,
        mutationPathHint: root,
        recommendedRole: "CODER",
      });
      expect(parsed.nextAction).toMatchObject({
        code: "implementation_rework_required",
        command: null,
      });
    } finally {
      statusIo.restore();
    }
  });

  it("routes verified direct tasks to closeout instead of rerunning them and drops them from active work", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(root, taskId, "Exercise direct verified closeout routing.");
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct DOING task for verified closeout routing.",
      "--root",
      root,
    ]);
    await completeRouteWorkItem(root, taskId);
    await recordRouteVerification(root, taskId, "Verified: ready for direct closeout.");
    await recordEvaluatorReview(root, taskId);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string };
        next_action: { code: string; command: string | null; summary: string };
      };
      expect(parsed.route_oracle.phase).toBe("direct_verified_pending_closeout");
      expect(parsed.next_action).toMatchObject({
        code: "complete_direct",
        command: `agentplane task complete ${taskId} --result "<result>" --commit <hash>`,
      });
      expect(parsed.next_action.summary).toContain("task complete");
      expect(parsed.next_action.summary).toContain("instead of rerunning execution");
    } finally {
      nextIo.restore();
    }

    const activeIo = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(activeIo.stdout) as {
        count: number;
        filtered_count: number;
        items: { task: { id: string } }[];
      };
      expect(parsed.count).toBe(0);
      expect(parsed.filtered_count).toBe(0);
      expect(parsed.items.map((item) => item.task.id)).not.toContain(taskId);
    } finally {
      activeIo.restore();
    }
  });

  it("closes a verified direct implementation after another task artifact commit", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFile(path.join(root, ".gitignore"), "\n.agentplane/cache/\n", { flag: "a" });
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const taskId = await createBranchPrTask(root);
    await approveRouteTaskPlan(
      root,
      taskId,
      "Review and close direct implementation across other task artifacts.",
    );
    const startIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: reproduce direct review identity across interleaved task artifacts.",
          "--root",
          root,
        ]),
        startIo.stderr,
      ).toBe(0);
    } finally {
      startIo.restore();
    }
    await completeRouteWorkItem(root, taskId);
    await commitAll(root, "test: establish direct task");
    await writeFile(path.join(root, "feature.txt"), "implemented\n");
    await commitAll(root, "feat: implement direct task");
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const implementationSha = stdout.trim();
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    await applyTaskMutation({
      ctx,
      taskId,
      build: () => ({
        intents: setTaskFieldsIntent({
          commit: { hash: implementationSha, message: "feat: implement direct task" },
        }),
      }),
    });
    expect(await runCliSilent(["blueprint", "snapshot", taskId, "--root", root])).toBe(0);
    await recordRouteVerification(
      root,
      taskId,
      "Verified direct implementation before unrelated artifacts.",
    );
    await commitAll(root, "test: record direct verification artifacts");
    const otherTaskId = await createBranchPrTask(root);
    const otherDir = path.join(root, `.agentplane/tasks/${otherTaskId}`);
    await mkdir(otherDir, { recursive: true });
    await writeFile(path.join(otherDir, "manual-note.md"), "other task work\n");
    await commitAll(root, "docs: unrelated task artifacts");
    const unrelatedDiff = await execFileAsync("git", ["show", "--format=", "--name-only", "HEAD"], {
      cwd: root,
    });
    expect(
      unrelatedDiff.stdout
        .trim()
        .split("\n")
        .every((name) => name.startsWith(`.agentplane/tasks/${otherTaskId}/`)),
      unrelatedDiff.stdout,
    ).toBe(true);
    await recordEvaluatorReview(root, taskId);
    const reviewed = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(reviewed.frontmatter.quality_review?.evaluated_sha).toBe(implementationSha);
    await commitAll(root, "test: commit generated evaluator artifacts");
    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: direct review identity remains bound across task artifacts.",
          "--result",
          "Direct implementation reviewed and completed",
          "--commit",
          implementationSha,
          "--implementation-commit",
          implementationSha,
          "--close-commit",
          "--root",
          root,
        ]),
        io.stderr,
      ).toBe(0);
    } finally {
      io.restore();
    }
    const closed = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(closed.frontmatter.status).toBe("DONE");
    const status = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
      cwd: root,
    });
    expect(status.stdout.trim()).toBe("");
  }, 120_000);

  it(
    "routes done direct tasks with dirty tracked task artifacts to a cleanup commit",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRootWithCommit();
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "direct";
      await writeConfig(root, config);
      await commitAll(root, "seed direct workflow config");

      await writeFile(path.join(root, "file.txt"), "implementation\n", "utf8");
      await commitAll(root, "seed implementation");
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });

      const taskId = await createBranchPrTask(root);
      await approveRouteTaskPlan(root, taskId, "Exercise no-close-commit route cleanup.");
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create a direct task that will be finished without an automatic close commit.",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
      await completeRouteWorkItem(root, taskId);
      await recordRouteVerification(
        root,
        taskId,
        "Ok to finish with manual close commit handling.",
      );
      await recordEvaluatorReview(root, taskId);
      await commitAll(root, "track task artifacts before finish");

      const finishIo = captureStdIO();
      try {
        expect(
          await runCli([
            "finish",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Verified: direct finish leaves task artifacts for manual cleanup when no close commit is requested.",
            "--result",
            "finish without close commit",
            "--commit",
            implHash.trim(),
            "--no-close-commit",
            "--root",
            root,
          ]),
          finishIo.stderr,
        ).toBe(0);
      } finally {
        finishIo.restore();
      }

      const trackedStatus = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no", "--", `.agentplane/tasks/${taskId}`],
        { cwd: root },
      );
      expect(trackedStatus.stdout).toContain(`.agentplane/tasks/${taskId}/README.md`);

      const nextIo = captureStdIO();
      try {
        const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(nextIo.stdout) as {
          route_oracle: {
            phase: string;
            blocker: { code: string } | null;
            nextCommand: string | null;
          };
          execution_packet: {
            actionKind: string;
            exactArgv: string[] | null;
            evidenceMissing: string[];
          };
          next_action: { code: string; command: string | null; summary: string };
        };
        expect(parsed.route_oracle.phase).toBe("direct_done_pending_artifact_commit");
        expect(parsed.route_oracle.blocker).toMatchObject({ code: "dirty_task_artifacts" });
        expect(parsed.next_action).toMatchObject({
          code: "commit_direct_task_artifacts",
          command: `agentplane commit ${taskId} --close --unstage-others`,
        });
        expect(parsed.next_action.summary).toContain("tracked task artifacts");
        expect(parsed.route_oracle.nextCommand).toBe(parsed.next_action.command);
        expect(parsed.execution_packet.actionKind).toBe("local_command");
        expect(parsed.execution_packet.exactArgv).toEqual([
          "agentplane",
          "commit",
          taskId,
          "--close",
          "--unstage-others",
        ]);
        expect(parsed.execution_packet.evidenceMissing).toContain("task_artifact_cleanup_commit");
      } finally {
        nextIo.restore();
      }

      await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}/README.md`], {
        cwd: root,
      });

      const stagedNextIo = captureStdIO();
      try {
        const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(stagedNextIo.stdout) as {
          route_oracle: { blocker: { code: string } | null };
          next_action: { code: string; command: string | null };
          execution_packet: { exactArgv: string[] | null };
        };
        expect(parsed.route_oracle.blocker).toMatchObject({ code: "dirty_task_artifacts" });
        expect(parsed.next_action).toMatchObject({
          code: "commit_direct_task_artifacts",
          command: `agentplane commit ${taskId} --close --unstage-others`,
        });
        expect(parsed.execution_packet.exactArgv).toEqual([
          "agentplane",
          "commit",
          taskId,
          "--close",
          "--unstage-others",
        ]);
      } finally {
        stagedNextIo.restore();
      }
    },
  );
});
