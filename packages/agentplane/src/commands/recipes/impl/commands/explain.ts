import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
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
        exitCode: exitCodeForError("E_IO"),
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
    if (manifest.compatibility) {
      const payload = formatJsonBlock(manifest.compatibility, "  ");
      if (payload) process.stdout.write(`Compatibility:\n${payload}\n`);
    }

    const skills = manifest.skills ?? [];
    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

    if (skills.length > 0) {
      process.stdout.write("Skills:\n");
      for (const skill of skills) {
        process.stdout.write(`  - ${skill.id} - ${skill.summary}\n`);
      }
    }
    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        process.stdout.write(
          `  - ${agent.display_name} (${agent.id}) - ${agent.summary} [role=${agent.role}]\n`,
        );
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        process.stdout.write(`  - ${tool.id} - ${tool.summary}\n`);
      }
    }

    if (scenarioDetails.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarioDetails) {
        const title = scenario.name ? `${scenario.name} (${scenario.id})` : scenario.id;
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${title}${summary}\n`);
        if (scenario.description) {
          process.stdout.write(`    Description: ${scenario.description}\n`);
        }
        if (scenario.goal) {
          process.stdout.write(`    Goal: ${scenario.goal}\n`);
        }
        if (scenario.use_when && scenario.use_when.length > 0) {
          const payload = formatJsonBlock(scenario.use_when, "      ");
          if (payload) process.stdout.write(`    Use when:\n${payload}\n`);
        }
        if (scenario.avoid_when && scenario.avoid_when.length > 0) {
          const payload = formatJsonBlock(scenario.avoid_when, "      ");
          if (payload) process.stdout.write(`    Avoid when:\n${payload}\n`);
        }
        if (scenario.required_inputs && scenario.required_inputs.length > 0) {
          const payload = formatJsonBlock(scenario.required_inputs, "      ");
          if (payload) process.stdout.write(`    Required inputs:\n${payload}\n`);
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) process.stdout.write(`    Inputs:\n${payload}\n`);
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) process.stdout.write(`    Outputs:\n${payload}\n`);
        }
        if (scenario.permissions && scenario.permissions.length > 0) {
          const payload = formatJsonBlock(scenario.permissions, "      ");
          if (payload) process.stdout.write(`    Permissions:\n${payload}\n`);
        }
        if (scenario.artifacts && scenario.artifacts.length > 0) {
          const payload = formatJsonBlock(scenario.artifacts, "      ");
          if (payload) process.stdout.write(`    Artifacts:\n${payload}\n`);
        }
        if (scenario.agents_involved && scenario.agents_involved.length > 0) {
          const payload = formatJsonBlock(scenario.agents_involved, "      ");
          if (payload) process.stdout.write(`    Agents involved:\n${payload}\n`);
        }
        if (scenario.skills_used && scenario.skills_used.length > 0) {
          const payload = formatJsonBlock(scenario.skills_used, "      ");
          if (payload) process.stdout.write(`    Skills used:\n${payload}\n`);
        }
        if (scenario.tools_used && scenario.tools_used.length > 0) {
          const payload = formatJsonBlock(scenario.tools_used, "      ");
          if (payload) process.stdout.write(`    Tools used:\n${payload}\n`);
        }
        if (scenario.run_profile) {
          const payload = formatJsonBlock(scenario.run_profile, "      ");
          if (payload) process.stdout.write(`    Run profile:\n${payload}\n`);
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
