import path from "node:path";

import { collectRecipeScenarioDetails } from "@agentplaneorg/recipes";
import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { createCliEmitter } from "../../../../cli/output.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { formatJsonBlock } from "../format.js";
import { readActiveRecipeIds } from "../overlay-project.js";
import { readProjectInstalledRecipes } from "../project-installed-recipes.js";
import { inspectProjectRecipe } from "../project-recipe-state.js";
import { resolveProjectRecipesDir, resolveProjectInstalledRecipeDir } from "../paths.js";

const output = createCliEmitter();

export async function cmdRecipeExplainParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const [installed, activeIds] = await Promise.all([
      readProjectInstalledRecipes(resolved),
      readActiveRecipeIds(resolved),
    ]);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const inspection = await inspectProjectRecipe({ project: resolved, recipeId: opts.id });

    const manifest = entry.manifest;
    const recipeDir = entry.project_path
      ? path.join(resolveProjectRecipesDir(resolved), entry.project_path)
      : resolveProjectInstalledRecipeDir(resolved, entry.id);
    const scenarioDetails = await collectRecipeScenarioDetails(recipeDir, manifest);

    output.lines([
      `Recipe: ${manifest.id}@${manifest.version}`,
      `Kind: ${manifest.kind}`,
      `Schema: ${manifest.schema_version}`,
      `Active: ${activeIds.includes(entry.id) ? "yes" : "no"}`,
      `Materialization: ${entry.materialization}`,
      `State: ${inspection.state}`,
      `Source ref: ${entry.source_ref}`,
      `Cache source: ${inspection.cache_present ? "present" : "missing"}`,
      `Source sha256: ${entry.source_sha256}`,
      `Vendored sha256: ${inspection.current_vendored_sha256}`,
      `Name: ${manifest.name}`,
      `Summary: ${manifest.summary}`,
      `Description: ${manifest.description}`,
    ]);
    if (manifest.tags && manifest.tags.length > 0) {
      output.line(`Tags: ${manifest.tags.join(", ")}`);
    }
    if (manifest.compatibility) {
      const payload = formatJsonBlock(manifest.compatibility, "  ");
      if (payload) output.jsonSection("Compatibility", manifest.compatibility);
    }

    const skills = manifest.skills ?? [];
    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

    if (skills.length > 0) {
      output.line("Skills:");
      for (const skill of skills) {
        output.line(`  - ${skill.id} - ${skill.summary}`);
      }
    }
    if (agents.length > 0) {
      output.line("Agents:");
      for (const agent of agents) {
        output.line(
          `  - ${agent.display_name} (${agent.id}) - ${agent.summary} [role=${agent.role}]`,
        );
      }
    }
    if (tools.length > 0) {
      output.line("Tools:");
      for (const tool of tools) {
        output.line(`  - ${tool.id} - ${tool.summary}`);
      }
    }

    const prompts = manifest.prompts ?? [];
    const validators = manifest.validators ?? [];

    if (prompts.length > 0) {
      output.line("Overlay prompts:");
      for (const prompt of prompts) {
        output.line(
          `  - ${prompt.id} [surface=${prompt.surface}, strength=${prompt.strength ?? "default"}, file=${prompt.file}]`,
        );
      }
    }
    if (validators.length > 0) {
      output.line("Overlay validators:");
      for (const validator of validators) {
        output.line(`  - ${validator.id} [kind=${validator.kind}, phase=${validator.phase}]`);
      }
    }
    if (manifest.templates && Object.keys(manifest.templates).length > 0) {
      const payload = formatJsonBlock(manifest.templates, "  ");
      if (payload) output.jsonSection("Templates", manifest.templates);
    }

    if (scenarioDetails.length > 0) {
      output.line("Scenarios:");
      for (const scenario of scenarioDetails) {
        const title = scenario.name ? `${scenario.name} (${scenario.id})` : scenario.id;
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        output.line(`  - ${title}${summary}`);
        if (scenario.description) {
          output.line(`    Description: ${scenario.description}`);
        }
        if (scenario.goal) {
          output.line(`    Goal: ${scenario.goal}`);
        }
        if (scenario.use_when && scenario.use_when.length > 0) {
          const payload = formatJsonBlock(scenario.use_when, "      ");
          if (payload) output.jsonSection("    Use when", scenario.use_when, { indent: "      " });
        }
        if (scenario.avoid_when && scenario.avoid_when.length > 0) {
          const payload = formatJsonBlock(scenario.avoid_when, "      ");
          if (payload)
            output.jsonSection("    Avoid when", scenario.avoid_when, { indent: "      " });
        }
        if (scenario.required_inputs && scenario.required_inputs.length > 0) {
          const payload = formatJsonBlock(scenario.required_inputs, "      ");
          if (payload) {
            output.jsonSection("    Required inputs", scenario.required_inputs, {
              indent: "      ",
            });
          }
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) output.jsonSection("    Inputs", scenario.inputs, { indent: "      " });
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) output.jsonSection("    Outputs", scenario.outputs, { indent: "      " });
        }
        if (scenario.permissions && scenario.permissions.length > 0) {
          const payload = formatJsonBlock(scenario.permissions, "      ");
          if (payload)
            output.jsonSection("    Permissions", scenario.permissions, { indent: "      " });
        }
        if (scenario.artifacts && scenario.artifacts.length > 0) {
          const payload = formatJsonBlock(scenario.artifacts, "      ");
          if (payload)
            output.jsonSection("    Artifacts", scenario.artifacts, { indent: "      " });
        }
        if (scenario.agents_involved && scenario.agents_involved.length > 0) {
          const payload = formatJsonBlock(scenario.agents_involved, "      ");
          if (payload) {
            output.jsonSection("    Agents involved", scenario.agents_involved, {
              indent: "      ",
            });
          }
        }
        if (scenario.skills_used && scenario.skills_used.length > 0) {
          const payload = formatJsonBlock(scenario.skills_used, "      ");
          if (payload)
            output.jsonSection("    Skills used", scenario.skills_used, { indent: "      " });
        }
        if (scenario.tools_used && scenario.tools_used.length > 0) {
          const payload = formatJsonBlock(scenario.tools_used, "      ");
          if (payload)
            output.jsonSection("    Tools used", scenario.tools_used, { indent: "      " });
        }
        if (scenario.run_profile) {
          const payload = formatJsonBlock(scenario.run_profile, "      ");
          if (payload)
            output.jsonSection("    Run profile", scenario.run_profile, { indent: "      " });
        }
        if (scenario.steps && scenario.steps.length > 0) {
          output.line("    Steps:");
          let stepIndex = 1;
          for (const step of scenario.steps) {
            output.line(`      ${stepIndex}. ${JSON.stringify(step)}`);
            stepIndex += 1;
          }
          continue;
        }
        if (scenario.source !== "definition") {
          output.line("    Details: Scenario definition not found in recipe.");
        }
      }
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain", root: opts.rootOverride ?? null });
  }
}
