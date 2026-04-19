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

  return {
    state,
    likelyCause,
    hint,
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
  details?: string[];
}): string {
  const lines = [`[${opts.severity}] State: ${opts.state}`, `Likely cause: ${opts.likelyCause}`];
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
