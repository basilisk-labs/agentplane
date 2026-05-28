import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { describe, expect, it } from "vitest";

import { ensureGitClean } from "./work-start.direct.js";

async function initRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-work-"));
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Direct Work Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "direct-work@example.com"], {
    cwd: root,
  });
  await mkdir(path.join(root, ".agentplane"), { recursive: true });
  await writeFile(path.join(root, "README.md"), "# Fixture\n", "utf8");
  await writeFile(path.join(root, ".agentplane", ".keep"), "\n", "utf8");
  await execFileAsync("git", ["add", "README.md", ".agentplane/.keep"], { cwd: root });
  await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: initial"], { cwd: root });
  return root;
}

describe("direct work start clean check", () => {
  it("does not allow legacy tasks.json dirtiness as task workflow state", async () => {
    const root = await initRepo();
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}\n", "utf8");

    await expect(ensureGitClean(root)).rejects.toMatchObject({
      code: "E_GIT",
    });
  });

  it("still allows canonical task README dirtiness", async () => {
    const root = await initRepo();
    await mkdir(path.join(root, ".agentplane", "tasks", "T-1"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks", "T-1", "README.md"), "# T-1\n", "utf8");

    await expect(ensureGitClean(root)).resolves.toBeUndefined();
  });
});
