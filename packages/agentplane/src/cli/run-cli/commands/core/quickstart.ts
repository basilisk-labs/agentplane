import { renderQuickstart } from "../../../command-guide.js";
import { createCliEmitter } from "../../../output.js";
import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";

import { wrapCommand } from "../wrap-command.js";

const output = createCliEmitter();

type QuickstartParsed = { json: boolean };

export const quickstartSpec: CommandSpec<QuickstartParsed> = {
  id: ["quickstart"],
  group: "Core",
  summary: "Print the canonical agent bootstrap path and startup guidance.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit compact machine-readable output for agent runtimes.",
    },
  ],
  examples: [{ cmd: "agentplane quickstart", why: "Show quickstart." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

async function cmdQuickstart(opts: {
  cwd: string;
  rootOverride?: string;
  json: boolean;
}): Promise<number> {
  return wrapCommand({ command: "quickstart", rootOverride: opts.rootOverride }, () => {
    const text = renderQuickstart();
    if (opts.json) {
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      output.json({
        source_of_truth: {
          workflow_policy: "AGENTS.md|CLAUDE.md",
          cli_syntax: "quickstart/role output",
        },
        lines,
      });
      return 0;
    }
    output.line(text);
    return 0;
  });
}

export const runQuickstart: CommandHandler<QuickstartParsed> = (ctx, parsed) => {
  return cmdQuickstart({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, json: parsed.json });
};
