import { mapCoreError } from "../../../../cli/error-map.js";
import { CliError } from "../../../../shared/errors.js";

import { collectRecipeScenarioDetails } from "../scenario.js";
import { formatJsonBlock } from "../format.js";
import { readInstalledRecipesFile } from "../installed-recipes.js";
import { resolveInstalledRecipeDir, resolveInstalledRecipesPath } from "../paths.js";

export async function cmdRecipeExplainParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }

    const manifest = entry.manifest;
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenarioDetails = await collectRecipeScenarioDetails(recipeDir, manifest);

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

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

    if (scenarioDetails.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarioDetails) {
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${scenario.id}${summary}\n`);
        if (scenario.description) {
          process.stdout.write(`    Description: ${scenario.description}\n`);
        }
        if (scenario.goal) {
          process.stdout.write(`    Goal: ${scenario.goal}\n`);
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) process.stdout.write(`    Inputs:\n${payload}\n`);
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) process.stdout.write(`    Outputs:\n${payload}\n`);
        }
        if (scenario.steps && scenario.steps.length > 0) {
          process.stdout.write("    Steps:\n");
          let stepIndex = 1;
          for (const step of scenario.steps) {
            process.stdout.write(`      ${stepIndex}. ${JSON.stringify(step)}\n`);
            stepIndex += 1;
          }
          continue;
        }
        if (scenario.source !== "definition") {
          process.stdout.write("    Details: Scenario definition not found in recipe.\n");
        }
      }
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain", root: opts.rootOverride ?? null });
  }
}
