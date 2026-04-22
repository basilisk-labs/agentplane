import { resolveProject } from "@agentplaneorg/core/project";
import { cp } from "node:fs/promises";

import { normalizeRecipeTags } from "@agentplaneorg/recipes";
import { loadConfig } from "@agentplaneorg/core/config";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureActionApproved } from "../../../shared/approval-requirements.js";

import { readInstalledRecipesFile } from "../installed-recipes.js";
import { runVendoredRecipeMutation } from "../mutation-transaction.js";
import { publishProjectRecipesState } from "../overlay-project.js";
import { hashRecipeTree, inspectProjectRecipe } from "../project-recipe-state.js";
import {
  readProjectRecipesRegistry,
  replaceProjectRecipeRegistryEntry,
} from "../project-registry.js";
import { resolveInstalledRecipesPath, resolveProjectVendoredRecipeDir } from "../paths.js";

export async function cmdRecipeDetachParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(project.agentplaneDir);
    const inspection = await inspectProjectRecipe({ project, recipeId: opts.id });
    if (inspection.entry.materialization !== "link") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: `Recipe ${inspection.entry.id} is already materialized as copy.`,
      });
    }
    if (!inspection.cache_present || !inspection.current_source_sha256) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Cached source is missing for ${inspection.entry.id}@${inspection.entry.version}. Re-install it before detaching.`,
      });
    }
    const currentSourceSha256 = inspection.current_source_sha256;
    if (!currentSourceSha256) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Cached source hash is missing for ${inspection.entry.id}@${inspection.entry.version}`,
      });
    }
    if (inspection.state === "modified") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: `Recipe ${inspection.entry.id} is no longer a clean project link. Restore it with agentplane recipes update ${inspection.entry.id} --force before detaching.`,
      });
    }

    const cache = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const registry = await readProjectRecipesRegistry(project);
    const cached = cache.recipes.find(
      (entry) => entry.id === inspection.entry.id && entry.version === inspection.entry.version,
    );
    if (!cached) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not found in global cache: ${inspection.entry.id}@${inspection.entry.version}`,
      });
    }

    await ensureActionApproved({
      action: "dangerous_fs",
      config: loaded.config,
      yes: false,
      reason: `recipes detach ${inspection.entry.id}@${inspection.entry.version}`,
    });

    const targetDir = resolveProjectVendoredRecipeDir(project, inspection.entry.id);
    await runVendoredRecipeMutation({
      targetDir,
      mode: "replace",
      materialize: async (nextTargetDir) => {
        await cp(inspection.source_dir, nextTargetDir, { recursive: true });
      },
      commit: async () => {
        const vendoredSha256 = await hashRecipeTree(targetDir);
        const nextRegistry = replaceProjectRecipeRegistryEntry(registry, {
          id: inspection.entry.id,
          version: inspection.entry.version,
          path: inspection.entry.project_path,
          active:
            registry.recipes.find((entry) => entry.id === inspection.entry.id)?.active === true,
          materialization: "copy",
          source_ref: inspection.entry.source_ref,
          source_sha256: currentSourceSha256,
          vendored_sha256: vendoredSha256,
          installed_at: inspection.entry.installed_at,
          tags: normalizeRecipeTags(cached.tags ?? cached.manifest.tags ?? []),
        });
        await publishProjectRecipesState({ project, registry: nextRegistry });
      },
    });
    process.stdout.write(
      `Detached recipe ${inspection.entry.id}@${inspection.entry.version} into a project-local copy.\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes detach", root: opts.rootOverride ?? null });
  }
}
