import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { extractTaskSuffix, isGenericSubject, validateCommitSubject } from "./commit-policy.js";

const execFileAsync = promisify(execFile);

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-commit-policy-test-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
}

describe("commit-policy", () => {
  it("extracts task suffix", () => {
    expect(extractTaskSuffix("202601010101-ABCDEF")).toBe("ABCDEF");
  });

  it("flags generic subjects", () => {
    const tokens = ["update", "tasks", "wip"];
    expect(isGenericSubject("update", tokens)).toBe(true);
    expect(isGenericSubject("update tasks", tokens)).toBe(true);
    expect(isGenericSubject("real feature", tokens)).toBe(false);
  });

  it("validates subject includes suffix or task id", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF add base branch pinning",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(true);
  });

  it("rejects missing suffix and generic subject", () => {
    const result = validateCommitSubject({
      subject: "update tasks",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("commit subject must include task id or suffix");
    expect(result.errors.join("\n")).toContain("commit subject is too generic");
  });

  it("integrates with git commit message", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "hello", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.email=test@example.com",
        "-c",
        "user.name=Tester",
        "commit",
        "-m",
        "✨ ABCDEF commit policy integration test",
      ],
      { cwd: root },
    );

    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const result = validateCommitSubject({
      subject: stdout.trim(),
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(true);
  });
});
