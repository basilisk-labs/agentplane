import type { CommandSpec, ParsedRaw } from "../../cli/spec/spec.js";
type TextPayloadSource = {
    inline: string;
    file: string;
    label: string;
};
export declare function riskyInlineTextReason(value: string): string | null;
export declare function validateTextPayloadSource<TParsed>(raw: ParsedRaw, spec: CommandSpec<TParsed>, source: TextPayloadSource, opts?: {
    required?: boolean;
    command?: string;
}): void;
export declare function resolveTextPayload(opts: {
    cwd: string;
    inline?: string;
    file?: string;
    label: string;
}): Promise<string>;
export {};
//# sourceMappingURL=text-payload.d.ts.map