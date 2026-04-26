import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { defaultConfig, loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { createTask } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import {
  configureGitUser,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  writeConfig,
  tempRepo,
  mockConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { listTaskSummariesMemo, loadCommandContext, loadTaskFromContext } from "./task-backend.js";

const TASK_BACKEND_INTEGRATION_TIMEOUT_MS = 180_000;

async function writeLocalBackendConfig(root: string): Promise<void> {
  const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(
    configPath,
    JSON.stringify({ id: "local", version: 1, settings: { dir: ".agentplane/tasks" } }, null, 2),
    "utf8",
  );
}

describe(
  "commands/shared/task-backend CommandContext",
  {
    timeout: TASK_BACKEND_INTEGRATION_TIMEOUT_MS,
  },
  () => {
    it("loadCommandContext loads config/backend once and exposes backendConfigPath", async () => {
      const repo = await tempRepo({ withDefaultConfig: true });
      const root = repo.root;
      await writeLocalBackendConfig(root);

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      expect(ctx.backendId).toBe("local");
      expect(ctx.resolvedProject.gitRoot).toBe(root);
      expect(ctx.backendConfigPath).toBe(
        path.join(root, ".agentplane/backends/local/backend.json"),
      );
    });

    it("loadTaskFromContext reads an existing task and throws a deterministic ENOENT when missing", async () => {
      const repo = await tempRepo({ withDefaultConfig: true });
      const root = repo.root;
      await writeLocalBackendConfig(root);

      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "Context test",
        description: "Ensure CommandContext can load tasks from the configured backend",
        owner: "TESTER",
        priority: "med",
        tags: ["testing"],
        dependsOn: [],
        verify: [],
      });

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const task = await loadTaskFromContext({ ctx, taskId: created.id });
      expect(task.id).toBe(created.id);

      await expect(
        loadTaskFromContext({ ctx, taskId: "202602061915-MISSING0" }),
      ).rejects.toMatchObject({
        exitCode: 4,
        code: "E_IO",
      });
    });

    it("loadCommandContext reuses preloaded resolved project/config when provided", async () => {
      const repo = await tempRepo({ withDefaultConfig: true });
      const root = repo.root;
      await writeLocalBackendConfig(root);

      const resolved = await resolveProject({ cwd: root, rootOverride: root });
      const loaded = await loadConfig(resolved.agentplaneDir);
      const ctx = await loadCommandContext({
        cwd: os.tmpdir(),
        rootOverride: null,
        resolvedProject: resolved,
        config: loaded.config,
      });

      expect(ctx.resolvedProject.gitRoot).toBe(root);
      expect(ctx.backendId).toBe("local");
    });

    it("loadTaskFromContext falls back to a branch-backed task README in branch_pr mode", async () => {
      const repo = await tempRepo({ branch: "main" });
      const root = repo.root;
      await configureGitUser(root);
      const config = mockConfig((draft) => {
        draft.workflow_mode = "branch_pr";
      });
      await repo.writeConfig(config);
      await writeLocalBackendConfig(root);

      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt", ".agentplane/config.json"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "Context branch fallback",
        description: "Load task README from the task branch when base does not have a local copy",
        owner: "TESTER",
        priority: "med",
        tags: ["testing"],
        dependsOn: [],
        verify: [],
      });

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "--no-verify", "-m", `chore ${created.id} scaffold`], {
        cwd: root,
      });

      const branch = `task/${created.id}/context-fallback`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await execFileAsync("git", ["checkout", "main"], { cwd: root });

      await rm(path.join(root, ".agentplane", "tasks", created.id), {
        recursive: true,
        force: true,
      });
      await execFileAsync("git", ["add", "-A", ".agentplane/tasks"], { cwd: root });
      await execFileAsync(
        "git",
        ["commit", "-m", `chore ${created.id} remove base task snapshot`],
        {
          cwd: root,
        },
      );

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const task = await loadTaskFromContext({ ctx, taskId: created.id });
      expect(task.id).toBe(created.id);
      expect(task.title).toBe("Context branch fallback");
    });

    it("loadTaskFromContext can read the active task README from a live branch_pr worktree", async () => {
      const repo = await tempRepo({ branch: "main" });
      const root = repo.root;
      await configureGitUser(root);
      const config = mockConfig((draft) => {
        draft.workflow_mode = "branch_pr";
      });
      await repo.writeConfig(config);
      await writeLocalBackendConfig(root);

      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt", ".agentplane/config.json"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
      const { stdout: baseShaText } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const baseSha = baseShaText.trim();
      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "Context live worktree fallback",
        description:
          "Load task README from the live task worktree when base no longer keeps a local copy",
        owner: "TESTER",
        priority: "med",
        tags: ["testing"],
        dependsOn: [],
        verify: [],
      });

      const baseReadmePath = path.join(root, ".agentplane", "tasks", created.id, "README.md");
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${created.id}-live-context`,
      );
      const branch = `task/${created.id}/live-context`;
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, baseSha], {
        cwd: root,
      });

      const worktreeReadmePath = path.join(
        worktreePath,
        ".agentplane",
        "tasks",
        created.id,
        "README.md",
      );
      await mkdir(path.dirname(worktreeReadmePath), { recursive: true });
      const baseReadme = await readFile(baseReadmePath, "utf8");
      await writeFile(
        worktreeReadmePath,
        baseReadme.replace('status: "TODO"', 'status: "DOING"'),
        "utf8",
      );
      await rm(path.join(root, ".agentplane", "tasks", created.id), {
        recursive: true,
        force: true,
      });

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const task = await loadTaskFromContext({ ctx, taskId: created.id });
      expect(task.id).toBe(created.id);
      expect(task.title).toBe("Context live worktree fallback");
      expect(task.status).toBe("DOING");
    });

    it("loadTaskFromContext can prefer an explicit branch snapshot over a stale base task copy", async () => {
      const repo = await tempRepo({ branch: "main" });
      const root = repo.root;
      await configureGitUser(root);
      const config = mockConfig((draft) => {
        draft.workflow_mode = "branch_pr";
      });
      await repo.writeConfig(config);
      await writeLocalBackendConfig(root);

      const execFileAsync = promisify(execFile);
      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "Base task title",
        description: "Prefer the task README from the branch being integrated",
        owner: "TESTER",
        priority: "med",
        tags: ["testing"],
        dependsOn: [],
        verify: [],
      });

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${created.id} scaffold`], { cwd: root });

      const branch = `task/${created.id}/fresh-snapshot`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      const readmePath = path.join(root, ".agentplane", "tasks", created.id, "README.md");
      const original = await readFile(readmePath, "utf8");
      await writeFile(readmePath, original.replace("Base task title", "Branch task title"), "utf8");
      await execFileAsync("git", ["add", readmePath], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `docs ${created.id} branch title`], {
        cwd: root,
      });
      await execFileAsync("git", ["checkout", "main"], { cwd: root });

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const task = await loadTaskFromContext({
        ctx,
        taskId: created.id,
        preferBranchSnapshot: true,
        branchSnapshotBranch: branch,
      });

      expect(task.id).toBe(created.id);
      expect(task.title).toBe("Branch task title");
    });

    it(
      "loadTaskFromContext can fall back to origin/<branch> when the local task branch is gone",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        await configureGitUser(root);
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await writeLocalBackendConfig(root);

        const execFileAsync = promisify(execFile);
        const remoteRoot = path.join(root, "origin.git");
        await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
        await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

        const created = await createTask({
          cwd: root,
          rootOverride: root,
          title: "Base task title",
          description: "Prefer the task README from the remote branch snapshot",
          owner: "TESTER",
          priority: "med",
          tags: ["testing"],
          dependsOn: [],
          verify: [],
        });

        await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
        await execFileAsync(
          "git",
          ["commit", "--no-verify", "-m", `chore ${created.id} scaffold`],
          {
            cwd: root,
          },
        );
        const { stdout: baseBranchStdout } = await execFileAsync(
          "git",
          ["rev-parse", "--abbrev-ref", "HEAD"],
          { cwd: root },
        );
        const baseBranch = baseBranchStdout.trim();
        await execFileAsync("git", ["push", "--no-verify", "-u", "origin", baseBranch], {
          cwd: root,
        });
        await execFileAsync("git", ["push", "--no-verify"], { cwd: root });

        const branch = `task/${created.id}/remote-snapshot`;
        await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
        const readmePath = path.join(root, ".agentplane", "tasks", created.id, "README.md");
        const original = await readFile(readmePath, "utf8");
        await writeFile(
          readmePath,
          original.replace("Base task title", "Remote branch task title"),
          "utf8",
        );
        await execFileAsync("git", ["add", readmePath], { cwd: root });
        await execFileAsync(
          "git",
          ["commit", "--no-verify", "-m", `docs ${created.id} remote branch title`],
          {
            cwd: root,
          },
        );
        await execFileAsync("git", ["push", "--no-verify", "-u", "origin", branch], { cwd: root });
        await execFileAsync("git", ["checkout", "main"], { cwd: root });
        await execFileAsync("git", ["branch", "-D", branch], { cwd: root });

        const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
        const task = await loadTaskFromContext({
          ctx,
          taskId: created.id,
          preferBranchSnapshot: true,
          branchSnapshotBranch: branch,
        });

        expect(task.id).toBe(created.id);
        expect(task.title).toBe("Remote branch task title");
      },
      TASK_BACKEND_INTEGRATION_TIMEOUT_MS,
    );

    it("listTaskSummariesMemo falls back to summary projection when the backend has no explicit projection read", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await writeLocalBackendConfig(root);

      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "Projection fallback",
        description: "Ensure summary memo strips doc-heavy fields from full backend reads",
        owner: "TESTER",
        priority: "med",
        tags: ["testing"],
        dependsOn: [],
        verify: [],
      });

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      ctx.taskBackend.capabilities = {
        ...ctx.taskBackend.capabilities,
        projection_read_mode: "fallback",
      };
      delete ctx.taskBackend.listProjectionTasks;
      const summaries = await listTaskSummariesMemo(ctx);

      expect(summaries).toHaveLength(1);
      expect(summaries[0]?.id).toBe(created.id);
      expect(summaries[0]).not.toHaveProperty("doc");
      expect(summaries[0]).not.toHaveProperty("sections");
      expect(summaries[0]).not.toHaveProperty("events");
    });

    it("fails fast when a backend advertises native projection reads without implementing them", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await writeLocalBackendConfig(root);

      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      ctx.taskBackend.listProjectionTasks = undefined;

      await expect(listTaskSummariesMemo(ctx)).rejects.toMatchObject({
        exitCode: 1,
        code: "E_INTERNAL",
      });
    });
  },
);
