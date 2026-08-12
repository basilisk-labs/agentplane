import { execFile } from "node:child_process";
import { mkdir, unlink, writeFile } from "node:fs/promises";
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

async function identity(
  root: string,
  targetSha: string,
  verifySteps = "Run tests.",
  verificationDetails?: string,
) {
  const value = await resolveVerificationInputIdentity({
    gitRoot: root,
    workflowDir: ".agentplane/tasks",
    taskIds: [TASK_ID],
    targetSha,
    verifySteps,
    workflowMode: "branch_pr",
    environment: ENVIRONMENT,
    baseRef: "main",
    verificationDetails,
  });
  if (!value) throw new Error("expected verification input identity");
  return value;
}

async function directIdentity(root: string, targetSha: string) {
  const value = await resolveVerificationInputIdentity({
    gitRoot: root,
    workflowDir: ".agentplane/tasks",
    taskIds: [TASK_ID],
    targetSha,
    verifySteps: "Run tests.",
    workflowMode: "direct",
    environment: ENVIRONMENT,
  });
  if (!value) throw new Error("expected direct verification input identity");
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

  it("reuses one direct-mode receipt across lifecycle-only task artifact commits", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement direct feature",
    );
    const before = await directIdentity(root, implementationSha);
    const lifecycleSha = await commitPath(
      root,
      `.agentplane/tasks/${TASK_ID}/README.md`,
      "direct lifecycle metadata\n",
      "record direct lifecycle",
    );
    const after = await directIdentity(root, lifecycleSha);
    const unrelatedLifecycleSha = await commitPath(
      root,
      ".agentplane/tasks/OTHER/README.md",
      "unrelated direct lifecycle metadata\n",
      "record unrelated direct lifecycle",
    );
    const afterUnrelatedLifecycle = await directIdentity(root, unrelatedLifecycleSha);

    expect(after.implementation.strategy).toBe("tree");
    expect(after.digest).toBe(before.digest);
    expect(afterUnrelatedLifecycle.digest).toBe(before.digest);
    expect(after.implementation.target_sha).not.toBe(before.implementation.target_sha);
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

  it("binds the receipt to the deterministic verification contract digest", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const base = {
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      taskIds: [TASK_ID],
      targetSha: implementationSha,
      verifySteps: "Run tests.",
      workflowMode: "branch_pr" as const,
      environment: ENVIRONMENT,
      baseRef: "main",
    };
    const before = await resolveVerificationInputIdentity({
      ...base,
      verificationContractDigest: `sha256:${"a".repeat(64)}`,
    });
    const after = await resolveVerificationInputIdentity({
      ...base,
      verificationContractDigest: `sha256:${"b".repeat(64)}`,
    });
    if (!before || !after) throw new Error("expected contract-bound verification inputs");

    expect(before.schema_version).toBe(3);
    expect(before.digest).not.toBe(after.digest);
    expect(verificationInputInvalidationReason({ recorded: before, current: after })).toBe(
      "verification_contract_changed",
    );
  });

  it("invalidates the receipt when implementation-significant whitespace changes", async () => {
    const { root } = await makeTaskBranch();
    const indentedSha = await commitPath(
      root,
      "src/indentation.py",
      "if True:\n    result = 1\n",
      "add indented implementation",
    );
    const before = await identity(root, indentedSha);
    const changedSha = await commitPath(
      root,
      "src/indentation.py",
      "if True:\n  result = 1\n",
      "change significant indentation",
    );
    const after = await identity(root, changedSha);

    expect(after.implementation.digest).not.toBe(before.implementation.digest);
    expect(verificationInputInvalidationReason({ recorded: before, current: after })).toBe(
      "verification_implementation_changed",
    );
  });

  it("invalidates the receipt when a verification-tool configuration changes", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const before = await identity(root, implementationSha);
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await commitPath(root, "knip.json", '{"entry":["src/index.ts"]}\n', "change knip config");
    await execFileAsync("git", ["checkout", "task/verification-input"], { cwd: root });
    await execFileAsync("git", ["rebase", "main"], { cwd: root });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const after = await identity(root, stdout.trim());

    expect(after.context.paths).toContain("knip.json");
    expect(verificationInputInvalidationReason({ recorded: before, current: after })).toBe(
      "verification_context_changed",
    );
  });

  it("invalidates the receipt when referenced mutable evidence changes", async () => {
    const { root, implementationSha } = await makeTaskBranch();
    const evidencePath = ".agentplane/cache/runtime-evidence.json";
    await mkdir(path.dirname(path.join(root, evidencePath)), { recursive: true });
    await writeFile(path.join(root, evidencePath), '{"result":"pass"}\n', "utf8");
    const details = [
      "Command: bun test",
      "Result: pass",
      `Evidence: ${evidencePath}#summary`,
      "Scope: verification input identity",
    ].join("\n");
    const before = await identity(root, implementationSha, "Run tests.", details);
    await writeFile(path.join(root, evidencePath), '{"result":"replacement"}\n', "utf8");
    const after = await identity(root, implementationSha, "Run tests.", details);

    expect(before.evidence.references).toEqual([
      expect.objectContaining({ path: evidencePath, fragment: "summary", source: "filesystem" }),
    ]);
    expect(verificationInputInvalidationReason({ recorded: before, current: after })).toBe(
      "verification_evidence_changed",
    );
  });

  it("preserves evidence identity when the same committed artifact is read from Git", async () => {
    const { root } = await makeTaskBranch();
    const evidencePath = `.agentplane/tasks/${TASK_ID}/evidence/runtime.json`;
    const evidenceSha = await commitPath(
      root,
      evidencePath,
      '{"result":"pass"}\n',
      "record committed evidence",
    );
    const details = [
      "Command: bun test",
      "Result: pass",
      `Evidence: ${evidencePath}#summary`,
      "Scope: committed evidence fallback",
    ].join("\n");
    const fromFilesystem = await identity(root, evidenceSha, "Run tests.", details);
    await unlink(path.join(root, evidencePath));
    const fromGit = await resolveVerificationInputIdentity({
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      taskIds: [TASK_ID],
      targetSha: evidenceSha,
      verifySteps: "Run tests.",
      workflowMode: "branch_pr",
      environment: ENVIRONMENT,
      baseRef: "main",
      verificationDetails: details,
      evidenceRef: evidenceSha,
    });
    if (!fromGit) throw new Error("expected Git evidence identity");

    expect(fromFilesystem.evidence.references[0]?.source).toBe("filesystem");
    expect(fromGit.evidence.references[0]?.source).toBe("git");
    expect(fromGit.evidence.digest).toBe(fromFilesystem.evidence.digest);
    expect(fromGit.digest).toBe(fromFilesystem.digest);
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
