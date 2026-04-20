import type { ErrorCode } from "../shared/errors.js";

export enum ExitCode {
  Internal = 1,
  Usage = 2,
  Validation = 3,
  Io = 4,
  Git = 5,
  Backend = 6,
  Network = 7,
  Runtime = 8,
  Handoff = 9,
}

export const ERROR_TO_EXIT: Readonly<Record<ErrorCode, ExitCode>> = {
  E_USAGE: ExitCode.Usage,
  E_VALIDATION: ExitCode.Validation,
  E_IO: ExitCode.Io,
  E_GIT: ExitCode.Git,
  E_BACKEND: ExitCode.Backend,
  E_NETWORK: ExitCode.Network,
  E_RUNTIME: ExitCode.Runtime,
  E_HANDOFF: ExitCode.Handoff,
  E_INTERNAL: ExitCode.Internal,
};

export function exitCodeForError(code: ErrorCode): ExitCode {
  return ERROR_TO_EXIT[code];
}
