import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { suggestOne } from "../../cli2/suggest.js";

type ScenarioParsed = Record<string, never>;

const SCENARIO_SUBCOMMANDS = ["list", "info", "run"] as const;

export const scenarioSpec: CommandSpec<ScenarioParsed> = {
  id: ["scenario"],
  group: "Scenario",
  summary: "Recipe scenario commands.",
  synopsis: ["agentplane scenario <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: () => ({}),
  validateRaw: (raw) => {
    const rest = Array.isArray(raw.args.subcommand) ? raw.args.subcommand : [];
    const sub = rest[0];
    if (!sub) {
      throw usageError({
        spec: scenarioSpec,
        command: "scenario",
        message: "Missing scenario subcommand.",
      });
    }
    const suggestion = suggestOne(String(sub), [...SCENARIO_SUBCOMMANDS]);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: scenarioSpec,
      command: "scenario",
      message: `Unknown scenario subcommand: ${String(sub)}.${suffix}`,
    });
  },
};

export const runScenario: CommandHandler<ScenarioParsed> = (_ctx: CommandCtx): Promise<number> => {
  // Should be unreachable because validateRaw always throws.
  throw usageError({
    spec: scenarioSpec,
    command: "scenario",
    message: "Missing scenario subcommand.",
  });
};
