import type { CommandSpec } from "./spec.js";
export type HelpJson = {
    id: string[];
    group: string;
    summary: string;
    description?: string;
    usage: string[];
    args: {
        name: string;
        required: boolean;
        variadic?: boolean;
        valueHint?: string;
        description?: string;
    }[];
    options: {
        name: string;
        kind: "boolean" | "string";
        short?: string;
        description: string;
        hidden?: boolean;
        deprecated?: string;
        required?: boolean;
        repeatable?: boolean;
        minCount?: number;
        valueHint?: string;
        default?: unknown;
        choices?: string[];
        patternHint?: string;
    }[];
    examples: {
        cmd: string;
        why?: string;
    }[];
    notes: string[];
};
export declare function renderUsageLines(spec: CommandSpec<unknown>): string[];
export declare function renderCommandHelpText(spec: CommandSpec<unknown>, opts: {
    compact: boolean;
    includeHeader: boolean;
}): string;
export declare function renderCommandHelpJson(spec: CommandSpec<unknown>): HelpJson;
export declare function renderRegistryHelpText(specs: readonly CommandSpec<unknown>[]): string;
//# sourceMappingURL=help-render.d.ts.map