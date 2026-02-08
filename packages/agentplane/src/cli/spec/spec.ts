export type CommandId = readonly string[]; // e.g. ["task", "new"]

export type ExampleSpec = {
  cmd: string;
  why?: string;
};

export type ArgSpec = {
  name: string; // e.g. "task-id"
  required: boolean;
  variadic?: boolean; // consumes the rest
  valueHint?: string; // e.g. "<task-id>"
  description?: string;
};

export type OptionBase = {
  name: string; // long name without leading dashes
  short?: string; // single letter, e.g. "m"
  description: string;
  hidden?: boolean;
  deprecated?: string; // message to show in help/errors
};

export type BooleanOptionSpec = OptionBase & {
  kind: "boolean";
  default?: boolean;
};

export type StringOptionSpec = OptionBase & {
  kind: "string";
  valueHint: string; // e.g. "<text>"
  required?: boolean;
  repeatable?: boolean;
  minCount?: number; // only for repeatable
  default?: string;
  choices?: readonly string[];
  pattern?: RegExp;
  patternHint?: string;
  coerce?: (raw: string) => unknown;
};

export type OptionSpec = BooleanOptionSpec | StringOptionSpec;

export type ParsedRaw = {
  // Only keys declared in the spec should be read by parse()/validateRaw().
  args: Record<string, string | string[] | undefined>;
  opts: Record<string, unknown>;
  // Any positional tail that was not consumed by ArgSpec (mostly for diagnostics).
  extra: string[];
};

// We intentionally accept bivariant callback parameters for validate/handlers.
// This allows storing CommandSpec<T> in an erased registry type like CommandSpec<unknown>
// without fighting strictFunctionTypes invariance.
type BivariantCallback<T> = { bivarianceHack(arg: T): void }["bivarianceHack"];

export type CommandSpec<TParsed = unknown> = {
  id: CommandId;
  group: string;
  summary: string;
  description?: string;

  // Optional custom usage forms (useful for multi-mode commands).
  synopsis?: readonly string[];

  args?: readonly ArgSpec[];
  options?: readonly OptionSpec[];
  examples?: readonly ExampleSpec[];
  notes?: readonly string[];

  // Cross-field validation on raw inputs (before parse()).
  validateRaw?: (raw: ParsedRaw) => void;
  // Convert raw parse output into a domain-friendly shape.
  parse?: (raw: ParsedRaw) => TParsed;
  // Cross-field validation on parsed domain shape.
  validate?: BivariantCallback<TParsed>;
};

export type CommandCtx = {
  cwd: string;
  rootOverride?: string;
};

export type CommandHandler<TParsed = unknown> = (
  ctx: CommandCtx,
  parsed: TParsed,
) => Promise<number>;

export type MatchResult<TParsed = unknown> = {
  spec: CommandSpec<TParsed>;
  handler: CommandHandler<TParsed>;
  consumed: number; // number of tokens consumed from argv for command id
};

// A narrow type used by cli2 callers when they want to rethrow as E_USAGE.
export type UsageErrorFactory = (opts: {
  message: string;
  spec?: CommandSpec;
  context?: Record<string, unknown>;
  cause?: unknown;
}) => unknown;
