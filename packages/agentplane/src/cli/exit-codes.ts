import { DEFAULT_ERROR_EXIT_CODES, type ErrorCode } from "../shared/errors.js";

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

export const EXIT_CODE_CONTRACT = [
  { code: 0, name: "Success", meaning: "Command completed successfully." },
  { code: ExitCode.Internal, name: "Internal", meaning: "Unexpected or unclassified failure." },
  { code: ExitCode.Usage, name: "Usage", meaning: "Invalid or incomplete command invocation." },
  {
    code: ExitCode.Validation,
    name: "Validation",
    meaning: "Input, schema, or repository invariant validation failed.",
  },
  { code: ExitCode.Io, name: "IO", meaning: "Filesystem or other local IO operation failed." },
  { code: ExitCode.Git, name: "Git", meaning: "Git operation or workflow guardrail failed." },
  { code: ExitCode.Backend, name: "Backend", meaning: "Configured task backend failed." },
  {
    code: ExitCode.Network,
    name: "Network",
    meaning: "Explicitly requested network operation failed.",
  },
  { code: ExitCode.Runtime, name: "Runtime", meaning: "Selected runtime or provider failed." },
  { code: ExitCode.Handoff, name: "Handoff", meaning: "Task or agent handoff failed." },
] as const;

export const ERROR_TO_EXIT: Readonly<Record<ErrorCode, ExitCode>> = {
  E_USAGE: DEFAULT_ERROR_EXIT_CODES.E_USAGE,
  E_DEPRECATED_FLAG: DEFAULT_ERROR_EXIT_CODES.E_DEPRECATED_FLAG,
  E_VALIDATION: DEFAULT_ERROR_EXIT_CODES.E_VALIDATION,
  E_IO: DEFAULT_ERROR_EXIT_CODES.E_IO,
  E_COMMIT_ALLOW_EMPTY: DEFAULT_ERROR_EXIT_CODES.E_COMMIT_ALLOW_EMPTY,
  E_COMMIT_ALLOW_NO_MATCH: DEFAULT_ERROR_EXIT_CODES.E_COMMIT_ALLOW_NO_MATCH,
  E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED: DEFAULT_ERROR_EXIT_CODES.E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED,
  E_PHASE_POLICY: DEFAULT_ERROR_EXIT_CODES.E_PHASE_POLICY,
  E_GIT: DEFAULT_ERROR_EXIT_CODES.E_GIT,
  E_GIT_LOCKED: DEFAULT_ERROR_EXIT_CODES.E_GIT_LOCKED,
  E_GIT_PERMISSION: DEFAULT_ERROR_EXIT_CODES.E_GIT_PERMISSION,
  E_GIT_RACE: DEFAULT_ERROR_EXIT_CODES.E_GIT_RACE,
  E_GIT_STAGE_FAILED: DEFAULT_ERROR_EXIT_CODES.E_GIT_STAGE_FAILED,
  E_BACKEND: DEFAULT_ERROR_EXIT_CODES.E_BACKEND,
  E_NETWORK: DEFAULT_ERROR_EXIT_CODES.E_NETWORK,
  E_RUNTIME: DEFAULT_ERROR_EXIT_CODES.E_RUNTIME,
  E_HANDOFF: DEFAULT_ERROR_EXIT_CODES.E_HANDOFF,
  E_INTERNAL: DEFAULT_ERROR_EXIT_CODES.E_INTERNAL,
};

export function exitCodeForError(code: ErrorCode): ExitCode {
  return ERROR_TO_EXIT[code];
}
