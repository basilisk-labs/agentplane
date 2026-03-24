import type { ResolvedProject } from "@agentplaneorg/core";

import {
  readProjectInstalledRecipes,
  readScenarioDefinition,
  resolveRecipeScenarioSelection,
  type ResolvedRecipeScenarioSelection,
  type ScenarioDefinition,
} from "../../commands/recipes.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerRecipeContext } from "../types.js";

type InstalledRecipeEntry = Awaited<
  ReturnType<typeof readProjectInstalledRecipes>
>["recipes"][number];

export type RunnerRecipeContextEnvelope = {
  entry: InstalledRecipeEntry;
  selection: ResolvedRecipeScenarioSelection;
  scenario: ScenarioDefinition;
  recipe: RunnerRecipeContext;
};

function toRecipeContext(opts: {
  entry: InstalledRecipeEntry;
  selection: ResolvedRecipeScenarioSelection;
  scenario: ScenarioDefinition;
}): RunnerRecipeContext {
  const agents = (opts.entry.manifest.agents ?? []).filter((agent) =>
    opts.selection.agents_involved.includes(agent.id),
  );
  const skills = (opts.entry.manifest.skills ?? []).filter((skill) =>
    opts.selection.skills_used.includes(skill.id),
  );
  const tools = (opts.entry.manifest.tools ?? []).filter((tool) =>
    opts.selection.tools_used.includes(tool.id),
  );

  return {
    recipe_id: opts.entry.id,
    scenario_id: opts.selection.scenario_id,
    recipe_name: opts.entry.manifest.name,
    recipe_version: opts.entry.version,
    recipe_dir: opts.selection.recipe_dir,
    scenario_file: opts.selection.scenario_file,
    run_profile: opts.selection.run_profile as Record<string, unknown>,
    selection_reasons: [...opts.selection.selection_reasons],
    manifest: opts.entry.manifest as unknown as Record<string, unknown>,
    scenario: opts.scenario as unknown as Record<string, unknown>,
    agents: agents as unknown as Record<string, unknown>[],
    skills: skills as unknown as Record<string, unknown>[],
    tools: tools as unknown as Record<string, unknown>[],
  };
}

export async function assembleRunnerRecipeContext(opts: {
  project: ResolvedProject;
  recipe_id: string;
  scenario_id: string;
}): Promise<RunnerRecipeContextEnvelope> {
  const installed = await readProjectInstalledRecipes(opts.project);
  const entry = installed.recipes.find((candidate) => candidate.id === opts.recipe_id);
  if (!entry) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Recipe not installed: ${opts.recipe_id}`,
    });
  }

  const selection = await resolveRecipeScenarioSelection({
    project: opts.project,
    flags: {
      recipeId: opts.recipe_id,
      scenarioId: opts.scenario_id,
      includeIncompatible: true,
    },
  });
  const scenario = await readScenarioDefinition(selection.scenario_file);

  return {
    entry,
    selection,
    scenario,
    recipe: toRecipeContext({ entry, selection, scenario }),
  };
}
