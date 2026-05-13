import path from "node:path";

export const AGENTPLANE_CACHE_SQLITE_RELATIVE = ".agentplane/cache.sqlite";

export function resolveAgentplaneCacheSqlitePath(root: string): string {
  return path.join(root, AGENTPLANE_CACHE_SQLITE_RELATIVE);
}
