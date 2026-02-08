import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import { appendTaskEvent, extractDocSection, nowIso } from "./shared.js";

type VerifyState = "ok" | "needs_rework";

const RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";
const RESULTS_END = "<!-- END VERIFICATION RESULTS -->";

function ensureVerificationResultsMarkers(sectionText: string): string {
  const normalized = sectionText.replaceAll("\r\n", "\n").trimEnd();
  if (!normalized) {
    return ["### Plan", "", "", "### Results", "", "", RESULTS_BEGIN, RESULTS_END].join("\n");
  }

  const hasBegin = normalized.includes(RESULTS_BEGIN);
  const hasEnd = normalized.includes(RESULTS_END);
  if (hasBegin && hasEnd) return normalized;

  const out: string[] = [normalized];
  if (!normalized.endsWith("\n")) out.push("");
  out.push("", RESULTS_BEGIN, RESULTS_END);
  return out.join("\n").trimEnd();
}

function appendBetweenMarkers(sectionText: string, entryText: string): string {
  const ensured = ensureVerificationResultsMarkers(sectionText);
  const beginIdx = ensured.indexOf(RESULTS_BEGIN);
  const endIdx = ensured.indexOf(RESULTS_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Verification results markers are malformed");
  }

  const beforeEnd = ensured.slice(0, endIdx).trimEnd();
  const afterEnd = ensured.slice(endIdx).trimStart();
  const entry = entryText.trimEnd();

  const parts: string[] = [
    beforeEnd,
    ...(beforeEnd.endsWith(RESULTS_BEGIN) ? [] : [""]),
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
  const task = useStore
    ? await store!.get(opts.taskId)
    : await loadTaskFromContext({ ctx, taskId: opts.taskId });
  const existingDoc = useStore
    ? String(task.doc ?? "")
    : (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
  const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
  const verificationSection = extractDocSection(baseDoc, "Verification") ?? "";
  const verifySteps = extractDocSection(baseDoc, "Verify Steps");
  const verifyStepsHash = verifySteps
    ? sha256Hex(verifySteps.replaceAll("\r\n", "\n").trim())
    : null;
  const verifyStepsRef = [
    `doc_version=${String(task.doc_version ?? "missing")}`,
    `doc_updated_at=${String(task.doc_updated_at ?? "missing")}`,
    `excerpt_hash=sha256:${verifyStepsHash ?? "missing"}`,
  ].join(", ");

  const at = nowIso();
  const entry = renderVerificationEntry({
    at,
    state: opts.state,
    by: opts.by,
    note: opts.note,
    details: opts.details ?? null,
    verifyStepsRef,
  });
  const nextVerification = appendBetweenMarkers(verificationSection, entry);
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, "Verification", nextVerification),
    config.tasks.doc.required_sections,
  );

  const nextTask = {
    ...task,
    status: opts.state === "needs_rework" ? "DOING" : task.status,
    commit: opts.state === "needs_rework" ? null : (task.commit ?? null),
    doc: nextDoc,
    doc_updated_by: opts.by,
    events: appendTaskEvent(task, {
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
  };
  await (useStore ? store!.update(opts.taskId, () => nextTask) : backend.writeTask(nextTask));

  if (!opts.quiet) {
    const readmePath = path.join(resolved.gitRoot, config.paths.workflow_dir, task.id, "README.md");
    process.stdout.write(`${readmePath}\n`);
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
      throw mapCoreError(err, { command: "task verify ok", filePath: opts.file });
    }
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: "ok",
      by,
      note,
      details,
      quiet: opts.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task verify ok", root: opts.rootOverride ?? null });
  }
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
      throw mapCoreError(err, { command: "task verify rework", filePath: opts.file });
    }
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: "needs_rework",
      by,
      note,
      details,
      quiet: opts.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task verify rework", root: opts.rootOverride ?? null });
  }
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
      throw mapCoreError(err, { command: "verify", filePath: opts.file });
    }
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: opts.state,
      by,
      note,
      details,
      quiet: opts.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "verify", root: opts.rootOverride ?? null });
  }
}
