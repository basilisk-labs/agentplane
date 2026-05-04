import { type ErrorCode } from "../shared/errors.js";
export declare enum ExitCode {
    Internal = 1,
    Usage = 2,
    Validation = 3,
    Io = 4,
    Git = 5,
    Backend = 6,
    Network = 7,
    Runtime = 8,
    Handoff = 9
}
export declare const ERROR_TO_EXIT: Readonly<Record<ErrorCode, ExitCode>>;
export declare function exitCodeForError(code: ErrorCode): ExitCode;
//# sourceMappingURL=exit-codes.d.ts.map