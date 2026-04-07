import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { type CommandContext } from "../shared/task-backend.js";

import { syncPrArtifacts } from "./internal/sync.js";

function prOpenOutcomeDetails(meta: { pr_number?: number; pr_url?: string }): string {
  if (typeof meta.pr_number === "number" && meta.pr_number > 0) {
    return meta.pr_url?.trim()
      ? `linked to GitHub PR #${meta.pr_number}: ${meta.pr_url.trim()}`
      : `linked to GitHub PR #${meta.pr_number}`;
  }
  return "local PR artifacts synced; GitHub PR not created";
}

export async function cmdPrOpen(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const author = opts.author.trim();
    if (!author) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid value for --author.",
      });
    }

    const { meta, prDir, resolved } = await syncPrArtifacts({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      mode: "open",
      author,
      branch: opts.branch,
    });

    output.success("pr open", path.relative(resolved.gitRoot, prDir), prOpenOutcomeDetails(meta));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}
