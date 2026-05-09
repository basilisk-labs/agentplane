import { copyFile, cp, mkdir, readdir, rm, symlink } from "node:fs/promises";
import path from "node:path";

import { LocalBackend } from "../../backends/task-backend.js";
import { fileExists } from "../../cli/fs-utils.js";
import { resolveRuntimeSourceInfo } from "../../runtime/shared/runtime-source.js";
import type { CommandContext } from "../shared/task-backend.js";
import { isPathWithin } from "../shared/path.js";

function isPresentString(value: string | null): value is string {
  return value !== null;
}

export async function materializeLocalBackendReadmesForWorktree(opts: {
  backend: CommandContext["taskBackend"];
  repoRoot: string;
  worktreePath: string;
  taskId: string;
  workflowDir?: string;
}): Promise<void> {
  await materializeActiveTaskArtifactsForWorktree({
    repoRoot: opts.repoRoot,
    worktreePath: opts.worktreePath,
    workflowDir: opts.workflowDir ?? path.join(".agentplane", "tasks"),
    taskId: opts.taskId,
  });

  if (!(opts.backend instanceof LocalBackend)) return;

  const sourceRoot = path.resolve(opts.backend.root);
  if (!isPathWithin(opts.repoRoot, sourceRoot)) return;

  const relativeRoot = path.relative(opts.repoRoot, sourceRoot);
  const targetRoot = path.join(opts.worktreePath, relativeRoot);
  const entries = await readdir(sourceRoot, { withFileTypes: true }).catch(() => []);

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const sourceTaskRoot = path.join(sourceRoot, entry.name);
    const sourceReadme = path.join(sourceRoot, entry.name, "README.md");
    if (!(await fileExists(sourceReadme))) continue;

    const targetReadme = path.join(targetRoot, entry.name, "README.md");
    await mkdir(path.dirname(targetReadme), { recursive: true });
    await copyFile(sourceReadme, targetReadme);

    if (entry.name !== opts.taskId) continue;

    // Hand off ownership of the active task README to the task worktree so
    // later merges cannot collide with a stale untracked copy on the base checkout.
    await rm(sourceReadme, { force: true });
    const remainingEntries = await readdir(sourceTaskRoot).catch(() => []);
    if (remainingEntries.length === 0) {
      await rm(sourceTaskRoot, { recursive: true, force: true });
    }
  }
}

export async function materializeActiveTaskArtifactsForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
  workflowDir: string;
  taskId: string;
}): Promise<boolean> {
  const sourceTaskRoot = path.resolve(opts.repoRoot, opts.workflowDir, opts.taskId);
  if (!isPathWithin(opts.repoRoot, sourceTaskRoot)) return false;
  if (!(await fileExists(path.join(sourceTaskRoot, "README.md")))) return false;

  const relativeTaskRoot = path.relative(opts.repoRoot, sourceTaskRoot);
  const targetTaskRoot = path.join(opts.worktreePath, relativeTaskRoot);
  await mkdir(path.dirname(targetTaskRoot), { recursive: true });
  await cp(sourceTaskRoot, targetTaskRoot, { recursive: true, force: true });
  return true;
}

export async function materializeRepoLocalDistForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  const sourceRoots = resolveRuntimeSourceRoots(opts.repoRoot);
  const copyTargets = [
    ["packages/core/package.json", "packages/core/package.json"],
    ["packages/core/dist", "packages/core/dist"],
    ["packages/agentplane/package.json", "packages/agentplane/package.json"],
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

export async function materializeRepoLocalInstallLayoutForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  const sourceRoots = resolveRuntimeSourceRoots(opts.repoRoot);
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

function resolveRuntimeSourceRoots(repoRoot: string): string[] {
  const runtimeSource = resolveRuntimeSourceInfo({ cwd: process.cwd() });
  return [
    ...new Set(
      [
        path.resolve(repoRoot),
        path.resolve(process.cwd()),
        runtimeSource.agentplane.packageRoot
          ? path.resolve(runtimeSource.agentplane.packageRoot, "..", "..")
          : null,
      ].filter((value): value is string => isPresentString(value)),
    ),
  ];
}
