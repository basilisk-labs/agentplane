import type { RecipeManifest } from "./manifest-contracts.js";

export type RecipeConflictMode = "fail" | "rename" | "overwrite";

export type RecipeInstallMetadata = {
  schema_version: 1;
  id: string;
  version: string;
  source: string;
  installed_at: string;
  tags?: string[];
  install_mode?: "cache" | "project-copy" | "project-link";
};

export type InstalledRecipeEntry = {
  id: string;
  version: string;
  source: string;
  installed_at: string;
  project_path?: string;
  tags: string[];
  manifest: RecipeManifest;
};

export type InstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: InstalledRecipeEntry[];
};

export type ProjectRecipeMaterialization = "copy" | "link";
export type ProjectRecipeState = "clean" | "modified" | "diverged_from_cache";

export type ProjectRecipeRegistryEntry = {
  id: string;
  version: string;
  path: string;
  active: boolean;
  materialization: ProjectRecipeMaterialization;
  source_ref: string;
  source_sha256: string;
  vendored_sha256: string;
  installed_at: string;
  tags?: string[];
};

export type ProjectRecipesRegistryFile = {
  schema_version: 1;
  updated_at: string;
  recipes: ProjectRecipeRegistryEntry[];
};

export type ProjectInstalledRecipeEntry = InstalledRecipeEntry & {
  project_path: string;
  materialization: ProjectRecipeMaterialization;
  source_ref: string;
  source_sha256: string;
  vendored_sha256: string;
};

export type ProjectInstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: ProjectInstalledRecipeEntry[];
};
