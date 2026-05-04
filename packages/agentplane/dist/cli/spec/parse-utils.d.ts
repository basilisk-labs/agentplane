import type { CommandSpec } from "./spec.js";
export declare function asTrimmedString(value: unknown): string;
export declare function toStringList(value: unknown): string[];
export declare function assertNonEmptyStrings(opts: {
    list: readonly string[];
    flagName: string;
    spec: CommandSpec<unknown>;
    command: string;
    message?: string;
}): void;
//# sourceMappingURL=parse-utils.d.ts.map