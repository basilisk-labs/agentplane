import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type ReleaseGroupParsed = Record<string, never>;

export const releaseSpec: CommandSpec<ReleaseGroupParsed> = {
  id: ["release"],
  group: "Release",
  summary: "Prepare a release (agent-assisted notes + version bump workflow).",
  synopsis: ["agentplane release <command> [args] [options]"],
  validateRaw: (raw) => {
    if (raw.extra.length > 0) {
      throw usageError({ spec: releaseSpec, message: `Unknown subcommand: ${raw.extra[0]}` });
    }
    throw usageError({ spec: releaseSpec, message: "Missing subcommand." });
  },
  parse: () => ({}),
};

export const runRelease: CommandHandler<ReleaseGroupParsed> = () => {
  // Unreachable (validateRaw always throws).
  return Promise.resolve(2);
};
