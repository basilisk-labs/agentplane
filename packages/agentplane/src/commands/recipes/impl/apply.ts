import { cp, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  normalizeAgentId,
  readScenarioDefinition,
  type RecipeConflictMode,
  type RecipeManifest,
} from "@agentplaneorg/recipes";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import {
  validatePromptModule,
  validatePromptModuleMutationSet,
  type PromptModule,
  type PromptModuleMutation,
  type PromptModuleMutationSet,
  type PromptModuleOwner,
  type PromptModuleProvenance,
} from "../../../runtime/prompt-modules/index.js";

import { RECIPES_SCENARIOS_DIR_NAME, RECIPES_SCENARIOS_INDEX_NAME } from "./constants.js";

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

function isJsonAssetPath(relativePath: string): boolean {
  return relativePath.trim().toLowerCase().endsWith(".json");
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

async function readRecipePromptModuleAsset(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  file: string;
}): Promise<void> {
  const raw = await readRecipeJsonAsset(opts.recipeDir, opts.file, "recipe prompt module file");
  const module = validatePromptModule(raw, "recipe prompt module file");
  assertPromptModuleBelongsToRecipe(module, opts.manifest, "recipe prompt module file", opts.file);
}

async function readRecipePromptMutationSetAsset(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  file: string;
}): Promise<void> {
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

export async function applyRecipeAgents(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  agentplaneDir: string;
  onConflict: RecipeConflictMode;
}): Promise<void> {
  const agents = opts.manifest.agents ?? [];
  if (agents.length === 0) return;

  const agentsDir = path.join(opts.agentplaneDir, "agents");
  await mkdir(agentsDir, { recursive: true });

  for (const agent of agents) {
    const rawId = typeof agent?.id === "string" ? agent.id : "";
    const rawFile = typeof agent?.file === "string" ? agent.file : "";
    if (!rawId.trim() || !rawFile.trim()) {
      throw new Error("manifest.agents entries must include id and file");
    }
    const agentId = normalizeAgentId(rawId);
    const sourcePath = path.join(opts.recipeDir, rawFile);
    if (!(await fileExists(sourcePath))) {
      throw new Error(missingFileMessage("recipe agent file", rawFile));
    }
    if (!isMarkdownAssetPath(rawFile)) {
      throw new Error(invalidFieldMessage("recipe agent file", "markdown file (*.md)", rawFile));
    }
    const rawAgent = await readFile(sourcePath, "utf8");
    if (!rawAgent.trim()) {
      throw new Error(
        invalidFieldMessage("recipe agent file", "non-empty markdown document", rawFile),
      );
    }

    const baseId = `${opts.manifest.id}__${agentId}`;
    let targetId = baseId;
    let targetPath = path.join(agentsDir, `${targetId}.md`);
    if (await getPathKind(targetPath)) {
      if (opts.onConflict === "fail") {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Agent already exists: ${targetId}`,
        });
      }
      if (opts.onConflict === "rename") {
        let counter = 1;
        while (await getPathKind(targetPath)) {
          targetId = `${baseId}__${counter}`;
          targetPath = path.join(agentsDir, `${targetId}.md`);
          counter += 1;
        }
      }
    }

    const namespacedHeader = `# Agent: ${targetId}\n\n`;
    const content = rawAgent.startsWith("# Agent:")
      ? rawAgent
      : `${namespacedHeader}${rawAgent.trimStart()}`;
    await writeFile(targetPath, content, "utf8");
  }
}

export async function applyRecipeScenarios(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
}): Promise<void> {
  const scenariosDir = path.join(opts.recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  const scenariosIndexPath = path.join(opts.recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
  const payload = { schema_version: 1, scenarios: [] as { id: string; summary?: string }[] };

  if ((await getPathKind(scenariosDir)) === "dir") {
    const entries = await readdir(scenariosDir);
    const jsonEntries = entries.filter((entry) => entry.toLowerCase().endsWith(".json")).toSorted();
    for (const entry of jsonEntries) {
      const scenarioPath = path.join(scenariosDir, entry);
      const scenario = await readScenarioDefinition(scenarioPath);
      payload.scenarios.push({ id: scenario.id, summary: scenario.summary });
    }
  } else {
    const scenarios = opts.manifest.scenarios ?? [];
    payload.scenarios = scenarios
      .filter((scenario) => isRecord(scenario))
      .map((scenario) => ({
        id: typeof scenario.id === "string" ? scenario.id : "",
        summary: typeof scenario.summary === "string" ? scenario.summary : "",
      }))
      .filter((scenario) => scenario.id);
  }

  if (payload.scenarios.length === 0) return;
  await writeJsonStableIfChanged(scenariosIndexPath, payload);
}
