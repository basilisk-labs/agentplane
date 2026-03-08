import { invalidValueForFlag, missingValueMessage, warnMessage } from "../../../cli/output.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import type { TaskData } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import { toStringArray } from "./tags.js";

export type TaskListFilters = {
  status: string[];
  owner: string[];
  tag: string[];
  limit?: number;
  quiet: boolean;
  strictRead?: boolean;
};

export function parseTaskListFilters(
  args: string[],
  opts?: { allowLimit?: boolean },
): TaskListFilters {
  const out: TaskListFilters = { status: [], owner: [], tag: [], quiet: false, strictRead: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--strict-read") {
      out.strictRead = true;
      continue;
    }
    if (arg === "--status") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--status"),
        });
      }
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--owner"),
        });
      }
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--tag"),
        });
      }
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--limit"),
        });
      }
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: invalidValueForFlag("--limit", next, "integer"),
        });
      }
      out.limit = parsed;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: `Unknown flag: ${arg}`,
      });
    }
  }
  return out;
}

export function handleTaskListWarnings(opts: {
  backend: { getLastListWarnings?: () => string[] };
  strictRead?: boolean;
}): void {
  const warnings = opts.backend.getLastListWarnings?.() ?? [];
  if (warnings.length === 0) return;
  const preview = warnings.slice(0, 3).join("; ");
  const suffix = warnings.length > 3 ? `; +${warnings.length - 3} more` : "";
  const message = `skipped ${warnings.length} task files during scan (${preview}${suffix})`;
  if (opts.strictRead) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `task scan strict mode failed: ${message}`,
    });
  }
  process.stderr.write(`${warnMessage(message)}\n`);
}

export function taskTextBlob(task: TaskData): string {
  const parts: string[] = [];
  for (const key of ["id", "title", "description", "status", "priority", "owner"] as const) {
    const value = (task as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }
  const tags = toStringArray(task.tags);
  parts.push(...tags.filter(Boolean));
  const comments = Array.isArray(task.comments) ? task.comments : [];
  for (const comment of comments) {
    if (comment && typeof comment.author === "string") parts.push(comment.author);
    if (comment && typeof comment.body === "string") parts.push(comment.body);
  }
  const commit = task.commit ?? null;
  if (commit && typeof commit.hash === "string") parts.push(commit.hash);
  if (commit && typeof commit.message === "string") parts.push(commit.message);
  return parts.join("\n");
}
