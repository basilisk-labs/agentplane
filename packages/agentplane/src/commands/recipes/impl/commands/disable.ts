import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { CliError } from "../../../../shared/errors.js";

import { publishProjectRecipesState } from "../overlay-project.js";
import { readProjectRecipesRegistry, setProjectRecipeActiveInFile } from "../project-registry.js";

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
    const registry = await readProjectRecipesRegistry(project);
    const nextRegistry = setProjectRecipeActiveInFile(registry, opts.id, false);
    const { bundle } = await publishProjectRecipesState({ project, registry: nextRegistry });
    process.stdout.write(`Disabled overlay ${opts.id} (${bundle.active.length} active)\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes disable", root: opts.rootOverride ?? null });
  }
}
