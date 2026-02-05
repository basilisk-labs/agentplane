import type { ErrorCode } from "../shared/errors.js";

const EXIT_CODE_BY_ERROR: Record<ErrorCode, number> = {
  E_USAGE: 2,
  E_VALIDATION: 3,
  E_IO: 4,
  E_GIT: 5,
  E_BACKEND: 6,
  E_NETWORK: 7,
  E_INTERNAL: 1,
};

export function exitCodeForError(code: ErrorCode): number {
  return EXIT_CODE_BY_ERROR[code];
}
