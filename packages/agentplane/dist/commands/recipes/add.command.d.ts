import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type RecipesAddParsed = {
    recipeRef: string;
    mode?: "copy" | "link";
};
export declare const recipesAddSpec: CommandSpec<RecipesAddParsed>;
export declare const runRecipesAdd: CommandHandler<RecipesAddParsed>;
//# sourceMappingURL=add.command.d.ts.map