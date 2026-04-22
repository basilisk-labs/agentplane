import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureActionApproved } from "../../../shared/approval-requirements.js";

import { runVendoredRecipeMutation } from "../mutation-transaction.js";
import { publishProjectRecipesState } from "../overlay-project.js";
import { readProjectInstalledRecipes } from "../project-installed-recipes.js";
import {
  readProjectRecipesRegistry,
  removeProjectRecipeRegistryEntryFromFile,
} from "../project-registry.js";
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
    const loaded = await loadConfig(resolved.agentplaneDir);
    const installed = await readProjectInstalledRecipes(resolved);
    const registry = await readProjectRecipesRegistry(resolved);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = resolveProjectInstalledRecipeDir(resolved, entry.id);
    await ensureActionApproved({
      action: "dangerous_fs",
      config: loaded.config,
      yes: false,
      reason: `recipes remove ${entry.id}@${entry.version}`,
    });
    await runVendoredRecipeMutation({
      targetDir: recipeDir,
      mode: "remove",
      commit: async () => {
        const nextRegistry = removeProjectRecipeRegistryEntryFromFile(registry, entry.id);
        await publishProjectRecipesState({ project: resolved, registry: nextRegistry });
      },
    });

    process.stdout.write(`${successMessage("removed recipe", `${entry.id}@${entry.version}`)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes remove", root: opts.rootOverride ?? null });
  }
}
