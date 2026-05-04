import type { CommandSpec, OptionSpec, ParsedRaw } from "../../cli/spec/spec.js";
export type VerifyCommonParsed = {
    by: string;
    note: string;
    noteFile?: string;
    details?: string;
    file?: string;
    quiet: boolean;
    collectIncidents: boolean;
    observation?: string;
    impact?: string;
    resolution?: string;
    localOnly: boolean;
    repoFixable: boolean;
    incidentScope?: string;
    incidentTags: string[];
    incidentMatch: string[];
    incidentAdvice?: string;
    incidentRule?: string;
};
export declare const verifyFindingOptions: readonly OptionSpec[];
export declare const verifyCommonOptions: readonly OptionSpec[];
export declare function validateVerifyDetailsFileExclusive<TParsed>(raw: ParsedRaw, spec: CommandSpec<TParsed>, opts?: {
    command?: string;
    message?: string;
}): void;
export declare function validateVerifyNonEmptyInput<TParsed>(raw: ParsedRaw, spec: CommandSpec<TParsed>, name: "by" | "note"): void;
export declare function validateVerifyNoteSource<TParsed>(raw: ParsedRaw, spec: CommandSpec<TParsed>, opts?: {
    command?: string;
}): void;
export declare function validateVerifyFindingSource<TParsed>(raw: ParsedRaw, spec: CommandSpec<TParsed>, opts?: {
    command?: string;
}): void;
export declare function parseVerifyCommonOptions(raw: ParsedRaw): VerifyCommonParsed;
//# sourceMappingURL=verify-command-shared.d.ts.map