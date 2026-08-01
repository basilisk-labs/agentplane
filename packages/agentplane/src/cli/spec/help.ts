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

type HelpResult =
  | { kind: "registry_json"; value: ReturnType<typeof renderCommandHelpJson>[] }
  | { kind: "command_json"; value: ReturnType<typeof renderCommandHelpJson> }
  | { kind: "text"; value: string };

function resolveHelpResult(registry: HelpRegistryView, parsed: HelpParsed): HelpResult {
  const specs = registry.list({ all: parsed.all }).map((entry) => entry.spec);

  if (parsed.cmd.length === 0) {
    return parsed.json
      ? { kind: "registry_json", value: specs.map((spec) => renderCommandHelpJson(spec)) }
      : { kind: "text", value: renderRegistryHelpText(specs) };
  }

  const match = registry.match(parsed.cmd, { all: parsed.all });
  if (match?.consumed !== parsed.cmd.length) {
    const input = parsed.cmd.join(" ");
    const candidates = specs.map((spec) => spec.id.join(" "));
    const suggestion = suggestOne(input, candidates);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: helpSpec,
      command: "help",
      message: `Unknown command: ${input}.${suffix}`,
    });
  }

  return parsed.json
    ? { kind: "command_json", value: renderCommandHelpJson(match.spec) }
    : {
        kind: "text",
        value: renderCommandHelpText(match.spec, {
          compact: parsed.compact,
          includeHeader: true,
        }),
      };
}

function renderHelpResult(result: HelpResult): void {
  if (result.kind === "text") {
    output.line(result.value);
    return;
  }
  output.json(result.value);
}

export function makeHelpHandler(registry: HelpRegistryView): CommandHandler<HelpParsed> {
  return (_ctx, p) => {
    renderHelpResult(resolveHelpResult(registry, p));
    return Promise.resolve(0);
  };
}
