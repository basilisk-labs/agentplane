import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";

import { CliError } from "../../shared/errors.js";

export type ScenarioExecuteParsed = { recipeId: string; scenarioId: string };

export const scenarioExecuteSpec: CommandSpec<ScenarioExecuteParsed> = {
  id: ["scenario", "execute"],
  group: "Scenario",
  summary:
    "Execute a scenario through the future shared runner flow (runtime not implemented yet).",
  description:
    "Reserves the scenario-execution command surface. Actual task materialization and shared runner execution land in later tasks; use scenario run to inspect the prepared run plan today.",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [
    {
      cmd: "agentplane scenario execute viewer:demo",
      why: "Inspect the future scenario-execution command contract.",
    },
  ],
  notes: [
    "Use `agentplane scenario run <recipe:scenario>` to validate and inspect the prepared run plan until execution is implemented.",
  ],
  parse: (raw) => {
    const id = String(raw.args.id ?? "");
    const [recipeId, scenarioId] = id.split(":", 2);
    if (!recipeId || !scenarioId) {
      throw usageError({
        spec: scenarioExecuteSpec,
        command: "scenario execute",
        message: `Invalid scenario id: ${id} (expected: <recipe:scenario>)`,
      });
    }
    return { recipeId, scenarioId };
  },
};

export const runScenarioExecute: CommandHandler<ScenarioExecuteParsed> = (_ctx, _parsed) => {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      "Scenario execution runtime is not implemented yet. Use `agentplane scenario run <recipe:scenario>` to inspect the prepared run plan.",
    context: { command: scenarioExecuteSpec.id.join(" ") },
  });
};
