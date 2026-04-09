import { warnMessage } from "../../cli/output.js";
import { normalizeGhTransportError } from "../shared/gh-transport.js";
import type { CommandContext } from "../shared/task-backend.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";

export async function refreshBranchPrArtifactsAfterTaskCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  quiet: boolean;
}): Promise<void> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return;

  try {
    await ensurePrArtifactsSynced({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
  } catch (err) {
    if (opts.quiet) return;
    const detail = normalizeGhTransportError(err).trim();
    const suffix = detail ? ` (${detail})` : "";
    process.stderr.write(
      `${warnMessage(
        `task commit succeeded but PR artifacts refresh failed for ${opts.taskId}; run \`agentplane pr update ${opts.taskId}\`${suffix}`,
      )}\n`,
    );
  }
}
