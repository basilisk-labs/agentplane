import { lstat, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { parseTaskReadmeCached } from "../../backends/task-backend/parsed-readme-cache.js";

export type ScannedTaskReadme = {
  dirName: string;
  frontmatter: Record<string, unknown>;
  body: string;
};

type ScanEntry = { dirName: string; readmePath: string; stamp: string };

const SCAN_CONCURRENCY = 16;
const scans = new Map<string, { fingerprint: string; result: Promise<ScannedTaskReadme[]> }>();

async function listReadmes(tasksDir: string): Promise<ScanEntry[] | null> {
  let names: string[];
  try {
    const dirents = await readdir(tasksDir, { withFileTypes: true });
    names = dirents
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .toSorted();
  } catch {
    return null;
  }
  const entries: ScanEntry[] = [];
  for (const dirName of names) {
    const readmePath = path.join(tasksDir, dirName, "README.md");
    try {
      const stats = await lstat(readmePath, { bigint: true });
      if (!stats.isFile()) continue;
      entries.push({ dirName, readmePath, stamp: `${stats.mtimeNs}:${stats.size}:${stats.ino}` });
    } catch {
      continue;
    }
  }
  return entries;
}

async function parseAll(tasksDir: string, entries: ScanEntry[]): Promise<ScannedTaskReadme[]> {
  const results: (ScannedTaskReadme | null)[] = Array.from({ length: entries.length }, () => null);
  let next = 0;
  const worker = async () => {
    while (next < entries.length) {
      const index = next++;
      const entry = entries[index]!;
      try {
        const text = await readFile(entry.readmePath, "utf8");
        const parsed = await parseTaskReadmeCached({
          tasksDir,
          readmePath: entry.readmePath,
          text,
        });
        results[index] = {
          dirName: entry.dirName,
          frontmatter: parsed.frontmatter,
          body: parsed.body,
        };
      } catch {
        // Doctor probes skip unreadable or unparsable READMEs, as before.
      }
    }
  };
  await Promise.all(Array.from({ length: SCAN_CONCURRENCY }, () => worker()));
  return results.filter((item): item is ScannedTaskReadme => item !== null);
}

/**
 * Doctor probes each needed every Task README frontmatter, and each probe parsed
 * the whole task directory again. One scan is now shared per process while the
 * directory fingerprint (README names, mtimes, sizes, inodes) is unchanged, so a
 * fix applied between probes still triggers a fresh scan. Large READMEs reuse the
 * digest-checked parse cache. Callers must treat the returned records as read-only.
 */
export async function scanTaskReadmes(tasksDir: string): Promise<ScannedTaskReadme[]> {
  const key = path.resolve(tasksDir);
  const entries = await listReadmes(key);
  if (!entries) return [];
  const fingerprint = entries.map((entry) => `${entry.dirName}=${entry.stamp}`).join("\n");
  const cached = scans.get(key);
  if (cached?.fingerprint === fingerprint) return [...(await cached.result)];
  const result = parseAll(key, entries);
  scans.set(key, { fingerprint, result });
  return [...(await result)];
}
