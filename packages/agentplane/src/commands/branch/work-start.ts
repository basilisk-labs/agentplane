import {
  chmod,
  copyFile,
  cp,
  mkdir,
  readFile,
  readdir,
  symlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { LocalBackend } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitAheadBehind } from "../shared/git-diff.js";
import { gitBranchExists, gitBranchUpstream, gitCurrentBranch } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";
import { resolveRuntimeSourceInfo } from "../../shared/runtime-source.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

function isPresentString(value: string | null): value is string {
  return value !== null;
}
import { ensurePlanApprovedIfRequired } from "../task/shared.js";

import { validateWorkAgent, validateWorkSlug } from "./internal/work-validate.js";

const HOOK_SHIM_MARKER = "agentplane-hook-shim";

function repoLocalHookShimText(): string {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_SHIM_MARKER} (do not edit)`,
    "set -e",
    'SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"',
    'REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"',
    'LOCAL_BIN="$REPO_ROOT/packages/agentplane/bin/agentplane.js"',
    'if command -v node >/dev/null 2>&1 && [ -f "$LOCAL_BIN" ]; then',
    '  exec node "$LOCAL_BIN" "$@"',
    "fi",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  exec node "$ENV_BIN" "$@"',
    "fi",
    "if command -v agentplane >/dev/null 2>&1; then",
    '  exec agentplane "$@"',
    "fi",
    "if command -v npx >/dev/null 2>&1; then",
    '  exec npx --yes agentplane "$@"',
    "fi",
    'echo "agentplane shim: runner not found (need env runner, repo-local source, agentplane in PATH, or node+npx)." >&2',
    "  exit 127",
    "",
  ].join("\n");
}

type DirectWorkLock = {
  task_id: string;
  agent: string;
  slug: string;
  branch: string;
  started_at: string;
};

function directWorkLockPath(agentplaneDir: string): string {
  // Intentionally under cache/ so it stays out of git by default.
  return path.join(agentplaneDir, "cache", "direct-work.json");
}

async function readDirectWorkLock(agentplaneDir: string): Promise<DirectWorkLock | null> {
  try {
    const text = await readFile(directWorkLockPath(agentplaneDir), "utf8");
    const parsed = JSON.parse(text) as Partial<DirectWorkLock>;
    if (!parsed || typeof parsed !== "object") return null;
    if (
      typeof parsed.task_id !== "string" ||
      typeof parsed.agent !== "string" ||
      typeof parsed.slug !== "string" ||
      typeof parsed.branch !== "string" ||
      typeof parsed.started_at !== "string"
    ) {
      return null;
    }
    return parsed as DirectWorkLock;
  } catch {
    return null;
  }
}

async function writeDirectWorkLock(agentplaneDir: string, lock: DirectWorkLock): Promise<void> {
  const dir = path.dirname(directWorkLockPath(agentplaneDir));
  await mkdir(dir, { recursive: true });
  await writeFile(directWorkLockPath(agentplaneDir), JSON.stringify(lock, null, 2) + "\n", "utf8");
}

async function materializeLocalBackendReadmesForWorktree(opts: {
  backend: CommandContext["taskBackend"];
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  if (!(opts.backend instanceof LocalBackend)) return;

  const sourceRoot = path.resolve(opts.backend.root);
  if (!isPathWithin(opts.repoRoot, sourceRoot)) return;

  const relativeRoot = path.relative(opts.repoRoot, sourceRoot);
  const targetRoot = path.join(opts.worktreePath, relativeRoot);
  const entries = await readdir(sourceRoot, { withFileTypes: true }).catch(() => []);

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const sourceReadme = path.join(sourceRoot, entry.name, "README.md");
    if (!(await fileExists(sourceReadme))) continue;

    const targetReadme = path.join(targetRoot, entry.name, "README.md");
    await mkdir(path.dirname(targetReadme), { recursive: true });
    await copyFile(sourceReadme, targetReadme);
  }
}

async function materializeRepoLocalDistForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  const runtimeSource = resolveRuntimeSourceInfo({ cwd: process.cwd() });
  const sourceRoots = [
    ...new Set(
      [
        path.resolve(opts.repoRoot),
        path.resolve(process.cwd()),
        runtimeSource.agentplane.packageRoot
          ? path.resolve(runtimeSource.agentplane.packageRoot, "..", "..")
          : null,
      ].filter((value): value is string => isPresentString(value)),
    ),
  ];
  const copyTargets = [
    ["packages/core/dist", "packages/core/dist"],
    ["packages/agentplane/dist", "packages/agentplane/dist"],
    ["packages/agentplane/bin", "packages/agentplane/bin"],
  ] as const;

  for (const [sourceRelativePath, targetRelativePath] of copyTargets) {
    let sourcePath = "";
    for (const sourceRoot of sourceRoots) {
      const candidate = path.join(sourceRoot, sourceRelativePath);
      if (await fileExists(candidate)) {
        sourcePath = candidate;
        break;
      }
    }
    if (!sourcePath) continue;

    const targetPath = path.join(opts.worktreePath, targetRelativePath);
    if (await fileExists(targetPath)) continue;

    await mkdir(path.dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath, { recursive: true });
  }
}

async function linkDirectoryIntoWorktree(opts: {
  sourceRoots: string[];
  worktreePath: string;
  relativePath: string;
}): Promise<boolean> {
  let sourcePath = "";
  for (const sourceRoot of opts.sourceRoots) {
    const candidate = path.join(sourceRoot, opts.relativePath);
    if (await fileExists(candidate)) {
      sourcePath = candidate;
      break;
    }
  }
  if (!sourcePath) return false;

  const targetPath = path.join(opts.worktreePath, opts.relativePath);
  if (await fileExists(targetPath)) return false;

  await mkdir(path.dirname(targetPath), { recursive: true });
  await symlink(sourcePath, targetPath, process.platform === "win32" ? "junction" : "dir");
  return true;
}

async function materializeRepoLocalInstallLayoutForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  const runtimeSource = resolveRuntimeSourceInfo({ cwd: process.cwd() });
  const sourceRoots = [
    ...new Set(
      [
        path.resolve(opts.repoRoot),
        path.resolve(process.cwd()),
        runtimeSource.agentplane.packageRoot
          ? path.resolve(runtimeSource.agentplane.packageRoot, "..", "..")
          : null,
      ].filter((value): value is string => isPresentString(value)),
    ),
  ];
  const linkTargets = [
    "node_modules",
    path.join("packages", "core", "node_modules"),
    path.join("packages", "agentplane", "node_modules"),
    "agentplane-recipes",
  ];
  for (const relativePath of linkTargets) {
    await linkDirectoryIntoWorktree({
      sourceRoots,
      worktreePath: opts.worktreePath,
      relativePath,
    });
  }
}

async function materializeHookShimForWorktree(worktreePath: string): Promise<void> {
  const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
  if (await fileExists(shimPath)) return;

  await mkdir(path.dirname(shimPath), { recursive: true });
  await writeFile(shimPath, repoLocalHookShimText(), "utf8");
  await chmod(shimPath, 0o755);
}

async function ensureGitClean(gitRoot: string): Promise<void> {
  const { stdout } = await execFileAsync("git", ["status", "--porcelain"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  const lines = stdout
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);
  if (lines.length === 0) return;

  // Allow task workflow artifacts to be dirty. In direct mode we want a single-stream
  // workflow without task branches, but we still expect task docs to change.
  const allowedPrefixes = [
    ".agentplane/tasks/",
    ".agentplane/tasks.json",
    ".agentplane/cache/",
    ".agentplane/.upgrade/",
    ".agentplane/upgrade/",
  ];
  const isAllowed = (p: string): boolean => allowedPrefixes.some((prefix) => p.startsWith(prefix));

  const dirty = lines
    .map((line) => {
      // Format: XY <path> (we only need the path-ish tail).
      const rest = line.slice(2).trim();
      if (!rest) return "";
      // Rename/copy format: "old -> new"
      const arrow = rest.lastIndexOf(" -> ");
      if (arrow === -1) return rest;
      return rest.slice(arrow + 4).trim();
    })
    .filter((p) => p.length > 0 && !isAllowed(p));

  if (dirty.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      "Working tree has non-task changes. In workflow_mode=direct, agentplane runs tasks in a single stream on the current branch; commit/stash your changes before starting a different task.",
  });
}

async function ensureCurrentBaseBranch(gitRoot: string, baseBranch: string): Promise<void> {
  const upstreamBranch = await gitBranchUpstream(gitRoot, baseBranch);
  if (!upstreamBranch) return;

  const { behind } = await gitAheadBehind(gitRoot, upstreamBranch, baseBranch);
  if (behind === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `Base branch ${baseBranch} is behind its upstream ${upstreamBranch} by ${behind} commit(s). ` +
      "Refresh the base branch before `agentplane work start` to avoid DIRTY hosted PRs.",
  });
}

export async function cmdWorkStart(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  agent: string;
  slug: string;
  worktree: boolean;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    validateWorkAgent(opts.agent);
    validateWorkSlug(opts.slug);

    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const mode = config.workflow_mode;
    if (mode !== "branch_pr" && opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `--worktree is only supported in workflow_mode=branch_pr (current: ${mode}).`,
      });
    }
    if (mode === "branch_pr" && !opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--worktree is required when workflow_mode=branch_pr.",
      });
    }

    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    ensurePlanApprovedIfRequired(task, config);

    const currentBranch = await gitCurrentBranch(resolved.gitRoot);

    // direct mode: single-stream, no task branches.
    if (mode === "direct") {
      await ensureGitClean(resolved.gitRoot);

      const existingLock = await readDirectWorkLock(resolved.agentplaneDir);
      if (existingLock && existingLock.task_id !== opts.taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            `Another task is already active in this workspace (workflow_mode=direct): ${existingLock.task_id}. ` +
            `Finish it first, or delete ${path.relative(resolved.gitRoot, directWorkLockPath(resolved.agentplaneDir))} to override.`,
        });
      }

      await writeDirectWorkLock(resolved.agentplaneDir, {
        task_id: opts.taskId,
        agent: opts.agent,
        slug: opts.slug.trim(),
        branch: currentBranch,
        started_at: new Date().toISOString(),
      });

      output.success("work start", opts.taskId, `mode=direct branch=${currentBranch}`);
      return 0;
    }

    let baseRef = currentBranch;
    if (mode === "branch_pr") {
      const baseBranch = await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode,
      });
      if (!baseBranch) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Base branch could not be resolved (use `agentplane branch base set`).",
        });
      }
      if (currentBranch !== baseBranch) {
        throw new CliError({
          exitCode: exitCodeForError("E_GIT"),
          code: "E_GIT",
          message: `work start must be run on base branch ${baseBranch} (current: ${currentBranch})`,
        });
      }
      await ensureCurrentBaseBranch(resolved.gitRoot, baseBranch);
      baseRef = baseBranch;
    }

    const prefix = config.branch.task_prefix;
    const branchName = `${prefix}/${opts.taskId}/${opts.slug.trim()}`;

    const branchExists = await gitBranchExists(resolved.gitRoot, branchName);
    let worktreePath = "";
    if (opts.worktree) {
      const worktreesDir = path.resolve(resolved.gitRoot, config.paths.worktrees_dir);
      if (!isPathWithin(resolved.gitRoot, worktreesDir)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
        });
      }
      worktreePath = path.join(worktreesDir, `${opts.taskId}-${opts.slug.trim()}`);
      if (await fileExists(worktreePath)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `Worktree path already exists: ${worktreePath}`,
        });
      }
      await mkdir(worktreesDir, { recursive: true });

      const worktreeArgs = branchExists
        ? ["worktree", "add", worktreePath, branchName]
        : ["worktree", "add", "-b", branchName, worktreePath, baseRef];
      await execFileAsync("git", worktreeArgs, { cwd: resolved.gitRoot, env: gitEnv() });
      await materializeLocalBackendReadmesForWorktree({
        backend: ctx.taskBackend,
        repoRoot: resolved.gitRoot,
        worktreePath,
      });
      await materializeRepoLocalDistForWorktree({
        repoRoot: resolved.gitRoot,
        worktreePath,
      });
      await materializeRepoLocalInstallLayoutForWorktree({
        repoRoot: resolved.gitRoot,
        worktreePath,
      });
      await materializeHookShimForWorktree(worktreePath);
    } else {
      if (branchExists) {
        if (currentBranch !== branchName) {
          await execFileAsync("git", ["checkout", "-q", branchName], {
            cwd: resolved.gitRoot,
            env: gitEnv(),
          });
        }
      } else {
        await execFileAsync("git", ["checkout", "-q", "-b", branchName, baseRef], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      }
    }

    output.success(
      "work start",
      branchName,
      opts.worktree ? `worktree=${path.relative(resolved.gitRoot, worktreePath)}` : "",
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "work start", root: opts.rootOverride ?? null });
  }
}
