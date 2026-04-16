import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { CliError } from "../../../../shared/errors.js";

import { refreshProjectOverlayArtifacts, setRecipeActive } from "../overlay-project.js";

export async function cmdRecipeDisableParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    await setRecipeActive({ project, recipeId: opts.id, active: false });
    const { bundle } = await refreshProjectOverlayArtifacts(project);
    process.stdout.write(`Disabled overlay ${opts.id} (${bundle.active.length} active)\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes disable", root: opts.rootOverride ?? null });
  }
}
