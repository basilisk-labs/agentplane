import path from "node:path";
import { z } from "zod";
import {
  parseScenarioDefinition,
  validateRecipeManifest,
  isScenarioRepoPath,
  type ExplicitRecipeScenarioSelection,
  type ProjectRecipeRegistryEntry,
} from "@agentplaneorg/recipes";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import { parseProjectRecipesRegistry } from "./project-registry.js";
import { resolveProjectRecipesDir, resolveProjectRecipesRegistryPath } from "./paths.js";
import { buildRecipeResolverContext, resolveRecipeCompatibility } from "./resolver.js";
import {
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../../shared/contained-stable-file.js";
import { readStableRegularTextNoFollow } from "../../../shared/stable-file.js";

const text = z.string().min(1).max(256);
const selectionSchema = z.strictObject({
  recipe_id: text,
  recipe_version: text.optional(),
  scenario_id: text,
  scenario_api_version: z.literal("2"),
});
export class ExplicitRecipeSelectionError extends Error {
  constructor(
    readonly code: string,
    readonly facts: string[],
  ) {
    super(`Explicit Recipe selection ${code}: ${facts.join("; ")}`);
    this.name = "ExplicitRecipeSelectionError";
  }
}

/** Shared bounded native reads for exact selection and advisory discovery. */
export async function readExplicitRecipeRegistry(project: ResolvedProject) {
  const registryIdentity = await captureContainedPathChainIdentity({
    repository_root: project.gitRoot,
    file_path: resolveProjectRecipesRegistryPath(project),
    label: "Explicit Recipe registry",
    path_policy: { target_kind: "file", exact_case: true },
  });
  const registry = parseProjectRecipesRegistry(
    JSON.parse(
      await readStableRegularTextNoFollow(registryIdentity.file_path, "Explicit Recipe registry", {
        max_bytes: 1024 * 1024,
      }),
    ),
  );
  await assertContainedPathChainIdentityUnchanged(registryIdentity, "Explicit Recipe registry");
  return registry;
}

/** Exact project-installed selection. No ranking, provider, task mutation or permission grant. */
export async function resolveExplicitRecipeScenarioSelection(opts: {
  project: ResolvedProject;
  selection: ExplicitRecipeScenarioSelection;
}) {
  const selection = selectionSchema.parse(opts.selection);
  const registry = await readExplicitRecipeRegistry(opts.project);
  const matches = registry.recipes.filter(
    (entry) =>
      entry.id === selection.recipe_id &&
      (selection.recipe_version === undefined || entry.version === selection.recipe_version),
  );
  if (matches.length !== 1)
    throw new ExplicitRecipeSelectionError(
      matches.length === 0 ? "not_installed" : "ambiguous_version",
      matches.length === 0
        ? [`${selection.recipe_id}@${selection.recipe_version ?? "unspecified"}`]
        : matches.map((entry) => `${entry.id}@${entry.version}:${entry.path}`),
    );
  const selected = matches[0]!;
  const { recipeRoot, manifest, read } = await readExplicitInstalledRecipeSource(
    opts.project,
    selected,
  );
  const scenarios = manifest.scenarios?.filter((entry) => entry.id === selection.scenario_id) ?? [];
  if (scenarios.length !== 1)
    throw new ExplicitRecipeSelectionError("scenario_not_found", [selection.scenario_id]);
  const scenario = parseScenarioDefinition(await read(scenarios[0]!.file), [
    selection.scenario_api_version,
  ]);
  if (scenario.schema_version !== "2" || scenario.id !== selection.scenario_id)
    throw new ExplicitRecipeSelectionError("scenario_identity_mismatch", [
      selection.scenario_id,
      scenario.id,
    ]);
  const context = await buildRecipeResolverContext({ project: opts.project });
  const compatibility = resolveRecipeCompatibility({
    compatibility: manifest.compatibility,
    context: {
      ...context,
      manifest_api_version: manifest.schema_version,
      scenario_api_version: scenario.schema_version,
    },
  });
  if (!compatibility.ok)
    throw new ExplicitRecipeSelectionError(
      "incompatible",
      compatibility.failures.map((failure) => failure.reason),
    );
  return {
    selection: { ...selection, recipe_version: selected.version },
    recipe_root: recipeRoot,
    manifest,
    scenario,
    compatibility,
    scenario_digest: taskCentricDigest(scenario),
  };
}

export async function readExplicitInstalledRecipeSource(
  project: ResolvedProject,
  selected: ProjectRecipeRegistryEntry,
  budget: { max_bytes?: number } = {},
) {
  if (!isScenarioRepoPath(selected.path))
    throw new ExplicitRecipeSelectionError("unsafe_installed_path", [selected.path]);
  const recipeRoot = path.resolve(resolveProjectRecipesDir(project), selected.path);
  const rootIdentity = await captureContainedPathChainIdentity({
    repository_root: project.gitRoot,
    file_path: recipeRoot,
    label: "Explicit Recipe package",
    path_policy: { target_kind: "file_or_directory", exact_case: true },
  });
  async function read(relative: string) {
    if (!isScenarioRepoPath(relative))
      throw new ExplicitRecipeSelectionError("unsafe_selected_path", [relative]);
    const identity = await captureContainedPathChainIdentity({
      repository_root: project.gitRoot,
      file_path: path.resolve(recipeRoot, relative),
      label: "Explicit Recipe selection",
      path_policy: { target_kind: "file", exact_case: true },
    });
    const raw = JSON.parse(
      await readStableRegularTextNoFollow(identity.file_path, "Explicit Recipe selection", {
        max_bytes: budget.max_bytes ?? 16 * 1024 * 1024,
      }),
    ) as unknown;
    await assertContainedPathChainIdentityUnchanged(identity, "Explicit Recipe selection");
    await assertContainedPathChainIdentityUnchanged(rootIdentity, "Explicit Recipe package");
    return raw;
  }
  const manifest = validateRecipeManifest(await read("manifest.json"));
  if (manifest.id !== selected.id || manifest.version !== selected.version)
    throw new ExplicitRecipeSelectionError("installed_identity_mismatch", [
      selected.id,
      selected.version,
      manifest.id,
      manifest.version,
    ]);
  return { recipeRoot, manifest, read };
}
