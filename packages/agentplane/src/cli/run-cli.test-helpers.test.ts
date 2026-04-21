import { execFile } from "node:child_process";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { cleanGitEnv, commitAll, configureGitUser, mkGitRepoRoot } from "@agentplane/testkit";

const execFileAsync = promisify(execFile);

describe("run-cli.test-helpers", () => {
  it("commitAll bypasses repo-local git hooks in fixture repositories", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(path.join(root, "tracked.txt"), "fixture\n", "utf8");

    const hooksDir = path.join(root, "broken-hooks");
    await mkdir(hooksDir, { recursive: true });
    const hookPath = path.join(hooksDir, "pre-commit");
    await writeFile(hookPath, "#!/bin/sh\nexit 1\n", "utf8");
    await chmod(hookPath, 0o755);

    await execFileAsync("git", ["config", "core.hooksPath", hooksDir], {
      cwd: root,
      env: cleanGitEnv(),
    });

    await expect(commitAll(root, "fixture commit")).resolves.toBeUndefined();

    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(stdout.trim()).not.toBe("");
  });
});
