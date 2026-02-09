import { readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { successMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import { appendHandoffNote } from "./internal/review-template.js";

export async function cmdPrNote(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    const body = opts.body.trim();
    if (!author) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid value for --author.",
      });
    }
    if (!body) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid value for --body.",
      });
    }

    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { config, reviewPath, resolved } = await resolvePrPaths({ ...opts, ctx });
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(reviewPath))) {
      const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Missing ${relReviewPath} (run \`agentplane pr open\`)`,
      });
    }

    const review = await readFile(reviewPath, "utf8");
    const updated = appendHandoffNote(review, `${author}: ${body}`);
    await atomicWriteFile(reviewPath, updated, "utf8");

    process.stdout.write(`${successMessage("pr note", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr note", root: opts.rootOverride ?? null });
  }
}
