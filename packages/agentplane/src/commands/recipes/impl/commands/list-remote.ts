import { defaultConfig, loadConfig } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { fileExists } from "../../../../cli/fs-utils.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureNetworkApproved } from "../../../shared/network-approval.js";

import { DEFAULT_RECIPES_INDEX_URL } from "../constants.js";
import { loadRecipesRemoteIndex, willFetchRemoteRecipesIndex } from "../index.js";
import { maybeResolveProject } from "../project.js";
import { resolveRecipesIndexCachePath } from "../paths.js";
import type { RecipeListRemoteFlags } from "../types.js";

export async function cmdRecipeListRemoteParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListRemoteFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const project = await maybeResolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    let config = defaultConfig();
    if (project) {
      const loaded = await loadConfig(project.agentplaneDir);
      config = loaded.config;
    }
    const source = flags.index ?? DEFAULT_RECIPES_INDEX_URL;
    const cachePath = resolveRecipesIndexCachePath();
    const willFetchRemote = willFetchRemoteRecipesIndex({
      source,
      refresh: flags.refresh,
      cachePathExists: await fileExists(cachePath),
    });
    if (willFetchRemote) {
      await ensureNetworkApproved({
        config,
        yes: flags.yes,
        reason: "recipes list-remote fetches the remote recipes index",
      });
    }
    const index = await loadRecipesRemoteIndex({
      cwd: opts.cwd,
      source: flags.index,
      refresh: flags.refresh,
    });
    for (const recipe of index.recipes) {
      const latest = [...recipe.versions]
        .toSorted((a, b) => a.version.localeCompare(b.version))
        .at(-1);
      if (!latest) continue;
      process.stdout.write(`${recipe.id}@${latest.version} - ${recipe.summary}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list-remote", root: opts.rootOverride ?? null });
  }
}
