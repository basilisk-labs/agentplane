import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  appendTaskEventIntent,
  backendIsLocalFileBackend,
  getTaskStore,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";

import {
  appendTaskEvent,
  decodeEscapedTaskTextNewlines,
  extractDocSection,
  normalizeTaskDocVersion,
  normalizeVerificationSectionLayout,
  nowIso,
  VERIFICATION_RESULTS_BEGIN,
  VERIFICATION_RESULTS_END,
} from "./shared.js";

type VerifyState = "ok" | "needs_rework";
type VerifyCommandName = "task verify ok" | "task verify rework" | "verify";
type ResolvedVerifyRecordInput = {
  by: string;
  note: string;
  details: string | null;
};

function appendBetweenMarkers(sectionText: string, entryText: string, version: 2 | 3): string {
  const ensured = normalizeVerificationSectionLayout(sectionText, version);
  const beginIdx = ensured.indexOf(VERIFICATION_RESULTS_BEGIN);
  const endIdx = ensured.indexOf(VERIFICATION_RESULTS_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Verification results markers are malformed");
  }

  const beforeEnd = ensured.slice(0, endIdx).trimEnd();
  const afterEnd = ensured.slice(endIdx).trimStart();
  const entry = entryText.trimEnd();

  const parts: string[] = [
    beforeEnd,
    ...(beforeEnd.endsWith(VERIFICATION_RESULTS_BEGIN) ? [] : [""]),
    entry,
    "",
    afterEnd,
  ];
  return parts.join("\n").trimEnd();
}

function renderVerificationEntry(opts: {
  at: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string | null;
  verifyStepsRef?: string | null;
}): string {
  const lines = [
    `#### ${opts.at} — VERIFY — ${opts.state}`,
    "",
    `By: ${opts.by}`,
    "",
    `Note: ${opts.note}`,
  ];
  const verifyStepsRef = (opts.verifyStepsRef ?? "").trim();
  if (verifyStepsRef) {
    lines.push("", `VerifyStepsRef: ${verifyStepsRef}`);
  }
  const details = (opts.details ?? "").trim();
  if (details) {
    lines.push("", "Details:", "", details);
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function sha256Hex(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

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

  const useStore = backendIsLocalFileBackend(ctx);
  const store = useStore ? getTaskStore(ctx) : null;
  const task = useStore ? null : await loadTaskFromContext({ ctx, taskId: opts.taskId });
  const at = nowIso();
  if (useStore) {
    await store!.mutate(opts.taskId, (current) => {
      const existingDoc = String(current.doc ?? "");
      const baseDoc = ensureDocSections(existingDoc, config.tasks.doc.required_sections);
      const verificationSection = extractDocSection(baseDoc, "Verification") ?? "";
      const verifySteps = extractDocSection(baseDoc, "Verify Steps");
      const verifyStepsHash = verifySteps
        ? sha256Hex(verifySteps.replaceAll("\r\n", "\n").trim())
        : null;
      const docVersion = normalizeTaskDocVersion(current.doc_version);
      const verifyStepsRef = [
        `doc_version=${String(docVersion)}`,
        `doc_updated_at=${String(current.doc_updated_at ?? "missing")}`,
        `excerpt_hash=sha256:${verifyStepsHash ?? "missing"}`,
      ].join(", ");
      const entry = renderVerificationEntry({
        at,
        state: opts.state,
        by: opts.by,
        note: opts.note,
        details: opts.details ?? null,
        verifyStepsRef,
      });
      const nextVerification = appendBetweenMarkers(verificationSection, entry, docVersion);

      return [
        setTaskFieldsIntent({
          status: opts.state === "needs_rework" ? "DOING" : current.status,
          commit: opts.state === "needs_rework" ? null : (current.commit ?? null),
          verification: {
            state: opts.state,
            updated_at: at,
            updated_by: opts.by,
            note: opts.note,
          },
        }),
        setTaskSectionIntent({
          section: "Verification",
          text: nextVerification,
          requiredSections: config.tasks.doc.required_sections,
        }),
        appendTaskEventIntent({
          type: "verify",
          at,
          author: opts.by,
          state: opts.state,
          note: opts.note,
        }),
        touchTaskDocMetaIntent({ updatedBy: opts.by }),
      ];
    });
  } else {
    const remoteTask = task!;
    const existingDoc =
      (typeof remoteTask.doc === "string" ? remoteTask.doc : "") ||
      (await backend.getTaskDoc(remoteTask.id));
    const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
    const verificationSection = extractDocSection(baseDoc, "Verification") ?? "";
    const verifySteps = extractDocSection(baseDoc, "Verify Steps");
    const verifyStepsHash = verifySteps
      ? sha256Hex(verifySteps.replaceAll("\r\n", "\n").trim())
      : null;
    const docVersion = normalizeTaskDocVersion(remoteTask.doc_version);
    const verifyStepsRef = [
      `doc_version=${String(docVersion)}`,
      `doc_updated_at=${String(remoteTask.doc_updated_at ?? "missing")}`,
      `excerpt_hash=sha256:${verifyStepsHash ?? "missing"}`,
    ].join(", ");
    const entry = renderVerificationEntry({
      at,
      state: opts.state,
      by: opts.by,
      note: opts.note,
      details: opts.details ?? null,
      verifyStepsRef,
    });
    const nextVerification = appendBetweenMarkers(verificationSection, entry, docVersion);
    const nextDoc = ensureDocSections(
      setMarkdownSection(baseDoc, "Verification", nextVerification),
      config.tasks.doc.required_sections,
    );

    await backend.writeTask({
      ...remoteTask,
      status: opts.state === "needs_rework" ? "DOING" : remoteTask.status,
      commit: opts.state === "needs_rework" ? null : (remoteTask.commit ?? null),
      doc: nextDoc,
      doc_updated_by: opts.by,
      events: appendTaskEvent(remoteTask, {
        type: "verify",
        at,
        author: opts.by,
        state: opts.state,
        note: opts.note,
      }),
      verification: {
        state: opts.state,
        updated_at: at,
        updated_by: opts.by,
        note: opts.note,
      },
    });
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
