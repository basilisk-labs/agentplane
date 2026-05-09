import { execFile } from "node:child_process";
import { cp, mkdir, readFile, realpath, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  cleanGitEnv,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const INSTALLED_SMOKE_TIMEOUT_MS = 300_000;

type CommandResult = {
  code: number;
  stderr: string;
  stdout: string;
};

function packageRoot(): string {
  return path.resolve(process.cwd(), "packages", "agentplane");
}

function installedEnv(extra: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return {
    ...cleanGitEnv(),
    AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
    AGENTPLANE_NO_UPDATE_CHECK: "1",
    ...extra,
  };
}

async function copyIfExists(from: string, to: string): Promise<void> {
  if (await pathExists(from)) {
    await cp(from, to, { recursive: true });
  }
}

async function createPseudoInstalledAgentplane(): Promise<string> {
  const sourceRoot = packageRoot();
  const installRoot = await mkTempDir();
  await mkdir(path.join(installRoot, "bin"), { recursive: true });

  await copyIfExists(path.join(sourceRoot, "bin"), path.join(installRoot, "bin"));
  await copyIfExists(path.join(sourceRoot, "dist"), path.join(installRoot, "dist"));
  await copyIfExists(path.join(sourceRoot, "assets"), path.join(installRoot, "assets"));
  await copyIfExists(path.join(sourceRoot, "package.json"), path.join(installRoot, "package.json"));
  await copyIfExists(path.join(sourceRoot, "README.md"), path.join(installRoot, "README.md"));
  await copyIfExists(path.join(sourceRoot, "LICENSE"), path.join(installRoot, "LICENSE"));

  const nodeModules = path.join(sourceRoot, "node_modules");
  if (await pathExists(nodeModules)) {
    await symlink(nodeModules, path.join(installRoot, "node_modules"), "dir");
  }

  return realpath(path.join(installRoot, "bin", "agentplane.js"));
}

function apBinFromAgentplaneBin(binPath: string): string {
  return path.join(path.dirname(binPath), "ap.js");
}

function runInstalled(
  binPath: string,
  args: readonly string[],
  opts: { cwd: string; env?: NodeJS.ProcessEnv },
): Promise<CommandResult> {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      [binPath, ...args],
      {
        cwd: opts.cwd,
        env: installedEnv(opts.env),
        maxBuffer: 10 * 1024 * 1024,
      },
      (error, stdout, stderr) => {
        const maybeError = error as NodeJS.ErrnoException | null;
        resolve({
          code: typeof maybeError?.code === "number" ? maybeError.code : 0,
          stderr: String(stderr),
          stdout: String(stdout),
        });
      },
    );
  });
}

async function expectInstalledOk(
  binPath: string,
  args: readonly string[],
  cwd: string,
): Promise<CommandResult> {
  const result = await runInstalled(binPath, args, { cwd });
  expect(result, [args.join(" "), result.stdout, result.stderr].join("\n")).toMatchObject({
    code: 0,
  });
  return result;
}

async function createSeedRepo(): Promise<string> {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeFile(path.join(root, "README.md"), "# Installed smoke\n", "utf8");
  await execFileAsync("git", ["add", "README.md"], { cwd: root, env: cleanGitEnv() });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root, env: cleanGitEnv() });
  return root;
}

async function createTask(binPath: string, root: string, title: string): Promise<string> {
  const result = await expectInstalledOk(
    binPath,
    [
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Installed runtime smoke task",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ],
    root,
  );
  return result.stdout.trim();
}

async function approvePlan(binPath: string, root: string, taskId: string): Promise<void> {
  await expectInstalledOk(
    binPath,
    [
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1. Run the installed runtime smoke scenario\n2. Verify the generated project remains usable",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ],
    root,
  );
  await expectInstalledOk(
    binPath,
    ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root],
    root,
  );
}

describe("installed AgentPlane smoke", { timeout: INSTALLED_SMOKE_TIMEOUT_MS }, () => {
  it("exposes the experimental ap agent-mode entrypoint", async () => {
    const binPath = await createPseudoInstalledAgentplane();
    const apBin = apBinFromAgentplaneBin(binPath);

    const version = await expectInstalledOk(apBin, ["--version"], process.cwd());
    expect(version.stdout.trim()).toMatch(/^\d+\.\d+\.\d+/u);

    const help = await expectInstalledOk(apBin, ["help"], process.cwd());
    expect(help.stdout).toContain("Usage:");
    expect(help.stdout).not.toContain("Examples:");

    const nextHelp = await expectInstalledOk(apBin, ["next", "--help"], process.cwd());
    expect(nextHelp.stdout).toContain("agentplane task next [options]");
    expect(nextHelp.stdout).not.toContain("Examples:");
  });

  it("initializes a clean direct project and leaves managed pre-push hooks usable", async () => {
    const binPath = await createPseudoInstalledAgentplane();
    const root = await createSeedRepo();
    const remote = path.join(await mkTempDir(), "origin.git");
    await execFileAsync("git", ["init", "--bare", remote], { env: cleanGitEnv() });
    await execFileAsync("git", ["remote", "add", "origin", remote], {
      cwd: root,
      env: cleanGitEnv(),
    });

    await expectInstalledOk(
      binPath,
      [
        "init",
        "--yes",
        "--workflow",
        "direct",
        "--backend",
        "local",
        "--hooks",
        "true",
        "--require-network-approval",
        "true",
        "--root",
        root,
      ],
      root,
    );

    const shim = await readFile(path.join(root, ".agentplane", "bin", "agentplane"), "utf8");
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(`INSTALL_BIN='${binPath}'`);

    await expect(
      execFileAsync("git", ["push", "-u", "origin", "main"], {
        cwd: root,
        env: installedEnv(),
        maxBuffer: 10 * 1024 * 1024,
      }),
    ).resolves.toBeDefined();

    const taskId = await createTask(binPath, root, "Installed direct smoke");
    await approvePlan(binPath, root, taskId);
    await expectInstalledOk(
      binPath,
      [
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: installed runtime smoke is ready for verification.",
        "--root",
        root,
      ],
      root,
    );
    await expectInstalledOk(
      binPath,
      [
        "verify",
        taskId,
        "--ok",
        "--by",
        "CODER",
        "--note",
        "Installed smoke passed.",
        "--root",
        root,
      ],
      root,
    );
  });

  it("initializes a branch_pr project and seeds worktree hook shims from the installed binary", async () => {
    const binPath = await createPseudoInstalledAgentplane();
    const root = await createSeedRepo();

    await expectInstalledOk(
      binPath,
      [
        "init",
        "--yes",
        "--workflow",
        "branch_pr",
        "--backend",
        "local",
        "--hooks",
        "true",
        "--require-network-approval",
        "true",
        "--root",
        root,
      ],
      root,
    );
    await expectInstalledOk(binPath, ["branch", "base", "set", "main", "--root", root], root);

    const taskId = await createTask(binPath, root, "Installed branch_pr smoke");
    await approvePlan(binPath, root, taskId);
    await expectInstalledOk(
      binPath,
      [
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "installed-smoke",
        "--worktree",
        "--root",
        root,
      ],
      root,
    );

    const worktreeRoot = path.join(root, ".agentplane", "worktrees", `${taskId}-installed-smoke`);
    const shim = await readFile(
      path.join(worktreeRoot, ".agentplane", "bin", "agentplane"),
      "utf8",
    );
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(`INSTALL_BIN='${binPath}'`);
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_GLOBAL");
  });
});
