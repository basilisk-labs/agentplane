import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { listTasksMemo, type CommandContext } from "./task-backend.js";

function compactError(err: unknown): string {
  if (err instanceof Error) {
    const text = err.message.trim();
    return text.length > 0 ? text : err.name;
  }
  return String(err);
}

function summarizeWarnings(warnings: string[]): string {
  const preview = warnings.slice(0, 3).join("; ");
  const suffix = warnings.length > 3 ? `; +${warnings.length - 3} more` : "";
  return `skipped ${warnings.length} task files during scan (${preview}${suffix})`;
}

export async function ensureReconciledBeforeMutation(opts: {
  ctx: CommandContext;
  command: string;
  strictTaskScan?: boolean;
}): Promise<void> {
  try {
    await opts.ctx.git.statusChangedPaths();
  } catch (err) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `reconcile check failed: cannot inspect git status (${compactError(err)})`,
      context: {
        command: opts.command,
        reason_code: "reconcile_git_state_unreadable",
      },
    });
  }

  if (opts.strictTaskScan === false) return;

  try {
    await listTasksMemo(opts.ctx);
  } catch (err) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `reconcile check failed: task scan error (${compactError(err)})`,
      context: {
        command: opts.command,
        reason_code: "reconcile_task_scan_failed",
      },
    });
  }

  const warnings = opts.ctx.taskBackend.getLastListWarnings?.() ?? [];
  if (warnings.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `reconcile check failed: ${summarizeWarnings(warnings)}`,
    context: {
      command: opts.command,
      reason_code: "reconcile_task_scan_incomplete",
      warning_count: warnings.length,
    },
  });
}
