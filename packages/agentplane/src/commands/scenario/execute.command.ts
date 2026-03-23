import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import { materializeRecipeScenarioTask } from "../../runner/usecases/scenario-materialize-task.js";

import { CliError } from "../../shared/errors.js";

export type ScenarioExecuteParsed = { recipeId: string; scenarioId: string };

export const scenarioExecuteSpec: CommandSpec<ScenarioExecuteParsed> = {
  id: ["scenario", "execute"],
  group: "Scenario",
  summary: "Materialize a recipe-backed task and execute it through the shared runner flow.",
  description:
    "Resolves a recipe scenario, materializes a task from its explicit task_template, and executes the shared runner with recipe context bundled alongside the created task.",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [
    {
      cmd: "agentplane scenario execute viewer:demo",
      why: "Create a task from the scenario template and execute it through the configured runner.",
    },
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

export const runScenarioExecute: CommandHandler<ScenarioExecuteParsed> = async (ctx, parsed) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    const materialized = await materializeRecipeScenarioTask({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      recipe_id: parsed.recipeId,
      scenario_id: parsed.scenarioId,
    });
    const executed = await executeTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: materialized.task_id,
      run_id: materialized.run_id,
      recipe: materialized.recipe_context,
      target: {
        kind: "recipe_scenario",
        recipe_id: parsed.recipeId,
        scenario_id: parsed.scenarioId,
        task_id: materialized.task_id,
      },
    });

    process.stdout.write(
      `${infoMessage(`scenario executed: ${parsed.recipeId}:${parsed.scenarioId}`)}\n`,
    );
    process.stdout.write(`task_id: ${materialized.task_id}\n`);
    process.stdout.write(`run_id: ${executed.invocation.run_id}\n`);
    process.stdout.write(`state: ${executed.bundle.execution.artifact_paths.state_path}\n`);
    process.stdout.write(`events: ${executed.bundle.execution.artifact_paths.events_path}\n`);
    process.stdout.write(`status: ${executed.result.status}\n`);
    process.stdout.write(`runner_exit_code: ${executed.result.exit_code ?? "null"}\n`);
    if (executed.result.stdout_summary) {
      process.stdout.write(`stdout: ${executed.result.stdout_summary}\n`);
    }
    if (executed.result.stderr_summary) {
      process.stderr.write(`stderr: ${executed.result.stderr_summary}\n`);
    }
    return executed.result.status === "success"
      ? 0
      : (executed.result.exit_code ?? exitCodeForError("E_RUNTIME"));
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: scenarioExecuteSpec.id.join(" "),
      recipe_id: parsed.recipeId,
      scenario_id: parsed.scenarioId,
    });
  }
};
