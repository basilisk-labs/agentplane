import { readFile } from "node:fs/promises";

import { atomicWriteFile } from "../fs/atomic-write.js";

import { parseTaskReadme, renderTaskReadme, type ParsedTaskReadme } from "./task-readme.js";

export async function readTaskReadme(readmePath: string): Promise<ParsedTaskReadme> {
  const text = await readFile(readmePath, "utf8");
  return parseTaskReadme(text);
}

export async function updateTaskReadmeAtomic(
  readmePath: string,
  updater: (parsed: ParsedTaskReadme) => { frontmatter: Record<string, unknown>; body: string },
): Promise<void> {
  const text = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(text);
  const next = updater(parsed);
  const rendered = renderTaskReadme(next.frontmatter, next.body);
  await atomicWriteFile(readmePath, rendered.endsWith("\n") ? rendered : `${rendered}\n`);
}
