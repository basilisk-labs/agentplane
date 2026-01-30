export type ErrorCode =
  | "E_USAGE"
  | "E_VALIDATION"
  | "E_IO"
  | "E_GIT"
  | "E_BACKEND"
  | "E_NETWORK"
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

export function formatJsonError(err: CliError, opts?: { hint?: string }): string {
  return JSON.stringify(
    {
      error: {
        code: err.code,
        message: err.message,
        context: err.context ?? undefined,
        exit_code: err.exitCode,
        hint: opts?.hint ?? undefined,
      },
    },
    null,
    2,
  );
}
