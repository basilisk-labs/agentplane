import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeDetachParsed } from "./impl/commands/detach.js";

export type RecipesDetachParsed = { id: string };

export const recipesDetachSpec: CommandSpec<RecipesDetachParsed> = {
  id: ["recipes", "detach"],
  group: "Recipes",
  summary: "Convert a linked vendored recipe into a project-local copy.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  examples: [
    {
      cmd: "agentplane recipes detach tdd",
      why: "Freeze a linked recipe into a portable project copy before sharing the repo.",
    },
  ],
  parse: (raw) => ({ id: String(raw.args.id ?? "").trim() }),
};

export const runRecipesDetach: CommandHandler<RecipesDetachParsed> = (ctx, parsed) =>
  cmdRecipeDetachParsed({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    id: parsed.id,
  });
