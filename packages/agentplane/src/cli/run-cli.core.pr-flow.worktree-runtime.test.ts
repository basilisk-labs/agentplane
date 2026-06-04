/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  cp,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { extractTaskSuffix, validateCommitSubject } from "@agentplaneorg/core/commit";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import {
  approveTaskPlan,
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
  recordVerificationOk,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 180_000;
const workspaceRoot = process.cwd();

const staleDistRuntimeEnv = (): NodeJS.ProcessEnv => ({
  ...cleanGitEnv(),
  PATH: process.env.PATH ?? "",
  AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
});

async function seedRepoLocalDistArtifacts(root: string): Promise<void> {
  const agentplaneDist = path.join(root, "packages", "agentplane", "dist");
  const coreDist = path.join(root, "packages", "core", "dist");
  await mkdir(agentplaneDist, { recursive: true });
  await mkdir(coreDist, { recursive: true });
  await writeFile(
    path.join(agentplaneDist, "cli.js"),
    [
      "#!/usr/bin/env node",
      String.raw`process.stdout.write("Mode: repo-local\nFramework checkout: yes\n");`,
      "",
    ].join("\n"),
    "utf8",
  );
  await writeFile(path.join(coreDist, "index.js"), "export const core = true;\n", "utf8");
}

async function seedRepoLocalBinArtifacts(root: string): Promise<void> {
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await cp(
    path.join(workspaceRoot, "packages", "agentplane", "bin"),
    path.join(root, "packages", "agentplane", "bin"),
    { recursive: true },
  );
}

async function seedRepoLocalNodeModules(root: string): Promise<void> {
  const target = path.join(root, "node_modules");
  await symlink(
    path.join(workspaceRoot, "node_modules"),
    target,
    process.platform === "win32" ? "junction" : "dir",
  );
}

async function seedRepoLocalWebsiteNodeModules(root: string): Promise<void> {
  const target = path.join(root, "website", "node_modules");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(path.join(root, "website", "package.json"), '{ "name": "website" }\n', "utf8");
  await mkdir(target, { recursive: true });
  await writeFile(path.join(target, ".agentplane-worktree-test"), "website deps\n", "utf8");
}

async function seedRepoLocalCorePackage(root: string): Promise<void> {
  const packageDir = path.join(root, "packages", "agentplane", "node_modules", "@agentplaneorg");
  await mkdir(packageDir, { recursive: true });
  await symlink(
    path.join(workspaceRoot, "packages", "core"),
    path.join(packageDir, "core"),
    process.platform === "win32" ? "junction" : "dir",
  );
}

async function seedFrameworkCheckoutMarker(root: string): Promise<void> {
  const cliPath = path.join(root, "packages", "agentplane", "src", "cli.ts");
  await mkdir(path.dirname(cliPath), { recursive: true });
  await writeFile(cliPath, "export const cli = true;\n", "utf8");
}

describe(
  "runCli branch_pr worktree runtime",
  { timeout: WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS },
  () => {
    it(
      "work start seeds local-backend task READMEs into a fresh worktree",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const createTask = async (title: string, description: string): Promise<string> => {
          const ioTask = captureStdIO();
          try {
            const code = await runCli([
              "task",
              "new",
              "--title",
              title,
              "--description",
              description,
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
            return ioTask.stdout.trim();
          } finally {
            ioTask.restore();
          }
        };

        const taskId = await createTask(
          "Seeded worktree task",
          "Fresh branch_pr worktree should inherit local backend task README files.",
        );
        const siblingTaskId = await createTask(
          "Sibling task for worktree snapshot",
          "A sibling task proves the local backend snapshot is broader than the active task.",
        );
        await approveTaskPlan(root, taskId);
        await approveTaskPlan(root, siblingTaskId);
        const worktreeIo = captureStdIO();
        const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-seed-readmes`);
        try {
          const code = await runCli([
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "seed-readmes",
            "--worktree",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          worktreeIo.restore();
        }

        const taskReadmePath = path.join(worktreePath, ".agentplane", "tasks", taskId, "README.md");
        const siblingReadmePath = path.join(
          worktreePath,
          ".agentplane",
          "tasks",
          siblingTaskId,
          "README.md",
        );
        expect(await pathExists(taskReadmePath)).toBe(true);
        expect(await pathExists(siblingReadmePath)).toBe(true);
        expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
          false,
        );
        expect(
          await pathExists(path.join(root, ".agentplane", "tasks", siblingTaskId, "README.md")),
        ).toBe(true);
        expect(
          await pathExists(
            path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js"),
          ),
        ).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "dist", "cli.js")),
        ).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "core", "dist", "index.js")),
        ).toBe(true);

        const baseShowIo = captureStdIO();
        try {
          const code = await runCli(["task", "show", taskId, "--root", root]);
          expect(code).toBe(0);
          expect(baseShowIo.stdout).toContain(taskId);
          expect(baseShowIo.stdout).toContain('"status": "TODO"');
        } finally {
          baseShowIo.restore();
        }

        const showIo = captureStdIO();
        try {
          const code = await runCli(["task", "show", siblingTaskId, "--root", worktreePath]);
          expect(code).toBe(0);
          expect(showIo.stdout).toContain(siblingTaskId);
        } finally {
          showIo.restore();
        }

        const seededReadme = await readFile(taskReadmePath, "utf8");
        expect(seededReadme).toContain('status: "TODO"');
      },
      WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
    );

    it(
      "work start makes a fresh framework worktree immediately runnable for repo-local commands",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await seedRepoLocalBinArtifacts(root);
        await seedRepoLocalDistArtifacts(root);
        await seedRepoLocalNodeModules(root);
        await seedRepoLocalWebsiteNodeModules(root);
        await seedRepoLocalCorePackage(root);
        await mkdir(path.join(root, "agentplane-recipes"), { recursive: true });
        await writeFile(
          path.join(root, "agentplane-recipes", "index.json"),
          '{"schema_version":1,"recipes":[]}\n',
          "utf8",
        );
        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "."], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const ioTask = captureStdIO();
        let taskId = "";
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Fresh worktree runtime bootstrap",
            "--description",
            "Fresh branch_pr worktree should run repo-local commands without manual bootstrap.",
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
          taskId = ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
        await approveTaskPlan(root, taskId);

        const io = captureStdIO();
        const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-runtime-ready`);
        try {
          const code = await runCli([
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "runtime-ready",
            "--worktree",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }

        expect(await pathExists(path.join(worktreePath, "node_modules"))).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "node_modules")),
        ).toBe(true);
        expect(await pathExists(path.join(worktreePath, "website", "node_modules"))).toBe(true);
        expect(await pathExists(path.join(worktreePath, "agentplane-recipes", "index.json"))).toBe(
          true,
        );
        expect(await pathExists(path.join(worktreePath, ".agentplane", "bin", "agentplane"))).toBe(
          true,
        );

        const runtime = await execFileAsync(
          process.execPath,
          [
            path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js"),
            "runtime",
            "explain",
          ],
          {
            cwd: worktreePath,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );
        expect(runtime.stdout).toContain("Mode: repo-local");
        expect(runtime.stdout).toContain("Framework checkout: yes");

        const shimRuntime = await execFileAsync(
          path.join(worktreePath, ".agentplane", "bin", "agentplane"),
          ["runtime", "explain"],
          {
            cwd: worktreePath,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );
        expect(shimRuntime.stdout).toContain("Mode: repo-local");
        expect(shimRuntime.stdout).toContain("Framework checkout: yes");
      },
      WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
    );

    it(
      "work start reuses the active repo-local binary to bootstrap a fresh task worktree from an unbootstrapped base checkout",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await seedRepoLocalBinArtifacts(root);
        await seedFrameworkCheckoutMarker(root);
        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "."], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const ioTask = captureStdIO();
        let taskId = "";
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Unbootstrapped base worktree runtime bootstrap",
            "--description",
            "work start should seed runtime assets from the active repo-local binary when the base checkout lacks dist.",
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
          taskId = ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
        await approveTaskPlan(root, taskId);

        const worktreePath = path.join(
          root,
          ".agentplane",
          "worktrees",
          `${taskId}-runtime-from-active`,
        );
        const runtimeBinary = path.join(
          workspaceRoot,
          "packages",
          "agentplane",
          "bin",
          "agentplane.js",
        );
        const result = await execFileAsync(
          process.execPath,
          [
            runtimeBinary,
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "runtime-from-active",
            "--worktree",
            "--root",
            root,
          ],
          {
            cwd: root,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );

        expect(result.stdout).toContain("✅ work start");
        expect(result.stderr).not.toContain(
          "running global agentplane binary inside repository checkout",
        );
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "dist", "cli.js")),
        ).toBe(true);
        expect(await pathExists(path.join(worktreePath, "node_modules"))).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "node_modules")),
        ).toBe(true);
        expect(await pathExists(path.join(worktreePath, "website", "node_modules"))).toBe(true);

        const runtime = await execFileAsync(
          process.execPath,
          [
            path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js"),
            "runtime",
            "explain",
          ],
          {
            cwd: worktreePath,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );
        expect(runtime.stdout).toContain("Mode: repo-local");
        expect(runtime.stdout).toContain("Framework checkout: yes");
      },
      WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
    );

    it(
      "work start reuses the active repo-local binary to bootstrap a fresh task worktree from an unbootstrapped base checkout",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await seedRepoLocalBinArtifacts(root);
        await seedFrameworkCheckoutMarker(root);
        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "."], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const ioTask = captureStdIO();
        let taskId = "";
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Unbootstrapped base worktree runtime bootstrap",
            "--description",
            "work start should seed runtime assets from the active repo-local binary when the base checkout lacks dist.",
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
          taskId = ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
        await approveTaskPlan(root, taskId);

        const worktreePath = path.join(
          root,
          ".agentplane",
          "worktrees",
          `${taskId}-runtime-from-active`,
        );
        const runtimeBinary = path.join(
          workspaceRoot,
          "packages",
          "agentplane",
          "bin",
          "agentplane.js",
        );
        const result = await execFileAsync(
          process.execPath,
          [
            runtimeBinary,
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "runtime-from-active",
            "--worktree",
            "--root",
            root,
          ],
          {
            cwd: root,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );

        expect(result.stdout).toContain("✅ work start");
        expect(result.stderr).not.toContain(
          "running global agentplane binary inside repository checkout",
        );
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "dist", "cli.js")),
        ).toBe(true);
        expect(await pathExists(path.join(worktreePath, "node_modules"))).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "node_modules")),
        ).toBe(true);

        const runtime = await execFileAsync(
          process.execPath,
          [
            path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js"),
            "runtime",
            "explain",
          ],
          {
            cwd: worktreePath,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );
        expect(runtime.stdout).toContain("Mode: repo-local");
        expect(runtime.stdout).toContain("Framework checkout: yes");
      },
      WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
    );

    it(
      "work start reuses the active repo-local binary to bootstrap a fresh task worktree from an unbootstrapped base checkout",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await seedRepoLocalBinArtifacts(root);
        await seedFrameworkCheckoutMarker(root);
        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "."], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const ioTask = captureStdIO();
        let taskId = "";
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Unbootstrapped base worktree runtime bootstrap",
            "--description",
            "work start should seed runtime assets from the active repo-local binary when the base checkout lacks dist.",
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
          taskId = ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
        await approveTaskPlan(root, taskId);

        const worktreePath = path.join(
          root,
          ".agentplane",
          "worktrees",
          `${taskId}-runtime-from-active`,
        );
        const runtimeBinary = path.join(
          workspaceRoot,
          "packages",
          "agentplane",
          "bin",
          "agentplane.js",
        );
        const result = await execFileAsync(
          process.execPath,
          [
            runtimeBinary,
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "runtime-from-active",
            "--worktree",
            "--root",
            root,
          ],
          {
            cwd: root,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );

        expect(result.stdout).toContain("✅ work start");
        expect(result.stderr).not.toContain(
          "running global agentplane binary inside repository checkout",
        );
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "dist", "cli.js")),
        ).toBe(true);
        expect(await pathExists(path.join(worktreePath, "node_modules"))).toBe(true);
        expect(
          await pathExists(path.join(worktreePath, "packages", "agentplane", "node_modules")),
        ).toBe(true);

        const runtime = await execFileAsync(
          process.execPath,
          [
            path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js"),
            "runtime",
            "explain",
          ],
          {
            cwd: worktreePath,
            env: staleDistRuntimeEnv(),
            encoding: "utf8",
          },
        );
        expect(runtime.stdout).toContain("Mode: repo-local");
        expect(runtime.stdout).toContain("Framework checkout: yes");
      },
      WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
    );

    it(
      "task start-ready updates the task worktree README without recreating a base checkout copy",
      { timeout: WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS },
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        const config = defaultConfig();
        config.workflow_mode = "branch_pr";
        await writeConfig(root, config);
        await configureGitUser(root);

        await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
        const execFileAsync = promisify(execFile);
        await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

        await runCliSilent(["branch", "base", "set", "main", "--root", root]);

        const ioTask = captureStdIO();
        let taskId = "";
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Start ready worktree sync",
            "--description",
            "Branch_pr start-ready should keep the active README in the task worktree only.",
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
          taskId = ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
        await approveTaskPlan(root, taskId);

        const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-readme-sync`);
        await runCliSilent([
          "work",
          "start",
          taskId,
          "--agent",
          "CODER",
          "--slug",
          "readme-sync",
          "--worktree",
          "--root",
          root,
        ]);

        const ioStart = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "start-ready",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Start: keep the active task README in the task worktree only.",
            "--root",
            worktreePath,
          ]);
          expect(code).toBe(0);
        } finally {
          ioStart.restore();
        }

        const baseReadmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
        const worktreeReadmePath = path.join(
          worktreePath,
          ".agentplane",
          "tasks",
          taskId,
          "README.md",
        );
        const worktreeReadme = await readFile(worktreeReadmePath, "utf8");
        expect(await pathExists(baseReadmePath)).toBe(false);
        expect(worktreeReadme).toContain('status: "DOING"');
        expect(worktreeReadme).toContain("Start: keep the active task README in the task worktree");

        const baseShowIo = captureStdIO();
        try {
          const code = await runCli(["task", "show", taskId, "--root", root]);
          expect(code).toBe(0);
          expect(baseShowIo.stdout).toContain(`"id": "${taskId}"`);
          expect(baseShowIo.stdout).toContain('"status": "DOING"');
        } finally {
          baseShowIo.restore();
        }
      },
    );
  },
);
