import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type HooksGroupParsed = Record<string, never>;

export const hooksSpec: CommandSpec<HooksGroupParsed> = {
  id: ["hooks"],
  group: "Hooks",
  summary: "Manage and run git hooks installed by agentplane.",
  synopsis: ["agentplane hooks <command> [args] [options]"],
  validateRaw: (raw) => {
    if (raw.extra.length > 0) {
      throw usageError({ spec: hooksSpec, message: `Unknown subcommand: ${raw.extra[0]}` });
    }
    throw usageError({ spec: hooksSpec, message: "Missing subcommand." });
  },
  parse: () => ({}),
};

export const runHooks: CommandHandler<HooksGroupParsed> = () => {
  // Unreachable (validateRaw always throws).
  return Promise.resolve(2);
};
