import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeUpdateParsed } from "./impl/commands/update.js";

export type RecipesUpdateParsed = {
  id: string;
  force: boolean;
};

export const recipesUpdateSpec: CommandSpec<RecipesUpdateParsed> = {
  id: ["recipes", "update"],
  group: "Recipes",
  summary: "Refresh a vendored recipe from the cached source.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  options: [
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Overwrite local project edits in the vendored recipe.",
    },
  ],
  examples: [
    {
      cmd: "agentplane recipes update tdd",
      why: "Sync a clean vendored recipe to the current cached source.",
    },
    {
      cmd: "agentplane recipes update tdd --force",
      why: "Overwrite local vendored edits with the cached source.",
    },
  ],
  parse: (raw) => ({
    id: String(raw.args.id ?? "").trim(),
    force: raw.opts.force === true,
  }),
};

export const runRecipesUpdate: CommandHandler<RecipesUpdateParsed> = (ctx, parsed) =>
  cmdRecipeUpdateParsed({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    id: parsed.id,
    force: parsed.force,
  });
