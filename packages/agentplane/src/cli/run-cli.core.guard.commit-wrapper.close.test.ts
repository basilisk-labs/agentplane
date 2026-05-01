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

const COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS = 120_000;
const COMMIT_WRAPPER_SUITE_TIMEOUT_MS = 120_000;

describe("runCli commit wrapper: close", { timeout: COMMIT_WRAPPER_SUITE_TIMEOUT_MS }, () => {
  it(
    "commit wrapper supports --close and stages only the task README",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      // Seed the repo so the implementation commit has a parent.
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      // Implementation commit recorded into the task metadata.
      await mkdir(path.join(root, "src"), { recursive: true });
      await writeFile(
        path.join(root, "src", "app.ts"),
        ["x", "x", "x", "x", "x"].join("\n"),
        "utf8",
      );
      await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
      const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const implHash = implRes.stdout.trim();

      const taskId = "202602081506-R18Y1Q";
      const taskDir = path.join(root, ".agentplane", "tasks", taskId);
      await mkdir(taskDir, { recursive: true });
      const readme = renderTaskReadme(
        {
          id: taskId,
          title: "Close commit: add --close mode to agentplane commit",
          result_summary: "generate deterministic close commits",
          description: "desc",
          status: "DONE",
          priority: "high",
          owner: "ORCHESTRATOR",
          depends_on: [],
          tags: ["cli", "code", "git"],
          verify: ["bun run test:full"],
          verification: {
            state: "ok",
            updated_at: "2026-02-08T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verified: bun run test:full; manual: agentplane commit --close",
          },
          commit: { hash: implHash, message: "✨ R18Y1Q guard: add close mode" },
          doc_version: 3,
          doc_updated_at: "2026-02-08T00:00:00.000Z",
          doc_updated_by: "TESTER",
        },
        "## Summary\n\nTest task\n",
      );
      await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli(["commit", taskId, "--close", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("committed");
      } finally {
        io.restore();
      }

      const subjectRes = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      const bodyRes = await execFileAsync("git", ["log", "-1", "--pretty=%b"], { cwd: root });
      const subject = subjectRes.stdout.trim();
      const body = bodyRes.stdout.trim();
      expect(subject).toContain("✅ R18Y1Q close:");
      expect(subject).toContain("(202602081506-R18Y1Q)");
      expect(subject).toContain("[cli,code,git]");
      expect(body).toContain("Scope: cli, code, git");
      expect(body).toContain(
        "Verify: Verified: bun run test:full; manual: agentplane commit --close",
      );
      expect(body).toContain("Key files: src/app.ts");

      // Close commit should touch only the task README.
      const showRes = await execFileAsync("git", ["show", "--name-only", "--format="], {
        cwd: root,
      });
      const changed = showRes.stdout
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      expect(changed).toEqual([`.agentplane/tasks/${taskId}/README.md`]);
    },
    COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS,
  );

  it("commit wrapper --close rejects non-empty index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "202602081506-R18Y1Q", "--close", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("close commit requires an empty index");
      expect(io.stderr).toContain("state: close commit cannot run with a non-empty git index");
      expect(io.stderr).toContain(
        "likely_cause: deterministic close commits only stage the active task artifact scope, but other staged files are already in the index",
      );
      expect(io.stderr).toContain("next_action: git restore --staged -- .");
      expect(io.stderr).toContain("--unstage-others");
    } finally {
      io.restore();
    }
  });

  it(
    "commit wrapper --close supports --unstage-others",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);

      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      await writeFile(path.join(root, "src.txt"), "impl\n", "utf8");
      await execFileAsync("git", ["add", "src.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
      const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const implHash = implRes.stdout.trim();

      const taskId = "202602081506-R18Y1Q";
      const taskDir = path.join(root, ".agentplane", "tasks", taskId);
      await mkdir(taskDir, { recursive: true });
      const readme = renderTaskReadme(
        {
          id: taskId,
          title: "Close commit with index cleanup",
          result_summary: "close duplicate bookkeeping",
          description: "desc",
          status: "DONE",
          priority: "high",
          owner: "ORCHESTRATOR",
          depends_on: [],
          tags: ["docs"],
          verify: ["manual"],
          verification: {
            state: "ok",
            updated_at: "2026-02-08T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verified: manual check",
          },
          commit: { hash: implHash, message: "✨ R18Y1Q docs: impl" },
          doc_version: 3,
          doc_updated_at: "2026-02-08T00:00:00.000Z",
          doc_updated_by: "TESTER",
        },
        "## Summary\n\nTest task\n",
      );
      await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

      await writeFile(path.join(root, "noise.txt"), "noise\n", "utf8");
      await execFileAsync("git", ["add", "noise.txt"], { cwd: root });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "commit",
          taskId,
          "--close",
          "--unstage-others",
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
      expect(changed).toEqual([`.agentplane/tasks/${taskId}/README.md`]);
    },
    COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS,
  );

  it(
    "commit wrapper --close tolerates dirty README from another active task in direct mode",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);

      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      await writeFile(path.join(root, "src.txt"), "impl\n", "utf8");
      await execFileAsync("git", ["add", "src.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
      const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const implHash = implRes.stdout.trim();

      const closeTaskId = "202602081506-R18Y1Q";
      const otherTaskId = "202602081506-QA9T2B";
      const closeTaskDir = path.join(root, ".agentplane", "tasks", closeTaskId);
      const otherTaskDir = path.join(root, ".agentplane", "tasks", otherTaskId);
      await mkdir(closeTaskDir, { recursive: true });
      await mkdir(otherTaskDir, { recursive: true });

      const closeReadme = renderTaskReadme(
        {
          id: closeTaskId,
          title: "Close commit tolerates parallel active task dirt",
          result_summary: "close one task without swallowing another active task README",
          description: "desc",
          status: "DONE",
          priority: "high",
          owner: "ORCHESTRATOR",
          depends_on: [],
          tags: ["cli", "code", "git"],
          verify: ["manual"],
          verification: {
            state: "ok",
            updated_at: "2026-02-08T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verified: direct close should stage only the active task README.",
          },
          commit: { hash: implHash, message: "✨ R18Y1Q guard: impl" },
          doc_version: 3,
          doc_updated_at: "2026-02-08T00:00:00.000Z",
          doc_updated_by: "TESTER",
        },
        "## Summary\n\nClose me\n",
      );
      const otherReadme = renderTaskReadme(
        {
          id: otherTaskId,
          title: "Parallel active task",
          result_summary: "",
          description: "desc",
          status: "DOING",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          verification: null,
          commit: null,
          doc_version: 3,
          doc_updated_at: "2026-02-08T00:00:00.000Z",
          doc_updated_by: "CODER",
        },
        "## Summary\n\nStill active\n",
      );
      await writeFile(path.join(closeTaskDir, "README.md"), closeReadme, "utf8");
      await writeFile(path.join(otherTaskDir, "README.md"), otherReadme, "utf8");
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "task seed"], { cwd: root });

      await writeFile(
        path.join(closeTaskDir, "README.md"),
        closeReadme.replace("## Summary\n\nClose me", "## Summary\n\nClose me now"),
        "utf8",
      );
      await writeFile(
        path.join(otherTaskDir, "README.md"),
        otherReadme.replace("## Summary\n\nStill active", "## Summary\n\nStill active and dirty"),
        "utf8",
      );

      const io = captureStdIO();
      try {
        const code = await runCli(["commit", closeTaskId, "--close", "--root", root]);
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
      expect(changed).toEqual([`.agentplane/tasks/${closeTaskId}/README.md`]);

      const statusRes = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
        cwd: root,
      });
      expect(statusRes.stdout).toContain(`.agentplane/tasks/${otherTaskId}/README.md`);
      expect(statusRes.stdout).not.toContain(`.agentplane/tasks/${closeTaskId}/README.md`);
    },
    COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS,
  );

  it(
    "commit wrapper --close supports --check-only",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);

      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
      const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const implHash = implRes.stdout.trim();

      const taskId = "202602081506-R18Y1Q";
      const taskDir = path.join(root, ".agentplane", "tasks", taskId);
      await mkdir(taskDir, { recursive: true });
      const readme = renderTaskReadme(
        {
          id: taskId,
          title: "Close preflight check",
          result_summary: "check close",
          description: "desc",
          status: "DONE",
          priority: "high",
          owner: "ORCHESTRATOR",
          depends_on: [],
          tags: ["docs"],
          verify: ["manual"],
          verification: {
            state: "ok",
            updated_at: "2026-02-08T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verified: manual check",
          },
          commit: { hash: implHash, message: "✨ R18Y1Q docs: impl" },
          doc_version: 3,
          doc_updated_at: "2026-02-08T00:00:00.000Z",
          doc_updated_by: "TESTER",
        },
        "## Summary\n\nTest task\n",
      );
      await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

      await writeFile(path.join(root, "noise.txt"), "noise\n", "utf8");
      await execFileAsync("git", ["add", "noise.txt"], { cwd: root });

      const beforeRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const before = beforeRes.stdout.trim();
      const io = captureStdIO();
      try {
        const code = await runCli([
          "commit",
          taskId,
          "--close",
          "--check-only",
          "--unstage-others",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("close preflight");
        expect(io.stdout).toContain("would unstage 1 path(s)");
      } finally {
        io.restore();
      }
      const afterRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const after = afterRes.stdout.trim();
      expect(after).toBe(before);
    },
    COMMIT_WRAPPER_CLOSE_CHECK_ONLY_TIMEOUT_MS,
  );
});
