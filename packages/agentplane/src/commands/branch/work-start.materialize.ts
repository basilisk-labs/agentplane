import {
  copyFile,
  cp,
  lstat,
  mkdir,
  readdir,
  readFile,
  readlink,
  realpath,
  rm,
  symlink,
} from "node:fs/promises";
import path from "node:path";

import { LocalBackend } from "../../backends/task-backend.js";
import { fileExists } from "../../cli/fs-utils.js";
import { resolveRuntimeSourceInfo } from "../../runtime/shared/runtime-source.js";
import type { CommandContext } from "../shared/task-backend.js";
import { isPathWithin } from "../shared/path.js";

function isPresentString(value: string | null): value is string {
  return value !== null;
}

function declaredDirectDependencies(manifest: unknown): string[] {
  if (!manifest || typeof manifest !== "object") return [];
  const record = manifest as Record<string, unknown>;
  const names = ["dependencies", "devDependencies"].flatMap((field) => {
    const dependencies = record[field];
    return dependencies && typeof dependencies === "object"
      ? Object.keys(dependencies as Record<string, unknown>)
      : [];
  });
  return [...new Set(names)].toSorted();
}

export async function isReusableWorkspaceInstallLayout(opts: {
  repoRoot: string;
  sourceRoot: string;
}): Promise<boolean> {
  const sourcePath = path.join(opts.sourceRoot, "node_modules");
  const packageJsonPath = path.join(opts.sourceRoot, "package.json");
  const manifest = await readFile(packageJsonPath, "utf8")
    .then((text) => JSON.parse(text) as unknown)
    .catch(() => null);
  if (manifest === null) return false;

  const resolvedSource = await realpath(sourcePath).catch(() => null);
  if (!resolvedSource) return false;
  const taskWorktreesRoot = path.join(opts.repoRoot, ".agentplane", "worktrees");
  const resolvedTaskWorktreesRoot = await realpath(taskWorktreesRoot).catch(() =>
    path.resolve(taskWorktreesRoot),
  );
  if (isPathWithin(resolvedTaskWorktreesRoot, resolvedSource)) return false;

  for (const dependency of declaredDirectDependencies(manifest)) {
    const dependencyRoot = path.join(sourcePath, ...dependency.split("/"));
    const resolvedDependency = await realpath(dependencyRoot).catch(() => null);
    if (
      !resolvedDependency ||
      isPathWithin(resolvedTaskWorktreesRoot, resolvedDependency) ||
      !(await fileExists(path.join(dependencyRoot, "package.json")))
    ) {
      return false;
    }
  }
  return true;
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
  const sourceTaskRoot = path.join(sourceRoot, opts.taskId);
  const sourceReadme = path.join(sourceTaskRoot, "README.md");
  if (!(await fileExists(sourceReadme))) return;

  const targetReadme = path.join(targetRoot, opts.taskId, "README.md");
  await mkdir(path.dirname(targetReadme), { recursive: true });
  await copyFile(sourceReadme, targetReadme);

  // Hand off ownership of the active task README to the task worktree so
  // later merges cannot collide with a stale untracked copy on the base checkout.
  await rm(sourceReadme, { force: true });
  const remainingEntries = await readdir(sourceTaskRoot).catch(() => []);
  if (remainingEntries.length === 0) {
    await rm(sourceTaskRoot, { recursive: true, force: true });
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
    ["packages/recipes/package.json", "packages/recipes/package.json"],
    ["packages/recipes/dist", "packages/recipes/dist"],
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
  repoRoot: string;
  sourceRoots: string[];
  worktreePath: string;
  relativePath: string;
}): Promise<boolean> {
  let sourcePath = "";
  for (const sourceRoot of opts.sourceRoots) {
    const candidate = path.join(sourceRoot, opts.relativePath);
    const reusable =
      opts.relativePath !== "node_modules" ||
      (await isReusableWorkspaceInstallLayout({ repoRoot: opts.repoRoot, sourceRoot }));
    if ((await fileExists(candidate)) && reusable) {
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

async function cloneInstallLayoutEntry(opts: {
  sourcePath: string;
  sourceRoot: string;
  targetPath: string;
  worktreePath: string;
}): Promise<void> {
  const stats = await lstat(opts.sourcePath);
  if (stats.isSymbolicLink()) {
    const linkTarget = await readlink(opts.sourcePath);
    const resolvedSourceTarget = path.resolve(path.dirname(opts.sourcePath), linkTarget);
    const targetWithinSourceRoot = isPathWithin(opts.sourceRoot, resolvedSourceTarget);
    const mappedTarget = targetWithinSourceRoot
      ? path.join(opts.worktreePath, path.relative(opts.sourceRoot, resolvedSourceTarget))
      : resolvedSourceTarget;
    const resolvedTargetStats = await lstat(resolvedSourceTarget).catch(() => null);
    const linkType =
      process.platform === "win32"
        ? resolvedTargetStats?.isDirectory()
          ? "junction"
          : "file"
        : undefined;
    const portableTarget =
      process.platform === "win32"
        ? mappedTarget
        : path.relative(path.dirname(opts.targetPath), mappedTarget);
    await symlink(portableTarget, opts.targetPath, linkType);
    return;
  }
  if (stats.isDirectory()) {
    await mkdir(opts.targetPath, { recursive: true });
    for (const entry of await readdir(opts.sourcePath)) {
      await cloneInstallLayoutEntry({
        ...opts,
        sourcePath: path.join(opts.sourcePath, entry),
        targetPath: path.join(opts.targetPath, entry),
      });
    }
    return;
  }
  if (stats.isFile()) {
    await copyFile(opts.sourcePath, opts.targetPath);
  }
}

async function materializePackageLocalInstallLayout(opts: {
  sourceRoots: string[];
  worktreePath: string;
  relativePath: string;
}): Promise<boolean> {
  let sourceRoot = "";
  let sourcePath = "";
  for (const candidateRoot of opts.sourceRoots) {
    const candidate = path.join(candidateRoot, opts.relativePath);
    if (await fileExists(candidate)) {
      sourceRoot = candidateRoot;
      sourcePath = candidate;
      break;
    }
  }
  if (!sourcePath) return false;

  const targetPath = path.join(opts.worktreePath, opts.relativePath);
  if (await fileExists(targetPath)) return false;
  await mkdir(path.dirname(targetPath), { recursive: true });
  await cloneInstallLayoutEntry({
    sourcePath,
    sourceRoot,
    targetPath,
    worktreePath: opts.worktreePath,
  });
  return true;
}

export async function materializeRepoLocalInstallLayoutForWorktree(opts: {
  repoRoot: string;
  worktreePath: string;
}): Promise<void> {
  const sourceRoots = resolveRuntimeSourceRoots(opts.repoRoot);
  const linkTargets = ["node_modules", path.join("website", "node_modules"), "agentplane-recipes"];
  for (const relativePath of linkTargets) {
    await linkDirectoryIntoWorktree({
      repoRoot: opts.repoRoot,
      sourceRoots,
      worktreePath: opts.worktreePath,
      relativePath,
    });
  }
  for (const relativePath of ["core", "agentplane", "testkit", "recipes"].map((packageName) =>
    path.join("packages", packageName, "node_modules"),
  )) {
    await materializePackageLocalInstallLayout({
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
