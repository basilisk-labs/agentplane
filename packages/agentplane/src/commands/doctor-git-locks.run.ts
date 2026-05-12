import { rm } from "node:fs/promises";

import { exitCodeForError } from "../cli/exit-codes.js";
import { warnMessage, successMessage } from "../cli/output.js";
import type { CommandHandler } from "../cli/spec/spec.js";
import { resolveProject } from "@agentplaneorg/core/project";
import { resolveGitIndexLockInfo } from "../shared/git-mutation.js";

export type DoctorGitLocksParsed = {
  fix: boolean;
};

export const runDoctorGitLocks: CommandHandler<DoctorGitLocksParsed> = async (ctx, flags) => {
  const project = (await resolveProject({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
  })) as { gitRoot: string };
  const lockInfo = (await resolveGitIndexLockInfo({
    repoRoot: project.gitRoot,
  })) as { lockPath: string; ageMs: number } | null;

  if (!lockInfo) {
    process.stdout.write(
      `${successMessage("doctor git-locks", undefined, "no index.lock detected")}\n`,
    );
    return 0;
  }

  const message = `index.lock detected at ${lockInfo.lockPath}; ageMs=${lockInfo.ageMs}`;
  if (!flags.fix) {
    process.stderr.write(`${warnMessage(`doctor git-locks: ${message}`)}\n`);
    process.stderr.write(
      `${warnMessage("run `agentplane doctor git-locks --fix` only if no git process owns the lock")}\n`,
    );
    return exitCodeForError("E_GIT_LOCKED");
  }

  try {
    await rm(lockInfo.lockPath, { force: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "unknown error";
    throw new Error(`doctor git-locks --fix failed to remove lock: ${errorMessage}`);
  }

  process.stdout.write(`${successMessage("doctor git-locks", undefined, `${message} removed`)}\n`);
  return 0;
};
