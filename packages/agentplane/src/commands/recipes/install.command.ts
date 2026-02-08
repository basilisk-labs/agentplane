import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { CliError } from "../../shared/errors.js";

import { cmdRecipeInstall, type RecipeConflictMode, type RecipeInstallSource } from "../recipes.js";

export type RecipesInstallParsed = {
  source: RecipeInstallSource;
  index?: string;
  refresh: boolean;
  yes: boolean;
  onConflict: RecipeConflictMode;
};

export const recipesInstallSpec: CommandSpec<RecipesInstallParsed> = {
  id: ["recipes", "install"],
  group: "Recipes",
  summary: "Install a recipe from remote index, local archive, or URL.",
  synopsis: [
    "agentplane recipes install <id|path|url> [--index <path|url>] [--refresh] [--yes] [--on-conflict <fail|rename|overwrite>]",
    "agentplane recipes install --name <id> [--index <path|url>] [--refresh] [--yes] [--on-conflict <fail|rename|overwrite>]",
    "agentplane recipes install --path <path> [--yes] [--on-conflict <fail|rename|overwrite>]",
    "agentplane recipes install --url <url> [--yes] [--on-conflict <fail|rename|overwrite>]",
  ],
  args: [
    {
      name: "source",
      required: false,
      valueHint: "<id|path|url>",
      description:
        "Auto mode: URL if http(s); else PATH if file exists; else NAME (remote index id).",
    },
  ],
  options: [
    {
      kind: "string",
      name: "name",
      valueHint: "<id>",
      description: "Install from remote index by recipe id.",
    },
    {
      kind: "string",
      name: "path",
      valueHint: "<path>",
      description: "Install from local recipe archive path.",
    },
    {
      kind: "string",
      name: "url",
      valueHint: "<url>",
      description: "Install from recipe archive URL.",
    },
    {
      kind: "string",
      name: "index",
      valueHint: "<path|url>",
      description: "Override recipes index location (used when installing by name / auto-name).",
    },
    {
      kind: "boolean",
      name: "refresh",
      default: false,
      description: "Refresh remote index cache before installing.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve network prompts when allowed by config.",
    },
    {
      kind: "string",
      name: "on-conflict",
      valueHint: "<fail|rename|overwrite>",
      choices: ["fail", "rename", "overwrite"],
      default: "fail",
      description: "How to handle conflicts when applying recipe agents.",
    },
  ],
  validateRaw: (raw) => {
    const explicit = [raw.opts.name, raw.opts.path, raw.opts.url].filter(Boolean).length;
    const hasPositional = Boolean(raw.args.source);
    if (explicit + (hasPositional ? 1 : 0) !== 1) {
      throw usageError({
        spec: recipesInstallSpec,
        message: "Exactly one source is required: <source> OR --name OR --path OR --url",
        command: "recipes install",
      });
    }
  },
  parse: (raw) => {
    const onConflict = (raw.opts["on-conflict"] ?? "fail") as RecipeConflictMode;
    const refresh = raw.opts.refresh === true;
    const yes = raw.opts.yes === true;
    const index = typeof raw.opts.index === "string" ? raw.opts.index : undefined;

    if (raw.opts.name) {
      return {
        source: { type: "name", value: raw.opts.name as string },
        index,
        refresh,
        yes,
        onConflict,
      };
    }
    if (raw.opts.path) {
      return {
        source: { type: "path", value: raw.opts.path as string },
        index,
        refresh,
        yes,
        onConflict,
      };
    }
    if (raw.opts.url) {
      return {
        source: { type: "url", value: raw.opts.url as string },
        index,
        refresh,
        yes,
        onConflict,
      };
    }
    const source = raw.args.source;
    if (typeof source !== "string") {
      throw usageError({
        spec: recipesInstallSpec,
        command: "recipes install",
        message: "Missing source argument",
      });
    }
    return {
      source: { type: "auto", value: source },
      index,
      refresh,
      yes,
      onConflict,
    };
  },
  examples: [
    { cmd: "agentplane recipes install viewer", why: "Auto: install by id from remote index." },
    {
      cmd: "agentplane recipes install --name viewer --refresh",
      why: "Install by id, forcing index refresh.",
    },
    {
      cmd: "agentplane recipes install viewer --on-conflict overwrite",
      why: "Apply recipe agents, overwriting conflicts.",
    },
  ],
  notes: [
    "Auto mode resolution matches v0.1.9: URL if http(s); else PATH if file exists; else NAME (remote index).",
    "Network operations may require approval; use --yes to auto-approve when allowed by config.",
  ],
};

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
