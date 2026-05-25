import { describe } from "vitest";

import {
  PR_FLOW_LONG_TIMEOUT_MS,
  captureStdIO,
  commitPathsIfChanged,
  configureGitUser,
  defaultConfig,
  execFile,
  expect,
  it,
  mkGitRepoRootWithBranch,
  path,
  promisify,
  readFile,
  rm,
  runCli,
  runCliSilent,
  writeConfig,
  writeFile,
} from "@agentplane/testkit/cli-core-pr-flow";

describe("runCli PR check remote artifact fallback", { timeout: PR_FLOW_LONG_TIMEOUT_MS }, () => {
  it("reads PR artifacts from a remote-only task branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    const remoteRoot = path.join(root, "origin.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check remote branch fallback",
        "--description",
        "Base checkout should validate PR artifacts from a remote task branch",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/remote-pr-artifacts`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      branch,
      "--root",
      root,
    ]);
    await commitPathsIfChanged(root, [`.agentplane/tasks/${taskId}`], `${taskId} add pr artifacts`);
    const { stdout: artifactHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    meta.head_sha = artifactHead.trim();
    await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
    await commitPathsIfChanged(
      root,
      [`.agentplane/tasks/${taskId}`],
      `${taskId} mark pr artifacts fresh`,
    );
    await execFileAsync("git", ["push", "--no-verify", "-u", "origin", branch], { cwd: root });
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await execFileAsync("git", ["branch", "-D", branch], { cwd: root });
    await rm(path.join(root, ".agentplane", "tasks", taskId, "pr"), {
      recursive: true,
      force: true,
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  });
});
