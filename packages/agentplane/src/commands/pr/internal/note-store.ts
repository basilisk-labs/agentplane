import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type PrHandoffNote = {
  schema_version: 1;
  created_at: string;
  author: string;
  body: string;
};

function invalidNote(index: number, message: string): Error {
  return new Error(`Invalid pr/notes.jsonl entry ${index + 1}: ${message}`);
}

function trimRequired(value: unknown, field: string, index: number): string {
  if (typeof value !== "string") throw invalidNote(index, `${field} must be a string`);
  const trimmed = value.trim();
  if (!trimmed) throw invalidNote(index, `${field} must not be empty`);
  return trimmed;
}

export function buildPrHandoffNote(opts: {
  createdAt: string;
  author: string;
  body: string;
}): PrHandoffNote {
  return {
    schema_version: 1,
    created_at: opts.createdAt,
    author: opts.author.trim(),
    body: opts.body.trim(),
  };
}

function parsePrHandoffNotes(raw: string): PrHandoffNote[] {
  if (!raw.trim()) return [];
  return raw
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(line) as unknown;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw invalidNote(index, `invalid JSON (${message})`);
      }
      const record = parsed as Partial<PrHandoffNote> | null;
      if (!record || typeof record !== "object") {
        throw invalidNote(index, "entry must be an object");
      }
      if ((record.schema_version ?? 1) !== 1) {
        throw invalidNote(index, "unsupported schema_version");
      }
      return {
        schema_version: 1,
        created_at: trimRequired(record.created_at, "created_at", index),
        author: trimRequired(record.author, "author", index),
        body: trimRequired(record.body, "body", index),
      };
    });
}

export async function readPrHandoffNotes(notesPath: string): Promise<PrHandoffNote[]> {
  try {
    return parsePrHandoffNotes(await readFile(notesPath, "utf8"));
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return [];
    throw err;
  }
}

export async function appendPrHandoffNote(opts: {
  notesPath: string;
  note: PrHandoffNote;
}): Promise<void> {
  await mkdir(path.dirname(opts.notesPath), { recursive: true });
  await appendFile(opts.notesPath, `${JSON.stringify(opts.note)}\n`, "utf8");
}
