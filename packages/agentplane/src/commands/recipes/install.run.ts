import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { CliError } from "../../shared/errors.js";

import { cmdRecipeInstall } from "../recipes.js";
import type { RecipesInstallParsed } from "./install.spec.js";
import { recipesInstallSpec } from "./install.spec.js";

export const runRecipesInstall: CommandHandler<RecipesInstallParsed> = (ctx: CommandCtx, p) =>
  (async () => {
    try {
      return await cmdRecipeInstall({
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        ...p,
      });
    } catch (err) {
      if (err instanceof CliError && err.code === "E_USAGE") {
        throw usageError({
          spec: recipesInstallSpec,
          command: "recipes install",
          message: err.message,
        });
      }
      throw err;
    }
  })();
