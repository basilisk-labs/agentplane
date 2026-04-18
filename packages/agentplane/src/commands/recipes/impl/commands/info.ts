import { mapCoreError } from "../../../../cli/error-map.js";
import { createCliEmitter } from "../../../../cli/output.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { formatJsonBlock } from "../format.js";
import { readInstalledRecipesFile } from "../installed-recipes.js";
import { resolveInstalledRecipesPath } from "../paths.js";

const output = createCliEmitter();

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
        message: `Recipe not cached: ${opts.id}`,
      });
    }
    const manifest = entry.manifest;

    output.lines([
      `Recipe: ${manifest.id}@${manifest.version}`,
      `Kind: ${manifest.kind}`,
      `Schema: ${manifest.schema_version}`,
      "Cached: yes",
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
    const scenarios = manifest.scenarios ?? [];
    const prompts = manifest.prompts ?? [];
    const validators = manifest.validators ?? [];

    if (skills.length > 0) {
      output.line("Skills:");
      for (const skill of skills) {
        output.line(`  - ${skill.id} - ${skill.summary}`);
      }
    }
    if (agents.length > 0) {
      output.line("Agents:");
      for (const agent of agents) {
        const label = `${agent.display_name} (${agent.id})`;
        output.line(`  - ${label} - ${agent.summary}`);
      }
    }
    if (tools.length > 0) {
      output.line("Tools:");
      for (const tool of tools) {
        output.line(`  - ${tool.id} - ${tool.summary}`);
      }
    }
    if (prompts.length > 0) {
      output.line("Prompts:");
      for (const prompt of prompts) {
        output.line(
          `  - ${prompt.id} [surface=${prompt.surface}, strength=${prompt.strength ?? "default"}]`,
        );
      }
    }
    if (validators.length > 0) {
      output.line("Validators:");
      for (const validator of validators) {
        output.line(`  - ${validator.id} [kind=${validator.kind}, phase=${validator.phase}]`);
      }
    }
    if (scenarios.length > 0) {
      output.line("Scenarios:");
      for (const scenario of scenarios) {
        output.line(
          `  - ${scenario.name} (${scenario.id}) - ${scenario.summary} [mode=${scenario.run_profile.mode}]`,
        );
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes info", root: opts.rootOverride ?? null });
  }
}
