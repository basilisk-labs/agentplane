import path from "node:path";
import { readFile } from "node:fs/promises";

import { fileExists } from "../../../../cli/fs-utils.js";
import { successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";
import {
  writeJsonStableIfChanged,
  writeTextIfChanged,
} from "../../../../shared/write-if-changed.js";
import { gitDiffStat } from "../../../shared/git-diff.js";
import { appendVerifyLog, parsePrMeta } from "../../../shared/pr-meta.js";

import { cmdFinish } from "../../../task/index.js";

function nowIso(): string {
  return new Date().toISOString();
}

export async function finalizeIntegrate(opts: {
  cwd: string;
  rootOverride?: string;
  gitRoot: string;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;
  taskId: string;

  branch: string;
  base: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  mergeHash: string;
  branchHeadSha: string;
  baseShaBeforeMerge: string;

  verifyEntries: { header: string; content: string }[];
  verifyCommands: string[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;

  quiet: boolean;
}): Promise<void> {
  if (!(await fileExists(opts.prDir))) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Missing PR artifact dir after merge: ${path.relative(opts.gitRoot, opts.prDir)}`,
    });
  }

  if (opts.verifyEntries.length > 0) {
    for (const entry of opts.verifyEntries) {
      await appendVerifyLog(opts.verifyLogPath, entry.header, entry.content);
    }
  }

  const rawMeta = await readFile(opts.metaPath, "utf8");
  const mergedMeta = parsePrMeta(rawMeta, opts.taskId);
  const now = nowIso();
  const nextMeta: Record<string, unknown> = {
    ...mergedMeta,
    branch: opts.branch,
    base: opts.base,
    merge_strategy: opts.mergeStrategy,
    status: "MERGED",
    merged_at: (mergedMeta as Record<string, unknown>).merged_at ?? now,
    merge_commit: opts.mergeHash,
    head_sha: opts.branchHeadSha,
    updated_at: now,
  };

  if (opts.verifyCommands.length > 0 && (opts.shouldRunVerify || opts.alreadyVerifiedSha)) {
    nextMeta.last_verified_sha = opts.branchHeadSha;
    nextMeta.last_verified_at = now;
    nextMeta.verify = mergedMeta.verify
      ? { ...mergedMeta.verify, status: "pass" }
      : { status: "pass", command: opts.verifyCommands.join(" && ") };
  }
  await writeJsonStableIfChanged(opts.metaPath, nextMeta);

  const diffstat = await gitDiffStat(opts.gitRoot, opts.baseShaBeforeMerge, opts.branch);
  await writeTextIfChanged(opts.diffstatPath, diffstat ? `${diffstat}\n` : "");

  const verifyDesc =
    opts.verifyCommands.length === 0
      ? "skipped(no commands)"
      : opts.shouldRunVerify
        ? "ran"
        : opts.alreadyVerifiedSha
          ? `skipped(already verified_sha=${opts.alreadyVerifiedSha})`
          : "skipped";
  const finishBody = `Verified: Integrated via ${opts.mergeStrategy}; verify=${verifyDesc}; pr=${path.relative(
    opts.gitRoot,
    opts.prDir,
  )}.`;

  await cmdFinish({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskIds: [opts.taskId],
    author: "INTEGRATOR",
    body: finishBody,
    result: `integrate: ${opts.mergeStrategy} ${opts.branch}`,
    risk: undefined,
    breaking: false,
    commit: undefined,
    force: false,
    commitFromComment: false,
    commitEmoji: undefined,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: false,
    commitRequireClean: false,
    statusCommit: false,
    statusCommitEmoji: undefined,
    statusCommitAllow: [],
    statusCommitAutoAllow: false,
    statusCommitRequireClean: false,
    confirmStatusCommit: false,
    quiet: opts.quiet,
  });

  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage("integrate", opts.taskId, `merge=${opts.mergeHash.slice(0, 12)}`)}\n`,
    );
  }
}
