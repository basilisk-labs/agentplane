import { readFile } from "node:fs/promises";
import path from "node:path";

import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, missingValueMessage, usageMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { appendTaskEvent, nowIso } from "./shared.js";

type VerifyState = "ok" | "needs_rework";

const RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";
const RESULTS_END = "<!-- END VERIFICATION RESULTS -->";

export const TASK_VERIFY_USAGE =
  "Usage: agentplane task verify <ok|rework> <task-id> --by <id> --note <text> [--details <text> | --file <path>]";
export const TASK_VERIFY_USAGE_EXAMPLE =
  'agentplane task verify ok 202602030608-F1Q8AB --by REVIEWER --note "Looks good"';

export const VERIFY_USAGE =
  "Usage: agentplane verify <task-id> (--ok | --rework) --by <id> --note <text> [--details <text> | --file <path>] [--quiet]";
export const VERIFY_USAGE_EXAMPLE =
  'agentplane verify 202602030608-F1Q8AB --ok --by REVIEWER --note "Looks good"';

type VerifyRecordFlags = {
  by?: string;
  note?: string;
  details?: string;
  file?: string;
  quiet: boolean;
  ok: boolean;
  rework: boolean;
};

function extractDocSection(doc: string, sectionName: string): string | null {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (capturing) break;
      capturing = (match[1] ?? "").trim() === sectionName;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

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
}): string {
  const lines = [
    `#### ${opts.at} — VERIFY — ${opts.state}`,
    "",
    `By: ${opts.by}`,
    "",
    `Note: ${opts.note}`,
  ];
  const details = (opts.details ?? "").trim();
  if (details) {
    lines.push("", "Details:", "", details);
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function parseVerifyRecordFlags(args: string[]): VerifyRecordFlags {
  const out: VerifyRecordFlags = { quiet: false, ok: false, rework: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--ok") {
      out.ok = true;
      continue;
    }
    if (arg === "--rework") {
      out.rework = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--by": {
        out.by = next;
        break;
      }
      case "--note": {
        out.note = next;
        break;
      }
      case "--details": {
        out.details = next;
        break;
      }
      case "--file": {
        out.file = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }
  return out;
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
  const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
  if (!backend.getTaskDoc || !backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }

  const existingDoc =
    (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
  const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
  const verificationSection = extractDocSection(baseDoc, "Verification") ?? "";

  const at = nowIso();
  const entry = renderVerificationEntry({
    at,
    state: opts.state,
    by: opts.by,
    note: opts.note,
    details: opts.details ?? null,
  });
  const nextVerification = appendBetweenMarkers(verificationSection, entry);
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, "Verification", nextVerification),
    config.tasks.doc.required_sections,
  );

  await backend.writeTask({
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
  });

  if (!opts.quiet) {
    const readmePath = path.join(resolved.gitRoot, config.paths.workflow_dir, task.id, "README.md");
    process.stdout.write(`${readmePath}\n`);
  }
}

export async function cmdTaskVerify(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const [subcommand, taskId, ...restArgs] = opts.args;
  if (!subcommand || !taskId || (subcommand !== "ok" && subcommand !== "rework")) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_VERIFY_USAGE, TASK_VERIFY_USAGE_EXAMPLE),
    });
  }
  const flags = parseVerifyRecordFlags(restArgs);
  const by = (flags.by ?? "").trim();
  const note = (flags.note ?? "").trim();
  if (flags.details && flags.file) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_VERIFY_USAGE, TASK_VERIFY_USAGE_EXAMPLE),
    });
  }
  if (!by || !note) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_VERIFY_USAGE, TASK_VERIFY_USAGE_EXAMPLE),
    });
  }

  let details: string | null = flags.details ?? null;
  if (flags.file) {
    try {
      details = await readFile(path.resolve(opts.cwd, flags.file), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "task verify", filePath: flags.file });
    }
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId,
      state: subcommand === "ok" ? "ok" : "needs_rework",
      by,
      note,
      details,
      quiet: flags.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task verify", root: opts.rootOverride ?? null });
  }
}

export async function cmdVerify(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseVerifyRecordFlags(opts.args);
  const by = (flags.by ?? "").trim();
  const note = (flags.note ?? "").trim();
  const ok = flags.ok;
  const rework = flags.rework;
  if (flags.details && flags.file) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
    });
  }
  if ((ok && rework) || (!ok && !rework) || !by || !note) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
    });
  }

  let details: string | null = flags.details ?? null;
  if (flags.file) {
    try {
      details = await readFile(path.resolve(opts.cwd, flags.file), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "verify", filePath: flags.file });
    }
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: ok ? "ok" : "needs_rework",
      by,
      note,
      details,
      quiet: flags.quiet,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "verify", root: opts.rootOverride ?? null });
  }
}
