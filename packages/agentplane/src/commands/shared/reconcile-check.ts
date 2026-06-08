import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "./diagnostics.js";
import { CliError } from "../../shared/errors.js";
import path from "node:path";

import {
  backendUsesLocalTaskStore,
  listTaskSummariesMemo,
  loadTaskFromBranchSnapshot,
  type CommandContext,
} from "./task-backend.js";

function compactError(err: unknown): string {
  if (err instanceof Error) {
    const text = err.message.trim();
    return text.length > 0 ? text : err.name;
  }
  return String(err);
}

type ParsedTaskScanWarning = {
  raw: string;
  taskId: string | null;
  kind: string | null;
};

function parseTaskScanWarning(raw: string): ParsedTaskScanWarning {
  const trimmed = raw.trim();
  const match = /^skip:([^:]+):\s*(.+)$/.exec(trimmed);
  if (!match) {
    return { raw: trimmed, taskId: null, kind: null };
  }
  return {
    raw: trimmed,
    taskId: match[1]?.trim() || null,
    kind: match[2]?.trim() || null,
  };
}

function describePrimaryWarning(warning: ParsedTaskScanWarning): {
  summary: string;
  likelyCause: string;
  hint: string;
} | null {
  const subject = warning.taskId ? `task README for ${warning.taskId}` : "a task README";
  switch (warning.kind) {
    case "invalid_readme_frontmatter": {
      return {
        summary: `${subject} has invalid frontmatter and could not be parsed`,
        likelyCause: `${subject} has invalid frontmatter, so reconcile skipped it before the mutating command could run`,
        hint: "Fix the malformed task README frontmatter, then rerun the mutating command.",
      };
    }
    case "empty_or_invalid_frontmatter": {
      return {
        summary: `${subject} has empty or invalid frontmatter and could not be parsed`,
        likelyCause: `${subject} is missing required frontmatter fields, so reconcile skipped it before the mutating command could run`,
        hint: "Restore valid task README frontmatter, then rerun the mutating command.",
      };
    }
    case "unreadable_readme":
    case "missing_or_unreadable_readme": {
      return {
        summary: `${subject} could not be read during task scan`,
        likelyCause: `${subject} is missing or unreadable, so reconcile skipped it before the mutating command could run`,
        hint: "Restore or fix the task README file, then rerun the mutating command.",
      };
    }
    default: {
      return null;
    }
  }
}

function summarizeWarnings(warnings: string[]): string {
  const primary = describePrimaryWarning(parseTaskScanWarning(warnings[0] ?? ""));
  if (primary) {
    const extra = warnings.length - 1;
    if (extra <= 0) return primary.summary;
    return `${primary.summary}; +${extra} more task scan warning${extra === 1 ? "" : "s"}`;
  }
  const preview = warnings.slice(0, 3).join("; ");
  const suffix = warnings.length > 3 ? `; +${warnings.length - 3} more` : "";
  return `skipped ${warnings.length} task files during scan (${preview}${suffix})`;
}

function buildWarningDiagnostic(warnings: string[]) {
  const primary = describePrimaryWarning(parseTaskScanWarning(warnings[0] ?? ""));
  if (primary) {
    return {
      state: "mutation preflight cannot reconcile task artifacts",
      likelyCause: primary.likelyCause,
      hint: primary.hint,
      nextAction: {
        command: "agentplane task list --strict-read",
        reason: "surface the malformed or unreadable task README before retrying mutating commands",
        reasonCode: "reconcile_task_scan_incomplete",
      },
    };
  }
  return {
    state: "mutation preflight found skipped task artifacts",
    likelyCause:
      "task scan skipped one or more task artifacts due to parse/read warnings, so the mutating command stopped before touching git state",
    hint: "Reconcile check failed due to task scan drift or parse/read errors.",
    nextAction: {
      command: "agentplane task list --strict-read",
      reason: "surface task scan/read failures before retrying mutating commands",
      reasonCode: "reconcile_task_scan_incomplete",
    },
  };
}

export async function ensureReconciledBeforeMutation(opts: {
  ctx: CommandContext;
  command: string;
  strictTaskScan?: boolean;
  taskIds?: readonly string[];
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
    await listTaskSummariesMemo(opts.ctx);
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

  const branchFilteredWarnings = await filterWarningsResolvedFromTaskBranch(
    opts.ctx,
    opts.ctx.taskBackend.getLastListWarnings?.() ?? [],
  );
  const warnings = filterWarningsOutsideTaskScope(branchFilteredWarnings, opts.taskIds);
  if (warnings.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `reconcile check failed: ${summarizeWarnings(warnings)}`,
    context: withDiagnosticContext(
      {
        command: opts.command,
        reason_code: "reconcile_task_scan_incomplete",
        warning_count: warnings.length,
      },
      buildWarningDiagnostic(warnings),
    ),
  });
}

function filterWarningsOutsideTaskScope(
  warnings: string[],
  taskIds: readonly string[] | undefined,
): string[] {
  const taskSet = new Set((taskIds ?? []).map((taskId) => taskId.trim()).filter(Boolean));
  if (taskSet.size === 0 || warnings.length === 0) return warnings;
  return warnings.filter((raw) => {
    const parsed = parseTaskScanWarning(raw);
    if (!parsed.taskId || taskSet.has(parsed.taskId)) return true;
    return parsed.kind !== "missing_or_unreadable_readme" && parsed.kind !== "unreadable_readme";
  });
}

async function filterWarningsResolvedFromTaskBranch(
  ctx: CommandContext,
  warnings: string[],
): Promise<string[]> {
  if (warnings.length === 0 || !backendUsesLocalTaskStore(ctx)) {
    return warnings;
  }

  const kept: string[] = [];
  for (const raw of warnings) {
    const parsed = parseTaskScanWarning(raw);
    if (
      !parsed.taskId ||
      (parsed.kind !== "missing_or_unreadable_readme" && parsed.kind !== "unreadable_readme")
    ) {
      kept.push(raw);
      continue;
    }
    const taskId = parsed.taskId;

    const readmePath = path.join(
      ctx.resolvedProject.gitRoot,
      ctx.config.paths.workflow_dir,
      taskId,
      "README.md",
    );
    const snapshot = await loadTaskFromBranchSnapshot({
      ctx,
      taskId,
      readmePath,
    });
    if (!snapshot) kept.push(raw);
  }
  return kept;
}
