import type { ResolvedProject } from "@agentplaneorg/core/project";
import { type ScenarioDefinition } from "@agentplaneorg/recipes";
import { readProjectInstalledRecipes } from "../../recipes/impl/project-installed-recipes.js";
import { resolveRecipeScenarioSelection } from "../../recipes/impl/resolver.js";
type ScenarioCliSelection = Awaited<ReturnType<typeof resolveRecipeScenarioSelection>>;
export declare function resolveScenarioForCli(opts: {
    project: ResolvedProject;
    recipeId: string;
    scenarioId: string;
}): Promise<{
    entry: Awaited<ReturnType<typeof readProjectInstalledRecipes>>["recipes"][number];
    selection: ScenarioCliSelection;
}>;
export declare function readValidatedScenarioDefinition(opts: {
    selection: ScenarioCliSelection;
}): Promise<ScenarioDefinition>;
export declare function validateScenarioRecipeFiles(opts: {
    entry: Awaited<ReturnType<typeof readProjectInstalledRecipes>>["recipes"][number];
    selection: ScenarioCliSelection;
}): Promise<string[]>;
export declare function assertScenarioCompatibility(selection: ScenarioCliSelection): void;
export {};
//# sourceMappingURL=scenario-selection.d.ts.map