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
export type ErrorCode = "E_USAGE" | "E_DEPRECATED_FLAG" | "E_VALIDATION" | "E_IO" | "E_GIT" | "E_HANDOFF" | "E_BACKEND" | "E_NETWORK" | "E_RUNTIME" | "E_INTERNAL";
export declare const DEFAULT_ERROR_EXIT_CODES: Readonly<Record<ErrorCode, number>>;
type AgentplaneErrorOptions = {
    message: string;
    exitCode?: number;
    context?: Record<string, unknown>;
};
export declare class AgentplaneError extends Error {
    readonly exitCode: number;
    readonly code: ErrorCode;
    readonly context?: Record<string, unknown>;
    constructor(code: ErrorCode, opts: AgentplaneErrorOptions);
}
export declare class CliError extends AgentplaneError {
    constructor(opts: {
        exitCode?: number;
        code: ErrorCode;
        message: string;
        context?: Record<string, unknown>;
    });
}
export declare class UsageError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class DeprecatedFlagError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class ValidationError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class IoError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class GitError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class HandoffError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class BackendCliError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class NetworkError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class RuntimeError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
}
export declare class InternalError extends CliError {
    constructor(opts: AgentplaneErrorOptions);
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
export declare function formatJsonError(err: CliError, guidance?: JsonErrorGuidance): string;
export {};
//# sourceMappingURL=errors.d.ts.map