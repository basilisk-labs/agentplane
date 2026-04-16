import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { CliError } from "../../../../shared/errors.js";

import { readProjectOverlayBundle } from "../overlay-project.js";

export async function cmdRecipeExplainActiveParsed(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const bundle = await readProjectOverlayBundle(project);
    process.stdout.write(`${JSON.stringify(bundle ?? null, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain-active", root: opts.rootOverride ?? null });
  }
}
