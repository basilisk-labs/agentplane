import { resolveProject } from "@agentplaneorg/core";

import { rm } from "node:fs/promises";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readProjectInstalledRecipes } from "../project-installed-recipes.js";
import { resolveProjectInstalledRecipeDir } from "../paths.js";

export async function cmdRecipeRemoveParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const installed = await readProjectInstalledRecipes(resolved);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = resolveProjectInstalledRecipeDir(resolved, entry.id);
    await rm(recipeDir, { recursive: true, force: true });

    process.stdout.write(`${successMessage("removed recipe", `${entry.id}@${entry.version}`)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes remove", root: opts.rootOverride ?? null });
  }
}
