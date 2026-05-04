/**
 * Backend-local Redmine/task-backend error surface.
 *
 * Allowed here:
 * - backend transport/domain errors and messages
 * - backend-specific retry/unavailable sentinel types
 *
 * Do not add:
 * - CLI usage helpers
 * - shared cross-command error containers
 * - generic runtime failures that are not backend-owned
 */
export declare class BackendError extends Error {
    code: "E_BACKEND" | "E_NETWORK";
    constructor(message: string, code: "E_BACKEND" | "E_NETWORK");
}
export declare class RedmineUnavailable extends BackendError {
    constructor(message: string);
}
export declare function redmineConfigMissingEnvMessage(keys: string[] | string): string;
export declare function redmineConfigInvalidEnvMessage(key: string, expected: string): string;
export declare function redmineIssueIdMissingMessage(): string;
//# sourceMappingURL=errors.d.ts.map