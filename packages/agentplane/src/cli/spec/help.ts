import type { CommandHandler, CommandSpec } from "./spec.js";
import { createCliEmitter } from "../output.js";
import {
  renderCommandHelpJson,
  renderCommandHelpText,
  renderRegistryHelpText,
} from "./help-render.js";
import { suggestOne } from "./suggest.js";
import { usageError } from "./errors.js";

const output = createCliEmitter();

export type HelpParsed = {
  cmd: string[];
  compact: boolean;
  json: boolean;
  all: boolean;
};

export type HelpRegistryView = {
  list(opts?: { all?: boolean }): readonly { spec: CommandSpec }[];
  match(
    tokens: readonly string[],
    opts?: { all?: boolean },
  ): {
    spec: CommandSpec;
    consumed: number;
  } | null;
};

export const helpSpec: CommandSpec<HelpParsed> = {
  id: ["help"],
  group: "Core",
  summary: "Show help for a command.",
  description:
    "Renders spec-derived help for migrated commands. Use --compact for minimal output and --json for machine-readable help.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  options: [
    { kind: "boolean", name: "compact", description: "Compact help (usage + options)." },
    { kind: "boolean", name: "json", description: "Emit JSON help (success output)." },
    {
      kind: "boolean",
      name: "all",
      description: "Include framework-dev and internal maintenance commands in registry output.",
    },
  ],
  examples: [
    { cmd: "agentplane help", why: "List commands available in the CLI command catalog." },
    { cmd: "agentplane help task new --compact", why: "Show compact help for a command." },
    { cmd: "agentplane help task new --json", why: "Show JSON help for a command." },
  ],
  parse: (raw) => {
    const cmd = raw.args.cmd ?? [];
    return {
      cmd: Array.isArray(cmd) ? cmd.map(String) : [String(cmd)],
      compact: raw.opts.compact === true,
      json: raw.opts.json === true,
      all: raw.opts.all === true,
    };
  },
};

export function makeHelpHandler(registry: HelpRegistryView): CommandHandler<HelpParsed> {
  return (_ctx, p) => {
    const specs = registry.list({ all: p.all }).map((e) => e.spec);

    if (p.cmd.length === 0) {
      if (p.json) {
        const out = specs.map((s) => renderCommandHelpJson(s));
        output.json(out);
      } else {
        output.line(renderRegistryHelpText(specs));
      }
      return Promise.resolve(0);
    }

    const match = registry.match(p.cmd, { all: p.all });
    if (match?.consumed !== p.cmd.length) {
      const input = p.cmd.join(" ");
      const candidates = specs.map((s) => s.id.join(" "));
      const suggestion = suggestOne(input, candidates);
      const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
      throw usageError({
        spec: helpSpec,
        command: "help",
        message: `Unknown command: ${input}.${suffix}`,
      });
    }

    if (p.json) {
      output.json(renderCommandHelpJson(match.spec));
      return Promise.resolve(0);
    }

    const text = renderCommandHelpText(match.spec, {
      compact: p.compact,
      includeHeader: true,
    });
    output.line(text);
    return Promise.resolve(0);
  };
}
