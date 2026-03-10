import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { cmdScenarioListParsed } from "../scenario.js";

export type ScenarioListParsed = Record<string, never>;

export const scenarioListSpec: CommandSpec<ScenarioListParsed> = {
  id: ["scenario", "list"],
  group: "Scenario",
  summary: "List resolver-backed scenario descriptors from installed recipes.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane scenario list", why: "List available recipe scenarios." }],
};

export const runScenarioList: CommandHandler<ScenarioListParsed> = (ctx) =>
  cmdScenarioListParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
