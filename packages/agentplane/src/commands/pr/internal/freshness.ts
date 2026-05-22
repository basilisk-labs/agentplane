import { createHash } from "node:crypto";

import { extractLastVerifiedSha } from "../../shared/pr-meta.js";
import { isTaskLocalOnlyAdvance } from "../../shared/task-local-freshness.js";

export const PR_DIFFSTAT_DIGEST_FIELD = "diffstat_sha256";
export const PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD = "last_verified_diffstat_sha256";

export function digestPrDiffstatText(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

function normalizeSha(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export type PrArtifactFreshness = {
  reviewFresh: boolean;
  verifyFresh: boolean;
  verifySatisfied: boolean;
  verifyLogSha: string | null;
  effectiveVerifiedSha: string | null;
};

export async function assessPrArtifactFreshness(opts: {
  gitRoot: string;
  workflowDir: string;
  tasksPath?: string;
  taskId: string;
  branchHeadSha: string;
  metaHeadSha: unknown;
  metaLastVerifiedSha: unknown;
  metaDiffstatDigest: unknown;
  metaLastVerifiedDiffstatDigest: unknown;
  currentDiffstatDigest: string | null;
  metaVerifyStatus: unknown;
  taskVerificationState: unknown;
  verifyLogText: string | null;
  requiresVerify: boolean;
}): Promise<PrArtifactFreshness> {
  const metaHeadSha = normalizeSha(opts.metaHeadSha);
  const metaLastVerifiedSha = normalizeSha(opts.metaLastVerifiedSha);
  const metaDiffstatDigest = normalizeSha(opts.metaDiffstatDigest);
  const metaLastVerifiedDiffstatDigest = normalizeSha(opts.metaLastVerifiedDiffstatDigest);
  const verifyLogSha = normalizeSha(extractLastVerifiedSha(opts.verifyLogText ?? ""));
  const metaVerifyPassed = opts.metaVerifyStatus === "pass";

  const reviewFresh =
    (metaDiffstatDigest !== null &&
      opts.currentDiffstatDigest !== null &&
      metaDiffstatDigest === opts.currentDiffstatDigest) ||
    metaHeadSha === opts.branchHeadSha ||
    (metaHeadSha !== null &&
      (await isTaskLocalOnlyAdvance({
        gitRoot: opts.gitRoot,
        workflowDir: opts.workflowDir,
        tasksPath: opts.tasksPath,
        taskId: opts.taskId,
        fromRef: metaHeadSha,
        toRef: opts.branchHeadSha,
      })));

  if (!opts.requiresVerify) {
    return {
      reviewFresh,
      verifyFresh: true,
      verifySatisfied: true,
      verifyLogSha,
      effectiveVerifiedSha: null,
    };
  }

  const verifiedFromMeta =
    metaVerifyPassed &&
    ((metaLastVerifiedDiffstatDigest !== null &&
      opts.currentDiffstatDigest !== null &&
      metaLastVerifiedDiffstatDigest === opts.currentDiffstatDigest) ||
      metaLastVerifiedSha === opts.branchHeadSha ||
      (metaLastVerifiedSha !== null &&
        (await isTaskLocalOnlyAdvance({
          gitRoot: opts.gitRoot,
          workflowDir: opts.workflowDir,
          tasksPath: opts.tasksPath,
          taskId: opts.taskId,
          fromRef: metaLastVerifiedSha,
          toRef: opts.branchHeadSha,
        }))));
  const verifiedFromLog = verifyLogSha === opts.branchHeadSha;
  const verifySatisfied = verifiedFromMeta || verifiedFromLog;

  return {
    reviewFresh,
    verifyFresh: verifySatisfied,
    verifySatisfied,
    verifyLogSha,
    effectiveVerifiedSha: verifySatisfied ? opts.branchHeadSha : metaLastVerifiedSha,
  };
}
