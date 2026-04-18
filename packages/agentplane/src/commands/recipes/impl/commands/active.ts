import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { createCliEmitter, emptyStateMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readActiveRecipeIds } from "../overlay-project.js";
import { readProjectInstalledRecipes } from "../project-installed-recipes.js";

const output = createCliEmitter();

export async function cmdRecipeActiveParsed(opts: {
  cwd: string;
  rootOverride?: string;
  full: boolean;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const [activeIds, installed] = await Promise.all([
      readActiveRecipeIds(project),
      readProjectInstalledRecipes(project),
    ]);
    const active = activeIds
      .map((id) => installed.recipes.find((entry) => entry.id === id))
      .filter(Boolean) as NonNullable<(typeof installed.recipes)[number]>[];
    if (active.length === 0) {
      output.line(emptyStateMessage("active overlays"));
      return 0;
    }
    if (opts.full) {
      output.json({
        schema_version: 1,
        active: active.map((entry) => ({
          id: entry.id,
          version: entry.version,
          kind: entry.manifest.kind,
          summary: entry.manifest.summary,
        })),
      });
      return 0;
    }
    for (const entry of active) {
      output.line(`${entry.id}@${entry.version} [${entry.manifest.kind}]`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes active", root: opts.rootOverride ?? null });
  }
}
