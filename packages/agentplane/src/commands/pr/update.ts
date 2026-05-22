import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { gitRevParse } from "../shared/git-ops.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { maybeAutoCommitTaskPrArtifacts } from "./internal/auto-commit.js";
import {
  assessPrArtifactFreshness,
  digestPrDiffstatText,
  PR_DIFFSTAT_DIGEST_FIELD,
  PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD,
} from "./internal/freshness.js";
import { syncPrArtifacts } from "./internal/sync.js";
import { computePrDiffstat } from "./internal/sync-branch.js";

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

async function warnOnStaleVerifyAfterUpdate(opts: {
  output: ReturnType<typeof createCliEmitter>;
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  prDir: string;
  resolved: { gitRoot: string };
  meta: {
    base?: string | null;
    branch?: string | null;
    head_sha?: string | null;
    last_verified_sha?: string | null;
    [PR_DIFFSTAT_DIGEST_FIELD]?: unknown;
    [PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD]?: unknown;
    verify?: { status?: string | null } | null;
  };
}): Promise<void> {
  const branch = opts.meta.branch?.trim() ?? "";
  if (!branch) return;

  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const { config, task } = await loadBackendTask({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });
  const requiresVerify = Boolean(task.verify && task.verify.length > 0);
  if (!requiresVerify) return;

  const branchHeadSha = await gitRevParse(opts.resolved.gitRoot, [`${branch}^{commit}`]);
  const currentDiffstat = opts.meta.base
    ? await computePrDiffstat({
        gitRoot: opts.resolved.gitRoot,
        baseBranch: opts.meta.base,
        branch,
        prDir: opts.prDir,
        tasksPath: config.paths.tasks_path,
      })
    : "";
  const verifyLogText = await readTextIfExists(path.join(opts.prDir, "verify.log"));
  const freshness = await assessPrArtifactFreshness({
    gitRoot: opts.resolved.gitRoot,
    workflowDir: path.join(opts.resolved.gitRoot, config.paths.workflow_dir),
    tasksPath: config.paths.tasks_path,
    taskId: opts.taskId,
    branchHeadSha,
    metaHeadSha: opts.meta.head_sha ?? null,
    metaLastVerifiedSha: opts.meta.last_verified_sha ?? null,
    metaDiffstatDigest: opts.meta[PR_DIFFSTAT_DIGEST_FIELD] ?? null,
    metaLastVerifiedDiffstatDigest: opts.meta[PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD] ?? null,
    currentDiffstatDigest: digestPrDiffstatText(currentDiffstat ? `${currentDiffstat}\n` : ""),
    metaVerifyStatus: opts.meta.verify?.status ?? null,
    taskVerificationState: task.verification?.state ?? null,
    verifyLogText,
    requiresVerify,
  });

  const lastVerifiedDiffstatDigest = opts.meta[PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD];
  if ((opts.meta.last_verified_sha || lastVerifiedDiffstatDigest) && !freshness.verifyFresh) {
    opts.output.warn(
      `Verify state stale: recorded_verify=${String(opts.meta.last_verified_sha ?? lastVerifiedDiffstatDigest)} current_head=${branchHeadSha}; run \`agentplane verify ${opts.taskId} --ok --by <ROLE> --note "Verified: ..."\` before integrating`,
    );
  }
}

export async function cmdPrUpdate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  includeTaskIds?: string[];
  silent?: boolean;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const commandCtx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { meta, prDir, resolved } = await syncPrArtifacts({
      ctx: commandCtx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      mode: "update",
      includeTaskIds: opts.includeTaskIds,
    });
    if (meta.branch) {
      await maybeAutoCommitTaskPrArtifacts({
        ctx: commandCtx,
        taskId: opts.taskId,
        branch: meta.branch,
        strategy: "amend",
      });
    }

    await warnOnStaleVerifyAfterUpdate({
      output,
      ctx: commandCtx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      prDir,
      resolved,
      meta,
    });

    if (!opts.silent) output.success("pr update", path.relative(resolved.gitRoot, prDir));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}
