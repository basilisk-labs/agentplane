import { readFile } from "node:fs/promises";
import path from "node:path";

export type DirectWorkLock = {
  task_id: string;
  agent: string;
  slug: string;
  branch: string;
  started_at: string;
};

export function directWorkLockPath(agentplaneDir: string): string {
  return path.join(agentplaneDir, "cache", "direct-work.json");
}

export async function readDirectWorkLock(agentplaneDir: string): Promise<DirectWorkLock | null> {
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
