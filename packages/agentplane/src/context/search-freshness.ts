import { stat } from "node:fs/promises";
import path from "node:path";

import { readText } from "./context-utils.js";
import { projectRowsForFile, type ProjectionSourceRow } from "./reindex-projection.js";

type SourceFreshness = {
  rows: Map<string, string>;
};

export type ProjectionFreshness = {
  projection_sha256: string;
  file_sha256: string | null;
  stale: boolean;
};

type ProjectRows = (filePath: string, content: string) => ProjectionSourceRow[];

function sourcePathForRef(ref: string): string {
  return ref.split("#", 1)[0] ?? ref;
}

async function loadSourceFreshness(
  root: string,
  sourcePath: string,
  projectRows: ProjectRows,
): Promise<SourceFreshness | null> {
  const absolute = path.join(root, sourcePath);
  try {
    const sourceStats = await stat(absolute);
    if (!sourceStats.isFile()) return null;
    const rows = projectRows(sourcePath, await readText(absolute));
    return { rows: new Map(rows.map((row) => [row.path, row.sha256])) };
  } catch {
    return null;
  }
}

/** Reuses each source's stat/read/projection for the duration of one search query. */
export function createProjectionFreshnessCache(
  root: string,
  projectRows: ProjectRows = projectRowsForFile,
): (rowPath: string, projectionSha256: string) => Promise<ProjectionFreshness> {
  const sources = new Map<string, Promise<SourceFreshness | null>>();
  return async (rowPath, projectionSha256) => {
    const sourcePath = sourcePathForRef(rowPath);
    let source = sources.get(sourcePath);
    if (!source) {
      source = loadSourceFreshness(root, sourcePath, projectRows);
      sources.set(sourcePath, source);
    }
    const current = await source;
    const fileSha256 = current?.rows.get(rowPath) ?? null;
    return {
      projection_sha256: projectionSha256,
      file_sha256: fileSha256,
      stale: fileSha256 !== projectionSha256,
    };
  };
}
