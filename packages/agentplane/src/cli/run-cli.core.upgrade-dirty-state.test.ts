import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  createUpgradeBundle,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli upgrade dirty state", () => {
  it("upgrade warns and preserves unrelated dirty tracked files while applying", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");
    await writeFile(path.join(root, "tracked.txt"), "dirty\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "tracked.txt"), "dirty changed\n", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("pre-existing tracked changes detected");
      expect(io.stderr).toContain(".agentplane/.upgrade/user-dirty/tracked.patch");
    } finally {
      io.restore();
    }

    const trackedText = await readFile(path.join(root, "tracked.txt"), "utf8");
    expect(trackedText).toBe("dirty changed\n");
    const patchText = await readFile(
      path.join(root, ".agentplane", ".upgrade", "user-dirty", "tracked.patch"),
      "utf8",
    );
    expect(patchText).toContain("dirty changed");

    const { stdout: statusOut } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(String(statusOut ?? "")).toContain(" M tracked.txt");

    const { stdout: showOut } = await execFileAsync(
      "git",
      ["show", "--name-only", "--format=", "HEAD"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(String(showOut ?? "")).toContain("AGENTS.md");
    expect(String(showOut ?? "")).not.toContain("tracked.txt");
  });

  it("upgrade unstages pre-existing tracked edits before creating the upgrade commit", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");
    await writeFile(path.join(root, "tracked.txt"), "dirty\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "tracked.txt"), "dirty staged\n", "utf8");
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root, env: cleanGitEnv() });

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("Unstaged pre-existing paths");
      expect(io.stderr).toContain("tracked.txt");
    } finally {
      io.restore();
    }

    const { stdout: statusOut } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(String(statusOut ?? "")).toContain(" M tracked.txt");

    const { stdout: showOut } = await execFileAsync(
      "git",
      ["show", "--name-only", "--format=", "HEAD"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(String(showOut ?? "")).toContain("AGENTS.md");
    expect(String(showOut ?? "")).not.toContain("tracked.txt");
  });
});
