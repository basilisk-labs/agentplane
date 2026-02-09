import { rm } from "node:fs/promises";
import path from "node:path";

import { backupPath, fileExists, getPathKind } from "../../../fs-utils.js";
import { exitCodeForError } from "../../../exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

export async function collectInitConflicts(opts: {
  initDirs: string[];
  initFiles: string[];
}): Promise<string[]> {
  const conflicts: string[] = [];
  for (const dir of opts.initDirs) {
    const kind = await getPathKind(dir);
    if (kind && kind !== "dir") conflicts.push(dir);
  }
  for (const filePath of opts.initFiles) {
    if (await fileExists(filePath)) conflicts.push(filePath);
  }
  return conflicts;
}

export async function handleInitConflicts(opts: {
  gitRoot: string;
  conflicts: string[];
  backup: boolean;
  force: boolean;
}): Promise<void> {
  if (opts.conflicts.length === 0) return;

  if (opts.backup) {
    for (const conflict of opts.conflicts) {
      await backupPath(conflict);
    }
    return;
  }

  if (opts.force) {
    for (const conflict of opts.conflicts) {
      await rm(conflict, { recursive: true, force: true });
    }
    return;
  }

  const rendered = opts.conflicts
    .map((conflict) => `- ${path.relative(opts.gitRoot, conflict)}`)
    .join("\n");
  throw new CliError({
    exitCode: exitCodeForError("E_IO"),
    code: "E_IO",
    message:
      `Init conflicts detected:\n${rendered}\n` +
      "Re-run with --force to overwrite or --backup to preserve existing files.",
  });
}
