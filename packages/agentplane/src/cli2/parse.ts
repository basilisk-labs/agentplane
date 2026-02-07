import type { CommandSpec, OptionSpec, ParsedRaw } from "./spec.js";
import { suggestOne } from "./suggest.js";
import { usageError } from "./errors.js";

type ParsedCommand<TParsed> = {
  raw: ParsedRaw;
  parsed: TParsed;
};

function isOptionToken(tok: string): boolean {
  return tok.startsWith("-") && tok !== "-";
}

function indexOptions(spec: CommandSpec<unknown>): {
  byLong: Map<string, OptionSpec>;
  byShort: Map<string, OptionSpec>;
  candidates: string[];
} {
  const byLong = new Map<string, OptionSpec>();
  const byShort = new Map<string, OptionSpec>();
  const candidates: string[] = [];

  for (const o of spec.options ?? []) {
    byLong.set(`--${o.name}`, o);
    candidates.push(`--${o.name}`);
    if (o.short) {
      byShort.set(`-${o.short}`, o);
      candidates.push(`-${o.short}`);
    }
  }

  return { byLong, byShort, candidates };
}

function setOpt(raw: ParsedRaw, opt: OptionSpec, value: unknown): void {
  const key = opt.name;
  if (opt.kind === "boolean") {
    raw.opts[key] = Boolean(value);
    return;
  }

  const coerced = opt.coerce ? opt.coerce(String(value)) : String(value);
  if (opt.repeatable) {
    const existing = raw.opts[key];
    const arr: unknown[] = Array.isArray(existing) ? [...(existing as unknown[])] : [];
    if (Array.isArray(coerced)) {
      for (const v of coerced) arr.push(v);
    } else {
      arr.push(coerced);
    }
    raw.opts[key] = arr;
    return;
  }

  if (raw.opts[key] !== undefined) {
    throw usageError({ message: `Duplicate option: --${key}` });
  }
  raw.opts[key] = coerced;
}

function validateOptValue(spec: CommandSpec<unknown>, opt: OptionSpec, value: string): void {
  if (opt.kind !== "string") return;
  if (opt.choices && opt.choices.length > 0 && !opt.choices.includes(value)) {
    throw usageError({
      spec,
      message: `Invalid value for --${opt.name}: ${value} (expected one of: ${opt.choices.join(", ")})`,
    });
  }
  if (opt.pattern && !opt.pattern.test(value)) {
    const hint = opt.patternHint ? ` (${opt.patternHint})` : "";
    throw usageError({
      spec,
      message: `Invalid value for --${opt.name}: ${value}${hint}`,
    });
  }
}

function normalizeForValidation(opt: OptionSpec, rawValue: string): string {
  if (opt.kind !== "string") return rawValue;
  if (!opt.coerce) return rawValue;
  const coerced = opt.coerce(rawValue);
  return typeof coerced === "string" ? coerced : rawValue;
}

export function parseCommandArgv<TParsed>(
  spec: CommandSpec<TParsed>,
  argv: readonly string[],
): ParsedCommand<TParsed> {
  const { byLong, byShort, candidates } = indexOptions(spec);
  const raw: ParsedRaw = { args: {}, opts: {}, extra: [] };

  const positionals: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i];
    if (!tok) continue;

    if (tok === "--") {
      positionals.push(...argv.slice(i + 1).filter(Boolean));
      break;
    }

    if (!isOptionToken(tok)) {
      positionals.push(tok);
      continue;
    }

    // Long options: --name or --name=value
    if (tok.startsWith("--")) {
      const eq = tok.indexOf("=");
      const head = eq === -1 ? tok : tok.slice(0, eq);
      const opt = byLong.get(head);
      if (!opt) {
        // Global approval flag: allow `--yes` on any command to preserve legacy behavior
        // where `--yes` can be used to satisfy network-approval gating even for commands
        // that do not explicitly declare it.
        if (head === "--yes") {
          if (eq !== -1) {
            throw usageError({ spec, message: "Option --yes does not take a value" });
          }
          raw.opts.yes = true;
          continue;
        }
        const sugg = suggestOne(head, candidates);
        const suffix = sugg ? ` Did you mean ${sugg}?` : "";
        throw usageError({ spec, message: `Unknown option: ${head}.${suffix}` });
      }

      if (opt.kind === "boolean") {
        if (eq === -1) {
          setOpt(raw, opt, true);
          continue;
        }
        throw usageError({ spec, message: `Option ${head} does not take a value` });
      }

      const value = eq === -1 ? argv[i + 1] : tok.slice(eq + 1);
      if (value === undefined || value === null || value === "") {
        throw usageError({ spec, message: `Missing value after ${head}` });
      }
      const rawValue = String(value);
      validateOptValue(spec, opt, normalizeForValidation(opt, rawValue));
      setOpt(raw, opt, rawValue);
      if (eq === -1) i++;
      continue;
    }

    // Short options: -m value (no grouping)
    const opt = byShort.get(tok);
    if (!opt) {
      const sugg = suggestOne(tok, candidates);
      const suffix = sugg ? ` Did you mean ${sugg}?` : "";
      throw usageError({ spec, message: `Unknown option: ${tok}.${suffix}` });
    }

    if (opt.kind === "boolean") {
      setOpt(raw, opt, true);
      continue;
    }

    const value = argv[i + 1];
    if (!value) throw usageError({ spec, message: `Missing value after ${tok}` });
    const rawValue = String(value);
    validateOptValue(spec, opt, normalizeForValidation(opt, rawValue));
    setOpt(raw, opt, rawValue);
    i++;
  }

  // Apply defaults and validate required/minCount.
  for (const o of spec.options ?? []) {
    if (o.kind === "boolean") {
      if (raw.opts[o.name] === undefined && o.default !== undefined) raw.opts[o.name] = o.default;
      continue;
    }

    if (raw.opts[o.name] === undefined && o.default !== undefined) raw.opts[o.name] = o.default;

    if (o.required === true && raw.opts[o.name] === undefined) {
      throw usageError({ spec, message: `Missing required option: --${o.name}` });
    }

    if (o.repeatable && o.minCount && o.minCount > 0) {
      const v = raw.opts[o.name];
      const count = Array.isArray(v) ? v.length : 0;
      if (count < o.minCount) {
        throw usageError({
          spec,
          message: `Option --${o.name} must be provided at least ${o.minCount} time(s)`,
        });
      }
    }
  }

  // Positional args.
  let cursor = 0;
  for (const a of spec.args ?? []) {
    if (a.variadic) {
      const rest = positionals.slice(cursor);
      if (a.required && rest.length === 0) {
        throw usageError({ spec, message: `Missing required argument: ${a.name}` });
      }
      raw.args[a.name] = rest;
      cursor = positionals.length;
      break;
    }

    const v = positionals[cursor];
    if (v === undefined) {
      if (a.required) throw usageError({ spec, message: `Missing required argument: ${a.name}` });
      raw.args[a.name] = undefined;
      continue;
    }
    raw.args[a.name] = v;
    cursor++;
  }
  raw.extra = positionals.slice(cursor);

  if (raw.extra.length > 0) {
    throw usageError({ spec, message: `Unexpected argument: ${raw.extra[0]}` });
  }

  if (spec.validateRaw) spec.validateRaw(raw);

  const parsed = spec.parse ? spec.parse(raw) : (raw.opts as unknown as TParsed);
  if (spec.validate) spec.validate(parsed);

  return { raw, parsed };
}
