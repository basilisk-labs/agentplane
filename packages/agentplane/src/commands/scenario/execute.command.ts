import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import { materializeRecipeScenarioTask } from "../../runner/usecases/scenario-materialize-task.js";
import { cmdTaskPlanApprove } from "../task/plan.js";
import { cmdTaskStartReady } from "../task/start-ready.js";

import { CliError } from "../../shared/errors.js";

export type ScenarioExecuteParsed = { recipeId: string; scenarioId: string };
const output = createCliEmitter();

export const scenarioExecuteSpec: CommandSpec<ScenarioExecuteParsed> = {
  id: ["recipes", "scenario", "execute"],
  group: "Recipes",
  summary: "Materialize a recipe-backed task and execute it through the shared runner flow.",
  description:
    "Resolves a recipe scenario, materializes a task from its explicit task_template, and executes the shared runner with recipe context bundled alongside the created task.",
  args: [{ name: "id", required: true, valueHint: "<recipe:scenario>" }],
  examples: [
    {
      cmd: "agentplane recipes scenario execute viewer:demo",
      why: "Create a task from the scenario template and execute it through the configured runner.",
    },
  ],
  parse: (raw) => {
    const id = String(raw.args.id ?? "");
    const [recipeId, scenarioId] = id.split(":", 2);
    if (!recipeId || !scenarioId) {
      throw usageError({
        spec: scenarioExecuteSpec,
        command: "recipes scenario execute",
        message: `Invalid scenario id: ${id} (expected: <recipe:scenario>)`,
      });
    }
    return { recipeId, scenarioId };
  },
};

function renderScenarioExecuteStartBody(parsed: ScenarioExecuteParsed, taskId: string): string {
  return (
    `Start: execute recipe scenario ${parsed.recipeId}:${parsed.scenarioId} through the shared runner ` +
    `using materialized task ${taskId} and its explicit task_template.`
  );
}

function renderScenarioExecutePlanApprovalNote(parsed: ScenarioExecuteParsed): string {
  return (
    `Materialized from recipe scenario ${parsed.recipeId}:${parsed.scenarioId} ` +
    "for immediate shared-runner execution."
  );
}

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
    await cmdTaskPlanApprove({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? undefined,
      taskId: materialized.task_id,
      by: "ORCHESTRATOR",
      note: renderScenarioExecutePlanApprovalNote(parsed),
    });
    await cmdTaskStartReady({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? undefined,
      taskId: materialized.task_id,
      author: materialized.task.owner,
      body: renderScenarioExecuteStartBody(parsed, materialized.task_id),
      force: false,
      yes: false,
      quiet: true,
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

    output.info(`scenario executed: ${parsed.recipeId}:${parsed.scenarioId}`);
    output.line(`task_id: ${materialized.task_id}`);
    output.line(`run_id: ${executed.invocation.run_id}`);
    output.line(`state: ${executed.bundle.execution.artifact_paths.state_path}`);
    output.line(`events: ${executed.bundle.execution.artifact_paths.events_path}`);
    output.line(`status: ${executed.result.status}`);
    output.line(`runner_exit_code: ${executed.result.exit_code ?? "null"}`);
    if (executed.result.stdout_summary) {
      output.line(`stdout: ${executed.result.stdout_summary}`);
    }
    if (executed.result.stderr_summary) {
      output.line(`stderr: ${executed.result.stderr_summary}`, "stderr");
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
