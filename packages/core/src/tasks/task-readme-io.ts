import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

import { atomicWriteFile } from "../fs/atomic-write.js";

import { parseTaskReadme, renderTaskReadme, type ParsedTaskReadme } from "./task-readme.js";

const TASK_README_LOCK_TIMEOUT_MS = 5000;
const TASK_README_LOCK_RETRY_MS = 25;

export async function readTaskReadme(readmePath: string): Promise<ParsedTaskReadme> {
  const text = await readFile(readmePath, "utf8");
  return parseTaskReadme(text);
}

export async function updateTaskReadmeAtomic(
  readmePath: string,
  updater: (
    parsed: ParsedTaskReadme,
  ) =>
    | { frontmatter: Record<string, unknown>; body: string }
    | Promise<{ frontmatter: Record<string, unknown>; body: string }>,
): Promise<void> {
  const lockPath = path.join(path.dirname(readmePath), `${path.basename(readmePath)}.lock`);
  const deadline = Date.now() + TASK_README_LOCK_TIMEOUT_MS;

  for (;;) {
    try {
      await mkdir(lockPath);
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException)?.code !== "EEXIST") throw error;
      if (Date.now() >= deadline) {
        throw new Error(
          `Timed out waiting for task README lock: ${path.basename(readmePath)}.lock`,
        );
      }
      await sleep(TASK_README_LOCK_RETRY_MS);
    }
  }

  try {
    const text = await readFile(readmePath, "utf8");
    const parsed = parseTaskReadme(text);
    const next = await updater(parsed);
    const rendered = renderTaskReadme(next.frontmatter, next.body);
    await atomicWriteFile(readmePath, rendered.endsWith("\n") ? rendered : `${rendered}\n`);
  } finally {
    await rm(lockPath, { recursive: true, force: true });
  }
}
