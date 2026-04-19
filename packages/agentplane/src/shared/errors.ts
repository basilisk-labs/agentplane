/**
 * Shared CLI/runtime error surface for cross-cutting agentplane failures.
 *
 * Allowed here:
 * - stable error codes shared across command, runner, and CLI rendering paths
 * - the canonical `CliError` container used by command and output layers
 * - JSON serialization helpers consumed by CLI formatting
 *
 * Do not add:
 * - command-spec usage helpers
 * - backend-specific transport/domain errors
 * - error factories that belong to one feature subtree only
 */
export type ErrorCode =
  | "E_USAGE"
  | "E_VALIDATION"
  | "E_IO"
  | "E_GIT"
  | "E_HANDOFF"
  | "E_BACKEND"
  | "E_NETWORK"
  | "E_RUNTIME"
  | "E_INTERNAL";

export class CliError extends Error {
  public readonly exitCode: number;
  public readonly code: ErrorCode;
  public readonly context?: Record<string, unknown>;

  constructor(opts: {
    exitCode: number;
    code: ErrorCode;
    message: string;
    context?: Record<string, unknown>;
  }) {
    super(opts.message);
    this.exitCode = opts.exitCode;
    this.code = opts.code;
    this.context = opts.context;
  }
}

export type JsonErrorGuidance = {
  state?: string;
  likelyCause?: string;
  hint?: string;
  nextAction?: {
    command: string;
    reason: string;
    reasonCode?: string;
  };
  reasonDecode?: {
    code: string;
    category: string;
    summary: string;
    action: string;
  };
};

export function formatJsonError(err: CliError, guidance?: JsonErrorGuidance): string {
  return JSON.stringify(
    {
      error: {
        code: err.code,
        message: err.message,
        context: err.context ?? undefined,
        state: guidance?.state,
        likely_cause: guidance?.likelyCause,
        hint: guidance?.hint,
        next_action: guidance?.nextAction,
        reason_decode: guidance?.reasonDecode,
      },
    },
    null,
    2,
  );
}
