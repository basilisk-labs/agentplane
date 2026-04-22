import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { publishProjectRecipesState } from "../overlay-project.js";
import { readProjectInstalledRecipes } from "../project-installed-recipes.js";
import { readProjectRecipesRegistry, setProjectRecipeActiveInFile } from "../project-registry.js";

export async function cmdRecipeEnableParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const installed = await readProjectInstalledRecipes(project);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    if (entry.manifest.kind !== "project_overlay") {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Recipe ${opts.id} is not a project overlay`,
      });
    }
    const registry = await readProjectRecipesRegistry(project);
    const nextRegistry = setProjectRecipeActiveInFile(registry, opts.id, true);
    const { bundle } = await publishProjectRecipesState({ project, registry: nextRegistry });
    process.stdout.write(`Enabled overlay ${opts.id} (${bundle.active.length} active)\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes enable", root: opts.rootOverride ?? null });
  }
}
