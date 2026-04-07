import { extractLastVerifiedSha } from "../../shared/pr-meta.js";
import { isTaskLocalOnlyAdvance } from "../../shared/task-local-freshness.js";

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
  taskId: string;
  branchHeadSha: string;
  metaHeadSha: unknown;
  metaLastVerifiedSha: unknown;
  metaVerifyStatus: unknown;
  taskVerificationState: unknown;
  verifyLogText: string | null;
  requiresVerify: boolean;
}): Promise<PrArtifactFreshness> {
  const metaHeadSha = normalizeSha(opts.metaHeadSha);
  const metaLastVerifiedSha = normalizeSha(opts.metaLastVerifiedSha);
  const verifyLogSha = normalizeSha(extractLastVerifiedSha(opts.verifyLogText ?? ""));
  const metaVerifyPassed = opts.metaVerifyStatus === "pass";

  const reviewFresh =
    metaHeadSha === opts.branchHeadSha ||
    (await isTaskLocalOnlyAdvance({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      fromRef: metaHeadSha,
      toRef: opts.branchHeadSha,
    }));

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
    (metaLastVerifiedSha === opts.branchHeadSha ||
      (await isTaskLocalOnlyAdvance({
        gitRoot: opts.gitRoot,
        workflowDir: opts.workflowDir,
        taskId: opts.taskId,
        fromRef: metaLastVerifiedSha,
        toRef: opts.branchHeadSha,
      })));
  const verifiedFromLog = verifyLogSha === opts.branchHeadSha;
  const verifiedFromTaskState =
    opts.taskVerificationState === "ok" && reviewFresh && metaLastVerifiedSha === null;
  const verifySatisfied = verifiedFromMeta || verifiedFromLog || verifiedFromTaskState;

  return {
    reviewFresh,
    verifyFresh: verifySatisfied,
    verifySatisfied,
    verifyLogSha,
    effectiveVerifiedSha: verifySatisfied ? opts.branchHeadSha : metaLastVerifiedSha,
  };
}
