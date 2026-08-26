import { describe, expect, it } from "vitest";

import {
  cleanGitEnv,
  configureGitUser,
  execFile,
  mkGitRepoRootWithBranch,
  mkdtemp,
  os,
  path,
  promisify,
  writeFile,
} from "@agentplane/testkit/cli-core-pr-flow";

import { resolveProviderBaseBranch } from "./provider-base.js";

describe("exact-SHA provider base resolution", () => {
  it("requires an exact matching local and live provider base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "-m", "seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: baseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const baseSha = baseStdout.trim();
    const remote = await mkdtemp(path.join(os.tmpdir(), "agentplane-exact-base-remote-"));
    await execFileAsync("git", ["init", "--bare", remote], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["remote", "add", "origin", remote], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["push", "-u", "origin", "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", "agentplane.baseBranch", "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: "main",
        baseSha: "b".repeat(40),
      }),
    ).resolves.toBe("main");

    await execFileAsync("git", ["config", "agentplane.baseBranch", baseSha], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).rejects.toThrow("cannot resolve a configured provider base branch");
    await execFileAsync("git", ["config", "agentplane.baseBranch", "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha: "b".repeat(40),
      }),
    ).rejects.toThrow("inconsistent with the frozen Task execution base_sha");

    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).resolves.toBe("main");

    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha.toUpperCase(),
        baseSha: baseSha.toUpperCase(),
      }),
    ).resolves.toBe("main");

    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: "a".repeat(40),
        baseSha: "a".repeat(40),
      }),
    ).rejects.toThrow("does not match configured provider base branch main");

    await execFileAsync("git", ["update-ref", "-d", "refs/remotes/origin/main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).resolves.toBe("main");

    await execFileAsync("git", ["remote", "rename", "origin", "upstream"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", "branch.main.remote", "upstream"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).resolves.toBe("main");
    await execFileAsync("git", ["remote", "rename", "upstream", "origin"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", "branch.main.remote", "origin"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    await execFileAsync("git", ["commit", "--allow-empty", "-m", "local base drift"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).rejects.toThrow("ambiguous");

    await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["reset", "--hard", baseSha], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["update-ref", "refs/remotes/origin/main", baseSha], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await expect(
      resolveProviderBaseBranch({
        gitRoot: root,
        cwd: root,
        workflowMode: "branch_pr",
        branch: "main",
        baseRef: baseSha,
        baseSha,
      }),
    ).rejects.toThrow("live origin/main resolve to different commits");
  });
});
