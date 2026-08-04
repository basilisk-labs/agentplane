import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  recordVerificationOk,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

const execFileAsync = promisify(execFile);

async function runJson<T>(args: string[]): Promise<T> {
  const io = captureStdIO();
  try {
    expect(await runCli(args)).toBe(0);
    return JSON.parse(io.stdout) as T;
  } finally {
    io.restore();
  }
}

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "new",
        "--title",
        "Verification freshness task",
        "--description",
        "Exercise verification freshness in branch_pr routing.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--allow-duplicate",
        "--root",
        root,
      ]),
    ).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

describe("runCli route decision verification freshness", () => {
  it("requires remote truth before declaring a done branch_pr task terminal", async () => {
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
      "Exercise done route decisions.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent(["task", "set-status", taskId, "DOING", "--force", "--yes", "--root", root]);
    await execFileAsync("git", ["add", "--all"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: prepare done route fixture"], { cwd: root });
    await recordVerificationOk(root, taskId);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await writeFile(
      readmePath,
      readme
        .replace('status: "DOING"', 'status: "DONE"')
        .replace(
          "commit: null",
          `commit:\n  hash: "${implementationHead.trim()}"\n  message: "Merge PR #1"`,
        ),
      "utf8",
    );
    const first = await runJson<{
      blockers: { code: string }[];
      oracle: { phase: string; nextCommand: string };
    }>(["task", "status", taskId, "--route", "--json", "--root", root]);
    expect(first.blockers).toEqual([]);
    expect(first.oracle.phase).toBe("side_effect_authority_required");
    await runCliSilent([...first.oracle.nextCommand.split(" ").slice(1), "--root", root]);

    const second = await runJson<{
      blockers: { code: string }[];
      nextAction: { code: string; command: string | null };
      oracle: { phase: string };
    }>(["task", "status", taskId, "--route", "--json", "--root", root]);
    expect(second.blockers).toEqual([]);
    expect(second.oracle.phase).toBe("remote_route_refresh_needed");
    expect(second.nextAction).toMatchObject({
      code: "refresh_remote_route",
      command: `agentplane task next-action ${taskId} --remote --explain`,
    });
  });

  it("keeps the hosted-evidence companion strict by marking a semantic branch advance stale", async () => {
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
      "Require verification evidence for the current semantic implementation head.",
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verification-freshness`], {
      cwd: root,
    });
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: exercise verification freshness on the task branch.",
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", "--all"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: prepare verification fixture"], {
      cwd: root,
    });

    await writeFile(path.join(root, "impl.txt"), "first implementation\n", "utf8");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: first implementation"], { cwd: root });
    const { stdout: firstHead } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--commit",
      firstHead.trim(),
      "--author",
      "CODER",
      "--body",
      "Implementation committed: first semantic implementation.",
      "--root",
      root,
    ]);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", "--all"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: record fresh verification"], { cwd: root });

    const fresh = await runJson<{ blockers: { code: string }[] }>([
      "task",
      "status",
      taskId,
      "--route",
      "--json",
      "--root",
      root,
    ]);
    expect(fresh.blockers.map((blocker) => blocker.code)).not.toContain("verification_required");

    await writeFile(path.join(root, "impl.txt"), "second implementation\n", "utf8");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: second implementation"], { cwd: root });
    const { stdout: secondHead } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--commit",
      secondHead.trim(),
      "--author",
      "CODER",
      "--body",
      "Implementation committed: second semantic implementation.",
      "--root",
      root,
    ]);

    const stale = await runJson<{ blockers: { code: string; summary: string }[] }>([
      "task",
      "status",
      taskId,
      "--route",
      "--json",
      "--root",
      root,
    ]);
    expect(stale.blockers).toContainEqual({
      code: "verification_required",
      summary: "the passing verification record does not cover the current implementation head",
    });
  });
});
