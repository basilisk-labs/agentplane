import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { getStagedFiles, getUnstagedFiles } from "./index.js";

const execFileAsync = promisify(execFile);

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-utils-test-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
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
});
