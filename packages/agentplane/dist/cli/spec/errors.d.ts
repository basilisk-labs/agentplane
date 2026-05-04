import type { CliError } from "../../shared/errors.js";
import type { CommandSpec } from "./spec.js";
/**
 * Usage-error helpers for command-spec parsing/rendering only.
 *
 * Allowed here:
 * - E_USAGE construction tied to CLI spec/help rendering
 * - command-specific usage context shaping
 *
 * Do not add:
 * - shared runtime error primitives
 * - backend/domain errors
 * - non-CLI formatting or transport concerns
 */
export declare function usageError(opts: {
    message: string;
    spec?: CommandSpec<unknown>;
    command?: string;
    context?: Record<string, unknown>;
}): CliError;
export declare function deprecatedFlagError(opts: {
    option: string;
    deprecated: string;
    spec?: CommandSpec<unknown>;
}): CliError;
//# sourceMappingURL=errors.d.ts.map