import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  defaultConfig,
  getStagedFiles,
  getUnstagedFiles,
  getUnstagedTrackedFiles,
  saveConfig,
} from "../index.js";

const execFileAsync = promisify(execFile);

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-utils-test-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  await saveConfig(agentplaneDir, defaultConfig());
  await execFileAsync("git", ["add", ".agentplane/config.json"], { cwd: root });
  await execFileAsync(
    "git",
    [
      "-c",
      "user.email=agentplane@example.com",
      "-c",
      "user.name=Agentplane",
      "commit",
      "-m",
      "init",
    ],
    { cwd: root },
  );
  return root;
}

async function configureGitUser(root: string): Promise<void> {
  await execFileAsync("git", ["config", "user.email", "agentplane@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Agentplane"], { cwd: root });
}

describe("git-utils", () => {
  it("lists staged files", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    const staged = await getStagedFiles({ cwd: root, rootOverride: root });
    expect(staged).toEqual(["file.txt"]);
  });

  it("lists unstaged files", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const unstaged = await getUnstagedFiles({ cwd: root, rootOverride: root });
    expect(unstaged).toEqual(["file.txt"]);
  });

  it("includes modified files when both staged and unstaged", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await writeFile(path.join(root, "file.txt"), "y", "utf8");
    const unstaged = await getUnstagedFiles({ cwd: root, rootOverride: root });
    expect(unstaged).toEqual(["file.txt"]);
  });

  it("ignores staged-only files", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    const unstaged = await getUnstagedFiles({ cwd: root, rootOverride: root });
    expect(unstaged).toEqual([]);
  });

  it("lists unstaged tracked files only (ignores untracked)", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "tracked.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
    await writeFile(path.join(root, "untracked.txt"), "y", "utf8");

    const tracked = await getUnstagedTrackedFiles({ cwd: root, rootOverride: root });
    expect(tracked).toEqual([]);
  });

  it("includes renamed files when modified after rename", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "init"], { cwd: root });

    await execFileAsync("git", ["mv", "file.txt", "renamed.txt"], { cwd: root });
    await writeFile(path.join(root, "renamed.txt"), "y", "utf8");

    const unstaged = await getUnstagedFiles({ cwd: root, rootOverride: root });
    expect(unstaged).toContain("renamed.txt");
  }, 15_000);

  it("ignores renamed-only files without modifications", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "init"], { cwd: root });

    await execFileAsync("git", ["mv", "file.txt", "renamed.txt"], { cwd: root });

    const unstaged = await getUnstagedFiles({ cwd: root, rootOverride: root });
    expect(unstaged).toEqual([]);
  });
});
