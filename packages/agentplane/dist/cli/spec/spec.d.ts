export type CommandId = readonly string[];
export type ExampleSpec = {
    cmd: string;
    why?: string;
};
export type ArgSpec = {
    name: string;
    required: boolean;
    variadic?: boolean;
    valueHint?: string;
    description?: string;
};
export type OptionBase = {
    name: string;
    short?: string;
    description: string;
    hidden?: boolean;
    deprecated?: string;
};
export type BooleanOptionSpec = OptionBase & {
    kind: "boolean";
    default?: boolean;
};
export type StringOptionSpec = OptionBase & {
    kind: "string";
    valueHint: string;
    required?: boolean;
    repeatable?: boolean;
    minCount?: number;
    default?: string;
    choices?: readonly string[];
    pattern?: RegExp;
    patternHint?: string;
    coerce?: (raw: string) => unknown;
};
export type OptionSpec = BooleanOptionSpec | StringOptionSpec;
export type ParsedRaw = {
    args: Record<string, string | string[] | undefined>;
    opts: Record<string, unknown>;
    extra: string[];
};
type BivariantCallback<T> = {
    bivarianceHack(arg: T): void;
}["bivarianceHack"];
export type CommandSpec<TParsed = unknown> = {
    id: CommandId;
    group: string;
    summary: string;
    description?: string;
    synopsis?: readonly string[];
    args?: readonly ArgSpec[];
    options?: readonly OptionSpec[];
    examples?: readonly ExampleSpec[];
    notes?: readonly string[];
    validateRaw?: (raw: ParsedRaw) => void;
    parse?: (raw: ParsedRaw) => TParsed;
    validate?: BivariantCallback<TParsed>;
};
export type CommandCtx = {
    cwd: string;
    rootOverride?: string;
};
export type CommandHandler<TParsed = unknown> = (ctx: CommandCtx, parsed: TParsed) => Promise<number>;
export type MatchResult<TParsed = unknown> = {
    spec: CommandSpec<TParsed>;
    handler: CommandHandler<TParsed>;
    consumed: number;
};
export type UsageErrorFactory = (opts: {
    message: string;
    spec?: CommandSpec;
    context?: Record<string, unknown>;
    cause?: unknown;
}) => unknown;
export {};
//# sourceMappingURL=spec.d.ts.map