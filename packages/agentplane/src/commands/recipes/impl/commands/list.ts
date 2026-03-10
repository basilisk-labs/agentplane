import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { emptyStateMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readProjectInstalledRecipes } from "../project-installed-recipes.js";
import type { RecipeListFlags } from "../types.js";

export async function cmdRecipeListParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const installed = await readProjectInstalledRecipes(resolved);

    let recipes = installed.recipes;
    if (flags.tag) {
      const needle = flags.tag.toLowerCase();
      recipes = recipes.filter((entry) => entry.tags.some((tag) => tag.toLowerCase() === needle));
    }

    if (recipes.length === 0) {
      if (flags.tag) {
        process.stdout.write(`${emptyStateMessage(`installed recipes for tag ${flags.tag}`)}\n`);
        return 0;
      }
      process.stdout.write(
        `${emptyStateMessage(
          "installed recipes",
          "Use `agentplane recipes list-remote` or `agentplane recipes install <id>`.",
        )}\n`,
      );
      return 0;
    }

    if (flags.full) {
      process.stdout.write(
        `${JSON.stringify(
          { schema_version: 1, updated_at: installed.updated_at, recipes },
          null,
          2,
        )}\n`,
      );
      return 0;
    }

    for (const entry of recipes) {
      process.stdout.write(
        `${entry.id}@${entry.version} - ${entry.manifest.summary || "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list", root: opts.rootOverride ?? null });
  }
}
