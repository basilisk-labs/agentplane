/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();
const TASKS_CLI_TIMEOUT_MS = 300_000;

describe("runCli", { timeout: TASKS_CLI_TIMEOUT_MS }, () => {
  it("task new creates a task README and prints the id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "sleep 1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain(`id: "${id}"`);
    expect(readme).toContain("doc_version: 3");
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('title: "My task"');
    expect(readme).toContain("origin:");
    expect(readme).toContain('system: "manual"');
    expect(readme).toContain("## Summary");
    expect(readme).toContain("## Scope");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("## Risks");
  });

  it("task new runs backend mutation readiness before emitting verify-step warnings", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const assertLocalMutationReady = vi
      .fn<() => Promise<void>>()
      .mockRejectedValue(new Error("projection stale"));
    const listTasks = vi.fn().mockResolvedValue([]);
    const writeTask = vi.fn().mockResolvedValue(null);
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({
        id: "cloud",
        assertLocalMutationReady,
        listTasks,
        writeTask,
        generateTaskId: vi.fn().mockResolvedValue("202605100747-ABC123"),
      }),
      backendId: "cloud",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "cloud", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cloud task",
        "--description",
        "Create through cloud backend",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(assertLocalMutationReady).toHaveBeenCalledOnce();
      expect(listTasks).not.toHaveBeenCalled();
      expect(writeTask).not.toHaveBeenCalled();
      expect(io.stderr).not.toContain("task requires Verify Steps");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task new normalizes escaped newlines into readable summary and scope text", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Multiline task",
        "--description",
        String.raw`Line one\n\nLine two`,
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("description: |-");
    expect(readme).toContain("  Line one");
    expect(readme).toContain("  Line two");
    expect(readme).not.toContain(String.raw`literal \n sequences`);
    expect(readme).toContain("## Summary");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.description).toBe("Line one\n\nLine two");
    expect(task.frontmatter.sections?.Summary).toContain("Line one\n\nLine two");
    expect(task.frontmatter.sections?.Scope).toContain("- In scope: Line one Line two.");
  });

  it("task new supports depends-on and verify flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dependent task",
        "--description",
        "Has deps and verify",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.origin).toEqual({ system: "manual" });
    expect(task.frontmatter.depends_on).toContain("202601010101-ABCDEF");
    expect(task.frontmatter.verify).toContain("bun run ci");
  });

  it("task new stores structured blueprint intent fields", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Market analysis note",
        "--description",
        "Analyze the current market context without repository mutation",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "content",
        "--task-kind",
        "analysis",
        "--mutation-scope",
        "none",
        "--risk",
        "network",
        "--blueprint-request",
        "analysis.light",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.task_kind).toBe("analysis");
    expect(task.frontmatter.mutation_scope).toBe("none");
    expect(task.frontmatter.risk_flags).toEqual(["network"]);
    expect(task.frontmatter.blueprint_request).toBe("analysis.light");
  });

  it("task new can preview the resolved blueprint route without changing stdout", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Market analysis route preview",
        "--description",
        "Analyze market context without repository mutation",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "analysis",
        "--task-kind",
        "analysis",
        "--mutation-scope",
        "none",
        "--blueprint-request",
        "analysis.light",
        "--show-blueprint",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
      expect(taskId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
      expect(io.stdout).toBe(`${taskId}\n`);
      expect(io.stderr).toContain("Blueprint route preview:");
      expect(io.stderr).toContain("blueprint_id: analysis.light");
      expect(io.stderr).toContain(
        "workflow_git: implementation_commit_location=current_checkout finish_commit_source=explicit_hash_or_comment_commit close_tail_required=no finish_commit_from_comment=yes",
      );
      expect(io.stderr).toContain(
        "route: intake -> scope -> context_resolve -> work_unit -> artifact_write -> verify_record -> finish",
      );
      expect(io.stderr).toContain(
        "selection_reasons: explicit blueprint requested: analysis.light",
      );
      expect(io.stderr).toContain("required_evidence: analysis.sources");
      expect(io.stderr).toContain(`explain_command: agentplane blueprint explain ${taskId}`);
      expect(io.stderr).toContain(`snapshot_command: agentplane blueprint snapshot ${taskId}`);
    } finally {
      io.restore();
    }
  });

  it("task new rejects highly similar open task titles unless --allow-duplicate is passed", async () => {
    const root = await mkGitRepoRoot();
    const firstIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize gh env for hosted merge sync lookups",
        "--description",
        "Original workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      firstIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize hosted-merge-sync gh lookups",
        "--description",
        "Duplicate workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("potential duplicate open task detected");
      expect(io.stderr).toContain("--allow-duplicate");
      expect(io.stderr).toContain("close-duplicate");
    } finally {
      io.restore();
    }
  });

  it("task new allows similar titles when --allow-duplicate is explicit", async () => {
    const root = await mkGitRepoRoot();
    const firstIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Infer branch_pr base branch from default branch when pin is absent",
        "--description",
        "Original workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      firstIo.restore();
    }

    const io = captureStdIO();
    let duplicateId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Infer default branch_pr base when pin is absent",
        "--description",
        "Intentional follow-up task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--allow-duplicate",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      duplicateId = io.stdout.trim();
      expect(io.stderr).toContain("potential duplicate open task detected");
      expect(io.stderr).toContain("creating a duplicate because --allow-duplicate was passed");
    } finally {
      io.restore();
    }

    expect(duplicateId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
  });

  it("task new requires values for flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Needs tag",
        "--description",
        "Missing tag value should error",
        "--owner",
        "CODER",
        "--tag",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value after --tag");
    } finally {
      io.restore();
    }
  });

  it("task new fails when owner is not registered in .agentplane/agents", async () => {
    const root = await mkGitRepoRoot();
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Coder", workflow: [] }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Unknown owner",
        "--description",
        "Should fail fast",
        "--priority",
        "med",
        "--owner",
        "NOPE",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("unknown task owner id: NOPE");
    } finally {
      io.restore();
    }
  });

  it("task new seeds Verify Steps in README for verify-required primary tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Code task",
        "--description",
        "Needs verify steps",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun run test:fast",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).toContain("seeded a concrete ## Verify Steps section");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain("Run `bun run test:fast`.");
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Expected: it succeeds and confirms the requested outcome",
    );
    expect(task.frontmatter.sections?.Findings).toBe("");
    expect(task.frontmatter.sections?.Summary).toContain("Code task");
  });

  it("task new without verify commands still seeds approvable Verify Steps for verify-required primary tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Code task without verify command",
        "--description",
        "Still needs approvable verify steps",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).toContain("seeded a concrete ## Verify Steps section");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Review the changed artifact or behavior for the `code` task.",
    );
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Run the most relevant validation step for the `code` task.",
    );
  });

  it("task new seeds concrete Verify Steps even for non-verify-required tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Workflow task",
        "--description",
        "Improve lifecycle ergonomics",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      'Review the requested outcome for "Workflow task".',
    );
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Run the most relevant validation step for this task.",
    );
  });

  it("task add creates tasks with explicit ids", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const taskIds = ["202601010101-ABCD", "202601010102-BCDE"];
    try {
      const code = await runCli([
        "task",
        "add",
        ...taskIds,
        "--title",
        "Added task",
        "--description",
        "Added description",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    for (const taskId of taskIds) {
      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.id).toBe(taskId);
      expect(task.frontmatter.title).toBe("Added task");
      expect(task.frontmatter.doc_version).toBe(3);
    }
  });
});
