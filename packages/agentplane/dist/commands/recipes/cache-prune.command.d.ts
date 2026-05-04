import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import type { RecipeCachePruneFlags } from "./impl/types.js";
export type RecipesCachePruneParsed = RecipeCachePruneFlags;
export declare const recipesCachePruneSpec: CommandSpec<RecipesCachePruneParsed>;
export declare const runRecipesCachePrune: CommandHandler<RecipesCachePruneParsed>;
//# sourceMappingURL=cache-prune.command.d.ts.map