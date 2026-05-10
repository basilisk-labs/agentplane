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
  | "E_DEPRECATED_FLAG"
  | "E_VALIDATION"
  | "E_IO"
  | "E_GIT"
  | "E_GIT_LOCKED"
  | "E_HANDOFF"
  | "E_BACKEND"
  | "E_NETWORK"
  | "E_RUNTIME"
  | "E_INTERNAL";

export const DEFAULT_ERROR_EXIT_CODES: Readonly<Record<ErrorCode, number>> = {
  E_USAGE: 2,
  E_DEPRECATED_FLAG: 2,
  E_VALIDATION: 3,
  E_IO: 4,
  E_GIT: 5,
  E_GIT_LOCKED: 5,
  E_BACKEND: 6,
  E_NETWORK: 7,
  E_RUNTIME: 8,
  E_HANDOFF: 9,
  E_INTERNAL: 1,
};

type AgentplaneErrorOptions = {
  message: string;
  exitCode?: number;
  context?: Record<string, unknown>;
};

export class AgentplaneError extends Error {
  public readonly exitCode: number;
  public readonly code: ErrorCode;
  public readonly context?: Record<string, unknown>;

  constructor(code: ErrorCode, opts: AgentplaneErrorOptions) {
    super(opts.message);
    this.name = new.target.name;
    this.exitCode = opts.exitCode ?? DEFAULT_ERROR_EXIT_CODES[code];
    this.code = code;
    this.context = opts.context;
  }
}

export class CliError extends AgentplaneError {
  constructor(opts: {
    exitCode?: number;
    code: ErrorCode;
    message: string;
    context?: Record<string, unknown>;
  }) {
    super(opts.code, opts);
  }
}

export class UsageError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_USAGE" });
  }
}

export class DeprecatedFlagError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_DEPRECATED_FLAG" });
  }
}

export class ValidationError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_VALIDATION" });
  }
}

export class IoError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_IO" });
  }
}

export class GitError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_GIT" });
  }
}

export class HandoffError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_HANDOFF" });
  }
}

export class BackendCliError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_BACKEND" });
  }
}

export class NetworkError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_NETWORK" });
  }
}

export class RuntimeError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_RUNTIME" });
  }
}

export class InternalError extends CliError {
  constructor(opts: AgentplaneErrorOptions) {
    super({ ...opts, code: "E_INTERNAL" });
  }
}

export type JsonErrorGuidance = {
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
        remediation: guidance?.remediation
          ? {
              code: guidance.remediation.code,
              why: guidance.remediation.why,
              fix: guidance.remediation.fix,
              safe_command: guidance.remediation.safeCommand,
              stop_condition: guidance.remediation.stopCondition,
            }
          : undefined,
        next_action: guidance?.nextAction,
        reason_decode: guidance?.reasonDecode,
      },
    },
    null,
    2,
  );
}
