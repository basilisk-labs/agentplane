import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { loadConfig } from "@agentplaneorg/core/config";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../cli/fs-utils.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  exportTaskProjectionSnapshot,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { migrateTaskReadmeDoc } from "./migrate-doc.readme.js";

type TaskMigrateDocParams = { all: boolean; quiet: boolean; taskIds: string[] };

export type TaskDocMigrationResult = {
  changed: number;
  changedPaths: string[];
};

async function resolveReadmePaths(opts: {
  tasksDir: string;
  params: TaskMigrateDocParams;
}): Promise<string[]> {
  if (!opts.params.all) {
    return opts.params.taskIds.map((taskId) => path.join(opts.tasksDir, taskId, "README.md"));
  }
  if ((await getPathKind(opts.tasksDir)) !== "dir") return [];
  const entries = await readdir(opts.tasksDir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(opts.tasksDir, entry.name, "README.md");
    if (await fileExists(readmePath)) out.push(readmePath);
  }
  return out;
}

async function canStageGitPath(gitRoot: string, relPath: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["ls-files", "--error-unmatch", "--", relPath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch {
    // Continue below: untracked paths may still be stageable when they are not ignored.
  }

  try {
    await execFileAsync("git", ["check-ignore", "--quiet", "--", relPath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return false;
  } catch {
    return true;
  }
}

async function exportProjectionSnapshotIfChanged(opts: {
  ctx: CommandContext;
  resolvedGitRoot: string;
  tasksPath: string;
}): Promise<string[]> {
  if (!(opts.ctx.taskBackend.exportProjectionSnapshot || opts.ctx.taskBackend.exportTasksJson)) {
    return [];
  }
  const relOutputPath = opts.tasksPath.replaceAll("\\", "/");
  const outputPath = path.join(opts.resolvedGitRoot, relOutputPath);
  let before: string | null = null;
  try {
    before = await readFile(outputPath, "utf8");
  } catch {
    before = null;
  }
  await exportTaskProjectionSnapshot({ ctx: opts.ctx, outputPath });
  let after: string | null = null;
  try {
    after = await readFile(outputPath, "utf8");
  } catch {
    after = null;
  }
  if (before === after) return [];
  return (await canStageGitPath(opts.resolvedGitRoot, relOutputPath)) ? [relOutputPath] : [];
}

export async function migrateTaskDocsInWorkspace(opts: {
  cwd: string;
  rootOverride?: string | null;
  all: boolean;
  taskIds: string[];
  resolvedProject?: Awaited<ReturnType<typeof resolveProject>>;
  config?: AgentplaneConfig;
  ctx?: CommandContext;
}): Promise<TaskDocMigrationResult> {
  const resolved =
    opts.resolvedProject ??
    (await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  let config = opts.config;
  if (!config) {
    const loadedConfig = await loadConfig(resolved.agentplaneDir);
    config = loadedConfig.config;
  }
  const ctx =
    opts.ctx ??
    (await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      resolvedProject: resolved,
      config,
    }));
  const params: TaskMigrateDocParams = { all: opts.all, quiet: false, taskIds: opts.taskIds };
  const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);

  const readmePaths = await resolveReadmePaths({ tasksDir, params });
  if (!opts.all) {
    for (const readmePath of readmePaths) {
      if (!(await fileExists(readmePath))) {
        const taskId = path.basename(path.dirname(readmePath));
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Task README not found: ${taskId}`,
        });
      }
    }
  }

  let changed = 0;
  const changedPaths: string[] = [];
  for (const readmePath of readmePaths) {
    const res = await migrateTaskReadmeDoc({ readmePath, config });
    if (!res.changed) continue;
    changed += 1;
    const relReadmePath = path.relative(resolved.gitRoot, readmePath).replaceAll("\\", "/");
    if (await canStageGitPath(resolved.gitRoot, relReadmePath)) {
      changedPaths.push(relReadmePath);
    }
  }

  if (changed > 0) {
    changedPaths.push(
      ...(await exportProjectionSnapshotIfChanged({
        ctx,
        resolvedGitRoot: resolved.gitRoot,
        tasksPath: config.paths.tasks_path,
      })),
    );
  }

  return { changed, changedPaths: [...new Set(changedPaths)] };
}

export async function cmdTaskMigrateDoc(opts: {
  cwd: string;
  rootOverride?: string;
  all: boolean;
  quiet: boolean;
  taskIds: string[];
}): Promise<number> {
  const params: TaskMigrateDocParams = { all: opts.all, quiet: opts.quiet, taskIds: opts.taskIds };
  try {
    const result = await migrateTaskDocsInWorkspace({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      all: params.all,
      taskIds: params.taskIds,
    });

    if (!params.quiet) {
      process.stdout.write(
        `${successMessage("migrated task docs", undefined, `changed=${result.changed}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task migrate-doc", root: opts.rootOverride ?? null });
  }
}
