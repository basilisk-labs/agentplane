import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapCoreError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

import { decodeEscapedTaskTextNewlines } from "./shared.js";
import type { ResolvedVerifyRecordInput, VerifyCommandName } from "./verify-record.types.js";

function normalizeFileBackedVerifyNote(raw: string): string {
  return decodeEscapedTaskTextNewlines(raw).replaceAll(/\s+/gu, " ").trim();
}

export async function resolveVerifyRecordInput(opts: {
  cwd: string;
  by: string;
  note: string;
  noteFile?: string;
  details?: string;
  file?: string;
  command: VerifyCommandName;
}): Promise<ResolvedVerifyRecordInput> {
  const by = String(opts.by ?? "").trim();
  const inlineNote = String(opts.note ?? "").trim();
  const noteFile = typeof opts.noteFile === "string" ? opts.noteFile.trim() : "";
  if (!by) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing required input: --by.",
    });
  }
  if (!inlineNote && !noteFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide exactly one of --note or --note-file.",
    });
  }
  if (inlineNote && noteFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Options --note and --note-file are mutually exclusive.",
    });
  }
  if (typeof opts.details === "string" && typeof opts.file === "string") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Options --details and --file are mutually exclusive.",
    });
  }

  let note = inlineNote;
  if (noteFile) {
    try {
      note = normalizeFileBackedVerifyNote(
        await readFile(path.resolve(opts.cwd, noteFile), "utf8"),
      );
    } catch (err) {
      throw mapCoreError(err, { command: opts.command, filePath: noteFile });
    }
  }
  if (!note) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Verification note cannot be empty after normalization.",
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
