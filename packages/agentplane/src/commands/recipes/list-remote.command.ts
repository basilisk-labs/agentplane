import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { cmdRecipeListRemoteParsed, type RecipeListRemoteFlags } from "../recipes.js";

export type RecipesListRemoteParsed = RecipeListRemoteFlags;

export const recipesListRemoteSpec: CommandSpec<RecipesListRemoteParsed> = {
  id: ["recipes", "list-remote"],
  group: "Recipes",
  summary: "List recipes from the remote index (or cache).",
  options: [
    {
      kind: "boolean",
      name: "refresh",
      default: false,
      description: "Refresh remote index cache before listing.",
    },
    {
      kind: "string",
      name: "index",
      valueHint: "<path|url>",
      description: "Override recipes index location (path or http(s) URL).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve network access prompts (subject to config approvals).",
    },
  ],
  examples: [
    {
      cmd: "agentplane recipes list-remote",
      why: "List remote recipes using cached index when available.",
    },
    {
      cmd: "agentplane recipes list-remote --refresh",
      why: "Force refresh of the remote index cache.",
    },
    {
      cmd: "agentplane recipes list-remote --index ./index.json --refresh",
      why: "Refresh from a local index file.",
    },
  ],
  parse: (raw) => ({
    refresh: raw.opts.refresh === true,
    index: raw.opts.index as string | undefined,
    yes: raw.opts.yes === true,
  }),
};

export const runRecipesListRemote: CommandHandler<RecipesListRemoteParsed> = (ctx, flags) =>
  cmdRecipeListRemoteParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });
