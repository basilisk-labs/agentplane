import type { CliError } from "../shared/errors.js";
export type NextAction = {
    command: string;
    reason: string;
    reasonCode?: string;
};
export declare function mapCoreError(err: unknown, context: Record<string, unknown>): CliError;
export declare function mapBackendError(err: unknown, context: Record<string, unknown>): CliError;
export declare function writeError(err: CliError, jsonErrors: boolean): void;
//# sourceMappingURL=error-map.d.ts.map