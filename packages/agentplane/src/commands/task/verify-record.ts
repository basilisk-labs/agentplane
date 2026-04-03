import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";
import { buildVerifiedPrMeta, parsePrMeta } from "../shared/pr-meta.js";

import {
  decodeEscapedTaskTextNewlines,
  executeTaskVerificationTransitionRequest,
  nowIso,
} from "./shared.js";

type VerifyState = "ok" | "needs_rework";
type VerifyCommandName = "task verify ok" | "task verify rework" | "verify";
type ResolvedVerifyRecordInput = {
  by: string;
  note: string;
  details: string | null;
};

async function recordVerificationResult(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string | null;
  quiet: boolean;
}): Promise<void> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  await ensureReconciledBeforeMutation({ ctx, command: "verify" });
  const backend = ctx.taskBackend;
  const config = ctx.config;
  const resolved = ctx.resolvedProject;
  if (!backend.getTaskDoc || !backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }

  const at = nowIso();
  await applyTaskMutation({
    ctx,
    taskId: opts.taskId,
    build: async (current) => {
      const execution = executeTaskVerificationTransitionRequest({
        task: current,
        at,
        by: opts.by,
        note: opts.note,
        state: opts.state,
        details: opts.details ?? null,
        doc:
          (typeof current.doc === "string" ? current.doc : "") ||
          (await backend.getTaskDoc!(current.id)),
        requiredSections: config.tasks.doc.required_sections,
      });
      return { intents: execution.intents };
    },
  });

  if (config.workflow_mode === "branch_pr") {
    const syncResult = await ensurePrArtifactsSynced({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.by,
    });
    if (syncResult) {
      const { metaPath } = await resolvePrPaths({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
      });
      const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
      await writeJsonStableIfChanged(
        metaPath,
        buildVerifiedPrMeta({
          meta,
          at,
          state: opts.state === "ok" ? "pass" : "fail",
        }),
      );
    }
  }

  if (!opts.quiet) {
    const readmePath = path.join(
      resolved.gitRoot,
      config.paths.workflow_dir,
      opts.taskId,
      "README.md",
    );
    const relReadmePath = path.relative(resolved.gitRoot, readmePath);
    process.stdout.write(
      `${successMessage("verified", opts.taskId, `state=${opts.state} readme=${relReadmePath}`)}\n`,
    );
  }
}

async function resolveVerifyRecordInput(opts: {
  cwd: string;
  by: string;
  note: string;
  details?: string;
  file?: string;
  command: VerifyCommandName;
}): Promise<ResolvedVerifyRecordInput> {
  const by = String(opts.by ?? "").trim();
  const note = String(opts.note ?? "").trim();
  if (!by || !note) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing required inputs: --by and --note.",
    });
  }
  if (typeof opts.details === "string" && typeof opts.file === "string") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Options --details and --file are mutually exclusive.",
    });
  }

  let details: string | null = typeof opts.details === "string" ? opts.details : null;
  if (typeof opts.file === "string") {
    try {
      details = await readFile(path.resolve(opts.cwd, opts.file), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: opts.command, filePath: opts.file });
    }
  }
  if (typeof details === "string") {
    details = decodeEscapedTaskTextNewlines(details);
  }

  return { by, note, details };
}

async function executeVerifyRecordCommand(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
  command: VerifyCommandName;
}): Promise<number> {
  const input = await resolveVerifyRecordInput(opts);

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: opts.state,
      by: input.by,
      note: input.note,
      details: input.details,
      quiet: opts.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: opts.command, root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskVerifyOk(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({ ...opts, state: "ok", command: "task verify ok" });
}

export async function cmdTaskVerifyRework(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({
    ...opts,
    state: "needs_rework",
    command: "task verify rework",
  });
}

export async function cmdVerifyParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
}): Promise<number> {
  return await executeVerifyRecordCommand({ ...opts, command: "verify" });
}
