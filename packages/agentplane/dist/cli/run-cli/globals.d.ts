import { CliError } from "../../shared/errors.js";
export type ParsedArgs = {
    help: boolean;
    version: boolean;
    noUpdateCheck: boolean;
    root?: string;
    jsonErrors: boolean;
    allowNetwork: boolean;
    outputMode?: "text" | "json";
};
export type CliOutputMode = "text" | "json";
export type ParsedGlobalArgsResult = {
    globals: ParsedArgs;
    rest: string[];
    jsonErrorMode: boolean;
    error?: CliError;
};
export declare function parseGlobalArgs(argv: string[]): ParsedGlobalArgsResult;
export declare function resolveOutputMode(modeFromFlag: "text" | "json" | undefined): CliOutputMode;
export declare function runWithOutputMode(opts: {
    mode: CliOutputMode;
    command: string;
    run: () => Promise<number>;
}): Promise<number>;
//# sourceMappingURL=globals.d.ts.map