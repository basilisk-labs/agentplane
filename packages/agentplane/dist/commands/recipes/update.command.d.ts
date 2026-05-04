import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type RecipesUpdateParsed = {
    id: string;
    force: boolean;
};
export declare const recipesUpdateSpec: CommandSpec<RecipesUpdateParsed>;
export declare const runRecipesUpdate: CommandHandler<RecipesUpdateParsed>;
//# sourceMappingURL=update.command.d.ts.map