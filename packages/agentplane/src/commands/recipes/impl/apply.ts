import { cp, mkdir, readFile, rename, rm } from "node:fs/promises";
import path from "node:path";

import { readScenarioDefinition, type RecipeManifest } from "@agentplaneorg/recipes";

import { fileExists } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { readRecipePromptModuleAsset, readRecipePromptMutationSetAsset } from "./prompt-assets.js";

export async function moveRecipeDir(opts: { from: string; to: string }): Promise<void> {
  await mkdir(path.dirname(opts.to), { recursive: true });
  try {
    await rename(opts.from, opts.to);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "EXDEV") {
      await cp(opts.from, opts.to, { recursive: true });
      await rm(opts.from, { recursive: true, force: true });
      return;
    }
    throw err;
  }
}

function isMarkdownAssetPath(relativePath: string): boolean {
  const normalized = relativePath.trim().toLowerCase();
  return normalized.endsWith(".md") || normalized.endsWith(".markdown");
}

async function readRecipeMarkdownAsset(
  recipeDir: string,
  relativePath: string,
  label: string,
): Promise<void> {
  const sourcePath = path.join(recipeDir, relativePath);
  if (!(await fileExists(sourcePath))) {
    throw new Error(missingFileMessage(label, relativePath));
  }
  if (!isMarkdownAssetPath(relativePath)) {
    throw new Error(invalidFieldMessage(label, "markdown file (*.md)", relativePath));
  }
  const raw = await readFile(sourcePath, "utf8");
  if (!raw.trim()) {
    throw new Error(invalidFieldMessage(label, "non-empty markdown document", relativePath));
  }
}

export async function validateRecipeAssets(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
}): Promise<void> {
  for (const skill of opts.manifest.skills ?? []) {
    await readRecipeMarkdownAsset(opts.recipeDir, skill.file, "recipe skill file");
  }

  for (const agent of opts.manifest.agents ?? []) {
    await readRecipeMarkdownAsset(opts.recipeDir, agent.file, "recipe agent file");
  }

  for (const tool of opts.manifest.tools ?? []) {
    const entrypointPath = path.join(opts.recipeDir, tool.entrypoint);
    if (!(await fileExists(entrypointPath))) {
      throw new Error(missingFileMessage("recipe tool entrypoint", tool.entrypoint));
    }
  }

  for (const prompt of opts.manifest.prompts ?? []) {
    const sourcePath = path.join(opts.recipeDir, prompt.file);
    if (!(await fileExists(sourcePath))) {
      throw new Error(missingFileMessage("overlay prompt file", prompt.file));
    }
  }

  for (const promptModule of opts.manifest.prompt_modules ?? []) {
    await readRecipePromptModuleAsset({
      manifest: opts.manifest,
      recipeDir: opts.recipeDir,
      file: promptModule.file,
    });
  }

  for (const mutationSet of opts.manifest.prompt_mutation_sets ?? []) {
    await readRecipePromptMutationSetAsset({
      manifest: opts.manifest,
      recipeDir: opts.recipeDir,
      file: mutationSet.file,
    });
  }

  for (const scenario of opts.manifest.scenarios ?? []) {
    const sourcePath = path.join(opts.recipeDir, scenario.file);
    if (!(await fileExists(sourcePath))) {
      throw new Error(missingFileMessage("recipe scenario file", scenario.file));
    }
    const definition = await readScenarioDefinition(sourcePath);
    if (definition.id !== scenario.id) {
      throw new Error(
        invalidFieldMessage("recipe scenario file", `scenario.id=${scenario.id}`, scenario.file),
      );
    }
  }
}
