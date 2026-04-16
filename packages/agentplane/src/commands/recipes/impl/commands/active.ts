import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { emptyStateMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readActiveRecipeIds } from "../overlay-project.js";
import { readProjectInstalledRecipes } from "../project-installed-recipes.js";

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
      process.stdout.write(`${emptyStateMessage("active overlays")}\n`);
      return 0;
    }
    if (opts.full) {
      process.stdout.write(
        `${JSON.stringify(
          {
            schema_version: 1,
            active: active.map((entry) => ({
              id: entry.id,
              version: entry.version,
              kind: entry.manifest.kind,
              summary: entry.manifest.summary,
            })),
          },
          null,
          2,
        )}\n`,
      );
      return 0;
    }
    for (const entry of active) {
      process.stdout.write(`${entry.id}@${entry.version} [${entry.manifest.kind}]\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes active", root: opts.rootOverride ?? null });
  }
}
