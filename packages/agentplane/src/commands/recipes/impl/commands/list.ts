import { mapCoreError } from "../../../../cli/error-map.js";
import { createCliEmitter, emptyStateMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readInstalledRecipesFile } from "../installed-recipes.js";
import { resolveInstalledRecipesPath } from "../paths.js";
import type { RecipeListFlags } from "../types.js";

const output = createCliEmitter();

export async function cmdRecipeListParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());

    let recipes = installed.recipes;
    if (flags.tag) {
      const needle = flags.tag.toLowerCase();
      recipes = recipes.filter((entry) => entry.tags.some((tag) => tag.toLowerCase() === needle));
    }

    if (recipes.length === 0) {
      if (flags.tag) {
        output.line(emptyStateMessage(`cached recipes for tag ${flags.tag}`));
        return 0;
      }
      output.line(
        emptyStateMessage(
          "cached recipes",
          "Use `agentplane recipes list-remote` or `agentplane recipes install <id>`.",
        ),
      );
      return 0;
    }

    if (flags.full) {
      output.json({
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes,
      });
      return 0;
    }

    for (const entry of recipes) {
      output.line(
        `${entry.id}@${entry.version} [${entry.manifest.kind}] - ${entry.manifest.summary || "No summary"}`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list", root: opts.rootOverride ?? null });
  }
}
