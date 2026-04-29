import { readFile } from "node:fs/promises";
import path from "node:path";

import type { RecipeManifest } from "@agentplaneorg/recipes";

import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { fileExists } from "../../../cli/fs-utils.js";
import {
  validatePromptModule,
  validatePromptModuleMutationSet,
  type PromptModule,
  type PromptModuleMutation,
  type PromptModuleMutationSet,
  type PromptModuleOwner,
  type PromptModuleProvenance,
} from "../../../runtime/prompt-modules/index.js";

function isJsonAssetPath(relativePath: string): boolean {
  return relativePath.trim().toLowerCase().endsWith(".json");
}

async function readRecipeJsonAsset(
  recipeDir: string,
  relativePath: string,
  label: string,
): Promise<unknown> {
  const sourcePath = path.join(recipeDir, relativePath);
  if (!(await fileExists(sourcePath))) {
    throw new Error(missingFileMessage(label, relativePath));
  }
  if (!isJsonAssetPath(relativePath)) {
    throw new Error(invalidFieldMessage(label, "JSON file (*.json)", relativePath));
  }
  try {
    return JSON.parse(await readFile(sourcePath, "utf8")) as unknown;
  } catch {
    throw new Error(invalidFieldMessage(label, "valid JSON document", relativePath));
  }
}

function assertRecipePromptOwner(
  owner: PromptModuleOwner,
  manifest: RecipeManifest,
  label: string,
  sourceFile: string,
): void {
  if (owner.kind !== "recipe") {
    throw new Error(invalidFieldMessage(label, `owner.kind="recipe"`, sourceFile));
  }
  if (owner.recipe_id !== manifest.id || owner.version !== manifest.version) {
    throw new Error(
      invalidFieldMessage(label, `owner ${manifest.id}@${manifest.version}`, sourceFile),
    );
  }
}

function assertRecipePromptProvenance(
  provenance: PromptModuleProvenance,
  manifest: RecipeManifest,
  label: string,
  sourceFile: string,
): void {
  if (provenance.source_kind !== "recipe_asset") {
    throw new Error(
      invalidFieldMessage(label, `provenance.source_kind="recipe_asset"`, sourceFile),
    );
  }
  if (provenance.recipe_id !== manifest.id || provenance.recipe_version !== manifest.version) {
    throw new Error(
      invalidFieldMessage(label, `provenance ${manifest.id}@${manifest.version}`, sourceFile),
    );
  }
}

function assertPromptModuleBelongsToRecipe(
  module: PromptModule,
  manifest: RecipeManifest,
  label: string,
  sourceFile: string,
): void {
  assertRecipePromptOwner(module.owner, manifest, label, sourceFile);
  assertRecipePromptProvenance(module.provenance, manifest, label, sourceFile);
  if (module.address.namespace !== `recipe.${manifest.id}`) {
    throw new Error(
      invalidFieldMessage(label, `address.namespace=recipe.${manifest.id}`, sourceFile),
    );
  }
}

function assertMutationBelongsToRecipe(
  mutation: PromptModuleMutation,
  manifest: RecipeManifest,
  label: string,
  sourceFile: string,
): void {
  assertRecipePromptOwner(mutation.source.owner, manifest, label, sourceFile);
  assertRecipePromptProvenance(mutation.source.provenance, manifest, label, sourceFile);
  if (mutation.op === "add_module" || mutation.op === "replace_module") {
    assertPromptModuleBelongsToRecipe(mutation.module, manifest, label, sourceFile);
  }
}

function assertMutationSetBelongsToRecipe(
  set: PromptModuleMutationSet,
  manifest: RecipeManifest,
  label: string,
  sourceFile: string,
): void {
  if (set.recipe_id !== manifest.id) {
    throw new Error(invalidFieldMessage(label, `recipe_id=${manifest.id}`, sourceFile));
  }
  for (const mutation of set.mutations) {
    assertMutationBelongsToRecipe(mutation, manifest, label, sourceFile);
  }
}

export async function readRecipePromptModuleAsset(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  file: string;
}): Promise<PromptModule> {
  const raw = await readRecipeJsonAsset(opts.recipeDir, opts.file, "recipe prompt module file");
  const module = validatePromptModule(raw, "recipe prompt module file");
  assertPromptModuleBelongsToRecipe(module, opts.manifest, "recipe prompt module file", opts.file);
  return module;
}

export async function readRecipePromptMutationSetAsset(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  file: string;
}): Promise<PromptModuleMutationSet> {
  const raw = await readRecipeJsonAsset(
    opts.recipeDir,
    opts.file,
    "recipe prompt mutation set file",
  );
  const set = validatePromptModuleMutationSet(raw, "recipe prompt mutation set file");
  assertMutationSetBelongsToRecipe(
    set,
    opts.manifest,
    "recipe prompt mutation set file",
    opts.file,
  );
  return set;
}
