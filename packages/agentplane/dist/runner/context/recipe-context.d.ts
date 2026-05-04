import type { ResolvedProject } from "@agentplaneorg/core/project";
import { type ResolvedRecipeScenarioSelection, type ScenarioDefinition } from "@agentplaneorg/recipes";
import { readProjectInstalledRecipes } from "../../commands/recipes/impl/project-installed-recipes.js";
import type { RunnerRecipeContext } from "../types.js";
type InstalledRecipeEntry = Awaited<ReturnType<typeof readProjectInstalledRecipes>>["recipes"][number];
export type RunnerRecipeContextEnvelope = {
    entry: InstalledRecipeEntry;
    selection: ResolvedRecipeScenarioSelection;
    scenario: ScenarioDefinition;
    recipe: RunnerRecipeContext;
};
export declare function assembleRunnerRecipeContext(opts: {
    project: ResolvedProject;
    recipe_id: string;
    scenario_id: string;
}): Promise<RunnerRecipeContextEnvelope>;
export {};
//# sourceMappingURL=recipe-context.d.ts.map