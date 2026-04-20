import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskPrMeta } from "@agentplaneorg/core";

import { parsePrMeta } from "../../shared/pr-meta.js";
import type { CommandContext } from "../../shared/task-backend.js";
import type { LocalMergedPrMeta } from "./model.js";

export function resolveLocalMergedPrMeta(meta: TaskPrMeta | null): LocalMergedPrMeta | null {
  const branch = meta?.branch?.trim() ?? "";
  const mergeCommit = meta?.merge_commit?.trim() ?? "";
  if (meta?.status !== "MERGED" || !branch || !mergeCommit) return null;
  return {
    branch,
    base: meta.base ?? null,
    mergedAt: meta.merged_at ?? null,
    mergeCommit,
    headSha: meta.head_sha ?? null,
  };
}

export async function readPrMetaIfPresent(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{ meta: TaskPrMeta; metaPath: string } | null> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  try {
    const raw = await readFile(metaPath, "utf8");
    return { meta: parsePrMeta(raw, opts.taskId), metaPath };
  } catch {
    return null;
  }
}
