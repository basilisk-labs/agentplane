import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { cmdScenarioInfoParsed } from "../scenario.js";

export type ScenarioInfoParsed = { recipeId: string; scenarioId: string };

export const scenarioInfoSpec: CommandSpec<ScenarioInfoParsed> = {
  id: ["scenario", "info"],
  group: "Scenario",
  summary: "Show scenario details (goal/inputs/outputs/steps).",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [{ cmd: "agentplane scenario info viewer:demo", why: "Show scenario details." }],
  parse: (raw) => {
    const id = String(raw.args.id ?? "");
    const [recipeId, scenarioId] = id.split(":", 2);
    if (!recipeId || !scenarioId) {
      throw usageError({
        spec: scenarioInfoSpec,
        command: "scenario info",
        message: `Invalid scenario id: ${id} (expected: <recipe:scenario>)`,
      });
    }
    return { recipeId, scenarioId };
  },
};

export const runScenarioInfo: CommandHandler<ScenarioInfoParsed> = (ctx, p) =>
  cmdScenarioInfoParsed({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    recipeId: p.recipeId,
    scenarioId: p.scenarioId,
  });
