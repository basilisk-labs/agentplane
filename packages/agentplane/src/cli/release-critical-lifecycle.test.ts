import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { readTask } from "@agentplaneorg/core/tasks";
import { captureStdIO } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

const execFileAsync = promisify(execFile);

async function initGitRepo(root: string): Promise<void> {
  await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "ci@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "CI"], { cwd: root });
  await writeFile(path.join(root, "README.md"), "release-critical lifecycle\n", "utf8");
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "init"], { cwd: root });
}

async function runCliWithOutput(root: string, args: string[]) {
  const io = captureStdIO();
  let code = 1;
  try {
    code = await runCli(["--root", root, ...args]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function gitOutput(root: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: root });
  return stdout.trim();
}

describe("release-critical direct lifecycle", () => {
  it("runs init through task finish as the v0.3 freeze lifecycle indicator", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-release-lifecycle-"));
    const previousAgentplaneHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = path.join(root, ".agentplane-home");
    try {
      await initGitRepo(root);

      const init = await runCliWithOutput(root, [
        "init",
        "--workflow",
        "direct",
        "--backend",
        "local",
        "--hooks",
        "no",
        "--require-network-approval",
        "true",
        "--yes",
      ]);
      expect(init.code).toBe(0);

      const workflow = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
      expect(workflow).toContain("mode: direct");

      const taskNew = await runCliWithOutput(root, [
        "task",
        "new",
        "--title",
        "Release critical lifecycle",
        "--description",
        "Exercise the v0.3 direct lifecycle freeze path.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "echo lifecycle ok",
      ]);
      expect(taskNew.code).toBe(0);
      const taskId = taskNew.stdout.trim();
      expect(taskId).toMatch(/^\d{12}-[A-Z0-9]+$/);

      const planSet = await runCliWithOutput(root, [
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1. Touch the release-critical lifecycle artifact.\n2. Record verification and finish.",
        "--updated-by",
        "CODER",
      ]);
      expect(planSet.code).toBe(0);

      const planApprove = await runCliWithOutput(root, [
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
      ]);
      expect(planApprove.code).toBe(0);

      const startReady = await runCliWithOutput(root, [
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: run the release-critical direct lifecycle freeze indicator end to end.",
      ]);
      expect(startReady.code).toBe(0);

      const verifyShow = await runCliWithOutput(root, ["task", "verify-show", taskId]);
      expect(verifyShow.code).toBe(0);
      expect(verifyShow.stdout).toContain("echo lifecycle ok");

      await writeFile(path.join(root, "lifecycle.txt"), "release-critical lifecycle\n", "utf8");
      await execFileAsync("git", ["add", "lifecycle.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "lifecycle change"], { cwd: root });
      const implementationCommit = await gitOutput(root, ["rev-parse", "HEAD"]);

      const verify = await runCliWithOutput(root, [
        "verify",
        taskId,
        "--ok",
        "--by",
        "CODER",
        "--note",
        "Command: release-critical lifecycle flow. Result: pass. Evidence: init, task new, plan, start-ready, verify-show, verify, and finish path reached verification.",
      ]);
      expect(verify.code).toBe(0);
      const evaluatorVerify = await runCliWithOutput(root, [
        "evaluator",
        "run",
        taskId,
        "--verdict",
        "pass",
        "--summary",
        "EVALUATOR quality gate passed for release-critical lifecycle.",
        "--finding",
        "Release-critical lifecycle reached verification with committed implementation evidence.",
        "--evidence",
        "lifecycle.txt",
      ]);
      expect(evaluatorVerify.code).toBe(0);

      const finish = await runCliWithOutput(root, [
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: release-critical direct lifecycle freeze indicator completed with init, plan, start, verify, and finish.",
        "--result",
        "release-critical lifecycle indicator passed",
        "--commit",
        implementationCommit,
      ]);
      expect(finish.code).toBe(0);
      expect(finish.stdout).toContain("finished");

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.status).toBe("DONE");
      expect(task.frontmatter.verification?.state).toBe("ok");
      expect(task.frontmatter.commit?.hash).toBe(implementationCommit);
      expect(await gitOutput(root, ["status", "--short", "--untracked-files=no"])).toBe("");
    } finally {
      if (previousAgentplaneHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = previousAgentplaneHome;
      await rm(root, { recursive: true, force: true });
    }
  }, 120_000);
});
