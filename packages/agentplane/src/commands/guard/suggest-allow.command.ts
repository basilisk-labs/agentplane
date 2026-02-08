import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { cmdGuardSuggestAllow } from "./index.js";

export type GuardSuggestAllowParsed = { format: "lines" | "args" };

export const guardSuggestAllowSpec: CommandSpec<GuardSuggestAllowParsed> = {
  id: ["guard", "suggest-allow"],
  group: "Guard",
  summary: "Suggest minimal --allow prefixes based on staged files.",
  options: [
    {
      kind: "string",
      name: "format",
      valueHint: "<lines|args>",
      choices: ["lines", "args"],
      default: "lines",
      description: "Output format (default: lines).",
    },
  ],
  examples: [
    { cmd: "agentplane guard suggest-allow", why: "Print prefixes, one per line." },
    { cmd: "agentplane guard suggest-allow --format args", why: "Print as --allow ... args." },
  ],
  parse: (raw) => ({ format: (raw.opts.format ?? "lines") as GuardSuggestAllowParsed["format"] }),
};

export const runGuardSuggestAllow: CommandHandler<GuardSuggestAllowParsed> = async (ctx, p) => {
  return await cmdGuardSuggestAllow({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    format: p.format,
  });
};
