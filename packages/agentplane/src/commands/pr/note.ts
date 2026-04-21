import { readFile } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { createCliEmitter, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import {
  appendPrHandoffNote,
  buildPrHandoffNote,
  readPrHandoffNotes,
} from "./internal/note-store.js";
import {
  buildGithubPrTitle,
  extractAutoSummaryBlock,
  renderGithubPrBody,
  renderPrReviewDocument,
} from "./internal/review-template.js";
import { parsePrMeta } from "../shared/pr-meta.js";

export async function cmdPrNote(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const output = createCliEmitter();
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
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { config, reviewPath, notesPath, githubTitlePath, githubBodyPath, metaPath, resolved } =
      await resolvePrPaths({ ...opts, ctx });
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
    const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
    await appendPrHandoffNote({
      notesPath,
      note: buildPrHandoffNote({
        createdAt: new Date().toISOString(),
        author,
        body,
      }),
    });
    const handoffNotes = await readPrHandoffNotes(notesPath);
    const autoSummary = extractAutoSummaryBlock(review) ?? "";
    const updated = renderPrReviewDocument({
      task,
      createdAt: meta.created_at ?? "",
      branch: meta.branch ?? "",
      handoffNotes,
      autoSummary,
    });
    const githubTitle = buildGithubPrTitle(task);
    const githubBody = renderGithubPrBody({
      task,
      handoffNotes,
      autoSummary,
    });
    await atomicWriteFile(reviewPath, updated, "utf8");
    await atomicWriteFile(githubTitlePath, `${githubTitle}\n`, "utf8");
    await atomicWriteFile(githubBodyPath, githubBody, "utf8");

    output.success("pr note", opts.taskId);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr note", root: opts.rootOverride ?? null });
  }
}
