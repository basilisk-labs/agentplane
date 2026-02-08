import type { ArgSpec, CommandSpec, ExampleSpec, StringOptionSpec } from "./spec.js";

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
  examples: { cmd: string; why?: string }[];
  notes: string[];
};

function renderArgUsage(arg: ArgSpec): string {
  const hint = arg.valueHint ?? `<${arg.name}>`;
  const base = arg.variadic ? `${hint} ...` : hint;
  return arg.required ? base : `[${base}]`;
}

function renderRequiredStringOptionUsage(opt: StringOptionSpec): string {
  const long = `--${opt.name}`;
  const hint = opt.valueHint;
  if (opt.repeatable) {
    const base = `${long} ${hint}`;
    return `${base} [${base} ...]`;
  }
  return `${long} ${hint}`;
}

export function renderUsageLines(spec: CommandSpec<unknown>): string[] {
  if (spec.synopsis && spec.synopsis.length > 0) return [...spec.synopsis];

  const parts: string[] = ["agentplane", ...spec.id];
  const args = spec.args ?? [];
  for (const a of args) parts.push(renderArgUsage(a));

  const opts = (spec.options ?? []).filter((o) => !o.hidden);
  const requiredOpts = opts.filter(
    (o): o is StringOptionSpec => o.kind === "string" && o.required === true,
  );
  const optionalExists = opts.some((o) => !(o.kind === "string" && o.required));

  // Show required options explicitly to reduce confusion.
  for (const o of requiredOpts) parts.push(renderRequiredStringOptionUsage(o));
  if (optionalExists) parts.push("[options]");

  return [parts.join(" ")];
}

function renderOptionsLines(spec: CommandSpec<unknown>): string[] {
  const opts = (spec.options ?? []).filter((o) => !o.hidden);
  if (opts.length === 0) return [];

  const lines: string[] = [];
  for (const o of opts) {
    const short = o.short ? `-${o.short}, ` : "";
    let head = `  ${short}--${o.name}`;
    if (o.kind === "string") head += ` ${o.valueHint}`;

    const meta: string[] = [];
    if (o.kind === "string" && o.required) meta.push("required");
    if (o.kind === "string" && o.repeatable) meta.push("repeatable");
    if (o.kind === "string" && o.minCount && o.minCount > 0) meta.push(`min=${o.minCount}`);
    if (o.kind === "string" && o.choices && o.choices.length > 0)
      meta.push(`choices=${o.choices.join("|")}`);
    if (o.kind === "string" && o.patternHint) meta.push(`format=${o.patternHint}`);
    if (o.default !== undefined) meta.push(`default=${String(o.default)}`);
    if (o.deprecated) meta.push(`deprecated=${o.deprecated}`);

    const suffix = meta.length > 0 ? ` (${meta.join(", ")})` : "";
    lines.push(`${head}  ${o.description}${suffix}`);
  }
  return lines;
}

function renderArgsLines(spec: CommandSpec<unknown>): string[] {
  const args = spec.args ?? [];
  if (args.length === 0) return [];
  const lines: string[] = [];
  for (const a of args) {
    const hint = a.valueHint ?? `<${a.name}>`;
    const req = a.required ? "required" : "optional";
    const varSuffix = a.variadic ? ", variadic" : "";
    const desc = a.description ? `  ${a.description}` : "";
    lines.push(`  ${a.name} ${hint} (${req}${varSuffix})${desc}`);
  }
  return lines;
}

function renderExamplesLines(examples: readonly ExampleSpec[] | undefined): string[] {
  if (!examples || examples.length === 0) return [];
  const lines: string[] = [];
  for (const ex of examples) {
    lines.push(`  ${ex.cmd}`);
    if (ex.why) lines.push(`    # ${ex.why}`);
  }
  return lines;
}

export function renderCommandHelpText(
  spec: CommandSpec<unknown>,
  opts: { compact: boolean; includeHeader: boolean },
): string {
  const lines: string[] = [];
  if (opts.includeHeader) {
    lines.push(`${spec.id.join(" ")} - ${spec.summary}`, "");
  }

  lines.push("Usage:");
  for (const u of renderUsageLines(spec)) lines.push(`  ${u}`);

  const argLines = renderArgsLines(spec);
  if (!opts.compact && argLines.length > 0) {
    lines.push("", "Args:", ...argLines);
  }

  const optLines = renderOptionsLines(spec);
  if (optLines.length > 0) {
    lines.push("", "Options:", ...optLines);
  }

  if (!opts.compact && spec.notes && spec.notes.length > 0) {
    lines.push("", "Notes:", ...spec.notes.map((n) => `  - ${n}`));
  }

  if (!opts.compact) {
    const exLines = renderExamplesLines(spec.examples);
    if (exLines.length > 0) {
      lines.push("", "Examples:", ...exLines);
    }
  }

  return lines.join("\n");
}

export function renderCommandHelpJson(spec: CommandSpec<unknown>): HelpJson {
  const options = (spec.options ?? []).map((o) => {
    if (o.kind === "boolean") {
      return {
        name: o.name,
        kind: "boolean" as const,
        short: o.short,
        description: o.description,
        hidden: o.hidden,
        deprecated: o.deprecated,
        default: o.default,
      };
    }
    return {
      name: o.name,
      kind: "string" as const,
      short: o.short,
      description: o.description,
      hidden: o.hidden,
      deprecated: o.deprecated,
      required: o.required,
      repeatable: o.repeatable,
      minCount: o.minCount,
      valueHint: o.valueHint,
      default: o.default,
      choices: o.choices ? [...o.choices] : undefined,
      patternHint: o.patternHint,
    };
  });

  const args = (spec.args ?? []).map((a) => ({
    name: a.name,
    required: a.required,
    variadic: a.variadic,
    valueHint: a.valueHint,
    description: a.description,
  }));

  const examples = (spec.examples ?? []).map((e) => ({ cmd: e.cmd, why: e.why }));

  return {
    id: [...spec.id],
    group: spec.group,
    summary: spec.summary,
    description: spec.description,
    usage: renderUsageLines(spec),
    args,
    options,
    examples,
    notes: spec.notes ? [...spec.notes] : [],
  };
}

export function renderRegistryHelpText(specs: readonly CommandSpec<unknown>[]): string {
  const byGroup = new Map<string, CommandSpec[]>();
  for (const s of specs) {
    const arr = byGroup.get(s.group) ?? [];
    arr.push(s);
    byGroup.set(s.group, arr);
  }

  const groups = [...byGroup.keys()].toSorted((a, b) => a.localeCompare(b));
  const lines: string[] = [
    "Usage:",
    "  agentplane help [<cmd...>] [--compact] [--json]",
    "",
    "Commands:",
  ];

  for (const g of groups) {
    lines.push(`  ${g}:`);
    const cmds = byGroup.get(g)!.toSorted((a, b) => a.id.join(" ").localeCompare(b.id.join(" ")));
    for (const s of cmds) {
      lines.push(`    ${s.id.join(" ")}  ${s.summary}`);
    }
  }

  return lines.join("\n");
}
