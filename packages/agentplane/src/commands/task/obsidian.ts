import { mkdir, readdir, readFile, rm, rmdir } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { mapBackendError } from "../../cli/error-map.js";
import { handleTaskListWarnings } from "./shared/listing.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { toTaskSummaries, type TaskSummary } from "../../backends/task-backend.js";
import {
  GENERATED_OBSIDIAN_NOTE,
  renderObsidianTaskProjection,
  type ObsidianProjectionResult,
} from "./obsidian.render.js";

export { renderObsidianTaskProjection } from "./obsidian.render.js";
export type { ObsidianProjectionFile, ObsidianProjectionResult } from "./obsidian.render.js";

export type ObsidianCleanResult = {
  deleted: string[];
  preserved: string[];
};

const OBSIDIAN_GROUP_DIRS = ["by-status", "by-tag", "by-owner"] as const;
const OBSIDIAN_PROJECTION_DIR = ".agentplane/generated/obsidian";

export async function writeObsidianTaskProjection(opts: {
  root: string;
  tasks: readonly TaskSummary[];
}): Promise<ObsidianProjectionResult> {
  const projection = renderObsidianTaskProjection(opts.tasks);
  const projectionDir = path.join(opts.root, OBSIDIAN_PROJECTION_DIR);
  await mkdir(projectionDir, { recursive: true });
  await Promise.all(
    OBSIDIAN_GROUP_DIRS.map((dir) => removeGeneratedGroupPages(path.join(projectionDir, dir))),
  );
  for (const file of projection.files) {
    const outputPath = path.join(projectionDir, file.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await atomicWriteFile(outputPath, file.content);
  }
  await cleanLegacyObsidianTaskProjection(opts.root);
  return projection;
}

async function removeGeneratedGroupPages(dirPath: string): Promise<string[]> {
  let entries: Dirent[];
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const deleted = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const filePath = path.join(dirPath, entry.name);
        const text = await readFile(filePath, "utf8");
        if (text.startsWith(GENERATED_OBSIDIAN_NOTE)) {
          await rm(filePath, { force: true });
          return filePath;
        }
        return null;
      }),
  );
  return deleted.filter((filePath): filePath is string => filePath !== null);
}

async function removeEmptyDir(dirPath: string): Promise<boolean> {
  try {
    await rmdir(dirPath);
    return true;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "ENOTEMPTY" || code === "EEXIST") return false;
    throw error;
  }
}

async function removeGeneratedFile(filePath: string): Promise<"deleted" | "preserved" | "missing"> {
  let text: string;
  try {
    text = await readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "missing";
    throw error;
  }
  if (!text.startsWith(GENERATED_OBSIDIAN_NOTE)) return "preserved";
  await rm(filePath, { force: true });
  return "deleted";
}

export async function cleanObsidianTaskProjection(opts: {
  root: string;
}): Promise<ObsidianCleanResult> {
  const projectionDir = path.join(opts.root, OBSIDIAN_PROJECTION_DIR);
  const deleted: string[] = [];
  const preserved: string[] = [];

  for (const fileName of ["index.md", "tasks.md"]) {
    const filePath = path.join(projectionDir, fileName);
    const state = await removeGeneratedFile(filePath);
    if (state === "deleted") deleted.push(path.join(OBSIDIAN_PROJECTION_DIR, fileName));
    if (state === "preserved") preserved.push(path.join(OBSIDIAN_PROJECTION_DIR, fileName));
  }

  for (const dir of OBSIDIAN_GROUP_DIRS) {
    const dirPath = path.join(projectionDir, dir);
    const removedFiles = await removeGeneratedGroupPages(dirPath);
    deleted.push(...removedFiles.map((filePath) => path.relative(opts.root, filePath)));
    if (await removeEmptyDir(dirPath)) deleted.push(path.join(OBSIDIAN_PROJECTION_DIR, dir));
  }

  const legacy = await cleanLegacyObsidianTaskProjection(opts.root);
  deleted.push(...legacy.deleted);
  preserved.push(...legacy.preserved);

  return { deleted, preserved };
}

async function cleanLegacyObsidianTaskProjection(root: string): Promise<ObsidianCleanResult> {
  const agentplaneDir = path.join(root, ".agentplane");
  const deleted: string[] = [];
  const preserved: string[] = [];

  for (const fileName of ["index.md", "tasks.md"]) {
    const filePath = path.join(agentplaneDir, fileName);
    const state = await removeGeneratedFile(filePath);
    if (state === "deleted") deleted.push(path.join(".agentplane", fileName));
    if (state === "preserved") preserved.push(path.join(".agentplane", fileName));
  }

  for (const dir of OBSIDIAN_GROUP_DIRS) {
    const dirPath = path.join(agentplaneDir, dir);
    const removedFiles = await removeGeneratedGroupPages(dirPath);
    deleted.push(...removedFiles.map((filePath) => path.relative(root, filePath)));
    if (await removeEmptyDir(dirPath)) deleted.push(path.join(".agentplane", dir));
  }

  return { deleted, preserved };
}

async function listProjectionTasks(ctx: CommandContext): Promise<TaskSummary[]> {
  if (ctx.memo.taskProjection) return await ctx.memo.taskProjection;
  const read = async () => {
    if (ctx.taskBackend.listProjectionTasks) return await ctx.taskBackend.listProjectionTasks();
    return toTaskSummaries(await ctx.taskBackend.listTasks());
  };
  ctx.memo.taskProjection = read();
  return await ctx.memo.taskProjection;
}

export async function cmdTaskObsidian(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  strictRead?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await listProjectionTasks(ctx);
    handleTaskListWarnings({ backend: ctx.taskBackend, strictRead: opts.strictRead });
    const result = await writeObsidianTaskProjection({
      root: ctx.resolvedProject.gitRoot,
      tasks,
    });
    process.stdout.write(
      `${OBSIDIAN_PROJECTION_DIR}/index.md\n${OBSIDIAN_PROJECTION_DIR}/tasks.md\nfiles=${result.files.length} tasks=${result.taskCount}\n`,
    );
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task obsidian", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskObsidianClean(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const result = await cleanObsidianTaskProjection({ root: ctx.resolvedProject.gitRoot });
    process.stdout.write(`deleted=${result.deleted.length} preserved=${result.preserved.length}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task obsidian clean", root: opts.rootOverride ?? null });
  }
}
