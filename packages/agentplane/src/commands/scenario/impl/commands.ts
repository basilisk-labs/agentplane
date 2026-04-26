import path from "node:path";
import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../../cli/error-map.js";
import { createCliEmitter, emptyStateMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { listResolvedRecipeScenarios } from "../../recipes.js";
import {
  assertScenarioCompatibility,
  readValidatedScenarioDefinition,
  resolveScenarioForCli,
  validateScenarioRecipeFiles,
} from "./scenario-selection.js";
export { executeRecipeTool, resolveRecipeToolInvocation } from "./scenario-tool-runtime.js";

const output = createCliEmitter();

export async function cmdScenarioListParsed(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const entries = await listResolvedRecipeScenarios({
      project,
      includeIncompatible: true,
    });

    if (entries.length === 0) {
      output.line(emptyStateMessage("scenarios", "Install a recipe to add scenarios."));
      return 0;
    }

    for (const entry of entries) {
      const compatibilityLabel = entry.compatibility.ok ? "compatible" : "incompatible";
      output.line(
        `${entry.recipe_id}:${entry.scenario_id} - ${entry.scenario_summary} ` +
          `[mode=${entry.run_profile.mode}] [${compatibilityLabel}]`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario list", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenarioInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const { selection } = await resolveScenarioForCli({
      project,
      recipeId: opts.recipeId,
      scenarioId: opts.scenarioId,
    });

    output.line(`Scenario: ${selection.recipe_id}:${selection.scenario_id}`);
    output.line(
      `Recipe: ${selection.recipe_name} (${selection.recipe_id}@${selection.recipe_version})`,
    );
    output.line(`Summary: ${selection.scenario_summary}`);
    if (selection.scenario_description) {
      output.line(`Description: ${selection.scenario_description}`);
    }
    output.jsonSection("Use when", selection.use_when);
    if (selection.avoid_when.length > 0) {
      output.jsonSection("Avoid when", selection.avoid_when);
    }
    output.jsonSection("Run profile", selection.run_profile);
    output.jsonSection("Task template", selection.task_template);
    output.line(`Scenario file: ${path.relative(project.gitRoot, selection.scenario_file)}`);
    if (selection.compatibility.ok) {
      output.line("Compatibility: satisfied");
    } else {
      output.jsonSection("Compatibility failures", selection.compatibility.failures);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario info", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenarioRunParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
  resolved?: Awaited<ReturnType<typeof resolveProject>>;
}): Promise<number> {
  const project =
    opts.resolved ??
    (await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  try {
    const { entry, selection } = await resolveScenarioForCli({
      project,
      recipeId: opts.recipeId,
      scenarioId: opts.scenarioId,
    });
    assertScenarioCompatibility(selection);
    const scenarioDefinition = await readValidatedScenarioDefinition({ selection });
    const validationChecks = await validateScenarioRecipeFiles({ entry, selection });

    output.line(`Prepared run plan: ${selection.recipe_id}:${selection.scenario_id}`);
    output.line(
      `Recipe: ${selection.recipe_name} (${selection.recipe_id}@${selection.recipe_version})`,
    );
    output.line(`Goal: ${scenarioDefinition.goal}`);
    output.line(`Scenario file: ${path.relative(project.gitRoot, selection.scenario_file)}`);
    output.jsonSection("Run profile", selection.run_profile);
    output.jsonSection("Selection reasons", selection.selection_reasons);
    output.jsonSection("Validation", [
      `scenario definition ok: ${path.relative(project.gitRoot, selection.scenario_file)}`,
      ...validationChecks,
    ]);
    output.line("Status: preview only; no task created and no runner executed.");
    output.line(
      `Next: use \`agentplane recipes scenario execute ${selection.recipe_id}:${selection.scenario_id}\` ` +
        "to materialize and run this scenario.",
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario run", root: opts.rootOverride ?? null });
  }
}
