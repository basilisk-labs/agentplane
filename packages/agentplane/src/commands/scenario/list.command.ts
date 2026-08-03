import type { CommandSpec } from "../../cli/spec/spec.js";

export type ScenarioListParsed = Record<string, never>;

export const scenarioListSpec: CommandSpec<ScenarioListParsed> = {
  id: ["recipes", "scenario", "list"],
  group: "Recipes",
  summary: "List resolver-backed scenario descriptors from installed recipes.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane recipes scenario list", why: "List available recipe scenarios." }],
};
