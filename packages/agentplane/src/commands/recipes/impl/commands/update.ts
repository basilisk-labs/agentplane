import { cp, rm, symlink } from "node:fs/promises";

import { normalizeRecipeTags } from "@agentplaneorg/recipes";
import { loadConfig, resolveProject } from "@agentplaneorg/core";

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

function buildModifiedRecipeError(id: string): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_USAGE"),
    code: "E_USAGE",
    message: `Recipe ${id} has local project edits. Re-run with --force to overwrite the vendored copy from cache.`,
  });
}

export async function cmdRecipeUpdateParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
  force: boolean;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(project.agentplaneDir);
    const inspection = await inspectProjectRecipe({ project, recipeId: opts.id });
    if (!inspection.cache_present || !inspection.current_source_sha256) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Cached source is missing for ${inspection.entry.id}@${inspection.entry.version}. Run agentplane recipes install ${inspection.entry.id}@${inspection.entry.version}`,
      });
    }
    if (inspection.state === "modified" && !opts.force) {
      throw buildModifiedRecipeError(inspection.entry.id);
    }
    const currentSourceSha256 = inspection.current_source_sha256;
    if (!currentSourceSha256) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Cached source hash is missing for ${inspection.entry.id}@${inspection.entry.version}`,
      });
    }

    const cache = await readInstalledRecipesFile(resolveInstalledRecipesPath());
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

    const registry = await readProjectRecipesRegistry(project);

    if (
      inspection.entry.materialization === "copy" &&
      inspection.state === "clean" &&
      inspection.current_source_sha256 === inspection.entry.source_sha256
    ) {
      process.stdout.write(
        `Recipe ${inspection.entry.id}@${inspection.entry.version} is already up to date.\n`,
      );
      return 0;
    }

    await ensureActionApproved({
      action: "dangerous_fs",
      config: loaded.config,
      yes: false,
      reason: `recipes update ${inspection.entry.id}@${inspection.entry.version}`,
    });

    const targetDir = resolveProjectVendoredRecipeDir(project, inspection.entry.id);
    await runVendoredRecipeMutation({
      targetDir,
      mode: "replace",
      materialize: async (nextTargetDir) => {
        await (inspection.entry.materialization === "link"
          ? symlink(inspection.source_dir, nextTargetDir, "dir")
          : cp(inspection.source_dir, nextTargetDir, { recursive: true }));
      },
      commit: async () => {
        const vendoredSha256 = await hashRecipeTree(targetDir);
        const existingEntry = registry.recipes.find((entry) => entry.id === inspection.entry.id);
        const nextRegistry = replaceProjectRecipeRegistryEntry(registry, {
          id: inspection.entry.id,
          version: inspection.entry.version,
          path: inspection.entry.project_path,
          active: existingEntry?.active === true,
          materialization: inspection.entry.materialization,
          source_ref: inspection.entry.source_ref,
          source_sha256: currentSourceSha256,
          vendored_sha256: vendoredSha256,
          installed_at: inspection.entry.installed_at,
          tags: normalizeRecipeTags(cached.tags ?? cached.manifest.tags ?? []),
        });
        await publishProjectRecipesState({ project, registry: nextRegistry });
      },
    });
    const verb =
      inspection.entry.materialization === "link"
        ? "Refreshed linked recipe"
        : "Updated vendored recipe";
    process.stdout.write(
      `${verb} ${inspection.entry.id}@${inspection.entry.version} from cache.\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes update", root: opts.rootOverride ?? null });
  }
}
