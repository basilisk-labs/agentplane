import os from "node:os";
import path from "node:path";

import { readDiagnosticContext } from "../../shared/diagnostics.js";
import { formatJsonError } from "../../shared/errors.js";
import type { CliError } from "../../shared/errors.js";
import { getReasonCodeMeta } from "../reason-codes.js";

export type NextAction = {
  command: string;
  reason: string;
  reasonCode?: string;
};

type ErrorGuidance = {
  state?: string;
  likelyCause?: string;
  hint?: string;
  nextAction?: NextAction;
};

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
        nextAction: guidance.nextAction,
        reasonDecode,
      })}\n`,
    );
  } else {
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
}

const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";

export function resolveAgentplaneHome(): string {
  const overridden = process.env[AGENTPLANE_HOME_ENV]?.trim();
  if (overridden) return overridden;
  return path.join(os.homedir(), ".agentplane");
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
    nextAction: explicit.nextAction ?? fallback.nextAction,
  });
  switch (err.code) {
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
