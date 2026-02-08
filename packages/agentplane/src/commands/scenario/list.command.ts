import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { cmdScenarioListParsed } from "../scenario.js";

export type ScenarioListParsed = Record<string, never>;

export const scenarioListSpec: CommandSpec<ScenarioListParsed> = {
  id: ["scenario", "list"],
  group: "Scenario",
  summary: "List scenarios available from installed recipes.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane scenario list", why: "List scenarios." }],
};

export const runScenarioList: CommandHandler<ScenarioListParsed> = (ctx) =>
  cmdScenarioListParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
