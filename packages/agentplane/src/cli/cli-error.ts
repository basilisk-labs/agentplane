import type { ErrorCode } from "../shared/errors.js";
import { CliError } from "../shared/errors.js";

import { exitCodeForError } from "./exit-codes.js";

export function cliError(
  code: ErrorCode,
  message: string,
  opts?: { context?: Record<string, unknown> },
): CliError {
  return new CliError({
    exitCode: exitCodeForError(code),
    code,
    message,
    context: opts?.context,
  });
}

export function throwCliError(
  code: ErrorCode,
  message: string,
  opts?: { context?: Record<string, unknown> },
): never {
  throw cliError(code, message, opts);
}
