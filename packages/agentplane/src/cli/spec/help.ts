import type { CommandHandler, CommandSpec } from "./spec.js";
import {
  renderCommandHelpJson,
  renderCommandHelpText,
  renderRegistryHelpText,
} from "./help-render.js";
import { suggestOne } from "./suggest.js";
import { usageError } from "./errors.js";
import type { CommandRegistry } from "./registry.js";

export type HelpParsed = {
  cmd: string[];
  compact: boolean;
  json: boolean;
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
  ],
  examples: [
    { cmd: "agentplane help", why: "List commands available in cli2 registry." },
    { cmd: "agentplane help task new --compact", why: "Show compact help for a command." },
    { cmd: "agentplane help task new --json", why: "Show JSON help for a command." },
  ],
  parse: (raw) => {
    const cmd = raw.args.cmd ?? [];
    return {
      cmd: Array.isArray(cmd) ? cmd.map(String) : [String(cmd)],
      compact: raw.opts.compact === true,
      json: raw.opts.json === true,
    };
  },
};

export function makeHelpHandler(registry: CommandRegistry): CommandHandler<HelpParsed> {
  return (_ctx, p) => {
    const specs = registry.list().map((e) => e.spec);

    if (p.cmd.length === 0) {
      if (p.json) {
        const out = specs.map((s) => renderCommandHelpJson(s));
        process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
      } else {
        process.stdout.write(`${renderRegistryHelpText(specs)}\n`);
      }
      return Promise.resolve(0);
    }

    const match = registry.match(p.cmd);
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
      process.stdout.write(`${JSON.stringify(renderCommandHelpJson(match.spec), null, 2)}\n`);
      return Promise.resolve(0);
    }

    const text = renderCommandHelpText(match.spec, {
      compact: p.compact,
      includeHeader: true,
    });
    process.stdout.write(`${text}\n`);
    return Promise.resolve(0);
  };
}
