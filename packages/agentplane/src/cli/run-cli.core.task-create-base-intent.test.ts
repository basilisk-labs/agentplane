import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import {
  runJson,
  writePlannerResult,
  type AgentPacket,
} from "./task-create-planner-intent.testkit.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

describe("task creation intent and long-lived bases", { timeout: 60_000 }, () => {
  it("freezes the current long-lived development branch as the task base", async () => {
    const root = await mkGitRepoRootWithBranch("typescript");
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "typescript base"], {
      cwd: root,
    });
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    const created = await runJson(root, [
      "task",
      "create",
      "Continue the TypeScript migration",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--blueprint-request",
      "code.branch_pr",
      "--tag",
      "code",
      "--json",
    ]);
    const taskId = created.task_id as string;
    const taskDoc = parseTaskReadme(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    );

    expect(taskDoc.frontmatter.extensions?.task_execution_context).toMatchObject({
      schema_version: 1,
      base_ref: "typescript",
      base_sha: stdout.trim(),
      source: "creation_checkout",
    });

    await execFileAsync("git", ["branch", "main", "HEAD"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const route = await runJson(root, ["task", "status", taskId, "--route", "--json"]);
    expect((route.workspace as { baseBranch: string }).baseBranch).toBe("typescript");
  });

  it("creates a task from detached HEAD without inventing a branch identity", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "pinned revision"], {
      cwd: root,
    });
    await execFileAsync("git", ["switch", "--detach", "HEAD"], { cwd: root });

    const created = await runJson(root, [
      "task",
      "create",
      "Inspect a pinned revision",
      "--task-kind",
      "analysis",
      "--mutation-scope",
      "none",
      "--json",
    ]);
    const taskId = String(created.task_id);
    const taskDoc = parseTaskReadme(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
    );

    expect(taskDoc.frontmatter.extensions?.task_execution_context).toBeUndefined();
  });

  it("freezes concurrent tasks from independent long-lived bases without importing prior commits", async () => {
    const root = await mkGitRepoRootWithBranch("typescript");
    await writeFile(path.join(root, "base.txt"), "shared base\n");
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "shared base"], { cwd: root });
    await writeFile(path.join(root, "typescript-history.ts"), "export const migrated = true;\n");
    await execFileAsync("git", ["add", "typescript-history.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "typescript cumulative history"], { cwd: root });
    await execFileAsync("git", ["branch", "-f", "master", "typescript^"], { cwd: root });
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const masterResult = await execFileAsync("git", ["rev-parse", "master"], { cwd: root });
    const typescriptResult = await execFileAsync("git", ["rev-parse", "typescript"], {
      cwd: root,
    });
    const masterSha = masterResult.stdout.trim();
    const typescriptSha = typescriptResult.stdout.trim();

    const mainTask = await runJson(root, [
      "task",
      "create",
      "Patch the stable line",
      "--base",
      "master",
      "--json",
    ]);
    const typescriptTask = await runJson(root, [
      "task",
      "create",
      "Continue the TypeScript line",
      "--base",
      "typescript",
      "--json",
    ]);
    const readBase = async (taskId: string) => {
      const raw = await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "README.md"),
        "utf8",
      );
      const value: unknown = parseTaskReadme(raw).frontmatter.extensions?.task_execution_context;
      return value;
    };

    expect(await readBase(String(mainTask.task_id))).toMatchObject({
      base_ref: "master",
      base_sha: masterSha,
      source: "explicit",
    });
    expect(await readBase(String(typescriptTask.task_id))).toMatchObject({
      base_ref: "typescript",
      base_sha: typescriptSha,
      source: "explicit",
    });
    expect(typescriptSha).not.toBe(masterSha);
    const mainTaskId = String(mainTask.task_id);
    const typescriptTaskId = String(typescriptTask.task_id);
    const worktreesRoot = path.join(root, ".agentplane", "worktrees");
    const mainWorktree = path.join(worktreesRoot, `${mainTaskId}-stable`);
    const typescriptWorktree = path.join(worktreesRoot, `${typescriptTaskId}-typescript`);
    await mkdir(worktreesRoot, { recursive: true });
    await execFileAsync(
      "git",
      ["worktree", "add", "-b", `task/${mainTaskId}/stable`, mainWorktree, masterSha],
      { cwd: root },
    );
    await execFileAsync(
      "git",
      [
        "worktree",
        "add",
        "-b",
        `task/${typescriptTaskId}/typescript`,
        typescriptWorktree,
        typescriptSha,
      ],
      { cwd: root },
    );
    await writeFile(path.join(mainWorktree, "stable-change.txt"), "stable task\n");
    await execFileAsync("git", ["add", "stable-change.txt"], { cwd: mainWorktree });
    await execFileAsync("git", ["commit", "-m", "stable task change"], { cwd: mainWorktree });
    await writeFile(
      path.join(typescriptWorktree, "typescript-task-change.ts"),
      "export const taskChange = true;\n",
    );
    await execFileAsync("git", ["add", "typescript-task-change.ts"], {
      cwd: typescriptWorktree,
    });
    await execFileAsync("git", ["commit", "-m", "typescript task change"], {
      cwd: typescriptWorktree,
    });

    const mainDiff = await execFileAsync("git", ["diff", "--name-only", masterSha, "HEAD"], {
      cwd: mainWorktree,
    });
    const typescriptDiff = await execFileAsync(
      "git",
      ["diff", "--name-only", typescriptSha, "HEAD"],
      { cwd: typescriptWorktree },
    );
    expect(mainDiff.stdout.trim().split("\n")).toEqual(["stable-change.txt"]);
    expect(typescriptDiff.stdout.trim().split("\n")).toEqual(["typescript-task-change.ts"]);
    expect(typescriptDiff.stdout).not.toContain("typescript-history.ts");
    expect(mainDiff.stdout).not.toContain("typescript-history.ts");
  });

  it("preserves a reusable envelope and re-resolves the route from typed intent", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const created = await runJson(root, [
      "task",
      "create",
      "Исправить разбор конфигурации CLI",
      "--description",
      "Пользовательский запрос не должен классифицироваться проверкой слов.",
      "--route",
      "auto",
      "--verify",
      "bun run test:critical",
      "--json",
    ]);
    const taskId = created.task_id as string;
    const issued = (await runJson(root, [
      "task",
      "advance",
      taskId,
      "--agent-json",
    ])) as AgentPacket;
    expect(issued.action.instruction).toContain("result.task_intent");
    const plan = "1. Inspect the parser. 2. Implement the fix. 3. Run the declared checks.";

    const incompletePath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: false,
    });
    const incompleteIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "advance",
        taskId,
        "--result",
        incompletePath,
        "--agent-json",
        "--root",
        root,
      ]);
      expect(code).not.toBe(0);
      expect(incompleteIo.stderr).toContain("must include task_intent");
    } finally {
      incompleteIo.restore();
    }
    if (!issued.exchange) throw new Error("expected external-agent exchange");
    expect(
      JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "issued", result_digest: null });

    const resultPath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: true,
    });
    const accepted = await runJson(root, [
      "task",
      "advance",
      taskId,
      "--result",
      resultPath,
      "--agent-json",
    ]);
    expect((accepted.action as { kind: string }).kind).toBe("approval_required");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('task_kind: "code"');
    expect(readme).toContain('mutation_scope: "code"');
    expect(readme).toContain('requested_mode: "auto"');
    expect(readme).toContain("execution_contract:");
    expect(readme).toContain('preferred_mode: "direct"');
    expect(readme).not.toContain("mutation_scope_unknown");
    const brief = await runJson(root, ["task", "brief", taskId, "--json"]);
    expect((brief.blueprint as { blueprint_id: string }).blueprint_id).toBe("code.branch_pr");
  });
});
