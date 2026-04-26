import type { ResolvedProject } from "@agentplaneorg/core/project";
import {
  readScenarioDefinition,
  type ResolvedRecipeScenarioSelection,
  type ScenarioDefinition,
} from "@agentplaneorg/recipes";

import { readProjectRecipeAssetRegistry } from "../../commands/recipes/impl/overlay-project.js";
import { readProjectInstalledRecipes } from "../../commands/recipes/impl/project-installed-recipes.js";
import { resolveRecipeScenarioSelection } from "../../commands/recipes/impl/resolver.js";
import { resolveRecipeCapabilityRegistry } from "../../runtime/capabilities/index.js";
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
  assets?: Awaited<ReturnType<typeof readProjectRecipeAssetRegistry>>;
}): RunnerRecipeContext {
  const recipeAssets =
    opts.assets?.entries.filter((asset) => asset.recipe_id === opts.entry.id) ?? [];
  const agents =
    recipeAssets.length > 0
      ? recipeAssets
          .filter((asset) => asset.kind === "agent")
          .filter((asset) => opts.selection.agents_involved.includes(asset.asset_id))
          .map((asset) => ({
            ...(asset.definition as Record<string, unknown>),
            content: asset.content,
            source: asset.source,
          }))
      : (opts.entry.manifest.agents ?? [])
          .filter((agent) => opts.selection.agents_involved.includes(agent.id))
          .map((agent) => agent as unknown as Record<string, unknown>);
  const skills =
    recipeAssets.length > 0
      ? recipeAssets
          .filter((asset) => asset.kind === "skill")
          .filter((asset) => opts.selection.skills_used.includes(asset.asset_id))
          .map((asset) => ({
            ...(asset.definition as Record<string, unknown>),
            content: asset.content,
            source: asset.source,
          }))
      : (opts.entry.manifest.skills ?? [])
          .filter((skill) => opts.selection.skills_used.includes(skill.id))
          .map((skill) => skill as unknown as Record<string, unknown>);
  const tools =
    recipeAssets.length > 0
      ? recipeAssets
          .filter((asset) => asset.kind === "tool")
          .filter((asset) => opts.selection.tools_used.includes(asset.asset_id))
          .map((asset) => asset.definition as unknown as Record<string, unknown>)
      : (opts.entry.manifest.tools ?? [])
          .filter((tool) => opts.selection.tools_used.includes(tool.id))
          .map((tool) => tool as unknown as Record<string, unknown>);

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
    agents,
    skills,
    tools,
    capabilities: resolveRecipeCapabilityRegistry({
      entry: opts.entry,
      assets: recipeAssets,
      selection: opts.selection,
    }),
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
  const assets = await readProjectRecipeAssetRegistry(opts.project);

  return {
    entry,
    selection,
    scenario,
    recipe: toRecipeContext({ entry, selection, scenario, assets }),
  };
}
