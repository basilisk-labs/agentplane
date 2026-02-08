import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";

export type GuardGroupParsed = Record<string, never>;

export const guardSpec: CommandSpec<GuardGroupParsed> = {
  id: ["guard"],
  group: "Guard",
  summary: "Guard commands (commit checks, git hygiene, and allowlist helpers).",
  synopsis: ["agentplane guard <command> [args] [options]"],
  validateRaw: (raw) => {
    if (raw.extra.length > 0) {
      throw usageError({
        spec: guardSpec,
        message: `Unknown subcommand: ${raw.extra[0]}`,
      });
    }
    throw usageError({ spec: guardSpec, message: "Missing subcommand." });
  },
  parse: () => ({}),
};

export const runGuard: CommandHandler<GuardGroupParsed> = () => {
  // Unreachable (validateRaw always throws).
  return Promise.resolve(2);
};
