import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  buildTaskArtifactRefreshCommitSubject,
  commitScopesForTaskIntent,
  extractTaskSuffix,
  isGenericSubject,
  isTaskIntentCommitScope,
  isTaskArtifactRefreshCommitSubject,
  parseTaskSubjectTemplate,
  validateCommitSubject,
} from "./commit-policy.js";

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

  it("parses task commit subjects", () => {
    expect(parseTaskSubjectTemplate("♻️ ABCDEF task: tighten routing")).toEqual({
      emoji: "♻️",
      suffix: "ABCDEF",
      scope: "task",
      summary: "tighten routing",
    });
  });

  it("builds task artifact refresh subjects by inheriting emoji and scope", () => {
    expect(
      buildTaskArtifactRefreshCommitSubject({
        taskId: "202601010101-ABCDEF",
        baseSubject: "♻️ ABCDEF task: tighten routing",
      }),
    ).toBe("♻️ ABCDEF task: refresh task artifacts after commit");
  });

  it("falls back to the canonical artifact refresh subject", () => {
    expect(
      buildTaskArtifactRefreshCommitSubject({
        taskId: "202601010101-ABCDEF",
      }),
    ).toBe("🧩 ABCDEF task: refresh task artifacts after commit");
  });

  it("recognizes artifact refresh subjects semantically", () => {
    expect(
      isTaskArtifactRefreshCommitSubject({
        subject: "🧩 ABCDEF task: refresh task artifacts after commit",
        taskId: "202601010101-ABCDEF",
      }),
    ).toBe(true);
    expect(
      isTaskArtifactRefreshCommitSubject({
        subject: "🧩 ABCDEF workflow: refresh task artifacts after commit",
        taskId: "202601010101-ABCDEF",
      }),
    ).toBe(true);
  });

  it("flags generic subjects", () => {
    const tokens = ["update", "tasks", "wip"];
    expect(isGenericSubject("update", tokens)).toBe(true);
    expect(isGenericSubject("update tasks", tokens)).toBe(true);
    expect(isGenericSubject("real feature", tokens)).toBe(false);
  });

  it("validates subject includes suffix or task id", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF task: add base branch pinning",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(true);
  });

  it("matches task id and suffix case-insensitively", () => {
    const result = validateCommitSubject({
      subject: "✨ abcdef task: add base branch pinning",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts task subjects with hierarchical scopes", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF core/guard: tighten protected path checks",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts human-readable task subjects only when explicitly allowed", () => {
    const strict = validateCommitSubject({
      subject: "context: add v0.6 release readiness checks",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(strict.ok).toBe(false);
    expect(strict.errors.join("\n")).toContain(
      "commit subject must match: <emoji> <suffix> <scope>: <summary>",
    );

    const allowed = validateCommitSubject({
      subject: "context: add v0.6 release readiness checks",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
      allowHumanTaskSubject: true,
    });
    expect(allowed.ok).toBe(true);
  });

  it("derives task-intent commit scopes without using the commit as the selector", () => {
    expect(
      commitScopesForTaskIntent({
        taskKind: "analysis",
        mutationScope: "none",
        blueprintRequest: "analysis.light",
      }),
    ).toEqual(["analysis"]);
    expect(
      isTaskIntentCommitScope({
        scope: "code/resolver",
        intent: { taskKind: "code", mutationScope: "code" },
      }),
    ).toBe(true);
  });

  it("rejects task commit scopes that contradict structured task intent", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF code: implement resolver",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
      taskIntent: {
        taskKind: "analysis",
        mutationScope: "none",
        blueprintRequest: "analysis.light",
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("commit scope 'code' does not match task intent");
  });

  it("rejects subjects that do not match the required template", () => {
    const result = validateCommitSubject({
      subject: "update tasks",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain(
      "commit subject must match: <emoji> <suffix> <scope>: <summary>",
    );
  });

  it("rejects generic subjects even when they include the task ref", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF task: update",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("commit subject is too generic");
  });

  it("accepts one-word status summaries for task status commits", () => {
    const result = validateCommitSubject({
      subject: "🚧 ABCDEF code: doing",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks", "done", "wip"],
    });
    expect(result.ok).toBe(true);
  });

  it("rejects empty subject", () => {
    const result = validateCommitSubject({
      subject: "   ",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("commit subject must be non-empty");
    expect(result.errors.join("\n")).toContain(
      "commit subject must match: <emoji> <suffix> <scope>: <summary>",
    );
  });

  it("rejects when suffix token does not match the task id suffix", () => {
    const result = validateCommitSubject({
      subject: "✨ ZZZZZZ task: add base branch pinning",
      taskId: "202601010101-ABCDEF",
      genericTokens: ["update", "tasks"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain(
      "commit subject must include the task suffix as the second token",
    );
  });

  it("accepts non-task subjects with DEV suffix", () => {
    const result = validateCommitSubject({
      subject: "✨ DEV ci: enforce full tests before push",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts non-task subjects without a suffix", () => {
    const result = validateCommitSubject({
      subject: "✨ ci: enforce full tests before push",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts non-task subjects with hierarchical scopes", () => {
    const result = validateCommitSubject({
      subject: "✨ cli/run-cli: simplify global flag parsing",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(true);
  });

  it("rejects non-task subjects when they look like a task template but suffix is not DEV", () => {
    const result = validateCommitSubject({
      subject: "✨ ABCDEF ci: enforce full tests before push",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("task-like commit subject found");
  });

  it("rejects generic non-task subjects even with DEV suffix", () => {
    const result = validateCommitSubject({
      subject: "✨ DEV ci: update",
      genericTokens: ["update", "tasks", "wip"],
    });
    expect(result.ok).toBe(false);
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
        "✨ ABCDEF task: commit policy integration test",
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
