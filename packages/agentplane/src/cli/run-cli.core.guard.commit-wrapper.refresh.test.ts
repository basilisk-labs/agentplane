import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";

import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const COMMIT_WRAPPER_AUTO_STAGE_TIMEOUT_MS = 120_000;
const COMMIT_WRAPPER_SUITE_TIMEOUT_MS = 120_000;

describe("runCli commit wrapper: refresh", { timeout: COMMIT_WRAPPER_SUITE_TIMEOUT_MS }, () => {
  it(
    "commit wrapper auto-stages active task artifacts with --allow-tasks even without explicit --allow",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      const taskId = "202601010101-ABCDEF";
      const readme = renderTaskReadme(
        {
          id: taskId,
          title: "Auto-stage active task artifact commit",
          result_summary: "",
          description: "desc",
          status: "DOING",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["cli", "code"],
          verify: [],
          verification: null,
          commit: null,
          doc_version: 3,
          doc_updated_at: "2026-03-12T00:00:00.000Z",
          doc_updated_by: "CODER",
        },
        "## Summary\n\nUpdated\n",
      );
      await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
      await writeFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), readme, "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "commit",
          taskId,
          "-m",
          "✨ ABCDEF commit: auto stage active task artifact",
          "--allow-tasks",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("commit auto-staged 1 path(s) from allowlist");
        expect(io.stdout).toContain(`staged=.agentplane/tasks/${taskId}/README.md`);
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      expect(stdout.trim()).toBe("✨ ABCDEF commit: auto stage active task artifact");
    },
    COMMIT_WRAPPER_AUTO_STAGE_TIMEOUT_MS,
  );

  it("commit wrapper lets --allow-tasks cover the active task README without a duplicate explicit prefix", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const taskId = "202601010101-ABCDEF";
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Allow active task artifacts in task-scoped commits",
        result_summary: "",
        description: "desc",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cli", "code"],
        verify: [],
        verification: null,
        commit: null,
        doc_version: 3,
        doc_updated_at: "2026-03-12T00:00:00.000Z",
        doc_updated_by: "CODER",
      },
      "## Summary\n\nUpdated\n",
    );
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const x = 1;\n", "utf8");
    await writeFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), readme, "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts", `.agentplane/tasks/${taskId}/README.md`], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        "✨ ABCDEF commit: allow active task artifacts",
        "--allow",
        "src",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("committed");
    } finally {
      io.restore();
    }

    const showRes = await execFileAsync("git", ["show", "--name-only", "--format="], {
      cwd: root,
    });
    const changed = showRes.stdout
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    expect(changed).toEqual([`.agentplane/tasks/${taskId}/README.md`, "src/app.ts"]);
  });

  it("commit wrapper stages active task artifacts with --allow-tasks when the index already has implementation files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const taskId = "202601010101-ABCDEF";
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Stage active task artifacts with populated index",
        result_summary: "",
        description: "desc",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cli", "code"],
        verify: [],
        verification: null,
        commit: null,
        doc_version: 3,
        doc_updated_at: "2026-03-12T00:00:00.000Z",
        doc_updated_by: "CODER",
      },
      "## Summary\n\nUpdated\n",
    );
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const x = 1;\n", "utf8");
    await writeFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), readme, "utf8");
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "evidence.txt"),
      "active task evidence\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        "✨ ABCDEF commit: stage active task artifacts with populated index",
        "--allow",
        "src",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "commit auto-staged 2 active task artifact path(s) from --allow-tasks",
      );
      expect(io.stdout).toContain(
        `staged=.agentplane/tasks/${taskId}/evidence.txt, .agentplane/tasks/${taskId}/README.md`,
      );
    } finally {
      io.restore();
    }

    const showRes = await execFileAsync("git", ["show", "--name-only", "--format="], {
      cwd: root,
    });
    const changed = showRes.stdout
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    expect(changed).toEqual([
      `.agentplane/tasks/${taskId}/README.md`,
      `.agentplane/tasks/${taskId}/evidence.txt`,
      "src/app.ts",
    ]);
  });

  it("commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const taskId = "202601010101-ABCDEF";
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Allow non-README active task artifacts in task-scoped commits",
        result_summary: "",
        description: "desc",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cli", "code"],
        verify: [],
        verification: null,
        commit: null,
        doc_version: 3,
        doc_updated_at: "2026-03-12T00:00:00.000Z",
        doc_updated_by: "CODER",
      },
      "## Summary\n\nUpdated\n",
    );
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const x = 1;\n", "utf8");
    await writeFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), readme, "utf8");
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "evidence.txt"),
      "active task evidence\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts", `.agentplane/tasks/${taskId}/evidence.txt`], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        "✨ ABCDEF commit: allow active task evidence artifact",
        "--allow",
        "src",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("committed");
    } finally {
      io.restore();
    }

    const headRes = await execFileAsync("git", ["show", "--name-only", "--format="], {
      cwd: root,
    });
    const headChanged = headRes.stdout
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    expect(headChanged).toEqual([
      `.agentplane/tasks/${taskId}/README.md`,
      `.agentplane/tasks/${taskId}/evidence.txt`,
      "src/app.ts",
    ]);
  });

  it("commit wrapper surfaces invalid task README frontmatter as the concrete reconcile failure", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const taskId = "202601010101-ABCDEF";
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const x = 1;\n", "utf8");
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "# Task\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        "✨ ABCDEF commit: blocked by invalid task readme",
        "--allow",
        "src",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain(
        "reconcile check failed: task README for 202601010101-ABCDEF has invalid frontmatter and could not be parsed",
      );
      expect(io.stderr).toContain("state: mutation preflight cannot reconcile task artifacts");
      expect(io.stderr).toContain(
        "likely_cause: task README for 202601010101-ABCDEF has invalid frontmatter, so reconcile skipped it before the mutating command could run",
      );
      expect(io.stderr).toContain(
        "next_action: agentplane task list --strict-read (surface the malformed or unreadable task README before retrying mutating commands)",
      );
      expect(io.stderr).toContain("reason_code: reconcile_task_scan_incomplete [reconcile]");
    } finally {
      io.restore();
    }
  });
});
