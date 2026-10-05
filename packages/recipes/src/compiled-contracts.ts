import { z } from "zod";
import { isScenarioRepoPath } from "./internal-utils.js";
import type {
  OverlayPromptFragment,
  OverlaySurface,
  OverlayValidator,
  RecipeAgentDefinition,
  RecipePromptModuleDefinition,
  RecipePromptMutationSetDefinition,
  RecipeScenarioDescriptor,
  RecipeSkillDefinition,
  RecipeToolDefinition,
} from "./manifest-contracts.js";

export type CompiledOverlayPromptFragment = OverlayPromptFragment & {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  summary?: string;
  content: string;
  source: string;
};

export type CompiledOverlayValidator = OverlayValidator & {
  recipe_id: string;
  recipe_version: string;
};

export type CompiledOverlayTraceEntry = {
  recipe_id: string;
  recipe_version: string;
  accepted: boolean;
  reason: string;
  source?: string;
  surface?: OverlaySurface;
  fragment_id?: string;
  validator_id?: string;
};

export type CompiledOverlayBundle = {
  schema_version: 1;
  kind: "overlay_bundle";
  active: { id: string; version: string; name: string; summary: string }[];
  surfaces: Record<OverlaySurface, CompiledOverlayPromptFragment[]>;
  validators: CompiledOverlayValidator[];
  templates: Record<string, string>;
  agents: RecipeAgentDefinition[];
  tools: RecipeToolDefinition[];
  trace: CompiledOverlayTraceEntry[];
};

export type CompiledRecipeAssetKind =
  | "agent"
  | "skill"
  | "tool"
  | "scenario"
  | "template"
  | "prompt_module"
  | "prompt_mutation_set";

export type CompiledRecipeAssetBase = {
  id: string;
  kind: CompiledRecipeAssetKind;
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  asset_id: string;
  source: string;
  summary?: string;
};

export type CompiledRecipeAgentAsset = CompiledRecipeAssetBase & {
  kind: "agent";
  definition: RecipeAgentDefinition;
  content: string;
};

export type CompiledRecipeSkillAsset = CompiledRecipeAssetBase & {
  kind: "skill";
  definition: RecipeSkillDefinition;
  content: string;
};

export type CompiledRecipeToolAsset = CompiledRecipeAssetBase & {
  kind: "tool";
  definition: RecipeToolDefinition;
};

export type CompiledRecipeScenarioAsset = CompiledRecipeAssetBase & {
  kind: "scenario";
  definition: RecipeScenarioDescriptor;
};

export type CompiledRecipeTemplateAsset = CompiledRecipeAssetBase & {
  kind: "template";
  content: string;
};

export type CompiledRecipePromptModuleAsset = CompiledRecipeAssetBase & {
  kind: "prompt_module";
  definition: RecipePromptModuleDefinition;
  content: string;
};

export type CompiledRecipePromptMutationSetAsset = CompiledRecipeAssetBase & {
  kind: "prompt_mutation_set";
  definition: RecipePromptMutationSetDefinition;
  content: string;
};

export type CompiledRecipeAssetEntry =
  | CompiledRecipeAgentAsset
  | CompiledRecipeSkillAsset
  | CompiledRecipeToolAsset
  | CompiledRecipeScenarioAsset
  | CompiledRecipeTemplateAsset
  | CompiledRecipePromptModuleAsset
  | CompiledRecipePromptMutationSetAsset;

export type CompiledRecipeAssetRegistry = {
  schema_version: 1;
  kind: "recipe_asset_registry";
  entries: CompiledRecipeAssetEntry[];
};

const CLOSURE_ID = z
  .string()
  .min(1)
  .max(256)
  .regex(/^[A-Za-z0-9_.:@/-]+$/u);
const CLOSURE_PATH = z
  .string()
  .max(1024)
  .refine(
    (value) => value !== "." && isScenarioRepoPath(value),
    "Expected a contained file or package path.",
  );
const CLOSURE_SOURCE = z.enum(["recipe", "repository"]);
const CLOSURE_REF = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("file"), source: CLOSURE_SOURCE, path: CLOSURE_PATH }),
  z.strictObject({ kind: z.literal("package"), id: CLOSURE_ID }),
  z.strictObject({ kind: z.literal("tool"), id: CLOSURE_ID }),
  // Opaque versioned references only. No environment lookup, value, or value hash.
  z.strictObject({ kind: z.literal("secret"), id: CLOSURE_ID, version: CLOSURE_ID }),
]);
const CLOSURE_REFS = z.array(CLOSURE_REF).max(4096);
/** Author-declared complete dependency inventories, not inferred runtime imports or authority. */
export const RECIPE_DEPENDENCY_CLOSURE_ZOD_SCHEMA = z.strictObject({
  schema_version: z.literal(1),
  files: z
    .array(
      z.strictObject({ source: CLOSURE_SOURCE, path: CLOSURE_PATH, dependencies: CLOSURE_REFS }),
    )
    .max(4096),
  packages: z
    .array(
      z.strictObject({
        id: CLOSURE_ID,
        version: CLOSURE_ID,
        source: CLOSURE_SOURCE,
        root: CLOSURE_PATH,
        files: z.array(CLOSURE_PATH).min(1).max(4096),
        digest: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
        dependencies: CLOSURE_REFS,
      }),
    )
    .max(256),
  tools: z.array(z.strictObject({ id: CLOSURE_ID, package_id: CLOSURE_ID })).max(1024),
  capabilities: z.array(z.strictObject({ id: CLOSURE_ID, dependencies: CLOSURE_REFS })).max(1024),
  commands: z
    .array(z.strictObject({ command: z.string().min(1).max(8192), dependencies: CLOSURE_REFS }))
    .max(1024),
});
export type RecipeDependencyClosureDeclaration = z.infer<
  typeof RECIPE_DEPENDENCY_CLOSURE_ZOD_SCHEMA
>;
export type RecipeDependencyReference = z.infer<typeof CLOSURE_REF>;
export type RecipeClosureFile = {
  source: "recipe" | "repository";
  path: string;
  digest: string;
  size_bytes: number;
};
export type CompiledRecipeDependencyClosure = {
  schema_version: 1;
  kind: "recipe_dependency_closure";
  recipe: { id: string; version: string };
  scenario_id: string;
  scenario_digest: string;
  plan_digest: string;
  roots: string[];
  nodes: { id: string; definition: unknown; dependencies: string[] }[];
  files: RecipeClosureFile[];
  secret_refs: { id: string; version: string }[];
  digest: string;
};
