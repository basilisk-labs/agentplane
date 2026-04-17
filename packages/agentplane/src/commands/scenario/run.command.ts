import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { cmdScenarioRunParsed } from "../scenario.js";

export type ScenarioRunParsed = { recipeId: string; scenarioId: string };

export const scenarioRunSpec: CommandSpec<ScenarioRunParsed> = {
  id: ["recipes", "scenario", "run"],
  group: "Recipes",
  summary: "Preview a validated scenario plan without creating a task or running a runner.",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [
    {
      cmd: "agentplane recipes scenario run viewer:demo",
      why: "Validate a scenario and inspect the preview plan before `recipes scenario execute`.",
    },
  ],
  parse: (raw) => {
    const id = String(raw.args.id ?? "");
    const [recipeId, scenarioId] = id.split(":", 2);
    if (!recipeId || !scenarioId) {
      throw usageError({
        spec: scenarioRunSpec,
        command: "recipes scenario run",
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
