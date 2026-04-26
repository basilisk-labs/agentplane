import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { INCIDENTS_POLICY_PATH } from "../../../runtime/incidents/index.js";
import { writeTextIfChanged } from "../../../shared/write-if-changed.js";

export function nowIso(): string {
  return new Date().toISOString();
}

export async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function restoreIncidentRegistryIfNeeded(opts: {
  gitRoot: string;
  previousText: string | null;
}): Promise<void> {
  const incidentsPath = path.join(opts.gitRoot, INCIDENTS_POLICY_PATH);
  const nextText = await readTextIfExists(incidentsPath);
  if (nextText === opts.previousText) return;
  if (opts.previousText === null) {
    await rm(incidentsPath, { force: true });
    return;
  }
  await writeTextIfChanged(incidentsPath, opts.previousText);
}
