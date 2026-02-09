import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { readInstalledRecipesFile } from "../installed-recipes.js";
import { resolveInstalledRecipesPath } from "../paths.js";

export async function cmdRecipeInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const manifest = entry.manifest;

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];
    const scenarios = manifest.scenarios ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarios.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarios) {
        const label = scenario?.id ?? "unknown";
        const summary = scenario?.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes info", root: opts.rootOverride ?? null });
  }
}
