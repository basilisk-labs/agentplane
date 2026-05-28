import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { gitAddPaths, gitCommit, gitEnv, gitStagedPaths } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { infoMessage } from "../../cli/output.js";
import { detectParentGitRoot } from "../../cli/run-cli/commands/init/git.js";
import type { InitParsed } from "../../cli/run-cli/commands/init/model.js";
import { cmdInit } from "../../cli/run-cli/commands/init/orchestrate.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

const execFileAsync = promisify(execFile);
const CONTEXT_BOOTSTRAP_TASK_ID = "202601010101-CTX1NT";
const SAFE_EMPTY_PLACEHOLDERS = new Set([".DS_Store"]);

const contextBootstrapInitSpec: CommandSpec<InitParsed> = {
  id: ["init"],
  group: "Setup",
  summary: "Initialize agentplane project files before context bootstrap.",
  parse: () => ({ yes: true }),
};

export async function loadOrBootstrapCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{ ctx: CommandContext; bootstrapped: boolean }> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = await inspectBootstrapTarget(root);
  if (target?.canBootstrap) {
    return { ctx: await bootstrapEmptyProjectForContextInit(root), bootstrapped: true };
  }

  try {
    return {
      ctx: await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }),
      bootstrapped: false,
    };
  } catch (err) {
    if (target && !target.hasAgentplaneDir && isMissingProjectError(err)) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message:
          "context init can bootstrap AgentPlane only in an empty directory. " +
          "Run agentplane init explicitly before context init for non-empty directories.",
      });
    }
    throw err;
  }
}

export async function assertContextBootstrapIndexClean(root: string): Promise<void> {
  const baseGitEnv = gitEnv();
  if (!(await isInsideGitWorkTree(root, baseGitEnv))) return;
  const stagedBefore = await gitStagedPaths(root);
  if (stagedBefore.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      "Git index has staged changes; commit or unstage them before running agentplane context init.",
  });
}

export async function commitContextBootstrapIfChanged(
  root: string,
  paths: string[],
): Promise<boolean> {
  const baseGitEnv = gitEnv();
  if (!(await isInsideGitWorkTree(root, baseGitEnv))) return false;
  const dedupedPaths = [...new Set(paths)].filter((entry) => entry.length > 0);
  const committablePaths = await filterGitIgnoredPaths(root, dedupedPaths, baseGitEnv);
  if (committablePaths.length === 0) return false;
  await gitAddPaths(root, committablePaths);
  const staged = await gitStagedPaths(root);
  if (staged.length === 0) return false;
  const env = {
    ...baseGitEnv,
    AGENTPLANE_ALLOW_POLICY: "1",
    AGENTPLANE_TASK_ID: CONTEXT_BOOTSTRAP_TASK_ID,
  };
  await gitCommit(
    root,
    [
      "✅ CTX1NT task: initialize AgentPlane context",
      "",
      "Context-Bootstrap: true",
      `Context-Bootstrap-Task: ${CONTEXT_BOOTSTRAP_TASK_ID}`,
    ].join("\n"),
    { env },
  );
  return true;
}

async function isInsideGitWorkTree(root: string, env: NodeJS.ProcessEnv): Promise<boolean> {
  try {
    const result = await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: root,
      env,
    });
    return result.stdout.trim() === "true";
  } catch {
    return false;
  }
}

async function filterGitIgnoredPaths(
  root: string,
  paths: string[],
  env: NodeJS.ProcessEnv,
): Promise<string[]> {
  const kept: string[] = [];
  for (const relative of paths) {
    if (await isGitIgnoredPath(root, relative, env)) continue;
    kept.push(relative);
  }
  return kept;
}

async function isGitIgnoredPath(
  root: string,
  relative: string,
  env: NodeJS.ProcessEnv,
): Promise<boolean> {
  try {
    await execFileAsync("git", ["check-ignore", "--quiet", "--", relative], { cwd: root, env });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

type BootstrapTarget = {
  canBootstrap: boolean;
  hasAgentplaneDir: boolean;
};

async function inspectBootstrapTarget(root: string): Promise<BootstrapTarget | null> {
  const entries = await readBootstrapTargetEntries(root);
  if (!entries) return null;
  const meaningfulEntries = entries.filter((entry) => !SAFE_EMPTY_PLACEHOLDERS.has(entry));
  const canBootstrap =
    meaningfulEntries.length === 0 ||
    (meaningfulEntries.length === 1 && meaningfulEntries[0] === ".git");

  return {
    canBootstrap,
    hasAgentplaneDir: meaningfulEntries.includes(".agentplane"),
  };
}

async function bootstrapEmptyProjectForContextInit(root: string): Promise<CommandContext> {
  const parentGitRoot = await detectParentGitRoot(root);
  if (parentGitRoot) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        "context init can bootstrap AgentPlane only in a standalone empty directory. " +
        `Target ${root} is inside parent Git repository ${parentGitRoot}. ` +
        "Run agentplane init explicitly from the intended nested project root, then run agentplane context init.",
    });
  }

  process.stdout.write(
    infoMessage("agentplane project not found; bootstrapping empty directory") + "\n",
  );
  await cmdInit({
    cwd: root,
    rootOverride: root,
    outputMode: "text",
    flags: { yes: true },
    spec: contextBootstrapInitSpec,
  });
  return await loadCommandContext({ cwd: root, rootOverride: root });
}

async function readBootstrapTargetEntries(root: string): Promise<string[] | null> {
  try {
    return await readdir(root);
  } catch {
    return null;
  }
}

function isMissingProjectError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    message.startsWith("Not a git repository") ||
    message.includes("ENOENT") ||
    message.includes(".agentplane")
  );
}
