import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { mkGitRepoRootWithBranch } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  resolveVerificationInputIdentity,
  verificationInputInvalidationReason,
  type VerificationEnvironment,
} from "./task-verification-input.js";

const execFileAsync = promisify(execFile);
const TASK_ID = "202608102243-1RG86M";
const ENVIRONMENT: VerificationEnvironment = {
  platform: "test",
  architecture: "test",
  node_major: "24",
  bun_major: "1",
};

async function commitPath(
  root: string,
  relPath: string,
  content: string,
  message: string,
): Promise<string> {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  await execFileAsync("git", ["add", "--", relPath], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

async function identity(root: string, targetSha: string, verifySteps = "Run tests.") {
  const value = await resolveVerificationInputIdentity({
    gitRoot: root,
    workflowDir: ".agentplane/tasks",
    taskIds: [TASK_ID],
    targetSha,
    verifySteps,
    workflowMode: "branch_pr",
    environment: ENVIRONMENT,
    baseRef: "main",
  });
  if (!value) throw new Error("expected verification input identity");
  return value;
}

async function makeTaskBranch(): Promise<{ root: string; implementationSha: string }> {
  const root = await mkGitRepoRootWithBranch("main");
  await commitPath(root, "package.json", '{"name":"verification-input"}\n', "seed context");
  await execFileAsync("git", ["checkout", "-b", "task/verification-input"], { cwd: root });
  const implementationSha = await commitPath(
    root,
    "src/feature.ts",
    "export const feature = true;\n",
    "implement feature",
  );
  return { root, implementationSha };
}

describe("task verification input identity", () => {
  it("reuses one receipt across lifecycle-only task artifact commits", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const before = await identity(root, implementationSha);
    const lifecycleSha = await commitPath(
      root,
      `.agentplane/tasks/${TASK_ID}/README.md`,
      "verification lifecycle metadata\n",
      "record verification metadata",
    );
    const after = await identity(root, lifecycleSha);

    expect(after.digest).toBe(before.digest);
    expect(after.implementation.digest).toBe(before.implementation.digest);
    expect(after.implementation.target_sha).not.toBe(before.implementation.target_sha);
    expect(verificationInputInvalidationReason({ recorded: before, current: after })).toBe(
      "verification_current",
    );
  });

  it("reuses one receipt after an identical implementation is rebased", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const before = await identity(root, implementationSha);
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await commitPath(root, "docs/base.md", "unrelated base change\n", "advance base");
    await execFileAsync("git", ["checkout", "task/verification-input"], { cwd: root });
    await execFileAsync("git", ["rebase", "main"], { cwd: root });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const after = await identity(root, stdout.trim());

    expect(after.implementation.target_sha).not.toBe(before.implementation.target_sha);
    expect(after.digest).toBe(before.digest);
  });

  it("invalidates the receipt for source or Verify Steps changes", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const before = await identity(root, implementationSha);
    const sourceSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = false;\n",
      "change feature",
    );
    const sourceChanged = await identity(root, sourceSha);
    const stepsChanged = await identity(root, implementationSha, "Run tests and lint.");

    expect(verificationInputInvalidationReason({ recorded: before, current: sourceChanged })).toBe(
      "verification_implementation_changed",
    );
    expect(verificationInputInvalidationReason({ recorded: before, current: stepsChanged })).toBe(
      "verification_steps_changed",
    );
  });

  it("invalidates the receipt when dependency context or runtime contract changes", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const before = await identity(root, implementationSha);
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await commitPath(
      root,
      "package.json",
      '{"name":"verification-input","dependencies":{"x":"1"}}\n',
      "change dependency context",
    );
    await execFileAsync("git", ["checkout", "task/verification-input"], { cwd: root });
    await execFileAsync("git", ["rebase", "main"], { cwd: root });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const contextChanged = await identity(root, stdout.trim());
    const environmentChanged = await resolveVerificationInputIdentity({
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      taskIds: [TASK_ID],
      targetSha: stdout.trim(),
      verifySteps: "Run tests.",
      workflowMode: "branch_pr",
      environment: { ...ENVIRONMENT, node_major: "25" },
      baseRef: "main",
    });
    if (!environmentChanged) throw new Error("expected environment identity");

    expect(verificationInputInvalidationReason({ recorded: before, current: contextChanged })).toBe(
      "verification_context_changed",
    );
    expect(
      verificationInputInvalidationReason({
        recorded: contextChanged,
        current: environmentChanged,
      }),
    ).toBe("verification_environment_changed");
  });
});
