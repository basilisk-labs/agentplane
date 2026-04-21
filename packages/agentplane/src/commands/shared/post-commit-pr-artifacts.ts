import { warnMessage } from "../../cli/output.js";
import { normalizeGhTransportError } from "../shared/gh-transport.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import type { CommandContext } from "../shared/task-backend.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";
import { isTaskLocalOnlyAdvance } from "./task-local-freshness.js";

function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    /unknown revision or path not in the working tree/i.test(message) ||
    /bad revision/i.test(message) ||
    /ambiguous argument/i.test(message)
  );
}

async function resolveHeadParent(gitRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD^"], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const parent = stdout.trim();
    return parent.length > 0 ? parent : null;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return null;
  }
}

export async function refreshBranchPrArtifactsAfterTaskCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  quiet: boolean;
}): Promise<void> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return;

  try {
    const gitRoot = opts.ctx.resolvedProject.gitRoot;
    const headParent = await resolveHeadParent(gitRoot);
    if (
      await isTaskLocalOnlyAdvance({
        gitRoot,
        workflowDir: opts.ctx.config.paths.workflow_dir,
        tasksPath: opts.ctx.config.paths.tasks_path,
        taskId: opts.taskId,
        fromRef: headParent,
        toRef: "HEAD",
      })
    ) {
      return;
    }

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
