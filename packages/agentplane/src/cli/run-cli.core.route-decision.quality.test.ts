import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

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

const execFileAsync = promisify(execFile);

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision task",
      "--description",
      "Exercise quality gate route decisions.",
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

async function markTaskDoing(root: string, taskId: string): Promise<void> {
  const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
  const readme = await readFile(readmePath, "utf8");
  await writeFile(readmePath, readme.replace('status: "TODO"', 'status: "DOING"'), "utf8");
}

async function createVerifiedOpenPrFixture(
  root: string,
  title: string,
): Promise<{
  branch: string;
  implementationHead: string;
  taskId: string;
}> {
  const taskId = await createBranchPrTask(root);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    title,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

  const branch = `task/${taskId}/route-decision`;
  await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
  await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    `Start: ${title}`,
    "--root",
    root,
  ]);

  await writeFile(path.join(root, "impl.txt"), "implementation\n");
  await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
  const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
  });
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "CODER",
    "--note",
    "Verified: route decision behavior.",
    "--root",
    root,
  ]);
  await markTaskDoing(root, taskId);

  const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    `${JSON.stringify(
      {
        base: "main",
        branch,
        created_at: "2026-01-01T00:00:00.000Z",
        head_sha: implementationHead.trim(),
        pr_number: 123,
        pr_url: "https://github.com/example/repo/pull/123",
        schema_version: 1,
        status: "OPEN",
        task_id: taskId,
        updated_at: "2026-01-01T00:00:00.000Z",
      },
      null,
      2,
    )}\n`,
  );

  return { branch, implementationHead: implementationHead.trim(), taskId };
}

async function setupRoot(): Promise<string> {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  return root;
}

describe("runCli quality route decisions", () => {
  it("records quality review before recommending integration for a verified open PR", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(root, "Exercise quality review routing.");
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: verify artifacts"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; authoritativeCheckout: string; blocker: { code: string } };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          recommendedRole: string;
          evidenceMissing: string[];
          exactArgv: string[] | null;
        };
        next_action: { code: string; command: string | null };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("quality_review_missing");
      expect(parsed.route_oracle).toMatchObject({
        phase: "quality_review_needed",
        authoritativeCheckout: "task_worktree",
        blocker: { code: "quality_review_missing" },
      });
      expect(parsed.execution_packet.recommendedRole).toBe("EVALUATOR");
      expect(parsed.execution_packet.evidenceMissing).toContain("evaluator_quality_review");
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "stop",
        safeToMutate: false,
        exactArgv: null,
      });
      expect(parsed.next_action).toMatchObject({
        code: "quality_review_required",
        command: null,
      });
      expect(nextIo.stdout).not.toContain("--verdict pass");
      expect(nextIo.stdout).not.toContain("Quality review passed.");
      expect(nextIo.stdout).not.toContain("No blocking findings.");
    } finally {
      nextIo.restore();
    }

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["flow", "repair", taskId, "--dry-run", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(repairIo.stdout) as {
        repair_plan: { code: string; command: string | null; mutates: boolean }[];
      };
      expect(parsed.repair_plan).toContainEqual(
        expect.objectContaining({
          code: "quality_review_required",
          command: null,
          mutates: false,
        }),
      );
      expect(repairIo.stdout).not.toContain("--verdict pass");
    } finally {
      repairIo.restore();
    }
  });

  it("stops for a stale quality review without synthesizing a replacement verdict", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(root, "Exercise stale review routing.");
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
      "--verdict",
      "pass",
      "--summary",
      "The reviewed implementation satisfies the task contract.",
      "--finding",
      "The implementation and verification evidence were reviewed independently.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: quality artifacts"], { cwd: root });

    await writeFile(path.join(root, "impl.txt"), "implementation changed after review\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: change reviewed implementation"], {
      cwd: root,
    });
    const { stdout: changedHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    await writeFile(
      metaPath,
      `${JSON.stringify({ ...meta, head_sha: changedHead.trim() }, null, 2)}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}/pr/meta.json`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: refresh PR metadata"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        blockers: { code: string }[];
        next_action: { code: string; command: string | null };
        execution_packet: { actionKind: string; exactArgv: string[] | null };
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("quality_review_stale");
      expect(parsed.next_action).toEqual(
        expect.objectContaining({ code: "quality_review_required", command: null }),
      );
      expect(parsed.execution_packet).toMatchObject({ actionKind: "stop", exactArgv: null });
      expect(nextIo.stdout).not.toContain("--verdict pass");
      expect(nextIo.stdout).not.toContain("Quality review passed.");
      expect(nextIo.stdout).not.toContain("No blocking findings.");
    } finally {
      nextIo.restore();
    }
  });

  it("hands fresh evaluator rework findings back to the CODER without a PR command", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(root, "Exercise rework routing.");
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
      "--verdict",
      "rework",
      "--summary",
      "The implementation requires a focused route correction.",
      "--finding",
      "The current route advances to PR handling instead of returning control to implementation.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: evaluator rework artifacts"], { cwd: root });

    const qualityRoot = path.join(root, ".agentplane", "tasks", taskId, "quality");
    const [reviewDir] = await readdir(qualityRoot);
    expect(reviewDir).toBeTruthy();
    const reportPath = path.join(qualityRoot, reviewDir!, "quality-report.json");
    const reportBeforeRoute = await readFile(reportPath, "utf8");

    const freshReviewIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(freshReviewIo.stdout) as {
        execution_packet: { recommendedRole: string };
        next_action: { code: string; command: string | null };
      };
      expect(parsed.next_action).toMatchObject({
        code: "implementation_rework_required",
        command: null,
      });
      expect(parsed.execution_packet.recommendedRole).toBe("CODER");
    } finally {
      freshReviewIo.restore();
    }

    await runCliSilent([
      "verify",
      taskId,
      "--rework",
      "--by",
      "EVALUATOR",
      "--note",
      "Implementation rework is required by the persisted evaluator report.",
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: record implementation rework"], {
      cwd: root,
    });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: {
          phase: string;
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
          mutationPathHint: string | null;
          nextCommand: string | null;
          blocker: { code: string };
        };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          recommendedRole: string;
          exactArgv: string[] | null;
          mustNot: string[];
        };
        operator_guidance: {
          canExecuteNow: boolean;
          operatorAction: string;
          executorContext: {
            currentAgentMustExecute: boolean;
            instruction: string;
          };
        };
        next_action: { code: string; command: string | null; summary: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain(
        "implementation_rework_required",
      );
      expect(parsed.route_oracle).toMatchObject({
        phase: "implementation_rework_required",
        authoritativeCheckout: "task_worktree",
        nextCommand: null,
        blocker: { code: "implementation_rework_required" },
      });
      expect(typeof parsed.route_oracle.authoritativeCheckoutPath).toBe("string");
      expect(typeof parsed.route_oracle.mutationPathHint).toBe("string");
      expect(parsed.route_oracle.mutationPathHint).toBe(
        parsed.route_oracle.authoritativeCheckoutPath,
      );
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "stop",
        safeToMutate: true,
        recommendedRole: "CODER",
        exactArgv: null,
      });
      expect(parsed.operator_guidance).toMatchObject({
        canExecuteNow: false,
        operatorAction: "stop",
        executorContext: {
          currentAgentMustExecute: true,
          instruction: "current_agent_performs_semantic_rework",
        },
      });
      expect(parsed.execution_packet.mustNot.join("\n")).toContain(
        "do not update, open, publish, queue, or integrate the PR",
      );
      expect(parsed.next_action).toMatchObject({
        code: "implementation_rework_required",
        command: null,
      });
      expect(parsed.next_action.summary).not.toContain("The implementation requires");
      expect(nextIo.stdout).not.toContain("--verdict pass");
      expect(nextIo.stdout).not.toContain("Quality review passed.");
      expect(nextIo.stdout).not.toContain("No blocking findings.");
    } finally {
      nextIo.restore();
    }

    expect(await readFile(reportPath, "utf8")).toBe(reportBeforeRoute);

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["flow", "repair", taskId, "--dry-run", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(repairIo.stdout) as {
        repair_plan: { code: string; command: string | null; mutates: boolean }[];
      };
      expect(parsed.repair_plan).toContainEqual(
        expect.objectContaining({
          code: "implementation_rework_required",
          command: null,
          mutates: false,
        }),
      );
    } finally {
      repairIo.restore();
    }
  });

  it("records pre-merge closure before integration for a quality-reviewed open PR", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(
      root,
      "Exercise pre-merge closure routing.",
    );
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
      "--verdict",
      "pass",
      "--summary",
      "Quality review passed.",
      "--finding",
      "No route regression found.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: quality artifacts"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; authoritativeCheckout: string; blocker: { code: string } };
        execution_packet: { recommendedRole: string; evidenceMissing: string[] };
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pre_merge_closure_missing");
      expect(parsed.route_oracle).toMatchObject({
        phase: "pre_merge_closure_needed",
        authoritativeCheckout: "task_worktree",
        blocker: { code: "pre_merge_closure_missing" },
      });
      expect(parsed.execution_packet.recommendedRole).toBe("CODER");
      expect(parsed.execution_packet.evidenceMissing).toContain("pre_merge_closure");
      expect(parsed.next_action.code).toBe("record_pre_merge_closure");
      expect(parsed.next_action.command).toContain(`agentplane finish ${taskId}`);
      expect(parsed.next_action.command).toContain("--pre-merge-closure");
    } finally {
      nextIo.restore();
    }
  });
});
