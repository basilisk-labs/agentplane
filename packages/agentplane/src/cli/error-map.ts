import { fromZodError, isZodErrorLike, type ZodError } from "zod-validation-error/v3";

import { readDiagnosticContext } from "../commands/shared/diagnostics.js";
import {
  BackendCliError,
  GitError,
  IoError,
  NetworkError,
  ValidationError,
  formatJsonError,
} from "../shared/errors.js";
import type { CliError } from "../shared/errors.js";
import { BackendError } from "../backends/task-backend.js";
import { getReasonCodeMeta } from "./reason-codes.js";
import { renderRemediationLines } from "../shared/diagnostic-remediation.js";

export type NextAction = {
  command: string;
  reason: string;
  reasonCode?: string;
};

type ErrorGuidance = {
  state?: string;
  likelyCause?: string;
  hint?: string;
  remediation?: {
    code: string;
    why: string;
    fix: string;
    safeCommand: string;
    stopCondition: string;
  };
  nextAction?: NextAction;
};

function findZodError(err: unknown): ZodError | null {
  if (isZodErrorLike(err)) return err;
  if (err instanceof Error) {
    const cause = (err as Error & { cause?: unknown }).cause;
    if (isZodErrorLike(cause)) return cause;
  }
  return null;
}

function formatZodErrorForCli(err: ZodError): string {
  return fromZodError(err, { prefix: "Validation error" }).message;
}

export function mapCoreError(err: unknown, context: Record<string, unknown>): CliError {
  const message = err instanceof Error ? err.message : String(err);
  const zodError = findZodError(err);

  if (zodError) {
    return new ValidationError({
      message: formatZodErrorForCli(zodError),
      context,
    });
  }

  if (
    message.startsWith("Not a git repository") ||
    message.startsWith("Detached HEAD") ||
    message.includes("failed to resolve current branch")
  ) {
    return new GitError({
      message,
      context,
    });
  }

  if (err instanceof SyntaxError) {
    return new ValidationError({
      message: `Invalid JSON: ${message}`,
      context,
    });
  }

  if (message.includes("schema_version") || message.startsWith("config.")) {
    return new ValidationError({
      message,
      context,
    });
  }

  return new IoError({ message, context });
}

export function mapBackendError(err: unknown, context: Record<string, unknown>): CliError {
  if (err instanceof BackendError) {
    if (err.code === "E_NETWORK") return new NetworkError({ message: err.message, context });
    return new BackendCliError({ message: err.message, context });
  }
  return mapCoreError(err, context);
}

export function writeError(err: CliError, jsonErrors: boolean): void {
  const guidance = resolveErrorGuidance(err);
  const contextReasonCode =
    typeof err.context?.reason_code === "string" ? String(err.context.reason_code) : undefined;
  const reasonCode = contextReasonCode ?? guidance.nextAction?.reasonCode;
  const reasonDecode = getReasonCodeMeta(reasonCode);
  if (jsonErrors) {
    process.stdout.write(
      `${formatJsonError(err, {
        state: guidance.state,
        likelyCause: guidance.likelyCause,
        hint: guidance.hint,
        remediation: guidance.remediation,
        nextAction: guidance.nextAction,
        reasonDecode,
      })}\n`,
    );
    return;
  }

  const header = `error [${err.code}]`;
  if (err.message.includes("\n")) {
    process.stderr.write(`${header}\n${err.message}\n`);
  } else {
    process.stderr.write(`${header}: ${err.message}\n`);
  }
  if (guidance.state) {
    process.stderr.write(`state: ${guidance.state}\n`);
  }
  if (guidance.likelyCause) {
    process.stderr.write(`likely_cause: ${guidance.likelyCause}\n`);
  }
  if (guidance.hint) {
    process.stderr.write(`hint: ${guidance.hint}\n`);
  }
  if (guidance.remediation) {
    for (const line of renderRemediationLines(guidance.remediation)) {
      process.stderr.write(`${line}\n`);
    }
  }
  if (guidance.nextAction) {
    process.stderr.write(
      `next_action: ${guidance.nextAction.command} (${guidance.nextAction.reason})\n`,
    );
  }
  if (reasonDecode) {
    process.stderr.write(
      `reason_code: ${reasonDecode.code} [${reasonDecode.category}] ${reasonDecode.summary}\n`,
    );
    process.stderr.write(`reason_action: ${reasonDecode.action}\n`);
  }
}

function resolveErrorGuidance(err: CliError): ErrorGuidance {
  const explicit = readDiagnosticContext(err.context);
  const command = typeof err.context?.command === "string" ? err.context.command : undefined;
  const reasonCode =
    typeof err.context?.reason_code === "string" ? String(err.context.reason_code) : undefined;
  const usage = command ? `agentplane help ${command} --compact` : "agentplane help";
  const withExplicit = (fallback: ErrorGuidance): ErrorGuidance => ({
    state: explicit.state ?? fallback.state,
    likelyCause: explicit.likelyCause ?? fallback.likelyCause,
    hint: explicit.hint ?? fallback.hint,
    remediation: explicit.remediation ?? fallback.remediation,
    nextAction: explicit.nextAction ?? fallback.nextAction,
  });
  switch (err.code) {
    case "E_INTERNAL": {
      if (err.context?.feedback_github_issues_enabled === false) {
        return withExplicit({});
      }
      return withExplicit({
        hint: "AgentPlane can prepare a privacy-bounded GitHub issue for internal AgentPlane errors after explicit project opt-in.",
        nextAction: {
          command: "agentplane insights issue --error-code E_INTERNAL --dry-run",
          reason:
            "preview the GitHub issue payload; enable with `agentplane config set feedback.github_issues.enabled true` before creating it",
          reasonCode: "feedback_internal_error_report",
        },
      });
    }
    case "E_USAGE": {
      if (reasonCode === "sync_backend_mismatch") {
        return withExplicit({
          hint: "Configured backend id mismatch. Check active backend and retry with a matching id.",
          nextAction: {
            command: "agentplane config show",
            reason: "inspect active backend id before running sync",
            reasonCode: "sync_backend_mismatch",
          },
        });
      }
      return withExplicit({
        hint: `See \`${usage}\` for usage.`,
        nextAction: {
          command: usage,
          reason: "inspect required arguments and flags",
          reasonCode: "usage_help",
        },
      });
    }
    case "E_GIT": {
      if (reasonCode === "integrate_base_checkout_required") {
        return withExplicit({
          hint: "Integrate must run from the base checkout, not from the task branch worktree.",
          nextAction: {
            command: "git worktree list",
            reason:
              "locate the registered base checkout if the rerun command is not already provided",
            reasonCode,
          },
        });
      }
      if (reasonCode === "reconcile_git_state_unreadable") {
        return withExplicit({
          hint: "Reconcile check could not read git state.",
          nextAction: {
            command: "git status --short --untracked-files=no",
            reason: "confirm repository state is readable before mutating commands",
            reasonCode: "reconcile_git_state_unreadable",
          },
        });
      }
      if (command?.startsWith("branch")) {
        return withExplicit({
          hint: "Check git repo/branch; run `git branch` or pass --root <path>.",
          nextAction: {
            command: "git branch",
            reason: "inspect repository branch state",
            reasonCode: "git_branch_state",
          },
        });
      }
      if (command === "guard commit" || command === "commit") {
        return withExplicit({
          hint: "Check git status/index; stage changes and retry.",
          nextAction: {
            command: "git status --short",
            reason: "inspect staged/unstaged changes before commit",
            reasonCode: "git_index_state",
          },
        });
      }
      return withExplicit({
        hint: "Check git repo context; pass --root <path> if needed.",
        nextAction: {
          command: "git status --short --untracked-files=no",
          reason: "confirm repository context and tracked changes",
          reasonCode: "git_context",
        },
      });
    }
    case "E_HANDOFF": {
      return withExplicit({
        hint: "This is an intentional handoff route, not a local mutation failure.",
        nextAction: {
          command: command === "integrate" ? "agentplane task handoff show <task-id>" : usage,
          reason:
            "inspect the persisted finalize route and continue through the external handoff path",
          reasonCode: "protected_base_integrate_handoff",
        },
      });
    }
    case "E_NETWORK": {
      return withExplicit({
        hint: "Check network access and credentials.",
        nextAction: {
          command: "agentplane preflight --json",
          reason: "recheck approvals and network requirements",
          reasonCode: "network_gate",
        },
      });
    }
    case "E_RUNTIME": {
      return withExplicit({
        hint: "Inspect runner artifacts and the external runner result before retrying.",
        nextAction: {
          command: "agentplane doctor",
          reason: "confirm runtime wiring and recent runner state before rerunning the command",
          reasonCode: "runtime_runner_state",
        },
      });
    }
    case "E_BACKEND": {
      if (command?.includes("sync")) {
        return withExplicit({
          hint: "Check backend config under .agentplane/backends and retry.",
          nextAction: {
            command: "agentplane config show",
            reason: "verify backend config path and active settings",
            reasonCode: "backend_sync_config",
          },
        });
      }
      return withExplicit({
        hint: "Check backend config under .agentplane/backends.",
        nextAction: {
          command: "agentplane config show",
          reason: "inspect backend configuration",
          reasonCode: "backend_config",
        },
      });
    }
    case "E_VALIDATION": {
      if (
        reasonCode === "reconcile_task_scan_failed" ||
        reasonCode === "reconcile_task_scan_incomplete"
      ) {
        return withExplicit({
          hint: "Reconcile check failed due to task scan drift or parse/read errors.",
          nextAction: {
            command: "agentplane task list --strict-read",
            reason: "surface task scan/read failures before retrying mutating commands",
            reasonCode,
          },
        });
      }
      return withExplicit({
        hint: "Fix invalid config/input shape and rerun.",
        nextAction: {
          command: "agentplane preflight --json",
          reason: "pinpoint validation failure in one report",
          reasonCode: "validation_preflight",
        },
      });
    }
    default: {
      return withExplicit({});
    }
  }
}
