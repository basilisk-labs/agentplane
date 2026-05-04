import {
  renderRemediationLines,
  type DiagnosticRemediation,
} from "../../shared/diagnostic-remediation.js";
export type { DiagnosticRemediation } from "../../shared/diagnostic-remediation.js";

export type DiagnosticNextAction = {
  command: string;
  reason: string;
  reasonCode?: string;
};

export type DiagnosticInfo = {
  state: string;
  likelyCause: string;
  nextAction?: DiagnosticNextAction;
  hint?: string;
  remediation?: DiagnosticRemediation;
};

type DiagnosticContextRecord = Record<string, unknown>;

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function withDiagnosticContext(
  context: DiagnosticContextRecord | undefined,
  diagnostic: DiagnosticInfo,
): DiagnosticContextRecord {
  const base = context ? { ...context } : {};
  return {
    ...base,
    diagnostic_state: diagnostic.state,
    diagnostic_likely_cause: diagnostic.likelyCause,
    ...(diagnostic.hint ? { diagnostic_hint: diagnostic.hint } : {}),
    ...(diagnostic.remediation
      ? {
          diagnostic_code: diagnostic.remediation.code,
          diagnostic_why: diagnostic.remediation.why,
          diagnostic_fix: diagnostic.remediation.fix,
          diagnostic_safe_command: diagnostic.remediation.safeCommand,
          diagnostic_stop_condition: diagnostic.remediation.stopCondition,
        }
      : {}),
    ...(diagnostic.nextAction
      ? {
          diagnostic_next_action_command: diagnostic.nextAction.command,
          diagnostic_next_action_reason: diagnostic.nextAction.reason,
          ...(diagnostic.nextAction.reasonCode
            ? { diagnostic_next_action_reason_code: diagnostic.nextAction.reasonCode }
            : {}),
        }
      : {}),
  };
}

export function readDiagnosticContext(
  context: DiagnosticContextRecord | undefined,
): Partial<DiagnosticInfo> {
  const state = readString(context?.diagnostic_state);
  const likelyCause = readString(context?.diagnostic_likely_cause);
  const hint = readString(context?.diagnostic_hint);
  const nextActionCommand = readString(context?.diagnostic_next_action_command);
  const nextActionReason = readString(context?.diagnostic_next_action_reason);
  const nextActionReasonCode = readString(context?.diagnostic_next_action_reason_code);
  const diagnosticCode = readString(context?.diagnostic_code);
  const why = readString(context?.diagnostic_why);
  const fix = readString(context?.diagnostic_fix);
  const safeCommand = readString(context?.diagnostic_safe_command);
  const stopCondition = readString(context?.diagnostic_stop_condition);

  return {
    state,
    likelyCause,
    hint,
    remediation:
      diagnosticCode && why && fix && safeCommand && stopCondition
        ? {
            code: diagnosticCode,
            why,
            fix,
            safeCommand,
            stopCondition,
          }
        : undefined,
    nextAction:
      nextActionCommand && nextActionReason
        ? {
            command: nextActionCommand,
            reason: nextActionReason,
            ...(nextActionReasonCode ? { reasonCode: nextActionReasonCode } : {}),
          }
        : undefined,
  };
}

export function renderDiagnosticFinding(opts: {
  severity: "ERROR" | "WARN" | "INFO";
  state: string;
  likelyCause: string;
  nextAction?: DiagnosticNextAction;
  remediation?: DiagnosticRemediation;
  details?: string[];
}): string {
  const lines = [`[${opts.severity}] State: ${opts.state}`, `Likely cause: ${opts.likelyCause}`];
  if (opts.remediation) {
    lines.push(...renderRemediationLines(opts.remediation));
  }
  if (opts.nextAction) {
    lines.push(`Next action: ${opts.nextAction.command} (${opts.nextAction.reason})`);
  }
  if (Array.isArray(opts.details) && opts.details.length > 0) {
    const [first, ...rest] = opts.details;
    if (first) lines.push(`Details: ${first}`);
    for (const detail of rest) {
      if (detail.trim()) lines.push(`  - ${detail}`);
    }
  }
  return lines.join("\n");
}
