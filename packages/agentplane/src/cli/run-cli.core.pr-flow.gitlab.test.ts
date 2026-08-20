import { describe } from "vitest";

import {
  PR_FLOW_INTEGRATION_TIMEOUT_MS,
  captureStdIO,
  chmod,
  cleanGitEnv,
  configureGitUser,
  configurePushableOrigin,
  defaultConfig,
  execFile,
  expect,
  it,
  mkGitRepoRootWithBranch,
  mkTempDir,
  path,
  promisify,
  readFile,
  runCli,
  runCliSilent,
  writeConfig,
  writeFile,
} from "@agentplane/testkit/cli-core-pr-flow";

async function installFakeGlab(opts: {
  branch: string;
}): Promise<{ fakeBin: string; logPath: string }> {
  const fakeBin = await mkTempDir();
  const logPath = path.join(fakeBin, "glab.log");
  const glabPath = path.join(fakeBin, process.platform === "win32" ? "glab.cmd" : "glab");
  const source = [
    "#!/usr/bin/env node",
    'const fs = require("node:fs");',
    "const args = process.argv.slice(2);",
    `fs.appendFileSync(${JSON.stringify(logPath)}, JSON.stringify(args) + "\\n");`,
    'if (args[0] !== "api") process.exit(2);',
    'const hostIndex = args.indexOf("--hostname");',
    'if (hostIndex < 0 || args[hostIndex + 1] !== "gitlab.com") process.exit(3);',
    'const endpoint = args[hostIndex + 2] || "";',
    'const methodIndex = args.indexOf("--method");',
    'const method = methodIndex >= 0 ? args[methodIndex + 1] : "GET";',
    'if (endpoint === "projects/example%2Frepo") { process.stdout.write(JSON.stringify({ id: 7 })); process.exit(0); }',
    `if (endpoint.includes("/merge_requests?") && method === "GET") { process.stdout.write("[]"); process.exit(0); }`,
    `if (endpoint.endsWith("/merge_requests") && method === "POST") { process.stdout.write(JSON.stringify({ iid: 42, web_url: "https://gitlab.com/example/repo/-/merge_requests/42", state: "opened", source_branch: ${JSON.stringify(opts.branch)}, target_branch: "main", source_project_id: 7, sha: "head-sha", has_conflicts: false, detailed_merge_status: "mergeable", diff_refs: { base_sha: "base-sha", head_sha: "head-sha" } })); process.exit(0); }`,
    "process.stderr.write(`unexpected glab endpoint: ${method} ${endpoint}`);",
    "process.exit(4);",
    "",
  ].join("\n");
  await writeFile(glabPath, source, "utf8");
  await chmod(glabPath, 0o755);
  return { fakeBin, logPath };
}

describe("runCli GitLab change-request flow", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
  it("creates a GitLab MR with explicit hostname and persists provider identity", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["remote", "add", "origin", "https://gitlab.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await configurePushableOrigin(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskOutput = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "GitLab MR create",
          "--description",
          "Exercise provider-neutral MR creation without live provider access.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "gitlab",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = taskOutput.stdout.trim();
    } finally {
      taskOutput.restore();
    }

    const branch = `task/${taskId}/gitlab-create`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "seed task branch"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGlab({ branch });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    const output = captureStdIO();
    try {
      const code = await runCli([
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
      expect(code, output.stderr).toBe(0);
      expect(output.stdout).toContain("created GitLab MR #42");
    } finally {
      output.restore();
      process.env.PATH = originalPath;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(meta).toMatchObject({
      pr_number: 42,
      status: "OPEN",
      provider: {
        schema_version: 1,
        kind: "gitlab",
        hostname: "gitlab.com",
        remote: "origin",
        source_project: "example/repo",
        target_project: "example/repo",
      },
    });
    const logText = await readFile(logPath, "utf8");
    const calls = logText
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as string[]);
    expect(calls.length).toBeGreaterThan(0);
    expect(calls.every((args) => args[0] === "api" && args.includes("--hostname"))).toBe(true);
  });
});
