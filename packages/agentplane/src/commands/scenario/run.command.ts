import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { cmdScenarioRunParsed } from "../scenario.js";

export type ScenarioRunParsed = { recipeId: string; scenarioId: string };

export const scenarioRunSpec: CommandSpec<ScenarioRunParsed> = {
  id: ["scenario", "run"],
  group: "Scenario",
  summary: "Run a scenario toolchain from an installed recipe.",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [{ cmd: "agentplane scenario run viewer:demo", why: "Run a scenario." }],
  parse: (raw) => {
    const id = String(raw.args.id ?? "");
    const [recipeId, scenarioId] = id.split(":", 2);
    if (!recipeId || !scenarioId) {
      throw usageError({
        spec: scenarioRunSpec,
        command: "scenario run",
        message: `Invalid scenario id: ${id} (expected: <recipe:scenario>)`,
      });
    }
    return { recipeId, scenarioId };
  },
};

export const runScenarioRun: CommandHandler<ScenarioRunParsed> = (ctx, p) =>
  cmdScenarioRunParsed({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    recipeId: p.recipeId,
    scenarioId: p.scenarioId,
  });
